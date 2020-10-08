import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import '../../../css/LoginPage.css'


function LoginPage(props) {
    const dispatch = useDispatch();

    // 아이디와 비밀번호로 로그인
    const [UserId, setUserId] = useState("");
    const [Password, setPassword] = useState("");

    const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            userId: UserId,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    window.localStorage.setItem('userId', response.payload.userId);
                    window.location.reload();
                    props.history.push("/");
                } else {
                    alert('로그인에 실패했습니다');
                }
            })
    }

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <form class="form-signin" id="form-login" onSubmit={onSubmitHandler}>
                <h1 class="h3 mb-3 font-weight-normal" align="center">대충만든 책장</h1>
                <label for="inputEmail" class="sr-only">아이디</label>
                <input
                    type="text"
                    id="email"
                    class="form-control"
                    placeholder="User ID"
                    required
                    autofocus
                    value={UserId}
                    onChange={onUserIdHandler}
                />
                <label for="inputPassword" class="sr-only">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    value={Password}
                    onChange={onPasswordHandler}
                />
                <button class="btn btn-lg btn-primary btn-block btn-login" type="submit">
                    로그인
                </button>
                <p class="mt-5 mb-3 text-muted" align="center">&copy; poArlim</p>
            </form>
        </div>
    )
}

export default withRouter(LoginPage);
