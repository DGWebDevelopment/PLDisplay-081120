import React from 'react'
import {PlayerPortraitSources} from './CreditsSources.js'
import {VenuePictureSources} from './CreditsSources.js'
import {OtherPictureSources} from './CreditsSources.js'
import './General.css'

/*export default class extends React.Component {
    constructor (props) {
        super (props)

        this.state={
            showPopUp: false,
            popUpButtonArrowFormat: 'arrow up',
            top:599,
            height:0,
            border:null,
            popUpAnimationComplete:true,
        }

        this.togglePopup=this.togglePopup.bind(this)
    }

    togglePopup () {
        var switchDirection = this.state.popUpButtonArrowFormat=='arrow up'? 'arrow down': 'arrow up'
        this.setState({showPopUp:!this.state.showPopUp, popUpButtonArrowFormat:switchDirection})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.showPopUp!==prevState.showPopUp && this.state.showPopUp==true) {
            if (this.state.popUpAnimationComplete==false) {
                clearInterval(this.contractionAnimation)
                this.expandPopUp()
            }
            else if (this.state.popUpAnimationComplete==true) {
                this.expandPopUp()
            }
        }
        else if (this.state.showPopUp!==prevState.showPopUp && this.state.showPopUp==false) {
            if (this.state.popUpAnimationComplete==false) {
                clearInterval(this.expansionAnimation)
                this.contractPopUp()
            }
            else if (this.state.popUpAnimationComplete==true) {
                this.contractPopUp()
            }
        }
    }
    
    expandPopUp() {
        this.setState({border:'1px solid black'})
        this.expansionAnimation = setInterval(() => {
            if (this.state.height<450) {
                this.setState({top:this.state.top-6, height:this.state.height+6, popUpAnimationComplete:false})
            }
            else {
                clearInterval(this.expansionAnimation)
                this.setState({popUpAnimationComplete:true})
            }
        },1)
    }

    contractPopUp() {
        this.contractionAnimation = setInterval(() => {
            if (this.state.height>0) {
                this.setState({top:this.state.top+6, height:this.state.height-6, popUpAnimationComplete:false})
            }
            else {
                clearInterval(this.contractionAnimation)
                this.setState({popUpAnimationComplete:true, border:null})
            }
        },1)
    }

    render () {
        var page= this.props.page;
        var innerWidth= this.props.innerWidth;

        var  

        if (page==="loadingScreen" || page==="errorScreen"){

            if (innerWidth>=797){


            }
            else if (innerWidth<797){


            }


        }
        else if (page==="PLDisplayScreen"){




        }

       


        const PlayerNamesAndSources= PlayerPortraitSources.map (PlayerPortraitSource => {
            return (
                <tr key={PlayerPortraitSource.playerName}>
                    <td>{PlayerPortraitSource.playerName}: </td>
                    <td>
                        <a href={PlayerPortraitSource.link} target="_blank" style={{overflowWrap:'break-word'}}>{PlayerPortraitSource.link}</a>                    </td>
                </tr>
            )
        });
        const VenueNamesAndSources = VenuePictureSources.map (VenuePictureSource => {
            return (
                <tr key={VenuePictureSource.teamName}>
                    <td>{VenuePictureSource.teamName}: </td>
                    <td>
                        <a href={VenuePictureSource.link} target="_blank" style={{overflowWrap:'break-word'}}>{VenuePictureSource.link}</a>
                    </td>
                </tr>
            )
        });
        const SourcesOfOtherPictures = OtherPictureSources.map (OtherPictureSource => {
            return (
                <tr key={OtherPictureSource.item}>
                    <td>{OtherPictureSource.item}: </td>
                    <td>
                        <a href={OtherPictureSource.link} target="_blank" style={{overflowWrap:'break-word'}}>{OtherPictureSource.link}</a>
                    </td>
                </tr>
            )
        });

        return <div>
            <div id="popUpButton" onClick={this.togglePopup}>
                <i className={this.state.popUpButtonArrowFormat}></i>
                <span style={{marginLeft:'40px'}}>Credits/Sources</span>
            </div>

            <div id="popUp" style={{top:`${this.state.top}px`, height:`${this.state.height}px`, border:this.state.border}}>
                <div style={{width: '100%', textAlign:'center'}}>
                    <h4 style={{textDecoration:'underline', paddingBottom:'12px', margin:'14px 0px 14px 0px', borderBottom:'1px solid black'}}>Designed and created by Dylan Gallagher (DG Web Development)</h4>
                    <div style={{padding: '0px 0px 17px 0px', margin:'0px 0px 0px 0px', borderBottom:'1px solid black'}}>
                        <p style={{padding:'0px', marginBottom:'5px'}}>dylangallagher@mail.com</p>
                        <a href="https://github.com/DGWebDevelopment/PLDisplay-081120" target="_blank" style={{color:'white'}}>
                        https://github.com/DGWebDevelopment/PLDisplay-081120
                        </a>
                    </div>
                </div>

                <table style={{tableLayout:'fixed', width:'100%', marginTop:'0px'}}>
                    <colgroup>
                        <col/>
                    </colgroup>
                  
                    <tbody>
                    <tr>
                        <th colSpan="2">Technologies used:</th>
                    </tr>
                    <tr>
                        <td>HTML</td><td style={{textAlign:'center'}}>CSS</td>
                    </tr>
                    <tr>
                        <td>Javascript (React)</td><td style={{textAlign:'center'}}>Adobe Photoshop</td>
                    </tr>
                    <tr>
                        <th colSpan="2">APIs used:</th>
                    </tr>
                    <tr>
                        <td>Geolocation API</td>
                        <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition" style={{overflowWrap:'break-word'}}>https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition</a></td>
                    </tr>
                    <tr>
                        <td>'API FOOTBALL'</td>
                        <td><a href="https://rapidapi.com/api-sports/api/api-football/details" style={{overflowWrap:'break-word'}}>https://rapidapi.com/api-sports/api/api-football/details</a></td>
                    </tr>

                    <tr>
                        <th colSpan="2">Player pictures used:</th>
                    </tr>
                    {PlayerNamesAndSources}
                    <tr>
                        <th colSpan="2">Venue pictures used:</th>
                    </tr>
                    {VenueNamesAndSources}
                    <tr>
                        <th colSpan="2">Other pictures used:</th>
                    </tr>
                    {SourcesOfOtherPictures}
                   </tbody>
                </table>
                <p style={{color:'orange', fontWeight:'bold', textAlign:'center', padding:'0px 10px 0px 10px'}}>
                    <span style={{textDecoration:'underline'}}>DISCLAIMER:</span> None of the original pictures of the players, logos or stadiums belong to me (although I
                    have edited the player portraits using Photoshop). All information supplied by the APIs belongs to their respectful owners. All rights for the Premier League and all of its clubs/players
                    belong to their respectful owners.This app is purely for demonstrative reasons (programming) therefore its results cannot be relied on (they may be inaccurate due to either an error from the API or due to an error
                    in my programming). I have used Latitude & Longitude coordinates to programme this app therefore distances will not always be accurate.
                </p>
            </div>
        </div>
    }
};*/




