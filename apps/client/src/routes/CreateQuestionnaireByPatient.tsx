import { useParams } from "react-router-dom";

const CreateQuestionnaireByPatient = () => {
  const { id, questionnaireId } = useParams<{
    id: string;
    questionnaireId: string;
  }>();
  return (
    <div>
      {id} - {questionnaireId}
    </div>
  );
};

export default CreateQuestionnaireByPatient;
