import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default props => {
    let poll = props.poll;
	let options = poll.options.map(option => {
		let btnClass = "btn btn-outline-primary";
		if(option.voted_by) {
			btnClass += " active";
		}
		return (<button 
			key={poll._id + option._id}
			type="button" 
			className={btnClass}
			onClick={e => props.onVote(poll, option._id)}
			>
			{option.name} | {option.votes_count} 
	      </button>);
	});

	return (
		<div className="card mb-3">
			<div className="card-block">
				<div className="row">
					<div className="col-sm-10">
						<h3 className="card-title">{poll.name}</h3>
						<div className="poll-options">
							{options}
						</div>
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
		    	to={`/poll/${poll._id}`} 
		    	className="card-link" 
		    	activeClassName="active"
	    		>
		    	details
		      </Link>:""}
			  <a href="#" className="card-link">share on facebook</a>
		    </div>
		</div>
	);
}
