import React, { Component } from 'react'

class Post extends Component {

  render() {
    const { title, img, content } = this.props.data;
    return (
      <div>
        <div>Title: {title}</div>
        <img src={img} alt={title} />
        <p>Content: {content}</p>
      </div>
    )
  }
};

export default Post;