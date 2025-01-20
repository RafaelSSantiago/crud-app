import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification-service/notification.service'; // Importado
import { ItemService } from '../../services/item-service.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
})
export class AddItemDialogComponent {
  addItemForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddItemDialogComponent>,
    private itemService: ItemService,
    private notificationService: NotificationService // Injetado
  ) {
    this.addItemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('file') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.previewImage(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      this.previewUrl = null;
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addItemForm.valid && this.selectedFile) {
      this.itemService.uploadPhoto(this.selectedFile).subscribe(
        (response) => {
          const photoUrl = response.url;
          const newItem = {
            title: this.addItemForm.value.title,
            description: this.addItemForm.value.description,
            photoUrl: photoUrl,
          };
          this.itemService.adicionarItem(newItem).subscribe(
            () => {
              this.notificationService.showSuccess(
                'Item adicionado com sucesso!'
              );
              this.dialogRef.close(true);
            },
            (error) => {
              console.error('Erro ao adicionar o item:', error);
              this.notificationService.showError(
                'Erro ao adicionar o item. Tente novamente.'
              );
            }
          );
        },
        (error) => {
          console.error('Erro no upload da foto:', error);
          this.notificationService.showError(
            'Erro no upload da foto. Tente novamente.'
          );
        }
      );
    } else {
      this.notificationService.showWarning(
        'Por favor, preencha todos os campos e selecione uma foto.'
      );
    }
  }
}
