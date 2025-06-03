import { useSession } from "@/app/session";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserScreen() {
  const { signOut, signOutAfterDeletion, session } = useSession();
  const connection = "172.20.10.14";
  const { email } = session ? JSON.parse(session) : {};

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [songsCount, setSongsCount] = useState<number | null>(null);

  const handleLogOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirmare",
      "Ești sigur că vrei să-ți ștergi contul?",
      [
        { text: "Anulează", style: "cancel" },
        {
          text: "Continuă",
          style: "destructive",
          onPress: () => setShowDeleteModal(true),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      Alert.alert("Eroare", "Te rugăm să introduci parola.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://${connection}:5000/auth/delete_account`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        Alert.alert("Cont șters cu succes");
        signOutAfterDeletion();
      } else {
        Alert.alert(
          "Eroare",
          response.data?.error || "Nu s-a putut șterge contul."
        );
      }
    } catch (err) {
      Alert.alert("Eroare", "Ștergerea contului a eșuat.");
      console.error("Delete error:", err);
    } finally {
      setIsLoading(false);
      setPassword("");
      setShowDeleteModal(false);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`http://${connection}:5000/crud/songs`, {
        params: { email },
      });
      if (res.status === 200 && Array.isArray(res.data)) {
        setSongsCount(res.data.length);
      } else {
        setSongsCount(0);
      }
    } catch (err) {
      console.error("Eroare la încărcarea cântecelor:", err);
    }
  };

  useEffect(() => {
    if (email) {
      fetchSongs();
    }
  }, [email]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.nameTitle}>Profilul tău</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.sectionTitle}>Statistici cont</Text>
        <Text style={styles.songCount}>
          {songsCount === 0
            ? "Nu ai niciun cântec salvat."
            : `Ai ${songsCount} ${
                songsCount === 1 ? "cântec" : "cântece"
              } salvate.`}
        </Text>
      </View>

      <View style={styles.actionsCard}>
        <Text style={styles.sectionTitle}>Acțiuni disponibile</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#3F51B5" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLogOut}
            >
              <Text style={styles.actionText}>Deconectare</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#D32F2F" }]}
              onPress={confirmDelete}
            >
              <Text style={[styles.actionText, { color: "#fff" }]}>
                Șterge contul
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => {
          setShowDeleteModal(false);
          setPassword("");
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmă parola</Text>
            <TextInput
              placeholder="Parola"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#888"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                }}
                style={[styles.modalButton, { backgroundColor: "#CCC" }]}
              >
                <Text>Anulează</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteAccount}
                style={[styles.modalButton, { backgroundColor: "#D32F2F" }]}
              >
                <Text style={{ color: "#FFF" }}>Șterge</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    backgroundColor: "#F4F6F8",
    padding: 16,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 6,
    color: "#2E2E2E",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "#3949AB",
  },
  songCount: {
    fontSize: 15,
    color: "#444",
  },
  actionsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    elevation: 2,
  },
  actionButton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 22,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
});
//   return (
//     <View style={styles.container}>
//       <Text style={styles.pageTitle}>Panou utilizator</Text>

//       {/* Casetă cu detalii utilizator */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Informații personale</Text>
//         <Text style={styles.label}>Email:</Text>
//         <Text style={styles.value}>{email}</Text>
//         {songsCount !== null && (
//           <>
//             <Text style={styles.label}>Cântece salvate:</Text>
//             <Text style={styles.value}>
//               {songsCount} {songsCount === 1 ? "cântec" : "cântece"}
//             </Text>
//           </>
//         )}
//       </View>

//       {/* Casetă cu acțiuni */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Acțiuni rapide</Text>
//         {isLoading ? (
//           <ActivityIndicator size="large" color="#3949AB" />
//         ) : (
//           <>
//             <TouchableOpacity
//               onPress={handleLogOut}
//               style={[styles.actionButton, styles.logout]}
//             >
//               <Text style={styles.buttonText}>Deconectare</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={confirmDelete}
//               style={[styles.actionButton, styles.delete]}
//             >
//               <Text style={styles.buttonText}>Șterge contul</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>

