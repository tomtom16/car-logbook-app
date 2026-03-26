import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    Configuration,
    LoginRequest,
    LoginResponse,
    LoginService,
    RefreshRequest,
    RefreshService,
    RegisterRequest,
    RegisterResponse,
    RegisterService,
} from '../api/auth';
import {
    LogbookEntry, LogbookEntryResultList,
    LogbookFuelEntry, LogbookFuelEntryResultList,
    LogbookFuelService,
    LogbookService, SortDirection,
    Vehicle,
    VehicleService
} from '../api/car-logbook';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    logbookService: LogbookService;
    logbookFuelService: LogbookFuelService;
    loginService: LoginService;
    refreshService: RefreshService;
    registerService: RegisterService;
    vehicleService: VehicleService;

    constructor(private http: HttpClient) {
        let configuration: Configuration = new Configuration({
            apiKeys: {'X-Api-Key': environment.authServiceApiKey},
            withCredentials: true,
        });

        this.loginService = new LoginService(
            this.http,
            environment.authServiceBaseUrl,
            configuration
        );

        this.refreshService = new RefreshService(
            this.http,
            environment.authServiceBaseUrl,
            configuration,
        );

        this.registerService = new RegisterService(
            this.http,
            environment.authServiceBaseUrl,
            configuration
        );

        this.logbookService = new LogbookService(this.http, environment.carLogbookBaseUrl);
        this.logbookFuelService = new LogbookFuelService(this.http, environment.carLogbookBaseUrl);
        this.vehicleService = new VehicleService(this.http, environment.carLogbookBaseUrl);
    }

    login(username: string, password: string): Observable<LoginResponse> {
        let request: LoginRequest = {username: username, password: password};
        return this.loginService.login(request);
    }

    register(username: string, password: string): Observable<RegisterResponse> {
        let request: RegisterRequest = {username: username, password: password};
        return this.registerService.registerUser(request);
    }

    refresh(refreshToken: string): Observable<LoginResponse> {
        let request: RefreshRequest = {refreshToken: refreshToken};
        return this.refreshService.refresh(request);
    }

    getPrimaryVehicle(): Observable<Vehicle> {
        return this.vehicleService.getPrimaryVehicle();
    }

    getVehicles(): Observable<Vehicle[]> {
        return this.vehicleService.getVehicles();
    }

    getVehicle(id: string): Observable<Vehicle> {
        return this.vehicleService.getVehicle(id);
    }

    setVehiclePhoto(id: string, photo: Blob) {
        return this.vehicleService.uploadPhoto(id, photo);
    }

    getVehiclePhoto(id: string): Observable<Blob> {
        return this.vehicleService.downloadPhoto(id);
    }

    deleteVehiclePhoto(id: string) {
        return this.vehicleService.deleteVehiclePhoto(id);
    }

    getLogbookEntries(vehicleId: string): Observable<LogbookEntryResultList> {
        return this.logbookService.getLogbookEntries(vehicleId);
    }

    getLogbookEntriesPaginated(vehicleId: string, page: number, limit: number, sort: string, dir: SortDirection, filter?: string): Observable<LogbookEntryResultList> {
        return this.logbookService.getLogbookEntries(vehicleId, page, limit, sort, dir, filter);
    }

    getLogbookFuelEntries(vehicleId: string): Observable<LogbookFuelEntryResultList> {
        return this.logbookFuelService.getFuelEntries(vehicleId);
    }

    getLogbookFuelEntriesPaginated(vehicleId: string, page: number, limit: number, sort: string, dir: SortDirection, filter?: string): Observable<LogbookFuelEntryResultList> {
        return this.logbookFuelService.getFuelEntries(vehicleId, page, limit, sort, dir, filter);
    }

    createVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.vehicleService.createVehicle(vehicle);
    }

    createLogbookEntry(vehicleId: string, logbookEntry: LogbookEntry): Observable<LogbookEntry> {
        return this.logbookService.createLogbookEntry(vehicleId, logbookEntry);
    }

    createLogbookFuelEntry(vehicleId: string, logbookFuelEntry: LogbookFuelEntry): Observable<LogbookFuelEntry> {
        return this.logbookFuelService.createFuelEntry(vehicleId, logbookFuelEntry);
    }
}
