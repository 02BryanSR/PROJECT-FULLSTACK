import { Directive, ElementRef, output, HostListener, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class ClickOutsideDirective {
    elementRef = inject(ElementRef);
    clickOutside = output();
    onClick(target) {
        if (!target || !(target instanceof HTMLElement))
            return;
        const clickedInside = this.elementRef.nativeElement.contains(target);
        if (!clickedInside) {
            this.clickOutside.emit();
        }
    }
    static ɵfac = function ClickOutsideDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ClickOutsideDirective)(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ClickOutsideDirective, selectors: [["", "clickOutside", ""]], hostBindings: function ClickOutsideDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function ClickOutsideDirective_click_HostBindingHandler($event) { return ctx.onClick($event.target); }, i0.ɵɵresolveDocument);
        } }, outputs: { clickOutside: "clickOutside" } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClickOutsideDirective, [{
        type: Directive,
        args: [{
                selector: '[clickOutside]',
                standalone: true,
            }]
    }], null, { clickOutside: [{ type: i0.Output, args: ["clickOutside"] }], onClick: [{
            type: HostListener,
            args: ['document:click', ['$event.target']]
        }] }); })();
