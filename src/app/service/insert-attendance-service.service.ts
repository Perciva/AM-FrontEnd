import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class InsertAttendanceServiceService {

  constructor(private apollo: Apollo) { }

  InsertAttendance(assistant_initial: string, date: string, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
      mutation(
        $assistant_initial: String!
        $date: String!
        $_in: String!
        $_out: String!
      ) {
        InsertAttendance(
          assistant_initial: $assistant_initial
          date: $date
          _in: $_in
          _out: $_out
        )
      }      
      `,
      variables: {
        "assistant_initial": assistant_initial,
        "date": date,
        "_in": _in,
        "_out": _out
      }
    });
  }
}
