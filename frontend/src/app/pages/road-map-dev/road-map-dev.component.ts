import {Component} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {RoadDevComponent} from "./dir/road-dev";


@Component({
    selector: 'app-road-map-dev',
    template: `
        <app-road-dev></app-road-dev>
    `,
    styles: [`

    `],
    imports: [
        MatCard,
        MatCardContent,
        NgClass,
        RoadDevComponent,
    ],
    standalone: true,
    providers: [RoadDevComponent],
})

export class RoadMapDevComponent {

}


