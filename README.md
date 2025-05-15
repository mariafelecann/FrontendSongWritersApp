# 🎵 Romanian Songwriters App (Frontend)

This is the **frontend** of the **Romanian Songwriters mobile application**, developed using **Expo (React Native)**. The application helps Romanian songwriters write and analyze their lyrics through AI genre prediction and various linguistic statistics. This was made in an effort to fill the gap of NLP Romanian tools made for songwriters.

👉 [Backend Repository (Flask)](https://github.com/mariafelecann/BackendSongWritersApp)
👉 [Model Repository](https://github.com/mariafelecann/LicentaAI)

---

## 🚀 Features

- **User Authentication**  
  Register, log in, and manage your account securely.

- **Write & Analyze Songs**  
  Compose lyrics and receive instant AI feedback including:
  - Suggested genre
  - Song statistics

- **Save & View Songs**  
  Save analyzed songs and revisit them later through the song history.

---

## Some screenshots from the app:

![statistucsScreenGenre](https://github.com/user-attachments/assets/17c131cf-6636-471e-a31a-ede0ebfd5b03)


![registerScreen](https://github.com/user-attachments/assets/cd987e1b-4893-4540-9e18-aaaad1142985)


![newSongScreen](https://github.com/user-attachments/assets/49807301-e293-47c9-81e8-64bac26f787a)

## 🛠️ Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Flask (Python) – [See here](https://github.com/mariafelecann/BackendSongWritersApp)
- **Model**: Scikit-learn, Spacy, NumPy, Pandas, Joblib
- **Authentication**: JWT-based
- **State Management**: React hooks & context
- **Navigation**: React Navigation

---

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/SongwritersApp.git
   cd SongwritersApp
2. Install Dependencies: npm install
3. Run App: npx expo start
