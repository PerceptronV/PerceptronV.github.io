var tasks_template = {
    '健': false,
    '書': false,
    '術': false,
    '左': false,
    '數': false,
    '論': false,
}

function str2bool(str) {
    return str == "true";
}

function fillstatus() {
    var copy = tasks_template;
    var keys = Object.keys(tasks_template);

    for (var i in keys) {
        var cache = localStorage.getItem(keys[i]);
        copy[keys[i]] = cache != null ? str2bool(cache) : tasks_template[keys[i]];
    }
    return copy;
}

function render(tasks) {
    var list = document.getElementById("tasklist");
    var keys = Object.keys(tasks);

    for (var i in keys) {
        var element = document.createElement('li');

        var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = keys[i];
            checkbox.value = keys[i];
            checkbox.id = keys[i];
            checkbox.checked = tasks[keys[i]]
            checkbox.onclick = function(){
                for (var j in keys) {
                    localStorage.setItem(keys[j], String(document.getElementById(keys[j]).checked));
                }
            }

        var label = document.createElement('label'); 
            label.htmlFor = keys[i];
            label.appendChild(document.createTextNode(keys[i])); 
        
        element.appendChild(checkbox);
        element.appendChild(label);
        list.appendChild(element);
    }
}

var tasks = fillstatus();
render(tasks);
