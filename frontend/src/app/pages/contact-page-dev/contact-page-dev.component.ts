import {Component} from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {GitHubIconComponent} from "./svg/GitHubIconComponent";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {TelegramIconComponent} from "./svg/TelegramIconComponent";

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
    selector: 'app-contact-page-dev',
    standalone: true,
    imports: [
        MatGridListModule,
        MatCardModule,
        NgForOf,
        MatIconModule,
        RouterLink,
        MatButtonModule,
        TelegramIconComponent,
        GitHubIconComponent,
    ],
    template: `
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

        <mat-card-content>
            <div class="spacer" style="padding: 16px">
                <mat-card>
                    <mat-card-content class="centered-icon">
                        Если у Вас есть предложения по развитию функционала Портала , прошу связаться со мной.
                    </mat-card-content>
                </mat-card>
            </div>
            <div class="spacer" style="padding: 16px">
                <mat-card>
                    <mat-card-content class="centered-icon">
                        <mat-icon>
                            <app-github-icon></app-github-icon>
                        </mat-icon>
                        <a mat-button href="https://github.com/vremyavnikuda" target="_blank">vremyavnikuda</a>
                    </mat-card-content>
                </mat-card>
            </div>
            <div class="spacer" style="padding: 16px">
                <mat-card>
                    <mat-card-content class="centered-icon">
                        <mat-icon>
                            <app-telegram-icon></app-telegram-icon>
                        </mat-icon>
                        <a mat-button href="https://t.me/vremayvnikuda" target="_blank">vremyavnikuda</a>
                    </mat-card-content>
                </mat-card>

            </div>
        </mat-card-content>
    `,
    styles: [`
      .centered-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

    `]
})

export class ContactPageDevComponent {

    goToMyGitHub(): void {
        window.open('https://github.com/vremyavnikuda', '_blank');
    }
}
