import axios from 'axios';
import { useEffect, useState } from 'react';
import webClient from '../webclient';
import { BoardInterface } from '../interface/board_interface';
import './main.css';
import { BoardList } from './boardList';
import { Link } from 'react-router-dom';

export const Main = () => {
  const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [boards, setBoards] = useState<BoardInterface[]>([]);
  const [search, setSearch] = useState('');
  const [option, setOption] = useState<string>('');

  const getAllBoards = async () => {
    const response = await webClient.get('/boards');
    setBoards(response.data);
  };
  const findById = async (userId: string) => {
    const response = await webClient.post('/boards/findById', {
      userId: userId,
    });
    setBoards(response.data);
  };
  const findByTitle = async (title: string) => {
    const response = await webClient.post('/boards/findByTitle', {
      title: title,
    });
    setBoards(response.data);
  };
  useEffect(() => {
    getAllBoards();
  }, []);
  return (
    <div className="mainContainer">
      <div className="header">
        <div className="leftHeader">
          <select
            className="selectBox"
            onChange={(e) => {
              setOption(e.target.value);
            }}
          >
            <option value="">검색 기준</option>
            <option value="title">글제목</option>
            <option value="user">작성자</option>
          </select>
          <input
            type="text"
            className="searchBox"
            onChange={async (e) => {
              if (e.target.value === '') getAllBoards();
              else {
                if (option === 'user') findById(e.target.value);
                else if (option === 'title') findByTitle(e.target.value);
              }
            }}
          ></input>
        </div>
        <div className="rightHeader">
          <Link to="../post" className="postBtn">
            글쓰기
          </Link>
        </div>
      </div>
      <div className="contents">
        {arr.map((arr, index) => {
          if (index % 2)
            return (
              <BoardList
                key={index}
                class="board boardW"
                content={boards[index]}
              />
            );
          else
            return (
              <BoardList
                key={index}
                class="board boardG"
                content={boards[index]}
              />
            );
        })}
      </div>
    </div>
  );
};
