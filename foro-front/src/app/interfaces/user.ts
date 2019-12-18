export interface User {
  _id:string,
  usernameId:string,
  username: string,
  email: string,
  password: string,
  name: string,
  surname: string,
  registerDate: Date,
  admin:Number, //// 0 if regular user or 1 for admin access
  voteType:string,
}
