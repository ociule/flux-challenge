import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ObiWanLocationService {
  private socket: WebSocket;
  private _locationObserver: any;
  public location: Observable<string>;

  constructor() {
    this.socket = new WebSocket("ws://localhost:4000");

    // Observable data service pattern from https://coryrylan.com/blog/angular-2-observable-data-services
    this.location = new Observable(observer => {
      this._locationObserver = observer;
    }).share();

    var service = this;
    this.socket.onopen = function() {
			this.send("hello!");
			this.onmessage = function(event) {
				var location = JSON.parse(event.data).name;
        service._locationObserver.next(location);
			}
		}
  }
}
