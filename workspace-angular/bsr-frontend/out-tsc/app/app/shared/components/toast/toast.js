import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon';
import * as i0 from "@angular/core";
function ToastComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 0)(1, "article", 1)(2, "div", 2)(3, "div", 3);
    i0.ɵɵelement(4, "app-icon", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 5)(6, "p", 6);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 7);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 8);
    i0.ɵɵlistener("click", function ToastComponent_Conditional_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelement(11, "app-icon", 9);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.toast().title, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.toast().message, " ");
} }
export class ToastComponent {
    toastService = inject(ToastService);
    toast = computed(() => this.toastService.state(), ...(ngDevMode ? [{ debugName: "toast" }] : /* istanbul ignore next */ []));
    close() {
        this.toastService.hide();
    }
    static ɵfac = function ToastComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["app-toast"]], decls: 1, vars: 1, consts: [[1, "pointer-events-none", "fixed", "bottom-6", "left-1/2", "z-50", "flex", "w-full", "max-w-[1920px]", "-translate-x-1/2", "justify-center", "px-4"], [1, "pointer-events-auto", "w-full", "max-w-90.25", "rounded-[10px]", "bg-[#FDEAEA]", "p-5", "shadow-[0_8px_24px_rgba(0,0,0,0.08)]"], [1, "flex", "items-start", "gap-4"], [1, "flex", "h-6", "w-6", "shrink-0", "items-center", "justify-center", "rounded-md", "bg-[#E9B8B5]", "text-[#D14B3D]"], ["name", "icon-close", 1, "h-3.5", "w-3.5"], [1, "min-w-0", "flex-1"], [1, "font-poppins", "text-[22px]", "font-semibold", "leading-6", "text-[#D14B3D]"], [1, "mt-2", "font-poppins", "text-sm", "leading-5", "text-[#D14B3D]"], ["type", "button", "aria-label", "Cerrar notificaci\u00F3n", 1, "shrink-0", "text-[#D88A84]", "transition", "hover:text-[#D14B3D]", 3, "click"], ["name", "icon-close", 1, "h-5", "w-5"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, ToastComponent_Conditional_0_Template, 12, 2, "section", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.toast().visible ? 0 : -1);
        } }, dependencies: [IconComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{ selector: 'app-toast', standalone: true, imports: [IconComponent], template: "@if (toast().visible) {\n  <section\n    class=\"pointer-events-none fixed bottom-6 left-1/2 z-50 flex w-full max-w-[1920px] -translate-x-1/2 justify-center px-4\"\n  >\n    <article\n      class=\"pointer-events-auto w-full max-w-90.25 rounded-[10px] bg-[#FDEAEA] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]\"\n    >\n      <div class=\"flex items-start gap-4\">\n        <div\n          class=\"flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E9B8B5] text-[#D14B3D]\"\n        >\n          <app-icon name=\"icon-close\" class=\"h-3.5 w-3.5\"></app-icon>\n        </div>\n\n        <div class=\"min-w-0 flex-1\">\n          <p class=\"font-poppins text-[22px] font-semibold leading-6 text-[#D14B3D]\">\n            {{ toast().title }}\n          </p>\n\n          <p class=\"mt-2 font-poppins text-sm leading-5 text-[#D14B3D]\">\n            {{ toast().message }}\n          </p>\n        </div>\n\n        <button\n          type=\"button\"\n          (click)=\"close()\"\n          aria-label=\"Cerrar notificaci\u00F3n\"\n          class=\"shrink-0 text-[#D88A84] transition hover:text-[#D14B3D]\"\n        >\n          <app-icon name=\"icon-close\" class=\"h-5 w-5\"></app-icon>\n        </button>\n      </div>\n    </article>\n  </section>\n}\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "src/app/shared/components/toast/toast.ts", lineNumber: 11 }); })();
