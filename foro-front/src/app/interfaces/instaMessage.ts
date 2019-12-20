export interface instaMessage {
  _id:string,
  receiverUsernameId: string,
  receiverUsername:string,
  senderUsernameId: string,
  senderUsername: string,
  content: string,
  creationDate: Date,
  logicaldelete:boolean,
}
