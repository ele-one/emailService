import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
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

  render () {
    return (<div>
      <h1>Item List</h1>
    </div>)
  }
}

export default App