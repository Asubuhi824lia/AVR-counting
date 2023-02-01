// получить координаты teaxtarea
const rect = $('#textarea')

$('#backlight').css('padding-top', $('#textarea').css('padding-top'))

// обновление размеров backlight
setInterval(fixSizePos, 100);
function fixSizePos() {
    $('#backlight').css('width', rect[0].offsetWidth)
    $('#backlight').css('height', rect[0].offsetHeight)
    $('#backlight').css('top', rect[0].offsetTop)
    $('#backlight').css('left', rect[0].offsetLeft)
}

// Отслеживать положение курсора в textarea
let prev_pos = 0
// setInterval(detectCaret, 100);

rect.click(() => {detectCaret();})
rect.keyup(function(e) {
	if(e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'Enter' || e.key == 'Backspace')
    {    
        detectCaret();
        console.log(e.key + ', ' + e.keyCode);
    }
});

function detectCaret() {
    const pos = Number( getPosInCol($("#textarea")[0]) || '0' );
    // console.log(pos);

    // console.log("prev_pos: " + prev_pos + ";\tpos: " + pos)

    const lines = document.getElementsByClassName("line");
    if(prev_pos != pos)
    {
        lines[prev_pos].classList.remove("selected")
        prev_pos = pos;
        selectedLine.pos = pos;
    } 
    lines[pos].classList.add("selected")
}