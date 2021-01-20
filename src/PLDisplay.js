import React from 'react';
import './General.css'
import * as DateFormatting from './DateFormatting.js'

export default class extends React.Component {
    constructor (props) {
        super(props)
        console.log("construct")
    }

    componentDidMount() {
        //VS sign width = 77px
        //Each character is approx 11.4px wide
    }

    componentDidUpdate(){
      
    }

    render () {
        var offsetController = this.props.innerWidth>1091 ? 30: 20;

        var game = this.props.gameInformation
        var formattedVenueImageLink = game.venueName.replace(/['.]/g,'')
        var formattedDate = formatDate(game.timeStamp)

        var homeTeamFormattedStanding = formatStanding(game.homeTeamStanding).formattedStanding
        var homeTeamFormattedStandingStyles = formatStanding(game.homeTeamStanding).formattedStandingStyles

        var awayTeamFormattedStanding = formatStanding(game.awayTeamStanding).formattedStanding
        var awayTeamFormattedStandingStyles = formatStanding(game.awayTeamStanding).formattedStandingStyles




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
                    return {
                        formattedStanding:standingFormats[standing-1],
                        formattedStandingStyles:formatStandingStyles(standing),
                    }
                }
                else {
                    return {
                        formattedStanding:`${standing}th`,
                        formattedStandingStyles:formatStandingStyles(standing)
                    }
                }
            }
        }

        function formatStandingStyles(standing){
            switch(true){
                case(standing===1):
                    return {backgroundColor: 'gold', border: '1px solid white'};
                break;
                case(standing>1 && standing<=7):
                return {backgroundColor: 'rgb(225,227,225)', border: '1px solid green'};
                break;
                case(standing>7 && standing<=13):
                return {backgroundColor: 'rgb(225,227,225)', border: '1px solid orange'};
                break;
                case(standing>13 && standing<=20):
                return {backgroundColor: 'rgb(225,227,225)', border: '1px solid red'};
                break;
            }
        }

        return <div id="PLDisplayContainer">
            <div id="CentralItemsContainer">
                <h1 id ="MainTitle">The closest Premier League game to you in the next seven days is:</h1>
                <h1 id="VSTitle">VS</h1>
                <img id="VenuePicture" src={require(`./Venue Pictures/${formattedVenueImageLink}.jpg`)} />
                <div id="DateAndTimeDiv">
                    <h3 className="greyText">{formattedDate}</h3>
                </div>
                <div id="VenueNameDiv">
                    <h4 className="greyText">Venue: {game.venueName}</h4>
                </div>
                
            </div>
            <div id="HomeTeamName" style={{left: (this.props.innerWidth/2)-39-offsetController-(game.homeTeamName.length*11.4)}}>
                <h2 >{game.homeTeamName}</h2>
            </div>

            <div id="AwayTeamName" style={{left: (this.props.innerWidth/2)+39+offsetController}}>
                <h2 >{game.awayTeamName}</h2>
            </div>

            <div id="HomeTeamContainer">
                <img id="HomeTeamLogo" src={game.homeTeamLogo} />
                <div id="HomeTeamStanding">
                    <h3 className="greyText" style={{backgroundColor:homeTeamFormattedStandingStyles.backgroundColor ,border:homeTeamFormattedStandingStyles.border}}>{homeTeamFormattedStanding} place</h3>
                </div>
            </div>

            <div id="AwayTeamContainer">
                <img id="AwayTeamLogo" src={game.awayTeamLogo} />
                <div id="AwayTeamStanding">
                    <h3 className="greyText" style={{backgroundColor:awayTeamFormattedStandingStyles.backgroundColor ,border:awayTeamFormattedStandingStyles.border}}>{awayTeamFormattedStanding} place</h3>
                </div>
            </div>
        </div>
    }
};

//<h3 style={{ backgroundColor:'', border:homeTeamFormattedStandingStyles.border}}>{homeTeamFormattedStanding} place</h3>
//<h3 style={{backgroundColor:awayTeamFormattedStandingStyles.backgroundColor ,border:awayTeamFormattedStandingStyles.border}}>{awayTeamFormattedStanding} place</h3>





//game.awayTeamStanding

/*<div id="HomeTeamContainer">
                <img id="HomeTeamLogo" src={game.homeTeamLogo} />
                <div id="HomeTeamStanding">
                    <h3 style={{display:'inline-block', padding:'0px 5px 0px 5px', border:formatStanding(game.homeTeamStanding).color.border, backgroundColor:formatStanding(game.homeTeamStanding).color.backgroundColor, color:formatStanding(game.homeTeamStanding).color.textColor, borderRadius:'5px'}}>{formatStanding(game.homeTeamStanding).formattedStanding} place</h3>
                </div>
</div>*/

/*<div id="AwayTeamContainer">
                <img id="AwayTeamLogo" src={game.awayTeamLogo} />
                <div id="AwayTeamStanding">
                    <h3 style={{display:'inline-block', padding:'0px 5px 0px 5px', border:formatStanding(game.awayTeamStanding).color.border, backgroundColor:formatStanding(game.awayTeamStanding).color.backgroundColor, color:formatStanding(game.awayTeamStanding).color.textColor, borderRadius:'5px'}}>{formatStanding(game.awayTeamStanding).formattedStanding} place</h3>
                </div>
</div>*/