export default class extends React.Component {
    constructor (props) {
        super (props)
        let innerWidth=props.innerWidth;

        var popUpButtonTop;
        var popUpButtonRight;
        var popUpWidth;
        var popUpRight;


        if(props.page==="loadingScreen" || props.page==="errorScreen"){
            switch(true){
                case(innerWidth>797):
                    //popUpButtonTop=600;
                    popUpButtonTop=630;
                    popUpButtonRight='10%';
                    popUpRight='10%';
                break;
                case(innerWidth>580 && innerWidth<=797):
                    popUpButtonTop=530;
                    popUpButtonRight=`${(innerWidth-200)/2}px`;
                    popUpRight=`${(innerWidth-402)/2}px`;
                break;
                case(innerWidth<=580):
                popUpButtonTop=530;
                popUpButtonRight=`${(innerWidth-200)/2}px`;
                popUpWidth = `${0.82*innerWidth}px`;
                popUpRight=`${0.09*innerWidth}px`;
                break;
            }
        }
 
        this.state={
            showPopUp: false,
            popUpButtonArrowFormat: 'arrow up',
            popUpButtonTop:popUpButtonTop,
            popUpButtonRight:popUpButtonRight,
            popUpTop:popUpButtonTop,
            popUpWidth:popUpWidth,
            popUpRight:popUpRight,
            height:0,
            border:null,
            popUpAnimationComplete:true,

        }
        this.togglePopup=this.togglePopup.bind(this)
        this.popUpButton=React.createRef()
    }

    togglePopup () {
        var switchDirection = this.state.popUpButtonArrowFormat=='arrow up'? 'arrow down': 'arrow up'
        this.setState({showPopUp:!this.state.showPopUp, popUpButtonArrowFormat:switchDirection})
    }

