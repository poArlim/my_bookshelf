/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function AboveMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push("/login");
            } else {
                alert('로그아웃에 실패했습니다');
            }
        })
}


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
            <li><button id="btn_logout" onClick={logoutHandler}>로그아웃</button></li>
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

