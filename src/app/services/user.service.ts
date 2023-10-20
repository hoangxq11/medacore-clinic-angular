import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { AccountListRes } from '../commons/dto/account';
import { PatientListRes, PatientRes } from '../commons/dto/patient';
import { BaseResponse } from '../commons/dto/response';
import { StaffListRes, StaffRes } from '../commons/dto/staff';
import { PatientCriteria, PatientReq } from '../commons/request/patient.req';
import { StaffCriteria, StaffReq } from '../commons/request/staff.req';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseURL = ROOT_API + "/users";
    constructor(private httpClient: HttpClient) { }

    getAccounts(): Observable<AccountListRes> {
        return this.httpClient.get<AccountListRes>(`${this.baseURL}/get-accounts`);
    }

    getCustomPatients(patientCriteria: PatientCriteria): Observable<PatientListRes> {
        return this.httpClient.post<PatientListRes>(`${this.baseURL}/get-patients`, patientCriteria);
    }

    getPatient(patientId: number): Observable<PatientRes> {
        return this.httpClient.get<PatientRes>(`${this.baseURL}/get-patient/${patientId}`);
    }

    getPatientByUsername(username: string): Observable<PatientRes> {
        return this.httpClient.get<PatientRes>(`${this.baseURL}/get-patient-by-username/${username}`);
    }

    updatePatient(patientId: number, patientReq: PatientReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-patient/${patientId}`, patientReq);
    }

    deletePatient() { }

    getCustomStaffs(staffCriteria: StaffCriteria): Observable<StaffListRes> {
        return this.httpClient.post<StaffListRes>(`${this.baseURL}/get-staffs`, staffCriteria);
    }

    getStaff(staffId: number): Observable<StaffRes> {
        return this.httpClient.get<StaffRes>(`${this.baseURL}/get-staff/${staffId}`);
    }

    getStaffByUsername(username: string): Observable<StaffRes> {
        return this.httpClient.get<StaffRes>(`${this.baseURL}/get-staff-by-username/${username}`);
    }

    updateStaff(staffId: number, staffReq: StaffReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-staff/${staffId}`, staffReq);
    }

    deleteStaff() { }
}

