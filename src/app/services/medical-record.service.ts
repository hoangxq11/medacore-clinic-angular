import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { MedicalRecordInfoRes, MedicalRecordListRes, MedicalRecordRes } from '../commons/dto/medical-record';
import { BaseResponse } from '../commons/dto/response';
import { MedicalRecordInfoReq, MedicalRecordReq } from '../commons/request/medical-record.req';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordService {
    private baseURL = ROOT_API + "/medical-record";
    constructor(private httpClient: HttpClient) { }

    getAllMedicalRecords(): Observable<MedicalRecordListRes> {
        return this.httpClient.get<MedicalRecordListRes>(`${this.baseURL}`);
    }

    getAllMedicalRecordsOfDoctor(doctorUsername: string): Observable<MedicalRecordListRes> {
        return this.httpClient.get<MedicalRecordListRes>(`${this.baseURL}/doctor/${doctorUsername}`);
    }

    getAllMedicalRecordsOfPatient(patientUsername: string): Observable<MedicalRecordListRes> {
        return this.httpClient.get<MedicalRecordListRes>(`${this.baseURL}/patient/${patientUsername}`);
    }

    getMedicalRecordById(medicalRecordId: number): Observable<MedicalRecordRes> {
        return this.httpClient.get<MedicalRecordRes>(`${this.baseURL}/${medicalRecordId}`);
    }

    createMedicalRecord(medicalRecordReq: MedicalRecordReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-medical-record`, medicalRecordReq);
    }

    updateStatus(medicalRecordId: number, status: string): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-status/${medicalRecordId}`, status);
    }

    updatePaymentStatus(medicalRecordId: number, paymentStatus: string): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-payment-status/${medicalRecordId}`, paymentStatus);
    }

    removeMedicalRecord(medicalRecordId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${medicalRecordId}`);
    }

    createMedicalRecordInfo(medicalRecordInfoReq: MedicalRecordInfoReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-medical-record-info`, medicalRecordInfoReq);
    }

    getMedicalRecordInfo(medicalRecordId: number): Observable<MedicalRecordInfoRes> {
        return this.httpClient.get<MedicalRecordInfoRes>(`${this.baseURL}/info/${medicalRecordId}`);
    }
}

