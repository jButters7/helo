import React, { Component } from 'react'

class Post extends Component {

  render() {
    const { title, img, content, username } = this.props.data;
    return (
      <div>
        <h2>{title}</h2>
        <p>Username: {username}</p>
        <img src={img} alt={title} />
        <p>Content: {content}</p>
      </div>
    )
  }
};

export default Post;