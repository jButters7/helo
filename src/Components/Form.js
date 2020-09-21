import axios from 'axios';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import no_image from '../assets/no_image.jpg';
import '../Form.css';

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
      <div className='form-container'>
        <h2 className='form-title'>Add A New Post</h2>
        <input name='title' placeholder='Post Title' value={this.state.title} onChange={(e) => this.handleStateChanges(e)} />
        <img className='form-img' src={this.state.img ? this.state.img : no_image} alt='Current Post Display' />
        <input name='img' placeholder='Image URL' value={this.state.img} onChange={(e) => this.handleStateChanges(e)} />
        <input className='input-content' name='content' placeholder='Content' value={this.state.content} onChange={(e) => this.handleStateChanges(e)} />
        <div className='form-buttons'>
          <button onClick={() => this.addPost()}>Add Post</button>
          <button onClick={() => this.restartPost()}>Restart Post</button>
        </div>

      </div>
    )
  }
};

// const mapStateToProps = reduxState => reduxState;

export default Form;