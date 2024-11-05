import { Routes, Route } from 'react-router-dom';
import './App.css';
import { HeroPG } from './one-way-pages/hero-page/HeroPG';
import { LogInPage } from './one-way-pages/log-in-page/LogInPage';
import { SignUpPage } from './one-way-pages/sign-up-page/SignUpPage';
import { CreatePswPage } from './one-way-pages/create-psw-page/CreatePswPage';
import { PwdEntryPage } from './one-way-pages/create-psw-page/PwdEntryPage';
import { MainPage } from './func-pages/main-page/MainPage';
import { AuthPage } from './one-way-pages/auth-page/AuthPage';
import { BindCardPage } from './one-way-pages/bind-card-page/BindCardPage';
import { BuyCryptoPage } from './func-pages/buy-page/BuyCryptoPage';
import { TransActionPage } from './one-way-pages/tansaction-approvedORrejected-page/TranSactionPage';
import { ShareAppPG } from './one-way-pages/share-app/ShareAppPage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, store } from './redux/store';
import { auth } from './api/auth';
import { login, logout, selectIsAuthenticated, selectUsername } from './redux/authSlice';
import { History } from './func-pages/history-page/History';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(selectUsername);

  function handleSignInSubmit(number: string) {
    auth
      .getVerifCode({ phone: number })
      .then((res: string) => {
        console.log(res);
        dispatch(login(res));
      })
      .catch(() => {
        dispatch(logout());
      });
  }

  function handleAuthCodeSubmit(code: string) {
    auth.sendVerifCode(code);
  }

  function handleSignOut() {

  }

  return (
    <Provider store={store}>
      <div className="layout">
        <Routes>
          <Route path="/" element={<HeroPG waypoint={'/sign-up'} spareWaypoint={'/binding'} />} />
          <Route path="/binding" element={<LogInPage waypoint="/auth" spareWaypoint="/sign-up" />} />
          <Route
            path="/sign-up"
            element={<SignUpPage waypoint="/auth" spareWaypoint="/binding" signInHandler={handleSignInSubmit} />}
          />
          <Route path="/auth" element={<AuthPage waypoint="/psw-create" authHandler={handleAuthCodeSubmit} />} />
          <Route path="/psw-create" element={<CreatePswPage waypoint="/psw-enter" />} />
          <Route path="/psw-enter" element={<PwdEntryPage waypoint="/home" />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/bind-card" element={<BindCardPage waypoint="/buy" spareWaypoint="/home" />} />
          <Route path="/buy" element={<BuyCryptoPage waypoint="/confirm" spareWaypoint="/home" />} />
          <Route
            path="/confirm"
            element={<AuthPage waypoint="/transaction" spareWaypoint="/buy" authHandler={handleAuthCodeSubmit} />}
          />
          <Route path="/transaction" element={<TransActionPage waypoint="/home" />} />
          <Route path="/share-app" element={<ShareAppPG waypoint="/home" />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
