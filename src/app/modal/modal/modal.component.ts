import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(
    public modal: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public win: {type: string},
  ){}


  navigateHome(){
    location.reload();
  }
}
