import { useEffect, useState, FC } from "react";
import { emptyPatient } from "../../Entities/defaults/patient.empty";
import { IPatient } from "../../Entities/interfaces/patient.interface";
import { setError } from "../../store/gsms/errorSlice";
import { useDispatch } from "react-redux";
import { useAuthUser } from "react-auth-kit";
import { getAllQuestionnaires } from "../../APIs/Questionnaire";
import { BsLockFill } from "react-icons/bs";
interface Props {
  updateablePatient: IPatient;
}
const UpdatePatient: FC<Props> = ({ updateablePatient }) => {
  const authUser = useAuthUser();
  const dispatch = useDispatch();
  const [patient, setPatient] = useState<IPatient>(
    updateablePatient || emptyPatient
  );
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdateDisabled) return;
    //@ts-ignore
    patient.supervisingDoctor = authUser().user._id;
    patient.fulltext = `${patient.name} ${patient.surname} ${patient.privateId} ${patient.email}`;

    //validate name, surname and private ID - email can be empty

    if (patient.name === "") {
      dispatch(
        setError({
          message: "Jméno pacienta nesmí být prázdné",
          rawData: "Bohužel, potřebujeme i jméno pacienta",
        })
      );
      return;
    }

    if (patient.surname === "") {
      dispatch(
        setError({
          message: "Příjmení pacienta nesmí být prázdné",
          rawData: "Bohužel, potřebujeme i příjmení pacienta",
        })
      );
      return;
    }

    if (patient.privateId === "") {
      dispatch(
        setError({
          message: "Rodné číslo pacienta nesmí být prázdné",
          rawData: "Bohužel, potřebujeme i rodné číslo pacienta",
        })
      );
      return;
    }
    // setPatient(emptyPatient);
    // createPatient(patient);
    // navigate("/patient/get");
  };

  useEffect(() => {
    (async () => {
      const data = await getAllQuestionnaires();
      console.log(data);
      setAvailableQuestionnaires(data);
    })();
  }, []);

  useEffect(() => {
    setPatient(updateablePatient);
  }, [updateablePatient]);

  const addAssignedQuestionnaire = (id: string) => {
    //@ts-ignore
    const arrayOfAssignedQuestionnaires = [...patient.assignedQuestionnaires];
    arrayOfAssignedQuestionnaires.push(id);
    setPatient({
      ...patient,
      assignedQuestionnaires: arrayOfAssignedQuestionnaires,
    });
  };

  const removeAssignedQuestionnaire = (id: string) => {
    //@ts-ignore
    const arrayOfAssignedQuestionnaires = [...patient.assignedQuestionnaires];
    const index = arrayOfAssignedQuestionnaires.indexOf(id);
    if (index > -1) {
      arrayOfAssignedQuestionnaires.splice(index, 1);
    }
    setPatient({
      ...patient,
      assignedQuestionnaires: arrayOfAssignedQuestionnaires,
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl my-2">
        Aktualizace {patient.name} {patient.surname}
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="card w-full flex flex-col gap-3 p-3 shadow-xl self-center relative"
      >
        <BsLockFill
          className="absolute top-0 right-0 text-4xl cursor-pointer hover:text-red-500 border-2 rounded-full p-1"
          onClick={() => {
            setIsUpdateDisabled(!isUpdateDisabled);
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-1">
            {" "}
            <span className=" font-bold py-1 mx-2">Jméno</span>
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-3xl"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              disabled={isUpdateDisabled}
            />
          </div>
          <div className="col-span-1">
            {" "}
            <span className=" font-bold py-1 mx-2">Příjmení</span>
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-3xl"
              value={patient.surname}
              onChange={(e) =>
                setPatient({ ...patient, surname: e.target.value })
              }
              disabled={isUpdateDisabled}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-1">
            {" "}
            <span className=" font-bold py-1 mx-2">Rodné číslo</span>
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-3xl"
              value={isUpdateDisabled ? "********" : patient.privateId}
              onChange={(e) =>
                setPatient({ ...patient, privateId: e.target.value })
              }
              disabled={isUpdateDisabled}
            />
          </div>
          <div className="col-span-1">
            {" "}
            <span className=" font-bold py-1 mx-2">Email</span>
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-3xl"
              value={isUpdateDisabled ? "********" : patient.email}
              onChange={(e) =>
                setPatient({ ...patient, email: e.target.value })
              }
              disabled={isUpdateDisabled}
            />
          </div>
        </div>
        <hr />
        {availableQuestionnaires.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <div className="col-span-1">
              {" "}
              <span className=" font-bold py-2 mb-5 text-xl ">
                Přiřazení dotazníků
              </span>
              <br />
              <br />
              <div className="grid grid-cols-12 gap-2">
                {availableQuestionnaires.map((questionnaire: any) => {
                  return (
                    <div
                      className=" col-span-12 md:col-span-6 flex flex-row gap-3 align-middle justify-center"
                      key={questionnaire._id}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        onChange={() => {
                          if (
                            patient.assignedQuestionnaires?.includes(
                              questionnaire._id
                            )
                          ) {
                            removeAssignedQuestionnaire(questionnaire._id);
                          } else {
                            addAssignedQuestionnaire(questionnaire._id);
                          }
                        }}
                        checked={patient.assignedQuestionnaires?.some(
                          (assignedQuestionnaire: any) => {
                            return (
                              assignedQuestionnaire._id === questionnaire._id
                            );
                          }
                        )}
                        disabled={isUpdateDisabled}
                      />
                      <span className=" font-bold py-1 mx-2">
                        {questionnaire.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <hr />
        {!isUpdateDisabled && (
          <button
            type="submit"
            className="btn btn-success w-full max-w-3xl self-center mt-10"
          >
            Aktualizovat {patient.name} {patient.surname}
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdatePatient;
