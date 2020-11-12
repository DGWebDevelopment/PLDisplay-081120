import React from 'react';
import GeolocationPic from './Player Faces/GeolocationPicClearBackground.png'

export default function () {


    return <div>
        <div id="ErrorPictureContainer">
            <img id="GeolocationPic" src={GeolocationPic} alt="Geolocation Pic" style={{width:'250px'}}></img>
        </div>
        
        <div id="ErrorTitleContainer">
            <h1 id='ErrorHeader'>Please activate Geolocation services</h1>

            <div style={{width:'40%', position:'absolute', left:'30%'}}>
                <p id='ErrorText'>Please activate Geolocation services for the browser that you are using.</p>
            </div>
        
        </div>
    </div>
}