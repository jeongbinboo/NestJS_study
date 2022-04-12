interface BoardInterface {
  id: number;
  title: string;
  description: string;
  user: {
    id: number;
    userId: string;
    userPassword: string;
  };
}
export default BoardInterface;
