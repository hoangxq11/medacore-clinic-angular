import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { AppointmentScheduleListRes, AppointmentScheduleRes } from '../commons/dto/appointment-schedule';
import { BaseResponse } from '../commons/dto/response';
import { AppointmentScheduleReq } from '../commons/request/appointment-schedule.req';

@Injectable({
    providedIn: 'root'
})
export class AppointmentScheduleService {
    private baseURL = ROOT_API + "/appointment-schedule";
    constructor(private httpClient: HttpClient) { }

    getAllSchedules(): Observable<AppointmentScheduleListRes> {
        return this.httpClient.get<AppointmentScheduleListRes>(`${this.baseURL}`);
    }

    getScheduleById(scheduleId: number): Observable<AppointmentScheduleRes> {
        return this.httpClient.get<AppointmentScheduleRes>(`${this.baseURL}/get-schedule/${scheduleId}`);
    }

    getScheduleOfDoctor(doctorId: number): Observable<AppointmentScheduleListRes> {
        return this.httpClient.get<AppointmentScheduleListRes>(`${this.baseURL}/get-schedule-of-doctor/${doctorId}`);
    }

    getScheduleOfPatient(patientUsername: string): Observable<AppointmentScheduleListRes> {
        return this.httpClient.get<AppointmentScheduleListRes>(`${this.baseURL}/get-schedule-of-patient/${patientUsername}`);
    }

    createSchedule(appointmentScheduleReq: AppointmentScheduleReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create`, appointmentScheduleReq);
    }

    updateSchedule(scheduleId: number, appointmentScheduleReq: AppointmentScheduleReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-schedule/${scheduleId}`, appointmentScheduleReq);
    }

    removeSchedule(scheduleId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/delete-schedule/${scheduleId}`);
    }
}

