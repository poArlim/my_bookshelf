import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import AddPage from './views/AddPage/AddPage.js';
import EditPage from './views/EditPage/EditPage.js';
import BookDetail from './views/BookDetail/BookDetail.js';
import Auth from '../hoc/auth';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div>
          <Switch>
              <Route exact path="/" component={Auth(LandingPage, true)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/add" component={Auth(AddPage, true)} />
              <Route exact path="/book/:bookTitle" component={Auth(BookDetail, true)} />
              <Route exact path="/edit/:bookTitle" component={Auth(EditPage, true)} />
            </Switch>
        </div>
        <Footer />
    </Suspense>
  );
}

export default App;
