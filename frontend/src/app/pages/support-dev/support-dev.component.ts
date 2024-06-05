import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-support-dev',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard
  ],
  template: `
    <div style="padding: 16px">
        <h2>Предложение по развитию проекта</h2>
        <form [formGroup]="supportForm" (ngSubmit)="onSubmit()">
          <div>
            <label for="proposal">Ваше предложение:</label>
            <textarea id="proposal" formControlName="proposal" required></textarea>
          </div>
          <div>
            <label for="files">Прикрепить файлы:</label>
            <input id="files" type="file" (change)="onFileSelected($event)" multiple>
          </div>
          <button type="submit" [disabled]="supportForm.invalid">Отправить</button>
        </form>
    </div>
  `,
  styles: [`
    div {
      margin: 20px;
    }
    label {
      display: block;
      margin-top: 10px;
    }
    textarea, input {
      width: 100%;
      margin-top: 5px;
    }
    button {
      margin-top: 15px;
    }
  `]
})
export class SupportDevComponent {
  supportForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      proposal: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.supportForm.valid) {
      const proposalData = this.supportForm.value;
      const formData = new FormData();
      formData.append('proposal', proposalData.proposal);
      this.selectedFiles.forEach(file => formData.append('files', file, file.name));

      fetch('http://localhost:8001/api/user-temporary-data/postHandleProposal', {
        method: 'POST',
        body: formData
      }).then(response => {
        if (response.ok) {
          alert('Предложение успешно отправлено!');
          this.supportForm.reset();
          this.selectedFiles = [];
          (document.getElementById('files') as HTMLInputElement).value = '';
        } else {
          alert('Ошибка при отправке предложения.');
        }
      }).catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке предложения.');
      });
    }
  }
}
