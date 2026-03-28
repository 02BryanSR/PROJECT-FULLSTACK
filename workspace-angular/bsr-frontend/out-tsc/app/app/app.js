import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HIDDEN_LAYOUT_ROUTES } from './core/constants/navigation.constants';
import { Header } from './layouts/components/header/header';
import { Sidebar } from './layouts/components/sidebar/sidebar';
import { ToastComponent } from './shared/components/toast/toast';
import * as i0 from "@angular/core";
function App_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "app-header")(2, "app-sidebar");
    i0.ɵɵelementEnd();
} }
export class App {
    router = inject(Router);
    title = signal('bsr-frontend', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    hiddenHeaderRoutes = new Set(HIDDEN_LAYOUT_ROUTES);
    currentUrl = signal(this.router.url, ...(ngDevMode ? [{ debugName: "currentUrl" }] : /* istanbul ignore next */ []));
    showHeader = computed(() => !this.hiddenHeaderRoutes.has(this.currentUrl()), ...(ngDevMode ? [{ debugName: "showHeader" }] : /* istanbul ignore next */ []));
    constructor() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
    }
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 4, vars: 1, consts: [[1, "mx-auto", "w-full", "max-w-[1920px]"], [1, "fixed", "left-1/2", "top-0", "z-50", "w-full", "max-w-[1920px]", "-translate-x-1/2"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0);
            i0.ɵɵconditionalCreate(1, App_Conditional_1_Template, 3, 0, "div", 1);
            i0.ɵɵelement(2, "router-outlet")(3, "app-toast");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showHeader() ? 1 : -1);
        } }, dependencies: [Header, RouterOutlet, Sidebar, ToastComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [Header, RouterOutlet, Sidebar, ToastComponent], template: "<main class=\"mx-auto w-full max-w-[1920px]\">\n  @if (showHeader()) {\n    <div class=\"fixed left-1/2 top-0 z-50 w-full max-w-[1920px] -translate-x-1/2\">\n      <app-header></app-header>\n      <app-sidebar></app-sidebar>\n    </div>\n  }\n\n  <router-outlet />\n  <app-toast />\n</main>\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 15 }); })();
