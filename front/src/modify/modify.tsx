import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import webClient from '../webclient';
import '../post/post.css';
import BoardInterface from '../interface/board_interface';
import { useNavigate } from 'react-router';
import Board from '../main/board';

export const Modify = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [board, setBoard] = useState<BoardInterface>();

  const modifyBoard = async () => {
    await webClient.post(`/boards/modifyBoard/${board?.id}`, {
      title: title,
      description: desc,
    });
    alert('수정완료!');
    navigate(`/main/board/${board?.id}`);
  };
  const getBoard = async (id: string) => {
    const result = await webClient.get(`/boards/findByBoardId/${id}`);
    setBoard(result.data[0]);
    if (result.data.length === 0) navigate('/main');
    setTitle(result.data[0].title);
    setDesc(result.data[0].description);
  };
  const checkUser = async (id: string) => {
    console.log(id);
    const valid = await webClient.get(`/boards/modifyBoard/validation/${id}`);
    if (!valid.data) {
      alert('잘못된 접근입니다!');
      navigate('/main');
    }
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const results: string[] = url.pathname.split('/');
    const boardIndex: number = results.findIndex(
      (result) => result == 'modify'
    );
    const boardId: string = results[boardIndex + 1];
    checkUser(boardId);
    getBoard(boardId);
  }, []);
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
          value={title}
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
          value={desc}
        ></input>
      </div>
      <div className="btnBox">
        <div
          className="button"
          onClick={() => {
            navigate(`/main/board/${board?.id}`);
          }}
        >
          돌아가기
        </div>
        <div
          className="button"
          onClick={() => {
            modifyBoard();
          }}
        >
          수정완료
        </div>
      </div>
    </div>
  );
};
