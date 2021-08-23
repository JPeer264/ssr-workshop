import { FC } from 'react';
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

const App: FC = () => (
  <>
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
  </>
);

export default App;
