var exp = localStorage.getItem("exp");
var inter = localStorage.getItem("inter");

if (exp != null) document.getElementById('logic').value = exp;
if (inter != null) document.getElementById('check').checked = inter;
