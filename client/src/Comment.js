import React from 'react'

class Comment extends React.Component {
  render () {
    console.log('Comment', this.props);
    return (
      <li>{this.props.data}</li>
    )
  }
}

export default Comment;
