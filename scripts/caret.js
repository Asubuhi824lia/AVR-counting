
// Отловить положение мыши
document.getElementById('textarea').onkeyup = function(e) {
    let cursor_pos_Y = getPosInCol(document.getElementById('textarea'));
    console.log(cursor_pos_Y);
    
    return true;
};

function getCaret(el) { 
            if (el.selectionStart) { 
                return el.selectionStart; 
            } else if (document.selection) { 
                el.focus(); 
            
                var r = document.selection.createRange(); 
                if (r == null) { 
                return 0; 
                } 
            
                var re = el.createTextRange(), 
                    rc = re.duplicate(); 
                re.moveToBookmark(r.getBookmark()); 
                rc.setEndPoint('EndToStart', re); 
            
                return rc.text.length; 
            }  
            return 0; 
        }

function getPosInRow(el) {
    var caret = getCaret(el);
    var text = el.value.substr(0, caret).replace(/^(.*[\n\r])*([^\n\r]*)$/, '$2');
    
    // console.log(text);
    return text.length;
}

function getPosInCol(el) {
    var caret = getCaret(el);
    var text = el.value.substr(0, caret);

    let lines_cnt = 0;
    for (let s = 0; s < text.length; s++)
        if (text[s] == '\n') lines_cnt++;

    // console.log(lines_cnt);
    return lines_cnt;
}