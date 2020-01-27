import React, { Component } from 'react';
import api from '../services/api';

import './Timeline.css';
import twitterLogo from '../twitter.svg';

export default class Timeline extends Component {
  constructor () {
    super();
    this.state = {
      tweets: [],
      newTweet: ''
    }
  }

  async componentDidMount () {

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post('tweets', { content, author });

    this.setState({ newTweet: "" });
  };

  handleInputChange = e => {
    this.setState({
      newTweet: e.target.value
    });
  };



  render () {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="Go Twitter" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>
        {this.state.tweets.map(tweet => (
          <h1>{tweet.content}</h1>
        ))}
      </div>
    );
  }
}