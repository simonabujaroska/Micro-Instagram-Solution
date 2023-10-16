import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './item.service';
import { IItem } from './item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mi-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit, OnDestroy{

  title:string='Form'
  itemForm!: FormGroup;
  item: IItem ={"albumId": 0,
  "id": 0,
  "title": " ",
  "url": " ",
  "thumbnailUrl": " "};
  
  private sub!: Subscription;
  errorMessage: string ='';

  constructor(private itemService: ItemService,
    private fb: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router: Router){
  }
  
  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: [''],
      albumId: [''],
      url: [''],
      thumbnailUrl:[''],
      
    });
    console.log('itemForm On Init')

    // Read the product Id from the route parameter
    //here the code subscribes, everytime the parameter :id is changed the code gets notified
    this.sub = this.activatedRoute.paramMap.subscribe(
      params => {
        const id = +params.get('id')!;
        this.getItem(id);
      },
    );
    
  }

  getItem(id: number): void {
    this.itemService.getItem(id)
      .subscribe({
        next: (item: IItem) => this.displayItem(item),
        error: err => this.errorMessage = err
      });
  }
  displayItem(item: IItem): void {
    if (this.itemForm) {
      this.itemForm.reset();
    }
    this.item = item;

    if (this.item.id === 0) {
      this.title = 'Upload Photo';
    } else {
      this.title = `Edit Photo: ${this.item.id}`;
    }
}

saveProduct(): void {
  if (this.itemForm.valid) {
    if (this.itemForm.dirty) {
      const i = { ...this.item, ...this.itemForm.value };

      if (i.id === 0) {
        this.itemService.createItem(i)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err,
          
          });
          console.log("Successfully created")
      } else {
      
        this.itemService.updateItem(i)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
          console.log("Successfully updated")
          
      }
    } else {
      this.onSaveComplete();
    }
  } else {
    this.errorMessage = 'Please correct the validation errors. You have to change at least one field to update the item.';
  }
}

deleteItem(): void {
 
    if (confirm(`Are you sure you want to delete the photo with title: ${this.item.title}?`)) {
      this.itemService.deleteItem(this.item.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
        console.log("Successfully deleted")
    }
  
}

onSaveComplete(): void {
  this.itemForm.reset();
  this.router.navigate(['/items']);
  console.log()
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}
}
