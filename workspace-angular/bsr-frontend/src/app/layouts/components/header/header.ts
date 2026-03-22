import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon';
import { UserDropdown } from '../../../shared/components/user-dropdown/user-dropdown';

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink, UserDropdown],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly navLinks = [
    { label: 'HOME', route: '/home' },
    { label: 'MUJER', route: '/mujer' },
    { label: 'HOMBRE', route: '/hombre' },
    { label: 'NIÑOS', route: '/ninos' },
    { label: 'ACCESORIOS', route: '/accesorios' },
  ];
}
