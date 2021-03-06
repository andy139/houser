import React from 'react';
import {connect} from 'react-redux';
import MarkerManager from "../../util/marker_manager"
import {withRouter, Link} from "react-router-dom";
import PropertyIndexItem from "../property/property_index_item"
import $ from 'jquery';
import { asArray } from '../../reducers/selectors';


const mSTP = (state) => {
    debugger
    return {
  
        filters: state.entities.filters,
        properties: asArray(state.entities),
        loading: state.ui.loading,
      
    }

}

const mDTP = (dispatch) => {
    return {


    }

}

class SearchMap extends React.Component {
    
  
    constructor(props){
        super(props);

        this.bounds = new google.maps.LatLngBounds();
        this.renderMap = this.renderMap.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    handleMarkerClick(property) {
         
        this.props.history.push(`/property/${property.id}`)
    }


    componentDidMount() {

        this.renderMap()



    }

    componentDidUpdate(prevProps) {
         
        // this.MarkerManager.updateMarkers(this.props.properties);
        // if (prevProps.filters !== this.props.filters) {
             
        //     this.renderMap();
        // }

        if (prevProps.properties !== this.props.properties) {

            this.renderMap();
        }
    }


    renderMap() {

        let bounds = new google.maps.LatLngBounds();

        const mapOptions = {
            center: {
                lat: 59.3293,
                lng: 18.0686, 
            },
            zoom: 13.2,
        }

        let locations = this.props.properties
        debugger
        this.map = new google.maps.Map(this.mapNode, mapOptions)

        if(locations.length > 0){
            let i = 0;
            for (i = 0; i < locations.length; i++) {

                let property = locations[i];
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                    map: this.map,
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                });
                bounds.extend(marker.position);
                marker.addListener('click', () => this.handleMarkerClick(property))

            }
            this.map.fitBounds(bounds);
        }
       
    }


    

    render() {

        
        let {indexLoading} = this.props.loading

        const mapLoader = (
            <div className="map-loader">
                <img src="https://stockhome-app-seeds.s3-us-west-1.amazonaws.com/Pulse-1s-177px.gif"></img>
            </div>
        )


      
        return (

               <div>
                   
                    <div id="search-map-container" ref={map => this.mapNode = map}>
                       
                    </div>
               </div>

        )
      }

}


export default connect(mSTP, mDTP)(withRouter(SearchMap));