import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(transformvalues, args:string[]): any {
    return Object.keys(transformvalues)
    .filter(enumMember => !isNaN(parseInt(enumMember, 10)))
    .map(enumMember => this.keypair(transformvalues, enumMember));
  }

  private keypair(transformvalue: any, enumMember: any) {
    return { key: enumMember, value: transformvalue[ enumMember ] }
  }
}
