import React from 'react';
import { Button, Form } from 'semantic-ui-react'


class SubscribeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var submitButton;

    const btnStyle = {
      color: 'blue',
      background:'white'
    };

    if (this.props.phone || this.props.email) {
      submitButton = <Button type='submit' style={btnStyle} onClick={this.props.handleSubmit}>Subscribe</Button>
    }

    if (!this.props.phone && !this.props.email) {
      submitButton = <Button disabled type='submit' style={btnStyle} onClick={this.props.handleSubmit}>Subscribe</Button>
    }

    return (
      <Form unstackable>
        <Form.Group widths={2}>
          <Form.Input id='email' label='Email' placeholder='e.g. mary@yahoo.com' onChange={this.props.handleChange} />
          <Form.Input id='phone' label='Phone' placeholder='e.g. +1 408 333 4444' onChange={this.props.handleChange} />
        </Form.Group>
        {submitButton}
      </Form>
    )
  }
}

export default SubscribeForm

