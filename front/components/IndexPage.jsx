import React from 'react';
import JumbotronIndex from './JumbotronIndex.jsx';
import PollsCards from './PollsCards.jsx';
import NavLogged from './NavLogged.jsx';
import NewPollForm from './NewPollForm.jsx';
import polls from './../services/polls.js';
import users from './../services/users.js';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      onlyUser: false,
      adding: false,
      user: null,
      loading: true,
    };
  }
  firstLoad(onlyUser) {
    users.myProfile().then(user => {
      this.setState({user: user});
      this.loadPolls(onlyUser);
    }).catch(err => {
      this.setState({user: null});
      this.loadPolls(onlyUser);
      window.alert(err);
    });
  }
  loadPolls(onlyUser) {
    let state = {
      polls: []
    };
    this.setState(state);
    polls.findAll(onlyUser).then(items => {
      this.setState({polls: items, loading: false});
    }).catch(err => {
      this.setState({loading: false});
      window.alert(err);
    });
  }
  componentDidMount() {
    this.firstLoad(this.state.onlyUser);
  }
  
  onVote(poll, optionId) {
    if(poll.voted_by) {
      return;
    }
    polls.vote(poll, optionId).then(result => {
      for (var key in this.state.polls) {
        if(this.state.polls[key]._id == result._id) {
          this.state.polls[key] = result;
          return this.setState({polls: this.state.polls});
        }
      }
      
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
    this.setState({adding: false});
    polls.add(poll).then(res => {
      let polls = this.state.polls;
      polls.unshift(res);
      this.setState({polls: polls});
    });
  }
  render() {
    let isLoggedIn = this.state.user && this.state.user.username;
    return (
      <div>
        {isLoggedIn ? <NavLogged user={this.state.user} /> : ""}
        <JumbotronIndex 
          onAddClick={this.onAddClick.bind(this)}
          onCancelAdding={this.onCancelAdding.bind(this)} 
          onlyUser={this.state.onlyUser}
          onShowAllClick={this.onShowAllClick.bind(this)}
          onShowMineClick={this.onShowMineClick.bind(this)}
          adding={this.state.adding}
          isLoggedIn={this.state.user && this.state.user.username}
          loading={this.state.loading}
        />
        {this.state.adding ?
          <NewPollForm onSubmitNew={this.onSubmitNew.bind(this)}/>
          :
          <PollsCards 
            onlyUser={this.state.onlyUser} 
            polls={this.state.polls}
            pollLink={true}
            onVote={this.onVote.bind(this)}
            isLoggedIn={isLoggedIn}
          />
        }
      </div>
    );
  }
}