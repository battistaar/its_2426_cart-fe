import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  protected tokenStorageKey = 'authToken';
  protected refreshStorageKey = 'authRefreshToken';

  getPayload<T>() {
    const authTokens = this.getToken();
    if (!authTokens) {
      return null;
    }
    return jwtDecode<T>(authTokens.token);
  }

  areTokensValid() {
    const authTokens = this.getToken();
    if (!authTokens) {
      return false;
    }
    const decoded = jwtDecode(authTokens.refreshToken);
    return !decoded.exp || decoded.exp * 1000 > Date.now();
  }

  getToken(): {token: string, refreshToken: string} | null {
    const token =  localStorage.getItem(this.tokenStorageKey);
    const refreshToken =  localStorage.getItem(this.refreshStorageKey);

    if (!(token && refreshToken)){
      this.removeToken();
      return null;
    }

    return {
      token,
      refreshToken
    };
  }

  setToken(token: string, refreshToken: string) {
    localStorage.setItem(this.tokenStorageKey, token);
    localStorage.setItem(this.refreshStorageKey, refreshToken);
  }

  removeToken() {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.refreshStorageKey);
  }
}
