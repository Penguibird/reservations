
import { initializeApp, getApp } from "firebase/app";
import { initializeFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyBFjmwM4CHsOVXtsgjPIEPY2whnPJIODyo",
    authDomain: "reserveroo-booking.firebaseapp.com",
    projectId: "reserveroo-booking",
    storageBucket: "reserveroo-booking.appspot.com",
    messagingSenderId: "1060356208276",
    appId: "1:1060356208276:web:9222e16e214052e41e2681"
};

export const app = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(app, {});

export const functions = getFunctions(app)

if (window.location.host.includes("localhost")) {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
}

