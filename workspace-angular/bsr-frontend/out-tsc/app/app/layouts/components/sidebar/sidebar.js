import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PRIMARY_NAV_LINKS } from '../../../core/constants/navigation.constants';
import { AccountMenuComponent } from '../../../shared/components/account-menu/account-menu';
import { IconComponent } from '../../../shared/components/icon/icon';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.route;
function Sidebar_Conditional_7_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "a", 15);
    i0.ɵɵlistener("click", function Sidebar_Conditional_7_For_10_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const link_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", link_r4.route);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", link_r4.label, " ");
} }
function Sidebar_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function Sidebar_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 6)(2, "header", 7)(3, "p", 8);
    i0.ɵɵtext(4, "BOLD STYLE REVOLUTION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 9);
    i0.ɵɵlistener("click", function Sidebar_Conditional_7_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelement(6, "app-icon", 10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "nav", 11)(8, "ul", 12);
    i0.ɵɵrepeaterCreate(9, Sidebar_Conditional_7_For_10_Template, 3, 2, "li", null, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "footer", 13)(12, "p", 14);
    i0.ɵɵtext(13, "Sesion");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "app-account-menu");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.navLinks);
} }
export class Sidebar {
    router = inject(Router);
    isOpen = signal(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : /* istanbul ignore next */ []));
    navLinks = PRIMARY_NAV_LINKS;
    constructor() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.close());
    }
    toggle() {
        this.isOpen.update((value) => !value);
    }
    close() {
        this.isOpen.set(false);
    }
    static ɵfac = function Sidebar_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Sidebar)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Sidebar, selectors: [["app-sidebar"]], decls: 8, vars: 1, consts: [[1, "flex", "items-center", "justify-between", "px-6", "py-4", "text-white", "md:px-10", "lg:hidden"], ["type", "button", "aria-label", "Abrir menu", 1, "inline-flex", "items-center", "justify-center", "text-white", 3, "click"], ["name", "icon-hamburger", 1, "h-7", "w-7"], [1, "text-center", "text-xs", "font-bold", "uppercase", "tracking-[0.25em]", "text-white", "md:text-sm"], ["aria-label", "Sesion", 1, "flex", "items-center", "gap-4", "text-white"], ["type", "button", "aria-label", "Cerrar menu", 1, "fixed", "inset-0", "z-70", "bg-black/45", "lg:hidden", 3, "click"], [1, "fixed", "inset-y-0", "left-0", "z-80", "flex", "w-[min(88vw,24rem)]", "flex-col", "bg-[#0c0c0c]", "px-6", "py-6", "text-white", "shadow-2xl", "lg:hidden"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-bold", "uppercase", "tracking-[0.25em]"], ["type", "button", "aria-label", "Cerrar menu", 1, "inline-flex", "items-center", "justify-center", "text-white", 3, "click"], ["name", "icon-close", 1, "h-6", "w-6"], ["aria-label", "Navegacion movil", 1, "mt-10", "text-lg", "uppercase", "tracking-[0.22em]"], [1, "flex", "flex-col", "gap-6"], [1, "mt-auto", "border-t", "border-white/15", "pt-6"], [1, "mb-4", "text-xs", "uppercase", "tracking-[0.25em]", "text-white/60"], ["routerLinkActive", "border-white text-white", 1, "border-b", "border-transparent", "pb-2", "text-white/85", "transition", "hover:border-white", "hover:text-white", 3, "click", "routerLink"]], template: function Sidebar_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
            i0.ɵɵlistener("click", function Sidebar_Template_button_click_1_listener() { return ctx.toggle(); });
            i0.ɵɵelement(2, "app-icon", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 3);
            i0.ɵɵtext(4, " BOLD STYLE REVOLUTION ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "nav", 4);
            i0.ɵɵelement(6, "app-account-menu");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, Sidebar_Conditional_7_Template, 15, 0);
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.isOpen() ? 7 : -1);
        } }, dependencies: [AccountMenuComponent, IconComponent, RouterLink, RouterLinkActive], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Sidebar, [{
        type: Component,
        args: [{ selector: 'app-sidebar', standalone: true, imports: [AccountMenuComponent, IconComponent, RouterLink, RouterLinkActive], template: "<div class=\"flex items-center justify-between px-6 py-4 text-white md:px-10 lg:hidden\">\n  <button\n    type=\"button\"\n    aria-label=\"Abrir menu\"\n    class=\"inline-flex items-center justify-center text-white\"\n    (click)=\"toggle()\"\n  >\n    <app-icon name=\"icon-hamburger\" class=\"h-7 w-7\"></app-icon>\n  </button>\n\n  <p class=\"text-center text-xs font-bold uppercase tracking-[0.25em] text-white md:text-sm\">\n    BOLD STYLE REVOLUTION\n  </p>\n\n  <nav class=\"flex items-center gap-4 text-white\" aria-label=\"Sesion\">\n    <app-account-menu></app-account-menu>\n  </nav>\n</div>\n\n@if (isOpen()) {\n  <button\n    type=\"button\"\n    aria-label=\"Cerrar menu\"\n    class=\"fixed inset-0 z-70 bg-black/45 lg:hidden\"\n    (click)=\"close()\"\n  ></button>\n\n  <aside\n    class=\"fixed inset-y-0 left-0 z-80 flex w-[min(88vw,24rem)] flex-col bg-[#0c0c0c] px-6 py-6 text-white shadow-2xl lg:hidden\"\n  >\n    <header class=\"flex items-center justify-between\">\n      <p class=\"text-sm font-bold uppercase tracking-[0.25em]\">BOLD STYLE REVOLUTION</p>\n\n      <button\n        type=\"button\"\n        aria-label=\"Cerrar menu\"\n        class=\"inline-flex items-center justify-center text-white\"\n        (click)=\"close()\"\n      >\n        <app-icon name=\"icon-close\" class=\"h-6 w-6\"></app-icon>\n      </button>\n    </header>\n\n    <nav class=\"mt-10 text-lg uppercase tracking-[0.22em]\" aria-label=\"Navegacion movil\">\n      <ul class=\"flex flex-col gap-6\">\n        @for (link of navLinks; track link.route) {\n          <li>\n            <a\n              [routerLink]=\"link.route\"\n              routerLinkActive=\"border-white text-white\"\n              class=\"border-b border-transparent pb-2 text-white/85 transition hover:border-white hover:text-white\"\n              (click)=\"close()\"\n            >\n              {{ link.label }}\n            </a>\n          </li>\n        }\n      </ul>\n    </nav>\n\n    <footer class=\"mt-auto border-t border-white/15 pt-6\">\n      <p class=\"mb-4 text-xs uppercase tracking-[0.25em] text-white/60\">Sesion</p>\n      <app-account-menu></app-account-menu>\n    </footer>\n  </aside>\n}\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Sidebar, { className: "Sidebar", filePath: "src/app/layouts/components/sidebar/sidebar.ts", lineNumber: 14 }); })();
