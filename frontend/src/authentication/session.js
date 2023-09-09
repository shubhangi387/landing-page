
const getStatus = () => {
    return fetch('/secret', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
  };
  

  

  const logOut = () => {
    return fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
  };
  
  export {logOut, getStatus};