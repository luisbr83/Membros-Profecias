import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// ATENÇÃO: Substitua os valores abaixo pelas suas credenciais do Firebase
const firebaseConfig = {
  projectId: "apocalypse-academy",
  appId: "1:868420666689:web:b40b3c7c5e42939c9e8dc0",
  storageBucket: "apocalypse-academy.firebasestorage.app",
  apiKey: "AIzaSyATNYQAVvpogL6Wj61PfFogF6lr26JETbY",
  authDomain: "apocalypse-academy.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "868420666689"
};

// Inicializa o Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
