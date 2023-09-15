import { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { getMyUsers } from "../APIs/Users";
import { useAuthHeader } from "react-auth-kit";
import { useDispatch } from "react-redux";
import { setError } from "../store/gsms/errorSlice";
import EndoUserDetailBetter from "../components/GlobalComponents/EndoUserDetailBetter";
import { IQuestionnaire } from "../Entities/interfaces/questionnaire.interface";
import { BsDownload } from "react-icons/bs";

const EndoUserList = ({endpoint, questions}:{endpoint:string, questions:string[]}) => {
  const header = useAuthHeader();
  const token = header();
  const dispatch = useDispatch();


  const [users, setUsers] = useState<IQuestionnaire[]>([]);
  const [filteredUsersBySSN, setFilteredUsersBySSN] = useState<IQuestionnaire[]>([]);
  const [uniqueUsersForList, setUniqueUsersForList] = useState<IQuestionnaire[]>([]);

  const [btnText, setBtnText] = useState<string>("Zkopírovat data");
  useEffect(() => {
    getMyUsers(token,endpoint)
      .then((res) => {
        //Only unique questionnaires by pacientSSN
        const filteredData = res.filter(
          (thing:IQuestionnaire, index:number, self:any) =>

            index ===
            self.findIndex((t:IQuestionnaire) => (
              t.pacientSSN === thing.pacientSSN
            ))
        );

        const filteredDatabyName:IQuestionnaire[] = res.sort((a: IQuestionnaire, b: IQuestionnaire) => {
          const aFirstName = a.pacientName;
          const bFirstName = b.pacientName;

          if (aFirstName < bFirstName) {
            return -1;
          }
          if (aFirstName > bFirstName) {
            return 1;
          }
        });  
        setUsers(filteredDatabyName);
        setFilteredUsersBySSN(filteredDatabyName);
        setUniqueUsersForList(filteredData)
      })
      .catch((err) => {
        setUsers([]);
        setFilteredUsersBySSN([]);
        dispatch(
          setError({
            message: "Nemohli jsme načíst data",
            rawData: err,
          })
        );
      });

      return () => {
        setUsers([]);
        setFilteredUsersBySSN([]);
        setUniqueUsersForList([]);
        setQuery("");
      }
  }, [endpoint, questions]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length === 10) {
      const filteredUsers = filteredUsersBySSN.filter((user: IQuestionnaire) => {
        return user.pacientSSN.toString().includes(query);
      });
      filteredUsers.sort((a: IQuestionnaire, b: IQuestionnaire) => {
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



  return ( 
    <MainLayout>
      <div className="max-w-2xl mx-auto p-2 m-2 shadow rounded-sm gap-2 relative">
        <input
          className=" text-center relative max-w-2xl w-full py-8 px-2 rounded-xl shadow-lg"
          type="text"
          value={query}
          onChange={({ target }) => {
            setQuery(target.value);
          }}
          placeholder="0000000000 - vyhledat uživatele podle rodného čísla"
        />
      </div>
      <div className="tooltip tooltip-closed tooltip-secondary" data-tip="Exportuje všechna data do formátu JSON">

</div>

<button className="btn" onClick={()=>{
  //@ts-ignore
  document.getElementById('my_modal_2').showModal()
  }}><BsDownload />Export dat</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">JSON data <span className="btn btn-primary" onClick={()=>{
      navigator.clipboard.writeText(JSON.stringify(users))
      setBtnText("Zkopírováno")
    }}>{btnText}</span></h3>
    <p className="py-4">{JSON.stringify(users)}</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

    
        {
        (query.length !== 10) &&  uniqueUsersForList.map((q:IQuestionnaire, i:number)=>(
            <div key={i} className="group w-full p-2 m-2 border-b-2 transition-all duration-400 ease-linear hover:bg-white cursor-pointer">
              <div className=" group-hover:font-bold" onClick={()=>{
                setQuery(q.pacientSSN.toString())
              }}>
                   {q.pacientName} - {q.pacientSSN}
              </div>
            </div>
          ))
        }
      <div className="w-full max-w-5xl mx-auto">
        {(filteredUsersBySSN && query.length === 10) && <EndoUserDetailBetter allData={filteredUsersBySSN} questions={questions} />}
      </div>
    </MainLayout>
  );
};

export default EndoUserList;
