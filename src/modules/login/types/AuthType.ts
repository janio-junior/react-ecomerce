import { UserType } from "./UserTypes";

export interface AuthType {
  accessToken: string;
  user: UserType;
}
