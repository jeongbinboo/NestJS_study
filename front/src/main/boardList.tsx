import './main.css';

export const BoardList = (props: any) => {
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
        onClick={(target) => {
          console.log(target.target);
        }}
      >
        <div className="titleBox">{props.content.title}</div>
        <div className="userBox">{props.content.user.userId}</div>
      </div>
    );
};
