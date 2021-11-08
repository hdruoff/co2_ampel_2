input.onButtonPressed(Button.A, function () {
    t_co22 = !(t_co22)
})
function zeigeOLED2 () {
    oledssd1306.clearDisplay()
    oledssd1306.setTextXY(0, 0)
    oledssd1306.writeString("Messwerte:")
    oledssd1306.setTextXY(1, 0)
    oledssd1306.writeString("Co2:")
    oledssd1306.writeNumber(co22)
    oledssd1306.setTextXY(2, 0)
    oledssd1306.writeString("TVOC:")
    oledssd1306.writeNumber(tvoc2)
}
input.onButtonPressed(Button.AB, function () {
    t_music = !(t_music)
})
input.onButtonPressed(Button.B, function () {
    t_tvoc2 = !(t_tvoc2)
})
let tvoc2 = 0
let co22 = 0
let t_music = false
let t_tvoc2 = false
let t_co22 = false
SG33.address(true)
t_co22 = false
t_tvoc2 = false
t_music = true
oledssd1306.initDisplay()
basic.forever(function () {
    co22 = SG33.eCO2()
    tvoc2 = SG33.TVOC()
    if (co22 < 1000 && tvoc2 < 400) {
        basic.setLedColor(0x00ff00)
    } else if (co22 < 1400 && tvoc2 < 400) {
        basic.setLedColor(0xff0000)
    } else {
        basic.setLedColor(0x0000ff)
        if (t_music) {
            music.playMelody("- B - A - F - D ", 120)
        }
    }
    zeigeOLED2()
    if (t_co22) {
        Zahlencodierung.zeigeNSorobancodiertAn(co22)
        t_co22 = !(t_co22)
    } else if (t_tvoc2) {
        Zahlencodierung.zeigeNSorobancodiertAn(tvoc2)
        t_tvoc2 = !(t_tvoc2)
    }
    basic.pause(5000)
    basic.clearScreen()
})
