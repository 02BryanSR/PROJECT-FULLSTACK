import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export class ForgotPassword {
    static ɵfac = function ForgotPassword_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForgotPassword)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotPassword, selectors: [["app-forgot-password"]], decls: 15, vars: 0, consts: [[1, "min-h-screen", "bg-neutral-100", "px-6", "py-10", "lg:px-10"], [1, "mx-auto", "flex", "min-h-[calc(100vh-5rem)]", "max-w-3xl", "flex-col", "justify-center", "rounded-2xl", "bg-white", "p-8", "shadow-[0_8px_24px_rgba(0,0,0,0.08)]", "lg:p-12"], [1, "text-sm", "font-medium", "uppercase", "tracking-wider", "text-primary-500"], [1, "mt-3", "text-[32px]", "font-semibold", "leading-10.5", "text-ink-900"], [1, "mt-4", "max-w-2xl", "text-sm", "text-neutral-600"], [1, "mt-8", "rounded-2xl", "border", "border-neutral-200", "bg-neutral-100", "p-5", "text-sm", "text-neutral-600"], [1, "mt-8", "flex", "flex-wrap", "gap-3"], ["routerLink", "/login", 1, "inline-flex", "items-center", "justify-center", "rounded-md", "bg-primary-500", "px-5", "py-3", "font-medium", "text-white", "transition-colors", "hover:bg-primary-700"], ["routerLink", "/register", 1, "inline-flex", "items-center", "justify-center", "rounded-md", "border", "border-neutral-200", "px-5", "py-3", "font-medium", "text-neutral-600", "transition-colors", "hover:bg-neutral-100"]], template: function ForgotPassword_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "article", 1)(2, "p", 2);
            i0.ɵɵtext(3, "Auth");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1", 3);
            i0.ɵɵtext(5, "Recuperar contrase\u00F1a");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtext(7, " Esta ruta ya queda preparada para conectar el env\u00EDo de correo, c\u00F3digo o enlace de recuperaci\u00F3n cuando implementes el backend y el formulario. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵtext(9, " Pendiente de implementar: captura de email, solicitud al backend y pantalla de restablecimiento. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 6)(11, "a", 7);
            i0.ɵɵtext(12, " Volver a login ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "a", 8);
            i0.ɵɵtext(14, " Crear cuenta ");
            i0.ɵɵelementEnd()()()();
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPassword, [{
        type: Component,
        args: [{ selector: 'app-forgot-password', standalone: true, imports: [RouterLink], template: "<section class=\"min-h-screen bg-neutral-100 px-6 py-10 lg:px-10\">\n  <article\n    class=\"mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:p-12\"\n  >\n    <p class=\"text-sm font-medium uppercase tracking-wider text-primary-500\">Auth</p>\n    <h1 class=\"mt-3 text-[32px] font-semibold leading-10.5 text-ink-900\">Recuperar contrase\u00F1a</h1>\n    <p class=\"mt-4 max-w-2xl text-sm text-neutral-600\">\n      Esta ruta ya queda preparada para conectar el env\u00EDo de correo, c\u00F3digo o enlace de\n      recuperaci\u00F3n cuando implementes el backend y el formulario.\n    </p>\n\n    <div class=\"mt-8 rounded-2xl border border-neutral-200 bg-neutral-100 p-5 text-sm text-neutral-600\">\n      Pendiente de implementar: captura de email, solicitud al backend y pantalla de\n      restablecimiento.\n    </div>\n\n    <div class=\"mt-8 flex flex-wrap gap-3\">\n      <a\n        routerLink=\"/login\"\n        class=\"inline-flex items-center justify-center rounded-md bg-primary-500 px-5 py-3 font-medium text-white transition-colors hover:bg-primary-700\"\n      >\n        Volver a login\n      </a>\n      <a\n        routerLink=\"/register\"\n        class=\"inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-3 font-medium text-neutral-600 transition-colors hover:bg-neutral-100\"\n      >\n        Crear cuenta\n      </a>\n    </div>\n  </article>\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForgotPassword, { className: "ForgotPassword", filePath: "src/app/features/forgot-password/forgot-password.ts", lineNumber: 10 }); })();
