const baseURL = "https://calm-mesa-57338.herokuapp.com";


export default {

  get: {
  allJSON(endpoint) {
    return fetch(`${baseURL}/${endpoint}`).then(res => res.json());
  },
  oneJSON(endpoint, id) {
    return fetch(`${baseURL}/${endpoint}/${id}`).then(res => res.json());
}
  },
  post: {
    toJSONServer(endpoint, objectToPost) {
      return fetch(`${baseURL}/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(objectToPost),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(e => e.json());

    }
  }
}

