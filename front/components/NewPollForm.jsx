import React from 'react';

export default class NewPollForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {
        name: "",
        options: []
      },
      newOption: ""
    };
  }
  
  handleAddOption() {
    let val = this.state.newOption;
    if(val && this.state.poll.options.indexOf(val) < 0) {
      let poll = this.state.poll;
      poll.options.push(val);
      this.setState({poll: poll, newOption: ""});
    }
  }

  handleNewOptionChange(e) {
    this.setState({newOption: e.target.value});
  }
  handlePollNameChange(e) {
    let poll = this.state.poll;
    poll.name = e.target.value;
    this.setState({poll: poll});
  }
  handleRemoveClick(idx) {
    if (idx >= 0) {
      let poll = this.state.poll;
      poll.options.splice(idx, 1);
      this.setState({poll: poll});
    }
  }
  isValidPoll() {
    if (this.state.poll.name.length < 5) {
      return false;
    }
    
    if(this.state.poll.options.length < 2) {
      return false;
    }
    return true;
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.isValidPoll()) {
      return;
    }

    this.props.onSubmitNew(this.state.poll);
    return;
    this.setState({
      poll:{
        name: "",
        options: []
      }
    });
  }

  render() {
    let options = this.state.poll.options.map((opt, key) => {
      return (<li className="list-group-item justify-content-between" key={key}>
      		    {opt}
      		    <span className="badge badge-default badge-pill" onClick={e => this.handleRemoveClick(key)}>x</span>
      		  </li>);
    });
    let classNameFieldSet = this.state.poll.options.length < 2 ? "form-group has-warning" : "form-group";
    return (
        <div className="container">
          <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-8">
        	<form className="poll-add-frm" onSubmit={this.handleSubmit.bind(this)}>
        	    <h4>Creating your new poll</h4>
              <div className="form-group">
                <label>Title</label>
                <input value={this.state.poll.name} onChange={this.handlePollNameChange.bind(this)} type="text" className="form-control" required placeholder="" />
              </div>

              <fieldset className={classNameFieldSet}>
                <legend>Options</legend>
                <ul className="list-group">
                  {options}
        		    </ul>
        		    {this.state.poll.options.length < 2 ?
        		    (<div>
        		      <div className="form-control-feedback">Must have at least 2 valid options.</div>
                  <small className="form-text text-muted">type option in input text below and press add</small>
                </div>)  : ""}
              </fieldset> 
              <div className="input-group mb-2 mr-sm-2">
        	     <input type="text" className="form-control" placeholder="new option" value={this.state.newOption} onChange={this.handleNewOptionChange.bind(this)} />
        		   <div className="input-group-addon" onClick={this.handleAddOption.bind(this)}>add</div>
        	  </div>
        	  {this.isValidPoll() ?
        	  <div className="form-group mb-2 mr-sm-2">
                <button type="submit" className="btn btn-primary">Create poll</button>
            </div> : 
            <div className="alert alert-info" role="alert">
              <strong>Title and options are required.</strong>.
            </div>}
          </form>
           </div>
          </div>
        </div>
    );
  }
}