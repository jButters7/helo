import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../ducks/reducer';
import axios from 'axios';
import './nav.css';
import home_logo from '../assets/home_logo.png';
import new_logo from '../assets/new_logo.png';
import shut_down from '../assets/shut_down.png';

class Nav extends Component {

  //this function passes the users information up to the reducer. 
  async componentDidMount() {
    const currentUser = await axios.get('/api/auth/me')
    this.props.loginUser(currentUser.data.username, currentUser.data.id, currentUser.data.profile_pic)
  }

  async logout() {
    await axios.delete('/auth/logout')
    this.props.logoutUser();
  }

  render() {
    //checks to see if there is a user. Then renders the Nav if there is. 
    if (this.props.id) {
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

export default connect(mapStateToProps, { loginUser, logoutUser })(Nav);