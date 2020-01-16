// npm require
const Discord = require('discord.js')
const moment = require('moment')
const tz = require("moment-timezone")

// constants
const client = new Discord.Client()
const serverTime = moment().tz("America/Los_Angeles")
const updateTime = moment().tz("America/Los_Angeles") // update on user input needed
const nbTime1 = updateTime.add(7270*1,"seconds").calendar()
const nbTime2 = updateTime.add(7270*2,"seconds").calendar()
const nbTime3 = updateTime.add(7270*3,"seconds").calendar()

// on start notification
client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })

    // auto updates to updateTime based on nbTime1
    if (serverTime.isAfter(nbTime1)) {
        updateTime.push(nbTime1)
    }

    // Sending Message to a channel
    var generalChannel = client.channels.get("667117820043198465") // Replace with known channel ID
    generalChannel.send("Meow!")

})

// Replying to a command
client.on('message', (receivedMessage) => {

    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    // listen for commands
    if (receivedMessage.content.startsWith("!@")) {
        processCommand(receivedMessage)
    }
})

// response
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove "!@""
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after !@ is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    // toggle help .
    if (primaryCommand == "help") {
        helpCommand(receivedMessage)
    } 
    
    // print nanban times
    else if (primaryCommand == "nb") {
        printCommand(receivedMessage, serverTime, updateTime, nbTime1, nbTime2, nbTime3)
    } 
    
    // set updateTime
    else if (primaryCommand =="ut") {
        setTime(arguments, receivedMessage)
    } 

    // add time
    else if (primaryCommand =="ct+") {
        addTime(newTime, arguments, receivedMessage, updateTime, nbTime1, nbTime2, nbTime3)
    } 

    // subtract time
    else if (primaryCommand =="ct-") {
        subtractTime(newTime, arguments, receivedMessage, updateTime, nbTime1, nbTime2, nbTime3)
    } 
    
    // error message
    else {
        receivedMessage.channel.send("I don't understand the command. Try `!@help`")
    }
}

// print !@help
function helpCommand(receivedMessage) {
     receivedMessage.channel.send(
         "Waffles only knows Server Time!\n!@nb : Find Nanban Times\n!@ut : Update Nanban Time to current time\n!@ct+ XX : add XX minutes\n!@ct- XX : subtract XX minutes" 
     )
}

// print Nanban Times
function printCommand(receivedMessage, serverTime, updateTime, nbTime1, nbTime2, nbTime3) {
    receivedMessage.channel.send(
        "Server Time: " + serverTime.format('MMMM Do YYYY, h:mm:ss a') +
        "\n" +
        "Nanban Time: " + updateTime.format('MMMM Do YYYY, h:mm:ss a') +
        "\n" +
        "Next Nanban Time: " + nbTime1.format('MMMM Do YYYY, h:mm:ss a') + " => " + nbTime2.format('MMMM Do YYYY, h:mm:ss a') + " => " + nbTime3.format('MMMM Do YYYY, h:mm:ss a')
    )
}

// set updateTime to current time
function setTime(receivedMessage, updateTime, serverTime) {
    updateTime.push(serverTime)
    receivedMessage.channel.send(
        "Nanban Time updated to: " + updateTime.format('MMMM Do YYYY, h:mm:ss a')
    )
}

// add minutes to updateTime
function addTime(newTime, arguments, receivedMessage, updateTime, nbTime1, nbTime2, nbTime3) {
    let newTime = updateTime.add(arguments, "minutes").calendar()
    updateTime.push(newTime)

    receivedMessage.channel.send(
        "New Nanban time: " + updateTime +
        "\n" +
        "Next Nanban Time: " + nbTime1.format('MMMM Do YYYY, h:mm:ss a') + " => " + nbTime2.format('MMMM Do YYYY, h:mm:ss a') + " => " + nbTime3.format('MMMM Do YYYY, h:mm:ss a')
    )
}

// subtract minutes from updateTime
function subtractTime(newTime, arguments, receivedMessage, updateTime, nbTime1, nbTime2, nbTime3) {
    let newTime = updateTime.subtract(arguments, "minutes").calendar()
    updateTime.push(newTime)

    receivedMessage.channel.send(
        "New Nanban time: " + updateTime +
        "\n" +
        "Next Nanban Time: " + nbTime1.format('MMMM Do YYYY, h:mm:ss a') + " => " + nbTime2.format('MMMM Do YYYY, h:mm:ss a') + " => " + nbTime3.format('MMMM Do YYYY, h:mm:ss a')
    )
}






// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NjY3MTExNjIxNDg2ODM3Nzg1.Xh-CKQ.vQUQVEErAEMdHfQLqNg54wKcL6Y"

client.login(bot_secret_token)