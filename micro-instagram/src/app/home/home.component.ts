import { Component, OnDestroy, OnInit } from '@angular/core';
import { IItem } from '../items/item';
import { ItemService } from '../items/item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
 
  items: IItem[]=[];
  totalItems!: number;
  errorMessage: string=''
  subscription!: Subscription; 

  constructor(private itemService: ItemService ){}
  
  ngOnInit(): void {
     this.loadAllItems();     
  } 
  //loads all items
  loadAllItems(){
    console.log("loadAllItems is called")
    this.subscription=this.itemService.getFirstItems().subscribe({
        next: items=> {
            this.items=items
            this.totalItems = items.length;
            },
        error: err=>this.errorMessage=err
     });
      //this.items=this.itemService.getItemsHardCoded()

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
}
