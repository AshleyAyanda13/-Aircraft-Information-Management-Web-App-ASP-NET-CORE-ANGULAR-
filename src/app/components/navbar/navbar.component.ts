import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
@ViewChild('navbarNav') navbarNav!: ElementRef;

  toggleNavbar() {
    if (this.navbarNav?.nativeElement.classList.contains('show')) {
      this.navbarNav.nativeElement.classList.remove('show'); // Close navbar
    } else {
      this.navbarNav.nativeElement.classList.add('show'); // Open navbar
    }
  }


}
