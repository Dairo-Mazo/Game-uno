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
    @Inject(MAT_DIALOG_DATA) public data: {type: string, player: string},
  ){}


  public colors = [
    {color: '#0297dd'},
    {color: '#ffc827'},
    {color: '#34974b'},
    {color: '#eb313d'}
  ];
  
  navigateHome(){
    location.reload();
  }

  closeDialog(color:string){
    this.modal.close({data: color})
  }
}
