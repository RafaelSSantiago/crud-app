import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemDialogComponent } from './dialogs/add-item-dialog/add-item-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from './material-design/material-design.module';
import { DialogService } from './dialogs/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification-service/notification.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog-component/confirm-dialog.component';

@NgModule({
  declarations: [AddItemDialogComponent, ConfirmDialogComponent],
  providers: [DialogService, NotificationService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [AddItemDialogComponent, MatDialogModule, MatSnackBarModule],
})
export class SharedModule {}
