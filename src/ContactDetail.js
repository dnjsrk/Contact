import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
export default class ContactDetail extends Component {
    state = {
      isEdit:false,
      name:'',
      phone:''
    }
    _editFunc = () => {
      this.props.onEdit({name:this.state.name, phone:this.state.phone});
    }
    _editButtonToggle = () => {
      if(this.state.isEdit===false){
        this.setState({
          name:this.props.contact.name,
          phone:this.props.contact.phone
        })
      }else{
        this._editFunc();
      }
      this.setState({
        isEdit: !this.state.isEdit
      });
    }
    _inputChange = (e) => {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
      console.log(this.state);
    }
    _handleKeyPress = (e) => {
      if(e.charCode === 13){
        this._editButtonToggle();
      }
    }
    render() {
      const details = (<div>
                          <p>{this.props.contact.name}</p>
                          <p>{this.props.contact.phone}</p>
                       </div>);
      const blank = (<div>Not selected</div>);
      const edit = (<div>
                      <p>
                        <input
                          name="name"
                          type="text"
                          placeholder="name"
                          onChange={this._inputChange}
                          value={this.state.name}
                        />
                        <input
                          name="phone"
                          type="text"
                          placeholder="phone"
                          onChange={this._inputChange}
                          value={this.state.phone}
                        />
                      </p>
                    </div>);
      const view = this.state.isEdit? edit:details;
      return (
        <div>
          <h2>Detail information</h2>
          {this.props.isSelected ? view:blank}
          <p>
            <button onClick={this._editButtonToggle}>
              {this.state.isEdit? 'Ok':'edit'}
            </button>
            <button onClick={this.props.onRemove}>remove</button>
          </p>
        </div>
      );
    }
}
 
ContactDetail.defaultProps = {
  isSelected : false,
  contact : {
    name : '',
    phone : ''
  },
  onRemove: ()=>{
    console.log('there is onRemove function');
  }
}
 
ContactDetail.propTypes = {
  isSelected : PropTypes.bool.isRequired,
  contact : PropTypes.object.isRequired,
  onRemove : PropTypes.func.isRequired
};
