$(() => {
    console.log(randomNumber())
})

function randomNumber(params) {
    var number = Math.floor(Math.random() * Math.floor(4))

    return number
}