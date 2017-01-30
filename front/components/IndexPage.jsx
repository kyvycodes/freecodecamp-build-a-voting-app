import React from 'react';
import JumbotronIndex from './JumbotronIndex.jsx';
import PollsCards from './PollsCards.jsx';
import NewPollForm from './NewPollForm.jsx';
import polls from './../services/polls.js';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      onlyUser: false,
      adding: false,
    };
  }
  loadPolls(onlyUser) {
    let state = {
      polls: []
    };
    this.setState(state);
    polls.findAll(onlyUser).then(items => this.setState({polls: items}));
  }
  componentDidMount() {
    this.loadPolls(this.state.onlyUser);
  }
  
  onVote(poll, optionId) {
    if(poll.voted_by) {
      return;
    }
    polls.vote(poll, optionId).then(result => {
      this.setState({polls: this.state.polls});
    });
  }
  onAddClick() {
    this.setState({adding: true});
  }
  onCancelAdding() {
    this.setState({adding: false});
  }
  onShowAllClick(e) {
    e.preventDefault();
    this.setState({onlyUser: false});
    this.loadPolls(false);
  }
  onShowMineClick(e) {
    e.preventDefault();
    this.setState({onlyUser: true});
    this.loadPolls(true);
  }
  onSubmitNew(poll) {
    polls.add(poll).then(res => {
      let polls = this.state.polls;
      polls.unshift(res);
      this.setState({polls: polls});
    });
  }
  render() {
    console.log("render index", this.state.polls);
    return (
      <div>
        <JumbotronIndex 
          onAddClick={this.onAddClick.bind(this)}
          onCancelAdding={this.onCancelAdding.bind(this)} 
          onlyUser={this.state.onlyUser}
          onShowAllClick={this.onShowAllClick.bind(this)}
          onShowMineClick={this.onShowMineClick.bind(this)}
          adding={this.state.adding}
        />
        {this.state.adding ?
          <NewPollForm onSubmitNew={this.onSubmitNew.bind(this)}/>
          :
          <PollsCards 
            onlyUser={this.state.onlyUser} 
            polls={this.state.polls}
            pollLink={true}
            onVote={this.onVote.bind(this)}
          />
        }
      </div>
    );
  }
}