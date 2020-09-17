import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      img: '',
      content: '',
      author: '',
      authorPicture: ''
    }
  }

  componentDidMount() {
    this.getOnePost();
  }

  getOnePost() {
    const { postid } = this.props.match.params
    axios.get(`/api/posts/${postid}`).then(res => {
      console.log(res.data)
      const { title, img, content, username, profile_pic, author_id } = res.data[0]
      this.setState({
        title: title,
        img: img,
        content: content,
        author: username,
        authorPicture: profile_pic,
        authorId: author_id
      })
    })
  }

  deletePost() {
    const { postid } = this.props.match.params
    // console.log(postid)
    axios.delete(`/api/post/${postid}`).then(res => {
      console.log(res.data)
    })
    this.props.history.push('/dashboard');
  }

  render() {
    const { title, img, content, author, authorPicture } = this.state;
    // console.log(this.state.author, this.props.id)
    return (
      <div>
        <h2>{title}</h2>
        {this.state.authorId === this.props.id ?
          <button onClick={() => this.deletePost()}>Delete Post</button> :
          null}
        <img src={img} alt={title} />
        <p>Content: {content}</p>
        <p>Author:{author} </p>
        <img src={authorPicture} alt={author} />
      </div>
    )
  }
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Post);