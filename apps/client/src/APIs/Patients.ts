import { IPatient } from "../Entities/interfaces/patient.interface";
import { store } from "../store/store";
import { formatErrorMessage } from "../utils/FormatError";
import { GLOBAL_URL } from "../GLOBAL_URL";
import { setError } from "../store/gsms/errorSlice";
import { setSuccess } from "../store/gsms/successSlice";

export const createPatient = async (patient: IPatient) => {
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
    const response: Response = await fetch(GLOBAL_URL + "/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(patient),
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

//Get all patients
export const getAllPatients = async () => {
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
    const response: Response = await fetch(GLOBAL_URL + "/patient", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const getPatientById = async (id: string) => {
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
    const response: Response = await fetch(GLOBAL_URL + "/patient/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};

export const deletePatientById = async (id: string) => {
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
    const response: Response = await fetch(GLOBAL_URL + "/patient/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();
    store.dispatch(
      setSuccess({
        message: "Pacient byl úspěšně smazán",
        rawData: data,
      })
    );
    return data;
  } catch (error: any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
};
