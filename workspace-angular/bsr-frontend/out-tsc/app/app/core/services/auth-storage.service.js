import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AuthStorageService {
    tokenKey = 'vibood.auth.token';
    userKey = 'vibood.auth.user';
    get storage() {
        if (typeof localStorage === 'undefined') {
            return null;
        }
        return localStorage;
    }
    getToken() {
        return this.read(this.tokenKey);
    }
    setToken(token) {
        this.write(this.tokenKey, token);
    }
    removeToken() {
        this.remove(this.tokenKey);
    }
    getUser() {
        const user = this.read(this.userKey);
        if (!user) {
            return null;
        }
        try {
            return JSON.parse(user);
        }
        catch {
            this.remove(this.userKey);
            return null;
        }
    }
    setUser(user) {
        this.write(this.userKey, JSON.stringify(user));
    }
    removeUser() {
        this.remove(this.userKey);
    }
    clear() {
        this.removeToken();
        this.removeUser();
    }
    read(key) {
        try {
            return this.storage?.getItem(key) ?? null;
        }
        catch {
            return null;
        }
    }
    write(key, value) {
        try {
            this.storage?.setItem(key, value);
        }
        catch {
            this.remove(key);
        }
    }
    remove(key) {
        try {
            this.storage?.removeItem(key);
        }
        catch { }
    }
    static ɵfac = function AuthStorageService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthStorageService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthStorageService, factory: AuthStorageService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
