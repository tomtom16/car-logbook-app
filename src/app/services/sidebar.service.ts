import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    private collapsedSource = new BehaviorSubject<boolean>(false);
    private mobileVisibleSource = new BehaviorSubject<boolean>(false);

    collapsed$ = this.collapsedSource.asObservable();
    mobileVisible$ = this.mobileVisibleSource.asObservable();

    toggle() {
        if (this.isMobile()) {
            this.mobileVisibleSource.next(!this.mobileVisibleSource.value);
        } else {
            this.collapsedSource.next(!this.collapsedSource.value);
        }
    }

    closeMobile() {
        this.mobileVisibleSource.next(false);
    }

    isMobile(): boolean {
        return window.innerWidth < 768;
    }
}