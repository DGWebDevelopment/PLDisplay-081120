import React from 'react';

import DeGeaPortrait from './Player Faces/DeGea-Portrait-150wide.png';
import DeBruynePortrait from './Player Faces/DeBruyne-Portrait-150wide.png';
import HavertzPortrait from './Player Faces/Havertz-Portrait-150wide.png';
import AubameyangPortrait from './Player Faces/Aubameyang-Portrait-150wide.png';
import KanePortrait from './Player Faces/Kane-Portrait-150wide.png';
import TraorePortait from './Player Faces/Traore-Portrait-150wide.png';


const PlayerPortraits = [
    DeGeaPortrait,
    DeBruynePortrait,
    HavertzPortrait,
    AubameyangPortrait,
    KanePortrait,
    TraorePortait
]



export default class extends React.Component {
    constructor (props) {
        super(props);
        var x= Math.floor(Math.random()*5);

        this.state={angle:0, PlayerPortraitsIndex:x}
    }
    

    RotationCounter () {
        var counter=0;
        this.intervalID = setInterval(
            ()=>{
                this.setState({angle:this.state.angle-30});
                counter++;
                if (counter===5) {
                    this.setState({PlayerPortraitsIndex:this.state.PlayerPortraitsIndex+1});
                    if (this.state.PlayerPortraitsIndex>5) {
                        this.setState({PlayerPortraitsIndex:0})
                    }
                    counter=0;
                }
            },125         
        );
    };

    LoadingDots () {
        return '....'
    }

    componentDidMount () {
        this.RotationCounter();
    }

    componentWillUnmount () {
        clearInterval(this.intervalID)
    }


    render() {
        return (
            <div>
                <div id="PlayerPortraitsContainer">
                    <img src={PlayerPortraits[this.state.PlayerPortraitsIndex]}
                        style={{transform:`rotate(${this.state.angle}deg)`}}>
                    </img>
                </div>

                <div id="LoadingTitleContainer">
                    <h1 id='LoadingHeader'>PLEASE WAIT</h1>
                    <p id='LoadingText'>
                        Locating the nearest Premier League game to you{this.LoadingDots()}
                        <br/>
                        Please make sure that Geolocation is enabled!
                    </p>
                </div>
            </div>
        )
    }
}

