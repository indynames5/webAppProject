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

var db = firebase.firestore();

document.addEventListener('init', function (event) {
    var page = event.target;


    if (page.id === 'homePage') {
        console.log("homePage");

        $("#menubtn").click(function () {
            $("#sidemenu")[0].open();
        });

        // $('#carousel').empty();

        db.collection("reccomment").get().then((querySnapshot) => {
            console.log("connect")
            var i=0;
            querySnapshot.forEach((doc) => {
                console.log(i++);
                //console.log(`${doc.id} => ${doc.data()}`);
                var item = `<ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
        <div class="thumbnail" style="background-image: url('${doc.data().picture}')">
        </div>
        <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
        </ons-carousel-item>`;
                $('#carousel').append(item);
            });
        });

    }

    if (page.id === 'menuPage') {
        console.log("menuPage");

        $("#login").click(function () {
            $("#content")[0].load("login.html");
            $("#sidemenu")[0].close();
        });

        $("#logout").click(function () {
        });

        $("#home").click(function () {
            $("#content")[0].load("home.html");
            $("#sidemenu")[0].close();
        });
    }


    if (page.id === 'loginPage') {
        console.log("loginPage");

        function signinGoogle() {

        }

        $("#signinbtn").click(function () {
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    var token = result.credential.accessToken;
                }
                var user = result.user;
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        });
        $("#backhomebtn").click(function () {
            $("#content")[0].load("home.html");
        });
    }


})