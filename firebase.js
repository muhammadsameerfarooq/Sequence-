import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw5BUA4alwQ6MZyj9NxzTjPLQ4YPkeR54",
  authDomain: "sequence-game-12b72.firebaseapp.com",
  projectId: "sequence-game-12b72",
  storageBucket: "sequence-game-12b72.appspot.com",
  messagingSenderId: "995246503908",
  appId: "1:995246503908:web:805d513b1002394345b9f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define an async function to add data to Firestore
async function addData() {
  try {
    // Get a reference to the "Games" collection
    const gamesCollection = collection(db, "Games");

    // Add a new document to the "Games" collection
    const newGameDocRef = await addDoc(gamesCollection, {
      title: "Super Mario Bros.",
      platform: "NES",
      year: 1985,
    });

    // Query the "Games" collection
    const querySnapshot = await getDocs(gamesCollection);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Call the async function to add data
addData();
