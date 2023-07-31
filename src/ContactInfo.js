import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
export default class ContactInfo extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.contact.name}</div>
        );
    }
}
 
ContactInfo.defaultProps = {
  onClick: ()=>{
    console.log('there is onClick function');
  }
}
 
ContactInfo.propTypes = {
  onClick : PropTypes.func.isRequired
};
