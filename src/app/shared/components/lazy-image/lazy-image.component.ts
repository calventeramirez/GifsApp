import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'share-lazy-image',
    templateUrl: './lazy-image.component.html',
    styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {
    
    @Input()
    public url !: string;

    @Input()
    public alt : string = "";

    protected hasLoaded: boolean = false;

    onLoad():void{
        setTimeout(() => {
            this.hasLoaded = true;
        }, 2000); //2 segundos para que cargue los Gifs
    }

    ngOnInit(): void {
        if (!this.url) throw new Error('Error. No hay URL para cargar el Gif');
    } 
}
