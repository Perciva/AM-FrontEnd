import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HolidayServicesService {

  constructor(private apollo: Apollo) { }

  GetAllHoliday(period_id){
    return this.apollo
    .query<any>({
      query: gql`
      query($period_id:Int!) {
        GetHolidayByPeriodId(period_id:$period_id) {
          id
    			description
          date
      }
    }
           
      `,
      variables: {
        "period_id": period_id,
      }
    });
  }

  InsertHoliday(period_id: number, description: string, date: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($period_id: Int!, $description: String!, $date: String!) {
          InsertHoliday(period_id:$period_id, description: $description, date: $date)
        }
      `,
      variables: {
        "period_id": period_id,
        "description": description,
        "date": date
      }
    });
  }

  DeleteHoliday(id: number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!) {
          DeleteHoliday(id: $id)
        }   
      `,
      variables: {
        "id": id
      }
    });
  }


}
