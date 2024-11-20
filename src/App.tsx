import styles from './styles.module.css';
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
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from './redux/store';
import { auth } from './api/auth';
import { login, logout, setAuthError, setReferrer, setSignInError, setTokens } from './redux/authSlice';
import { History } from './func-pages/history-page/History';
import { useEffect, useRef } from 'react';
import { ExchangePage } from './func-pages/exchange-page/Exchange';
import { request } from './api/api';
import { PopUpCMP } from './components/pop-up/PopUp';
import { closePopUp, openPopUp, updatePopUpData } from './redux/popUpSlice';
import { addWallet, setWallets } from './redux/walletsSlice';
import { bindCardPopupData, inviteFriendPopupData } from './mockData';
import { ReceivePg } from './one-way-pages/receive-page/ReceivePage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // auth states
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authError = useSelector((state: RootState) => state.auth.authError);
  const passwordConfirmed = useSelector((state: RootState) => state.auth.passwordConfirmed);
  const tokens = useSelector((state: RootState) => state.auth.tokens);
  const passwordReferrer = useSelector((state: RootState) => state.auth.passwordReferrer);

  // user portfolios & wallets states
  const popUpData = useSelector((state: RootState) => state.popup.data);
  const isPopUpOpen = useSelector((state: RootState) => state.popup.isOpen);

  const moveTo = useNavigate();

  const popupRef = useRef<HTMLDivElement>(null);

  function handleSignInSubmit(number: string) {
    auth
      .getVerifCode({ phone: number })
      .then(() => {
        dispatch(setSignInError(false));
        moveTo('/auth');
      })
      .catch(() => {
        dispatch(setSignInError(true));
      })
      .finally(() => {
        // заглушка пока бэк не работает
        dispatch(setSignInError(false));
        moveTo('/auth');
      });
  }

  function handleAuthCodeSubmit(code: string) {
    auth
      .sendVerifCode(code)
      .then((tokens) => {
        setAuthError(false);
        dispatch(setTokens(tokens));
        if (passwordConfirmed) {
          moveTo('/psw-enter');
        } else {
          moveTo('/psw-create');
        }
      })
      .catch(() => {
        setAuthError(true);
        dispatch(logout());
      })
      .finally(() => {
        setAuthError(false);
        dispatch(setTokens({ accessToken: '', refreshToken: '' }));
        if (passwordConfirmed) {
          moveTo('/psw-enter');
        } else {
          moveTo('/psw-create');
        }
      });
  }

  // props to waypoint
  function handleLoggedByPassword() {
    if (passwordReferrer === 'login') {
      moveTo('/home');
      openBindCardPopup();
    }
    if (passwordReferrer === 'transaction') {
      moveTo('/transaction');
    }
  }

  function handleCreatePassword() {
    moveTo('/psw-enter');
  }

  function handleForgotPassword() {
    moveTo('/psw-create');
  }

  function validateToken() {
    return Promise.resolve();

    // if (tokens) {
    //   return auth
    //     .validateToken(tokens)
    //     .then((valid) => {
    //       if (valid) {
    //         dispatch(login())
    //       } else {
    //         auth.refreshToken(tokens).then((tokens) => {
    //           dispatch(setTokens(tokens))
    //           dispatch(login())
    //         }).catch(() => {
    //           dispatch(logout())
    //           console.log('error on refreshTokens')
    //         })
    //       }

    //     })
    //     .catch(() => {
    //       dispatch(logout());
    //     });
    // }

    return Promise.reject().then(
      () => {},
      () => {
        console.log('no tokens in localstorage');
      },
    );
  }

  function getWallets() {
    // todo: fix logics

    validateToken()
      .then(() => request.getWallets())
      .then((wallets) => {
        if (!wallets) {
          return true;
        }
        dispatch(setWallets(wallets));
        return false;
      })
      .then((emptywallets: boolean) => {
        if (emptywallets) return request.postWallet();
        return null;
      })
      .then((newWallet) => {
        if (newWallet !== null) {
          dispatch(addWallet(newWallet));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    validateToken();
    // TODO: ProtectedRoute for auth
    if (tokens && passwordConfirmed) {
      dispatch(login());
      dispatch(setReferrer('login'));
      moveTo('/psw-enter');
    } else if (tokens) {
      moveTo('/psw-create');
    } else {
      moveTo('/');
    }
  }, []);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    if (isAuthenticated) getWallets();
  }, [isAuthenticated]);

  function openBindCardPopup() {
    const isBind = sessionStorage.getItem('isCardBound');
    if (isBind) {
      return;
    } else {
      dispatch(updatePopUpData(bindCardPopupData));
      dispatch(openPopUp());
      sessionStorage.setItem('isCardBound', JSON.stringify(true));
    }
  }

  // setItem in sessionStorage after buy
  function openInviteFriensCardPopup() {
    const isBind = sessionStorage.getItem('isFriendsInvited');
    if (isBind) {
      return;
    } else {
      dispatch(updatePopUpData(inviteFriendPopupData));
      dispatch(openPopUp());
      sessionStorage.setItem('isFriendsInvited', JSON.stringify(true));
    }
  }

  function closePopup() {
    dispatch(closePopUp());
  }

  function handlePopupAction() {
    if (popUpData.type === 'bind') {
      dispatch(closePopUp());
      moveTo('/bind-card');
    }
    if (popUpData.type === 'invite') {
      dispatch(closePopUp());
      moveTo('/share-app');
    }
  }

  // closes popup on touch
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        dispatch(closePopUp());
        dispatch(
          updatePopUpData({
            waypoint: '',
            msg: '',
            desc: '',
            img: '',
            buttonText: '',
            minibuttonText: '',
            type: null,
          }),
        );
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopUpOpen]);

  function handleConfirmOperation() {
    dispatch(setReferrer('transaction'));
    moveTo('/confirm');
  }

  function transactionHandle() {
    moveTo('/home');
    openInviteFriensCardPopup();
  }

  return (
    <Provider store={store}>
      <div className="layout">
        <div ref={popupRef} className={styles.popUp + ' ' + (isPopUpOpen ? styles.popUpVisible : styles.popUpHidden)}>
          {isPopUpOpen && <PopUpCMP closePopup={closePopup} popupHandler={handlePopupAction} />}
        </div>
        <Routes>
          <Route path="/" element={<HeroPG waypoint={'/sign-up'} spareWaypoint={'/binding'} />} />
          <Route path="/binding" element={<LogInPage waypoint="/auth" spareWaypoint="/sign-up" />} />
          <Route path="/sign-up" element={<SignUpPage signInHandler={handleSignInSubmit} />} />
          <Route path="/auth" element={<AuthPage error={authError} authHandler={handleAuthCodeSubmit} />} />
          <Route path="/psw-create" element={<CreatePswPage handleCreatePassword={handleCreatePassword} />} />
          <Route
            path="/psw-enter"
            element={
              <PwdEntryPage
                handleLoggedByPassword={handleLoggedByPassword}
                handleForgotPassword={handleForgotPassword}
              />
            }
          />
          <Route path="/home" element={<MainPage />} />
          <Route path="/bind-card" element={<BindCardPage waypoint="/buy" spareWaypoint="/home" />} />
          <Route
            path="/buy"
            element={<BuyCryptoPage waypoint="/confirm" spareWaypoint="/home" confirmBuy={handleConfirmOperation} />}
          />
          <Route path="/exchange" element={<ExchangePage confirmExchange={handleConfirmOperation} />} />
          <Route
            path="/confirm"
            element={
              <PwdEntryPage
                handleLoggedByPassword={handleLoggedByPassword}
                handleForgotPassword={handleForgotPassword}
              />
            }
          />
          <Route path="/transaction" element={<TransActionPage transactionHandle={transactionHandle} />} />
          <Route path="/share-app" element={<ShareAppPG waypoint="/home" />} />
          <Route path="/history" element={<History />} />
          <Route path="/receive" element={<ReceivePg waypoint="/home" />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
