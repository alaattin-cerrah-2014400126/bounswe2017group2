import ReactDOM from 'react-dom';
import axios from 'axios';
import { compose, withProps } from "recompose";
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from 'react-google-maps';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Dropdown } from "semantic-ui-react";
import { isEmail, isLength } from "validator";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import InlineError from "..//messages/InlineError";
const googleMapKey = "AIzaSyCrs1xLdXw8y4rfXc4tiJZZIWcwjmOR7BM";
const theToken = localStorage.lfcJWT;
class ArtistForm extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
            value: '',
            artists: [],
            
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
    this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        var data={'name':this.state.value};
  
        axios.get("http://34.210.127.92:8000/searchartists/",{
            params:data
        }
        ).then(resp => {
          this.setState({artists:resp.data});
        }).catch(err => {console.log(err)});
  
    }
      
    
    
    
    handleClick(e, data){
      let index=data.value;
      let selectedArtist=this.state.artists[index];
      this.props.onArtistSelected(selectedArtist);
    }
    render() {
    var artists=[];
    for(var i=0;i<this.state.artists.length;i++){
      artists.push({
        text:this.state.artists[i].name,
        value:i,
        image:{avatar:true, src:this.state.artists[i].images[2] ? this.state.artists[i].images[2].url:""},
  
      }
      
    );
    }
    return (
      <div>
      <label>
        Enter artist name: 
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p></p>
      <Button onClick={this.handleSubmit} > List Artists </Button>
      <p></p>
      <Dropdown onChange={this.handleClick} placeholder='Select Artist' fluid selection options={artists} />
      
      </div>
      
    );
    }
  }
  class TagForm extends React.Component{

    constructor(props){
      super(props);
      this.state ={
          allTags: [],
          selectedTags: [],
          searchvalue: "",
          value:[]
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event){
      this.setState({searchvalue: event.target.value});
    }
    handleSubmit(event){
      event.preventDefault();
      axios.get("http://34.210.127.92:8000/tags/"+this.state.searchvalue+"/",{},{
        'Content-Type': 'application/json',
        Authorization: "Bearer " + theToken      
      }
      ).then(resp => {
        console.log(resp);
        let tags=this.state.allTags;
        let selecttags=[];
        for(let index of this.state.value){
            selecttags.push(tags[index]);
        }
        tags=selecttags;
        let selectedCount=this.state.value.length;
        let newIndices=[];
        for(let i=0;i<selectedCount;i++){
            newIndices.push(i);
        }
        this.setState({value:newIndices});
        //remove tags that do not 
        let newtags=tags.concat(resp.data.filter(function (item){
          let duplicate=true;
          for(let arraydata of tags){
            if(arraydata['wikidata_uri']==item['wikidata_uri'])duplicate=false;
          }
          return duplicate;
        }
        ));
        this.setState({allTags:newtags});
        //console.log(this.state.allTags);
      }).catch(err => {console.log(err)});
    }
    handleClick(event,{value}){
        this.setState({value});
        let indices=[];
        indices=value;
        let selectedtags=[];
        let taglist=this.state.allTags;
        for(let index of indices){
            selectedtags.push(taglist[index]);
        }
        this.setState({selectedTags:selectedtags});

        this.props.tagSelected(selectedtags);
    }
    render(){
      let tags=[];
      for(var i=0;i<this.state.allTags.length;i++){
        tags.push({
          text:this.state.allTags[i].value+":"+this.state.allTags[i].context,
          value:i,
          key:this.state.allTags[i].wikidata_uri,
    
        }
        
      );
      }
      const {value}=this.state;
      return(
      <div>
        <label>
        Enter tag: 
        <input type="text" value={this.state.searchvalue} onChange={this.handleChange} />
        </label>
        <p></p>
        <Button onClick={this.handleSubmit}> Find Tags</Button>
        <p></p>
        <Dropdown onChange={this.handleClick} placeholder="Select Tags" value={value} fluid multiple selection options={tags}/>
        </div>
    );
    }
  }
  class GoogleLocationChooser extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        value: null,
        location: {},
        results:[],
        lat: 0.0,
        lng: 0.0
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    render (){
      
      return (
        <div>
        <div><label>
          Enter venue name: 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <p></p>
        <Button onClick={this.handleSubmit}> Set Location </Button></div>
        <p></p>
        <LocationMap lat={this.state.lat} lng={this.state.lng} venue_name={this.state.value}/>
        </div>
        );
    
    }
    handleChange(event) {
    this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
    event.preventDefault();
    var data={'name':this.state.value};
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?key='+googleMapKey+'&region=tr&address='+this.state.value)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({results:responseJson.results});
      this.setState({lat:responseJson.results[0].geometry.location.lat});
      this.setState({lng:responseJson.results[0].geometry.location.lng}); 
      this.setState({location:{'venue':this.state.value,'coordinates':responseJson.results[0].geometry.location.lat+' '+responseJson.results[0].geometry.location.lng}}); 
      this.props.onChange(this.state.location);  
    })
    .catch((error) => {
     console.error(error);
    });
      
    }  
  }
  class LocationMap extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.lat!=this.props.lat)return true;
        return false;
    }
    render(){
    if(this.props.venue_name==null)return <div></div>;
    var ConcertLocationMap = compose(
      withProps({
          googleMapURL:
              "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" +
              googleMapKey,
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `300px` }} />,
          mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
          defaultZoom={12}
          defaultCenter={{
              lat: Number(this.props.lat),
              lng: Number(this.props.lng)
          }}
      >
          <Marker
              position={{
                  lat: Number(this.props.lat),
                  lng: Number(this.props.lng)
              }}
              onClick={this.props.onMarkerClick}
          >
              {
                  <InfoWindow>
                      <h3>
                          <b>{this.props.venue_name}</b>
                      </h3>
                  </InfoWindow>
              }
          </Marker>
      </GoogleMap>
    ));
      return <ConcertLocationMap lng={this.props.lng} lat={this.props.lat} venue_name={this.props.venue_name} isMarkerShown={true}/>;
    }
  }
export {ArtistForm,GoogleLocationChooser,TagForm};
