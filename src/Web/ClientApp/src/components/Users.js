import React, { Component } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import '../custom.css'; // Ensure your custom styles are applied

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      reloadUsers: false
    };
  }

  handleEdit = (user) => {
    this.setState({ selectedUser: user });
  }

  handleSave = () => {
    this.setState({ selectedUser: null, reloadUsers: !this.state.reloadUsers });
  }

  render() {
    return (
      <div>
        <h1>My Team</h1>
        <UserForm selectedUser={this.state.selectedUser} onSave={this.handleSave} />
        <UserList onEdit={this.handleEdit} reload={this.state.reloadUsers} />
      </div>
    );
  }
}

export default Users;
