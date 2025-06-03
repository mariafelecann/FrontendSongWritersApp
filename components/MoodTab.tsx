import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabComponentProps } from "./TabComponentInterface";

export function MoodTab({ sentiment, genre }: TabComponentProps) {
  const genreKey = Array.isArray(genre)
    ? genre[0].toLowerCase()
    : genre.toLowerCase();
  let customTip = "";

  if (sentiment.label === "Pozitiv 😊") {
    if (genreKey === "pop") {
      customTip =
        "Muzica pop prinde viață cu versuri pozitive și optimiste. Gândește-te la refrene care rămân în minte, mesaje care te fac să te simți bine și ritmuri de dans!";
    } else if (genreKey === "country") {
      customTip =
        "Muzica populară îmbrățișează pozitivitatea prin teme ca iubirea pentru țară, familia sau natura. O vioară sau un acordeon pot adăuga farmec și căldură melodiei";
    } else if (genreKey === "rap") {
      customTip =
        "Versurile pozitive în rap pot transmite încredere, succes și voie bună. Combină-le cu un beat energic și o interpretare sigură pe sine!";
    } else if (genreKey === "rock") {
      customTip =
        "Rock-ul pozitiv are adesea un aer imnistic, perfect pentru refrene puternice. Gândește-te la riff-uri de chitară optimiste și atmosferă de concert!";
    }
  } else if (sentiment.label === "Negativ 😠") {
    if (genreKey === "pop") {
      customTip =
        "Versurile negative în muzica pop pot crea un contrast interesant. Imaginează-ți versuri triste acompaniate de o melodie veselă – cum e piesa 'Dancing On My Own' de Robyn!";
    } else if (genreKey === "country") {
      customTip =
        "Temele negative în muzica populară explorează adesea suferința, trădarea sau pierderea. O vioară poate amplifica această stare.";
    } else if (genreKey === "rap") {
      customTip =
        "Rap-ul cu ton negativ poate fi sincer și emoțional, abordând lupte interioare sau dezamăgiri. Beat-uri întunecate și versuri profunde se potrivesc perfect.";
    } else if (genreKey === "rock") {
      customTip =
        "Versurile negative în rock, mai ales în alternative sau grunge, pot fi eliberatoare. Emoții puternice sau introspecție, însoțite de chitare distorsionate, creează o atmosferă brută.";
    }
  } else if (sentiment.label === "Neutru 😐") {
    if (genreKey === "pop") {
      customTip =
        "Versurile neutre în pop sunt adesea jucăușe sau observaționale. Concentrează-te pe ritmuri catchy și o melodie simplă, dar eficientă.";
    } else if (genreKey === "country") {
      customTip =
        "Muzica populară cu versuri neutre funcționează bine pentru povești, într-un stil narativ, cu o vioară pe fundal.";
    } else if (genreKey === "rap") {
      customTip =
        "Versurile neutre în rap pot fi reflexive sau observaționale. Combină-le cu un beat calm, punând accent pe flow și lirism, pentru un vibe relaxat.";
    } else if (genreKey === "rock") {
      customTip =
        "Rock-ul neutru este versatil, dar strălucește în subgenurile alternative. Pune accent pe instrumentație dinamică, alternând între versuri introspective și refrene energice.";
    }
  }

  return (
    <View style={styles.sentimentCard}>
      <Text style={styles.sentimentTitle}>Mood-ul versurilor tale:</Text>
      <Text style={styles.sentimentLabel}>{sentiment.label}</Text>
      <Text style={styles.sentimentConfidence}>
        Confidence: {(sentiment.confidence * 100).toFixed(1)}%
      </Text>

      <Text style={styles.infoText}>
        Acest mood sugerează că versurile tale transmit un ton{" "}
        <Text style={styles.infoTextBold}>{sentiment.label.toLowerCase()}</Text>{" "}
      </Text>

      <Text style={styles.customTip}>{customTip}</Text>

      <Text style={styles.infoText}>
        Gândește-te cum se poate lega acest sentiment cu aranjamentul muzical.
        De exemplu, o stare pozitivă poate inspira o melodie veselă și energică,
        în timp ce un ton negativ s-ar potrivi mai bine cu o instrumentație
        lentă și intensă. Experimentează cu tempo-ul, tonalitatea și dinamica
        pentru a amplifica impactul emoțional al versurilor.
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
