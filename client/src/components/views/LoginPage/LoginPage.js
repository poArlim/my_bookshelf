import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';


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
                    props.history.push("/");
                } else {
                    alert('로그인에 실패했습니다');
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>아이디</label>
                <input type="text" value={UserId} onChange={onUserIdHandler}/>

                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button>
                    로그인
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage);
