import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabComponentProps } from "./TabComponentInterface";

export function WordTab({ lyrics, sentiment, genre }: TabComponentProps) {
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
  const { repetitionScore, uniqueRatio } = computeRepetitionScore(
    (lyrics as string) || ""
  );
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Statistici despre cuvintele tale 🧠</Text>

      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>Scor de repetiție: </Text>
        {repetitionScore.toFixed(2)} - Asta înseamnă că aproximativ{" "}
        {(repetitionScore * 100).toFixed(1)}% din cuvintele din versurile tale
        se repetă.
      </Text>

      <Text style={styles.infoText}>
        Cântecele cu repetiție mare sunt catchy și ritmate.
        <Text style={styles.highlight}>Pop - ul </Text> și{" "}
        <Text style={styles.highlight}>Muzica Populară </Text>
        tind să urmeze această statistică.
      </Text>

      <Text style={styles.infoText}>
        În contrast, un scor mic indică un vocabular bogat, adesea întâlnit în{" "}
        <Text style={styles.highlight}>Rap</Text> sau{" "}
        <Text style={styles.highlight}>Rock</Text>.
      </Text>

      <Text style={styles.infoText}>
        Versurile tale se aseamănă cu genul{" "}
        <Text style={styles.genreHighlight}>{genre}</Text>, care{" "}
        {repetitionScore < 0.15
          ? "surprinde adesea un vocabular bogat."
          : "se bazează pe versuri catchy, ușor de memorat."}
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
