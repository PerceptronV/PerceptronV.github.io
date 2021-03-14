var firebaseConfig = {
    apiKey: "AIzaSyDunxM_CsmBvE-qml3GHsCYKGT774lHhpE",
    authDomain: "xiao-chou-zhu.firebaseapp.com",
    databaseURL: "https://xiao-chou-zhu.firebaseio.com",
    projectId: "xiao-chou-zhu",
    storageBucket: "xiao-chou-zhu.appspot.com",
    messagingSenderId: "826168077131",
    appId: "1:826168077131:web:f2a644c2ef916b47dc96ce"
};

firebase.initializeApp(firebaseConfig);
document.getElementById("pswd").addEventListener("keydown", function(event){
    if (event.keyCode==13){
        event.preventDefault;
        document.getElementById("sign_in_button").click();
    }
})
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified, timer;

if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    initialize(user);
    document.getElementById("loader").style.display = "none";
} else {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("loader").style.display = "none";
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        initialize(user);
    } else {
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("login").style.display = "block";
    }
});

function initialize(user){
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    update();
    timer = setInterval(update,3000);
}

function sign_out(){
    document.getElementById("loader").style.display = "block";
    firebase.auth().signOut().then(function() {
        clearInterval(timer);
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("loader").style.display = "none";
    }).catch(function(error) {
        document.getElementById("loader").style.display = "none";
    });
}
