import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ObiWanLocation} from './obi-wan-location.component';
import {DarkJediList} from './dark-jedi-list.component';
import {ObiWanLocationService} from './obi-wan-location.service';

@Component({
    selector: 'my-app',
    template: `
      <div class="app-container">
        <div class="css-root">
          <obi-wan-location></obi-wan-location>
          <dark-jedi-list></dark-jedi-list>

        </div>
      </div>
      `,
  directives: [DarkJediList, ObiWanLocation],
  providers: [ObiWanLocationService],

})
export class AppComponent {
}
