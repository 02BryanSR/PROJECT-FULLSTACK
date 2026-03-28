import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class Register {
    fb = inject(NonNullableFormBuilder);
    authService = inject(AuthService);
    toastService = inject(ToastService);
    router = inject(Router);
    isSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    registerForm = this.fb.group({
        name: this.fb.control('', [Validators.required]),
        lastName: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
    onSubmit() {
        if (this.isSubmitting()) {
            return;
        }
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        this.isSubmitting.set(true);
        const payload = this.registerForm.getRawValue();
        this.authService
            .register(payload)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
            next: () => {
                void this.router.navigate([this.authService.getHomeRoute()]);
            },
            error: (error) => {
                this.toastService.showError(error.error?.message ?? 'No se pudo completar el registro.');
            },
        });
    }
    static ɵfac = function Register_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Register)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Register, selectors: [["app-register"]], decls: 35, vars: 3, consts: [[1, "min-h-screen", "bg-neutral-100", "px-6", "py-10", "lg:px-10"], [1, "mx-auto", "flex", "min-h-[calc(100vh-5rem)]", "max-w-3xl", "flex-col", "justify-center", "rounded-2xl", "bg-white", "p-8", "shadow-[0_8px_24px_rgba(0,0,0,0.08)]", "lg:p-12"], [1, "text-sm", "font-medium", "uppercase", "tracking-wider", "text-primary-500"], [1, "mt-3", "text-[32px]", "font-semibold", "leading-10.5", "text-ink-900"], [1, "mt-4", "max-w-2xl", "text-sm", "text-neutral-600"], [1, "mt-8", "space-y-5", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-5", "md:grid-cols-2"], [1, "block"], [1, "mb-2", "block", "text-sm", "font-medium", "text-neutral-600"], ["type", "text", "formControlName", "name", 1, "w-full", "rounded-md", "border", "border-neutral-200", "px-4", "py-3", "text-sm", "focus:border-primary-500", "focus:outline-none"], ["type", "text", "formControlName", "lastName", 1, "w-full", "rounded-md", "border", "border-neutral-200", "px-4", "py-3", "text-sm", "focus:border-primary-500", "focus:outline-none"], ["type", "email", "formControlName", "email", 1, "w-full", "rounded-md", "border", "border-neutral-200", "px-4", "py-3", "text-sm", "focus:border-primary-500", "focus:outline-none"], ["type", "password", "formControlName", "password", 1, "w-full", "rounded-md", "border", "border-neutral-200", "px-4", "py-3", "text-sm", "focus:border-primary-500", "focus:outline-none"], [1, "mt-2", "block", "text-xs", "text-neutral-400"], ["type", "submit", 1, "inline-flex", "w-full", "items-center", "justify-center", "rounded-md", "bg-primary-500", "px-5", "py-3", "font-medium", "text-white", "transition-colors", "hover:bg-primary-700", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "mt-8", "flex", "flex-wrap", "gap-3"], ["routerLink", "/login", 1, "inline-flex", "items-center", "justify-center", "rounded-md", "border", "border-neutral-200", "px-5", "py-3", "font-medium", "text-neutral-600", "transition-colors", "hover:bg-neutral-100"], ["routerLink", "/forgot-password", 1, "inline-flex", "items-center", "justify-center", "rounded-md", "border", "border-neutral-200", "px-5", "py-3", "font-medium", "text-neutral-600", "transition-colors", "hover:bg-neutral-100"]], template: function Register_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "article", 1)(2, "p", 2);
            i0.ɵɵtext(3, "Auth");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1", 3);
            i0.ɵɵtext(5, "Crear cuenta");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtext(7, " Esta pantalla ya est\u00E1 conectada a tu backend y, cuando el registro sea correcto, iniciar\u00E1 sesi\u00F3n autom\u00E1ticamente y redirigir\u00E1 al \u00E1rea privada. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "form", 5);
            i0.ɵɵlistener("ngSubmit", function Register_Template_form_ngSubmit_8_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(9, "div", 6)(10, "label", 7)(11, "span", 8);
            i0.ɵɵtext(12, "Nombre");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "label", 7)(15, "span", 8);
            i0.ɵɵtext(16, "Apellidos");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "label", 7)(19, "span", 8);
            i0.ɵɵtext(20, "E-mail");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(21, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "label", 7)(23, "span", 8);
            i0.ɵɵtext(24, "Contrase\u00F1a");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(25, "input", 12);
            i0.ɵɵelementStart(26, "span", 13);
            i0.ɵɵtext(27, "M\u00EDnimo 6 caracteres.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "button", 14);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 15)(31, "a", 16);
            i0.ɵɵtext(32, " Volver a login ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "a", 17);
            i0.ɵɵtext(34, " Recuperar contrase\u00F1a ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("formGroup", ctx.registerForm);
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("disabled", ctx.isSubmitting());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting() ? "Creando cuenta..." : "Crear cuenta", " ");
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Register, [{
        type: Component,
        args: [{ selector: 'app-register', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: "<section class=\"min-h-screen bg-neutral-100 px-6 py-10 lg:px-10\">\n  <article\n    class=\"mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:p-12\"\n  >\n    <p class=\"text-sm font-medium uppercase tracking-wider text-primary-500\">Auth</p>\n    <h1 class=\"mt-3 text-[32px] font-semibold leading-10.5 text-ink-900\">Crear cuenta</h1>\n    <p class=\"mt-4 max-w-2xl text-sm text-neutral-600\">\n      Esta pantalla ya est\u00E1 conectada a tu backend y, cuando el registro sea correcto, iniciar\u00E1\n      sesi\u00F3n autom\u00E1ticamente y redirigir\u00E1 al \u00E1rea privada.\n    </p>\n\n    <form class=\"mt-8 space-y-5\" [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\n      <div class=\"grid gap-5 md:grid-cols-2\">\n        <label class=\"block\">\n          <span class=\"mb-2 block text-sm font-medium text-neutral-600\">Nombre</span>\n          <input\n            type=\"text\"\n            formControlName=\"name\"\n            class=\"w-full rounded-md border border-neutral-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none\"\n          />\n        </label>\n\n        <label class=\"block\">\n          <span class=\"mb-2 block text-sm font-medium text-neutral-600\">Apellidos</span>\n          <input\n            type=\"text\"\n            formControlName=\"lastName\"\n            class=\"w-full rounded-md border border-neutral-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none\"\n          />\n        </label>\n      </div>\n\n      <label class=\"block\">\n        <span class=\"mb-2 block text-sm font-medium text-neutral-600\">E-mail</span>\n        <input\n          type=\"email\"\n          formControlName=\"email\"\n          class=\"w-full rounded-md border border-neutral-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none\"\n        />\n      </label>\n\n      <label class=\"block\">\n        <span class=\"mb-2 block text-sm font-medium text-neutral-600\">Contrase\u00F1a</span>\n        <input\n          type=\"password\"\n          formControlName=\"password\"\n          class=\"w-full rounded-md border border-neutral-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none\"\n        />\n        <span class=\"mt-2 block text-xs text-neutral-400\">M\u00EDnimo 6 caracteres.</span>\n      </label>\n\n      <button\n        type=\"submit\"\n        [disabled]=\"isSubmitting()\"\n        class=\"inline-flex w-full items-center justify-center rounded-md bg-primary-500 px-5 py-3 font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60\"\n      >\n        {{ isSubmitting() ? 'Creando cuenta...' : 'Crear cuenta' }}\n      </button>\n    </form>\n\n    <div class=\"mt-8 flex flex-wrap gap-3\">\n      <a\n        routerLink=\"/login\"\n        class=\"inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-3 font-medium text-neutral-600 transition-colors hover:bg-neutral-100\"\n      >\n        Volver a login\n      </a>\n      <a\n        routerLink=\"/forgot-password\"\n        class=\"inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-3 font-medium text-neutral-600 transition-colors hover:bg-neutral-100\"\n      >\n        Recuperar contrase\u00F1a\n      </a>\n    </div>\n  </article>\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Register, { className: "Register", filePath: "src/app/features/register/register.ts", lineNumber: 17 }); })();
