import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    user: (ModelTypes.User & { _id: import("mongoose").Types.ObjectId }) | null;
    formData: any;
  }
}
