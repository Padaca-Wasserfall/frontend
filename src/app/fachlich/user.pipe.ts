import { Pipe, PipeTransform } from '@angular/core';
import { User } from './interfaces';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(user: User): string {
    console.log('userpipe', user);
    if (user) {
      return (user.vorname && user.nachname) ? user.vorname + ' ' + user.nachname : user.username;
    } else {
      return '';
    }
  }
}
