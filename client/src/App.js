import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import './CommentBox.css';

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      data: []
    };
  }


  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
  // console.log('submitting');
    this.setState({
      data: [
        ...this.state.data,
        this.state.value
      ],
      value: ''
    })
  }

  render() {
    // console.log('App', this.state);
    return(
      <div className="container">
        <div className="form">
          <CommentForm
            value={this.state.value}
            change={this.handleChange}
            submit={this.handleSubmit}/>
        </div>
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default CommentBox;
