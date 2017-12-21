import { Pipe, PipeTransform } from '@angular/core';
import { User } from './interfaces';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(user: User): string {
    return user ? user.vorname + ' ' + user.nachname : '';
  }
}