//       {/* Modal confirmare ștergere */}
//       <Modal
//         animationType="slide"
//         transparent
//         visible={showDeleteModal}
//         onRequestClose={() => {
//           setShowDeleteModal(false);
//           setPassword("");
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Confirmă parola</Text>
//             <TextInput
//               placeholder="Parola"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//               placeholderTextColor="#888"
//             />
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setShowDeleteModal(false);
//                   setPassword("");
//                 }}
//                 style={[styles.modalButton, { backgroundColor: "#CCC" }]}
//               >
//                 <Text>Anulează</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleDeleteAccount}
//                 style={[styles.modalButton, { backgroundColor: "#D32F2F" }]}
//               >
//                 <Text style={{ color: "#FFF" }}>Șterge</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F0F2F5",
//     padding: 20,
//   },
//   pageTitle: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#222",
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#FFF",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#333",
//   },
//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 5,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//   },
//   actionButton: {
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   logout: {
//     backgroundColor: "#3F51B5",
//   },
//   delete: {
//     backgroundColor: "#D32F2F",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontWeight: "600",
//   },
//   input: {
//     width: "100%",
//     height: 45,
//     borderColor: "#CCC",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     backgroundColor: "#FFF",
//     marginBottom: 15,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.4)",
//   },
//   modalContent: {
//     width: "85%",
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#222",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     borderRadius: 8,
//     alignItems: "center",
//   },
// });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profilul tău</Text>
//       <Text style={styles.email}>{email}</Text>
//       {songsCount !== null && (
//         <Text style={styles.songCount}>
//           Ai {songsCount} {songsCount === 1 ? "cântec" : "cântece"} salvate
//         </Text>
//       )}

//       {isLoading ? (
//         <ActivityIndicator size="large" color="#3949AB" />
//       ) : (
//         <>
//           <View style={styles.button}>
//             <Button
//               title="Deconectare"
//               onPress={handleLogOut}
//               color="#3949AB"
//             />
//           </View>
//           <View style={styles.button}>
//             <Button
//               title="Șterge contul"
//               onPress={confirmDelete}
//               color="#D32F2F"
//             />
//           </View>
//         </>
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showDeleteModal}
//         onRequestClose={() => {
//           setShowDeleteModal(false);
//           setPassword("");
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Confirmă parola</Text>
//             <TextInput
//               placeholder="Parola"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//               placeholderTextColor="#888"
//             />
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   setShowDeleteModal(false);
//                   setPassword("");
//                 }}
//                 style={[styles.modalButton, { backgroundColor: "#CCC" }]}
//               >
//                 <Text>Anulează</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleDeleteAccount}
//                 style={[styles.modalButton, { backgroundColor: "#D32F2F" }]}
//               >
//                 <Text style={{ color: "#FFF" }}>Șterge</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#FAFAFA",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //   },
// //   title: {
// //     fontSize: 26,
// //     fontWeight: "bold",
// //     marginBottom: 8,
// //     color: "#222",
// //   },
// //   email: {
// //     fontSize: 16,
// //     color: "#555",
// //     marginBottom: 6,
// //   },
// //   songCount: {
// //     fontSize: 15,
// //     color: "#777",
// //     marginBottom: 20,
// //   },
// //   button: {
// //     width: "100%",
// //     marginVertical: 8,
// //   },
// //   input: {
// //     width: "100%",
// //     height: 45,
// //     borderColor: "#CCC",
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 10,
// //     fontSize: 16,
// //     backgroundColor: "#FFF",
// //     marginBottom: 15,
// //   },
// //   modalOverlay: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "rgba(0,0,0,0.5)",
// //   },
// //   modalContent: {
// //     width: "85%",
// //     backgroundColor: "#FFF",
// //     borderRadius: 10,
// //     padding: 20,
// //     alignItems: "center",
// //   },
// //   modalTitle: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginBottom: 15,
// //     color: "#222",
// //   },
// //   modalButton: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 6,
// //     marginHorizontal: 5,
// //   },
// // });
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#1A1A1A",
//   },
//   email: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 6,
//   },
//   songCount: {
//     fontSize: 15,
//     color: "#777",
//     marginBottom: 20,
//   },
//   button: {
//     width: "100%",
//     marginVertical: 8,
//   },
//   input: {
//     width: "100%",
//     height: 45,
//     borderColor: "#CCC",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     backgroundColor: "#FFF",
//     marginBottom: 15,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "85%",
//     backgroundColor: "#FFF",
//     borderRadius: 12,
//     padding: 22,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 15,
//     color: "#333",
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   cancelText: {
//     color: "#333",
//     fontWeight: "500",
//   },
//   confirmText: {
//     color: "#FFF",
//     fontWeight: "600",
//   },
// });
