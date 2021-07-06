function getChartData(){
    var new_times_labels    = [];
    var new_systole_points  = [];
    var new_diastole_points = [];
    var new_pulse_points    = [];
    var ref = firebase.database().ref('user_data/' + uid + "/pressure_data").once("value");
    ref.then(function(snap){
        if (snap.val() != null){
            snap.forEach(function(child){
                time_obj = parse_time(child.key)
                new_times_labels.push(`${
                    pad_zero(time_obj.getDate())
                }/${
                    pad_zero(time_obj.getMonth()+1)
                }/${
                    pad_zero(time_obj.getFullYear())
                } - ${pad_zero(time_obj.getHours())}`);
                new_systole_points.push(child.child('systole').val());
                new_diastole_points.push(child.child('diastole').val());
                new_pulse_points.push(child.child('pulse').val());
            })
        }

        if (times_labels != new_times_labels ||
            systole_points != new_systole_points ||
            diastole_points != new_diastole_points ||
            pulse_points != new_pulse_points) {

            times_labels = new_times_labels;
            systole_points = new_systole_points;
            diastole_points = new_diastole_points;
            pulse_points = new_pulse_points;
            
            myChart.data.labels = times_labels;
            myChart.data.datasets[0].data = systole_points;
            myChart.data.datasets[1].data = diastole_points;
            myChart.data.datasets[2].data = pulse_points;
            myChart.update();
        }
    });
}

var times_labels    = [];
var systole_points  = [];
var diastole_points = [];
var pulse_points    = [];

var data = {
    labels: times_labels,
    datasets: [
        {
            label: ui_dat['systole_header'],
            backgroundColor: 'rgb(224, 110, 61)',
            borderColor: 'rgb(224, 110, 61)',
            data: systole_points,
        },
        {
            label: ui_dat['diastole_header'],
            backgroundColor: 'rgb(61, 85, 224)',
            borderColor: 'rgb(61, 85, 224)',
            data: diastole_points,
        },
        {
            label: ui_dat['pulse_header'],
            backgroundColor: 'rgb(60, 207, 128)',
            borderColor: 'rgb(60, 207, 128)',
            data: pulse_points,
        },
    ]
};

var config = {
    type: 'line',
    data,
    options: {}
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);
