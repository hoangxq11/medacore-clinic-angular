import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { PrescriptionRes } from '../commons/dto/prescription';
import { BaseResponse } from '../commons/dto/response';
import { PrescriptionReq } from '../commons/request/prescription.req';

@Injectable({
    providedIn: 'root'
})
export class PrescriptionService {
    private baseURL = ROOT_API + "/prescription";
    constructor(private httpClient: HttpClient) { }

    createPrescription(prescriptionReq: PrescriptionReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create`, prescriptionReq);
    }

    getPrescriptionOfMedicalRecord(medicalRecordId: number): Observable<PrescriptionRes> {
        return this.httpClient.get<PrescriptionRes>(`${this.baseURL}/prescription-of-medical-record/${medicalRecordId}`);
    }
}