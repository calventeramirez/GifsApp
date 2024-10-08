import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = "BhUhz2Iak5YRJyKXrJQJRAh80IHFFDyz";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs/';

  constructor(private http: HttpClient) { 
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem("history", JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem("history")) return;
    this._tagsHistory = JSON.parse(localStorage.getItem("history")!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag:string):void{
    if(tag.length == 0) return; //Para que no entre consultas vacias
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    //con esta instruccion llamamos a la api con el tag, ademas hago que la respuesta sea de tipo SearchResponse para tener la interfaz
    this.http.get<SearchResponse>(this.serviceUrl+'search', {params})
    .subscribe(res => {
      this.gifList = res.data;
    })
  }
}
