type Phone = { phone: string };

type SignupData = Phone & { name: string };

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

  signup({ phone, name }: SignupData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        name: name,
      }),
    }).then(this._checkResponse);
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

  sendVerifCode(code: string) {
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

}

export const auth = new Auth({
  url: 'https://cryp-to-rub.ru/api',
});
