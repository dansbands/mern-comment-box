import React from 'react'
import ReactMarkdown from 'react-markdown';
import moment from 'moment'

const Comment = props => (
  <div className="singleComment">
    <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`} />
    <div className="textContent">
      <div className="singleCommentContent">
        <h3>{props.author}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleCommentButtons">
        <span className="time">{moment(props.timestamp).fromNow()}</span>
        <a onClick={() => props.handleUpdateComment(props.id)}>update</a>
        <a onClick={() => props.handleDeleteComment(props.id)}>delete</a>
      </div>
    </div>
  </div>
);

export default Comment;
