import { ApolloProvider } from '@apollo/react-hooks';
import client from '@/graphql/client';

export default function App() {
    return (
        <ApolloProvider client={client}>
            <div></div>
        </ApolloProvider>
    );
}
