import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor( private apollo: Apollo) { }

  GetAllPeriods(){

    return this.apollo
    .query<any>({
      query: gql`
        query {
          GetAllPeriods {
            id
            description
            start
            end
          }
        }
      `,
    });
  }
  
  InsertPeriods(description: string, start: string, end: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($description: String!, $start: String!, $end: String!) {
          InsertPeriod(description: $description, start: $start, end: $end)
        }
      `,
      variables: {
        "description": description,
        "start": start,
        "end": end,
      }
    });
  }
  
  UpdatePeriods(id: number, description: string, start: string, end: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!, $description: String!, $start: String!, $end: String!) {
          UpdatePeriod(id:$id, description: $description, start: $start, end: $end)
        }
      `,
      variables: {
        "id": id,
        "description": description,
        "start": start,
        "end": end,
      }
    });
  }
  
  DeletePeriods(id: number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!) {
          DeletePeriod(id:$id)
        }
      `,
      variables: {
        "id": id
      }
    });
  }
}