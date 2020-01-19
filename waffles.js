// requirements
const { token } = require("./config.json")
const { prefix } = require("./config.json")
const Discord = require("discord.js")
const fs = require("fs")

const moment = require('moment-timezone')

const nbTimer = require("./data/nbTimer")
const snekfetch = require("snekfetch");


// -------------------------------------------------------------------------------------------------
//                                       CLIENT
// -------------------------------------------------------------------------------------------------

// const bot = new Discord.Client({disableEveryone: true})
const bot = new Discord.Client()

// client on ready function
bot.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    // console.log(bot.commands)

    // generate invite
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link)
    }).catch(err => {
        console.log(err.stack)
    })


    bot.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })

    // target channel
    let botChannel = bot.channels.get("667117820043198465")

    let embed = new Discord.RichEmbed()
        .setAuthor("Meow!")
        .setDescription("Waffles is now awake!")
        .setColor("#9859B6")
        .addField("Bot Server Time: ", moment().format('MMMM Do YYYY, h:mm:ss a'))
        .addField("PST: ", moment().tz("America/Los_Angeles").format('MMMM Do YYYY, h:mm:ss a'))
        .addField("PST + 7270 Seconds: ", moment().tz("America/Los_Angeles").add(7270,"seconds").format('MMMM Do YYYY, h:mm:ss a'))
    botChannel.send({embed: embed})

})

// Replying to a command
bot.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return
    
    // let messageArray = message.content.split(/\s+/g)
    // let command = messageArray[0]
    // let args = messageArray.slice[1]

    // if(!command.startsWith(prefix)) return

    // let cmd = bot.commands.get(command.slice(prefix.length))
    // if(cmd) cmd.run(bot, message, args);


    if (message.content.startsWith(prefix)) {
        wafflesCommand(message)
        return
    }
})
 
// -------------------------------------------------------------------------------------------------
//                                       LISTENER
// -------------------------------------------------------------------------------------------------

// process message
function wafflesCommand(message) {
    let fullCommand = message.content.substr(2) // Remove "!@"
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after !@ is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    // toggle help
    if (primaryCommand == "help") {
        helpCommand(message)
    } 
    
    // print nanban times
    else if (primaryCommand == "nb") {
        nbTimeCommand(arguments, message)
    } 
    
    // set updateTime
    else if (primaryCommand =="ut") {
        setTimeCommand(arguments, message)
    } 

    // add time
    else if (primaryCommand =="ut+") {
        addTimeCommand(arguments, message)
    } 

    // subtract time
    else if (primaryCommand =="ut-") {
        subtractTimeCommand(arguments, message)
    } 
    
    // error message
    else {
        message.channel.send("Waffles does not understand! Try `!@help`")
    }
}

// -------------------------------------------------------------------------------------------------
//                                       PROCESS FUNCTIONS
// -------------------------------------------------------------------------------------------------

// print !@help
function helpCommand(message) {
    //  message.channel.send(
    //      !@ct+ XX : add XX minutes\n!@ct- XX : subtract XX minutes" 
    //  )

     let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Waffles only knows Server Time!")
        .setColor("#9859B6")
        .addField("!@nb : ", "Find Nanban Times")
        .addField("!@ut : ", "Update Nanban Time to current time")
        .addField("!@ut+ XX : ", "add XX minutes fron Nanban Time")
        .addField("!@ut- XX : ", "subtract XX minutes from Nanban Time")
    message.channel.send({embed: embed})
}

// print nanban times
function nbTimeCommand(arguments, message) {


    let embed = new Discord.RichEmbed()
        .setAuthor("Waffles looks deep into the Nanban")
        .setDescription("Waffles only knows Server Time!")
        .setColor("#9859B6")
        .addField("Server Time: ", nbTimer.serverTime)
        .addField("Updated Nanban Time: ", nbTimer.updateTime)
        .addField("Next Nanban Time: ", nbTimer.nbTime) 
    message.channel.send({embed: embed})

}

// set updateTime
function setTimeCommand(arguments, message) {



    let embed = new Discord.RichEmbed()
        .setAuthor("Waffles is updating Nanban Time!")
        .setDescription("This updates the stored Nanban time to current time")
        .setColor("#9859B6")
        .addField("Updated Nanban Time: ", nbTimer.updateTime)
        .addField("Next Nanban Time: ", nbTimer.nbTime)
    message.channel.send({embed: embed})   

}

// add time
function addTimeCommand(arguments, message) {


    let alterTime = arguments
    let embed = new Discord.RichEmbed()
        .setAuthor("Waffles is fiddeling with the fabric of time!")
        .setDescription(`This adds ${alterTime} minutes to the stored Nanban Time`)
        .setColor("#9859B6")
        .addField("Updated Nanban Time: ", nbTimer.updateTime)
        .addField("Next Nanban Time: ", nbTimer.nbTime)
    message.channel.send({embed: embed})   

}

// subtract time
function subtractTimeCommand(arguments, message) {


    let alterTime = arguments
    let embed = new Discord.RichEmbed()
        .setAuthor("Waffles is fiddeling with the fabric of time!")
        .setDescription(`This subtracts ${alterTime} minutes to the stored Nanban Time`)
        .setColor("#9859B6")
        .addField("Updated Nanban Time: ", nbTimer.updateTime)
        .addField("Next Nanban Time: ", nbTimer.nbTime)
    message.channel.send({embed: embed}) 

}




bot.login(token)

// -------------------------------------------------------------------------------------------------
//                                       SAMPLE CODE
// -------------------------------------------------------------------------------------------------

// let embed = new Discord.RichEmbed()
//     .setAuthor(message.author.username)
//     .setDescription("This is the Description!")
//     .setColor("#9859B6")
//     .addField("ID", message.author.id)
//     .addField("Created At", message.author.createdAt)
// botChannel.send({embed: embed})


