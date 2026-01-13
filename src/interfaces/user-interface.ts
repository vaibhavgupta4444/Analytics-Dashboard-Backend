import { Base } from "./base";

export interface IUser extends Base {
  name: string;
  email: string;
  password: string;

  role: "user" | "admin";

  isActive: boolean;

}
