/*
  ── FIREBASE CONFIGURATION ─────────────────────────────────────────────────────

  These keys are safe to include in a client-side web app — Firebase is designed
  this way. They do NOT grant admin access. What protects your data is Firebase
  Security Rules set in the Firebase Console under:
    Realtime Database → Rules

  Recommended rules to paste in (replace the default):

  {
    "rules": {
      "rooms": {
        "$roomId": {
          ".read": "auth != null",
          ".write": "auth != null"
        }
      },
      "players": {
        "$uid": {
          ".read": "auth != null",
          ".write": "auth != null && auth.uid === $uid"
        }
      }
    }
  }

  This ensures:
  - Only authenticated users (even anonymous) can read/write rooms
  - Players can only write to their OWN record (prevents stat tampering)
  - Anyone authenticated can read the leaderboard

  ────────────────────────────────────────────────────────────────────────────────
*/

export const firebaseConfig = {
  apiKey:            "AIzaSyDeJPD7Ay14L1As3K4HkWU04Go4IBPW0wA",
  authDomain:        "gladiator-gauntlet.firebaseapp.com",
  databaseURL:       "https://gladiator-gauntlet-default-rtdb.firebaseio.com",
  projectId:         "gladiator-gauntlet",
  storageBucket:     "gladiator-gauntlet.firebasestorage.app",
  messagingSenderId: "803427197228",
  appId:             "1:803427197228:web:f0bd48a2eecc24dd648c89"
};
