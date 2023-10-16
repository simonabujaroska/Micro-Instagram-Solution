import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IItem } from "./item";
import { ItemService } from "./item.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'mi-items',
    templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy{

    pageTitle: string = 'micro-instagram item-list';
    items: IItem[]=[];
    totalItems!: number;
    itemsToDisplay: IItem[] = [];
    errorMessage: string=''
    subscription!: Subscription; 
    currentPage: number = 1;
    itemsPerPage: number = 6; 
    
    constructor(private itemService: ItemService ){}

     
    ngOnInit(): void {
        this.loadAllItems();     
    } 

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadItems();
    }
    //loads all items
    loadAllItems(){
        console.log("loadAllItems is called")
        this.subscription=this.itemService.getItems().subscribe({
            next: items=> {
                this.items=items
                this.totalItems = items.length;
                this.loadItems()},
            error: err=>this.errorMessage=err
         });
          //this.items=this.itemService.getItemsHardCoded()
    }

    //loads the items to be displayed
    loadItems() {
        console.log("load items is called")
        console.log(this.currentPage)
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.itemsToDisplay = this.items.slice(startIndex, endIndex);
    }

    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}