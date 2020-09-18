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
    let { postid } = this.props.match.params
    const postIdNum = Number(postid);
    console.log(this.props);
    console.log(postIdNum);
    axios.get(`/api/posts/${postIdNum}`).then(res => {
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
    console.log(this.props)
    console.log('postid', postid)
    const id = Number(postid);
    console.log('id', id)
    axios.delete(`/api/post/${id}`).then(res => {
      console.log(res.data)
    })
    this.props.history.push('/dashboard');
  }

  render() {
    const { title, img, content, author, authorPicture } = this.state;
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