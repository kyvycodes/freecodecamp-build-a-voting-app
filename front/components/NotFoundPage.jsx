import React from 'react';
import { Link } from 'react-router';

export default props => {
    return (
      <div>
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to home page</Link>
        </p>
      </div>
    );
}