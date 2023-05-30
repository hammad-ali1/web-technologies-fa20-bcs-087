import Model from "./model";

export default class User extends Model implements ModelTypes.User {
  username = "";
  password = "";
  firstName = "";
  lastName = "";
}
