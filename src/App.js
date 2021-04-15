/* eslint-disable max-len */
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Single from './views/Single';
import Profile from './views/Profile';
import Login from './views/Login';
import Logout from './views/Logout';
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';
import Upload from './views/Uploads';
import MyFiles from './views/MyFiles';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container maxWidth='md'>
          <Nav/>
          <main style={{marginTop: 80}}>
            <Switch>
              <Route path="/" exact component={Login}/>
              <Route path="/home" component={Home}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/single" component={Single}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/upload" component={Upload}/>
              <Route path="/myfiles" component={MyFiles}/>
            </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>

  );
};

export default App;
