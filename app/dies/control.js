function str2bool(str) {
    return str == "true";
}

function replace_space(str){
    return str.replace(/\s+/g, "_");
}

function update_progbars(){
    var keys = Object.keys(BARPROGS);
    for (var i in keys){
        var prog = Math.round(BARPROGS[keys[i]] / BARTOTS[keys[i]] * 100);
        document.getElementById(keys[i]).style = "width: " + prog + "%;";
    }
}

class Checklist {
    constructor(name, template, element_id, bar_id) {
        this.name = name;
        this.template = template;
        this.element_id = element_id;
        this.bar_id = bar_id;
    }

    fillstatus() {
        var copy = this.template;
        var keys = Object.keys(this.template);
    
        for (var i in keys) {
            var cache = localStorage.getItem(this.name + replace_space(keys[i]));
            copy[keys[i]] = cache != null ? str2bool(cache) : this.template[keys[i]];
        }
        return copy;
    }

    render() {
        var tasks = this.fillstatus();
        var list = document.getElementById(this.element_id);
        var keys = Object.keys(this.template);
        BARPROGS[this.bar_id] = 0;
        BARTOTS[this.bar_id] = keys.length;
    
        for (var i in keys) {
            var identifier = this.name + replace_space(keys[i]);

            var element = document.createElement('label');
                element.className = "form-check list-group-item";

            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.className = "form-check-input checkbox-offset";
                checkbox.name = identifier;
                checkbox.value = identifier;
                checkbox.dataset.bar_id = this.bar_id;
                checkbox.id = identifier;
                checkbox.checked = tasks[keys[i]];

                if (tasks[keys[i]]) BARPROGS[this.bar_id] += 1;
                
                checkbox.onclick = function(){
                    localStorage.setItem(this.name, this.checked);
                    BARPROGS[this.dataset.bar_id] += this.checked ? 1 : -1;
                    update_progbars();
                }
    
            var text = document.createElement('label');
                text.className = "form-check-label card-text checkmark";
                text.htmlFor = identifier;
                text.innerHTML = keys[i];
            
            element.appendChild(checkbox);
            element.appendChild(text);
            list.appendChild(element);
        }

        update_progbars();
    }
}

var streaks_template = {
    '健': false,
    '書': false,
    '\\(7\\) Spanish Vocab': false,
    '\\(2\\) Questions': false,
    '\\(1\\) News': false,
    '\\(1\\) Project': false,
    '\\(\\frac{1}{2}\\) Paper': false,
    'Knowledge': false,
}

var BARPROGS = {}, BARTOTS = {};

var streaks = new Checklist("streaks", streaks_template, "streaklist", "streaks_progress-bar");
streaks.render();