    componentDidUpdate(prevProps, prevState) {
        let innerWidth=this.props.innerWidth
        console.log(innerWidth)

        if(this.props.page==="loadingScreen" || this.props.page==="errorScreen" && innerWidth!==prevProps.innerWidth){
            if(prevProps.innerWidth<797 && innerWidth>=797){
                this.setState({
                    popUpTop:this.state.popUpTop+100,
                
                    popUpButtonTop:630,
                    popUpButtonRight:'10%',
                    popUpRight:'10%',
                })
            }
            else if(prevProps.innerWidth>=797 && innerWidth<797){
                this.setState({
                    popUpTop:this.state.popUpTop-100,
                
                    popUpButtonTop:530,
                })
            }
            if(innerWidth<797 && this.state.popUpButtonRight!==`${(innerWidth-200)/2}px`){
                this.setState({
                    popUpButtonRight:`${(innerWidth-200)/2}px`,
                    popUpRight:`${(innerWidth-402)/2}px`,
                })
            }
        }
        else if (this.props.page==="PLDisplayScreen" && innerWidth!==prevProps.innerWidth){
            if (prevProps.innerWidth<797 && innerWidth>=797){
                this.setState({
                    popUpTop:this.state.popUpTop-30,
                
                    popUpButtonTop:630,
                    popUpButtonRight:'10%',
                    popUpRight:'10%',
                })
            }
            else if(prevProps.innerWidth>=797 && innerWidth<797){
                console.log("CRASH")
                this.setState({
                    popUpTop:this.state.popUpTop+30,
                
                    popUpButtonTop:660,
                })
            }
            else if (prevProps.innerWidth>580 && innerWidth<=580){
                //change this

                
            }
            if(innerWidth<797 && this.state.popUpButtonRight!==`${(innerWidth-200)/2}px`){
                console.log("width readujustment")
                this.setState({
                    popUpButtonRight:`${(innerWidth-200)/2}px`,
                    popUpRight:`${(innerWidth-402)/2}px`,
                })
            }
        }

        if((prevProps.page==="loadingScreen" || prevProps.page==="errorScreen") && this.props.page==="PLDisplayScreen"){
            if(innerWidth<797){
                this.setState({
                    popUpButtonTop:660,
                    popUpTop:this.state.popUpTop+130
                })
            }
            if (innerWidth<=422){
                this.setState({
                    popUpButtonTop:580,
                    //popUpTop:
                })


                ///////change this
            }
        }

        if (innerWidth!==prevProps.innerWidth && innerWidth<=580){
            this.setState({popUpWidth:`${0.82*innerWidth}px`, popUpRight:`${0.09*innerWidth}px`})
        }
        /*else if(innerWidth!==prevProps.innerWidth && innerWidth>580){
            this.setState({popUpWidth:'402px', popUpRight:'10%'})
        }*/

        if (this.state.showPopUp!==prevState.showPopUp && this.state.showPopUp==true) {
            if (this.state.popUpAnimationComplete==false) {
                clearInterval(this.contractionAnimation)
                this.expandPopUp()
            }
            else if (this.state.popUpAnimationComplete==true) {
                this.expandPopUp()
            }
        }
        else if (this.state.showPopUp!==prevState.showPopUp && this.state.showPopUp==false) {
            if (this.state.popUpAnimationComplete==false) {
                clearInterval(this.expansionAnimation)
                this.contractPopUp()
            }
            else if (this.state.popUpAnimationComplete==true) {
                this.contractPopUp()
            }
        }
    }
    
    expandPopUp() {
        //this.popUpButton.current.style="width:'600px'; height:400px" //This can be used to completely style the mobile page yes?
        //this.popUpButton.current.style.height='400px'

        this.setState({border:'1px solid black'})
        this.expansionAnimation = setInterval(() => {
            if (this.state.height<450) {
                this.setState({popUpTop:this.state.popUpTop-6, height:this.state.height+6, popUpAnimationComplete:false})
            }
            else {
                clearInterval(this.expansionAnimation)
                this.setState({popUpAnimationComplete:true})
            }
        },1)
    }

    contractPopUp() {
        this.contractionAnimation = setInterval(() => {
            if (this.state.height>0) {
                this.setState({popUpTop:this.state.popUpTop+6, height:this.state.height-6, popUpAnimationComplete:false})
            }
            else {
                clearInterval(this.contractionAnimation)
                this.setState({popUpAnimationComplete:true, border:null})
            }
        },1)
    }

