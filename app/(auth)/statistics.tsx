import { GenreTab } from "@/components/GenreTab";
import { MoodTab } from "@/components/MoodTab";
import { RithmTab } from "@/components/RithmTab";
import { WordTab } from "@/components/WordTab";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSession } from "../session";
import { SongPublisher } from "../SongPublisher";

export default function PredictionResultScreen() {
  const { lyrics, sentiment, genre, decisionFunction } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [songTitle, setSongTitle] = useState("");

  const [selectedTab, setSelectedTab] = useState("Genre");
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  let parsedSentiment = { label: "", confidence: 0 };
  let parsedGenre: string | string[] = [];
  let parsedDecisionFunction: number[][] = [];

  function getUserEmail(session: string | null | undefined): string {
    if (!session) return "";
    try {
      console.info(typeof session);
      const parsed = JSON.parse(session);
      return parsed.email || "";
    } catch (error) {
      console.error("Failed to parse session:", error);
      return "";
    }
  }

  try {
    parsedGenre = JSON.parse(genre as string);
    parsedDecisionFunction = JSON.parse(decisionFunction as string);
    parsedSentiment = JSON.parse(sentiment as string);
  } catch (err) {
    console.error("Error parsing params:", err);
  }

  const { session, isLoading } = useSession();
  let userEmail = "";

  if (!isLoading && session) {
    try {
      userEmail = getUserEmail(session);
      console.info("user email:", userEmail);
    } catch (err) {
      console.error("Invalid session format:", err);
    }
  } else {
    console.log("Session is still loading or empty.");
  }

  // const handleSaveSong = async () => {
  //   try {
  //     const payload = {
  //       title: "My Song",
  //       email: userEmail,
  //       lyrics,
  //       genre:
  //         typeof parsedGenre === "string"
  //           ? parsedGenre
  //           : parsedGenre.join(", "),
  //     };

  //     const response = await axios.post(
  //       "http://192.168.100.36:5000/crud/add",
  //       payload
  //     );

  //     if (response.status === 200) {
  //       router.replace("/");
  //     } else if (response.status === 409) {
  //       alert("You already saved a song with this title!");
  //     } else {
  //       alert("Something went wrong while saving.");
  //     }
  //   } catch (error) {
  //     console.error("Save song error:", error);
  //     alert("Failed to save song.");
  //   }
  // };

  const handleSaveButtonPress = () => {
    setIsModalVisible(true);
  };

  // const handleSaveSong = async () => {
  //   try {
  //     const publisher = SongPublisher.getInstance();

  //     await publisher.addSong(
  //       "My Song",
  //       lyrics,
  //       typeof parsedGenre === "string" ? parsedGenre : parsedGenre.join(", "),
  //       userEmail
  //     );

  //     router.replace("/");
  //   } catch (error) {
  //     console.error("Save song error:", error);
  //     alert("Failed to save song.");
  //   }
  // };

  const handleConfirmSave = async () => {
    if (!songTitle.trim()) {
      alert("Please enter a song title!");
      return;
    }

    try {
      const publisher = SongPublisher.getInstance();

      await publisher.addSong(
        songTitle.trim(),
        lyrics,
        typeof parsedGenre === "string" ? parsedGenre : parsedGenre.join(", "),
        userEmail
      );

      setIsModalVisible(false);
      router.replace("/");
    } catch (error) {
      console.error("Save song error:", error);
      alert("Failed to save song.");
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Mood":
        return (
          <MoodTab
            sentiment={parsedSentiment}
            genre={parsedGenre}
            lyrics={lyrics as string}
            decisionValues={parsedDecisionFunction[0] || []}
          />
        );
      case "Rithm":
        return (
          <RithmTab
            sentiment={parsedSentiment}
            genre={parsedGenre}
            lyrics={lyrics as string}
            decisionValues={parsedDecisionFunction[0] || []}
          />
        );
      case "Word":
        return (
          <WordTab
            sentiment={parsedSentiment}
            genre={parsedGenre}
            lyrics={lyrics as string}
            decisionValues={parsedDecisionFunction[0] || []}
          />
        );
      case "Genre":
        return (
          <GenreTab
            sentiment={parsedSentiment}
            genre={parsedGenre}
            lyrics={lyrics as string}
            decisionValues={parsedDecisionFunction[0] || []}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Song's Vibe 🎵</Text>
      <Text style={styles.genre}> {parsedGenre}</Text>

      <View style={styles.tabMenu}>
        {["Genre", "Mood", "Rithm", "Word"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderContent()}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Song Title</Text>
            <TextInput
              placeholder="My awesome song..."
              value={songTitle}
              onChangeText={setSongTitle}
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmSave}
            >
              <Text style={styles.confirmButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[
          styles.backButton,
          { backgroundColor: "#4CAF50", top: undefined, bottom: 80 },
        ]}
        onPress={handleSaveButtonPress}
      >
        <FontAwesome name="save" size={18} color="#fff" />
        <Text style={styles.backButtonText}>Save Song</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={18} color="#fff" />
        <Text style={styles.backButtonText}>Back to Editor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 6,
    marginTop: 50,
  },
  genre: {
    fontSize: 40,
    fontWeight: "800",
    color: "#009688",
    marginBottom: 20,
  },
  tabMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    width: "22%",
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#3949AB",
  },
  tabText: {
    fontSize: 14,
    color: "#37474F",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingBottom: 160,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3f51b5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
  },
});
