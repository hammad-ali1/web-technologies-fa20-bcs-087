declare namespace ModelTypes {
  type User = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}

declare namespace Express {
  interface Request {
    user:
      | (ModelTypes.User & { _id: import("mongoose").Types.ObjectId })
      | undefined;
  }
}
