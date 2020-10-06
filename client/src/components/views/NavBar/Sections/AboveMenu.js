/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function AboveMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };


  return (
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">About</h4>
            <p class="text-muted">
            이 사이트는 Fast Campus 의 온라인 강의 "Node 웹 프로그래밍 올인원 패키지 - JavaScript" 내의 수업 자료를 기반으로 만들어졌습니다.
            </p>
          </div>
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Contact</h4>
          <ul class="list-unstyled">
            <li><a href="https://www.facebook.com/profile.php?id=100004939984851" class="text-muted">Follow on Facebook</a></li>
            <li><a href="https://www.instagram.com/po_arlim/?hl=ko" class="text-muted">Follow on Instagram</a></li>
            <li class="text-muted">Email me(dkfhscjsgk96@gmail.com)</li>
            <br/>
            <li><button id="btn_logout">로그아웃</button></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  )
  
  // if (user.userData && !user.userData.isAuth) {
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="mail">
  //         <a href="/login">Signin</a>
  //       </Menu.Item>
  //       <Menu.Item key="app">
  //         <a href="/register">Signup</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // } else {
  //   return (
  //     <Menu mode={props.mode}>
  //       <Menu.Item key="logout">
  //         <a onClick={logoutHandler}>Logout</a>
  //       </Menu.Item>
  //     </Menu>
  //   )
  // }
}

export default withRouter(AboveMenu);

