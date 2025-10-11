import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal, FlatList } from "react-native";
import { Link, useRouter } from "expo-router";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showBarangayDropdown, setShowBarangayDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const router = useRouter();

  const barangays = [
    "Awihao",
    "Bagakay",
    "Bato",
    "Biga",
    "Bulongan",
    "Bunga",
    "Cabitoonan",
    "Calongcalong",
    "Cambang-ug",
    "Camp 8",
    "Canlumampao",
    "Cantabaco",
    "Capitan Claudio",
    "Carmen",
    "Daanglungsod",
    "Don Andres Soriano (Lutopan)",
    "Dumlog",
    "Gen. Climaco",
    "Ibo",
    "Ilihan",
    "Landahan",
    "Loay",
    "Luray II",
    "Matab-ang",
    "Media Once",
    "Pangamihan",
    "Poblacion",
    "Poog",
    "Putingbato",
    "Sagay",
    "Sam-ang",
    "Sangi",
    "Santo Niño (Mainggit)",
    "Subayon",
    "Talavera",
    "Tubod",
    "Tulay",
    "Ubayon"
  ];

  const genders = ["Male", "Female", "Others"];

  const handleRegister = async () => {
    if (!username || !email || !password || !gender || !address) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Save additional user info in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        username,
        gender,
        address,
        email,
        phone,
        role: "user",
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/login");
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  const selectBarangay = (selectedBarangay) => {
    setAddress(selectedBarangay);
    setShowBarangayDropdown(false);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderDropdown(false);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/images/Logo.png")}
        style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 30 }}
      />

      <Text style={styles.title}>Create an Account</Text>

      {/* Username */}
      <TextInput
        placeholder="Set your Username"
        placeholderTextColor="#FFF"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {/* Gender Dropdown */}
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setShowGenderDropdown(true)}
      >
        <Text style={gender ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder}>
          {gender || "Select Gender"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Address Dropdown */}
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setShowBarangayDropdown(true)}
      >
        <Text style={address ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder}>
          {address || "Select Barangay"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#FFF"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Phone */}
      <TextInput
        placeholder="Phone Number (+63...)"
        placeholderTextColor="#FFF"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#FFF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <Text style={styles.loginPrompt}>
        Already have an account?{" "}
        <Link href="/login" style={styles.loginLink}>
          Login
        </Link>
      </Text>

      {/* Gender Dropdown Modal */}
      <Modal
        visible={showGenderDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <FlatList
              data={genders}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectGender(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowGenderDropdown(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Barangay Dropdown Modal */}
      <Modal
        visible={showBarangayDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBarangayDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Barangay</Text>
            <FlatList
              data={barangays}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectBarangay(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowBarangayDropdown(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FF0000", 
    paddingHorizontal: 24, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  title: { 
    color: "#FFF", 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 32, 
    textAlign: "center" 
  },
  input: { 
    width: "100%", 
    backgroundColor: "rgba(255,255,255,0.2)", 
    paddingVertical: 14, 
    paddingHorizontal: 18, 
    borderRadius: 10, 
    marginBottom: 16, 
    fontSize: 16, 
    color: "white" 
  },
  dropdownButton: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTextSelected: {
    fontSize: 16,
    color: "white",
  },
  dropdownTextPlaceholder: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  button: { 
    backgroundColor: "#FFF", 
    paddingVertical: 14, 
    paddingHorizontal: 60, 
    borderRadius: 30, 
    marginTop: 10 
  },
  buttonText: { 
    color: "#FF0000", 
    fontSize: 16, 
    fontWeight: "bold", 
    textAlign: "center" 
  },
  loginPrompt: { 
    color: "#FFF", 
    fontSize: 16, 
    marginTop: 30, 
    textAlign: "center" 
  },
  loginLink: { 
    fontWeight: "bold", 
    textDecorationLine: "underline", 
    color: "#FFF" 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#FF0000",
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  modalCloseButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;