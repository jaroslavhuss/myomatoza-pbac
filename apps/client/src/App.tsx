//Default imports
import Navigation from "./components/GlobalComponents/Navigation";
import Success from "./components/GlobalComponents/Success";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

//Named imports
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ISuccessGlobalState } from "./store/store";

export default function App() {
  const showSuccess: boolean | undefined = useSelector(
    (state: ISuccessGlobalState) => {
      return state.success.showSuccess;
    }
  );

  return (
    <div className="max-w-7xl mx-auto px-2">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login name="Title" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {showSuccess && <Success />}
    </div>
  );
}
