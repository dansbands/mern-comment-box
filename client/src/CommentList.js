import React from 'react';
import Comment from './Comment';

const CommentList = (props) => {
  console.log('CommentList', props);

  const renderComments = () => {
    return props.data.map((comment, idx ) => {
      return <Comment data={comment} key={idx} />
    })
  }

  return (
    <ul>
      {renderComments()}
    </ul>
  )
}

export default CommentList;
