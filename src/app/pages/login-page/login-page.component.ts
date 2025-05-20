import { Component } from '@angular/core';
import { LoginComponentComponent } from '../../components/login-component/login-component.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponentComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

}
