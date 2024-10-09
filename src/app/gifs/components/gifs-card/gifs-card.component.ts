import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
    selector: 'gifs-card',
    templateUrl: './gifs-card.component.html',
    styleUrls: ['./gifs-card.component.css'],
})
export class GifsCardComponent implements OnInit{ //OnInit para ver que el Gif no viene vacio 
    
    @Input()
    public gif !: Gif;

    ngOnInit(): void {
        if(!this.gif) throw new Error("La propiedad Gif es requerida");
    } 
}
