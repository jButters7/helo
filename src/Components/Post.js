import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Post.css';


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
      <div className='post-container'>

        <div className='header'>
          <h2>{title}</h2>
          <div className='author-delete'>
            <img className='author-img' src={authorPicture} alt={author} />
            <p>By {author} </p>
            {this.state.authorId === this.props.id ?
              <button onClick={() => this.deletePost()}>Delete Post</button> :
              null}
          </div>
        </div>

        <div className='post-contents'>
          <img className='post-img' src={img} alt={title} />
          <p className='content'>{content}</p>
        </div>

      </div>
    )
  }
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Post);