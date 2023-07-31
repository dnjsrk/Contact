import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
export default class ContactCreate extends Component {
  state = {
    name:"",
    phone:""
  }
  _inputChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(this.state);
  }
  _buttonClick = () => {
    const newContact = {
      name : this.state.name,
      phone : this.state.phone
    };
    this.props.onCreate(newContact);
    this.setState({
      name:'',
      phone:''
    });
  }
  _handleKeyPress = (e) => {
    if(e.charCode === 13){
    this._buttonClick();
    }
  }
  render() {
    return (
        <div>
          <h2>Create new user</h2>
          <p>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={this._inputChange}
              value={this.state.name}
            />
            <input
              type="text"
              name="phone"
              placeholder="phone"
              onChange={this._inputChange}
              value={this.state.phone}
            />
          </p>
          <button onClick={this._buttonClick}>Create new user</button>
        </div>
    );
  }
}
 
ContactCreate.defaultProps = {
  onCreate: () => { console.error('error') }
};
 
ContactCreate.propTypes = {
  onCreate : PropTypes.func
};