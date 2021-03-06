import { ICommonRepository } from '../../contracts/repositories/common-repository.interface';
import { ListModel } from '../../contracts/models';
import GraphqlClient from '../request/graphql-client';
import gql from 'graphql-tag';
import { SportModel } from '../../contracts/models/sport.model';
import MapModelHelper from '../../helpers/map-model.helper';

class CommonRepositoryController implements ICommonRepository {
  async GetSports(): Promise<ListModel<SportModel>> {
    const query = gql`
      query {
        sports {
          id
          name
          description
          defaultParticipantsNumber
          imagePath
        }
      }
    `;

    const response: any = await GraphqlClient.query(query);
    let result = await this.GetSportsMap(response.sports);
    return result;
  }
  async GetCities(): Promise<Array<any>> {
    const query = gql`
      query {
        cities {
          id
          name
        }
      }
    `;

    const response: any = await GraphqlClient.query(query);
    return response;
  }
  
  async GetCounties(): Promise<Array<any>> {
    const query = gql`
      query {
        counties {
          id
          name
        }
      }
    `;

    const response: any = await GraphqlClient.query(query);
    return response;
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
