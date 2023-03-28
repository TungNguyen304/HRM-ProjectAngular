import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  isFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/http/auth.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';

type errorEmail = 'errorEmail';
type errorPassword = 'errorPassword';
const regex = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password:
    /^[a-zA-Z](?=.*[a-z])(?=.[A-Z]*)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,100}$/,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private loadingService: LoadingService
  ) {}
  public loginForm: FormGroup;
  public errorEmail: string = 'Email is empty!';
  public errorPassword: string = 'Password is empty!';
  @ViewChild('pass') pass: ElementRef;
  ngOnInit() {
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

  handleDisplayPassword(event: MouseEvent) {
    if (
      (event?.target as HTMLIFrameElement).className.includes('bi-eye-fill')
    ) {
      this.pass.nativeElement.type = 'text';
      (event?.target as HTMLIFrameElement).className =
        'bi bi bi-eye-slash-fill eye';
    } else {
      (event?.target as HTMLIFrameElement).className = 'bi bi-eye-fill eye';
      this.pass.nativeElement.type = 'password';
    }
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
        .subscribe(
          (data: any) => {
            this.loadingService.setloading(false);
            localStorage.setItem('token', data.response.access_token);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Login success!',
            });
            this.router.navigate(['/']);
          },
          (err) => {
            this.loadingService.setloading(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Fail',
              detail: 'Email or password is not correct!',
            });
            this.loginForm.patchValue({
              email: '',
              password: '',
            });
            Object.keys(this.loginForm.controls).forEach((item) => {
              if (isFormControl(this.loginForm.get(item))) {
                this.loginForm.get(item)?.markAsPristine();
              }
            });
          }
        );
      
    }
  }
}
