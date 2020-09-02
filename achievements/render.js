var bound = 2.5;
var ofst = 3;
var scroll = window.pageYOffset;
var h = window.innerHeight;
var w = window.innerWidth;
var clicked = false;
var double_clicked = false;

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

var md = new Remarkable();

md.set({
    html: true,
    typographer: true
})

content = loadFile('src.md');

document.getElementById('md-holder').innerHTML = md.render(content);

function get_orientation(){
    h = window.innerHeight;
    w = window.innerWidth;
    if (h>w)
        return('portrait');
    if (h<=w)
        return('landscape');
}

function home(){
    if (get_orientation() == 'landscape'){
        window.location.href = '../index.html';
    } else {
        if (clicked)
            double_clicked = true;
        setTimeout(function(){
            if (clicked == false && double_clicked == false){
                $("#home_icon").css("transform",'rotate(-45deg)');
                $("#top_tray_left").css("opacity",'1');
                $("#top_tray_left").css("pointer-events",'all');
                clicked = true;
            } else if (double_clicked == true){
                double_clicked = false;
            }
        }, 20);
    }
}

window.addEventListener('click', function() {
    setTimeout(function(){
        if (get_orientation() == 'portrait' && clicked){
            $("#home_icon").css("transform",'rotate(0deg)');
            $("#top_tray_left").css("opacity",'0');
            $("#top_tray_left").css("pointer-events",'none');
            clicked = false;
        }
    }, 5)
})

window.addEventListener('scroll', function() {
    scroll = window.pageYOffset;
    h = window.innerHeight;
    
    if (get_orientation() == 'portrait'){
        $("#home_icon").css("transform",'rotate(0deg)');
        $("#top_tray_left").css("opacity",'0');
        $("#top_tray_left").css("pointer-events",'none');
        clicked = false;
    }
    
    if ((scroll>h/bound)&&(scroll<h)){
        $("#greeter").css('transform','translate(0px,'+(scroll+(scroll*bound-h)*0.5)+'px)');
        $("#greeter").css('opacity',1-(scroll*bound-h)/(h/bound));
    } else if (scroll<h/bound) {
        $("#greeter").css('transform','translate(0px, '+scroll+'px)');
        $("#greeter").css('opacity',1);
    } else{
        $("#greeter").css('opacity',1-(scroll*bound-h)/(h/bound));
    }
    
    if (scroll > h/3){
        var p = (scroll-h/3)/(h/4);
        if (p<1){
            if (get_orientation() == 'landscape'){
                $("#cross").css('left',(15-(15+5)*p)+'%');
                $("#half_circle").css('right',(20-(20+ofst)*p)+'%');
                $("#circle").css('right',(25-(25+ofst)*p)+'%');
            } else{
                $("#cross").css('left',(15-(15+12)*p)+'%');
                $("#half_circle").css('right',(20-(20+ofst)*p)+'%');
                $("#circle").css('right',(25-(25+ofst)*p)+'%');
            }
            
        } else{
            if (get_orientation() == 'landscape'){
                $("#cross").css('left','-'+5+'%');
                $("#half_circle").css('right','-'+ofst+'%');
                $("#circle").css('right','-'+ofst+'%');
            } else{
                $("#cross").css('left','-'+12+'%');
                $("#half_circle").css('right','-'+ofst+'%');
                $("#circle").css('right','-'+ofst+'%');
            }
        }
    } else{
        $("#cross").css('left','15%');
        $("#half_circle").css('rigbt','20%');
        $("#circle").css('right','25%');
    }
});