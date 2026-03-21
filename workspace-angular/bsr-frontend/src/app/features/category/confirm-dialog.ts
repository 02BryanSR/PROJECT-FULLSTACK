import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.css'],
})
export class ConfirmDialog {
  private readonly ref = inject(MatDialogRef<ConfirmDialog>);
  readonly message = inject<string>(MAT_DIALOG_DATA);

  ok(): void { this.ref.close(true); }
  cancel(): void { this.ref.close(false); }
}
