import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

declare function EncryptToBase64(username,password): any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor( private apollo: Apollo) { }

  GetUser(username, password){
    
    var encryptPassword = EncryptToBase64(username,password);

    return this.apollo
    .query<any>({
      query: gql`
        query($username: String!, $password: String!) {
          GetUser(username: $username, password: $password){
            Major
            Name
            Role
            UserId
            UserName
          }
        }
      `,
      variables: {
        "username": username,
        "password": encryptPassword
      }
    });
  }
}
