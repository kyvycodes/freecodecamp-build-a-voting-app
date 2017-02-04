import React from 'react';

export default props => {
return (
    <div className="container"> 
      <div className="row nav-logged">
        <div className="col-sm-12 offset-lg-2 col-lg-8">
          <div className="row">
            <div className="text-left col-sm-6"> 
              <strong className="display-name">Hi, {props.user.displayName}.</strong>
            </div>
            <div className="text-right col-sm-6"> 
              <strong><a className="btn btn-link text-muted" href="/logout">logout</a></strong>
            </div>
          </div>
        </div>
      </div>
    </div>);
}