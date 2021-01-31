// ---------------------------------------------------------------------------------------
// CONSTANTS

OPERATORS = [
    'NOT', 'AND', 'OR', 'NAND', 'NOR', 'XOR',
    '¬',   '/\\', '\\/'
]

FUNCS = {
    '%NOT%': function ([a]) { return !a ? '1' : '0'; },
    '%¬%': function ([a]) { return !a ? '1' : '0'; },
    '%AND%': function ([a, b]) { return a && b ? '1' : '0'; },
    '%/\\%': function ([a, b]) { return a && b ? '1' : '0'; },
    '%OR%': function ([a, b]) { return a || b ? '1' : '0'; },
    '%\\/%': function ([a, b]) { return a || b ? '1' : '0'; },
    '%NAND%': function ([a, b]) { return !(a && b) ? '1' : '0'; },
    '%NOR%': function ([a, b]) { return !(a || b) ? '1' : '0'; },
    '%XOR%': function ([a, b]) { return ((a || b) && (a != b)) ? '1' : '0'; }
}

IDENTITIES = { // Complex -> simplified
    // Laws, involving depth > 2
    // Laws, involving relationship between single-order logic gates
    // Laws, involving strict tautologies, negatives, positives
}

// ---------------------------------------------------------------------------------------
// LOGIC TREE
/*
class LogicNode {
    constructor(val = null, childA = undefined, childB = undefined) {
        this._val = val;
        this.update();
        this._children = [childA, childB];
    }

    update() {
        if (typeof(this._val) == 'string') {
            var updated = false;

            if (this._val == 'NOT') {
                this._type = 'un_op';
                updated = true;
            }
            else if (this._val == '0' || this._val == '1') {
                this._type = 'bool';
                this._val = Boolean(Number(this._val));
                updated = true;
            }
            else {
                for (let i in OPERATORS) if (OPERATORS[i] == this._val) {
                    this._type = 'bin_op';
                    updated = true;
                }
            }
            if (!updated) this._type = 'var';
        }
        else if (typeof(this._val) == 'number') {
            this._type = 'bool';
                this._val = Boolean(Number(this._val));
        }
        else if (typeof(this._val) == 'boolean') {
            this._type = 'bool';
        }
        else this._type == undefined;

        if (this._type == 'bin_op') this._bin = true;
        else this._bin = false;
    }

    maxDepth() {
        if (this._type == 'bool' || this._type == 'var') return 1;
        if (this._bin == true) return 1 + Math.max(this.a.maxDepth(), this.b.maxDepth());
        return 1 + this.a.maxDepth();
    }

    simplify() {
        // Find isomporphisms between identities and branches in tree
        // Simplify branches
        // If tautologies, further simplify these branches by evaluating
    }

    toIR() {
        if (this._type == 'bool') return String(Number(this._val));
        if (this._type == 'var') return this._val;
        if (this._bin == true) return '(' + this.a.toIR() + ' ' + this._val + ' ' + this.b.toIR() + ')';
        return '(NOT ' + this.a.toIR() + ')';
    }

    get val() {
        return this._val;
    }
    set val(newVal) {
        this._val = newVal;
        var orig = this._bin;
        this.update();
        if (orig == true && this._bin == false) this._children[1] = undefined;
    }

    get type() {
        return this._type;
    }

    get a() {
        return this._children[0];
    }
    set a(newChild) {
        this._children[0] = newChild;
    }

    get b() {
        return this._children[1];
    }
    set b(newChild) {
        this._children[1] = newChild;
    }

    get children() {
        if (this._bin) return [this._children[0], this._children[1]];
        return [this._children[0]];
    }

    static fromIR(s) {
        var bounds = [];
        var bracket = 0;

        for (let i = 0; i < statement.length; i++) {
            if (statement.charAt(i) == '(') {
                bracket++;
                if (bracket == 1) bounds.push([i]);
            }
            else if (statement.charAt(i) == ')') {
                bracket--;
                if (bracket == 0) bounds[bounds.length - 1].push(i + 1);
            }
        }

        if (bounds.length == 0) {
            for (let i = 0; i < OPERATORS.length; i++) {
                var op = OPERATORS[i];
                var splits = s.split('%' + op + '%');
        
                if (splits.length > 1) {
                    splits = remove_empty_str(splits);
                    if (op == 'NOT') return new LogicNode('NOT', new LogicNode(splits[0]));
                    return new LogicNode(op, new LogicNode(splits[0]), new LogicNode(splits[1]));
                }
            }
            return new LogicNode(s);
        }

        var rep = {};
        var n = '';
        for (let i in bounds) {
            rep[s.splice(bounds[i][0], bounds[i][1])] = 
        }
    }


    static ismorphic(nodea, nodeb) {}
    static convert(nodea, nodeo, nodet) {}
}
*/
// ---------------------------------------------------------------------------------------
// BASIC UTILS

