import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppointmentScheduleDto } from 'src/app/commons/dto/appointment-schedule';
import { AppointmentScheduleReq } from 'src/app/commons/request/appointment-schedule.req';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';

@Component({
  selector: 'app-patient-appointment-schedule',
  templateUrl: './patient-appointment-schedule.component.html',
  styleUrls: ['./patient-appointment-schedule.component.scss']
})
export class PatientAppointmentScheduleComponent implements OnInit {
  patientUsername: string = sessionStorage.getItem("username") || ""

  total = 1;
  listAppointmentScheduleDto: AppointmentScheduleDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchDoctorNameValue = '';
  searchDoctorPhoneNumberValue = '';
  visibleDoctorName = false;
  visibleDoctorPhoneNumber = false;

  constructor(
    private appointmentScheduleService: AppointmentScheduleService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListAppointmentSchedule();
  }

  getListAppointmentSchedule(): void {
    this.appointmentScheduleService.getScheduleOfPatient(this.patientUsername).subscribe(data => {
      this.listAppointmentScheduleDto = data.data;
      this.listOfDisplayData = this.listAppointmentScheduleDto;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  resetSearchDoctorName(): void {
    this.searchDoctorNameValue = '';
    this.searchDoctorName();
  }

  resetSearchDoctorPhoneNumber(): void {
    this.searchDoctorPhoneNumberValue = '';
    this.searchDoctorPhoneNumber();
  }

  searchDoctorName(): void {
    this.visibleDoctorName = false;
    this.listOfDisplayData = this.listAppointmentScheduleDto
      .filter((item: AppointmentScheduleDto) => item.staffDto.fullName.indexOf(this.searchDoctorNameValue) !== -1);
  }

  searchDoctorPhoneNumber(): void {
    this.visibleDoctorPhoneNumber = false;
    this.listOfDisplayData = this.listAppointmentScheduleDto
      .filter((item: AppointmentScheduleDto) => item.staffDto.phoneNumber.indexOf(this.searchDoctorPhoneNumberValue) !== -1);
  }

  editSchedule(patientId: number): void {

  }

  removeSchedule(scheduleId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn hủy lịch hẹn này không?</b>',
      nzOnOk: () => {
        let appointmentScheduleReq: AppointmentScheduleReq = new AppointmentScheduleReq();
        appointmentScheduleReq.status = "CANCELED";
        this.appointmentScheduleService.updateSchedule(scheduleId, appointmentScheduleReq).subscribe(data => {
          this.getListAppointmentSchedule();
        }, error => {
          this.notification.create(
            'error',
            'Lỗi máy chủ',
            error.error.message
          );
        })
      }
    });
  }
}