    render () {
        const PlayerNamesAndSources= PlayerPortraitSources.map (PlayerPortraitSource => {
            return (
                <tr key={PlayerPortraitSource.playerName}>
                    <td>{PlayerPortraitSource.playerName}: </td>
                    <td>
                        <a href={PlayerPortraitSource.link} target="_blank" style={{overflowWrap:'break-word'}}>{PlayerPortraitSource.link}</a>                    </td>
                </tr>
            )
        });
        const VenueNamesAndSources = VenuePictureSources.map (VenuePictureSource => {
            return (
                <tr key={VenuePictureSource.teamName}>
                    <td>{VenuePictureSource.teamName}: </td>
                    <td>
                        <a href={VenuePictureSource.link} target="_blank" style={{overflowWrap:'break-word'}}>{VenuePictureSource.link}</a>
                    </td>
                </tr>
            )
        });
        const SourcesOfOtherPictures = OtherPictureSources.map (OtherPictureSource => {
            return (
                <tr key={OtherPictureSource.item}>
                    <td>{OtherPictureSource.item}: </td>
                    <td>
                        <a href={OtherPictureSource.link} target="_blank" style={{overflowWrap:'break-word'}}>{OtherPictureSource.link}</a>
                    </td>
                </tr>
            )
        });

        return <div>
                <div id="popUpButton" ref={this.popUpButton} onClick={this.togglePopup} style={{top:this.state.popUpButtonTop, right:this.state.popUpButtonRight}}>
                    <i className={this.state.popUpButtonArrowFormat}></i>
                    <span style={{marginLeft:'40px'}}>Credits/Sources</span>
                </div>

                <div id="popUp" style={{top:`${this.state.popUpTop}px`, right:this.state.popUpRight, height:`${this.state.height}px`, width:this.state.popUpWidth, border:this.state.border}}>
                    <div style={{width: '100%', textAlign:'center'}}>
                        <h4 style={{textDecoration:'underline', paddingBottom:'12px', margin:'14px 0px 14px 0px', borderBottom:'1px solid black'}}>Designed and created by Dylan Gallagher (DG Web Development)</h4>
                        <div style={{padding: '0px 0px 17px 0px', margin:'0px 0px 0px 0px', borderBottom:'1px solid black'}}>
                            <p style={{padding:'0px', marginBottom:'5px', overflowWrap:'break-word'}}>dylangallagher@mail.com</p>
                            <a href="https://github.com/DGWebDevelopment/PLDisplay-081120" target="_blank" style={{color:'white', overflowWrap:'break-word'}}>
                            https://github.com/DGWebDevelopment/PLDisplay-081120
                            </a>
                        </div>
                    </div>

                    <table style={{tableLayout:'fixed', width:'100%', marginTop:'0px'}}>
                        <colgroup>
                            <col/>
                        </colgroup>
                    
                        <tbody>
                        <tr>
                            <th colSpan="2">Technologies used:</th>
                        </tr>
                        <tr>
                            <td>HTML</td><td style={{textAlign:'center'}}>CSS</td>
                        </tr>
                        <tr>
                            <td>Javascript (React)</td><td style={{textAlign:'center'}}>Adobe Photoshop</td>
                        </tr>
                        <tr>
                            <th colSpan="2">APIs used:</th>
                        </tr>
                        <tr>
                            <td>Geolocation API</td>
                            <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition" style={{overflowWrap:'break-word'}}>https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition</a></td>
                        </tr>
                        <tr>
                            <td>'API FOOTBALL'</td>
                            <td><a href="https://rapidapi.com/api-sports/api/api-football/details" style={{overflowWrap:'break-word'}}>https://rapidapi.com/api-sports/api/api-football/details</a></td>
                        </tr>

                        <tr>
                            <th colSpan="2">Player pictures used:</th>
                        </tr>
                        {PlayerNamesAndSources}
                        <tr>
                            <th colSpan="2">Venue pictures used:</th>
                        </tr>
                        {VenueNamesAndSources}
                        <tr>
                            <th colSpan="2">Other pictures used:</th>
                        </tr>
                        {SourcesOfOtherPictures}
                    </tbody>
                    </table>
                    <p style={{color:'orange', fontWeight:'bold', textAlign:'center', padding:'0px 10px 0px 10px'}}>
                        <span style={{textDecoration:'underline'}}>DISCLAIMER:</span> None of the original pictures of the players, logos or stadiums belong to me (although I
                        have edited the player portraits using Photoshop). All information supplied by the APIs belongs to their respectful owners. All rights for the Premier League and all of its clubs/players
                        belong to their respectful owners.This app is purely for demonstrative reasons (programming) therefore its results cannot be relied on (they may be inaccurate due to either an error from the API or due to an error
                        in my programming). I have used Latitude & Longitude coordinates to programme this app therefore distances will not always be accurate.
                    </p>
                </div>
            </div>
    }
};

