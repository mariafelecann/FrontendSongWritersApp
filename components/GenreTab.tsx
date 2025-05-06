// import { FontAwesome } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { TabComponentProps } from "./TabComponentInterface";

// export function GenreTab({
//   decisionValues,
//   sentiment,
//   genre,
// }: TabComponentProps) {
//   const [showDetails, setShowDetails] = useState(false);

//   const toggleDetails = () => {
//     setShowDetails((prevState) => !prevState);
//   };
//   //   const flatDecisionValues: number[] = decisionValues[0] || [];

//   const screenWidth = Dimensions.get("window").width;

//   const chartData = {
//     labels: ["country", "pop", "rap", "rock"],
//     datasets: [
//       {
//         data: decisionValues,
//         strokeWidth: 2,
//       },
//     ],
//   };

//   return (
//     <>
//       <View style={styles.chartContainer}>
//         <LineChart
//           data={chartData}
//           width={screenWidth - 40}
//           height={220}
//           chartConfig={{
//             backgroundColor: "#e26a00",
//             backgroundGradientFrom: "#ff9e00",
//             backgroundGradientTo: "#ff9e00",
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: { borderRadius: 16 },
//             propsForDots: {
//               r: "6",
//               strokeWidth: "2",
//               stroke: "#ffa726",
//             },
//           }}
//           bezier
//         />
//       </View>
//       <Text style={styles.infoTitle}>Genre Analysis</Text>
//       <Text style={styles.infoText}>
//         This is a genre chart based on your lyrics.{"\n"}
//         <Text style={styles.genreHighlight}>
//           Your lyrics resemble {genre} the most.
//         </Text>
//       </Text>
//       <TouchableOpacity
//         style={styles.toggleDetailsButton}
//         onPress={toggleDetails}
//       >
//         <Text style={styles.toggleDetailsText}>
//           {showDetails
//             ? "Show less"
//             : "Find more about how to interpret this diagram"}{" "}
//           <FontAwesome
//             name={showDetails ? "angle-up" : "angle-down"}
//             size={16}
//             color="#1A237E"
//           />
//         </Text>
//       </TouchableOpacity>
//       {showDetails && (
//         <View style={styles.infoBox}>
//           <Text>
//             <Text style={styles.infoTextBold}>X-axis: </Text>
//             These are all the possible predicted genres. It's where your song is
//             compared to{" "}
//             <Text style={styles.highlight}>Country, Pop, Rap, and Rock</Text>.
//             {"\n\n"}
//             <Text style={styles.infoTextBold}>Y-axis: </Text>
//             This is like a scoreboard that tells you how well your song fits
//             each genre. The higher the bar, the{" "}
//             <Text style={styles.highlight}>stronger the match</Text>!
//           </Text>
//         </View>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#1A237E",
//     marginBottom: 6,
//     marginTop: 50,
//   },
//   genre: {
//     fontSize: 40,
//     fontWeight: "800",
//     color: "#009688",
//     marginBottom: 20,
//   },
//   tabMenu: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 20,
//   },
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: "#E0E0E0",
//     width: "22%",
//     alignItems: "center",
//   },
//   // infoTextBold: {
//   //   fontWeight: "bold",
//   //   color: "#3949AB",
//   // },
//   activeTabButton: {
//     backgroundColor: "#3949AB",
//   },
//   tabText: {
//     fontSize: 14,
//     color: "#37474F",
//   },
//   activeTabText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   scrollViewContent: {
//     paddingBottom: 80,
//   },
//   // sentimentCard: {
//   //   backgroundColor: "#FFFFFF",
//   //   borderRadius: 16,
//   //   padding: 16,
//   //   marginBottom: 20,
//   //   alignItems: "center",
//   //   width: "100%",
//   // },
//   // sentimentTitle: {
//   //   fontSize: 18,
//   //   color: "#1A237E",
//   //   fontWeight: "600",
//   //   marginBottom: 6,
//   // },
//   toggleDetailsButton: {
//     marginTop: 10,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   toggleDetailsText: {
//     fontSize: 16,
//     color: "#1A237E",
//     marginRight: 8,
//   },
//   // sentimentLabel: {
//   //   fontSize: 24,
//   //   fontWeight: "bold",
//   //   color: "#37474F",
//   // },
//   // sentimentConfidence: {
//   //   fontSize: 16,
//   //   color: "#546E7A",
//   //   marginTop: 4,
//   //},
//   infoBox: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 30,
//     width: "100%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   infoTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1A237E",
//     marginBottom: 10,
//   },
//   // infoText: {
//   //   fontSize: 16,
//   //   color: "#455A64",
//   //   marginBottom: 10,
//   // },
//   backButton: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#3f51b5",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//   },
//   backButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   genreHighlight: {
//     color: "#009688",
//     fontWeight: "bold",
//   },
//   highlight: {
//     color: "#FF5722",
//   },
//   chartContainer: {
//     marginVertical: 10,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     padding: 10,
//     width: "100%",
//     marginBottom: 20,
//   },
//   sentimentCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: "flex-start",
//     width: "100%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   sentimentTitle: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#1A237E",
//     marginBottom: 8,
//   },
//   sentimentLabel: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#009688",
//     marginBottom: 8,
//   },
//   sentimentConfidence: {
//     fontSize: 16,
//     color: "#546E7A",
//     marginBottom: 16,
//   },
//   infoText: {
//     fontSize: 16,
//     color: "#455A64",
//     marginBottom: 14,
//     lineHeight: 24,
//   },
//   infoTextBold: {
//     fontWeight: "bold",
//     color: "#3949AB",
//   },
//   customTip: {
//     fontSize: 16,
//     fontStyle: "italic",
//     color: "#3E2723",
//     marginVertical: 10,
//   },
// });
