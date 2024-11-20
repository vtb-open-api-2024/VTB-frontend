/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tokens } from '../redux/authSlice';
import { Wallet } from '../types';

class Request {
  private _baseUrl: string;
  private tokens: Tokens | null;

  constructor({ url }: { url: string }) {
    this._baseUrl = url;
    const tokensExist = sessionStorage.getItem('tokens');
    this.tokens = tokensExist ? JSON.parse(tokensExist) : null;
  }

  _checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }

    // if (res.code === 401) return Promise.

    return Promise.reject(res).then(
      () => {},
      (err) => {
        throw err.json();
      },
    );
  }

  getWallets(portfolioId?: number) {
    const portflioUrlSuffix = portfolioId ? `?portfolioId=${portfolioId}` : '';

    return fetch(`${this._baseUrl}/portfolio${portflioUrlSuffix}`, {
      method: 'GET',
      headers: {
        Authorization: this._token(),
      },
    }).then(this._checkResponse);
  }

  postWallet(): Promise<Wallet> {
    const formdata = new FormData();
    const walletName = 'Wallet ' + new Date().toLocaleTimeString();
    formdata.append('title', walletName);

    return fetch(`${this._baseUrl}/portfolio`, {
      method: 'POST',
      headers: {
        Authorization: this._token(),
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    }).then(this._checkResponse);
  }

  _token(): string {
    return 'Bearer ' + this.tokens;
  }
}

export const request = new Request({
  url: 'https://cryp-to-rub.ru/api',
});
