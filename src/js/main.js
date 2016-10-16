import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

const initialState = {
  posts: [
    {
      postText: "Default Post 1",
      postAuthor: "Kunal"
    },
    {
      postText: "Default Post 2",
      postAuthor: "Surabhi"
    }
  ]
}

// the main reducer of our app
function blogApp (state = initialState, action){
  if(action.type === "ADD_POST"){
    return Object.assign({},state,
      {
        posts: [
          ...state.posts,
          {
            postText: action.postText,
            postAuthor: action.postAuthor
          }
        ]
      }
    )
  }
  return state;
}

//the main store which stores all the states of application
let store = createStore(blogApp);

//add post action
function addPost (post){
  return {
    type:"ADD_POST",
    postText: post.postText,
    postAuthor: post.postAuthor
  }
}
const boundAddPost = (post) => store.dispatch(addPost({postText: post.postText, postAuthor: post.postAuthor}));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

const Post = (props) => (
  <div className="post">
    {props.postText}
    <br />
    Author: {props.postAuthor}
  </div>
);

class PostList extends React.Component{
  constructor(props){
    super(props);
    this.createPosts = this.createPosts.bind(this);
  }
  createPosts(){
    return this.props.posts.map((post) => {
      return(
        <div>
          Post: {post.postText}
        <br />
          Author: {post.postAuthor}
        </div>
      );
    });
  }
  render(){
    return(
      <div>
        {this.createPosts()}
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}
const PostListContainer = connect(mapStateToProps)(PostList);

const ContentEditor = (props) => {
  let postTextInput, postAuthorInput
  return(
    <div className="contentEditor">
      Blog Post:
      <br />
      <textarea ref = { (node) => {postTextInput = node} }></textarea>
      <br /><br />
      Author Name:
      <br />
      <input ref = { (node) => {postAuthorInput = node} }></input>
      <br /><br />
      
      <button onClick = {() => {
        boundAddPost({postText: postTextInput.value, postAuthor: postAuthorInput.value})
        postTextInput.value = ''
        postAuthorInput.value = ''
      }}> 
      Submit Post 
      </button>

    </div> 
  )
}

class BlogMainContent extends React.Component{
  constructor (props){
    super(props);
  }
  
  render(){
    return(
      <div>
        <PostListContainer />
        <ContentEditor />
      </div>
    );
  }
}
 
ReactDOM.render(
  <Provider store={store}>
    <BlogMainContent />
  </Provider>, 
  document.getElementById('blogMainContent')
);