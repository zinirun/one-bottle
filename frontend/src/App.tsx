import { ApolloProvider } from '@apollo/react-hooks';
import client from '@/graphql/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './views/pages/LoginPage';
import TeamListPage from './views/pages/TeamListPage';

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="workspace" component={TeamListPage} />
                </Switch>
            </Router>
        </ApolloProvider>
    );
}
