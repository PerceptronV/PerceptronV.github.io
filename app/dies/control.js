var tasks_template = {
    '健': false,
    '書': false,
    '術': false,
    '左': false,
    '數': false,
    '論': false,
}

function fillstatus() {
    var copy = tasks_template;
    var keys = Object.keys(tasks_template);
    for (var i in keys) copy[keys[i]] = localStorage.getItem(keys[i]) != null ?
                                        Boolean(localStorage.getItem(keys[i])) :
                                        tasks_template[keys[i]];
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
                var instance = document.getElementById(keys[i]);
                localStorage.setItem(keys[i], String(instance.checked));
                console.log(keys[i], String(instance.checked));
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
