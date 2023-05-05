import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  isFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { AuthService } from 'src/app/core/services/http/auth.service';
import { AccountService } from 'src/app/core/services/state/account.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';

type errorEmail = 'errorEmail';
type errorPassword = 'errorPassword';
const regex = {
  email: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password:
    /^[a-zA-Z](?=.*[a-z])(?=.[A-Z]*)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,100}$/,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private toasMsgService: ToastMsgService
  ) {}
  public loginForm: FormGroup;
  public toast: any;
  public errorEmail = 'Email is empty!';
  public errorPassword = 'Password is empty!';
  @ViewChild('pass') pass: ElementRef;
  public display = false;
  ngOnInit() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.email),
          Validators.minLength(6),
          Validators.maxLength(64),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.password),
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
    });
    this.loginForm.valueChanges.subscribe(() => {
      const email = {
        ...this.loginForm.get('email')?.errors,
      };
      const password = {
        ...this.loginForm.get('password')?.errors,
      };
      if (email) {
        this.handleValidate(email, 'Email', 'errorEmail');
      }

      if (password) {
        this.handleValidate(password, 'Password', 'errorPassword');
      }
    });
  }

  handleValidate(
    actor: any,
    type: string,
    error: errorEmail | errorPassword
  ): void {
    if (actor?.['required']) {
      this[error] = `${type} is empty!`;
    }
    if (actor?.['pattern']) {
      this[error] = `${type} invalidate!`;
    }
    if (actor?.['minlength']) {
      this[error] = `${type} is not ${
        type === 'Email' ? '6' : '8'
      } characters!`;
    }
    if (actor?.['maxlength']) {
      this[error] = `${type} is longer than 64 characters`;
    }
  }

  handleDisplayPassword() {
    this.display = !this.display;
  }

  onSubmit() {
    this.loadingService.setloading(true);
    Object.keys(this.loginForm.controls).forEach((item) => {
      if (isFormControl(this.loginForm.get(item))) {
        this.loginForm.get(item)?.markAsDirty();
      }
    });
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value,
        })
        .pipe(
          switchMap((data: any) => {
            localStorage.setItem('token', data.response.access_token);
            this.toastService.toastSuccess(this.toast.loginSuccess);
            this.router.navigate(['/']);
            return this.authService.getMyInfo();
          }),
          finalize(() => {
            this.loadingService.setloading(false);
          }),
          catchError((err) => {
            this.toastService.toastError(this.toast.loginFail);
            this.loginForm.patchValue({
              email: '',
              password: '',
            });
            Object.keys(this.loginForm.controls).forEach((item) => {
              if (isFormControl(this.loginForm.get(item))) {
                this.loginForm.get(item)?.markAsPristine();
              }
            });
            return throwError(err);
          })
        )
        .subscribe((data: any) => {
          if (data.statusCode === 200) {
            this.accountService.setAccount(data.response);
          }
        });
    }
  }
}
