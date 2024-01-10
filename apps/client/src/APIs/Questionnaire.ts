import { IQuestionnaire } from "../Entities/interfaces/questionnaireDocument.interface";
import { store } from "../store/store";
import { formatErrorMessage } from "../utils/FormatError";
import { GLOBAL_URL } from "../GLOBAL_URL";
import { setError } from "../store/gsms/errorSlice";
import { setSuccess } from "../store/gsms/successSlice";
export const createQuestionnaire = async (questionnaire: IQuestionnaire) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      store.dispatch(
        setError({
          message: "Něco je v nepořádku s Vaším přihlášením",
          rawData: "Odhlašte se a přihlašte znovu",
        })
      );

      return;
    }
    const response: Response = await fetch(GLOBAL_URL + "/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(questionnaire),
    });

    const data = await response.json();

    store.dispatch(
      setSuccess({
        message: "Dotazník byl úspěšně vytvořen",
        rawData: data,
      })
    );
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};
