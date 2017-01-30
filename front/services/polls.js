export default {
  findAll: onlyUser => {
    let url = "/api/polls/";
    if (onlyUser) {
      url += '?mine=1';
    }
    return window.fetch(url,{
      credentials: 'include'
    }).then(response => {
      if(response.status != 200) {
        throw new Error("Unexpected error");
      }
      return response.json();
    }).then(json => {
      if(json.items) {
        return json.items;
      }
      return [];
    });
  },
  
  findOne: id => {
    let url = "/api/polls/" + id;
    
    return window.fetch(url,{
      credentials: 'include'
    }).then(response => {
      if(response.status != 200) {
        throw new Error("Unexpected error");
      }
      return response.json();
    }).then(json => {
      if(json.poll) {
        return json.poll;
      }
      throw new Error("Not found");
    });
  },
  
  vote: (poll, optionId) => {
    if(poll.voted_by) {
      return;
    }
    let url = "/api/polls/" + poll._id + "/vote";
    return window.fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        option_id: optionId
      })
    }).then(response => {
      if(response.status != 200) {
        throw new Error("Unexpected error");
      }
      return response.json();
    }).then(json => {
      poll.voted_by = true;
      for(let key in poll.options) {
        if (poll.options[key]._id == optionId) {
          poll.options[key].voted_by = true;
          poll.options[key].votes_count++;
          poll.votes_count++;
        }
      }
      return poll;
    });
  },
 
  add: poll => {

    let url = "/api/:id/polls";
    return window.fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(poll)
    }).then(response => {
      if(response.status != 200) {
        throw new Error("Unexpected error");
      }
      return response.json();
    }).then(json => {
      if (json && json._id && json.options) {
        return json;
      }
      throw new Error("Could not add poll");
    });
  }
}