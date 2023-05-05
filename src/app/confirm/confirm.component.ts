import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },private http:HttpClient,private dialog:MatDialog,
  ) {}
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
deleteRecord(recordId: number) {
  const confirmationDialog = this.dialog.open(ConfirmComponent, {
    data: {
      message: 'Are you sure you want to delete this record?',
      buttonText: {
        ok: 'Delete',
        cancel: 'Cancel'
      }
    }
  });

  confirmationDialog.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.http.delete(`/api/records/${recordId}`).subscribe(
        (response) => {
          console.log('Record deleted successfully:', response);
        },
        (error) => {
          console.error('Error deleting record:', error);
        }
      );
    }
  });
}


}
