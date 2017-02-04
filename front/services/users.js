export default {
 myProfile: () => {
    let url = "/api/users/:id";

    return window.fetch(url,{
      credentials: 'include'
    }).then(response => {
      if(response.status != 200 && response.status != 401) {
        throw new Error("Unexpected error");
      }
      return response.json();
    }).then(json => {
      if(json.user) {
        return json.user;
      }
      return null;
    });
  }
}