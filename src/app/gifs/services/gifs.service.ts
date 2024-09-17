import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _tagsHistory:string[] = [];

  constructor() { }

  public get tagsHistory(){
    return [...this._tagsHistory]; //Para pasarlo por referencia
  }

  public searchTag(tag:string):void{
    this._tagsHistory.unshift(tag);
  }
}