const isAlnum = ch => {
    return ch.match(/^[a-z0-9]+$/i) !== null;
}

const isWhite = ch => {
    return ch.match(/\s/) != null;
}

const isBrac = ch => {
    return ch.match(/[()[\]{}]/) != null;
}

function match(s1, s2, idx) {
    for (var i = 0; i < s2.length; i++) {
        if (s1.charAt(idx + i) != s2.charAt(i)) return false;
    }
    return true;
}

function remove_empty_str(arr) {
    var r = [];
    for (let i = 0; i < arr.length; i++) if (arr[i] != '') r.push(arr[i]);
    return r;
}

function str2bool(s) {
    return Boolean(Number(s));
}

function valid(s, idx) {
    if (idx < 0 || idx >= s.length) return true;

    var c = s.charAt(idx);
    return !(isAlnum(c) || c == '%');
}

function isCharAt(s, c, idx) { // Whether char at s[idx] is c; if idx out of bounds return false
    if (idx < 0 || idx >= s.length) return false;
    return s.charAt(idx) == c;
}

function permute(len, depth = 1) {
    if (depth == len) {
        return [0, 1];
    }

    var r = [], p = permute(len, depth + 1);
    for (let i = 0; i < p.length; i++) r.push([0].concat(p[i]));
    for (let i = 0; i < p.length; i++) r.push([1].concat(p[i]));

    return r;
}

function len_sort(d) {
    var r = {};
    var sorted_keys = Object.keys(d).sort(function(a, b) {return a.length>b.length});
    for (let i in sorted_keys) r[sorted_keys[i]] = d[sorted_keys[i]];

    return r;
}

function remove_repeated(d, s) {
    s = ir2str(s);
    var k = Object.keys(d);
    for (let i in k) {
        if (k[i] == s || k[i] == '('+s+')' || '('+k[i]+')' == s) delete d[k[i]];
    }

    return d;
}

// ---------------------------------------------------------------------------------------
// LOW-LEVEL FUNCTIONS

function tokenize_operators(s) {
    var r = '';
    var i = 0;

    while (i < s.length) {
        for (var o = 0; o < OPERATORS.length; o++) {
            if (match(s, OPERATORS[o], i)) {
                if (valid(s, i - 1) && valid(s, i + OPERATORS[o].length)) {
                    r += '%' + OPERATORS[o] + '%';
                    i += OPERATORS[o].length;

                    continue;
                }
            }
        }
        r += s.charAt(i);
        i++;
    }

    return r;
}

function tokenize_vars(s) {
    var out_op = true, temp = '';
    var r = '', vars = [];

    for (let i = 0; i < s.length; i++) {
        let c = s.charAt(i);

        if (out_op && isAlnum(c)) {
            if (temp.length == 0) r += '$';
            temp += c;
        }

        else if (temp.length != 0) {
            if (!vars.includes(temp)) vars.push(temp);
            temp = '';
            r += '/';
        }

        if (c == '%') out_op = !out_op;

        r += c;
    }

    if (temp.length != 0) {
        if (!vars.includes(temp)) vars.push(temp);
        temp = '';
        r += '/';
    }    

    return [r, vars];
}

function brac_nots(s) {
    var r = '', brac_count = 0, exp_count = 0, conds = [];

    for (let i = 0; i < s.length; i++) {
        if (match(s, '%NOT%', i)) {
            r += '(';
            conds.push([brac_count, exp_count]);
        }

        var c = s.charAt(i);
        if (c == '(') brac_count++;
        else if (c == ')') brac_count--;
        else if (c == '/') exp_count++;

        // console.log(c, match(s, '%NOT%', i), brac_count, exp_count, conds)
        
        if (c.match(/[()/]/)) r += c;
        for (let j=0; j<conds.length; j++) {
            if (brac_count == conds[j][0] && exp_count > conds[j][1]) {
                r += ')';
                conds.splice(j, 1);
            }
        }
        if (!c.match(/[()/]/)) r += c;
    }

    r += ')'.repeat(conds.length);

    return r;
}

