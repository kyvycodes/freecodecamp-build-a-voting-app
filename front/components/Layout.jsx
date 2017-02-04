import React from 'react';
import {Link} from 'react-router';

export default class Layout extends React.Component {
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
                        <a target="_blank" href="http://omarcelo.com.br">Copyright © Marcelo Rocha {new Date().getFullYear()}</a>
                    </div>
                </div>
            </div>
    	</footer>
     </div>
    );
    }
}
