import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PatientDto } from '../commons/dto/patient';
import { StaffDto } from '../commons/dto/staff';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtToken: string = sessionStorage.getItem('jwtToken') || "{}";

  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  isLoggedIn() {
    return !!sessionStorage.getItem('jwtToken');
  }

  getToken() {
    return this.jwtToken;
  }

  getNameOfAccount(): string {
    const role: string = sessionStorage.getItem('role') || '';
    const username: string = sessionStorage.getItem('username') || '';
    if (role == "ROLE_PATIENT") {
      let patientDto: PatientDto = new PatientDto();
      this.userService.getPatientByUsername(username).subscribe(data => {
        patientDto = data.data;
        console.log(data)
        return patientDto.fullName;
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
        );
      })
      return patientDto.fullName;
    } else if (role == "ROLE_DOCTOR" || role == "ROLE_NURSING") {
      let staffDto: StaffDto = new StaffDto();
      this.userService.getStaffByUsername(username).subscribe(data => {
        staffDto = data.data;
        console.log(data)
        return staffDto.fullName;
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
        );
      })
      return staffDto.fullName;
    } else return "NONE";
  }
}
