import React from 'react';
// import $ from 'jquery';

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <label className="switch">
      <input type="checkbox" onClick={this.props.handleToggle} />
      <span className="slider round"></span>
    </label>
    )
  }
}

export default Subscribe


