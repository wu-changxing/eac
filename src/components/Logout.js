import {useEffect} from "react";

function Logout({onLogout}) {
  const username = localStorage.getItem('username');
  useEffect(() => {
      localStorage.removeItem('token');
    onLogout();
  }, []);
  return (

      <div>
            <h1>Logout</h1>
          <div> good by {username}</div>
      </div>
  );
}
export default Logout;