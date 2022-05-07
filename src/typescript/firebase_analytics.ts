import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMa2kdIs_H9fmWHj11JPdoVk0Yzu7IphU",
  authDomain: "js-wasm-benchmarks.firebaseapp.com",
  projectId: "js-wasm-benchmarks",
  storageBucket: "js-wasm-benchmarks.appspot.com",
  messagingSenderId: "916826026693",
  appId: "1:916826026693:web:9c54a5185f5900143976ac",
  measurementId: "G-98B0V8P34S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);