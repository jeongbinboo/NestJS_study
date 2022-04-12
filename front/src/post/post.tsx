import { useState } from 'react';
import { Link } from 'react-router-dom';
import webClient from '../webclient';
import './post.css';
export const Post = () => {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const postBoard = async () => {
    try {
      await webClient.post('/boards/add', {
        title: title,
        description: desc,
      });
      alert('작성완료!');
      window.location.replace('../main');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="postContainer">
      <div className="titleContainer">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="titlePost"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
      </div>
      <div className="descContainer">
        <input
          type="text"
          placeholder="내용을 입력하세요"
          className="descPost"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        ></input>
      </div>
      <div className="btnBox">
        <Link to="../main" className="button">
          돌아가기
        </Link>
        <div
          className="button"
          onClick={() => {
            postBoard();
          }}
        >
          작성완료
        </div>
      </div>
    </div>
  );
};
