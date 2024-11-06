type Phone = { phone: string };

type Tokens = {
  accessToken: string,
  refreshToken: string
}

class Auth {
  private _baseUrl: string;

  constructor({ url }: { url: string }) {
    this._baseUrl = url;
  }

  _checkResponse(res: any) {
    if (res.ok) {
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

  refreshToken() {
    return fetch(`${this._baseUrl}/auth/refresh-token`, {
      method: 'GET',
      redirect: 'follow',
    }).then(this._checkResponse);
    // TODO: if refresh succeed, set localstorage Tokens, else clear localstorage
  }
}

export const auth = new Auth({
  url: 'https://cryp-to-rub.ru/api',
});
