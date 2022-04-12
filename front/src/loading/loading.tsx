import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Loading = () => {
  const navigate = useNavigate();
  const getToken = async (code: string | null) => {
    const response = await axios.post('http://localhost:5000/auth/oauth', {
      code: code,
    });
    console.log(response);
    navigate('/main');
    window.localStorage.setItem('accessToken', response.data);
  };
  useEffect(() => {
    let code: string | null = new URL(window.location.href).searchParams.get(
      'code'
    );
    getToken(code);
  }, []);
  return <h1>Loading...</h1>;
};

export default Loading;
