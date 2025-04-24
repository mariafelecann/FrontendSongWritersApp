import { GenreTab } from "@/components/GenreTab";
import { MoodTab } from "@/components/MoodTab";
import { RithmTab } from "@/components/RithmTab";
import { WordTab } from "@/components/WordTab";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PredictionResultScreen() {
  const { lyrics, sentiment, genre, decisionFunction } = useLocalSearchParams();
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState("Genre");
  const [showDetails, setShowDetails] = useState(false);

  let parsedSentiment = { label: "", confidence: 0 };
  let parsedGenre: string | string[] = [];
  let parsedDecisionFunction: number[][] = [];

  try {
    parsedGenre = JSON.parse(genre as string);
    parsedDecisionFunction = JSON.parse(decisionFunction as string);
    parsedSentiment = JSON.parse(sentiment as string);
  } catch (err) {
    console.error("Error parsing params:", err);
  }

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
    paddingBottom: 80,
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
});
