import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      userPosts: true,
      posts: []
    }
  }

  componentDidMount() {
    this.getPosts();
  }


  setSearchState(e) {
    this.setState({
      search: e.target.value
    })
  }

  setUserPostsState() {
    const { userPosts } = this.state;
    this.setState({
      userPosts: !userPosts
    })
    // console.log(this.props.username, this.props.id)
  }

  getPosts = () => {
    axios.get('/api/posts').then(res => {
      // console.log('getPosts', res.data)
      this.setState({
        posts: res.data,
      })
    })
  }


  searchPosts = () => {
    const { userPosts, search } = this.state;
    const { id } = this.props;
    console.log("search", search)
    axios.get(`/api/posts/${search}/${id}/${userPosts}`).then(res => {
      console.log(res.data)
      this.setState({
        posts: res.data,
      })
    }).catch(err => console.log(err.message))

  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <input type='text' placeholder='Search Posts' onChange={e => this.setSearchState(e)} />
        <button onClick={() => this.searchPosts()}>Search</button>
        <input type='checkbox' defaultChecked onClick={() => this.setUserPostsState()} />
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