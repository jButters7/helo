import React, { Component } from 'react';
import axios from 'axios';

class Auth extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  registerUser() {
    const { username, password } = this.state;
    axios.post('/auth/register', { username, password }).then(res => {
      this.props.history.push('/dashboard');
    })
      .catch((err) => {
        alert(err.message);
      })
  }

  loginUser() {
    const { username, password } = this.state;
    axios.post('/auth/login', { username, password }).then(res => {
      this.props.history.push('/dashboard');
    })
      .catch(err => {
        alert(err.message);
      })
  }

  render() {
    return (
      <div>
        <input placeholder='Username' name='username' onChange={e => this.handleChange(e)} />
        <input placeholder='Password' name='password' onChange={e => this.handleChange(e)} />
        <button onClick={() => this.loginUser()}>Login</button>
        <button onClick={() => this.registerUser()}>Register</button>
      </div>
    )
  }
};

export default Auth;