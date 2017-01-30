import React from 'react';
import { Link } from 'react-router';

export default props => {
    return (
      <div className="not-found-page"> 
        <section className="jumbotron text-center">
      		<div className="container">
      			<h1 className="jumbotron-heading">Codex polls</h1>
      			<h2>404. Page not found!</h2>
      			<h3>A project for freeCodeCamp</h3>
      			<Link to="/" className="btn btn-primary">Go back to home page</Link>
      		</div>
      	</section>
      </div>
    );
}