export interface Comment {
  _id: string
  postId: String,
  parentId: String,
  userEmail: string,
  username: string,
  content: string,
  creationDate: Date,
  editDate: Date,
  upvoters: [string],
  downvoters: [string],
  rating: Number
  voteType: string,
}
