import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'ccsp-login-container',
    templateUrl: './login.container.html', 
    styleUrls: ['login.container.scss']
})

export class LoginContainer implements OnInit{

    loginForm: FormGroup;
    errorLogin: boolean = false;

    constructor(private router: Router) {}
    
    ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }

    submitLogin() {
        if (this.loginForm.valid && this.loginForm.touched) {
            this.router.navigate(['/pending-approval']);
        }
    }
}