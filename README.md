# Discord-Bot-Waffles

Find the next Nanban Time for UWO NERDS


waffles bot

- require
    discord.js
    moment.js
    moement-timezone.js

- constants
    serverTime
    nbTime1
    nbTime2
    nbTime3
    updateTime

- serverTime
    moment-timezone(/America/Los_Angeles)
- nbTime
    array of max length of 3
    nbTime1 = updateTime.add(7270*1,"seconds")
    nbTime2 = updateTime.add(7270*2,"seconds")
    nbtime3 = updateTime.add(7270*3,"seconds")
- updateTime
    user input time    
    - if serverTime.isAfter(nbTime1)
        updateTime.push(nbTime1)

- input
    user input
    !@nb =>
        - print
            "Server Time: " + serverTime
            "Nanban Time: " + updateTime
            "Next Nanban Time: " + nbTime1 + " => " + nbTime2 + " => " + nbTime3

    !@ut => updateTime = serverTime
    !@ct + => add time
        only accept minutes
        - alters updateTime
    !@ct - => subtract time
        only accept minutes
        - alters updateTime


