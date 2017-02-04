export default {
  findAll: onlyUser => {
    let url = "/api/polls/";
    if (onlyUser) {
      url += '?mine=1';
    }
    return fetch(url,{
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
    
    return fetch(url,{
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
  
  vote: (poll, option) => {
    if(poll.voted_by) {
      return;
    }
    let url = "/api/polls/" + poll._id + "/vote";
    return fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        option: option
      })
    }).then(response => {
      if(response.status != 200) {
        throw new Error("Unexpected error");
      }
      return response.json();
    }).then(json => {
      if(json.poll && json.poll._id) {
        return json.poll;
      }
      let msg = json.message ? json.message : "Could not confirm your vote.";
      throw new Error(msg);
    });
  },
 
  add: poll => {

    let url = "/api/:id/polls";
    return fetch(url, {
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