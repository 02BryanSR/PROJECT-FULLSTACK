import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ClickOutsideDirective } from '../../directives/click-outside';
import { IconComponent } from '../icon/icon';
import * as i0 from "@angular/core";
function AccountMenuComponent_Conditional_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header")(1, "p", 5);
    i0.ɵɵtext(2, "Sesion iniciada como");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 7);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "nav", 8)(8, "button", 9);
    i0.ɵɵlistener("click", function AccountMenuComponent_Conditional_3_Conditional_2_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.handleLogout()); });
    i0.ɵɵelement(9, "app-icon", 10);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Cerrar sesion");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", (tmp_2_0 = ctx_r1.authService.currentUser()) == null ? null : tmp_2_0.email, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", (tmp_3_0 = ctx_r1.authService.currentUser()) == null ? null : tmp_3_0.rol, " ");
} }
function AccountMenuComponent_Conditional_3_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header")(1, "p", 5);
    i0.ɵɵtext(2, "Todavia no has iniciado sesion.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 11);
    i0.ɵɵtext(4, " Identificate para acceder al flujo de autenticacion y volver a home. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "a", 12);
    i0.ɵɵlistener("click", function AccountMenuComponent_Conditional_3_Conditional_3_Template_a_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(6, " Iniciar sesion ");
    i0.ɵɵelementEnd();
} }
function AccountMenuComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 3)(1, "article", 4);
    i0.ɵɵconditionalCreate(2, AccountMenuComponent_Conditional_3_Conditional_2_Template, 12, 2)(3, AccountMenuComponent_Conditional_3_Conditional_3_Template, 7, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.authService.isAuthenticated() ? 2 : 3);
} }
export class AccountMenuComponent {
    authService = inject(AuthService);
    isOpen = signal(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    toggle() {
        this.isOpen.update((value) => !value);
    }
    close() {
        if (this.isOpen()) {
            this.isOpen.set(false);
        }
    }
    handleLogout() {
        this.authService.logout({ redirectToLogin: false, redirectToPath: '/home' });
        this.close();
    }
    static ɵfac = function AccountMenuComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountMenuComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountMenuComponent, selectors: [["app-account-menu"]], decls: 4, vars: 2, consts: [[1, "relative", 3, "clickOutside"], ["type", "button", "aria-haspopup", "true", "aria-label", "Menu de usuario", 1, "relative", "inline-flex", "items-center", "justify-center", "py-2", "text-white", "after:absolute", "after:bottom-0", "after:left-0", "after:h-px", "after:w-full", "after:origin-left", "after:scale-x-0", "after:bg-white", "after:transition-transform", "after:duration-300", "hover:after:scale-x-100", 3, "click"], ["name", "user", 1, "h-7", "w-7", "text-white"], [1, "absolute", "right-0", "z-50", "mt-3", "w-80", "origin-top-right", "overflow-hidden", "rounded-[1.5rem]", "bg-neutral-100", "shadow-xl"], [1, "space-y-4", "p-6"], [1, "text-sm", "text-neutral-500"], [1, "mt-1", "block", "break-all", "text-base", "font-semibold", "text-neutral-900"], [1, "mt-1", "text-xs", "uppercase", "tracking-[0.22em]", "text-neutral-400"], [1, "flex", "flex-col", "gap-2"], ["type", "button", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-neutral-900", "px-4", "py-3", "text-sm", "font-medium", "text-white", "transition", "hover:bg-black", 3, "click"], ["name", "logout", 1, "h-4", "w-4"], [1, "mt-1", "block", "text-base", "font-semibold", "text-neutral-900"], ["routerLink", "/login", 1, "flex", "items-center", "justify-center", "rounded-full", "bg-neutral-900", "px-4", "py-3", "text-sm", "font-medium", "text-white", "transition", "hover:bg-black", 3, "click"]], template: function AccountMenuComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵlistener("clickOutside", function AccountMenuComponent_Template_section_clickOutside_0_listener() { return ctx.close(); });
            i0.ɵɵelementStart(1, "button", 1);
            i0.ɵɵlistener("click", function AccountMenuComponent_Template_button_click_1_listener() { return ctx.toggle(); });
            i0.ɵɵelement(2, "app-icon", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, AccountMenuComponent_Conditional_3_Template, 4, 1, "section", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-expanded", ctx.isOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isOpen() ? 3 : -1);
        } }, dependencies: [ClickOutsideDirective, IconComponent, RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountMenuComponent, [{
        type: Component,
        args: [{ selector: 'app-account-menu', standalone: true, imports: [ClickOutsideDirective, IconComponent, RouterLink], template: "<section class=\"relative\" (clickOutside)=\"close()\">\n  <button\n    type=\"button\"\n    (click)=\"toggle()\"\n    [attr.aria-expanded]=\"isOpen()\"\n    aria-haspopup=\"true\"\n    aria-label=\"Menu de usuario\"\n    class=\"relative inline-flex items-center justify-center py-2 text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100\"\n  >\n    <app-icon name=\"user\" class=\"h-7 w-7 text-white\"></app-icon>\n  </button>\n\n  @if (isOpen()) {\n    <section\n      class=\"absolute right-0 z-50 mt-3 w-80 origin-top-right overflow-hidden rounded-[1.5rem] bg-neutral-100 shadow-xl\"\n    >\n      <article class=\"space-y-4 p-6\">\n        @if (authService.isAuthenticated()) {\n          <header>\n            <p class=\"text-sm text-neutral-500\">Sesion iniciada como</p>\n            <strong class=\"mt-1 block break-all text-base font-semibold text-neutral-900\">\n              {{ authService.currentUser()?.email }}\n            </strong>\n            <p class=\"mt-1 text-xs uppercase tracking-[0.22em] text-neutral-400\">\n              {{ authService.currentUser()?.rol }}\n            </p>\n          </header>\n\n          <nav class=\"flex flex-col gap-2\">\n            <button\n              type=\"button\"\n              (click)=\"handleLogout()\"\n              class=\"flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black\"\n            >\n              <app-icon name=\"logout\" class=\"h-4 w-4\"></app-icon>\n              <span>Cerrar sesion</span>\n            </button>\n          </nav>\n        } @else {\n          <header>\n            <p class=\"text-sm text-neutral-500\">Todavia no has iniciado sesion.</p>\n            <strong class=\"mt-1 block text-base font-semibold text-neutral-900\">\n              Identificate para acceder al flujo de autenticacion y volver a home.\n            </strong>\n          </header>\n\n          <a\n            routerLink=\"/login\"\n            (click)=\"close()\"\n            class=\"flex items-center justify-center rounded-full bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black\"\n          >\n            Iniciar sesion\n          </a>\n        }\n      </article>\n    </section>\n  }\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountMenuComponent, { className: "AccountMenuComponent", filePath: "src/app/shared/components/account-menu/account-menu.ts", lineNumber: 13 }); })();
