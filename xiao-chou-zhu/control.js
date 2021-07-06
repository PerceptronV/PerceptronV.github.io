function edit_entry(d, sys, dia, pul, rem){
    time_str = `${d.getFullYear()}-${pad_zero(d.getMonth()+1)}-${
                pad_zero(d.getDate())}T${pad_zero(d.getHours())}:${
                pad_zero(d.getUTCMinutes())}:${pad_zero(d.getUTCSeconds())}`;
    document.getElementById('time_in').value  = time_str;
    document.getElementById('systole_in').value  = sys;
    document.getElementById('diastole_in').value = dia;
    document.getElementById('pulse_in').value = pul;
    document.getElementById('remarks_in').value = rem;
    show_entry();
}

function show_entry(){
    document.getElementById("new_val").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

function exit_entry(){
    document.getElementById("new_val").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

function initialize(user){
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    update();
    var timer = setInterval(update, 3000);
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

function repNull(val){
    if (val == null || val == NaN) return ui_dat['no_data'];
    return val;
}

function nan2null(val){
    if (isNaN(val)) return null;
    return val;
}

function empt2null(s){
    if (s == "") return null;
    return s;
}

function new_entry(){
    var database = firebase.database();

    var time     = document.getElementById('time_in').value;
    var systole  = nan2null(parseInt(document.getElementById('systole_in').value));
    var diastole = nan2null(parseInt(document.getElementById('diastole_in').value));
    var pulse    = nan2null(parseInt(document.getElementById('pulse_in').value));
    var remarks  = empt2null(document.getElementById('remarks_in').value);

    if (systole != null && diastole != null && time != ""){
        
        document.getElementById('time_in').value  = "";
        document.getElementById('systole_in').value  = "";
        document.getElementById('diastole_in').value = "";
        document.getElementById('pulse_in').value = "";
        document.getElementById('remarks_in').value = "";

        time = format_time(new Date(time));

        var updata  = {}
        updata[time] = {
            time:     time,
            systole:  systole,
            diastole: diastole,
            pulse:    pulse,
            remarks:  remarks
        }
        var ref = database.ref('user_data/'+uid+'/pressure_data').update(updata);
        document.getElementById("new_val").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
}

function update(){
    var db = firebase.database();

    var ref = db.ref('user_data/' + uid + "/pressure_data").once("value");
    ref.then(function(snap){
        var table=document.getElementById('table');
        while (table.rows.length > 1){
            table.deleteRow(1);
        }
        if (snap.val() == null){
            var row   = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = ui_dat['no_data'];
            cell2.innerHTML = ui_dat['no_data'];
            cell3.innerHTML = ui_dat['no_data'];
            cell4.innerHTML = ui_dat['no_data'];
            cell5.innerHTML = ui_dat['no_data'];
        }
        else{
            snap.forEach(function(child){
                var row   = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                
                // Detect and replace legacy date formats
                date_obj = new Date(child.key);
                if (isValidDate(date_obj)) {
                    time = format_time(date_obj);
                    var updata  = {}
                    updata[time] = {
                        time:     time,
                        systole:  child.child('systole').val(),
                        diastole: child.child('diastole').val(),
                        pulse:    child.child('pulse').val(),
                        remarks:  child.child('remarks').val(),
                    }
                    var ref = db.ref('user_data/'+uid+'/pressure_data').update(updata);

                    db.ref('user_data/'+uid+'/pressure_data/'+child.key).remove();
                }
                else date_obj = parse_time(child.key);

                // Detect and replace legacy value datatypes
                if (typeof child.child('systole').val() == 'string'){
                    time = format_time(date_obj);
                    var updata  = {}
                    updata[time] = {
                        time:     time,
                        systole:  nan2null(parseInt(child.child('systole').val())),
                        diastole: nan2null(parseInt(child.child('diastole').val())),
                        pulse:    nan2null(parseInt(child.child('pulse').val())),
                        remarks:  child.child('remarks').val(),
                    }
                    console.log(updata);
                    var ref = db.ref('user_data/'+uid+'/pressure_data').update(updata);
                }

                cell1.innerHTML = repNull(date_obj.toLocaleString());
                cell2.innerHTML = repNull(child.child('systole').val());
                cell3.innerHTML = repNull(child.child('diastole').val());
                cell4.innerHTML = repNull(child.child('pulse').val());
                cell5.innerHTML = child.child('remarks').val();
                row.id = child.key;
            })
        }
        getChartData();
        addRowHandlers();
    });
}

// From https://stackoverflow.com/questions/1207939/adding-an-onclick-event-to-a-table-row
function addRowHandlers() {
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
      var currentRow = table.rows[i];
      var createClickHandler = function(row) {
        return function() {
            var cells = row.getElementsByTagName("td");
            edit_entry(
                parse_time(row.id),
                cells[1].innerHTML,
                cells[2].innerHTML,
                cells[3].innerHTML,
                cells[4].innerHTML
            );
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }

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
        document.getElementById('error').innerHTML = "用戶名或密碼出錯";
    });

    document.getElementById('usn').value="";
    document.getElementById('pswd').value="";

    var email = "";
    var password = "";                
}

function sign_out(){
    document.getElementById("loader").style.display = "block";
    firebase.auth().signOut().then(function() {
        clearInterval(timer);
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("loader").style.display = "none";
        var new_times_labels    = [];
        var new_systole_points  = [];
        var new_diastole_points = [];
        var new_pulse_points    = [];
        getChartData();
    }).catch(function(error) {
        document.getElementById("loader").style.display = "none";
    });
}

function autoFillEndStartDate(){
    var ref = firebase.database().ref('user_data/' + uid + "/pressure_data").once("value");
    ref.then(function(snap){
        var date_bounds = [
            new Date(),
            new Date()
        ]
        var start_filled = false;

        if (snap.val() != null){
            snap.forEach(function(child){
                if (!start_filled) {
                    start_filled = true;
                    date_bounds.splice(0, 1, parse_time(child.key));
                } else {
                    date_bounds.splice(1, 1, parse_time(child.key));
                }
            });
        }

        document.getElementById('start_in').value = `${date_bounds[0].getFullYear()}-${
                                                    pad_zero(date_bounds[0].getMonth()+1)}-${
                                                    pad_zero(date_bounds[0].getDate())}`
        document.getElementById('end_in').value = `${date_bounds[1].getFullYear()}-${
                                                        pad_zero(date_bounds[1].getMonth()+1)}-${
                                                        pad_zero(date_bounds[1].getDate())}`
    });
}

function downloadCSV(filename, lower_bound, upper_bound){
    var rows =[
        [
            ui_dat['time_header'],
            ui_dat['systole_header'],
            ui_dat['diastole_header'],
            ui_dat['pulse_header'],
            ui_dat['remarks_header'],
        ]
    ];

    var ref = firebase.database().ref('user_data/' + uid + "/pressure_data").once("value");
    ref.then(function(snap){
        if (snap.val() != null){
            snap.forEach(function(child){
                var time_obj = parse_time(child.key);
                if (lower_bound <= time_obj && time_obj < upper_bound) {
                    var date = time_obj.toLocaleString().replaceAll(',', ';');
                    rows.splice(1, 0, [
                        date,
                        child.child('systole').val(),
                        child.child('diastole').val(),
                        child.child('pulse').val(),
                        child.child('remarks').val(),
                    ]);
                }
            })
        }

        // From https://www.revisitclass.com/css/how-to-export-download-the-html-table-to-excel-using-javascript/
        // {
            csvContent = "data:text/csv;charset=utf-8,";

            rows.forEach(function(rowArray){
                csvContent += rowArray.join(",") + "\r\n";
            });

            /* create a hidden <a> DOM node and set its download attribute */
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            
            link.click();
        // }
    });
}

function download(){
    lb = new Date(document.getElementById('start_in').value);
    ub = new Date(document.getElementById('end_in').value);
    ub.setDate(ub.getDate() + 1);

    downloadCSV('pressure_data.csv', lb, ub);
}
