import React from "react";
import {
  BsFillPlusCircleFill,
  BsListTask,
  BsPersonFillAdd,
  BsPersonLinesFill,
} from "react-icons/bs";
import MainLayout from "../components/Layouts/MainLayout";
import { Link } from "react-router-dom";
interface Props {}

const Dashboard: React.FC<Props> = ({}) => {
  return (
    <MainLayout>
      <div className="grid gap-2 grid-cols-12 justify-center align-middle">
        <div className="card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <Link to="/questionnaire/create">
            <div className="card-body block mx-auto">
              <h2 className="card-title text-center">Vytvořit nový dotazník</h2>
              <br />
              <BsFillPlusCircleFill
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  margin: "0 auto",
                }}
              />
            </div>
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <div className="card-body block mx-auto">
            <h2 className="card-title text-center mx-auto">
              Přejít na přehled dotazníků
            </h2>
            <br />
            <BsListTask
              style={{
                fontSize: "2rem",
                textAlign: "center",
                margin: "0 auto",
              }}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <div className="card-body block mx-auto">
            <h2 className="card-title text-center mx-auto">
              Vytvořit nového uživatele
            </h2>
            <br />
            <BsPersonFillAdd
              style={{
                fontSize: "2rem",
                textAlign: "center",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl col-span-3 hover:shadow-xl transition-all duration-700 hover:bg-slate-200 hover:cursor-pointer">
          <div className="card-body block mx-auto">
            <h2 className="card-title text-center mx-auto">Seznam uživatelů</h2>
            <br />
            <BsPersonLinesFill
              style={{
                fontSize: "2rem",
                textAlign: "center",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
