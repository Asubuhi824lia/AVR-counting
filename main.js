"use strict"


// Main code

let min_tab_space = "  ";
// For every string, template
let instruction = {
    command:    "",
    args:       "",
    clocks:     "",
}
// Collection of strings
let instructions = [];
let json;
async function getInstrSet() {
    let response = await fetch('http://localhost:8000/instructions-set.json')
                                    .then(data => data.text())      // if 1 instr - you can not write "return"
                                    .then(data => {
                                        console.log(data);
                                        json = data;
                                    })
                                    .catch(err => console.log(err))
}
getInstrSet();

enableTab('textarea');
enableGroupTab('textarea')

let textarea = document.getElementById('textarea');
textarea.addEventListener('input', () => { addNums(json) });


// Base functions

function addNums(json) {

    let text = getText();
    let {clocks, sizes} = findClocksSizes(text, JSON.parse(json));
    output(clocks, sizes);

}

function getText() {
    let textarea = document.getElementById("textarea");
    return textarea.value;
}

function findClocksSizes(text, json) {
    let strings = text.split('\n');
    // console.log(strings);


    let clocks = {};
    let sizes = {};
    for (let str in strings) {
        let line = splitLine(strings[str]);

        // Work with tabs before instruction mnemonic
        let instr;
        for (let i = 0; i < line.length; i++) {
            if (line[i].trim().toLowerCase()) {
                instr = line[i].trim().toLowerCase();
                break;
            }
        }
        console.log(instr)


        /* Count CLOCKS & SIZES */
        // find clocks
        for (let inst in json) {
            if (json[inst].command.toLowerCase() == instr) {
                const isNumeric = n => !isNaN(n);                            //??
                if ( !isNumeric(line[line.length-1]) ) {
                    clocks[str] = json[inst].clocks;
                } else {
                    clocks[str] = null;
                }
                break;
            }
        }
    }

    return {clocks, sizes};
}

function splitLine(string) {
    if (string.indexOf('\t') == -1) {
        let space = min_tab_space + min_tab_space;
        console.log(space);
        return string.split(space);
    } else {
        return string.split('\t');
    }
}

// function checkTabsOrSpaces(line);

function output(clocks, sizes) {
    let clocks_field = document.getElementById("clocks");
    let sizes_field = document.getElementById("sizes");

    // Clear field
    clocks_field.innerHTML = "";

    //Output updating info
    for(let c in clocks) {
        let p = document.createElement('p');
        p.innerHTML = clocks[c];
        clocks_field.append(p);
    }

    console.log()
}



// Added functions

function enableTab(id) {
    let el = document.getElementById(id);
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // была нажата клавиша TAB

            // получим позицию каретки
            let val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // установим значение textarea в: текст до каретки + tab + текст после каретки
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // переместим каретку
            this.selectionStart = this.selectionEnd = start + 1;

            // предотвратим потерю фокуса
            return false;

        }
    };
}

function enableGroupTab(id) {
    const el = document.getElementById(id);
    el.onselect = function(e) {
        let from = e.target.selectionStart;
        let to = e.target.selectionEnd;
        
        const selection = e.target.value.substring(from, to);
        console.log(`You selected: \n${selection}\n from ${from} to ${to}`);

        //номер 1-го символа верхней выделенной строки
        let firstTopLineIndex = (e.target.value.substring(0, from) ).lastIndexOf('\n');
        firstTopLineIndex = (firstTopLineIndex == -1) ? 0 : firstTopLineIndex; 

        const selectedLinesIndexes = listOf(selection, '\n', from, firstTopLineIndex);
        console.log(selectedLinesIndexes);
    }
}

function listOf(subline, symb, from, firstIndex) {
    let indList = [],
        start = 0

    if (firstIndex != -1) indList.push(firstIndex);

    for (let s in subline) {
        if (subline[s] == symb) indList.push( from + 1 + (+s) );
    }

    return indList;
}