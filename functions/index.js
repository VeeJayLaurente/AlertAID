// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cheerio = require("cheerio");

admin.initializeApp();
const db = admin.firestore();

// Pick a fetch implementation:
// - Prefer global fetch (Node 18+ in Cloud Functions).
// - Fallback to node-fetch v2 if available

let fetchFn;
if (typeof fetch === "function") {
  fetchFn = fetch;
} else {
  try {
    fetchFn = require("node-fetch"); // must be v2
  } catch (err) {
    throw new Error(
        "No fetch available. Use Node 18 runtime (recommended)",
    );
  }
}

// Helper to get a numeric timestamp for sorting /** */

// eslint-disable-next-line require-jsdoc
function getTimestamp(item) {
  if (item === null || item === undefined) return 0;
  if (item.publishedAt !== undefined && item.publishedAt !== null) {
    const n = Number(item.publishedAt);
    if (!isNaN(n)) return n;
    const parsed = Date.parse(item.publishedAt);
    if (!isNaN(parsed)) return parsed;
  }
  if (item.time !== undefined && item.time !== null) {
    const n2 = Number(item.time);
    if (!isNaN(n2)) return n2;
  }
  return 0;
}

// Main HTTPS function
exports.getAlerts = functions.https.onRequest(async (req, res) => {
  try {
    const combined = [];

    // 1) GNews (news)
    try {
      const gnewsKey =
        process.env.GNEWS_API_KEY || "c74fdaaa318d41018847a5dafc2d03d8";
      const q = encodeURIComponent("Toledo Cebu Philippines");
      const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&country=ph&max=5&apikey=${gnewsKey}`;
      const newsRes = await fetchFn(url);
      const newsJson = await newsRes.json();
      if (newsJson.articles && Array.isArray(newsJson.articles)) {
        newsJson.articles.forEach((item) => {
          combined.push({
            type: "news",
            title: item.title || "No title",
            description: item.description || "",
            url: item.url || null,
            publishedAt: getTimestamp({publishedAt: item.publishedAt}),
            location: "Cebu",
            // ✅ Fixed: removed optional chaining
            source:
              item.source && item.source.name ? item.source.name : "GNews",
          });
        });
      }
    } catch (err) {
      console.error("News fetch error:", err.message || err);
    }

    // 2) Earthquakes (USGS)
    try {
      const eqRes = await fetchFn(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
      );
      const eqJson = await eqRes.json();
      if (eqJson.features && Array.isArray(eqJson.features)) {
        eqJson.features.forEach((feat) => {
          const props = feat.properties || {};
          const geom = feat.geometry || {};
          const coords = Array.isArray(geom.coordinates) ? geom.coordinates :[];
          const lng = coords[0];
          const lat = coords[1];
          if (typeof lat === "number" && typeof lng === "number") {
            if (lat >= 6 && lat <= 14 && lng >= 119 && lng <= 127) {
              combined.push({
                type: "earthquake",
                title: `Earthquake M${props.mag || "?"}`,
                description: props.place || "",
                url: props.url || null,
                time: getTimestamp({time: props.time}),
                location: "Philippines",
                source: "USGS",
              });
            }
          }
        });
      }
    } catch (err) {
      console.error("Earthquake fetch error:", err.message || err);
    }

    // 3) PAGASA advisory
    try {
      const advRes = await fetchFn(
          "https://www.pagasa.dost.gov.ph/weather/weather-advisory",
      );
      const advHtml = await advRes.text();
      const $ = cheerio.load(advHtml);

      let advisoryText = "";
      advisoryText =
        $("div.weather-advisory").text().trim() ||
        $("div.content").text().trim() ||
        $("article").text().trim();

      if (
        advisoryText &&
        !advisoryText.toLowerCase().includes("no weather advisory")
      ) {
        combined.push({
          type: "weather",
          title: "PAGASA Weather Advisory",
          description: advisoryText.substring(0, 300),
          url: "https://www.pagasa.dost.gov.ph/weather/weather-advisory",
          publishedAt: Date.now(),
          location: "Philippines",
          source: "PAGASA",
        });
      }
    } catch (err) {
      console.error("PAGASA fetch error:", err.message || err);
    }

    // Sort by recency
    combined.sort((a, b) => getTimestamp(b) - getTimestamp(a));

    // Save to Firestore
    if (combined.length > 0) {
      const batch = db.batch();
      combined.forEach((alert) => {
        const ref = db.collection("alerts").doc();
        batch.set(ref, {
          ...alert,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
    }

    res.set("Access-Control-Allow-Origin", "*");
    res.json({ok: true, count: combined.length, alerts: combined});
  } catch (err) {
    console.error("General function error:", err);
    res.status(500).json({ok: false, error: err.message || String(err)});
  }
});
