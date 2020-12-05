import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  ForgotPasswordForm = new FormGroup({
    email: new FormControl()
  });

  result = {
    error: false,
    msg: ''
  };

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }

  Send() {
    const s = this.authServ.ForgotPassword(this.ForgotPasswordForm.value).subscribe(r => {
      this.result = r;
      s.unsubscribe();
    });
  }

}
