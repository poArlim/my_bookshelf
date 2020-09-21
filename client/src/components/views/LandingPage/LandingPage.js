import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../../css/LandingPage.css';



function LandingPage(props) {
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
        <main role="main">
            <section class="jumbotron text-center">
                <div class="container">
                    <h1><strong>대충만든 서재</strong></h1>
                    <p class="lead text-muted">앞으로 읽고 싶은 책, 이미 읽은 책 저장해두고 독후감도 쓰려고 만든 페이지</p>
                    <p>
                        <br/>
                        <a class="btn btn-primary my-2" href="/add">책 추가하기</a>
                        <button onClick={logoutHandler}>로그아웃</button>
                    </p>
                </div>
            </section>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row" id="list"></div>
                </div>
            </div>
        </main>
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center',
        //     width: '100%', height: '100vh'
        // }}>
        //     <h2>시작 페이지</h2>
        //     <button onClick={logoutHandler}>로그아웃</button>
        // </div>
    )
}

export default withRouter(LandingPage);
