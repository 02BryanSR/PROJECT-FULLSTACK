import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { IconComponent } from '../../shared/components/icon/icon';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function Login_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.emailCtrl.errors == null ? null : ctx_r0.emailCtrl.errors["required"]) ? "El email es obligatorio." : (ctx_r0.emailCtrl.errors == null ? null : ctx_r0.emailCtrl.errors["email"]) ? "El formato del e-mail no es valido." : "", " ");
} }
function Login_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵelement(1, "app-icon", 25);
    i0.ɵɵelementEnd();
} }
function Login_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (ctx_r0.passwordCtrl.errors == null ? null : ctx_r0.passwordCtrl.errors["required"]) ? "La contrasena es obligatoria." : "", " ");
} }
export class Login {
    fb = inject(NonNullableFormBuilder);
    router = inject(Router);
    authService = inject(AuthService);
    toastService = inject(ToastService);
    showPassword = signal(false, ...(ngDevMode ? [{ debugName: "showPassword" }] : /* istanbul ignore next */ []));
    isSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required]),
    });
    constructor() {
        if (this.authService.isAuthenticated()) {
            void this.router.navigate([this.authService.getHomeRoute()]);
        }
    }
    get emailCtrl() {
        return this.loginForm.controls.email;
    }
    get passwordCtrl() {
        return this.loginForm.controls.password;
    }
    get emailValid() {
        return this.emailCtrl.valid && this.emailCtrl.dirty;
    }
    get passwordValid() {
        return this.passwordCtrl.valid && this.passwordCtrl.dirty;
    }
    togglePassword() {
        this.showPassword.update((value) => !value);
    }
    onSubmit() {
        if (this.isSubmitting()) {
            return;
        }
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.isSubmitting.set(true);
        const credentials = this.loginForm.getRawValue();
        this.authService
            .login(credentials)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
            next: () => {
                void this.router.navigate([this.authService.getHomeRoute()]);
            },
            error: (error) => {
                this.toastService.showError(error.error?.message ?? 'Ha ocurrido un error. Intentalo de nuevo.');
            },
        });
    }
    static ɵfac = function Login_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Login)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Login, selectors: [["app-login"]], decls: 37, vars: 11, consts: [[1, "relative", "grid", "min-h-screen", "grid-cols-1", "items-center", "overflow-visible", "bg", "lg:h-screen", "lg:grid-cols-[1fr_1fr]"], [1, "relative", "z-10", "hidden", "justify-center", "items-center", "lg:flex", "lg:min-h-0", "lg:p-0"], ["src", "/images/portada.png", "alt", "background", 1, "max-h-[60vh]", "w-auto", "max-w-none", "rounded-3xl", "object-left"], [1, "relative", "z-10", "flex", "min-h-screen", "items-start", "justify-center", "px-8", "py-9.5", "lg:min-h-0", "lg:items-center", "lg:p-0"], [1, "flex", "max-h-233", "w-full", "max-w-90", "flex-col", "lg:max-h-125"], [1, "flex", "flex-col", "items-center", "text-center"], [1, "text-center", "text-[32px]", "font-semibold", "leading-10.5", "text-ink-900"], [1, "mx-auto", "w-68.75", "text-center", "text-neutral-250", "sm:w-auto", "lg:hidden"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "mt-16", "flex", "items-center", "justify-between", "lg:mt-8"], [1, "mt-16", "block", "text-[15px]", "font-medium", "lg:mt-8", 3, "ngClass"], [1, "ml-3", "whitespace-nowrap", "text-sm", "text-danger-600"], [1, "flex", "items-center", "border-b", 3, "ngClass"], ["type", "email", "formControlName", "email", "placeholder", "usuario@gmail.com", 1, "w-full", "py-3", "text-sm", "placeholder:text-neutral-300", "focus:outline-none"], [1, "ml-2", "flex", "h-5", "w-5", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-primary-300", "lg:bg-primary-500"], [1, "flex", "items-center", "justify-between"], [1, "block", "text-[15px]", "font-medium", 3, "ngClass"], ["formControlName", "password", "placeholder", "Introduce aqui tu contrasena", 1, "w-full", "py-3", "text-sm", "placeholder:text-neutral-300", "focus:outline-none", 3, "type"], ["type", "button", "aria-label", "Mostrar u ocultar contrasena", 1, "ml-2", "text-neutral-300", "hover:text-neutral-400", 3, "click"], ["name", "eye", 1, "h-4", "w-4"], ["type", "submit", 1, "mt-13", "flex", "h-11.75", "w-full", "items-center", "justify-center", "rounded-md", "bg-primary-300", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", "lg:mx-auto", "lg:mt-8.5", "lg:w-68.75", "lg:bg-primary-500", 3, "disabled"], [1, "flex", "justify-center"], ["routerLink", "/forgot-password", 1, "text-sm", "text-primary-500", "transition-colors", "hover:text-primary-700", "hover:underline"], [1, "text-center", "text-sm", "text-neutral-600"], ["routerLink", "/register", 1, "font-medium", "text-primary-500", "transition-colors", "hover:text-primary-700", "hover:underline"], ["name", "icon-check", 1, "h-3", "w-3", "text-white"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "section", 1);
            i0.ɵɵelement(2, "img", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "section", 3)(4, "article", 4)(5, "header", 5)(6, "h1", 6);
            i0.ɵɵtext(7, " Iniciar sesion ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 7);
            i0.ɵɵtext(9, " Descubre las ultimas tendencias de moda ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "form", 8);
            i0.ɵɵlistener("ngSubmit", function Login_Template_form_ngSubmit_10_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(11, "section")(12, "div", 9)(13, "label", 10);
            i0.ɵɵtext(14, " E-mail ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(15, Login_Conditional_15_Template, 2, 1, "span", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 12);
            i0.ɵɵelement(17, "input", 13);
            i0.ɵɵconditionalCreate(18, Login_Conditional_18_Template, 2, 0, "span", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "section")(20, "div", 15)(21, "label", 16);
            i0.ɵɵtext(22, " Contrasena ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(23, Login_Conditional_23_Template, 2, 1, "span", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 12);
            i0.ɵɵelement(25, "input", 17);
            i0.ɵɵelementStart(26, "button", 18);
            i0.ɵɵlistener("click", function Login_Template_button_click_26_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(27, "app-icon", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "button", 20);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 21)(31, "a", 22);
            i0.ɵɵtext(32, " Recuperar contrasena ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "p", 23);
            i0.ɵɵtext(34, " Eres nuevo? ");
            i0.ɵɵelementStart(35, "a", 24);
            i0.ɵɵtext(36, " Crea tu cuenta ");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngClass", ctx.emailCtrl.touched && ctx.emailCtrl.invalid ? "text-danger-600" : ctx.emailValid ? "text-primary-500" : "text-neutral-600");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.emailCtrl.touched && ((ctx.emailCtrl.errors == null ? null : ctx.emailCtrl.errors["required"]) || (ctx.emailCtrl.errors == null ? null : ctx.emailCtrl.errors["email"])) ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.emailCtrl.touched && ctx.emailCtrl.invalid ? "border-danger-600" : ctx.emailValid ? "border-primary-500" : "border-neutral-200");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.emailValid ? 18 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngClass", ctx.passwordCtrl.touched && ctx.passwordCtrl.invalid ? "text-danger-600" : ctx.passwordValid ? "text-primary-500" : "text-neutral-600");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.passwordCtrl.touched && ctx.passwordCtrl.invalid ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.passwordCtrl.touched && ctx.passwordCtrl.invalid ? "border-danger-600" : ctx.passwordValid ? "border-primary-500" : "border-neutral-200");
            i0.ɵɵadvance();
            i0.ɵɵproperty("type", ctx.showPassword() ? "text" : "password");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.isSubmitting());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isSubmitting() ? "Entrando..." : "Empezar", " ");
        } }, dependencies: [CommonModule, i1.NgClass, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, RouterLink, IconComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, IconComponent], template: "<section\n  class=\"relative grid min-h-screen grid-cols-1 items-center overflow-visible bg lg:h-screen lg:grid-cols-[1fr_1fr]\"\n>\n  <section class=\"relative z-10 hidden justify-center items-center lg:flex lg:min-h-0 lg:p-0\">\n    <img\n      src=\"/images/portada.png\"\n      alt=\"background\"\n      class=\"max-h-[60vh] w-auto max-w-none rounded-3xl object-left\"\n    />\n  </section>\n\n  <section\n    class=\"relative z-10 flex min-h-screen items-start justify-center px-8 py-9.5 lg:min-h-0 lg:items-center lg:p-0\"\n  >\n    <article class=\"flex max-h-233 w-full max-w-90 flex-col lg:max-h-125\">\n      <header class=\"flex flex-col items-center text-center\">\n        <h1 class=\"text-center text-[32px] font-semibold leading-10.5 text-ink-900\">\n          Iniciar sesion\n        </h1>\n        <p class=\"mx-auto w-68.75 text-center text-neutral-250 sm:w-auto lg:hidden\">\n          Descubre las ultimas tendencias de moda\n        </p>\n      </header>\n\n      <form class=\"space-y-6\" [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n        <section>\n          <div class=\"mt-16 flex items-center justify-between lg:mt-8\">\n            <label\n              class=\"mt-16 block text-[15px] font-medium lg:mt-8\"\n              [ngClass]=\"\n                emailCtrl.touched && emailCtrl.invalid\n                  ? 'text-danger-600'\n                  : emailValid\n                    ? 'text-primary-500'\n                    : 'text-neutral-600'\n              \"\n            >\n              E-mail\n            </label>\n\n            @if (\n              emailCtrl.touched && (emailCtrl.errors?.['required'] || emailCtrl.errors?.['email'])\n            ) {\n              <span class=\"ml-3 whitespace-nowrap text-sm text-danger-600\">\n                {{\n                  emailCtrl.errors?.['required']\n                    ? 'El email es obligatorio.'\n                    : emailCtrl.errors?.['email']\n                      ? 'El formato del e-mail no es valido.'\n                      : ''\n                }}\n              </span>\n            }\n          </div>\n\n          <div\n            class=\"flex items-center border-b\"\n            [ngClass]=\"\n              emailCtrl.touched && emailCtrl.invalid\n                ? 'border-danger-600'\n                : emailValid\n                  ? 'border-primary-500'\n                  : 'border-neutral-200'\n            \"\n          >\n            <input\n              type=\"email\"\n              formControlName=\"email\"\n              placeholder=\"usuario@gmail.com\"\n              class=\"w-full py-3 text-sm placeholder:text-neutral-300 focus:outline-none\"\n            />\n\n            @if (emailValid) {\n              <span\n                class=\"ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-300 lg:bg-primary-500\"\n              >\n                <app-icon name=\"icon-check\" class=\"h-3 w-3 text-white\"></app-icon>\n              </span>\n            }\n          </div>\n        </section>\n\n        <section>\n          <div class=\"flex items-center justify-between\">\n            <label\n              class=\"block text-[15px] font-medium\"\n              [ngClass]=\"\n                passwordCtrl.touched && passwordCtrl.invalid\n                  ? 'text-danger-600'\n                  : passwordValid\n                    ? 'text-primary-500'\n                    : 'text-neutral-600'\n              \"\n            >\n              Contrasena\n            </label>\n\n            @if (passwordCtrl.touched && passwordCtrl.invalid) {\n              <span class=\"ml-3 whitespace-nowrap text-sm text-danger-600\">\n                {{ passwordCtrl.errors?.['required'] ? 'La contrasena es obligatoria.' : '' }}\n              </span>\n            }\n          </div>\n\n          <div\n            class=\"flex items-center border-b\"\n            [ngClass]=\"\n              passwordCtrl.touched && passwordCtrl.invalid\n                ? 'border-danger-600'\n                : passwordValid\n                  ? 'border-primary-500'\n                  : 'border-neutral-200'\n            \"\n          >\n            <input\n              [type]=\"showPassword() ? 'text' : 'password'\"\n              formControlName=\"password\"\n              placeholder=\"Introduce aqui tu contrasena\"\n              class=\"w-full py-3 text-sm placeholder:text-neutral-300 focus:outline-none\"\n            />\n            <button\n              type=\"button\"\n              (click)=\"togglePassword()\"\n              class=\"ml-2 text-neutral-300 hover:text-neutral-400\"\n              aria-label=\"Mostrar u ocultar contrasena\"\n            >\n              <app-icon name=\"eye\" class=\"h-4 w-4\"></app-icon>\n            </button>\n          </div>\n        </section>\n\n        <button\n          type=\"submit\"\n          [disabled]=\"isSubmitting()\"\n          class=\"mt-13 flex h-11.75 w-full items-center justify-center rounded-md bg-primary-300 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 lg:mx-auto lg:mt-8.5 lg:w-68.75 lg:bg-primary-500\"\n        >\n          {{ isSubmitting() ? 'Entrando...' : 'Empezar' }}\n        </button>\n\n        <div class=\"flex justify-center\">\n          <a\n            routerLink=\"/forgot-password\"\n            class=\"text-sm text-primary-500 transition-colors hover:text-primary-700 hover:underline\"\n          >\n            Recuperar contrasena\n          </a>\n        </div>\n\n        <p class=\"text-center text-sm text-neutral-600\">\n          Eres nuevo?\n          <a\n            routerLink=\"/register\"\n            class=\"font-medium text-primary-500 transition-colors hover:text-primary-700 hover:underline\"\n          >\n            Crea tu cuenta\n          </a>\n        </p>\n      </form>\n    </article>\n  </section>\n</section>\r\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/login/login.ts", lineNumber: 23 }); })();
