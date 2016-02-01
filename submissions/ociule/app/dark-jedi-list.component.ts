import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ObiWanLocationService} from './obi-wan-location.service';
import {DarkJediService} from './dark-jedi.service';

class Jedi {
  constructor(public id: number, public name: string, public homeworld: string) {}
}

class JediAppreticeshipStructure {
  public slots: Array<Jedi>;

  constructor(public length: number, private _darkJediService: DarkJediService) {
    this.slots = new Array(5);
    for (var i = 0; i < this.length; i++) {
      this.slots[i] = null;
    }

  }

  start() {
    let startIndex = 2;
    let startId = 3616;
    this.populateSlot(startIndex, startId);
  }

  populateSlot(slotIndex: number, jediId: number) {
    if (slotIndex >= 0 && slotIndex < this.length) {
      this._darkJediService.getById(jediId).subscribe(jedi => {
        this.slots[slotIndex] = jedi;
        let masterId = jedi.master.id;
        let apprenticeId = jedi.apprentice.id;
        this.populateSlot(slotIndex - 1, masterId);
        this.populateSlot(slotIndex + 1, apprenticeId);
      });
    }
  }

  scrollUp() {
    // cancelInFlightRequests()
    this.shiftList(-1);
  }
  scrollDown() {}

  shiftList(steps: number) {
    let newSlots: Array<Jedi> = new Array(5);
    for (var i = 0; i < this.length; i++) {
      let jediInSlotI = this.slots[i];
      newSlots[i] = jediInSlotI;
    }
    this.slots = newSlots;
  }
}

@Component({
  selector: 'dark-jedi-list',
  template: `
    <section class="css-scrollable-list">
    <ul class="heroes css-slots">
      <li *ngFor="#jedi of darkJedis" class="css-slot" [class.selected]="jedi && jedi.homeworld.name === location">
        <h3>{{jedi && jedi.name}}</h3>
        <h6 *ngIf="jedi">Homeworld: {{jedi && jedi.homeworld.name}}</h6>
      </li>
    </ul>

    <div class="css-scroll-buttons">
      <button class="css-button-up" (click)="scrollUp()"></button>
      <button class="css-button-down" (click)="scrollDown()"></button>
    </div>
    </section>`,
    styles:[`
      li.selected {
        color: red;
      }
      .heroes li:hover {
        color: #607D8B;
        background-color: #EEE;
        left: .1em;
      }
  `],
    providers: [DarkJediService],
})
export class DarkJediList implements OnInit {
  constructor(private _locationService: ObiWanLocationService,
    private _darkJediService: DarkJediService) { }

  private location : string;
  private darkJedis : Array<Jedi>;
  private jediAppStruct : JediAppreticeshipStructure;

  ngOnInit() {
    this._locationService.location.subscribe(location => {
      this.location = location;
    });

    this.darkJedis = [null, null, null, null, null];
    this.darkJedis[2] = new Jedi(11, "Darth S", "Somov Rit");
    this.jediAppStruct = new JediAppreticeshipStructure(5, this._darkJediService);

    this.jediAppStruct.start()

    this.darkJedis = this.jediAppStruct.slots;
  }

  scrollUp() {
    this.jediAppStruct.scrollUp();
  }
  scrollDown() {
    this.jediAppStruct.scrollDown();
  }
}
