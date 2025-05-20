import { Component } from '@angular/core';
import { AccountComponent } from '../../components/account/account.component';

@Component({
  selector: 'app-accountpage',
  standalone: true,
  imports: [AccountComponent],
  templateUrl: './accountpage.component.html',
  styleUrl: './accountpage.component.css'
})
export class AccountpageComponent {

}
