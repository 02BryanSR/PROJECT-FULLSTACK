import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PRIMARY_NAV_LINKS } from '../../../core/constants/navigation.constants';
import { AccountMenuComponent } from '../../../shared/components/account-menu/account-menu';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.route;
function Header_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const link_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", link_r1.route);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", link_r1.label, " ");
} }
export class Header {
    navLinks = PRIMARY_NAV_LINKS;
    static ɵfac = function Header_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Header)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Header, selectors: [["app-header"]], decls: 10, vars: 0, consts: [[1, "hidden", "bg-transparent", "px-6", "py-4", "text-white", "md:px-10", "lg:block", "lg:px-12.5"], [1, "relative", "items-center", "text-sm", "uppercase", "tracking-[0.2em]", "text-white", "lg:flex"], ["aria-label", "Navegacion principal"], [1, "flex", "items-center", "gap-5"], ["routerLink", "/home", 1, "absolute", "left-1/2", "-translate-x-1/2", "text-xl", "font-bold", "tracking-[0.25em]", "text-white"], [1, "ml-auto", "flex", "items-center", "gap-5", "text-white"], ["routerLinkActive", "after:scale-x-100", 1, "relative", "inline-flex", "items-center", "py-2", "text-white", "after:absolute", "after:bottom-0", "after:left-0", "after:h-px", "after:w-full", "after:origin-left", "after:scale-x-0", "after:bg-white", "after:transition-transform", "after:duration-300", "hover:after:scale-x-100", 3, "routerLink"]], template: function Header_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "nav", 2)(3, "ul", 3);
            i0.ɵɵrepeaterCreate(4, Header_For_5_Template, 3, 2, "li", null, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "a", 4);
            i0.ɵɵtext(7, " B S R ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵelement(9, "app-account-menu");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.navLinks);
        } }, dependencies: [AccountMenuComponent, RouterLink, RouterLinkActive], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Header, [{
        type: Component,
        args: [{ selector: 'app-header', standalone: true, imports: [AccountMenuComponent, RouterLink, RouterLinkActive], template: "<header class=\"hidden bg-transparent px-6 py-4 text-white md:px-10 lg:block lg:px-12.5\">\n  <div class=\"relative items-center text-sm uppercase tracking-[0.2em] text-white lg:flex\">\n    <nav aria-label=\"Navegacion principal\">\n      <ul class=\"flex items-center gap-5\">\n        @for (link of navLinks; track link.route) {\n          <li>\n            <a\n              [routerLink]=\"link.route\"\n              routerLinkActive=\"after:scale-x-100\"\n              class=\"relative inline-flex items-center py-2 text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100\"\n            >\n              {{ link.label }}\n            </a>\n          </li>\n        }\n      </ul>\n    </nav>\n\n    <a\n      routerLink=\"/home\"\n      class=\"absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-[0.25em] text-white\"\n    >\n      B S R\n    </a>\n\n    <div class=\"ml-auto flex items-center gap-5 text-white\">\n      <app-account-menu></app-account-menu>\n    </div>\n  </div>\n</header>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Header, { className: "Header", filePath: "src/app/layouts/components/header/header.ts", lineNumber: 12 }); })();
