import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { BodyContentComponent } from "./components/body-content/body-content.component";
import { FooterComponent } from './components/footer/footer.component';
import { SuccessMessageService } from './services/success-message.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrudProject';

}
