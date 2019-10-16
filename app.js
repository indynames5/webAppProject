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

var type = "";
var menuid
var setType = function (input) {
    type = input
}
var getType = function () {
    return type
}
var setMenuID = function (refId){
    console.log(refId+" Clicked!");
    $("#content")[0].load("home.html");
    menuId=refId
}
var getMenuId = function (){
    return menuId
}


document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'homePage') {
        console.log("homePage");

        $("#menubtn").click(function () {
            $("#sidemenu")[0].open();
        });

        db.collection("reccomment").orderBy("rate", "desc").limit(5)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var item = `
                <ons-carousel-item id="${doc.data().id}" style="background-size: 100%; 100%; width: 100%;height: 190px; background-image: url('${doc.data().picture}')">
                <div style="font-size: 15px;background-color:purple;width: 60px;color: #fff;margin-left: 315px;height: 25px;margin-top: 15px;">
                    <i class="fas fa-star" style="color: orange; margin-left:10px; margin-top:5px;"></i> ${doc.data().rate}</div>
                <div style="font-size: 15px;background-color:purple;width: 60px;color: #fff;margin-top: 15px;margin-left: 315px;padding-left: 8px;"></i> ${doc.data().delivery} min</div>
                    <div style="text-align: center; font-size: 30px; padding-top:5px;margin-top: 75px; color: #fff; height: 46px;  background-color:black; opacity: 0.6;">
                    ${doc.data().name}</div></ons-carousel-item>`;
                    $('#carousel').append(item);
                });
            });

        $("#noodle").click(function () {
            setType("noodle")
            console.log(type);
            console.log("click");
            $("#content")[0].load("list.html");
        }); $("#burger").click(function () {
            setType("burger")
            console.log(type);
            $("#content")[0].load("list.html");
        }); $("#steak").click(function () {
            setType("steak")
            console.log(type);
            $("#content")[0].load("list.html");
        }); $("#sushi").click(function () {
            setType("sushi")
            console.log(type);
            $("#content")[0].load("list.html");
        }); $("#pizza").click(function () {
            setType("pizaa")
            console.log(type);
            $("#content")[0].load("list.html");
        }); $("#salad").click(function () {
            setType("salad")
            console.log(type);
            $("#content")[0].load("list.html");
        });

    }
    if (page.id === 'listPage') {
        console.log("listPage");
        console.log(getType());
        $("#sidemenu")[0].close();

        db.collection("reccomment").where("type", "==", getType()).orderBy("rate", "desc")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var item = `<ons-card id="${doc.data().id}" onclick="testClick('${doc.data().id}')"  style="background-size: 100%; 90%;width: 350px;height: 190px;background-image: url('${doc.data().picture}');padding-right: 0px;padding-left: 0px; margin:15px;">
                    <div style="font-size: 15px;background-color:purple;width: 60px;color: white;margin-left: 290px;height: 25px;margin-top: 15px;">
                        <i class="fas fa-star" style="color: orange; margin-left:10px; margin-top:5px;"></i> ${doc.data().rate}</div>
                    <div style="font-size: 15px;background-color:purple;width: 52px;color: white ;margin-top: 15px;margin-left: 290px;padding-left: 8px;height: 17px;"></i> ${doc.data().delivery} min </div>
                        <div style="text-align: center; font-size: 30px; padding-top:5px;margin-top: 53px; color: white; height: 46px;  background-color:purple; border-radius: 0px 0px 10px 10px;">
                        ${doc.data().name}</div></ons-card>`
                    $('#list').append(item);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        $("#backbtn").click(function () {
            $('#list').empty();
            $("#content")[0].load("home.html");
        });
    }

    if (page.id === 'toolsPage') {
        console.log("toolPage");

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