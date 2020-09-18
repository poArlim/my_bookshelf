import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';


function RegisterPage(props) {
    const dispatch = useDispatch();

    // 이름 아이디 비밀번호만 받을거임
    const [Name, setName] = useState("");
    const [UserId, setUserId] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('비밀번호가 다릅니다!');
        }

        let body = {
            name: Name,
            userId: UserId,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login");
                } else {
                    alert('회원가입에 실패했습니다');
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
                <label>이름</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>아이디</label>
                <input type="text" value={UserId} onChange={onUserIdHandler}/>

                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>비밀번호 확인</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br />
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);
