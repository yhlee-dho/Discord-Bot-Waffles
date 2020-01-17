// npm require
const Discord = require('discord.js')
const moment = require('moment')
const tz = require("moment-timezone")
const express = require("express");


// Discord token cdm
const { token } = require('./config.json');


// create discord client
const client = new Discord.Client()

// Tells node that we are creating an "express" server
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/wafflesRoutes")(app);

// let nbTime1 = moment(data.updateTime).add(7270,"seconds").calendar()
// let nbTime2 = moment(data.updateTime).add(7270*3,"seconds").calendar()
// let nbTime3 = moment(data.updateTime).add(7270*3,"seconds").calendar()


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

    // // auto updates to updateTime based on nbTime1
    // if (serverTime.isAfter(nbTime1)) {
    //     updateTime.push(nbTime1)
    // }

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

// process receivedMessage
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
        printCommand(receivedMessage)
    } 
    
    // set updateTime
    else if (primaryCommand =="ut") {
        setTime(arguments, receivedMessage)
    } 

    // add time
    else if (primaryCommand =="ct+") {
        addTime(arguments, receivedMessage)
    } 

    // subtract time
    else if (primaryCommand =="ct-") {
        subtractTime(arguments, receivedMessage)
    } 
    
    // error message
    else {
        receivedMessage.channel.send("I don't understand the command. Try `!@help`")
    }
}


// --------------------------------------------------------------------------------------
// print !@help
function helpCommand(receivedMessage) {
     receivedMessage.channel.send(
         "Waffles only knows Server Time!\n!@nb : Find Nanban Times\n!@ut : Update Nanban Time to current time\n!@ct+ XX : add XX minutes\n!@ct- XX : subtract XX minutes" 
     )
}

// print Nanban Times
function printCommand(receivedMessage) {

    receivedMessage.channel.send(
        "Server Time: " + data.serverTime.format('MMMM Do YYYY, h:mm:ss a') +
        "\n" +
        "Nanban Time: " + data.updateTime.format('MMMM Do YYYY, h:mm:ss a') +
        "\n" +
        "Next Nanban Time: " + nbTime1 + " => " + nbTime2 + " => " + nbTime3
    )
}

// set updateTime to current time
function setTime(receivedMessage) {
    updateSetTime()
    let newTime = data.serverTime
    data.updateTime.push(newTime)
    receivedMessage.channel.send(
        "Nanban Time updated to: " + data.updateTime.format('MMMM Do YYYY, h:mm:ss a')
    )
}

// function to change updateTime to serverTime
function updateSetTime() {
    
}

// add minutes to updateTime
function addTime(arguments, receivedMessage) {
    let newTime = data.updateTime.add(arguments, "minutes").calendar()
    data.updateTime.push(newTime)

    receivedMessage.channel.send(
        "New Nanban time: " + data.updateTime +
        "\n" +
        "Next Nanban Time: " + nbTime1 + " => " + nbTime2 + " => " + nbTime3
    )
}

// subtract minutes from updateTime
function subtractTime(arguments, receivedMessage) {
    let newTime = updateTime.subtract(arguments, "minutes").calendar()
    data.updateTime.push(newTime)

    receivedMessage.channel.send(
        "New Nanban time: " + updateTime +
        "\n" +
        "Next Nanban Time: " + nbTime1 + " => " + nbTime2 + " => " + nbTime3
    )
}

// ---------------------------------------------------------------------------------------




// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

// KEY IS IN CONFIG.JSON, .gitignore


client.login(token)