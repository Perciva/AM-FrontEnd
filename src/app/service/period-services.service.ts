import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GlobalConstants } from '../common/global-variable';

declare function decrypt(word): any;

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
            description
            start
            end
          }
        }
      `,
    });
  }
  
  InsertPeriods(description: string, start: string, end: string){
    // var token = JSON.parse(decrypt(localStorage.getItem(GlobalConstants.TOKEN)));
    // var httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Authorization': 'Bearer ' + token })
    // };
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