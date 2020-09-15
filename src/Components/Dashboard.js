import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      isMyPost: true,
      posts: []
    }
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios.get('/api/posts').then(res => {
      console.log(res.data)
      this.setState({
        posts: res.data,
      })
    })
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleMyPost() {
    const { isMyPost } = this.state
    if (isMyPost) {
      this.setState({
        isMyPost: false
      })
    } else {
      this.setState({
        isMyPost: true
      })
    }
    console.log(this.props.username, this.props.id)
  }

  searchPosts = () => {
    const { isMyPost, search } = this.state
    console.log("search", search)
    if (isMyPost) {
      console.log('hit999')
      axios.get(`/api/searchAllPosts`, { search }).then(res => {
        console.log(res.data)
        this.setState({
          posts: res.data,
        })
      })
        .catch(err => console.log(err.message))
    }
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <input type='text' placeholder='Search Posts' onChange={e => this.handleChange(e)} />
        <button onClick={() => this.searchPosts()}>Search</button>
        <input type='checkbox' defaultChecked onClick={() => this.handleMyPost()} />
        My Post
        <div>
          {this.state.posts.map(element => {
            return <Post key={element.id} data={element} />
          })}
        </div>
      </div>
    )
  }
};
const mapStateToProps = reduxState => {
  return reduxState
}

export default connect(mapStateToProps)(Dashboard);