import React from 'react';
import ReactDOM from 'react-dom';

var posts = [
  {
    postText: "This is Demo Post 1",
    postAuthor: "Kunal"
  },
  {
    postText: "This is Demo Post 2",
    postAuthor: "Surabhi"
  }
];

const Post = (props) => (
  <div className="post">
    {props.postText}
    <br />
    Author: {props.postAuthor}
  </div>
);

const PostList = (props) => (
  <div className="postList">
  {
    props.blogPosts.map((currPost) => (
      <Post postText = {currPost.postText} postAuthor = {currPost.postAuthor}></Post>
    ))
  }
  </div>
);

const ContentEditor = (props) => (
  <div className="contentEditor">
    Blog Post:
    <br />
    <textarea onChange = {props.handleNewPostChange}></textarea>
    <br /><br />
    Author Name:
    <br />
    <input onChange = {props.handleAuthorChange}></input>
    <br /><br />
    <button onClick={props.handleSubmitPostClick}> Submit Post </button>
  </div>
);

class BlogMainContent extends React.Component{
  constructor (props){
    super(props);

    //bind Click event function of Submit Post button
    this.handleSubmitPostClick = this.handleSubmitPostClick.bind(this);

    //bind onChange event function of Post TextArea
    this.handleNewPostChange = this.handleNewPostChange.bind(this); 

    //bind onChange event function of Author input
    this.handleAuthorChange = this.handleAuthorChange.bind(this); 
  }
  handleSubmitPostClick(event){
    posts.push({
      postText: this.state.newPostText,
      postAuthor: this.state.authorName
    });
    this.setState({
      newPostText:""
    });
  }
  handleNewPostChange(event){
    this.setState({
      newPostText: event.target.value,
      value: event.target.value
    });
  }
  handleAuthorChange(event){
    this.setState({
      authorName: event.target.value
    });
  }
  
  render(){
    return(
      <div>
        <PostList blogPosts={this.props.blogPosts}
        />
        <ContentEditor 
          handleSubmitPostClick = {this.handleSubmitPostClick}
          handleNewPostChange = {this.handleNewPostChange}
          handleAuthorChange = {this.handleAuthorChange}
          value = ""
        />
      </div>
    );
  }
}
 
ReactDOM.render(
  <BlogMainContent blogPosts={posts}/>, 
  document.getElementById('blogMainContent')
);