import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CardComponent } from './card.component';
import { SearchBarComponent } from './search-bar.component';
import {HttpModule} from '@angular/http';
import {ProfileService} from './services/profile.service';
import {PaginationModule} from './shared/pagination/pagination.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
      HttpModule,
    FormsModule,
    PaginationModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
