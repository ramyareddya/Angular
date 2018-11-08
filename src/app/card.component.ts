import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ProfileService} from './services/profile.service';
import {Card, IPagedResults} from './model/card';
// import Any = jasmine.Any;

@Component({
  selector: 'card',
  styles: [`
    .card{
      border: 1px outset #ffffc9;
      border-radius: 10px;
      width: 300px;
      margin: auto;
        -webkit-box-shadow: 7px 7px 5px 0px rgba(0,0,0,0.49);
        -moz-box-shadow: 7px 7px 5px 0px rgba(0,0,0,0.49);
        box-shadow: 7px 7px 5px 0px rgba(0,0,0,0.49);
        background: #121212;
        display: inline-block;
  margin: 25px 10px;
    }

    .card-content{
      padding: 10px;
      background: #222;
      margin: 15px 16px;
    }

    .card, .card-content{
      border-radius: 10px;
    }

    .card img{
      display: block;
      margin: 20px auto;
      border-radius: 2px;
      border: solid 1px #444;
    }

    .card-name{
      background: #494949;
      color: white;
      padding: 10px;
      border-radius: 8px;
    }

    .card p span{
      margin: 0 4px;
    }
  `],
  template: `
 <search-bar (searchChanged)= "searchChanged($event)"></search-bar>
    <div class="card" *ngFor="let card of cards">
      <div class="card-content">
        <div class="card-name">{{card.name}}</div>
        <img src="{{card.image}}" alt="profile"/>
        <p>
          <span>Birthday:</span>
          <span>{{card.birthday}}</span>
          <span>Home Planet:</span>
          <span>{{card.planet}}</span>
        </p>
        <p>
          <!-- Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people -->
          <span>Home World:</span>
          <span>{{card.planets[0].homeworld}}</span>
        </p>
      </div>
    </div>
    <cm-pagination [totalItems]="totalRecords" 
            [pageSize]="pageSize" 
            (pageChanged)="pageChanged($event)"></cm-pagination> 
    `
})

export class CardComponent implements OnInit {

   cards: Card[]

  constructor(private http: Http, private ProfileService: ProfileService, ) {}

  ngOnInit () {
    //this.loadComments()

      this.getCustomersPage(1);
  }

  loadComments(){
    // Get all comments
    this.ProfileService.getComments()
        .subscribe(
            cards => {
              console.log(cards)
              this.cards = cards} , //Bind to view
            err => {
              // Log errors if any
              console.log(err);
            });
  }


  // Pagination starts
    pageChanged(page: number) {
        this.getCustomersPage(page);
    };
    totalRecords: number = 0;
    pageSize: number = 3;


   searchChanged(searchFilter: string) {
       this.ProfileService.filterCustomers(searchFilter)
           .subscribe((response: IPagedResults<Card[]>) => {
                   this.cards = response.results;
                   this.totalRecords = response.totalRecords;

               },

               (err: any) => console.log(err),

               () => console.log('getCustomersPage() retrieved customers for page: ' ))
   };
   getCustomersPage(page: number) {
        this.ProfileService.getCustomersPage((page), this.pageSize)
            .subscribe((response: IPagedResults<Card[]>) => {
                    this.cards  = response.results;
                    this.totalRecords = response.totalRecords;
                },
                (err: any) => console.log(err),
                () => console.log('getCustomersPage() retrieved customers for page: ' + page));
    }

}