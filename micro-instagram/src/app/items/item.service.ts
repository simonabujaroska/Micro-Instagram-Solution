import { Injectable } from "@angular/core";
import { IItem } from "./item";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map, of, tap, throwError } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class ItemService{

  private url : string='https://jsonplaceholder.typicode.com/photos'

  constructor(private httpClient: HttpClient){}

    getItems() : Observable<IItem[]>{

        return this.httpClient.get<IItem[]>(this.url).pipe(
          tap(data =>console.log(JSON.stringify(data))),
          catchError(this.handleError)
        );

    }
    getFirstItems(): Observable<IItem[]> {
      return this.httpClient.get<IItem[]>(this.url).pipe(
        map(items => items.slice(0, 20)), 
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

    getItem(id: number):Observable<IItem>{

      if (id === 0) {
        return of(this.initializeItem());
      }
      const itemUrl=`${this.url}/${id}`;
      return this.httpClient.get<IItem>(itemUrl)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
    }


    createItem(item: IItem): Observable<IItem> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      item.id = 0;
      return this.httpClient.post<IItem>(this.url, item, { headers })
        .pipe(
          tap(data => console.log('createItem: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

  updateItem(item: IItem): Observable<IItem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${item.id}`;
    return this.httpClient.put<IItem>(url, item, { headers })
      .pipe(
        tap(data => console.log('updateItem: ' + item.id+'contents: '+JSON.stringify(data))),
        // Return the product on an update
        map(() => item),
        catchError(this.handleError)
      );
  }

  deleteItem(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.httpClient.delete<IItem>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
      
  }


    getItemsHardCoded() : IItem[]{
      return [
        {
          "albumId": 1,
          "id": 1,
          "title": "accusamus beatae ad facilis cum similique qui sunt",
          "url": "https://via.placeholder.com/600/92c952",
          "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
          "albumId": 1,
          "id": 2,
          "title": "reprehenderit est deserunt velit ipsam",
          "url": "https://via.placeholder.com/600/771796",
          "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
          "albumId": 1,
          "id": 3,
          "title": "officia porro iure quia iusto qui ipsa ut modi",
          "url": "https://via.placeholder.com/600/24f355",
          "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
        {
          "albumId": 1,
          "id": 4,
          "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
          "url": "https://via.placeholder.com/600/d32776",
          "thumbnailUrl": "https://via.placeholder.com/150/d32776"
        },
        {
          "albumId": 1,
          "id": 5,
          "title": "natus nisi omnis corporis facere molestiae rerum in",
          "url": "https://via.placeholder.com/600/f66b97",
          "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
        },
        {
          "albumId": 1,
          "id": 6,
          "title": "accusamus ea aliquid et amet sequi nemo",
          "url": "https://via.placeholder.com/600/56a8c2",
          "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
        }
      ]
  }

  initializeItem(): IItem {
    return {
      id: 0,
      albumId: 0,
      title: '',
      thumbnailUrl: '',
      url: ''
    };
  }

    handleError(err : HttpErrorResponse){
     let errorMessage ='An error occured while executing methods from ItemService';
     console.error(errorMessage)
     return throwError(()=>errorMessage);
    }

}


