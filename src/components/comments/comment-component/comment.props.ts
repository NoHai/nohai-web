export interface CommentProps {
  description: string;
  author: string;
  avatar: string;
  date: Date;
  eventId: string;
  initials: string | undefined;
  deleteComment(commentId: string): any;
  commentId: string;
  userId: string;
  currentUserId: string;
}
