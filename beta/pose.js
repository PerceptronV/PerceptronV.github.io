var flipHorizontal = false;
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var c = canvas.getContext('2d');
var timer = setInterval(get_pose, 100);

canvas.width=480;
canvas.height=360;
beep();

var imageElement = document.getElementById('cat');

posenet.load().then(function(net) {
const pose = net.estimateSinglePose(imageElement, {
flipHorizontal: true
});
return pose;
}).then(function(pose){
console.log(pose);
});

function get_pose() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    posenet.load().then(function(net) {
        const model = net;
        model.estimateSinglePose(canvas, {flipHorizontal: false}).then(function(pose){
            var pos = pose['keypoints'];
            if (Math.abs(pos[5]['position']['y']-pos[8]['position']['y'])<100){
                beep();
                document.getElementById('banner').innerHTML='good!'+Math.abs(pos[5]['position']['y']-pos[8]['position']['y']);
            } else{
                document.getElementById('banner').innerHTML='Jab'+Math.abs(pos[5]['position']['y']-pos[8]['position']['y']);
            }
        });
    });
}

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      window.stream=stream;
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
    
function beep() {
    document.getElementById('sound1').play();
}