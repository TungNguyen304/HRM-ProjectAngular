import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  isFormControl,
  Validators,
} from '@angular/forms';


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
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}
  public loginForm: FormGroup;
  public errorEmail: string = 'Email is empty!';
  public errorPassword: string = 'Password is empty!';
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

  onSubmit() {
    Object.keys(this.loginForm.controls).forEach((item) => {
      if (isFormControl(this.loginForm.get(item))) {
        this.loginForm.get(item)?.markAsTouched();
      }
    });
  }
}
