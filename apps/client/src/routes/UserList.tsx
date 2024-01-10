import React, { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { getMyUsers, deleteUser } from "../APIs/Users";
import { useAuthHeader } from "react-auth-kit";
import { useDispatch } from "react-redux";
import { setError } from "../store/gsms/errorSlice";
import UserDeatil from "../components/GlobalComponents/UserDetail";

interface Props {}

interface IUser {
  _id: string;
  pacientName: string;
  pacientSSN: number;
  supervisorDoctor: string;
  questionnaireDate: string;
  __01Question: number;
  __02Question: 5;
  __03Question: number;
  __04Question: number;
  __05Question: number;
  __06Question: number;
  __07Question: number;
  __08Question: number;
  __09Question: number;
  __10Question: number;
  sumValue: number;
}

const UserList: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<[]>([]);
  const [filteredUsersBySSN, setFilteredUsersBySSN] = useState(users);
  const header = useAuthHeader();
  const token = header();

  useEffect(() => {
    getMyUsers(token,"/myom")
      .then((res) => {
        setUsers(res);
        setFilteredUsersBySSN(res);
      })
      .catch((err) => {
        dispatch(
          setError({
            message: "Nemohli jsme načíst data",
            rawData: err,
          })
        );
      });
  }, []);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length === 10) {
      const filteredUsers = users.filter((user: IUser) => {
        return user.pacientSSN.toString().includes(query);
      });
      //sort function by DD.MM.YYYY
      filteredUsers.sort((a: IUser, b: IUser) => {
        const aDate = a.questionnaireDate.split(".");
        const bDate = b.questionnaireDate.split(".");
        const aDateObj = new Date(
          parseInt(aDate[2]),
          parseInt(aDate[1]),
          parseInt(aDate[0])
        );
        const bDateObj = new Date(
          parseInt(bDate[2]),
          parseInt(bDate[1]),
          parseInt(bDate[0])
        );
        return bDateObj.getTime() - aDateObj.getTime();
      });
      //@ts-ignore
      setFilteredUsersBySSN(filteredUsers);
    } else {
      setFilteredUsersBySSN(users);
    }
  }, [query]);

  const deleteUserFinally = async (id:string)=>{
 await deleteUser(id, token, "/myom/").then(()=>{
  getMyUsers(token, "/myom")
      .then((res) => {
        setUsers(res);
        setFilteredUsersBySSN(res);
        console.log(res)
      })
      .catch((err) => {
        dispatch(
          setError({
            message: "Nemohli jsme načíst data",
            rawData: err,
          })
        );
      });
 })
    

  }
  return (
    <MainLayout>
      <div className="grid grid-cols-12 max-w-2xl mx-auto p-2 m-2 shadow rounded-sm gap-2">
        <input
          className="col-span-12 p-2 text-center"
          type="text"
          value={query}
          onChange={({ target }) => {
            setQuery(target.value);
          }}
          placeholder="0000000000 - vyhledat uživatele podle rodného čísla"
        />
      </div>
      {filteredUsersBySSN.length !== users.length && (
        <div className="max-w-2xl mx-auto p-2 m-2 shadow rounded-sm gap-2">
          {filteredUsersBySSN.map((user: IUser, index) => {
            return (
              <div className="grid grid-cols-12" key={index}>
                <div className="col-span-2">{user.questionnaireDate}</div>
                <div className="col-span-8">
                  <progress
                    className="progress w-full"
                    value={user.sumValue}
                    max="100"
                  ></progress>
                </div>
                <div className="col-span-2 text-center">{user.sumValue}</div>
              </div>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
        {filteredUsersBySSN &&
          filteredUsersBySSN.map((user: IUser, index) => {
            return <UserDeatil deleteUser={deleteUserFinally} user={user} key={index} tabIndex={index} />;
          })}
      </div>
    </MainLayout>
  );
};

export default UserList;
