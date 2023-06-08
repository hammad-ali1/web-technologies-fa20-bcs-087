// @ts-nocheck
import { useEffect, useState } from "react";
import api from "../api/api";
function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.getAllUsers().then(setUsers);
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>{user.username}</div>
      ))}
    </div>
  );
}

export default Home;
