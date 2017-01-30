import React from 'react';
import PollCardItem from './PollCardItem.jsx';

export default props => {
	var polls = props.polls && props.polls.length ? props.polls : [];
	var cards = polls.map(poll => {
		return <PollCardItem pollLink={props.pollLink} onVote={props.onVote} poll={poll} key={poll._id} />
	})
	
    return (
        <div className="container">
		<div className="row">
			<div className="col-sm-12 offset-lg-2 col-lg-8">
				{cards}
			</div>
		</div>
	</div>
    );
}
