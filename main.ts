radio.onReceivedNumber(function (receivedNumber) {
    basic.showIcon(IconNames.Heart)
    basic.pause(2000)
    basic.clearScreen()
    isWake = 1
    cover = 1
    servos.P2.setAngle(0)
    toggleLid()
    for (let index = 0; index < 5; index++) {
        basic.pause(1000)
    }
    cover = 0
    toggleLid()
    cover = 1
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
function toggleLid () {
    if (cover == 1) {
        servos.P2.setAngle(10)
    } else {
        servos.P2.setAngle(0)
    }
}
function getAverage () {
    sonar2 = 0
    for (let index = 0; index < 10; index++) {
        sonar2 += sonar.ping(
        DigitalPin.P1,
        DigitalPin.P1,
        PingUnit.Inches
        )
    }
}
radio.onReceivedString(function (receivedString) {
    isWake = 0
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("voice")
})
let sonar2 = 0
let cover = 0
let isWake = 0
radio.setGroup(100)
isWake = 1
cover = 0
servos.P2.setAngle(0)
basic.forever(function () {
    getAverage()
    while (isWake == 0) {
        basic.showNumber(sonar2 / 10)
        if (sonar2 / 10 >= 50) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
        }
        getAverage()
    }
})
