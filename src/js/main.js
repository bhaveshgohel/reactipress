import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

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

const PostList = (props) => (
  <div className="postList">
  </div>
);

const ContentEditor = (props) => (
    <div className="contentEditor">
      Blog Post:
      <br />
      <textarea></textarea>
      <br /><br />
      Author Name:
      <br />
      <input></input>
      <br /><br />
      
      <button onClick = {() => boundAddPost({postText: "New Blog Post", postAuthor: "Ann"})}> Submit Post </button>
    </div> 
  );

class BlogMainContent extends React.Component{
  constructor (props){
    super(props);
  }
  
  render(){
    return(
      <div>
        <PostList />
        <ContentEditor />
      </div>
    );
  }
}
 
ReactDOM.render(
  <BlogMainContent />, 
  document.getElementById('blogMainContent')
);