import { Component, input } from '@angular/core';
import * as i0 from "@angular/core";
export class IconComponent {
    name = input.required(...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    static ɵfac = function IconComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IconComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IconComponent, selectors: [["app-icon"]], inputs: { name: [1, "name"] }, decls: 2, vars: 1, consts: [["aria-hidden", "true", 1, "w-full", "h-full"]], template: function IconComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵnamespaceSVG();
            i0.ɵɵdomElementStart(0, "svg", 0);
            i0.ɵɵdomElement(1, "use");
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵattribute("href", "/icons/sprite.svg#" + ctx.name());
        } }, styles: ["[_nghost-%COMP%] {\n        display: inline-block;\n        line-height: 0;\n      }\n\n      [_nghost-%COMP%]:not([class]) {\n        width: 1.25rem;\n        height: 1.25rem;\n      }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IconComponent, [{
        type: Component,
        args: [{ selector: 'app-icon', standalone: true, template: `
    <svg class="w-full h-full" aria-hidden="true">
      <use [attr.href]="'/icons/sprite.svg#' + name()"></use>
    </svg>
  `, styles: ["\n      :host {\n        display: inline-block;\n        line-height: 0;\n      }\n\n      :host(:not([class])) {\n        width: 1.25rem;\n        height: 1.25rem;\n      }\n    "] }]
    }], null, { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IconComponent, { className: "IconComponent", filePath: "src/app/shared/components/icon/icon.ts", lineNumber: 25 }); })();
