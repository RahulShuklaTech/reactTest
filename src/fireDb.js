import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA_fYoyhIb6IeUfoQ_4FrALiqi_vt5qQHw",
  authDomain: "tripplanner-a2b70.firebaseapp.com",
  projectId: "tripplanner-a2b70",
  storageBucket: "tripplanner-a2b70.appspot.com",
  messagingSenderId: "135307287578",
  appId: "1:135307287578:web:944f5915767e7dc00505a3"
};

const fireDb =   firebase.initializeApp(firebaseConfig);

export default fireDb;