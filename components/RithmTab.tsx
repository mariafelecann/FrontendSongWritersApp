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
        "Structură simplă în 4/4, cu accente pe timpii 2 și 4. Groove-uri scurte și repetitive",
      tempo: "Ideal între 100 și 130 BPM — rapid, dar nu grăbit.",
      extra:
        "Pop-ul prinde atunci când e catchy, iar durata cântecului ar trebui să fie între 2-3 minute. Nu uita: Versuri simple, ritm ușor de ținut minte, și loc pentru voce să strălucească",
    },
    rap: {
      rhythm:
        "Norma în majoritatea pieselor rap este un ritm de 4/4, cu toba mare pe timpul 1 și 3, și snare pe 2 și 4.",
      tempo:
        "Între 80 și 110 BPM, ca să ai timp să construiești rime și să-ți variezi livrarea.",
      extra:
        "Poți merge pe un beat minimalist sau pe unul complex — important e să lași versurile să conducă. Joacă-te cu ritmul, rimele și pauzele pentru impact.",
    },
    rock: {
      rhythm:
        "Preponderent în piesele rock se folosește un ritm de 4/4, dar dacă te îndrepți spre ceva mai alternativ, poți considera și ritmuri de 5/4, 7/8, sau 6/8. Accentele sunt pe timpii 2 și 4, iar tobele susțin energia și riff-urile de chitară dau personalitate.",
      tempo:
        "De obicei între 100-140 BPM. Trebuie să aibă forță, dar și spațiu pentru tranziții puternice.",
      extra:
        "Dacă ai o chitară electrică, te descurci. Și nu uita: În rock iubim contrastul. Folosește schimbări în ritm ca să contruiești tensiune — versuri liniștite, o explozie la refren.",
    },
    country: {
      rhythm:
        "Ritmurile variază în funcție de zonă — de la doine lente la hore și sârbe alerte. Se folosește 2/4, 3/4 sau chiar 7/8 în unele cazuri regionale.",
      tempo:
        "Poate fi foarte lent (60-80 BPM, ca în doine) sau foarte rapid (120-160 BPM, cum e la sârbă).",
      extra:
        "Muzica populară spune povești despre viață, dragoste și sat. Instrumentele tradiționale — vioară, nai, acordeon — creează un sunet cald și autentic, e o idee bună să le integrezi :).",
    },
  };

  const tip = genreTips[genreKeyRithm] || {
    rhythm:
      "Cel mai folosit ritm în muzica modernă este de 4/4. Este standardul industrial, pentru că este ușor de urmărit și dansabil.",
    tempo:
      "Un tempo pun ar fi între 90-120 BPM —păstrează atenția, dar lasă loc pentru creativitate.",
    extra:
      "Genul ăsta e un blend. Inspiră-te din mai multe genuri muzicale, și păstrează ce se potrivește.",
  };

  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Rithm & Tempo Insights 🥁</Text>
      <Text style={styles.infoText}>
        Versurile tale se aseamănă genului{" "}
        <Text style={styles.genreHighlight}>
          {genre == "country" ? "muzică populară" : genre}
        </Text>
        , uite niște recomandări pentru linia melodică:
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>🌀 Ritmul:</Text> {tip.rhythm}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>⏱ Tempo:</Text> {tip.tempo}
      </Text>

      <Text style={styles.infoText}>
        <Text style={styles.infoTextBold}>🎧 Tip:</Text> {tip.extra}
      </Text>

      <Text style={styles.infoText}>
        Ia ce-ți place din sugestiile astea și fă-le ale tale :)
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
