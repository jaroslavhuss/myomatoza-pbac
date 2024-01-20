import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import { emptyPatient } from "../Entities/defaults/patient.empty";
import {
  IPatient,
  IQuestionsDoneByPatient,
} from "../Entities/interfaces/patient.interface";
import { getPatientById } from "../APIs/Patients";
import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { BsPlusCircle } from "react-icons/bs";
import UpdatePatient from "../components/GlobalComponents/UpdatePatient";

//Interface [{name:"myomatóza", data: IQuestionsDoneByPatient[], name: "endometrióza", data: IQuestionsDoneByPatient[], ... etc"}]

interface IAggregatedQuestionnaire {
  name: string;
  data: IQuestionsDoneByPatient[];
}

const PatientDetail = () => {
  const [patient, setPatient] = useState<IPatient>(emptyPatient);
  const { id } = useParams<{ id: string }>();
  const [aggregatedQuestionnaires, setAggregatedQuestionnaires] = useState<
    IAggregatedQuestionnaire[]
  >([]);
  useEffect(() => {
    if (!id) return;

    (async () => {
      const data: IPatient = await getPatientById(id);
      setPatient(data);
    })();
  }, [id]);

  useEffect(() => {
    if (!patient || !patient.questionnairesDoneByPatient) return;
    let aggregatedData: any[] = [];
    patient.questionnairesDoneByPatient.forEach((questionnaire: any) => {
      if (aggregatedData.length === 0) {
        aggregatedData.push({
          name: questionnaire.name,
          data: [questionnaire],
        });
      } else {
        let found = false;
        aggregatedData.forEach((aggregatedQuestionnaire: any) => {
          if (aggregatedQuestionnaire.name === questionnaire.name) {
            aggregatedQuestionnaire.data.push(questionnaire);
            found = true;
          }
        });
        if (!found) {
          aggregatedData.push({
            name: questionnaire.name,
            data: [questionnaire],
          });
        }
      }
    });
    console.log(aggregatedData);
    setAggregatedQuestionnaires(aggregatedData);
  }, [patient]);
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
                  <h2 className="text-2xl my-2 py-2">Přiřazené dotazníky</h2>
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
          <br />
          <hr />
          <br />
          <UpdatePatient updateablePatient={patient} />
          <br />
          {patient.questionnairesDoneByPatient &&
            patient.questionnairesDoneByPatient.length > 0 && (
              <div>
                <h2 className="text-2xl my-2 py-2">Analytika</h2>
                {aggregatedQuestionnaires.length > 0 && (
                  <div>
                    {aggregatedQuestionnaires.map(
                      (AGG: IAggregatedQuestionnaire) => (
                        <div key={AGG.name}>
                          <h3 className="text-xl">{AGG.name}</h3>
                          <hr />
                          <table className="table-auto w-full">
                            <tbody>
                              <tr>
                                <th className="border px-4 py-2 text-sm">
                                  Datum vyplnění
                                </th>
                                {AGG.data[0].questions.map((answer, index) => (
                                  <th
                                    key={index}
                                    className="border px-4 py-2 text-sm"
                                  >
                                    {answer}
                                  </th>
                                ))}
                              </tr>
                              {AGG.data.map(
                                (
                                  QUEST: IQuestionsDoneByPatient,
                                  index: number
                                ) => (
                                  <tr
                                    key={index}
                                    className="border px-4 py-2 text-sm text-center"
                                  >
                                    {QUEST.createdAt ? (
                                      <td className="border px-4 py-2 text-sm">
                                        {new Date(
                                          QUEST.createdAt
                                        ).toLocaleDateString()}
                                      </td>
                                    ) : (
                                      <td className="border px-4 py-2 text-sm">
                                        Datum nebylo vyplněno
                                      </td>
                                    )}
                                    {QUEST.questionsAndAnswers !== undefined &&
                                      QUEST.questionsAndAnswers?.length > 0 &&
                                      QUEST.questionsAndAnswers.map(
                                        (questionnaire: any, index: number) => (
                                          <td
                                            className="border px-4 py-2 text-sm"
                                            key={index}
                                          >
                                            {questionnaire.answer}
                                          </td>
                                        )
                                      )}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
      )}
      <br />
    </MainLayout>
  );
};

export default PatientDetail;
