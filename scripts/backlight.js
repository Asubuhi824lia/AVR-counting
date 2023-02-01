// получить координаты teaxtarea
const rect = $('#textarea')[0]

$('#backlight').css('width', rect.offsetWidth)
$('#backlight').css('height', rect.offsetHeight)
$('#backlight').css('top', rect.offsetTop)
$('#backlight').css('left', rect.offsetLeft)

// обновление размеров backlight
setInterval(fixSizePos, 100);
function fixSizePos() {
    $('#backlight').css('width', rect.offsetWidth)
    $('#backlight').css('height', rect.offsetHeight)
    $('#backlight').css('top', rect.offsetTop)
    $('#backlight').css('left', rect.offsetLeft)
}

// Отслеживать положение курсора в textarea
setInterval(detectCaret, 100);
function detectCaret() {
    const pos = getPosInCol( $("#textarea")[0] );
    // console.log(pos);
    const lines = $(".line");
    console.log( lines );
}