function sign_in(){
    document.getElementById("loader").style.display = "block";
    var email = document.getElementById('usn').value;
    var password = document.getElementById('pswd').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(creds) {
        document.getElementById("loader").style.display = "none";
        document.getElementById('error').innerHTML = "";
        initialize(user);
        getChartData();
    }).catch(function(error) {
        document.getElementById("loader").style.display = "none";
        document.getElementById('error').innerHTML = error;
    });

    document.getElementById('usn').value="";
    document.getElementById('pswd').value="";

    var email = "";
    var password = "";                
}