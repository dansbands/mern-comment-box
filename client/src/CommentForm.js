import React from 'react'

class CommentForm extends React.Component {
  state = {
    value: '',
    messages: []
  }


  render () {
    return (
      <form onSubmit={this.props.submit}>
        <input type="text" value={this.props.value} onChange={this.props.change}></input>
        <input type="submit" ></input>
      </form>
    )
  }
}

export default CommentForm;
