import axios from "axios";
import User from "./models/user";

const api = {
  addUser(user: User) {
    axios.post("/users", user).then((res: any) => {
      console.log(res);
    });
  },
};

export default api;
