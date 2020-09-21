import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Dashboard.css';
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

  async componentDidMount() {
    if (!this.props.id) {
      return this.props.history.push('/')
    }
    const asyncResponse = await axios.get('/api/auth/me')
    if (typeof asyncResponse.data.id === typeof 1) {
      return this.getPosts();
    } else {
      return this.props.history.push('/')
    }
  }

  getPosts = () => {
    axios.get('/api/posts/').then(res => {
      this.setState({
        posts: res.data,
        search: ''
      });
    });
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
              <Link to={{ pathname: `/post/${element.id}` }} className="post-link" key={element.id}>
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

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);