import React, { Component } from 'react';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import DATA from './data';
import './css/CommentBox.css';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      author: '',
      text: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      this.pollInterval = clearInterval(this.pollInterval)
      this.pollInterval = null;
    }
  }

  loadCommentsFromServer = () => {
    fetch('/api/comments/')
      .then(data => data.json())
      .then(res => {
        if(!res.success) this.setState({ error: res.error })
        else this.setState({ data: res.data })
      });
  }

  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitComment = e => {
    e.preventDefault()
    const { author, text } = this.state;
    if(!author || !text) return;
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    }).then(res => res.json()
      .then(res => {
        if(!res.success) this.setState({ error: res.error.message || res.error });
        else this.setState({ author: '', text: '', error: null })
      }))
  }

  render() {
    console.log('CB', this.state);
    return(
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList data={this.state.data} />
        </div>
        <div className="form">
          <CommentForm
            author={this.state.author}
            text={this.state.text}
            handleChangeText={this.onChangeText}
            handleSubmit={this.submitComment}
            />
        </div>
      </div>
    )
  }
}

export default CommentBox;
