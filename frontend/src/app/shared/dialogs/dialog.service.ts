import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openAddItemDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '400px',
    });

    return dialogRef.afterClosed();
  }
}
