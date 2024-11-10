import { Tokens } from '../redux/authSlice';

type Phone = { phone: string };

class Auth {
  private _baseUrl: string;

  constructor({ url }: { url: string }) {
    this._baseUrl = url;
  }

  _checkResponse(res: any) {
    console.log(res);

    if (res.ok) {
      if (res.url.indexOf('send-code') !== -1) return {};
      return res.json();
    }

    return Promise.reject(res).then(
      () => {},
      (err) => {
        throw err.json();
      },
    );
  }

  getVerifCode({ phone }: Phone) {
    const formData = new FormData();
    formData.append('phone', phone);

    const myHeaders = new Headers();
    myHeaders.append('accept', '*/*');

    return fetch(`${this._baseUrl}/auth/send-code`, {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    }).then(this._checkResponse);
  }

  sendVerifCode(code: string): Promise<Tokens> {
    const myHeaders = new Headers();
    myHeaders.append('accept', '*/*');

    const formdata = new FormData();
    formdata.append('code', code);

    return fetch(`${this._baseUrl}/auth/confirm-code`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }).then(this._checkResponse);
  }

  validateToken(tokens: Tokens) {
    const myHeaders = new Headers();
    myHeaders.append('accept', '*/*');
    myHeaders.append('Authorization', `Bearer ${tokens.accessToken}`);

    return fetch(`${this._baseUrl}/auth/validate-token`, {
      method: 'GET',
      headers: myHeaders,
    }).then(this._checkResponse);
  }

  refreshToken(tokens: Tokens) {
    const myHeaders = new Headers();
    myHeaders.append('accept', '*/*');
    myHeaders.append('Authorization', `Bearer ${tokens.accessToken}`);

    return fetch(`${this._baseUrl}/auth/refresh-token`, {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    }).then(this._checkResponse);
  }
}

export const auth = new Auth({
  url: 'https://cryp-to-rub.ru/api',
});
