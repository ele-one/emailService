import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SubscribeToggle from './SubscribeToggle.jsx';
import SubscribeForm from './SubscribeForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      toggle: false,
      phone: '',
      email: '',
      submitted: false,
      result: ''
    }
  }


  componentDidMount() {
    $.ajax({
      url: '/getLoggedInUserID',
      success: (userID) => {
        this.setState({
          userID: userID
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
// Check if user can have multiple subscription with phone and email

  handleSubmit(e) {

    e.preventDefault();
    this.setState({
      submitted: true //set to display or remove form accordingly.
    })

    var sessionID = document.cookie.split(' eleOne-brownies=')[1].split('.')[0].substring(4)
    $.ajax({
      url: '/saveSubscriber',
      method: 'POST',
      data: {sessionID: sessionID, phone: this.state.phone, email: this.state.email},
      success: (data) => {
        this.setState({
          result: 'Success'
        })
      },
      error: (err) => {
        this.setState({
          result: 'Failed'
        })
      }
    })


  }


  handleToggle(e) {
    if (e.target.checked === false) {
      this.setState({
        toggle: false,
        result: ''
      });
    }

    if (e.target.checked === true) {
       this.setState({
        toggle: true,
        submitted: false
      });
    }

  }

  handleChange(e) {
    if (e.target.id === 'email') {
      this.setState({
        email: e.target.value
      })
    }

    if (e.target.id === 'phone') {
      this.setState({
        phone: e.target.value
      })
    }
  }

  render() {
    var subscribeForm;
    var subscribeToggle;
    var logo = <img src="https://localhost:7777/brownlogo.png" height="200" width="400"/>
    subscribeToggle = <SubscribeToggle handleToggle={this.handleToggle}/>

    if (this.state.toggle === true && this.state.submitted === false) {
      subscribeForm = <SubscribeForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} phone={this.state.phone} email={this.state.email} />
    } else {
      subscribeForm = null
    }


    return (<div>
      {logo}
      {subscribeToggle}
      {subscribeForm}
      {this.state.result}
    </div>)
  }
}


export default App


