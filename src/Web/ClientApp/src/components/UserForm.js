import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, onSave }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.id) {
      await axios.put(`/api/users/${user.id}`, user);
    } else {
      await axios.post('/api/users', user);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phoneNumber"
        value={user.phoneNumber}
        onChange={handleChange}
        placeholder="Mobile Number (Optional)"
        pattern="\d{10,}"
        title="Please enter at least 10 digits"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
