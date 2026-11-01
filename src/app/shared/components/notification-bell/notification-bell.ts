import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notification-bell',
  imports: [],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.scss',
})
export class NotificationBell {

  unreadCount = signal<number>(3)

  unreadCountValue(): number { 
    return this.unreadCount();
  }

  onBellClick() {
    console.log('Notification bell clicked' + this.unreadCountValue());
    this.unreadCount.set(0)
  }
}