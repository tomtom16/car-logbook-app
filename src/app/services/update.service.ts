import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private refreshDashboardSource = new Subject<void>();

  refreshDashboard$ = this.refreshDashboardSource.asObservable();

  triggerDashboardRefresh() {
    this.refreshDashboardSource.next();
  }
}
