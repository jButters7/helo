import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../ducks/reducer';
import axios from 'axios';

class Nav extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    axios.get('/api/auth/me').then(res => {
      console.log(res.data)
      this.props.loginUser(res.data.username, res.data.id, res.data.profile_pic)
    })
  }

  logout() {
    axios.delete('/auth/logout').then(() => {
      this.getCurrentUser()
      // this.props.history.push('/');
    })
  }

  render() {

    return (
      <div>
        {console.log(this.props)}
        <p>{this.props.username ? this.props.username : null}</p>
        <img src={this.props.profile_pic} alt={this.props.username} />
        <Link to='/dashboard'>Home</Link>
        <Link to='/new'>New Post</Link>
        <Link to='/' onClick={() => this.logout()}>Logout</Link>
        <button onClick={() => this.getCurrentUser()}>Run Command</button>
      </div>
    )

  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { loginUser })(Nav);