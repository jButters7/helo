import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Nav = (props) => {
  return (
    <div>
      {/* {console.log(props)} */}
      <p>{props.username}</p>
      <img src={props.profile_pic} alt={props.username} />
      <Link to='/dashboard'>Home</Link>
      <Link to='/new'>New Post</Link>
      <Link to='/'>Logout</Link>
    </div>
  )
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Nav);