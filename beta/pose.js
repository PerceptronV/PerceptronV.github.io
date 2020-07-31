var flipHorizontal = false;
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var buff = document.querySelector("#buff");
var c = canvas.getContext('2d');
var num, increased, total, type, timer, check;

const line = [null, null, null, null, null, 6, 12, 5, 6, 7, 8, 5, 11, 11, 12, 13, 14];
//         = [0,    1,    2,    3,    4,    5, 6,  7, 8, 9, 10 11 12, 13, 14, 15, 16]

function begin(){
    num = 0;
    check=false;
    increased = false;
    total = $('#num').val();
    type = $("#ex").val();
    setTimeout(function(){$('#count').html('3');},1000);
    setTimeout(function(){$('#count').html('2');},2000);
    setTimeout(function(){$('#count').html('1');},3000);
    setTimeout(function(){beep(); $('#count').html('START'); check=true;},4000);
}

function pred_pose() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    buff.width = video.videoWidth;
    buff.height = video.videoHeight;
    buff.getContext('2d').drawImage(video, 0, 0, buff.width, buff.height);
    posenet.load().then(function(net) {
        const model = net;
        model.estimateSinglePose(buff, {flipHorizontal: false}).then(function(pose){
            pos = pose['keypoints'];
            if (check && type=='Push-up'){
                var threshold = Math.sqrt(Math.pow(pos[5]['position']['y']-pos[6]['position']['y'], 2)+Math.pow(pos[5]['position']['x']-pos[6]['position']['x'], 2)) * (0.5);
                if (Math.abs(pos[5]['position']['y']-pos[8]['position']['y'])<threshold){
                    if (!increased) {
                        num += 1;
                        increased=true;
                        $('#count').html(num);
                        if (num==Number($('#num').val())){
                            $('#count').html('GOOD JOB!');
                            check=false;
                            console.log('completed');
                            ring();
                        } else{
                            beep();
                        }
                    }
                    
                } else if (Math.abs(pos[5]['position']['y']-pos[8]['position']['y'])>threshold*(1.8)){
                    increased=false;
                }
            }
            draw(pose, c);
        });
    });
}

function reflect(num, axis, apply){
    if (apply)
        return axis-(num-axis);
    else
        return num;
}

function beep() {
    document.getElementById('beep').play();
}


function ring() {
    document.getElementById('ring').play();
}

function draw(pose, context){
    var c = context;
    var pos = pose['keypoints'];
    for (var i=0; i<17; i++){
                c.beginPath();
                c.strokeStyle='red';
                c.lineWidth=10;
                c.arc(reflect(pos[i]['position']['x'], video.videoWidth/2),pos[i]['position']['y'],5,0,2*Math.PI);
                c.stroke();
                
                if (line[i]!=null){
                    c.lineWidth=5;
                    c.strokeStyle='blue';
                    c.moveTo(reflect(pos[i]['position']['x'], video.videoWidth/2, false),pos[i]['position']['y']);
                    c.lineTo(reflect(pos[line[i]]['position']['x'], video.videoWidth/2, false),pos[line[i]]['position']['y']);
                    c.stroke();
                }
            }
}

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
        window.stream=stream;
        video.srcObject = stream;
        var timer = setInterval(pred_pose, 100);
    })
    .catch(function (err0r) {
      console.log("Camera blocked");
    });