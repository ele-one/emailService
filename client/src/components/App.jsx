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
    this.callSnsSubscribe = this.callSnsSubscribe.bind(this);
    this.callSaveSubscriber = this.callSaveSubscriber.bind(this);
    this.readSubscriber = this.readSubscriber.bind(this);


    this.state = {
      toggle: false,
      phone: '',
      email: '',
      submitted: false,
      result: '',
      subscribed: false,

    }

    this.sessionID = document.cookie.split(' eleOne-brownies=')[1].split('.')[0].substring(4)
  }


  readSubscriber() {
    $.ajax({
      url: '/readSubscriber',
      method: 'POST',
      data: {sessionID: this.sessionID, phone: this.state.phone, email: this.state.email },
      success: (isSubscribed) => {
        if (isSubscribed === 'yes') {
          this.setState({
            subscribed: true
          })
        }
      },
      error: (err) => {
       console.log(err)
      }
    });
  }

  callSnsSubscribe() {
    $.ajax({
      url: '/snsSubscribe',
      method: 'POST',
      data: {phone: this.state.phone, email: this.state.email},
      success: (data) => {
        this.callSaveSubscriber()
      },
      error: (err) => {
        this.setState({
          result: 'Failed'
        })
      }
    })
  }


  callSaveSubscriber() {
    $.ajax({
      url: '/saveSubscriber',
      method: 'POST',
      data: {sessionID: this.sessionID, phone: this.state.phone, email: this.state.email},
      success: (data) => {
        this.setState({
          result: 'Success'
        })

        this.callSnsSubscribe()
      },
      error: (err) => {
        this.setState({
          result: 'Failed'
        })
      }
    })
  }

  handleSubmit(e) {

    e.preventDefault();
    this.setState({
      submitted: true //set to display or remove form accordingly.
    })

    this.callSaveSubscriber()

    this.readSubscriber((err, resp) => {
      console.log(err, resp)
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
        submitted: false // initially button is disabled if  email & phone are empty
      });

      this.readSubscriber()
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
    var isSubscribedMsg;

    var logo = <img src="https://localhost:7777/brownlogo.png" height="200" width="400"/>
    subscribeToggle = <SubscribeToggle handleToggle={this.handleToggle}/>

    if (this.state.toggle === true && this.state.submitted === false && !this.state.subscribed) {
      debugger
      subscribeForm = <SubscribeForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} phone={this.state.phone} email={this.state.email} />
    } if (this.state.subscribed === true ) {
      debugger
      subscribeForm = <p> You're subscribed! </p>
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


