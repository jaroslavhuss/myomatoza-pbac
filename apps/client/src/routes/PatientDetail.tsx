import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import { emptyPatient } from "../Entities/defaults/patient.empty";
import {
  IPatient,
  IQuestionsDoneByPatient,
} from "../Entities/interfaces/patient.interface";
import { getPatientById, updatePatientById } from "../APIs/Patients";
import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { BsPlusCircle, BsTrash2Fill } from "react-icons/bs";
import UpdatePatient from "../components/GlobalComponents/UpdatePatient";
import { LineChart } from "@mui/x-charts";
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
    setAggregatedQuestionnaires(aggregatedData);
  }, [patient]);

  const updatePatient = async (updatedPatient: IPatient) => {
    if (!id) return;

    await updatePatientById(updatedPatient._id, updatedPatient).then(
      async () => {
        const data: IPatient = await getPatientById(id);
        setPatient(data);
      }
    );
  };

  const deleteQuestionnaireDoneByPatient = async (array: IQuestionnaire[]) => {
    const confirm = window.confirm(
      "Opravdu si přejete tento řádek smaza? Akce je nevratná"
    );
    if (!confirm) return;
    let newPatient = { ...patient };
    newPatient.questionnairesDoneByPatient = array;

    //@ts-ignore
    const arrayOfAssignedQuestionnaires: string[] =
      newPatient.assignedQuestionnaires
        ? //@ts-ignore
          newPatient.assignedQuestionnaires.map((q: IQuestionnaire) => q._id)
        : [];

    //@ts-ignore
    newPatient.assignedQuestionnaires = arrayOfAssignedQuestionnaires;
    if (!id) return;

    await updatePatientById(newPatient._id, newPatient).then(async () => {
      const data: IPatient = await getPatientById(id);
      setPatient(data);
    });
  };

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
          <UpdatePatient
            updateablePatient={patient}
            updatedPatient={updatePatient}
          />
          <br />
          {patient.questionnairesDoneByPatient &&
            patient.questionnairesDoneByPatient.length > 0 && (
              <div className="shadow-xl p-2 rounded-xl">
                <h2 className="text-2xl my-2 py-2 font-bold">
                  Výkon jednotlivých měření
                </h2>
                {aggregatedQuestionnaires.length > 0 && (
                  <div className="w-full overflow-scroll">
                    {aggregatedQuestionnaires.map(
                      (AGG: IAggregatedQuestionnaire) => (
                        <div key={AGG.name}>
                          <hr />
                          <h3 className="text-xl  my-2 py-2">{AGG.name}</h3>

                          <div className="grid gap-5 grid-cols-1 lg:grid-cols-1 my-5">
                            <div className="col-span-6 border-2">
                              <h4 className="text-center text-xl font-bold p-2 bg-green-200">
                                Součet {AGG.name}
                              </h4>
                              <LineChart
                                className="w-full"
                                xAxis={[
                                  {
                                    data:
                                      AGG.data.map((data) =>
                                        new Date(
                                          //@ts-ignore
                                          data.createdAt
                                        ).toLocaleDateString()
                                      ) || [],
                                    scaleType: "band",
                                  },
                                ]}
                                series={[
                                  {
                                    data:
                                      AGG.data.map(
                                        (data) => data.sum || null
                                      ) || [],
                                  },
                                ]}
                                yAxis={[
                                  {
                                    min: 0,
                                    max:
                                      AGG.data[0].questions.length *
                                      AGG.data[0].maxrange,
                                  },
                                ]}
                                width={window.innerWidth > 1280 ? 1280 : 800}
                                height={300}
                              />
                            </div>
                          </div>
                          <hr />
                          <table className="table-auto w-full">
                            <tbody>
                              <tr className="relative">
                                <th className="border px-4 py-2 text-sm">
                                  Datum vyplnění
                                </th>
                                <th className="border px-4 py-2 text-sm bg-green-100">
                                  Součet
                                </th>
                                {AGG.data[0].questions.map((answer, index) => (
                                  <th
                                    key={index}
                                    className="border px-4 py-2 text-sm"
                                  >
                                    {answer}
                                  </th>
                                ))}
                                <th className="border px-4 py-2 text-sm">
                                  Akce
                                </th>
                              </tr>
                              {AGG.data.map(
                                (
                                  QUEST: IQuestionsDoneByPatient,
                                  index: number
                                ) => (
                                  <tr
                                    key={index}
                                    className="border px-4 py-2 text-sm text-center relative"
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

                                    {QUEST.sum !== undefined ? (
                                      <td className="bg-green-100 font-bold">
                                        {QUEST.sum || QUEST.sum === 0}
                                      </td>
                                    ) : (
                                      <td className="bg-green-100 font-bold">
                                        chyba výpočtu
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
                                    <td
                                      className="group"
                                      onClick={() => {
                                        //Console.log current data inside of QUEST
                                        const filteredData =
                                          //@ts-ignore
                                          patient.questionnairesDoneByPatient.filter(
                                            (questionnaire) =>
                                              questionnaire !== QUEST
                                          );

                                        deleteQuestionnaireDoneByPatient(
                                          filteredData
                                        );
                                      }}
                                    >
                                      <BsTrash2Fill className="text-xl mx-auto group-hover:text-red-300" />
                                    </td>
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
