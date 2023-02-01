// получить координаты teaxtarea
const rect = $('#textarea')[0]

$('#backlight').css('width', rect.offsetWidth)
$('#backlight').css('height', rect.offsetHeight)
$('#backlight').css('top', rect.offsetTop)
$('#backlight').css('left', rect.offsetLeft)

// обновление размеров backlight
setInterval(showWidth, 100);

function showWidth() {
    $('#backlight').css('width', rect.offsetWidth)
    $('#backlight').css('height', rect.offsetHeight)
    $('#backlight').css('top', rect.offsetTop)
    $('#backlight').css('left', rect.offsetLeft)
}