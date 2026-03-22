import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon';
import { ClickOutsideDirective } from '../../directives/click-outside';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-dropdown',
  imports: [IconComponent, RouterLink, ClickOutsideDirective],
  templateUrl: './user-dropdown.html',
  styleUrl: './user-dropdown.css',
})
export class UserDropdown {
  protected authService = inject(AuthService);

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    if (this.isOpen()) this.isOpen.set(false);
  }

  handleLogout() {
    this.authService.logout();
    this.close();
  }
}
