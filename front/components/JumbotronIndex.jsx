import React from 'react';

export default props => {
    let textSee = (!props.onlyUser ?
    <p className="lead text-muted">Here you seein all polls hosted. 
     To see yours polls <a onClick={props.onShowMineClick} className="filter-list-link">click here</a>
	</p>
	:
	<p className="lead text-muted">Here you see only your polls. 
     To see all polls hosted <a onClick={props.onShowAllClick} className="filter-list-link">click here</a>
	</p>);
    
    return (
        <section className="jumbotron text-center">
    		<div className="container">
    			<h1 className="jumbotron-heading">Codex polls</h1>
    			<h3>A project for freeCodeCamp</h3>
    			{!props.adding ? textSee : ""}
    			<p>
    				{!props.adding ? <a href="#" className="btn btn-primary" onClick={props.onAddClick}>Create a new poll</a>:""}
    				{props.adding ? <a href="#" className="btn btn-primary" onClick={props.onCancelAdding}>Back (cancel poll)</a>:""}
    				<a href="#" className="btn btn-secondary">Share</a>
    			</p>
    		</div>
    	</section>
    );
}