import loadable from '@loadable/component';
import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { DehydratedState } from 'react-query/types/hydration';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import Header from './components/Header';
import Helmet from './components/Helmet';
import GlobalStyles from './GlobalStyles';

const Home = loadable(() => import('./views/Home'));
const UserDetail = loadable(() => import('./views/UserDetail'));
const UsersOverview = loadable(() => import('./views/UsersOverview'));

export interface PreloadedData {
  query?: DehydratedState;
}

const App: FC = () => (
  <HelmetProvider>
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
  </HelmetProvider>
);

export default App;
