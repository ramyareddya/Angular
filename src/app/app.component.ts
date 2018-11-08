import {Component, Input, OnInit} from '@angular/core';
import {Card} from './model/card';
import {ProfileService} from './services/profile.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <div class="logo">
        <img src="/assets/star.svg" />
        <span class="interview-text">The Interview</span>
        <img src="/assets/wars.svg" />
        </div>
        <card></card>
    </div>
  `,
  styles: [`
    .content{
      max-width: 1000px;
      margin: auto;
      padding: 20px;
    }

    .logo{
     text-align: center;
    }

    .interview-text{
      display: block;
      color: #fff;
      font-family: "ITC Serif Gothic", Lato;
      font-size: 2.25em;
      left: -2em;
      letter-spacing: 0.4em;
      right: -2em;;
      text-transform: uppercase;
      top: 29%;
    }
  `],
})
export class AppComponent  {



  public AppComponent() {
    // this.cards = this.getCards();
  }

//   getCards() {
//   //call http service, giving URL and get data
//   //store data in cards.
//   return [];
// }








}
