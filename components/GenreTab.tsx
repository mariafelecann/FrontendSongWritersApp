import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Importăm LineChart din react-native-gifted-charts
import { LineChart } from "react-native-gifted-charts";
// Asumăm că această interfață este definită altundeva
import { TabComponentProps } from "./TabComponentInterface";

export function GenreTab({
  decisionValues,
  sentiment, // Sentiment is not used in this specific component
  genre,
}: TabComponentProps) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const screenWidth = Dimensions.get("window").width;

  // Asigurăm că decisionValues este un array valid de numere
  // Transformăm datele în formatul așteptat de react-native-gifted-charts
  // [{value: y1}, {value: y2}, ...]
  const rawDataForChart =
    Array.isArray(decisionValues) && decisionValues.length > 0
      ? Array.isArray(decisionValues[0])
        ? decisionValues[0]
        : decisionValues
      : [0, 0, 0, 0]; // Fallback la un array de zero dacă datele nu sunt valide

  //   const chartDataGifted = rawDataForChart.map((value) => ({ value: value }));
  const xAxisLabels = ["country", "pop", "rap", "rock"];
  const chartDataGifted = rawDataForChart.map((value, index) => ({
    value: value,
    label: xAxisLabels[index] || `Genre ${index + 1}`,
  }));

  // Etichetele pentru axa X

  // Determinăm valoarea maximă din date pentru a ajusta axa Y
  const maxValue = Math.max(...rawDataForChart);
  //   const stepValue = maxValue > 0 ? parseFloat((maxValue / 4).toFixed(1)) : 0.2;
  // // Calculează un pas rezonabil, evită divizia cu zero
  const yAxisMaxValue = maxValue > 0 ? maxValue * 1.1 : 1;
  const noOfSections = 4; // Aproximativ 4-5 secțiuni pe axa Y
  const stepValue = yAxisMaxValue / noOfSections;
  const containerHorizontalPadding = 20; // Ajustează dacă padding-ul real e altul
  const availableWidthForChartContainer =
    screenWidth - containerHorizontalPadding * 2;

  const innerWidth =
    availableWidthForChartContainer - styles.chartContainer.padding * 2;

  const yAxisLabels = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  const yValues = chartDataGifted.map((item) => item.value);
  const maxY = Math.max(...yValues);
  const minY = Math.min(...yValues);
  const buffer = 10; // Add a buffer so the top/bottom of chart isn't cramped
  const adjustedMax = Math.ceil((maxY + buffer) / 10) * 10;
  const adjustedMin = Math.floor((minY - buffer) / 10) * 10;
  const sections = 4;

  const step = Math.round((adjustedMax - adjustedMin) / sections);
  const yAxisLabelTexts = Array.from({ length: sections + 1 }, (_, i) =>
    (adjustedMin + step * i).toString()
  );

  return (
    <>
      <View style={styles.chartContainer}>
        {/* Graficul Linie din gifted-charts */}
        <LineChart
          areaChart
          curved
          isAnimated
          animationDuration={1200}
          pointerConfig={{}}
          data={chartDataGifted}
          startFillColor="rgb(237, 122, 14)"
          startOpacity={0.8}
          endFillColor="rgb(234, 202, 86)"
          endOpacity={0.3}
          showYAxisIndices={true}
          yAxisThickness={2}
          yAxisColor="#3949AB"
          noOfSections={4}
          height={80}
          yAxisLabelTexts={yAxisLabelTexts}
        />
      </View>
      <Text style={styles.infoTitle}>Analiza Genului Muzical</Text>
      <Text style={styles.infoText}>
        Am creat o diagramă care arată încadrarea versurilor tale în diferite
        genuri muzicale.
        {"\n"}
        <Text style={styles.genreHighlight}>
          Genul care se potrivește cel mai bine cu versurile tale este{" "}
          {genre || "N/A"}.
        </Text>
      </Text>
      <TouchableOpacity
        style={styles.toggleDetailsButton}
        onPress={toggleDetails}
      >
        <Text style={styles.toggleDetailsText}>
          {showDetails
            ? "Arată mai puțin"
            : "Află mai multe despre cum să interpretezi diagrama"}{" "}
          <Text style={{ color: "#1A237E", fontSize: 16 }}>
            {showDetails ? " ▲" : " ▼"}
          </Text>
        </Text>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {" "}
            {/* Applied infoText style here */}
            <Text style={styles.infoTextBold}>Axa X: </Text>
            Acestea sunt toate genurile muzicale prezise. Cântecul tău este
            comparat cu genurile{" "}
            <Text style={styles.highlight}>
              Muzică Populară, Pop, Rap, și Rock
            </Text>
            .{"\n\n"}
            <Text style={styles.infoTextBold}>Axa Y: </Text>
            Acest grafic funcționează ca un scor: îți arată cât de bine se
            potrivește melodia ta cu fiecare gen. Cu cât bara este mai sus, cu
            atât{" "}
            <Text style={styles.highlight}>compatibilitatea e mai mare</Text>!
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20, // Păstrăm padding-ul orizontal al ecranului
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
  toggleDetailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleDetailsText: {
    fontSize: 16,
    color: "#1A237E",
    // Removed marginRight: 8 as text character might need less spacing
  },
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
  //   },
  //   chartContainer: {
  //     marginVertical: 10,
  //     borderRadius: 16, // Aplicăm border radius pe container
  //     overflow: "hidden",
  //     backgroundColor: "#fff", // Folosim un background solid pe container
  //     padding: 10, // Adăugăm padding interior containerului
  //     width: "100%",
  //     marginBottom: 20,
  //     shadowColor: "#000", // Adăugat shadow pentru consistență
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 8,
  //     elevation: 3,
  //     // Înălțimea totală a containerului graficului
  //   },,
  chartContainer: {
    marginVertical: 10, // Spațiu sus/jos față de elementele din jur
    borderRadius: 16, // Colțuri rotunjite
    overflow: "hidden", // Asigură că graficul stă în limitele containerului rotunjit
    backgroundColor: "#fff", // Fundal alb pentru cardul graficului
    padding: 16, // <-- Am mărit padding-ul interior pentru mai mult spațiu în jurul graficului
    width: "100%", // Ocupă toată lățimea disponibilă
    marginBottom: 20,
    // Stiluri pentru umbră (funcționează pe iOS și Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
