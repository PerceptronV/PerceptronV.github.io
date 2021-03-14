function show_entry(){
    document.getElementById("new_val").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

function exit_entry(){
    document.getElementById("new_val").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

function new_entry(){
    var database = firebase.database();
    var d = new Date();
    var utc = d.toUTCString();
    var lct = d.toLocaleString();;
    var systole=document.getElementById('systole').value;
    var diastole=document.getElementById('diastole').value;
    document.getElementById('systole').value="";
    document.getElementById('diastole').value="";
    if (systole!="" && diastole!=""){
        var updata={}
        updata[utc]={
                time: lct,
                systole: systole,
                diastole: diastole
        }
        var ref = database.ref('user_data/'+uid+'/pressure_data').update(updata);
        document.getElementById("new_val").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
}

function update(){
    var ref=firebase.database().ref('user_data/'+uid+"/pressure_data").once("value");
    ref.then(function(snap){
        var table=document.getElementById('table');
        while (table.rows.length > 1){
            table.deleteRow(1);
        }
        if (snap.val()==null){
            var row=table.insertRow(-1);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            var cell3=row.insertCell(2);
            cell1.innerHTML="沒有資料";
            cell2.innerHTML="沒有資料";
            cell3.innerHTML="沒有資料";
        }
        else{
            snap.forEach(function(child){
                var row=table.insertRow(1);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                cell1.innerHTML=child.child('time').val();
                cell2.innerHTML=child.child('systole').val();
                cell3.innerHTML=child.child('diastole').val();
            })
        }
    });
}

function sign_in(){
    document.getElementById("loader").style.display = "block";
    var error=false;
    var email = document.getElementById('usn').value;
    var password = document.getElementById('pswd').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        error=true;
    });

    document.getElementById('usn').value="";
    document.getElementById('pswd').value="";

    var email = "";
    var password = "";

    document.getElementById("loader").style.display = "none";

    if (error) alert("用戶名或密碼出錯");
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
