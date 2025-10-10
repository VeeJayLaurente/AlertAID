import { useState, useEffect } from "react";
import {View,Text,StyleSheet,TouchableOpacity,Switch,Image,Appearance,} from "react-native";
import { useTranslation } from "react-i18next";
import { useApp } from '../../UI/AppContext'
import {Link} from 'expo-router'
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig'; 

const Settings = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme, language, toggleLanguage } = useApp();

const [username, setUsername] = useState('');


useEffect(() => {
  const fetchUserName = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;
    if (user) {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) setUsername(docSnap.data().username);
    }
  };
  fetchUserName();
}, []);



  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
            <Link href ="/home/Home">
          <Image
            source={require("../../assets/images/Back Arrow.png")}
            style={styles.backIcon}
          />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerText}>Hello, {username || 'Guest'}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{t("visitWebsite")}</Text>
        <Text style={styles.infoDesc}>
          {t("safetyInfo")}
        </Text>
      </View>

      {/* Grid Buttons */}
      <View style={styles.grid}>
        {/* Location */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/images/Pin.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Location</Text>
          <Text style={styles.status}>Active</Text>
        </TouchableOpacity>

        {/* Language */}
      <TouchableOpacity style={styles.card} onPress={toggleLanguage}>
        <Image
            source={require("../../assets/images/Language.png")}
            style={styles.icon}
          />
      <Text style={styles.label}> Language:</Text>
      <Text style={styles.status}>{language === "en" ? "Eng" : "Ceb"}</Text>
       </TouchableOpacity>

        {/* User */}
        <TouchableOpacity style={styles.card}>
            <Link href = "/register">
          <Image
            source={require("../../assets/images/User Profile.png")}
            style={styles.icon}
          />
          </Link>
          <Text style={styles.label}>User</Text>
          <Text style={styles.status}>Login/Signin</Text>
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/images/Customer Service.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Help</Text>
          <Text style={styles.status}>Online</Text>
        </TouchableOpacity>

        {/* Backup */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/images/Backup.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Backup</Text>
          <Text style={styles.status}>Synced In</Text>
        </TouchableOpacity>

        {/* Light / Dark Mode */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/Light Mode.png")}
            style={styles.icon}
          />
          <Text style={styles.label2}> Light/Dark Mode</Text>
          <Switch
            value={!isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? "#888" : "#FF0000"}
            trackColor={{ false: "#ccc", true: "#FFB3B3" }}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backIcon: {
    width: 28,
    height: 28,
    tintColor: "#FF0000",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0000",
    marginLeft: 15,
  },
  infoCard: {
    backgroundColor: "#FF0000",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  infoTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoDesc: {
    color: "#FFF",
    fontSize: 13,
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: "30"
  },
  card: {
    width: "47%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 8,
    tintColor: "#FF0000",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  label2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  status: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },
   button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});
