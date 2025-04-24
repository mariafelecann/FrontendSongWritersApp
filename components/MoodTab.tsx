import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabComponentProps } from "./TabComponentInterface";

export function MoodTab({ sentiment, genre }: TabComponentProps) {
  const genreKey = Array.isArray(genre)
    ? genre[0].toLowerCase()
    : genre.toLowerCase();
  let customTip = "";

  if (sentiment.label === "Positive 😊") {
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
  } else if (sentiment.label === "Negative 😠") {
    if (genreKey === "pop") {
      customTip =
        "Negative pop lyrics can add an interesting contrast. Imagine sad lyrics with an upbeat melody — think of Robyn’s 'Dancing On My Own'!";
    } else if (genreKey === "country") {
      customTip =
        "Country music's negative themes often dive into heartache, betrayal, or loss. A steel guitar with a melancholic vibe can help carry this mood.";
    } else if (genreKey === "rap") {
      customTip =
        "Rap with a negative tone can be raw and emotional, diving into struggle or disillusionment. Dark beats with impactful lyricism fit well here.";
    } else if (genreKey === "rock") {
      customTip =
        "Negative rock lyrics, especially in alternative or grunge, can be cathartic. Deeply emotional or introspective lyrics paired with distorted guitars create a raw atmosphere.";
    }
  } else if (sentiment.label === "Neutral 😐") {
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
      <Text style={styles.sentimentLabel}>{sentiment.label}</Text>
      <Text style={styles.sentimentConfidence}>
        Confidence: {(sentiment.confidence * 100).toFixed(1)}%
      </Text>

      <Text style={styles.infoText}>
        This mood suggests your lyrics carry a{" "}
        <Text style={styles.infoTextBold}>{sentiment.label.toLowerCase()}</Text>{" "}
        emotional tone.
      </Text>

      <Text style={styles.customTip}>{customTip}</Text>

      <Text style={styles.infoText}>
        Consider how this mood ties into the broader musical arrangement. For
        example, a positive mood might inspire a light, upbeat melody, while a
        negative tone could benefit from darker, more intense instrumentation.
        Experiment with tempo, key choice, and dynamics to further enhance the
        emotional impact of the lyrics.
      </Text>
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
