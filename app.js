var firebaseConfig = {
    apiKey: "AIzaSyCNN0Uge5RExAFY9aZyQdQA4l51-DOEY4w",
    authDomain: "webappproject-83551.firebaseapp.com",
    databaseURL: "https://webappproject-83551.firebaseio.com",
    projectId: "webappproject-83551",
    storageBucket: "webappproject-83551.appspot.com",
    messagingSenderId: "33919573347",
    appId: "1:33919573347:web:b0b3f85e65ba410f048756",
    measurementId: "G-CSQ7Y9PQV0"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var provider = new firebase.auth.GoogleAuthProvider();
  
  function signinGoogle() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

    });
}