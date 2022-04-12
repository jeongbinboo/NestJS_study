import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const changeId = (value: string) => {
    setId(value);
  };
  const changePw = (value: string) => {
    setPw(value);
  };
  const signInWith42 = () => {
    window.location.replace(
      'https://api.intra.42.fr/oauth/authorize?client_id=c178551e523b009994be1d911e271f6b2c978e36523ce74a1d56ac50ddf7aed1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Floading&response_type=code'
    );
  };
  const SignUp = async () => {
    try {
      await axios.post('http://localhost:5000/auth/sign_up', {
        //post하는 경로도 본인의 백엔드에 알맞게 수정해주세요!
        userId: id, //userId와 userPassword는 제 백엔드 api에서 post 해주는 body값이라
        userPassword: pw, //본인의 body에 맞게 post하시면 됩니다!
      });
      alert('회원가입 완료!');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="nestjsBox">NESTJS</div>
        <div className="signUpBox">Sign Up</div>
        <form className="inputBox">
          <input
            autoComplete="false"
            placeholder="ID"
            className="input inputID"
            onChange={(e) => {
              changeId(e.target.value);
            }}
          />
          <input
            autoComplete="false"
            placeholder="PASSWORD"
            className="input inputPW"
            type="password"
            onChange={(e) => {
              changePw(e.target.value);
            }}
          />
        </form>
        <div className="buttonBox">
          <div
            className="Button"
            onClick={() => {
              SignUp();
            }}
          >
            Sign up
          </div>
          <Link to="/" className="Button" style={{ textDecoration: 'none' }}>
            Go back to login
          </Link>
        </div>
        <div className="ftBtn" onClick={() => signInWith42()}>
          Sign in with "42Seoul"
        </div>
      </div>
    </div>
  );
};
