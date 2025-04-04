// import { useFonts } from "expo-font";
// import { useRouter } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import LottieView from "lottie-react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { prompts } from "C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/utilis/prompts";
// SplashScreen.preventAutoHideAsync();

// export default function HomeScreen() {
//   const router = useRouter();
//   const animationRef = useRef(null);
//   const [fontsLoaded] = useFonts({
//     "Montserrat-Regular": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-Regular.ttf"),
//     "Montserrat-SemiBold": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-SemiBold.ttf"),
//   });
//   const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     async function prepare() {
//       if (fontsLoaded) {
//         await SplashScreen.hideAsync();
//       }
//     }
//     prepare();
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.animationContainer}>
//         <LottieView
//           ref={animationRef}
//           source={require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/heyAnimation.json")}
//           style={styles.animation}
//           autoPlay
//           loop={false}
//         />
//       </View>
//       <TouchableOpacity
//         style={styles.addButton}
//         // onPress={() => router.push("/add-song")} // Assuming you have an 'add-song' route
//       >
//         <Text style={styles.addButtonText}>Add New Song</Text>
//       </TouchableOpacity>
//       <View style={styles.promptContainer}>
//         <Text style={styles.promptText}>Inspiration for today:</Text>
//         <Text style={styles.promptText}>{prompts[currentPromptIndex]}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start", // Align items from the top
//     alignItems: "center",
//     backgroundColor: "#f9f9f9", // Very light gray background for a clean feel
//     paddingTop: 80, // Add some top padding for status bar and spacing
//     paddingHorizontal: 20,
//   },
//   welcomeText: {
//     fontFamily: "Montserrat-SemiBold",
//     fontSize: 24,
//     color: "#333",
//     marginBottom: 20,
//   },
//   animationContainer: {
//     width: 150,
//     height: 150,
//     marginBottom: 40,
//   },
//   animation: {
//     width: "100%",
//     height: "100%",
//   },
//   addButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   addButtonText: {
//     fontFamily: "Montserrat-Regular",
//     fontSize: 18,
//     color: "white",
//     fontWeight: "bold",
//   },
//   promptContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   promptText: {
//     fontSize: 16,
//     fontStyle: "italic",
//     color: "#555",
//     textAlign: "center",
//   },
// });
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { prompts } from "C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/utilis/prompts"; // Assuming correct relative path

SplashScreen.preventAutoHideAsync();

const { width: screenWidth } = Dimensions.get("window");
const PROMPT_WIDTH = screenWidth * 0.8; // Adjust as needed
const PROMPT_MARGIN = 10;

export default function HomeScreen() {
  const router = useRouter();
  const animationRef = useRef(null);
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/fonts/Montserrat-SemiBold.ttf"),
  });
  const scrollRef = useRef<ScrollView>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPromptIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % prompts.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: nextIndex * (PROMPT_WIDTH + PROMPT_MARGIN),
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 11000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (scrollRef.current && fontsLoaded) {
      scrollRef.current.scrollTo({
        x: currentPromptIndex * (PROMPT_WIDTH + PROMPT_MARGIN) + 100,
        animated: true,
      });
    }
  }, [currentPromptIndex, fontsLoaded]);

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

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          ref={animationRef}
          source={require("C:/Users/maria/OneDrive/Desktop/LICENTA/frontend_licenta/my-app/assets/heyAnimation.json")}
          style={styles.animation}
          autoPlay
          loop={false}
        />
      </View>
      <Link style={styles.addButton} href="/newsong">
        <Text style={styles.addButtonText}>Add New Song</Text>
      </Link>
      <View style={styles.inspirationContainer}>
        <Text style={styles.inspirationTitle}>Inspiration for today:</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled // Snap to each prompt
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onMomentumScrollEnd={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / (PROMPT_WIDTH + PROMPT_MARGIN));
            setCurrentPromptIndex(index);
          }}
        >
          {prompts.map((prompt, index) => (
            <View
              key={index}
              style={[
                styles.promptCard,
                { width: PROMPT_WIDTH, marginHorizontal: PROMPT_MARGIN },
              ]}
            >
              <Text style={styles.promptText}>{prompt}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  animationContainer: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  animation: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 30,
  },
  addButtonText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  inspirationContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  inspirationTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: PROMPT_MARGIN,
  },
  promptCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  promptText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
  },
});
