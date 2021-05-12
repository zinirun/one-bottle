import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/react-hooks';

const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
});

const client: any = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
