import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'search-bar',
  styles: [`
    .search-bar{
      text-align: center;
      margin: 20px;
    }

    .search-bar input:focus{
        outline: none;
    }

    .search-bar input{
      padding: 2px 10px;
      font-size: 20px;
      border-radius: 2px;
      background: #999;
      margin: auto;
      color: #222;
    } 
  `],
  template: `
    <div class="search-bar">
      <input type="text" placeholder="Search Your Destiny" [(ngModel)]="model.filter"  (keyup)="filterChanged($event)" />
    </div>
  `
})
export class SearchBarComponent {
  model: { filter: string } = { filter: null };

  @Output()
  searchChanged: EventEmitter<string> = new EventEmitter<string>();

  filterChanged(event: any) {
    event.preventDefault();
    this.searchChanged.emit(this.model.filter); //Raise changed event
  }
}
