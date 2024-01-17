import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import { emptyPatient } from "../Entities/defaults/patient.empty";
import { IPatient } from "../Entities/interfaces/patient.interface";
import { getPatientById } from "../APIs/Patients";
import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { BsPlusCircle } from "react-icons/bs";
const PatientDetail = () => {
  const [patient, setPatient] = useState<IPatient>(emptyPatient);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    (async () => {
      const data: IPatient = await getPatientById(id);
      console.log(data);
      setPatient(data);
    })();
  }, [id]);
  return (
    <MainLayout>
      {patient && (
        <div>
          <h1 className="text-center text-2xl py-2 my-5">
            {patient.name} {patient.surname}
          </h1>
          {patient.assignedQuestionnaires &&
            patient.assignedQuestionnaires.length > 0 && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <h2 className="text-xl">Přiřazené dotazníky</h2>
                  <hr />
                </div>
                {patient.assignedQuestionnaires.map(
                  (questionnaire: IQuestionnaire) => (
                    <Link
                      to={`/patient/${patient._id}/questionnaire/${questionnaire._id}/create`}
                      key={questionnaire._id}
                      className="col-span-12 md:col-span-6 group curosr-pointer"
                    >
                      <div className="bg-white rounded-md shadow-md p-4 text-center group-hover:bg-slate-100 transition-all ease-linear duration-300">
                        <h3 className="text-2xl mb-2">{questionnaire.name}</h3>
                        <hr />
                        <p className="group-hover:font-bold transition-all ease-linear duration-300">
                          {" "}
                          Vyplnit nový záznam
                          <BsPlusCircle className="text-3xl text-green-600 mx-auto group-hover:text-green-400 transition-all ease-linear duration-300" />
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}

          {patient.questionnairesDoneByPatient &&
            patient.questionnairesDoneByPatient.length > 0 && (
              <div>
                <h2 className="text-2xl">Analytika</h2>
              </div>
            )}
        </div>
      )}
    </MainLayout>
  );
};

export default PatientDetail;
