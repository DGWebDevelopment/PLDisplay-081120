import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './General.css'
//import './LoadingScreenAndErrorScreen.css'

import {StadiumInformation} from './Data.js';
import LoadingScreen from './LoadingScreen.js';
import GeolocationDisabledErrorScreen from './GeolocationDisabledErrorScreen.js'
import GenericErrorScreen from './GenericErrorScreen.js';
import PLDisplay from './PLDisplay.js';
import CreditsSourcesPopup from './CreditsSourcesPopup.js'

const myAPIPassword = process.env.REACT_APP_MY_API_PASSWORD;
const footballAPIPassword = process.env.REACT_APP_FOOTBALL_API_PASSWORD


class App extends React.Component {
    constructor (props) {
        super(props);

        this.state= {
            innerWidth:window.innerWidth,
            error:null,
            loaded:null,
            homeTeamName:null, 
            awayTeamName:null,
            homeTeamLogo:null,
            awayTeamLogo:null,
            venueName:null,
            dateAndTime:null,
        }

        this.updateInnerWidth=this.updateInnerWidth.bind(this)
        this.findClosestGameWithinNextSevenDays=this.findClosestGameWithinNextSevenDays.bind(this)
    }


    updateInnerWidth() {
        this.setState({innerWidth : window.innerWidth})
    }

    componentDidMount () {
        window.addEventListener('resize', this.updateInnerWidth )

        console.log(Date.now())
        fetch('https://api.ipify.org?format=json')
            .then(results=>results.json()
            )
                .then(data=>{
                    fetch('https://www.dgwebdevelopment.co.uk/PLLocatorBackend.php',{
                        method:'POST',
                        body:JSON.stringify({
                            //myAPIPassword:myAPIPassword,
                            userIP:data.ip,
                            date: new Date(),
                            timeStamp:Date.now(),
                            isMobile:isMobile()
                        }),
                    }).then(response=>{if(response.ok) console.log("Successfull connection to PHP API")})
                })
        this.getPositionOfUserAndStartComputations()

        function isMobile() {
            var check = 'FALSE';
            (function(a){
              if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
                check = 'TRUE';
            })(navigator.userAgent||navigator.vendor||window.opera);
            return check;
          };
    };

    getPositionOfUserAndStartComputations () {console.log("commence position hunting")
        window.navigator.geolocation.getCurrentPosition(
            position => this.computeNearestGround(position),
            error => {console.log("position error")
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
        console.log("Coords are Lat: "+position.coords.latitude+" and Long: "+position.coords.longitude)

        fetch('https://api.ipify.org?format=json')
            .then(results=>results.json()
            )
                .then(data=>{
                    fetch('https://www.dgwebdevelopment.co.uk/PLLocatorBackend.php',{
                        method:'POST',
                        body:JSON.stringify({
                            //myAPIPassword:myAPIPassword,
                            userIP:data.ip,
                            latCoord:position.coords.latitude,
                            longCoord:position.coords.longitude
                        }),
                    })
                })

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
                'x-rapidapi-key': footballAPIPassword
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
                'x-rapidapi-key': footballAPIPassword
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
        let page;
        let CreditsSourcesPopupProps;

        //During Loading:
        if (this.state.loaded===null && this.state.error===null) {
            page= <LoadingScreen togglePopUp={this.togglePopUp} showPopUp={this.state.showPopUp} />;
            CreditsSourcesPopupProps = "loadingScreen";
        }
        //If loaded successfully
        else if(this.state.loaded!==null && this.state.error===null){
            page= <PLDisplay gameInformation={this.state} togglePopUp={this.togglePopUp} showPopUp={this.state.showPopUp} innerWidth={this.state.innerWidth} />;
            CreditsSourcesPopupProps = "PLDisplayScreen";
        }
        //If there is an error:
        if (this.state.error!==null){
            if (this.state.error=='geolocationDisabledError') {
                page= <GeolocationDisabledErrorScreen />;
            }
            else if (this.state.error) {
                page= <GenericErrorScreen error={this.state.error}/>;
            }
            CreditsSourcesPopupProps = "errorScreen";
        }

        //Final rendering:
        return <div>
            {page}
            <CreditsSourcesPopup innerWidth={this.state.innerWidth} page={CreditsSourcesPopupProps}/>
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));


