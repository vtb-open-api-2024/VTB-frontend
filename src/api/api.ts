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

  getWallets() {
    return fetch(`${this._baseUrl}/portfolio`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

export const auth = new Auth({
  url: '',
});
