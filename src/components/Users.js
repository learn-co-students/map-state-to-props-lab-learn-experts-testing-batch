import React, { Component } from 'react';
import { connect } from 'react-redux'

export class Users extends Component {
  render(){
    const {users} = this.props;
    return(
        <div>
          <ul>
            {users.map((user, index) => {
              return <li key={index}>{user.userName}</li>
            })}
          </ul>
        </div>
    )
  }
}
function mapStateToProps(state){
  return {users: state.users, primaryUser: state.users[0]}
}
export const ConnectedUsers = connect(mapStateToProps)(Users);
