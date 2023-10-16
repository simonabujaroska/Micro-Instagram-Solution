import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { IItem } from './item';
import { ItemService } from './item.service';

@Component({
  //selector: 'mi-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit{
  
  title: string='Item Detail';
  item: IItem | undefined;
  errorMessage:string='';

  constructor(private itemService: ItemService,private activatedRoute : ActivatedRoute,
              private router: Router){};

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getItem(id);
    }
  }
  getItem(id: number): void {
    this.itemService.getItem(id).subscribe({
      next: item => this.item = item,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/items']);
  }

}
