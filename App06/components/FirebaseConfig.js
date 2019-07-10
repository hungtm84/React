import * as firebase from 'firebase';
// var firebaseConfig = {
//     apiKey: "AIzaSyDyqQM1bPP6_04mucs_IqmV95Xy5R0ZGFU",
//     authDomain: "app05-f7159.firebaseapp.com",
//     databaseURL: "https://app05-f7159.firebaseio.com",
//     projectId: "app05-f7159",
//     storageBucket: "",
//     messagingSenderId: "658688860314",
//     appId: "1:658688860314:web:afcc5392693b9ce3"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyDyqQM1bPP6_04mucs_IqmV95Xy5R0ZGFU",
  authDomain: "app05-f7159.firebaseapp.com",
  databaseURL: "https://app05-f7159.firebaseio.com",
  projectId: "app05-f7159",
  storageBucket: "app05-f7159.appspot.com",
  messagingSenderId: "658688860314",
  appId: "1:658688860314:web:afcc5392693b9ce3"
};
 export const   firebaseApp = firebase.initializeApp(firebaseConfig);
  