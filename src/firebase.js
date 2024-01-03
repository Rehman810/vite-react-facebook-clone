import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD93WyvlqmBo_CkChloCabFARucdoDILIA",
  authDomain: "facebook-clone-fe696.firebaseapp.com",
  projectId: "facebook-clone-fe696",
  storageBucket: "facebook-clone-fe696.appspot.com",
  messagingSenderId: "172533380090",
  appId: "1:172533380090:web:2f80ab7f5f80d7cefdaa43",
  measurementId: "G-2GH8KQ7ZNX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
