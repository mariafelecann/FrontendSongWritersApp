import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function PredictionResultScreen() {
  const { lyrics, sentiment, genre, decisionFunction } = useLocalSearchParams();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const computeRepetitionScore = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    const totalWords = words.length;
    const wordCounts: Record<string, number> = {};

    words.forEach((word) => {
      const normalized = word.toLowerCase().replace(/[^a-z']/gi, "");
      if (normalized) {
        wordCounts[normalized] = (wordCounts[normalized] || 0) + 1;
      }
    });

    const repeatedWordCount = Object.values(wordCounts).reduce(
      (sum, count) => sum + (count > 1 ? count - 1 : 0),
      0
    );

    const uniqueWordCount = Object.keys(wordCounts).length;
    const repetitionScore = totalWords > 0 ? repeatedWordCount / totalWords : 0;
    const uniqueRatio = totalWords > 0 ? uniqueWordCount / totalWords : 0;

    return {
      repetitionScore: repetitionScore,
      uniqueRatio: uniqueRatio,
    };
  };

  let parsedSentiment: { label: string; confidence: number } = {
    label: "",
    confidence: 0,
  };
  //let parsedGenre: string[] = [];
  let parsedGenre: string | string[] = [];

  let parsedDecisionFunction: number[][] = [];

  try {
    parsedGenre = JSON.parse(genre as string);
    parsedDecisionFunction = JSON.parse(decisionFunction as string);
    parsedSentiment = JSON.parse(sentiment as string);
  } catch (err) {
    console.error("Error parsing params:", err);
  }

  const flatDecisionValues: number[] = parsedDecisionFunction[0] || [];
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState("Mood");

  const chartData = {
    labels: ["country", "pop", "rap", "rock"],
    datasets: [
      {
        data: flatDecisionValues,
        strokeWidth: 2,
      },
    ],
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Mood":
        const genreKey = Array.isArray(parsedGenre)
          ? parsedGenre[0].toLowerCase()
          : parsedGenre.toLowerCase();
        let customTip = "";

        if (parsedSentiment.label === "Positive 😊") {
          if (genreKey === "pop") {
            customTip =
              "Pop music thrives with positive, uplifting lyrics. Think catchy hooks, feel-good messages, and danceable beats!";
          } else if (genreKey === "country") {
            customTip =
              "Country music embraces positivity, often with themes of love, family, or personal triumph. Add a twangy guitar and heartwarming vocals!";
          } else if (genreKey === "rap") {
            customTip =
              "Positive rap lyrics can be all about self-empowerment, success, and fun. Add a bouncy beat and confident delivery!";
          } else if (genreKey === "rock") {
            customTip =
              "Positive rock can have anthemic qualities, ideal for powerful choruses. Think stadium rock with uplifting guitar riffs!";
          }
        } else if (parsedSentiment.label === "Negative 😠") {
          if (genreKey === "pop") {
            customTip =
              "Negative pop lyrics can add an interesting contrast. Imagine sad lyrics with an upbeat melody — think of Robyn’s 'Dancing On My Own'!";
          } else if (genreKey === "country") {
            customTip =
              "Country music’s negative themes often dive into heartache, betrayal, or loss. A steel guitar with a melancholic vibe can help carry this mood.";
          } else if (genreKey === "rap") {
            customTip =
              "Rap with a negative tone can be raw and emotional, diving into struggle or disillusionment. Dark beats with impactful lyricism fit well here.";
          } else if (genreKey === "rock") {
            customTip =
              "Negative rock lyrics, especially in alternative or grunge, can be cathartic. Deeply emotional or introspective lyrics paired with distorted guitars create a raw atmosphere.";
          }
        } else if (parsedSentiment.label === "Neutral 😐") {
          if (genreKey === "pop") {
            customTip =
              "Neutral pop lyrics are often playful or observational. Focus on catchy rhythms with a simple but effective melody.";
          } else if (genreKey === "country") {
            customTip =
              "Country music with neutral lyrics works well for storytelling, often in a narrative style with simple instrumentation like acoustic guitar and fiddle.";
          } else if (genreKey === "rap") {
            customTip =
              "Neutral rap lyrics might be reflective or observational. Pair with a mellow beat to focus on flow and lyricism, creating a laid-back vibe.";
          } else if (genreKey === "rock") {
            customTip =
              "Neutral rock can be versatile, but is often best in alternative sub-genres. Focus on dynamic instrumentals, shifting between introspective verses and powerful choruses.";
          }
        }

        return (
          <View style={styles.sentimentCard}>
            <Text style={styles.sentimentTitle}>Mood of your lyrics:</Text>
            <Text style={styles.sentimentLabel}>{parsedSentiment.label}</Text>
            <Text style={styles.sentimentConfidence}>
              Confidence: {(parsedSentiment.confidence * 100).toFixed(1)}%
            </Text>

            <Text style={styles.infoText}>
              This mood suggests your lyrics carry a{" "}
              <Text style={styles.infoTextBold}>
                {parsedSentiment.label.toLowerCase()}
              </Text>{" "}
              emotional tone. That kind of sentiment is often found in{" "}
              <Text style={styles.genreHighlight}>
                {Array.isArray(parsedGenre) ? parsedGenre[0] : parsedGenre}
              </Text>{" "}
              tracks.
            </Text>

            <Text style={styles.customTip}>{customTip}</Text>

            <Text style={styles.infoText}>
              Consider how this mood ties into the broader musical arrangement.
              For example, a positive mood might inspire a light, upbeat melody,
              while a negative tone could benefit from darker, more intense
              instrumentation. Experiment with tempo, key choice, and dynamics
              to further enhance the emotional impact of the lyrics.
            </Text>
          </View>
        );

      case "Rithm":
        let genreKeyRithm = "unknown";

        if (Array.isArray(parsedGenre) && typeof parsedGenre[0] === "string") {
          genreKeyRithm = parsedGenre[0].toLowerCase();
        } else if (typeof parsedGenre === "string") {
          genreKeyRithm = parsedGenre.toLowerCase();
        }

        const genreTips: Record<
          string,
          { rhythm: string; tempo: string; extra: string }
        > = {
          pop: {
            rhythm:
              "Stick with a steady 4/4 beat — think punchy snares on 2 and 4, plus tight, loopable grooves.",
            tempo:
              "Usually between 100-130 BPM. Enough to get heads nodding, not so fast it loses clarity.",
            extra:
              "Pop thrives on repetition and clarity — think catchy hooks, simple progressions, and room for vocals to shine.",
          },
          rap: {
            rhythm:
              "Use syncopation and space — a minimal 4/4 can work magic with smart kick-snare placement.",
            tempo:
              "Typically around 85-110 BPM. Slower tempos let your lyrics breathe, faster ones add urgency.",
            extra:
              "Focus on flow. Build beats that make space for rhyme schemes — punchy kicks and gritty hats go a long way.",
          },
          rock: {
            rhythm:
              "4/4 is the backbone, but toss in some 6/8 or even a breakbeat for texture and energy shifts.",
            tempo:
              "Anywhere from 100 to 140 BPM. Mid-tempo for grooves, faster for drive and aggression.",
            extra:
              "Rock loves contrast. Use rhythm shifts to build tension — think verse calm, chorus explosion.",
          },
          country: {
            rhythm:
              "Try a 3/4 or 6/8 swing feel, or a gentle 2-step in 4/4 with a laid-back shuffle.",
            tempo:
              "Usually 75-110 BPM — storytelling needs space, but upbeat tracks can go faster.",
            extra:
              "Country rhythms support the story. Keep it grounded and rhythmic, with room for emotion and twang.",
          },
        };

        const tip = genreTips[genreKeyRithm] || {
          rhythm:
            "Try a simple 4/4 beat to start. Layer in syncopation or off-beat accents for interest.",
          tempo:
            "A comfortable range is 90-120 BPM — enough pace to keep attention, enough space for creativity.",
          extra:
            "This genre's a blend — feel free to borrow tricks from others and shape your own rhythm identity.",
        };

        return (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Rithm & Tempo Insights 🥁</Text>
            <Text style={styles.infoText}>
              Your lyrics matched{" "}
              <Text style={styles.genreHighlight}>{parsedGenre}</Text>, so
              here’s how to vibe with that rhythmically:
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.infoTextBold}>🌀 Rhythm Tip:</Text>{" "}
              {tip.rhythm}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.infoTextBold}>⏱ Tempo Range:</Text>{" "}
              {tip.tempo}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.infoTextBold}>🎧 Pro Tip:</Text> {tip.extra}
            </Text>

            <Text style={styles.infoText}>
              Use these suggestions as a creative springboard — sometimes,
              breaking the rules makes the best groove.
            </Text>
          </View>
        );

      case "Word":
        const { repetitionScore, uniqueRatio } = computeRepetitionScore(
          (lyrics as string) || ""
        );
        return (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Word Analysis 🧠</Text>

            <Text style={styles.infoText}>
              <Text style={styles.infoTextBold}>Repetition Score: </Text>
              {repetitionScore.toFixed(2)} – This means that about{" "}
              {(repetitionScore * 100).toFixed(1)}% of the words in your lyrics
              are repeated.
            </Text>

            <Text style={styles.infoText}>
              Songs with moderate repetition (around 0.2–0.4) often feel catchy
              and rhythmic. Genres like{" "}
              <Text style={styles.highlight}>Pop</Text> and{" "}
              <Text style={styles.highlight}>Rap</Text> tend to embrace this
              more.
            </Text>

            <Text style={styles.infoText}>
              In contrast, low repetition (below 0.1) may indicate a richer
              vocabulary, more typical in{" "}
              <Text style={styles.highlight}>Rock</Text> or{" "}
              <Text style={styles.highlight}>Alternative</Text> genres.
            </Text>

            <Text style={styles.infoText}>
              Your lyrics resemble the{" "}
              <Text style={styles.genreHighlight}>{parsedGenre}</Text> genre,
              which{" "}
              {repetitionScore < 0.15
                ? "typically features more diverse lyrics and storytelling."
                : repetitionScore < 0.4
                ? "often balances repetition and creativity for a strong rhythm."
                : "leans into repetition for maximum memorability and flow."}
            </Text>
          </View>
        );
      case "Genre":
        return (
          <>
            <View style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#ff9e00",
                  backgroundGradientTo: "#ff9e00",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
              />
            </View>
            <Text style={styles.infoTitle}>Genre Analysis</Text>
            <Text style={styles.infoText}>
              This is a genre chart based on your lyrics.{"\n"}
              <Text style={styles.genreHighlight}>
                Your lyrics resemble {parsedGenre} the most.
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.toggleDetailsButton}
              onPress={toggleDetails}
            >
              <Text style={styles.toggleDetailsText}>
                {showDetails
                  ? "Show less"
                  : "Find more about how to interpret this diagram"}{" "}
                <FontAwesome
                  name={showDetails ? "angle-up" : "angle-down"}
                  size={16}
                  color="#1A237E"
                />
              </Text>
            </TouchableOpacity>
            {showDetails && (
              <View style={styles.infoBox}>
                <Text>
                  <Text style={styles.infoTextBold}>X-axis: </Text>
                  These are all the possible predicted genres. It's where your
                  song is compared to{" "}
                  <Text style={styles.highlight}>
                    Country, Pop, Rap, and Rock
                  </Text>
                  .{"\n\n"}
                  <Text style={styles.infoTextBold}>Y-axis: </Text>
                  This is like a scoreboard that tells you how well your song
                  fits each genre. The higher the bar, the{" "}
                  <Text style={styles.highlight}>stronger the match</Text>!
                </Text>
              </View>
            )}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Song's Vibe 🎵</Text>
      <Text style={styles.genre}> {parsedGenre}</Text>

      {/* Horizontal Menu */}
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

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderContent()}
      </ScrollView>

      {/* Fixed Back Button */}
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
  // infoTextBold: {
  //   fontWeight: "bold",
  //   color: "#3949AB",
  // },
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
  // sentimentCard: {
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 16,
  //   padding: 16,
  //   marginBottom: 20,
  //   alignItems: "center",
  //   width: "100%",
  // },
  // sentimentTitle: {
  //   fontSize: 18,
  //   color: "#1A237E",
  //   fontWeight: "600",
  //   marginBottom: 6,
  // },
  toggleDetailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleDetailsText: {
    fontSize: 16,
    color: "#1A237E",
    marginRight: 8,
  },
  // sentimentLabel: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#37474F",
  // },
  // sentimentConfidence: {
  //   fontSize: 16,
  //   color: "#546E7A",
  //   marginTop: 4,
  //},
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 10,
  },
  // infoText: {
  //   fontSize: 16,
  //   color: "#455A64",
  //   marginBottom: 10,
  // },
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
  genreHighlight: {
    color: "#009688",
    fontWeight: "bold",
  },
  highlight: {
    color: "#FF5722",
  },
  chartContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  sentimentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "flex-start",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sentimentTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A237E",
    marginBottom: 8,
  },
  sentimentLabel: {
    fontSize: 24,
    fontWeight: "700",
    color: "#009688",
    marginBottom: 8,
  },
  sentimentConfidence: {
    fontSize: 16,
    color: "#546E7A",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: "#455A64",
    marginBottom: 14,
    lineHeight: 24,
  },
  infoTextBold: {
    fontWeight: "bold",
    color: "#3949AB",
  },
  customTip: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#3E2723",
    marginVertical: 10,
  },
});
