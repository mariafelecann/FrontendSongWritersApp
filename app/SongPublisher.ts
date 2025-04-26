// export interface Subscriber {
//   update(songs: any[]): void;
// }

// export class SongPublisher {
//   private static instance: SongPublisher;
//   private subscribers: Subscriber[] = [];
//   private songs: any[] = [];

//   private constructor() {}

//   public static getInstance(): SongPublisher {
//     if (!SongPublisher.instance) {
//       SongPublisher.instance = new SongPublisher();
//     }
//     return SongPublisher.instance;
//   }

//   subscribe(subscriber: Subscriber) {
//     this.subscribers.push(subscriber);
//   }

//   unsubscribe(subscriber: Subscriber) {
//     this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
//   }

//   notify() {
//     for (const subscriber of this.subscribers) {
//       subscriber.update(this.songs);
//     }
//   }

//   async fetchSongs(email: string) {
//     try {
//       const response = await fetch(
//         `http://192.168.100.36:5000/crud/songs?email=${email}`
//       );
//       const data = await response.json();
//       this.songs = data;
//       this.notify();
//     } catch (error) {
//       console.error("Failed to fetch songs:", error);
//     }
//   }

//   async addSong(song: {
//     title: string;
//     lyrics: string | string[];
//     genre: string;
//     email: string;
//   }) {
//     try {
//       const response = await fetch("http://192.168.100.36:5000/crud/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(song),
//       });

//       if (response.ok) {
//         await this.fetchSongs(song.email);
//       } else {
//         console.error("Failed to add song.");
//       }
//     } catch (error) {
//       console.error("Error adding song:", error);
//     }
//   }
// }
import axios from "axios";

export interface Subscriber {
  update(songs: any[]): void;
}

export class SongPublisher {
  private static instance: SongPublisher;
  private subscribers: Subscriber[] = [];
  private songs: any[] = [];

  private constructor() {}

  public static getInstance(): SongPublisher {
    if (!SongPublisher.instance) {
      SongPublisher.instance = new SongPublisher();
    }
    return SongPublisher.instance;
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  notify() {
    for (const subscriber of this.subscribers) {
      subscriber.update(this.songs);
    }
  }

  async fetchSongs(email: string) {
    try {
      const response = await axios.get(
        `http://192.168.100.36:5000/crud/songs`,
        { params: { email } }
      );
      this.songs = response.data;
      this.notify();
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
  }

  async addSong(
    title: string,
    lyrics: string | string[],
    genre: string,
    email: string
  ) {
    const payload = {
      title: title,
      email: email,
      lyrics,
      genre: genre,
    };
    try {
      const response = await axios.post(
        "http://192.168.100.36:5000/crud/add",
        payload
      );

      if (response.status === 200) {
        await this.fetchSongs(email);
      } else {
        console.error("Failed to add song:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  }
}
