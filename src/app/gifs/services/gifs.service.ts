import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _tagsHistory: string[] = [];
  private apiKey: string = "CdKqYrwthqEIWwA1n56OV0tGeD7bZB1r";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/';

  constructor(private http: HttpClient) { }

  public get tagsHistory(){
    return [...this._tagsHistory]; //Para pasarlo por referencia
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);  //Esto hace que se filtre todos los elementos del tag metiendolo en uno nuevo pero sin el que esta buscandose
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10); //filtro a solo los 10 primeros
  }

  public searchTag(tag:string):void{
    if(tag.length == 0) return; //Para que no entre consultas vacias

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    //con esta instruccion llamamos a la api con el tag
    this.http.get(this.serviceUrl+'search', {params})
    .subscribe(res => {
      console.log(res);
    })
  }
}
