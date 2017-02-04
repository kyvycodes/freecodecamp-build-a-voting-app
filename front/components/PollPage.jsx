import React from 'react';
import PollCardItem from './PollCardItem.jsx';
import PollChart from './PollChart.jsx';
import NavLogged from './NavLogged.jsx';
import { Link } from 'react-router';
import polls from './../services/polls.js';
import users from './../services/users.js';

export default class PollPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      user: null,
      loading: true,
    };
  }
  firstLoad() {
    users.myProfile().then(user => {
      this.setState({user: user});
      this.loadPoll();
    }).catch(() => {
      this.setState({user: null});
      this.loadPoll();
    });
  }
  loadPoll() {
    let id = this.props.params.id;
    polls.findOne(id).then(result => {
      this.setState({poll: result, loading: false})
    }).catch(err => {
      this.setState({loading: false});
      window.alert(err);
    });
  }
  componentDidMount() {
    this.firstLoad();
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
    let isLoggedIn = this.state.user && this.state.user.username;
    let maxWidth = window.innerWidth;
    let poll = this.state.poll;
    let hasPoll = poll && poll._id && poll.options;
    return (
      <div className="poll-page">
      {isLoggedIn ? <NavLogged user={this.state.user} /> : ""}
      <section className="jumbotron text-center">
    		<div className="container">
    			<h1 className="jumbotron-heading">Codex polls</h1>
    			<h3>A project for freeCodeCamp</h3>
    			<p>
    				{this.state.loading || isLoggedIn ? "" : <a href="/auth/github" className="btn btn-primary">Sign-in with github</a>}
    			</p>
    			<Link to="/" className="btn btn-primary">Back to home</Link>
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