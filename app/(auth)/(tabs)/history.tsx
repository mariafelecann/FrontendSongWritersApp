import { useSession } from "@/app/session";
import { SongPublisher, Subscriber } from "@/app/SongPublisher";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HistoryScreen() {
  const { session } = useSession();
  const [songs, setSongs] = useState<any[]>([]);
  const publisher = SongPublisher.getInstance();
  const [selectedSong, setSelectedSong] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const subscriber: Subscriber = {
      update: (newSongs) => {
        setSongs(newSongs);
      },
    };

    publisher.subscribe(subscriber);

    const email = session ? JSON.parse(session).email : null;
    console.info("email: ", email);
    if (email) {
      console.info("email: ", email);
      publisher.fetchSongs(email);
    }

    return () => {
      publisher.unsubscribe(subscriber);
    };
  }, [session]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your song history 🎶</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => {
              setSelectedSong(item);
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songGenre}>{item.genre}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedSong?.title}</Text>
            <Text style={styles.modalSubtitle}>
              Genre: {selectedSong?.genre}
            </Text>
            <ScrollView style={styles.scrollView}>
              <Text selectable style={styles.modalLyrics}>
                {selectedSong?.lyrics}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  songItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#eceff1",
    borderRadius: 8,
  },
  songTitle: { fontSize: 18, fontWeight: "bold" },
  songGenre: { fontSize: 14, color: "#607d8b" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  modalLyrics: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#3f51b5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
