import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
    selector: 'shared-sidebar',
    templateUrl: `./sidebar.component.html`,
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { 

    constructor(private gifsService:GifsService){}

    //Al ser privado el servicio de Giff necesito un Getter para poder usarlo en el HTML
    public get tags(){
        return this.gifsService.tagsHistory;
    }
}
