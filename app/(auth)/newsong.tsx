import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function NewSongScreen() {
  const [lyrics, setLyrics] = useState("");
  const lyricsInputRef = useRef<TextInput>(null);
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-SemiBold.ttf"),
  });
  const router = useRouter();
  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const handleAnalyze = () => {
  //   console.log("Analyzing lyrics:", lyrics);
  // };
  const handleAnalyze = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.36:5000/ai/predict",
        {
          lyrics: lyrics,
        }
      );

      const genreData = JSON.parse(response.data.genre);

      const predictedGenre = genreData.prediction;
      const sentiment = genreData.sentiment;
      const decisionFunctionValues = genreData.decision_function;
      console.info("predicted genre: ", predictedGenre);
      console.info("decision function values: ", decisionFunctionValues);
      console.info("sentiment: ", sentiment);
      router.push({
        pathname: "/statistics",
        params: {
          genre: JSON.stringify(predictedGenre),
          decisionFunction: JSON.stringify(decisionFunctionValues),
          sentiment: JSON.stringify(sentiment),
          lyrics: lyrics,
        },
      });
    } catch (error: any) {
      console.error("Prediction error:", error.toJSON?.() || error);
      alert("Failed to get prediction.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Compune-ți următorul HIT 🪶</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Versuri:</Text>
            <TextInput
              ref={lyricsInputRef}
              style={styles.lyricsInput}
              placeholder="Lasă-ți sufletul să creeze..."
              multiline
              value={lyrics}
              onChangeText={setLyrics}
              textAlignVertical="top"
              placeholderTextColor="#b0bec5"
            />
          </View>

          <View style={styles.bottomBar}>
            <View style={styles.inspirationNote}>
              <Text style={styles.inspirationText}>
                Ți-ai lăsat sufletul pe hârtie? E rândul{" "}
                <Text style={styles.inspirationHighlight}>
                  versurilor să-ți vorbească :)
                </Text>{" "}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={handleAnalyze}
            >
              <FontAwesome
                name="magic"
                size={20}
                color="#fff"
                style={styles.aiIcon}
              />
              <Text style={styles.analyzeButtonText}>Explorează ⋆𖦹</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 28,
    color: "#37474F",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#546E7A",
    marginBottom: 8,
  },
  lyricsInput: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flex: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  analyzeButton: {
    backgroundColor: "#3f51b5",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  analyzeButtonText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
  aiIcon: {
    marginRight: 5,
  },
  inspirationNote: {
    flex: 1,
  },
  inspirationText: {
    fontFamily: "Caveat-Regular",
    fontSize: 20,
    color: "#78909C",
  },
  inspirationHighlight: {
    fontFamily: "Montserrat-SemiBold",
    color: "#2196F3",
  },
});
