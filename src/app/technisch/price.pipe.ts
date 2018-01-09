import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    value = value / 100; // von Cent zu Euro umrechnen
    return value + ' €';
  }
}
