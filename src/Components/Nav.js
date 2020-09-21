import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../ducks/reducer';
import axios from 'axios';
import './nav.css';
import home_logo from '../assets/home_logo.png';
import new_logo from '../assets/new_logo.png';
import shut_down from '../assets/shut_down.png';

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      userIdOnSession: null
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    axios.get('/api/auth/me').then(res => {
      console.log(res.data)
      this.setState({
        userIdOnSession: res.data.id
      })
      this.props.loginUser(res.data.username, res.data.id, res.data.profile_pic)
    })
  }

  logout() {
    axios.delete('/auth/logout').then(() => {
      this.getCurrentUser()
      //this causes the nav bar to de-render when user logs out.
      this.setState({
        userIdOnSession: null
      })
    })
  }

  render() {
    const { userIdOnSession } = this.state
    // console.log(userIdOnSession)
    if (userIdOnSession) {
      return (
        <div className='Nav'>
          <img className='profile-image' src={this.props.profile_pic ? this.props.profile_pic : `https://robohash.org/${this.props.username}.png`} alt={this.props.username} />
          <Link to='/dashboard'><img className='nav_img' src={home_logo} alt='Home Icon' /></Link>
          <Link to='/new'><img className='nav_img' src={new_logo} alt='New Post Icon' /></Link>
          <Link to='/' onClick={() => this.logout()}><img className='nav_img' src={shut_down} alt='Logout Icon' /></Link>
        </div >
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { loginUser })(Nav);