const localURL = "https://calm-mesa-57338.herokuapp.com";
// const localURL = "http://localhost:5002"


const jsonServer = {
  getOneEntry(endpoint, id) {
    return fetch(`${localURL}/${endpoint}/${id}`).then(res => res.json());
  },
  getAll(endpoint) {
    return fetch(`${localURL}/${endpoint}`).then(res => res.json());
  },
  postOne(endpoint, entry) {
    return fetch(`${localURL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
  },
  deleteEntry(endpoint, entryID) {
    return fetch(`${localURL}/${endpoint}/${entryID}`, {
      method: "DELETE"
    }).then(res => res.json());
  },
  patchEntry(endpoint, entryID, entry){
    return fetch(`${localURL}/${endpoint}/${entryID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },
  editEntry(endpoint, entryID, entry){
    return fetch(`${localURL}/${endpoint}/${entryID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  }
};

export default jsonServer

