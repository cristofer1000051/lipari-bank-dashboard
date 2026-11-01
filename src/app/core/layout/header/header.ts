import { Component } from '@angular/core';
import { NotificationBell } from '../../../shared/components/notification-bell/notification-bell';

@Component({
  selector: 'app-header',
  imports: [NotificationBell],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
