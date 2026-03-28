import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class ToastService {
    state = signal({
        visible: false,
        title: '',
        message: '',
    }, ...(ngDevMode ? [{ debugName: "state" }] : /* istanbul ignore next */ []));
    timeoutId = null;
    showError(message, duration = 4000) {
        this.show({
            title: 'Algo salio mal',
            message,
            duration,
        });
    }
    show(toast) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.state.set({
            visible: true,
            title: toast.title,
            message: toast.message,
        });
        this.timeoutId = setTimeout(() => {
            this.hide();
        }, toast.duration ?? 4000);
    }
    hide() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.state.update((current) => ({
            ...current,
            visible: false,
        }));
    }
    static ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
