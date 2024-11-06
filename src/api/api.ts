import { Wallet } from "../types";
import { auth } from "./auth";

class Request {
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
        if (err.code === 401) auth.refreshToken()
        throw err.json();
      },
    );
  }

  getWallets(portfolioId: number) {
    return fetch(`${this._baseUrl}/portfolio?portfolioId=${portfolioId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this._token()
      },
    }).then(this._checkResponse);
  }

  postWallet(): Promise<Wallet> {
    const formdata = new FormData();
    const walletName = 'Wallet ' + (new Date()).toLocaleTimeString()
    formdata.append('title', walletName);

    return fetch(`${this._baseUrl}/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': this._token(),
        'Content-Type': 'multipart/form-data'
      },
      body: formdata,
    }).then(this._checkResponse)
  }

  _token(): string {
    return 'Bearer ' + JSON.parse(localStorage.getItem('tokens') ?? '')
  }
}

export const request = new Request({
  url: 'https://cryp-to-rub.ru/api',
});
