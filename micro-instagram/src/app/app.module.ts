import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { ItemDetailComponent } from './items/item-detail.component'
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './items/item-list.component';
import { HomeComponent } from './home/home.component';
import { PaginationComponent } from './shared/pagination.component';
import { ItemFormComponent } from './items/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent,
    HomeComponent,
    PaginationComponent,
    ItemFormComponent
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'items', component: ItemListComponent  },
      {path: 'items/:id', component: ItemDetailComponent  },       
      {path: 'home', component: HomeComponent  },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home',pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
