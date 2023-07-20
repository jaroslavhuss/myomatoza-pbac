//Default imports
import Navigation from "./components/GlobalComponents/Navigation";
import Success from "./components/GlobalComponents/Success";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

//Named imports
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ISuccessGlobalState } from "./store/store";
import Footer from "./components/GlobalComponents/Footer";

export default function App() {
  const showSuccess: boolean | undefined = useSelector(
    (state: ISuccessGlobalState) => {
      return state.success.showSuccess;
    }
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      <div className="flex-1">
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {showSuccess && <Success />}
        <Footer />
      </div>
    </div>
  );
}
