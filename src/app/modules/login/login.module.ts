import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routing';
import { LoginContainer } from './containers/login-page/login.container';

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes),
        SharedModule
    ],
    declarations: [
        LoginContainer
    ],
    exports: [

    ],
    providers: []
})

export class LoginModule {}