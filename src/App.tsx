import { Routes, Route, useNavigate } from 'react-router-dom';
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
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './redux/store';
import { auth } from './api/auth';
import { login, logout } from './redux/authSlice';
import { History } from './func-pages/history-page/History';
import { useEffect, useState } from 'react';
import { ExchangePage } from './func-pages/exchange-page/Exchange';
import { request } from './api/api';
import { CurrencyEnum, Wallet } from './types';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const username = useSelector(selectUsername);

  const firstWallet: Wallet = {
    id: '0',
    name: 'Mock Wallet',
    currensies: [
      {
        currency: {
          currency: CurrencyEnum.BTC,
          cource: 100,
        },
        ammount: 100,
      },
      {
        currency: {
          currency: CurrencyEnum.ETC,
          cource: 100,
        },
        ammount: 0.45,
      },
    ],
  };

  const moveTo = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([firstWallet]);

  function handleSignInSubmit(number: string) {
    auth
      .getVerifCode({ phone: number })
      .then((res: string) => {
        setSignInError(false);
        moveTo('/auth');
        dispatch(login(res));
      })
      .catch(() => {
        setSignInError(true);
        dispatch(logout());
      });
  }

  function handleAuthCodeSubmit(code: string) {
    auth
      .sendVerifCode(code)
      .then((tokens) => {
        setAuthError(false);
        localStorage.setItem('tokens', JSON.stringify(tokens));
        moveTo('/psw-create');
      })
      .catch(() => {
        setAuthError(true);
      });
  }

  function getWallets() {
    // todo: fix logics
    request
      .getWallets(0)
      .then((wallets) => {
        console.log(wallets);
        if (!wallets) {
          return true;
        }
        setWallets(wallets);
        return false;
      })
      .then((emptywallets: boolean) => {
        if (emptywallets) return request.postWallet();
        return null;
      })
      .then((newWallet) => {
        if (newWallet !== null) {
          setWallets([...wallets, newWallet]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (localStorage.getItem('tokens')) {
    getWallets()
  }

  useEffect(() => {
    // TODO: ProtectedRoute for auth
    if (localStorage.getItem('tokens')) {
      setLoggedIn(true)
      moveTo('/psw-enter')
    } else {
      moveTo('/')
    }
  }, [])

  return (
    <Provider store={store}>
      <div className="layout">
        <Routes>
          <Route path="/" element={<HeroPG waypoint={'/sign-up'} spareWaypoint={'/binding'} />} />
          <Route path="/binding" element={<LogInPage waypoint="/auth" spareWaypoint="/sign-up" />} />
          <Route path="/sign-up" element={<SignUpPage error={signInError} signInHandler={handleSignInSubmit} />} />
          <Route path="/auth" element={<AuthPage error={authError} authHandler={handleAuthCodeSubmit} />} />
          <Route path="/psw-create" element={<CreatePswPage waypoint="/psw-enter" />} />
          <Route path="/psw-enter" element={<PwdEntryPage waypoint="/home" />} />
          <Route path="/home" element={<MainPage wallets={wallets} />} />
          <Route path="/bind-card" element={<BindCardPage waypoint="/buy" spareWaypoint="/home" />} />
          <Route path="/buy" element={<BuyCryptoPage waypoint="/confirm" spareWaypoint="/home" />} />
          <Route path="/exchange" element={<ExchangePage waypoint="/confirm" spareWaypoint="/home"></ExchangePage>} />
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
