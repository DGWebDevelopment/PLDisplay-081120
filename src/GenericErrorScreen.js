import React from 'react'
import BalotelliPic from './Player Faces/Balotelli-Why-Always-Me.jpg'

export default function ({error}) {
    var errorText

    console.log(error)

    if (error=="NoGamesError") {
        errorText="Unfortunately it seems that there aren't any Premier League games taking place within the next seven days, please try again soon."
    }
    if (error=="footballAPIError") {
        errorText="Error: unforunately the Football API used for this application is not responding properly. I am sorry about this, please try again soon."
    }
    if (error=="genericGeolocationAPIError") {
        errorText="Error: unforunately the Geolocation API used for this application is not responding properly. I am sorry about this, please try again soon."
    }

    return <div>
        <div id="ErrorPictureContainer">
            <img id="BalotelliWhyAlwaysMePic" src={BalotelliPic} alt="Balotelli why always me pic" style={{width:'350px'}}></img>
        </div>
        
        <div id="ErrorTitleContainer">
            <h1 id='ErrorHeader'>OH NO</h1>

            <div style={{width:'40%', position:'absolute', left:'30%'}}>
                <p id='ErrorText'>{errorText}</p>
            </div>
           
        </div>
    </div>
}