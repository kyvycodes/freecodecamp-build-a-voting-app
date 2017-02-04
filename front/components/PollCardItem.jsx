import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class PollCardItem extends React.Component {
  constructor(props) {
    	super(props);
    	this.state = {
    		withNew: false,
    		newOption: ""
    	};
	}
  
	handleVoteNewOption(e) {
		if (!this.state.newOption.length) {
			return;
		}
	    this.props.onVote(
	    	this.props.poll, 
	    	{
	    		new_opt: this.state.newOption
	    	}
    	);
    	this.setState({withNew: false, newOption: ""});
	}
	handleNewOption() {
		this.setState({withNew: true});
	}
	handleNewOptionChange(e) {
    	this.setState({newOption: e.target.value});
	}
  
	render() {
		let props = this.props;
	    let poll = props.poll;
	    let baseUrl = window.location.protocol + "//" + window.location.hostname;
		let options = poll.options.map(option => {
			let btnClass = "btn btn-outline-primary";
			if(option.voted_by) {
				btnClass += " active";
			}
			return (<button 
				key={poll._id + option._id}
				type="button" 
				className={btnClass}
				onClick={e => props.onVote(poll, {id: option._id})}
				>
				{option.name} | {option.votes_count} 
		      </button>);
		});
		let pollUrl = baseUrl +"/polls/" + poll._id;

		let twitterShare = "https://twitter.com/intent/tweet?&text=vote '" + poll.name + "' at " + pollUrl;
		
		return (
		<div className="card mb-3">
			<div className="card-block">
				<div className="row">
					<div className="col-sm-10">
						<h3 className="card-title">{poll.name}</h3>
						<div className="poll-options">
							{options}
						</div>
						{!poll.voted_by && props.isLoggedIn ? <button className="btn btn-link" onClick={this.handleNewOption.bind(this)}>I'd like a custom option</button> : ""}
						{!poll.voted_by && props.isLoggedIn && this.state.withNew ?<div className="input-group mb-2 mr-sm-2">
		        	       <input type="text" className="form-control" placeholder="new option" value={this.state.newOption} onChange={this.handleNewOptionChange.bind(this)} />
		        		   <div className="input-group-addon" onClick={this.handleVoteNewOption.bind(this)}>vote</div>
		        		</div> :""}
					</div>
					<div className="col-sm-2">
						<small className="text-muted">Votes:</small>
						<h3 className="poll-votes">{poll.votes_count}</h3>
					</div>
				</div>
			</div>
			<div className="card-footer">
		      <small className="text-muted">{moment(poll.created).fromNow()}</small>
		      {" "}
		      {props.pollLink ?<Link
		    	key={poll._id} 
		    	to={`/polls/${poll._id}`} 
		    	className="card-link" 
		    	activeClassName="active"
	    		>
		    	details
		      </Link>:""}
			  <a className="card-link" target="_blank" href={twitterShare}>
				share on twitter
			  </a>
		    </div>
		</div>
		);
	}
}
