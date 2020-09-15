import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <Link to='/dashboard'>Home</Link>
      <Link to='/new'>New Post</Link>
      <Link to='/'>Logout</Link>
    </div>
  )
}

export default Nav