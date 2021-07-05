function show_entry(){
    document.getElementById("new_val").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

function exit_entry(){
    document.getElementById("new_val").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function pad_zero(n, digits=2){
    n = String(n);
    l = n.length;
    d = digits - l;
    if (d > 0) return "0".repeat(d) + n;
    else return n;
}

function format_time(d){
    return `${d.getUTCFullYear()}-${pad_zero(d.getUTCMonth())}-${
            pad_zero(d.getUTCDate())}-${pad_zero(d.getUTCHours())}-${
            pad_zero(d.getUTCMinutes())}-${pad_zero(d.getUTCSeconds())}`;
}

function parse_time(s){
    components = s.split("-");
    for (var i = 0; i < components.length; i++) components[i] = parseInt(components[i]);
    return new Date(Date.UTC(
        components[0], components[1], components[2], components[3], components[4], components[5]
    ));
}

function new_entry(){
    var database = firebase.database();
    var d = new Date();

    var time = format_time(d);

    var systole=document.getElementById('systole').value;
    var diastole=document.getElementById('diastole').value;

    document.getElementById('systole').value  = "";
    document.getElementById('diastole').value = "";

    if (systole!="" && diastole!=""){
        var updata  = {}
        updata[time] = {
            time: time,
            systole: systole,
            diastole: diastole
        }
        var ref = database.ref('user_data/'+uid+'/pressure_data').update(updata);
        document.getElementById("new_val").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
}

function initialize(user){
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    update();
    var timer = setInterval(update,3000);
}

function update(){
    var db = firebase.database();

    var ref = db.ref('user_data/' + uid + "/pressure_data").once("value");
    ref.then(function(snap){
        var table=document.getElementById('table');
        while (table.rows.length > 1){
            table.deleteRow(1);
        }
        if (snap.val()==null){
            var row   = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML="沒有資料";
            cell2.innerHTML="沒有資料";
            cell3.innerHTML="沒有資料";
        }
        else{
            snap.forEach(function(child){
                var row   = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                
                // Detect and replace legacy date formats
                date_obj = new Date(child.key);
                if (isValidDate(date_obj)) {
                    time = format_time(date_obj);
                    var updata  = {}
                    updata[time] = {
                        time:     time,
                        systole:  child.child('systole').val(),
                        diastole: child.child('diastole').val()
                    }
                    var ref = db.ref('user_data/'+uid+'/pressure_data').update(updata);

                    db.ref('user_data/'+uid+'/pressure_data/'+child.key).remove();
                }
                else date_obj = parse_time(child.key);

                cell1.innerHTML=date_obj.toLocaleString();
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
