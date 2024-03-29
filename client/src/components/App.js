import React, { Suspense } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import AddReadPage from './views/AddPage/AddReadPage.js';
import EditPage from './views/EditPage/EditPage.js';
import BookDetail from './views/BookDetail/BookDetail.js';
import Auth from '../hoc/auth';
import ViewPage from './views/ViewPage/ViewPage';
import ToReadPage from './views/LandingPage/ToReadPage';
import AddToReadPage from './views/AddPage/AddToReadPage';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div>
          <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/toread" component={Auth(ToReadPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/addread" component={Auth(AddReadPage, true)} />
              <Route exact path="/addtoread" component={Auth(AddToReadPage, true)} />
              <Route exact path="/book/:bookTitle" component={Auth(BookDetail, true)} />
              <Route exact path="/view/:bookTitle" component={Auth(ViewPage, null)} />
              <Route exact path="/edit/:bookTitle" component={Auth(EditPage, true)} />
            </Switch>
        </div>
        <Footer />
    </Suspense>
  );
}

export default App;
