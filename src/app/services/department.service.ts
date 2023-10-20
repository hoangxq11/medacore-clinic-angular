import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { DepartmentListRes, DepartmentRes } from '../commons/dto/department';
import { BaseResponse } from '../commons/dto/response';
import { DepartmentReq } from '../commons/request/department.req';
import { PatientReq } from '../commons/request/patient.req';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private baseURL = ROOT_API + "/medical-department";
    constructor(private httpClient: HttpClient) { }

    getAllDepartment(): Observable<DepartmentListRes> {
        return this.httpClient.get<DepartmentListRes>(`${this.baseURL}`);
    }

    getDepartmentById(DepartmentId: number): Observable<DepartmentRes> {
        return this.httpClient.get<DepartmentRes>(`${this.baseURL}/${DepartmentId}`);
    }

    createDepartment(DepartmentReq: DepartmentReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, DepartmentReq);
    }

    updateDepartment(DepartmentId: number, DepartmentReq: DepartmentReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${DepartmentId}`, DepartmentReq);
    }

    removeDepartment(DepartmentId: number, patientReq: PatientReq): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${DepartmentId}`);
    }
}

