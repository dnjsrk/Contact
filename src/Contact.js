import React, { Component } from 'react';
 
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import ContactCreate from './ContactCreate';
 
class Contact extends Component {
  state = {
    keyword : '',
    selectedKey: -1,
    contactData : [{
      name : 'David',
      phone : '010-1234-5678'
    }, {
      name : 'Albert',
      phone : '010-1234-1234'
    }, {
      name : 'John',
      phone : '010-5678-5678'
    }, {
      name : 'Wade',
      phone : '010-4312-5678'
    },]
  }
  _searchContact = (e) => {
    this.setState({
      keyword : e.target.value
    });
  }
  _nameClick = (key) => {
    this.setState({
      selectedKey : key
    });
  }
  _contactCreate = (contactObj) => {
    this.setState({...this.state,
      contactData:[...this.state.contactData, contactObj]
    });
  }
  _contactRemove = () => {
    if(this.state.selectedKey===-1){
      return
    }
    let before = this.state.contactData.slice(0, this.state.selectedKey);
    let after = this.state.contactData.slice(this.state.selectedKey+1);
    let removedArr = [...before, ...after];
    this.setState({...this.state,
      contactData:removedArr
    })
  }
  _contactEdit = (editData) => {
    let before = this.state.contactData.slice(0, this.state.selectedKey);
    let after = this.state.contactData.slice(this.state.selectedKey+1);
    let newArr = [...before, editData ,...after];
    console.log(newArr)
    this.setState({...this.state,
      contactData:newArr
    })
  }
  
  componentWillMount(){
    const contactData = localStorage.contactData;
    if(contactData){
      this.setState({
        contactData:JSON.parse(contactData)
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)){
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }
  render(){
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase()
          .indexOf(this.state.keyword.toLowerCase()) > -1;
        }
      );
      return data.map(
        (contact, i) => {
          return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={()=>this._nameClick(i)}
                 />);
        }
      );
    }
    return(
      <div>
        <h1>Contact</h1>
        <input
          name="keyword"
          placeholder="Search"
          onChange={this._searchContact}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetail
          isSelected = {this.state.selectedKey != -1}
          contact = {this.state.contactData[this.state.selectedKey]}
          onRemove = {this._contactRemove}
          onEdit = {this._contactEdit}
        />
        <ContactCreate
          onCreate={this._contactCreate}
        />
      </div>
    )
  }
}
 
export default Contact;
