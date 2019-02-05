import React from 'react'

const CommentForm = props => {
  return (
    <form onSubmit={props.submitComment}>
      <input
        type="text"
        name="author"
        placeholder="Your name..."
        value={props.author}
        onChange={props.handleChangeText}
      />
      <input
        type="text"
        name="text"
        placeholder="Say something..."
        value={props.text}
        onChange={props.handleChangeText}
      />
      <button type="submit" >Submit</button>
    </form>
  )
}

export default CommentForm;
