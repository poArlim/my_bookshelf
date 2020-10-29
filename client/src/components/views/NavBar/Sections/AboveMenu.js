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
              휴학 기간 중 책을 읽고 정리하고자 만든 임아론의 사이드 프로젝트 웹 사이트<br />
              문의 사항 혹은 사용 중 불편사항은 우측에 Contact 로 연락주시면 감사하겠습니다.<br />
              <br />
              기본 페이지는 제작자(임아론) 의 독서 목록이 표시되도록 되어있으며, <br />
              회원가입 및 로그인을 통해 제작자 목록이 아닌 개인 맞춤 목록을 사용할 수 있습니다. <br />
              <br />
              사용 기술 <br />
              Client : HTML, JavaScript, React <br />
              Server : NodeJS, MongoDB, Raspberry Pi, Nginx <br />
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
              휴학 기간 중 책을 읽고 정리하고자 만든 임아론의 사이드 프로젝트 웹 사이트<br />
              문의 사항 혹은 사용 중 불편사항은 우측에 Contact 로 연락주시면 감사하겠습니다.<br />
              <br />
              기본 페이지는 제작자(임아론) 의 독서 목록이 표시되도록 되어있으며, <br />
              회원가입 및 로그인을 통해 제작자 목록이 아닌 개인 맞춤 목록을 사용할 수 있습니다. <br />
              <br />
              사용 기술 <br />
              Client : HTML, JavaScript, React <br />
              Server : NodeJS, MongoDB, Raspberry Pi, Nginx <br />
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

