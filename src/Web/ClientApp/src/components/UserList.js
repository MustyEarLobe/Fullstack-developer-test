import React, { Component } from 'react';
import axios from 'axios';

export class UserList extends Component {
  static displayName = UserList.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  static renderUsersTable(users, onEdit, onDelete) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : UserList.renderUsersTable(this.state.users, this.props.onEdit, this.handleDelete);

    return (
      <div>
        <h1 id="tableLabel">Team Members</h1>
        {contents}
      </div>
    );
  }

  async fetchUsers() {
    const response = await axios.get('/api/users');
    this.setState({ users: response.data, loading: false });
  }

  handleDelete = async (id) => {
    await axios.delete(`/api/users/${id}`);
    this.fetchUsers();
  }
}

export default UserList;
