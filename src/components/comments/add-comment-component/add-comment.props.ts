import { CommentModel } from '../../../contracts/models/comment.model';

export interface AddCommentProps {
  comment: CommentModel;
  author: string;
  initials: string | undefined;
  addComment(comment: CommentModel): any;
  eventId: string;
  userId: string;
  avatarColor: string;
}
