import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { GlobalConstants } from './common/global-variable';

declare function decrypt(word): any;

const uri = 'http://127.0.0.1:5000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  var token = decrypt(localStorage.getItem(GlobalConstants.TOKEN));
  const auth = setContext((operation, context) => {
    if (token)
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  });

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);

  return {
    link: link,
    cache: new InMemoryCache()
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
