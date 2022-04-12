import { useNavigate } from 'react-router';
import './main.css';

export const BoardList = (props: any) => {
  const navigate = useNavigate();
  if (props.content == undefined)
    return (
      <div className={props.class}>
        <div className="titleBox" />
        <div className="userBox" />
      </div>
    );
  else
    return (
      <div
        className={props.class}
        onClick={() => {
          navigate(`./board/${props.content.id}`);
        }}
      >
        <div className="titleBox">{props.content.title}</div>
        <div className="userBox">{props.content.user.userId}</div>
      </div>
    );
};