function eval_single(s, vars, vals) {
    var orig = ir2str(s);
    var v = {};

    for (let i = 0; i < vars.length; i++) {
        while (s.includes('$' + vars[i] + '/')) s = s.replace('$' + vars[i] + '/', vals[i]);
    }

    for (let i = 0; i < OPERATORS.length; i++) {
        var op = '%' + OPERATORS[i] + '%';
        var splits = s.split(op);

        if (splits.length > 1) {
            v[orig] = FUNCS[op](remove_empty_str(splits).map(str2bool));
            return [v, v[orig]];
        }
    }

    v[orig] = s;
    return [v, v[orig]];
}

function eval(statement, vars, vals) {
    var bounds = [];
    var bracket = 0;
    var v = {};
    var orig = ir2str(statement);

    for (let i = 0; i < statement.length; i++) {
        if (statement.charAt(i) == '(') {
            bracket++;
            if (bracket == 1) bounds.push([i]);
        }
        else if (statement.charAt(i) == ')') {
            bracket--;
            if (bracket == 0) bounds[bounds.length - 1].push(i + 1);
        }
    }

    // console.log(statement);

    if (bounds.length == 0) {
        // console.log('>> ', statement, eval_single(statement, vars, vals));
        return eval_single(statement, vars, vals);
    }

    var r = statement;

    for (let i = 0; i < bounds.length; i++) {
        var oldstr = statement.slice(bounds[i][0], bounds[i][1]);
        var [states, newstr] = eval(statement.slice(bounds[i][0] + 1, bounds[i][1] - 1), vars, vals);

        var keys = Object.keys(states);
        for (let k=0; k<keys.length; k++) {
            var dp = keys[k];
            if (!(Object.keys(v).includes(dp) || vars.includes(dp))) v[dp] = states[keys[k]];
        }

        r = r.replace(oldstr, newstr);
    }

    // console.log('<< ', r, eval_single(r, vars, vals)[1]);

    v[orig] = eval_single(r, vars, vals)[1]
    return [v, v[orig]];
}

function simplify() { }

// ---------------------------------------------------------------------------------------
// HIGH-LEVEL FUNCTIONS

/* Tests:
((A AND B)OR (NOT NOT C OR (A NOR C))) AND NOT (C OR B)
(NOT (NOT A OR (A AND B))) OR (A AND B)
NOT NOT A
*/

function ir2str(s) {
    return s.replace(/[$%/]+/g, ' ').trim();
}

function str2ir(s) {
    var statement = tokenize_operators(s).replace(/\s+/g, '');
    var v;
    [statement, v] = tokenize_vars(statement);
    statement = brac_nots(statement);
    v = v.sort();

    return [statement, v];
}

function main(logic_id = 'logic', checkbox_id = 'check',
              truthtable_id = 'truthtable', result_div_id = 'result') {
    var vars, permutes;
    var statement = document.getElementById(logic_id).value;
    var inter = document.getElementById(checkbox_id).checked;
    
    localStorage.setItem("exp", statement);
    localStorage.setItem("inter", inter);

    [statement, vars] = str2ir(statement);

    console.log('Preprocessed statement:', statement);
    console.log('Variables:', vars);

    var table = document.getElementById(truthtable_id);

    while (table.rows.length != 0) table.deleteRow(0);

    if (vars.length == 1) permutes = [[0], [1]];
    else permutes = permute(vars.length);

    // console.log(permutes);

    for (let p = 0; p < permutes.length; p++) {
        row = table.insertRow(-1);

        var [states, r] = eval(statement, vars, permutes[p]);
        states = remove_repeated(len_sort(states), statement);
        // console.log(states, r);

        for (let i = 0; i < vars.length; i++) {
            row.insertCell(-1).innerHTML = permutes[p][i];
        }
        if (inter) {
            for (let i in Object.values(states))
            row.insertCell(-1).innerHTML =  Object.values(states)[i];
        }
        row.insertCell(-1).innerHTML = r;
    }

    var row = table.insertRow(0);
    for (let i = 0; i < vars.length; i++) {
        row.insertCell(-1).innerHTML = vars[i];
    }
    if (inter) {
        for (let i in Object.keys(states))
        row.insertCell(-1).innerHTML =  Object.keys(states)[i];
    }
    row.insertCell(-1).innerHTML = '*OUT*';

    document.getElementById(result_div_id).style.display = 'block';
}

document.getElementById("logic").addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById("go_button").click();
    }
});
