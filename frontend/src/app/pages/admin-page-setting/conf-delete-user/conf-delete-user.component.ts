import { Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'


/**
 * Подтверждение удаления USER
 * */
@Component({
  selector: 'app-conf-delete-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  template: `
    <p>
      conf-delete-user works!
    </p>
    <h1 mat-dialog-title>{{ data.message }}</h1>
    <div mat-dialog-content>
      <p>Пожалуйста, подтвердите ваш выбор.</p>
    </div>
    <div mat-dialog-actions class="mat-dialog-actions-style" >
      <button mat-button (click)="onCancelClick()">{{ data.buttonText.cancel }}</button>
      <button mat-button (click)="onConfirmClick()">{{ data.buttonText.ok }}</button>
    </div>
  `,
  styles: [`
    .mat-dialog-actions-style{
      margin: 0 auto;
    }
  `]
})
export class ConfDeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
