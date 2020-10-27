/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function AboveMenu(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success){
          window.location.reload();
          window.localStorage.removeItem('userId');
          props.history.push("/");
        } else {
          alert('로그아웃에 실패했습니다');
        }
      })
  }

  const loginHandler = () => {
    props.history.push("/login");
    window.location.reload();
  }

  const RegistreHandler = () => {
    props.history.push("/register");
    window.location.reload();
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <div class="bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">
              진짜 그냥 간단하게 한 페이지짜리 생각했는데 기능이 점점 추가되고 있다,,
              </p>
            </div>
          <div class="col-sm-4 offset-md-1 py-4">
            <h4 class="text-white">Contact</h4>
            <ul class="list-unstyled">
              <li><a href="https://www.facebook.com/profile.php?id=100004939984851" class="text-muted">Follow on Facebook</a></li>
              <li><a href="https://www.instagram.com/aa_rong_" class="text-muted">Follow on Instagram</a></li>
              <li class="text-muted">Email me(dkfhscjsgk96@gmail.com)</li>
              <br/>
              <li><button id="btn_logout" onClick={loginHandler}>Login</button>
              <button id="btn_logout" onClick={RegistreHandler}>Register</button></li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div class="bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">
              진짜 그냥 간단하게 한 페이지짜리 생각했는데 기능이 점점 추가되고 있다,,
              </p>
            </div>
          <div class="col-sm-4 offset-md-1 py-4">
            <h4 class="text-white">Contact</h4>
            <ul class="list-unstyled">
              <li><a href="https://www.facebook.com/profile.php?id=100004939984851" class="text-muted">Follow on Facebook</a></li>
              <li><a href="https://www.instagram.com/aa_rong_" class="text-muted">Follow on Instagram</a></li>
              <li class="text-muted">Email me(dkfhscjsgk96@gmail.com)</li>
              <br/>
              <li><button id="btn_logout" onClick={logoutHandler}>Logout</button></li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AboveMenu);

