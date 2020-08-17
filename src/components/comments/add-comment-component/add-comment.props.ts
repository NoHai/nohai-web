import { CommentModel } from '../../../contracts/models/comment.model';

export interface AddCommentProps {
  comment: CommentModel;
  avatar: string;
  addComment(comment: CommentModel): any;
  eventId: string;
  userId: string;
}
