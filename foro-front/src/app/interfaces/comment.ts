export interface Comment {
  _id: string
  postId: String,
  parentId: String,
  content: string,
  upvoters: [string],
  downvoters: [string],
  rating: Number
  voteType: string,
  creationDate: Date,
  editDate: Date,
  usernameId: string,
  username:string,
}
