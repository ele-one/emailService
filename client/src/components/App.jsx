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

  // componentDidMount() {
  //   $.ajax({
  //     url: '/monitor',
  //     success: (data) => {
  //       this.setState({
  //         services: JSON.parse(data)
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }



// Check if user can have multiple subscription with phone and email


  handleSubmit(e) {
    debugger
    //
    this.setState({
      submitted: true //set to display or remove form accordingly.
    })

    $.ajax({
      url: '/subscribe',
      method: 'POST',
      data: {phone: this.state.phone, email: this.state.email},
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
    console.log(this.state.email, this.state.phone);

    event.preventDefault();
  }


  handleToggle(e) {
    if (e.target.checked === false) {
      this.setState({
        toggle: false
      });
    }

    if (e.target.checked === true) {
       this.setState({
        toggle: true
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

    subscribeToggle = <SubscribeToggle handleToggle={this.handleToggle}/>

    if (this.state.toggle === true && this.state.submitted === false) {
      subscribeForm = <SubscribeForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
    } else {
      subscribeForm = null
    }


    return (<div>
      {subscribeToggle}
      {subscribeForm}
      {this.state.result}
    </div>)
  }
}

export default App





