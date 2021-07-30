import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/api-actions';
import ErrorMessage from '../error-message/error-message';
import {getAuthorizationErrorCode} from '../../store/user/selectors';
import {nullifyAuthorizationErrorCode} from '../../store/action';


const CORRECT_EMAIL_REGEXP =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function SignIn() {
  const errorCode = useSelector(getAuthorizationErrorCode);

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [signInErrorMessage, setSignInErrorMessage] = useState(null);
  const emailErrorMessage = {field: 'email', text: 'Please enter a valid email address'};
  const passwordErrorMessage = {field: 'password', text: 'Please enter a password'};

  const emailErrorClass = signInErrorMessage?.field === 'email'
    ? 'sign-in__field--error' : '';
  const passwordErrorClass = signInErrorMessage?.field === 'password'
    ? 'sign-in__field--error' : '';

  const $signInErrorMessage = (
    <div className="sign-in__message">
      <p>{signInErrorMessage?.text}</p>
    </div>
  );

  const dispatch = useDispatch();

  const handleLoginValueChange = (evt) => {
    evt.preventDefault();
    setLoginValue(evt.target.value.replace(/ /g, ''));
  };

  const handlePasswordValueChange = (evt) => {
    evt.preventDefault();
    setPasswordValue(evt.target.value.replace(/ /g, ''));
  };

  const hangleSignInFormSubmit = (evt) => {
    evt.preventDefault();

    if (!loginValue.match(CORRECT_EMAIL_REGEXP)) {
      setSignInErrorMessage(emailErrorMessage);
      return;
    }

    if (!passwordValue.length) {
      setSignInErrorMessage(passwordErrorMessage);
      return;
    }

    dispatch(nullifyAuthorizationErrorCode());
    dispatch(login({
      login: loginValue,
      password: passwordValue,
    }));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title" data-testid="page-title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={hangleSignInFormSubmit}
          noValidate
        >
          {signInErrorMessage && $signInErrorMessage}
          <div className="sign-in__fields">
            <div
              className={`sign-in__field ${emailErrorClass}`}
            >
              <input
                onInput={(evt) => {
                  setSignInErrorMessage(null);
                  handleLoginValueChange(evt);
                }}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="user-email"
                value={loginValue}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
              Email address
              </label>
            </div>
            <div
              className={`sign-in__field ${passwordErrorClass}`}
            >
              <input
                onInput={(evt) => {
                  setSignInErrorMessage(null);
                  handlePasswordValueChange(evt);
                } }
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="user-password"
                value={passwordValue}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
              Password
              </label>
            </div>

          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
          {errorCode ? <ErrorMessage errorCode={errorCode} /> : ''}
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
