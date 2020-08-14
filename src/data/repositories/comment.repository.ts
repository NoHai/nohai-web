import { gql } from 'apollo-boost';
import { CommentModel } from '../../contracts/models/comment.model';
import MapModelHelper from '../../helpers/map-model.helper';
import GraphqlClient from '../request/graphql-client';

class CommentRepositoryController {
  public async getCommentsForEvent(eventId: String): Promise<any> {
    const parameter = { parameter: eventId };
    const commentsQuery = gql`
      query comments($parameter: String!) {
        comments(parameter: $parameter) {
          id
          description
          date
          isDeleted
          user {
            details {
              firstName
              lastName
              picture
            }
          }
        }
      }
    `;

    const response: any = await GraphqlClient.queryWithVariables(commentsQuery, parameter);
    let result = MapModelHelper.MapComments(response.comments);
    return result;
  }
  public async Create(comment: CommentModel): Promise<CommentModel> {
    const input: any = {
      comment: {
        description: comment.Description,
        date: comment.Date,
        eventId: comment.EventId,
        authorId: comment.UserId,
      },
    };

    const saveCommentMutation = gql`
      mutation saveCommentMutation($comment: CommentInput!) {
        saveComment(input: $comment) {
          id
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(saveCommentMutation, input);
    return result.saveComment.id;
  }
}

export const CommentRepository = new CommentRepositoryController();
