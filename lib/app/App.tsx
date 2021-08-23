import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DehydratedState } from 'react-query/types/hydration';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import Header from './components/Header';
import Helmet from './components/Helmet';
import GlobalStyles from './GlobalStyles';

import Home from './views/Home';
import UserDetail from './views/UserDetail';
import UsersOverview from './views/UsersOverview';

export interface PreloadedData {
  query?: DehydratedState;
}

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <Helmet />
    <GlobalStyles />
    <Header />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={UsersOverview} />
        <Route exact path="/users/:id" component={UserDetail} />
      </Switch>
    </Container>
  </QueryClientProvider>
);

export default App;
