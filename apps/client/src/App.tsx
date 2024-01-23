//Default imports
import Navigation from "./components/GlobalComponents/Navigation";
import Success from "./components/GlobalComponents/Success";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Footer from "./components/GlobalComponents/Footer";
import Dashboard from "./routes/Dashboard";
//Named imports
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ISuccessGlobalState } from "./store/store";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import CreateQuestionnaire from "./routes/CreateQuestionnaire";
import GetQuestionnaires from "./routes/GetQuestionnaires";
import UpdateQuestionnaire from "./components/GlobalComponents/UpdateQuestionniare";
import CreatePatient from "./routes/CreatePatient";
import GetPatients from "./routes/GetPatients";
import PatientDetail from "./routes/PatientDetail";
import CreateQuestionnaireByPatient from "./routes/CreateQuestionnaireByPatient";
import Settings from "./routes/Settings";
import Export from "./routes/Export";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const showSuccess: boolean | undefined = useSelector(
    (state: ISuccessGlobalState) => {
      return state.success.showSuccess;
    }
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          {!isAuthenticated() ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <RequireAuth loginPath="/login">
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth loginPath="/login">
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/questionnaire/create"
                element={
                  <RequireAuth loginPath="/login">
                    <CreateQuestionnaire />
                  </RequireAuth>
                }
              />
              <Route
                path="/questionnaire/get"
                element={
                  <RequireAuth loginPath="/login">
                    <GetQuestionnaires />
                  </RequireAuth>
                }
              />
              <Route
                path="/questionnaire/:id"
                element={
                  <RequireAuth loginPath="/login">
                    <UpdateQuestionnaire />
                  </RequireAuth>
                }
              />
              <Route
                path="/patient/create"
                element={
                  <RequireAuth loginPath="/login">
                    <CreatePatient />
                  </RequireAuth>
                }
              />
              <Route
                path="/patient/get"
                element={
                  <RequireAuth loginPath="/login">
                    <GetPatients />
                  </RequireAuth>
                }
              />
              <Route
                path="/patient/:id"
                element={
                  <RequireAuth loginPath="/login">
                    <PatientDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="/patient/:id/questionnaire/:questionnaireId/create"
                element={
                  <RequireAuth loginPath="/login">
                    <CreateQuestionnaireByPatient />
                  </RequireAuth>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireAuth loginPath="/login">
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route
                path="/export"
                element={
                  <RequireAuth loginPath="/login">
                    <Export />
                  </RequireAuth>
                }
              />
            </>
          )}
        </Routes>
        {showSuccess && <Success />}
      </div>
      <Footer />
    </div>
  );
}