//Grass turf source: <a href="https://www.freepik.com/photos/background">Background photo created by fwstudio - www.freepik.com</a>
//<div id="popUpDiv" style={{textAlign:this.state.popUpDivAlign, width:'100%', position:'absolute'}}></div>

/*<div id="popUpButtonDiv" style={{width:'100%', position:'absolute', top:`${this.state.popUpButtonDivTop}px`, textAlign:this.state.popUpButtonDivAlign, border:'1px solid red'}}>
                <div id="popUpButton" onClick={this.togglePopup} style={{position:this.state.popUpButtonPosition, right:this.state.popUpButtonRight}}>
                    <i className={this.state.popUpButtonArrowFormat}></i>
                    <span style={{marginLeft:'40px'}}>Credits/Sources</span>
                </div>
</div>*/









/*<div id="popUpDiv" style={{textAlign:this.state.popUpDivAlign}}>
                <div id="popUp" style={{position:this.state.popUpPosition, top:`${this.state.popUpTop}px`, height:`${this.state.height}px`, border:this.state.border}}>
                    <div style={{width: '100%', textAlign:'center'}}>
                        <h4 style={{textDecoration:'underline', paddingBottom:'12px', margin:'14px 0px 14px 0px', borderBottom:'1px solid black'}}>Designed and created by Dylan Gallagher (DG Web Development)</h4>
                        <div style={{padding: '0px 0px 17px 0px', margin:'0px 0px 0px 0px', borderBottom:'1px solid black'}}>
                            <p style={{padding:'0px', marginBottom:'5px'}}>dylangallagher@mail.com</p>
                            <a href="https://github.com/DGWebDevelopment/PLDisplay-081120" target="_blank" style={{color:'white'}}>
                            https://github.com/DGWebDevelopment/PLDisplay-081120
                            </a>
                        </div>
                    </div>

                    <table style={{tableLayout:'fixed', width:'100%', marginTop:'0px'}}>
                        <colgroup>
                            <col/>
                        </colgroup>
                    
                        <tbody>
                        <tr>
                            <th colSpan="2">Technologies used:</th>
                        </tr>
                        <tr>
                            <td>HTML</td><td style={{textAlign:'center'}}>CSS</td>
                        </tr>
                        <tr>
                            <td>Javascript (React)</td><td style={{textAlign:'center'}}>Adobe Photoshop</td>
                        </tr>
                        <tr>
                            <th colSpan="2">APIs used:</th>
                        </tr>
                        <tr>
                            <td>Geolocation API</td>
                            <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition" style={{overflowWrap:'break-word'}}>https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition</a></td>
                        </tr>
                        <tr>
                            <td>'API FOOTBALL'</td>
                            <td><a href="https://rapidapi.com/api-sports/api/api-football/details" style={{overflowWrap:'break-word'}}>https://rapidapi.com/api-sports/api/api-football/details</a></td>
                        </tr>

                        <tr>
                            <th colSpan="2">Player pictures used:</th>
                        </tr>
                        {PlayerNamesAndSources}
                        <tr>
                            <th colSpan="2">Venue pictures used:</th>
                        </tr>
                        {VenueNamesAndSources}
                        <tr>
                            <th colSpan="2">Other pictures used:</th>
                        </tr>
                        {SourcesOfOtherPictures}
                    </tbody>
                    </table>
                    <p style={{color:'orange', fontWeight:'bold', textAlign:'center', padding:'0px 10px 0px 10px'}}>
                        <span style={{textDecoration:'underline'}}>DISCLAIMER:</span> None of the original pictures of the players, logos or stadiums belong to me (although I
                        have edited the player portraits using Photoshop). All information supplied by the APIs belongs to their respectful owners. All rights for the Premier League and all of its clubs/players
                        belong to their respectful owners.This app is purely for demonstrative reasons (programming) therefore its results cannot be relied on (they may be inaccurate due to either an error from the API or due to an error
                        in my programming). I have used Latitude & Longitude coordinates to programme this app therefore distances will not always be accurate.
                    </p>
                </div>
            </div>*/




    
