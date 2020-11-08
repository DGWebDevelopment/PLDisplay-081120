import React from 'react';
import './PLDisplay.css'
import * as DateFormatting from './DateFormatting.js'

export default class extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        var game = this.props.gameInformation
        var formattedVenueImageLink = game.venueName.replace(/['.]/g,'')

        function formatDate(timeStamp) {
            var xx = new Date()
            xx.setTime(timeStamp*1000)

            var dayOfTheWeek = DateFormatting.daysOfTheWeek[xx.getDay()]
            var dayOfTheMonth = DateFormatting.daysOfTheMonth[parseInt((xx.toString().match(/\d{2}/)))-1]
            var month = DateFormatting.monthsOfTheYear[xx.getMonth()]
            var time = xx.toString().match(/\d\d:\d\d/)

            return (`Taking place on ${dayOfTheWeek} 
            the ${dayOfTheMonth} 
            of ${month} at ${time}`)
        }

        function formatStanding(standing) {
            if (standing!==undefined){
                var standingFormats = ["1st", "2nd", "3rd"]
                if (standing>=1 && standing<=3) {
                    return standingFormats[standing-1]
                }
                else {
                    return `${standing}th`
                }
            }
        }

        return <div id="PLDisplayContainer">
            <div id="CentralItemsContainer">
                <h1 id ="MainTitle">The closest Premier League game to you in the next seven days is:</h1>
                <h1 id="VSTitle">VS</h1>
                <img id="VenuePicture" src={require(`./Venue Pictures/${formattedVenueImageLink}.jpg`)} />
                <h3 id="DateAndTime">{formatDate(game.timeStamp)}</h3>
                <h4 id="VenueName">Venue: {game.venueName}</h4>
            </div>

            <div id="HomeTeamName">
                <h2 >{game.homeTeamName}</h2>
            </div>

            <div id="AwayTeamName">
                <h2 >{game.awayTeamName}</h2>
            </div>
            

            <div id="HomeTeamContainer">
                <img id="HomeTeamLogo" src={game.homeTeamLogo} />
                <h3 id="HomeTeamStanding">{formatStanding(game.homeTeamStanding)} place</h3>
            </div>

            <div id="AwayTeamContainer">
                <img id="AwayTeamLogo" src={game.awayTeamLogo} />
                <h3 id="AwayTeamStanding">{formatStanding(game.awayTeamStanding)} place</h3>
            </div>
               
        </div>
    }
}


