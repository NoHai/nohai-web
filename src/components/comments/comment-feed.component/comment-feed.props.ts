export interface CommentFeedProps {
  comments: Array<any>;
  eventId: string;
  updateCommentsCount(nr: number):any;
}
