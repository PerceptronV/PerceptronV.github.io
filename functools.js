var index = ["\n", " ", "!", "\"", "'", "(", ")", "*", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", "=", "?", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "\u00e9", "\u00ea", "\u00ee", "\u00f9", "\u2013", "\u2014", "\u2019", "\u2026"];
var chr = {"\n": 0, " ": 1, "!": 2, "\"": 3, "'": 4, "(": 5, ")": 6, "*": 7, ",": 8, "-": 9, ".": 10, "/": 11, "0": 12, "1": 13, "2": 14, "3": 15, "4": 16, "5": 17, "6": 18, "7": 19, "8": 20, "9": 21, ":": 22, "=": 23, "?": 24, "A": 25, "B": 26, "C": 27, "D": 28, "E": 29, "F": 30, "G": 31, "H": 32, "I": 33, "J": 34, "K": 35, "L": 36, "M": 37, "N": 38, "O": 39, "P": 40, "Q": 41, "R": 42, "S": 43, "T": 44, "U": 45, "V": 46, "W": 47, "X": 48, "Y": 49, "Z": 50, "a": 51, "b": 52, "c": 53, "d": 54, "e": 55, "f": 56, "g": 57, "h": 58, "i": 59, "j": 60, "k": 61, "l": 62, "m": 63, "n": 64, "o": 65, "p": 66, "q": 67, "r": 68, "s": 69, "t": 70, "u": 71, "v": 72, "w": 73, "x": 74, "y": 75, "z": 76, "\u00e9": 77, "\u00ea": 78, "\u00ee": 79, "\u00f9": 80, "\u2013": 81, "\u2014": 82, "\u2019": 83, "\u2026": 84};

var bound = 2.5;
var ofst = 3;
var scroll = window.pageYOffset;
var h = window.innerHeight;

window.addEventListener('scroll', function() {
    scroll = window.pageYOffset;
    h = window.innerHeight;
    
    if (scroll>h/4)
        $("#greeter").css("background-color", "yellow");
    
    if ((scroll>h/bound)&&(scroll<h+100)){
        $("#greeter").css('transform','translate(0px,'+((scroll*bound-h)*0.5)+'px)');
        $("#greeter").css('opacity',1-(scroll*bound-h)/(h/bound));
    } else if (scroll<h/bound) {
        $("#greeter").css('transform','translate(0px, 0px)');
        $("#greeter").css('opacity',1);
    } else{
        $("#greeter").css('opacity',1-(scroll*bound-h)/(h/bound));
    }
    
    if (scroll > h/3){
        var p = (scroll-h/3)/(h/4);
        if (p<1){
            $("#cross").css('left',(15-(15+ofst)*p)+'%');
            $("#half_circle").css('right',(20-(20+ofst)*p)+'%');
            $("#circle").css('right',(25-(25+ofst)*p)+'%');
        } else{
            $("#cross").css('left','-'+ofst+'%');
            $("#half_circle").css('right','-'+ofst+'%');
            $("#circle").css('right','-'+ofst+'%');
        }
    } else{
        $("#cross").css('left','15%');
        $("#half_circle").css('rigbt','20%');
        $("#circle").css('right','25%');
    }
});