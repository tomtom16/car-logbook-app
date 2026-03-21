import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LogbookEntry, LogbookFuelEntry, Vehicle} from "../api/car-logbook";

@Injectable({
    providedIn: 'root',
})
export class UpdateService {
    private currentVehicleIdChangedSource = new Subject<string>();
    private newVehicleCreatedSource = new Subject<Vehicle>();
    private newLogbookEntryCreatedSource = new Subject<LogbookEntry>();
    private newLogbookFuelEntryCreatedSource = new Subject<LogbookFuelEntry>();

    currentVehicleIdChanged$ = this.currentVehicleIdChangedSource.asObservable();
    newVehicleCreated$ = this.newVehicleCreatedSource.asObservable();
    newLogbookEntryCreated$ = this.newLogbookEntryCreatedSource.asObservable();
    newLogbookFuelEntryCreated$ = this.newLogbookFuelEntryCreatedSource.asObservable();

    triggerCurrentVehicleIdChanged(vehicleId: string) {
        this.currentVehicleIdChangedSource.next(vehicleId);
    }

    triggerNewVehicleCreated(vehicle: Vehicle) {
        this.newVehicleCreatedSource.next(vehicle);
    }

    triggerNewLogbookEntryCreated(entry: LogbookEntry) {
        this.newLogbookEntryCreatedSource.next(entry);
    }

    triggerNewLogbookFuelEntryCreated(entry: LogbookFuelEntry) {
        this.newLogbookFuelEntryCreatedSource.next(entry);
    }
}
