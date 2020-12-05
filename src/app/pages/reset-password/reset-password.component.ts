import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm = new FormGroup({
    password: new FormControl()
  });
  token = '';
  result = {
    error: false,
    msg: ''
  };

  constructor(private authServ: AuthService, private actRouter: ActivatedRoute, private router: Router) {
    const paramsS = this.actRouter.params.subscribe(params => {
      this.token = params.token;
    });
  }

  ngOnInit(): void { }

  Send() {
    const data = this.ResetPasswordForm.value;
    data.token = this.token;
    const s = this.authServ.ResetPassword(data).subscribe(r => {
      this.result = r;
      if (r.error === false) {
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000);
      }
      s.unsubscribe();
    });

  }

}
