import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP585D1N8n4rtIKdk1fJYv63vWZXH8T24",
  authDomain: "interniche-514b1.firebaseapp.com",
  projectId: "interniche-514b1",
  storageBucket: "interniche-514b1.firebasestorage.app",
  messagingSenderId: "845549459604",
  appId: "1:845549459604:web:263c02ef1fb1e0f9d6bc81",
  measurementId: "G-MCHWDK53E6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;