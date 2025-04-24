import { StyleSheet, Text, View } from "react-native";
import { TabComponentProps } from "./TabComponentInterface";

export function RithmTab({ sentiment, genre }: TabComponentProps) {
  let genreKeyRithm = "unknown";

  if (Array.isArray(genre) && typeof genre[0] === "string") {
    genreKeyRithm = genre[0].toLowerCase();
  } else if (typeof genre === "string") {
    genreKeyRithm = genre.toLowerCase();
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
        Your lyrics matched <Text style={styles.genreHighlight}>{genre}</Text>,
        so here’s how to vibe with that rhythmically:
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>🌀 Rhythm Tip:</Text> {tip.rhythm}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>⏱ Tempo Range:</Text> {tip.tempo}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>🎧 Pro Tip:</Text> {tip.extra}
      </Text>

      <Text style={styles.infoText}>
        Use these suggestions as a creative springboard — sometimes, breaking
        the rules makes the best groove.
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
