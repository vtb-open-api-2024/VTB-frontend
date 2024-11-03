import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LayoutComponent } from "./components/layout/LayoutComponent";
import { HeroPG } from "./one-way-pages/hero-page/HeroPG";
import { LogInPage } from "./one-way-pages/log-in-page/LogInPage";
import { SignUpPage } from "./one-way-pages/sign-up-page/SignUpPage";
import { CreatePswPage } from "./one-way-pages/create-psw-page/CreatePswPage";
import { PwdEntryPage } from "./one-way-pages/create-psw-page/PwdEntryPage";
import { MainPage } from "./func-pages/main-page/MainPage";
import { AuthPage } from "./one-way-pages/auth-page/AuthPage";
import { BindCardPage } from "./one-way-pages/bind-card-page/BindCardPage";
import { BuyCryptoPage } from "./func-pages/buy-page/BuyCryptoPage";
import { TransActionPage } from "./one-way-pages/tansaction-approvedORrejected-page/TranSactionPage";
import { ShareAppPG } from "./one-way-pages/share-app/ShareAppPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/vtb-hack-2024/" element={<LayoutComponent />}>
          <Route
            path="/vtb-hack-2024/"
            element={
              <HeroPG
                waypoint={"/vtb-hack-2024/sign-up"}
                spareWaypoint={"/vtb-hack-2024/login"}
              />
            }
          />
          <Route
            path="/vtb-hack-2024/login"
            element={
              <LogInPage
                waypoint="/vtb-hack-2024/auth"
                spareWaypoint="/vtb-hack-2024/sign-up"
              />
            }
          ></Route>
          <Route
            path="/vtb-hack-2024/sign-up"
            element={
              <SignUpPage
                waypoint="/vtb-hack-2024/auth"
                spareWaypoint="/vtb-hack-2024/login"
              />
            }
          ></Route>
          <Route
            path="/vtb-hack-2024/auth"
            element={<AuthPage waypoint="/vtb-hack-2024/psw-create" />}
          ></Route>
          <Route
            path="/vtb-hack-2024/psw-create"
            element={<CreatePswPage waypoint="/vtb-hack-2024/psw-enter" />}
          ></Route>
          <Route
            path="/vtb-hack-2024/psw-enter"
            element={<PwdEntryPage waypoint="/vtb-hack-2024/home" />}
          ></Route>
          <Route path="/vtb-hack-2024/home" element={<MainPage />}></Route>
          <Route
            path="/vtb-hack-2024/bind-card"
            element={
              <BindCardPage
                waypoint="/vtb-hack-2024/buy"
                spareWaypoint="/vtb-hack-2024/home"
              />
            }
          ></Route>
          <Route
            path="/vtb-hack-2024/buy"
            element={
              <BuyCryptoPage
                waypoint="/vtb-hack-2024/confirm"
                spareWaypoint="/vtb-hack-2024/home"
              />
            }
          ></Route>
          <Route
            path="/vtb-hack-2024/confirm"
            element={
              <AuthPage
                waypoint="/vtb-hack-2024/transaction"
                spareWaypoint="/vtb-hack-2024/buy"
              />
            }
          ></Route>
          <Route
            path="/vtb-hack-2024/transaction"
            element={<TransActionPage waypoint="/vtb-hack-2024/home" />}
          ></Route>
          <Route
            path="/vtb-hack-2024/share-app"
            element={<ShareAppPG waypoint="/vtb-hack-2024/home" />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
