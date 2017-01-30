import React from 'react';
import {Link} from 'react-router';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="app">
        {this.props.children}
        
    	<footer>
    		<div className="container text-center">
                <div className="row">
                    <div className="col-sm-12">
                        <p>
                        <a target="_blank" href="https://www.freecodecamp.com/challenges/build-a-voting-app">
                            freeCodeCamp project
                        </a>
                        </p>
                    </div>
                    <div className="col-sm-12">
                        Copyright © Marcelo Rocha 2017
                    </div>
                </div>
            </div>
    	</footer>
     </div>
    );
    }
}
