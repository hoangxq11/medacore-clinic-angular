import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { BaseResponse } from '../commons/dto/response';
import { ServicesListRes, ServicesRes } from '../commons/dto/services';
import { PatientReq } from '../commons/request/patient.req';
import { ServicesReq } from '../commons/request/services.req';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private baseURL = ROOT_API + "/services";
    constructor(private httpClient: HttpClient) { }

    getAllServices(): Observable<ServicesListRes> {
        return this.httpClient.get<ServicesListRes>(`${this.baseURL}`);
    }

    getServicesById(ServicesId: number): Observable<ServicesRes> {
        return this.httpClient.get<ServicesRes>(`${this.baseURL}/${ServicesId}`);
    }

    getServicesByDepartment(departmentId: number): Observable<ServicesListRes> {
        return this.httpClient.get<ServicesListRes>(`${this.baseURL}/get-by-department/${departmentId}`);
    }

    createServices(servicesReq: ServicesReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, servicesReq);
    }

    updateServices(servicesId: number, servicesReq: ServicesReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${servicesId}`, servicesReq);
    }

    removeServices(servicesId: number, patientReq: PatientReq): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${servicesId}`);
    }
}

