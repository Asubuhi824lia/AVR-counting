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
                                        // console.log(data);
                                        json = data;
                                    })
                                    .catch(err => console.log(err))
}
getInstrSet();

enableTab('textarea');
enableGroupTab('textarea')

/* Secondary mini-functions */
const isNumeric = n => !isNaN(n);
///

let textarea = document.getElementById('textarea');
textarea.addEventListener('input', () => { addNums(json) });


/*       JQuery-piece        */
// Scrollbars Union
$('.linked').scroll(function() {
    $('.linked').scrollTop($(this).scrollTop());
})

$('#clocks-show').click(function() {
    if ($('.clocks').css('display') != 'none') {
        $('.clocks').css('display', 'none');
    } else {
        $('.clocks').css('display', 'flex');
    }
})

$('#sizes-show').click(function() {
    if ($('.sizes').css('display') != 'none') {
        $('.sizes').css('display', 'none');
    } else {
        $('.sizes').css('display', 'flex');
    }
})

$('.line').css('line-height', $('#textarea').css('line-height') );

$(".emptyness").css('height', function() {
    return $(".options").css('height')
})


$('#file-selector').on('change', (e) => {

    // сохраним в переменную files значение свойства files
    const files = e.target.files;

    // сохраним количество элементов в files в переменную countFiles
    const countFiles = files.length;
    // если количество выбранных файлов больше 0
    if (!countFiles) {
        alert('Не выбран файл!');
        console.log( $("input[type='file']").val() )
        return;
    }

    // присваиваем переменной selectedFile ссылку на выбранный файл
    const selectedFile = files[0];
        
    // считать содержимое выбранного файла
    const reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function() {
        if( $("#textarea").val().trim() != '' ) {
            const isChange = confirm("Вы уверены, что хотите продолжить без сохранения?")
            if(isChange) {
                $("#textarea").val(reader.result)
            } else {
                $("input[type='file']").val("")
            }
        } else {
            $("#textarea").val(reader.result)
        }
    };
    
    reader.onerror = function() {
        console.log(reader.error);
    };

});


// Base functions

function addNums(json) {

    let text = getField();
    let {clocks, sizes} = findClocksSizes(text, JSON.parse(json));
    output(clocks, sizes);

}

function getField() {
    let textarea = document.getElementById("textarea");
    return textarea.value;
}

function findClocksSizes(text, json) {
    let strings = text.split('\n');
    // console.log(strings);

    let clocks = {};
    clocks.length = strings.length;
    let sizes = {};
    for (let str in strings) {
        let line = splitLine(strings[str]);

        console.log(line)

        // Work with tabs before instruction mnemonic
        let instr;
        for (let i = 0; i < line.length; i++) {
            if (line[i].trim().toLowerCase()) {
                instr = line[i].trim().toLowerCase();
                break;
            }
        }
        // console.log(instr)


        /* Count CLOCKS & SIZES */
        // find clocks
        for (let inst in json) {
            console.log(json[inst].command.toLowerCase())
            if (json[inst].command.toLowerCase() == instr) {
                clocks[str] = json[inst].clocks;
                break;
            }
        }
    }

    return {clocks, sizes};
}

function splitLine(string) {;
    // console.log(space);
    const reg = /\s+/;
    return string.split(reg);
}

// function checkTabsOrSpaces(line);

function output(clocks, sizes) {
    let clocks_field = document.getElementById("clocks");
    let sizes_field = document.getElementById("sizes");

    let backlight_field = document.getElementById("backlight");

    // Clear field
    clocks_field.innerHTML = "";
    sizes_field.innerHTML = "";
    backlight_field.innerHTML = "";

    //Output updating info
    for(let c = 0; c < clocks.length; c++) 
    {
        if (clocks[c]) 
        {
            let p = document.createElement('p');
            if (clocks[c].indexOf('/') == -1)
            {
                p.innerHTML = defineColor(clocks[c]);
            } else 
            {
                let str = "";
                clocks[c] = clocks[c].split(' ');
                for (let s = 0; s < clocks[c].length; s++) 
                {
                    if (isNumeric(clocks[c][s])) 
                    {
                        console.log();
                        str += defineColor(clocks[c][s]);
                        if (s != clocks[c].length-1) str += " / ";
                    }
                }
                p.innerHTML = str;
            }
            
            clocks_field.append(p);
        } else 
        {
            let p = document.createElement('p');
            p.innerHTML = "&shy";
            clocks_field.append(p);
        }

        // add line in sizes
        {
            let p = document.createElement('p');
            p.innerHTML = "&shy";
            sizes_field.append(p);
        }

        // add line in backlight
        {
            let p = document.createElement('p');
            p.innerHTML = "&shy";
            p.classList.add("line");
            if(c == selectedLine.pos) p.classList.add("selected");
            backlight_field.append(p);
        }
    }
}

function defineColor(clocks) {
    switch (clocks) 
    {
        case "1":
            return "<span style='color: green;'>" + clocks + "</span>";
        case "2":
            return "<span style='color: #ffc107;'>" + clocks + "</span>";
        default:
            return "<span style='color: red;'>" + clocks + "</span>";
    }
}


// Functions for work with Tabs

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


// UNUSED
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
    let indList = []

    if (firstIndex != -1) indList.push(firstIndex);

    for (let s in subline) {
        if (subline[s] == symb) indList.push( from + 1 + (+s) );
    }

    return indList;
}