import React from 'react';
import PropertyIndexItem from './property_index_item'
import {Link} from 'react-router-dom';

import Submenu from '../submenu/submenu'

class PropertyIndex extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
         
        this.props.fetchProperties();
    }

    render(){
        if (!this.props.properties) return null;

        const properties = this.props.properties.map( property => (
            <PropertyIndexItem key={property.id} property={property}/>
        ))

        return(
            <div className="property-marketplace-container">
                <div className ="submenu-full-length">
                   
                    <Submenu></Submenu>
                </div>

                <div className="searchbar-container">
                    Searchbar TBD
                </div>
                <div className= "property-index-container">
                    {properties}
                </div>

            </div>
        )
    }

}



export default PropertyIndex;