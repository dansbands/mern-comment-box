import React from 'react';
import Comment from './Comment';

const CommentList = (props) => {
  // console.log('CommentList', props.data);
  const commentNodes = props.data.map(comment => {
      return (
        <Comment
          author={comment.author}
          key={comment._id}
          id={comment._id}
          timestamp={comment.updatedAt}
          handleUpdateComment={props.handleUpdateComment}
          handleDeleteComment={props.handleDeleteComment}
          >
          {comment.text}
        </Comment>
      )
    })

  return (
    <div>
      { commentNodes }
    </div>
  )
}

export default CommentList;
