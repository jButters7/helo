import axios from 'axios';
import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      img: '',
      content: ''
    }
  }

  handleStateChanges(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // console.log(this.props.id);

  addPost() {
    const { title, img, content } = this.state
    // const author_id = this.props.id;
    axios.post(`/api/posts/`, { title, img, content }).then(res => {
      console.log(res.data)
    })
    this.setState({
      title: '',
      img: '',
      content: ''
    })
    this.props.history.push('/dashboard');
  }

  restartPost() {
    this.setState({
      title: '',
      img: '',
      content: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Add A New Post</h2>
        <img src={this.state.img} />
        <input name='title' placeholder='Post Title' value={this.state.title} onChange={(e) => this.handleStateChanges(e)} />
        <input name='img' placeholder='Image URL' value={this.state.img} onChange={(e) => this.handleStateChanges(e)} />
        <input name='content' placeholder='Content' value={this.state.content} onChange={(e) => this.handleStateChanges(e)} />
        <button onClick={() => this.addPost()}>Add Post</button>
        <button onClick={() => this.restartPost()}>Restart Post</button>
      </div>
    )
  }
};

// const mapStateToProps = reduxState => reduxState;

export default Form;