import React, { Component } from 'react';
import axios from 'axios';
// import Post from './Post';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Dashboard.css';


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
    axios.get('/api/auth/me').then(res => {
      // console.log('What now?', res.data.id)
      if (res.data.id) {
        return this.getPosts();
      }
    }).catch(err => {
      console.log(err.message)
      // return this.props.history.push('/')
    }
    )
    //if there is no one on session this will cause the page to go to the login screen. 
    // this.props.history.push('/')

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
  }

  getPosts = () => {
    axios.get('/api/posts/').then(res => {
      // console.log('getPosts', res.data)
      this.setState({
        posts: res.data,
        search: ''
      });
    });
  }

  searchPosts = () => {
    const { userPosts, search } = this.state;
    axios.get(`/api/posts/${search}/${userPosts}`).then(res => {
      console.log(res.data)
      this.setState({
        posts: res.data,
      })
    }).catch(err => console.log(err.message))
  }

  render() {
    // console.log(this.state)
    return (
      <div className='dashboard-container'>

        <div className='search-container'>

          <div className='input-and-buttons'>
            <input value={this.state.search} type='text' placeholder='Search Posts' onChange={e => this.setSearchState(e)} />
            <button onClick={() => this.searchPosts()}>Search</button>
            <button onClick={() => this.getPosts()}>Reset</button>
          </div>

          <div className='my-post'><input type='checkbox' defaultChecked onClick={() => this.setUserPostsState()} />
          My Post
          </div>
        </div>

        <div className='post-container'>
          {this.state.posts.map(element => {
            return (
              <Link to={{ pathname: `/post/${element.id}` }} className="post-link">
                <div className='dash-post'>

                  <h2>{element.title}</h2>
                  <div className='author-container'>
                    <p>By {element.username}</p>
                    <img src={`https://robohash.org/${element.username}`} alt={element.username} />
                  </div>

                </div>
                {/* <Post key={element.id} data={element} /> */}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
};
// const mapStateToProps = reduxState => {
//   return reduxState
// }

export default Dashboard;