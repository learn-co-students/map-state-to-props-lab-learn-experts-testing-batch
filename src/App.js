import React, { Component } from 'react';
import UserInput from './components/UserInput'
import {ConnectedUsers, Users} from './components/Users'
import {connect} from 'react-redux';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <UserInput primary={this.props.users[0]}/>
        <ConnectedUsers />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {users: state.users}
}
export default connect(mapStateToProps)(App);
