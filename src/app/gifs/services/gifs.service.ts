import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _tagsHistory:string[] = [];
  private apiKey:string = "CdKqYrwthqEIWwA1n56OV0tGeD7bZB1r";

  // api.giphy.com/v1/gifs/search?api_key=CdKqYrwthqEIWwA1n56OV0tGeD7bZB1r&q=valorant&limit=10

  constructor() { }

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

    this.organizeHistory(tag);
  }
}
