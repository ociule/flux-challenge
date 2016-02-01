import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DarkJediService {
  private baseURL = "http://localhost:3000/dark-jedis/";
  private startURL = this.baseURL + "3616";

  constructor(private http: Http) {}

  getById(id: number) {
    return this.http.get(this.baseURL + id).map(res => res.json());
  }

}
