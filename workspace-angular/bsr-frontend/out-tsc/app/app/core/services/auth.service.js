import { computed, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { AuthStorageService } from './auth-storage.service';
import * as i0 from "@angular/core";
export class AuthService {
    roleRedirects = {
        admin: '/home',
        user: '/home',
    };
    http = inject(HttpClient);
    router = inject(Router);
    authStorage = inject(AuthStorageService);
    currentUserState = signal(null, ...(ngDevMode ? [{ debugName: "currentUserState" }] : /* istanbul ignore next */ []));
    tokenState = signal(null, ...(ngDevMode ? [{ debugName: "tokenState" }] : /* istanbul ignore next */ []));
    currentUser = this.currentUserState.asReadonly();
    token = this.tokenState.asReadonly();
    isAuthenticated = computed(() => !!this.tokenState() && !!this.currentUserState(), ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
    isAdmin = computed(() => this.currentUserState()?.rol === 'admin', ...(ngDevMode ? [{ debugName: "isAdmin" }] : /* istanbul ignore next */ []));
    isUser = computed(() => this.currentUserState()?.rol === 'user', ...(ngDevMode ? [{ debugName: "isUser" }] : /* istanbul ignore next */ []));
    sessionStatus = computed(() => {
        const token = this.tokenState();
        const user = this.currentUserState();
        if (!token || !user) {
            return 'anonymous';
        }
        return this.isTokenExpired(token) ? 'expired' : 'authenticated';
    }, ...(ngDevMode ? [{ debugName: "sessionStatus" }] : /* istanbul ignore next */ []));
    constructor() {
        this.restoreSession();
    }
    login(credentials) {
        return this.http.post(API_ENDPOINTS.auth.login, credentials).pipe(switchMap(({ token }) => this.authenticateWithToken(token)));
    }
    register(payload) {
        return this.http.post(API_ENDPOINTS.auth.register, payload).pipe(switchMap(({ token }) => this.authenticateWithToken(token)));
    }
    logout(options = {}) {
        const { redirectToLogin = true, redirectToPath } = options;
        this.authStorage.clear();
        this.tokenState.set(null);
        this.currentUserState.set(null);
        if (redirectToPath) {
            void this.router.navigate([redirectToPath]);
            return;
        }
        if (redirectToLogin) {
            void this.router.navigate(['/login']);
        }
    }
    getToken() {
        return this.tokenState();
    }
    getCurrentRole() {
        return this.currentUserState()?.rol ?? null;
    }
    hasRole(role) {
        return this.currentUserState()?.rol === role;
    }
    hasAnyRole(roles) {
        const role = this.currentUserState()?.rol;
        if (!role) {
            return false;
        }
        return roles.includes(role);
    }
    getHomeRoute() {
        const role = this.currentUserState()?.rol;
        if (!role) {
            return '/home';
        }
        return this.roleRedirects[role];
    }
    restoreSession() {
        const token = this.authStorage.getToken();
        const user = this.authStorage.getUser();
        if (!token || this.isTokenExpired(token)) {
            this.authStorage.clear();
            this.tokenState.set(null);
            this.currentUserState.set(null);
            return;
        }
        this.tokenState.set(token);
        if (user) {
            this.currentUserState.set(user);
            return;
        }
        this.fetchCurrentUser().subscribe({
            next: (currentUser) => {
                this.authStorage.setUser(currentUser);
                this.currentUserState.set(currentUser);
            },
            error: () => {
                this.logout({ redirectToLogin: false });
            },
        });
    }
    setSession(token, user) {
        this.authStorage.setToken(token);
        this.authStorage.setUser(user);
        this.tokenState.set(token);
        this.currentUserState.set(user);
    }
    isTokenExpired(token) {
        const payload = this.getTokenPayload(token);
        const expirationTime = payload?.exp;
        if (typeof expirationTime !== 'number') {
            return false;
        }
        return expirationTime * 1000 <= Date.now();
    }
    getTokenPayload(token) {
        const [, payload] = token.split('.');
        if (!payload) {
            return null;
        }
        try {
            const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = atob(normalizedPayload);
            return JSON.parse(decodedPayload);
        }
        catch {
            return null;
        }
    }
    authenticateWithToken(token) {
        this.authStorage.setToken(token);
        this.tokenState.set(token);
        return this.fetchCurrentUser().pipe(tap((user) => this.setSession(token, user)), catchError((error) => {
            this.logout({ redirectToLogin: false });
            return throwError(() => error);
        }));
    }
    fetchCurrentUser() {
        return this.http.get(API_ENDPOINTS.auth.me).pipe(map((response) => this.mapUserInfoResponse(response)));
    }
    mapUserInfoResponse(response) {
        return {
            id: null,
            email: response.email,
            nombre: response.nombre ?? response.firstName ?? response.name ?? null,
            apellidos: response.apellidos ?? response.lastName ?? null,
            rol: this.mapRole(response.role),
            telefono: response.telefono ?? response.phone ?? null,
            avatarUrl: response.avatarUrl ?? null,
        };
    }
    mapRole(role) {
        if (!role) {
            return 'user';
        }
        return role.includes('ADMIN') ? 'admin' : 'user';
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [], null); })();
