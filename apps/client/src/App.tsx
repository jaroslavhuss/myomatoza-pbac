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
import Page404 from "./routes/404";
import MyomatosysQuestionnaire from "./routes/MyomatQuestion";
import PBAC from "./routes/PBAC";

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
          {
            !isAuthenticated() ? (<>
              <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 />} />
            </>
            
            ):<>
             <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Dashboard />} />
          <Route path="/register" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
            </>
          }
        
          <Route path="/dashboard" element={<RequireAuth loginPath="/login"><Dashboard /></RequireAuth>}/>
          <Route path="/questionnaire-myoms" element={<RequireAuth loginPath="/login"><MyomatosysQuestionnaire /></RequireAuth>}/>
          <Route path="/pbac" element={<RequireAuth loginPath="/login"><PBAC /></RequireAuth>}/>
       
        </Routes>
        {showSuccess && <Success />}

      </div>
      <Footer />
    </div>
  );
}
