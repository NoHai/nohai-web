import { ICommonRepository } from '../../contracts/repositories/common-repository.interface';
import { ListModel } from '../../contracts/models';
import GraphqlClient from '../request/graphql-client';
import gql from 'graphql-tag';
import { SportModel } from '../../contracts/models/sport.model';
import MapModelHelper from '../../helpers/map-model.helper';

class CommonRepositoryController implements ICommonRepository {
  async Get(): Promise<ListModel<SportModel>> {
    const query = gql`
      query {
        sports {
          id
          name
          description
          defaultParticipantsNumber
        }
      }
    `;

    const response: any = await GraphqlClient.query(query);
    let result = await this.GetSportsMap(response.sports);
    return result;
  }

  private async GetSportsMap(model: any) {
    let result = new ListModel<SportModel>();
    model.forEach((element: any) => {
      let sport = MapModelHelper.MapSport(element);
      result.Data.push(sport);
    });

    return result;
  }
}

export const CommonRepository = new CommonRepositoryController();
