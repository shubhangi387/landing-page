
const getStatus = () => {
    return fetch('http://localhost:500/secret', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
  };
  

  

  const logOut = () => {
    return fetch('http://localhost:500/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
  };
  
  export {logOut, getStatus};
