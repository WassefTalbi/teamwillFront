import {Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { login } from 'src/app/store/Authentication/authentication.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  errorLogin = '';
  a: any = 10;
  b: any = 20;
  toast!: false;

  year: number = new Date().getFullYear();
  constructor(private formBuilder: UntypedFormBuilder,
              private authService:AuthenticationService,
              private router: Router,


) { }

  ngOnInit(): void {

    // Ensure that SocialAuthService is initialized before calling signIn method

    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if(currentUser['scope'] === 'ADMIN'){
      this.router.navigate(['/']);
    } else if(currentUser['scope'] === 'USER'){
      this.router.navigate(['/User']);
    } else if(currentUser['scope'] === 'STAFF'){
      this.router.navigate(['/Staff']);
    } else if(currentUser['scope'] === 'COMPANY'){
      this.router.navigate(['/Company']);
    }

    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['admin@esprit.tn', [Validators.required, Validators.email]],
      password: ['testTEST#1234', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit(): void {
    this.errorLogin = '';
    this.authService.login(this.f['email'].value, this.f['password'].value).subscribe(
      (response) => {
        if (response && response.accessToken) {
          console.log(response);
          if (this.authService.currentUser()['scope'] === 'ADMIN') {
            this.router.navigate(['/tickets/home']);
          } else if (this.authService.currentUser()['scope'] === 'CONDIDAT') {
            this.router.navigate(['/User']);
          } else if (this.authService.currentUser()['scope'] === 'STAFF') {
            this.router.navigate(['/Staff']);
          } else if (this.authService.currentUser()['scope'] === 'COMPANY') {
            this.router.navigate(['/Company']);
          }
        }
      },
      (error) => {
        if (error.error === 'Invalid username or password') {
          this.errorLogin = 'Invalid username or password';
        }else if (error.error.username) {
          this.errorLogin = 'inavalid mail format';
        }else if (error.error === 'User account is locked') {
      this.errorLogin = 'User account is locked';
    }
      }
    );
  }
  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


 /* signInWithGoogle(): void {
    if (this.socialAuthService) {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else {
      console.error('SocialAuthService is not initialized');
    }
  }
*/
}
