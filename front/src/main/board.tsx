import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { isConstructorDeclaration } from 'typescript';
import BoardInterface from '../interface/board_interface';
import webClient from '../webclient';

const Board = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardInterface>();
  const getBoard = async (id: string) => {
    const result = await webClient.get(`/boards/findByBoardId/${id}`);
    setBoard(result.data[0]);
    if (result.data.length === 0) navigate('/main');
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const results: string[] = url.pathname.split('/');
    const boardIndex: number = results.findIndex((result) => result == 'board');
    const boardId: string = results[boardIndex + 1];
    getBoard(boardId);
  }, []);
  return (
    <div className="boardContainer">
      <div
        className="header"
        style={{
          color: 'white',
          justifyContent: 'flex-start',
        }}
      >
        <h1
          style={{ marginLeft: '50px' }}
          onClick={() => {
            navigate('/main');
          }}
        >
          NestStudy
        </h1>
      </div>
      <div className="body" style={{ alignItems: 'center' }}>
        <div className="boardContent">
          <div className="boardTitle">
            <div style={{ fontSize: '40px' }}>{board?.title}</div>
            <div className="boardUserId">작성자: {board?.user.userId}</div>
          </div>
          <div className="boardDescript">{board?.description}</div>
        </div>
      </div>
      <div className="boardBtnBox">
        <div className="boardBtn">수정하기</div>
        <div className="boardBtn">삭제하기</div>
      </div>
    </div>
  );
};
export default Board;
