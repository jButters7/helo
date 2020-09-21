import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../ducks/reducer';
import '../Auth.css';
import helo_logo from '../assets/helo_logo.png';


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
      this.props.loginUser(res.data.username, res.data.id, res.data.profile_pic)
      this.props.history.push('/dashboard');
    })
      .catch((err) => {
        alert(err.message);
      })
  }

  loginUser() {
    const { username, password } = this.state;
    axios.post('/auth/login', { username, password }).then(res => {
      if (res.data.id) {
        this.props.loginUser(res.data.username, res.data.id, res.data.profile_pic)
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/');
      }
    })
      .catch(err => {
        alert(err.message);
      })
  }

  render() {
    return (
      <div className='login-container'>
        <img className='logo' src={helo_logo} alt='Logo' />
        <h1 className="text-logo">Helo</h1>
        <div className='login-inputs'>
          <input placeholder='Username' name='username' onChange={e => this.handleChange(e)} />
        </div>
        <div className='login-inputs'>
          <input placeholder='Password' name='password' onChange={e => this.handleChange(e)} />
        </div>
        <div className='login-buttons-container'>
          <button className='login-button' onClick={() => this.loginUser()}>Login</button>
          <button className='login-button' onClick={() => this.registerUser()}>Register</button>
        </div>
      </div>
    )
  }
};

export default connect(null, { loginUser })(Auth);