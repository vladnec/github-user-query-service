export interface BaseUser {
  avatar_url: string;
  login: string;
}


export interface User extends BaseUser {
  name: string;
  followers: number;
}


