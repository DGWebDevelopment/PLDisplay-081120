import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './General.css'
import './LoadingScreenAndErrorScreen.css'

import {StadiumInformation} from './Data.js';
import LoadingScreen from './LoadingScreen.js';
import GeolocationDisabledErrorScreen from './GeolocationDisabledErrorScreen.js'
import GenericErrorScreen from './GenericErrorScreen.js';
import PLDisplay from './PLDisplay.js';
import CreditsSourcesPopup from './CreditsSourcesPopup.js'

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state= {
            error:null,
            loaded:null,
            showPopUp: false,
            popUpButtonArrowFormat: 'arrow up',
            homeTeamName:null, 
            awayTeamName:null,
            homeTeamLogo:null,
            awayTeamLogo:null,
            venueName:null,
            dateAndTime:null,
        }

        this.findClosestGameWithinNextSevenDays=this.findClosestGameWithinNextSevenDays.bind(this)
        this.togglePopup=this.togglePopup.bind(this)
    }

    togglePopup () {
        var switchDirection = this.state.popUpButtonArrowFormat=='arrow up'? 'arrow down': 'arrow up'
        this.setState({showPopUp:!this.state.showPopUp, popUpButtonArrowFormat:switchDirection})
    }


   
    componentDidMount () {
        this.getPositionOfUserAndStartComputations()
    };

    getPositionOfUserAndStartComputations () {
        window.navigator.geolocation.getCurrentPosition(
            position=>this.computeNearestGround(position),
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        this.setState({error:'geolocationDisabledError'})
                    break;
                    case error.POSITION_UNAVAILABLE: case error.TIMEOUT: case error.UNKNOWN_ERROR:
                        this.setState({error:'genericGeolocationAPIError'})
                    break;
                }
            }
        );
    }


    computeNearestGround (position) {
        const unorderedDistanceFromEachGround = StadiumInformation.map(team=> {
            const container ={}
    
            container.stadium=team.stadium;
            container.distanceFromGround=Math.sqrt(
                Math.pow((team.lat-position.coords.latitude),2)
                + Math.pow((team.long-position.coords.longitude),2)
            );
            return container;
        })
        var orderedDistanceFromEachGround= unorderedDistanceFromEachGround.sort((a,b)=> {
            return a.distanceFromGround-b.distanceFromGround
        })
        this.computeClosestGameWithinNextSevenDays(orderedDistanceFromEachGround);
    };

    computeClosestGameWithinNextSevenDays (orderedDistanceFromEachGround) {
    
        axios({
            'method': "GET",
            'url': 'https://api-football-v1.p.rapidapi.com/v2/fixtures/league/2790',
            'headers': {
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                //'x-rapidapi-key': process.env.REACT_APP_SECRET_KEY
                'x-rapidapi-key': "a3e9667df8msh1fa39a70e177eadp14832bjsned2e9b17d6a1"
            },
        })
        .then(
            (response)=>this.filterDownToNextSevenDays(response, orderedDistanceFromEachGround)
        ).catch(()=>{
            this.setState({error:'footballAPIError'})
        })
    }
    
    filterDownToNextSevenDays(allSeasonFixtures, orderedDistanceFromEachGround) {
        var dateNowInWholeSeconds = Date.now().toString().substr(0, Date.now().toString().length - 3);
        var dateInSevenDaysInWholeSeconds = parseInt(dateNowInWholeSeconds) + 604800;
    
        var fixturesWithinNextSevenDays = [];           
        for (var i=0; i<allSeasonFixtures.data.api.fixtures.length; i++) {
            if (allSeasonFixtures.data.api.fixtures[i].event_timestamp>dateNowInWholeSeconds && allSeasonFixtures.data.api.fixtures[i].event_timestamp<dateInSevenDaysInWholeSeconds) {
                fixturesWithinNextSevenDays.push(allSeasonFixtures.data.api.fixtures[i])
            }
            else {
                continue
            }
        }
        this.findClosestGameWithinNextSevenDays(orderedDistanceFromEachGround,fixturesWithinNextSevenDays)
    };

    findClosestGameWithinNextSevenDays (orderedDistanceFromEachGround,fixturesWithinNextSevenDays){
        if (fixturesWithinNextSevenDays.length!==0) {
            for (var i =0; i<orderedDistanceFromEachGround.length; i++) {
                for (var x=0; x<fixturesWithinNextSevenDays.length; x++) {
                    if (orderedDistanceFromEachGround[i].stadium===fixturesWithinNextSevenDays[x].venue) {
                        var game = fixturesWithinNextSevenDays[x]
    
                        this.setState({
                            homeTeamName : game.homeTeam.team_name,
                            homeTeamLogo : game.homeTeam.logo,
                            awayTeamName : game.awayTeam.team_name,
                            awayTeamLogo : game.awayTeam.logo,
                            venueName : game.venue,
                            dateAndTime : game.event_date,
                            timeStamp: game.event_timestamp
                        })
    
                        this.getStandings(this.state.homeTeamName, this.state.awayTeamName)
                        return                
                    }
                }
            }
        }
        else {
            this.setState({error:'NoGamesError'})
        }
    };

    getStandings (homeTeamName, awayTeamName) {
       axios({
            'method': "GET",
            'url': 'https://api-football-v1.p.rapidapi.com/v2/leagueTable/2790',
            'headers': {
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                //'x-rapidapi-key': process.env.REACT_APP_SECRET_KEY
                'x-rapidapi-key': "a3e9667df8msh1fa39a70e177eadp14832bjsned2e9b17d6a1"
            },
        }).then((results) => {
        
            if (results.data.api.standings!==undefined) {
                var standings = results.data.api.standings[0]
                for (var i=0; i<standings.length; i++) {
                    if (standings[i].teamName==homeTeamName) {
                        this.setState({homeTeamStanding:standings[i].rank})
                    }
                    if (standings[i].teamName==awayTeamName) {
                        this.setState({awayTeamStanding:standings[i].rank})
                    }
                }
            }
            this.setState({loaded:true})
        }).catch(()=>{
            this.setState({error:'footballAPIError'})
        })
    }

    render () {
        if (this.state.error!==null) {
            if (this.state.error=='geolocationDisabledError') {
                return <div>
                    <GeolocationDisabledErrorScreen />

                    <div id="popUpButton" onClick={this.togglePopup}>
                        <i className={this.state.popUpButtonArrowFormat}></i>
                        <span style={{marginLeft:'40px'}}>Credits/Sources</span>
                    </div>

                    <CreditsSourcesPopup toggle={this.state.showPopUp} />
                </div>
            }
            else {
                return <div>
                    <GenericErrorScreen error={this.state.error}/>
                    <div id="popUpButton" onClick={this.togglePopup}>
                        <i className={this.state.popUpButtonArrowFormat}></i>
                        <span style={{marginLeft:'40px'}}>Credits/Sources</span>
                    </div>

                    <CreditsSourcesPopup toggle={this.state.showPopUp} />
                </div>
            }
        }

        if (this.state.loaded===null) {
            return <div>
                <LoadingScreen togglePopUp={this.togglePopUp} showPopUp={this.state.showPopUp} />
                <div id="popUpButton" onClick={this.togglePopup}>
                    <i className={this.state.popUpButtonArrowFormat}></i>
                    <span style={{marginLeft:'40px'}}>Credits/Sources</span>
                </div>

                <CreditsSourcesPopup toggle={this.state.showPopUp} />
            </div>
        }
        else {
            return <div>
                <PLDisplay gameInformation={this.state} togglePopUp={this.togglePopUp} showPopUp={this.state.showPopUp} />
                <div id="popUpButton" onClick={this.togglePopup}>
                    <i className={this.state.popUpButtonArrowFormat}></i>
                    <span style={{marginLeft:'40px'}}>Credits/Sources</span>
                </div>

                <CreditsSourcesPopup toggle={this.state.showPopUp} />
            </div>
        }
    }
}




ReactDOM.render(<App />, document.querySelector('#root'));