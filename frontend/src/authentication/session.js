
const getStatus = () => {
    return fetch('https://sodd-dash-board-mw6e.vercel.app/secret', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
  };
  

  

  const logOut = () => {
    return fetch('https://sodd-dash-board-mw6e.vercel.app/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
  };
  
  export {logOut, getStatus};
