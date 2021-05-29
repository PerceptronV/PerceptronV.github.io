function str2bool(str) {
    return str == "true";
}

class Checklist {
    constructor(name, template, element_id) {
        this.name = name;
        this.template = template;
        this.element_id = element_id;
    }

    fillstatus() {
        var copy = this.template;
        var keys = Object.keys(this.template);
    
        for (var i in keys) {
            var cache = localStorage.getItem(this.name + keys[i]);
            copy[keys[i]] = cache != null ? str2bool(cache) : this.template[keys[i]];
        }
        return copy;
    }

    render() {
        var tasks = this.fillstatus();
        var list = document.getElementById(this.element_id);
        var keys = Object.keys(this.template);
    
        for (var i in keys) {
            var element = document.createElement('li');
    
            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = this.name + keys[i];
                checkbox.value = this.name + keys[i];
                checkbox.id = this.name + keys[i];
                checkbox.checked = tasks[keys[i]];
                
                checkbox.onclick = function(){
                    localStorage.setItem(this.name, String(document.getElementById(this.name).checked));
                }
    
            var text = document.createElement('span'); 
                text.htmlFor = this.name + keys[i];
                text.appendChild(document.createTextNode(keys[i]));
                text.style.marginLeft = "2vh";
                text.className = "checkmark";
            
            element.appendChild(checkbox);
            element.appendChild(text);
            list.appendChild(element);
        }
    }
}

var streaks_template = {
    '健': false,
    '書': false,
    '術': false,
    '西': false,
    '數': false,
    '論': false,
}

var streaks = new Checklist("streaks", streaks_template, "streaklist");
streaks.render();
