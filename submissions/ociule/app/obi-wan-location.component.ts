import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ObiWanLocationService} from './obi-wan-location.service';

@Component({
  selector: 'obi-wan-location',
  template: `
    <h1 class="css-planet-monitor">Obi-Wan currently on {{location}}</h1>
  `,
})
export class ObiWanLocation implements OnInit {
  constructor(private _locationService: ObiWanLocationService) { }

  public location : string;

  ngOnInit() {
    this._locationService.location.subscribe(location => {
      this.location = location;
    });
  }
}