// -------------------------------------------------------------------------------------------------
//                                       PREVIOUS CODE
// -------------------------------------------------------------------------------------------------

// // npm require
// const Discord = require("discord.js")
// const moment = require('moment')
// const tz = require("moment-timezone")
// const snekfetch = require("snekfetch");

// const nbTimer = require("./data/nbTimer")


// // Discord token cdm
// const { token } = require('./config.json');

// // create discord client
// const client = new Discord.Client()

// // let nbTime1 = moment(data.updateTime).add(7270,"seconds").calendar()
// // let nbTime2 = moment(data.updateTime).add(7270*3,"seconds").calendar()
// // let nbTime3 = moment(data.updateTime).add(7270*3,"seconds").calendar()

// // on start notification
// client.on('ready', () => {
//     // List servers the bot is connected to
//     console.log("Servers:")
//     client.guilds.forEach((guild) => {
//         console.log(" - " + guild.name)

//         // List all channels
//         guild.channels.forEach((channel) => {
//             console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
//         })
//     })

//     // // auto updates to updateTime based on nbTime1
//     // if (serverTime.isAfter(nbTime1)) {
//     //     updateTime.push(nbTime1)
//     // }

//     // Sending Message to a channel
//     var botChannel = client.channels.get("667117820043198465") // Replace with known channel ID
//     botChannel.send("Meow!")

// })

// // Replying to a command
// client.on('message', (message) => {

//     // Prevent bot from responding to its own messages
//     if (message.author == client.user) {
//         return
//     }

//     // listen for commands
//     if (message.content.startsWith("!@")) {
//         processCommand(message)
//     }
// })

// // process message
// function processCommand(message) {
//     let fullCommand = message.content.substr(2) // Remove "!@""
//     let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
//     let primaryCommand = splitCommand[0] // The first word directly after !@ is the command
//     let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

//     console.log("Command received: " + primaryCommand)
//     console.log("Arguments: " + arguments) // There may not be any arguments

//     // toggle help .
//     if (primaryCommand == "help") {
//         helpCommand(message)
//     } 
    
//     // print nanban times
//     else if (primaryCommand == "nb") {
//         printCommand(arguments, message)
//     } 
    
//     // set updateTime
//     else if (primaryCommand =="ut") {
//         setTime(arguments, message)
//     } 

//     // add time
//     else if (primaryCommand =="ct+") {
//         addTime(arguments, message)
//     } 

//     // subtract time
//     else if (primaryCommand =="ct-") {
//         subtractTime(arguments, message)
//     } 
    
//     // error message
//     else {
//         message.channel.send("I don't understand the command. Try `!@help`")
//     }
// }


// // --------------------------------------------------------------------------------------
// // print !@help
// function helpCommand(message) {
//      message.channel.send(
//          "Waffles only knows Server Time!\n!@nb : Find Nanban Times\n!@ut : Update Nanban Time to current time\n!@ct+ XX : add XX minutes\n!@ct- XX : subtract XX minutes" 
//      )
// }

// // print Nanban Times
// function printCommand(message) {
//     // get nbTimer data
//     snekfetch.get(nbTimer).then( r => {
//         // console.log(r.body)

//         let id = Number(args[0]);
//         let body = r.body;
//         let serverTime = r.serverTime;
//         let updateTime = r.updateTime;
//         let nbTime = r.nbTimer;
        
//         // make sure the db is present
//         // error handeling
//         if(!id) return message.channel.send("DB not found!")
//         if(isNaN(id)) return message.channel.send("Something is wrong with the DB!");

//         let entry = body.find(post => post.id === id);
//         // console.log(entry);
//         if(!entry) return message.channel.send("This entry does not exist!");

//         let embed = new Discord.RichEmbed()
//             .setAuthor(entry.title)
//             .setDescription(entry.body)
//             .addField("Author ID", entry.userId)
//             .setFooter("Post Id: " + entry.id);

//         message.channel.send({embed: embed});




//     module.exports.run = async (arguments, message, args) => {

    
//         });   


//     }


//     message.channel.send(
//         "Server Time: " + nbTimer.serverTime +
//         "\n" +
//         "Nanban Time: " + nbTimer.updateTime +
//         "\n" +
//         "Next Nanban Time: " + nbTimer.nbTime
//     )
// }

// // set updateTime to current time
// function setTime(message) {
//     updateSetTime()
//     let newTime = data.serverTime
//     data.updateTime.push(newTime)
//     message.channel.send(
//         "Nanban Time updated to: " + data.updateTime.format('MMMM Do YYYY, h:mm:ss a')
//     )
// }

// // function to change updateTime to serverTime
// function updateSetTime() {
    
// }

// // add minutes to updateTime
// function addTime(arguments, message) {
//     let newTime = data.updateTime.add(arguments, "minutes").calendar()
//     data.updateTime.push(newTime)

//     message.channel.send(
//         "New Nanban time: " + nbTimer.updateTime +
//         "\n" +
//         "Next Nanban Time: " + nbTimer.nbTime
//     )
// }

// // subtract minutes from updateTime
// function subtractTime(arguments, message) {
//     let newTime = updateTime.subtract(arguments, "minutes").calendar()
//     data.updateTime.push(newTime)

//     message.channel.send(
//         "New Nanban time: " + nbTimer.updateTime +
//         "\n" +
//         "Next Nanban Time: " + nbTimer.nbTime
//     )
// }

// // ---------------------------------------------------------------------------------------




// // Get your bot's secret token from:
// // https://discordapp.com/developers/applications/
// // Click on your application -> Bot -> Token -> "Click to Reveal Token"

// // KEY IS IN CONFIG.JSON, .gitignore


// client.login(token)