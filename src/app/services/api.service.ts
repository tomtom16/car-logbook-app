import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
import { Vehicle, VehicleService } from '../api/car-logbook';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  loginService: LoginService;
  refreshService: RefreshService;
  registerService: RegisterService;
  vehicleService: VehicleService;

  constructor(private http: HttpClient) {
    let configuration: Configuration = new Configuration({
      apiKeys: { 'X-Api-Key': environment.authServiceApiKey },
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

    this.vehicleService = new VehicleService(this.http, environment.carLogbookBaseUrl);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    let request: LoginRequest = { username: username, password: password };
    return this.loginService.login(request);
  }

  register(username: string, password: string): Observable<RegisterResponse> {
    let request: RegisterRequest = {username: username, password: password};
    return this.registerService.registerUser(request);
  }

  refresh(refreshToken: string): Observable<LoginResponse> {
    let request: RefreshRequest = { refreshToken: refreshToken };
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
}
