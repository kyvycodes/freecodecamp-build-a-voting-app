import React from 'react';
import PollCardItem from './PollCardItem.jsx';
import PollChart from './PollChart.jsx';
import { Link } from 'react-router';
import polls from './../services/polls.js';

export default class PollPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
    };
  }
  loadPoll() {
    let id = this.props.params.id;
    polls.findOne(id).then(result => this.setState({poll: result}));
  }
  componentDidMount() {
    this.loadPoll();
  }
  onVote(poll, optionId) {
    if(poll.voted_by) {
      return;
    }
    polls.vote(poll, optionId).then(result => {
      this.setState({poll: result});
    });
  }
  render() {
    let maxWidth = window.innerWidth;
    let poll = this.state.poll;
    let hasPoll = poll && poll._id && poll.options;
    return (
      <div className="poll-page"> 
      <section className="jumbotron text-center">
    		<div className="container">
    			<h1 className="jumbotron-heading">Codex polls</h1>
    			<h3>A project for freeCodeCamp</h3>
    			<a href="#" className="btn btn-primary">Back to home</a>
    		</div>
    	</section>
    	<div className="container">
    		<div className="row">
    			<div className="col-sm-12 offset-lg-2 col-lg-8">
    			  {hasPoll ? <PollCardItem onVote={this.onVote.bind(this)} poll={this.state.poll} /> : ""}
    			</div>
    			<div className="col-sm-12 offset-lg-2 col-lg-8">
    			  {hasPoll ? <PollChart maxWidth={maxWidth} poll={this.state.poll}/> : ""}
    			</div>
    		</div>
      </div>
      </div>
    );
  }
}