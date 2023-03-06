import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego-uno',
  templateUrl: './juego-uno.component.html',
  styleUrls: ['./juego-uno.component.css']
})
export class JuegoUnoComponent  implements OnInit{

  ngOnInit(){
    this.getCards()
  }

  public cardsGame: any = [];
  public cardsPc: any = [];
  public cardsUser: any = [];
  public message: string = 'Tu turno!'

  getCards() {
    const valuesCards = [0,1,2,3,4,5,6,7,8,9, '+2', '↻', '🛇', '+4', 'color'];
    const valueColors = ['blue', 'red', 'green', 'yellow']

    let card, color, haveCardStart: any;

    for (let i = 0; i <= 7; i++) {
      
      card = valuesCards[Math.floor(Math.random() * valuesCards.length)];
      color = valueColors[Math.floor(Math.random() * valueColors.length)];

      this.cardsPc.push({card:card, color:color})

      card = valuesCards[Math.floor(Math.random() * valuesCards.length)];
      color = valueColors[Math.floor(Math.random() * valueColors.length)];

      this.cardsUser.push({card:card, color:color})
      
    }

    card = Math.floor(Math.random() * 9);
    color = valueColors[Math.floor(Math.random() * valueColors.length)];
    this.cardsGame.push({card:card, color:color})

    this.cardsUser.forEach((element:any) => {
      if(element.card == this.cardsGame[0].card || element.color == this.cardsGame[0].color){
        haveCardStart = true
      }
    });

    if(!haveCardStart){
      this.message = 'No tienes la carta que se necesita para jugar, debes tomar más cartas'
    }

  }



  play(card:any, color:any, index:any){
    

    if(this.cardsGame[0].card == card || this.cardsGame[0].color == color){

      this.cardsGame = []
      this.cardsGame.push({card:card, color:color})

      this.cardsUser.splice(index,1)

      setTimeout(() => {

        this.playPc()
      }, 5000);

    }


    


  }


  playPc(){
    let value:any = [], card: any, breakClicle:boolean = true
  
    this.cardsPc.forEach((element:any) => {

      if(element.card == this.cardsGame[0].card || element.color == this.cardsGame[0].color){
        value.push({card: element.card, color: element.color})
      }

    });

    
    if(value.length != 0){
      this.cardsGame = []

      card = value[Math.floor(Math.random() * value.length)];
      this.cardsGame.push({card:card.card, color:card.color})

      this.cardsPc.forEach((element: any, index: any) => {
        if(element.card == card.card && element.color == card.color && breakClicle == true){
          
          this.cardsPc.splice(index,1);
          breakClicle = false;
        }
      });
    }
    
  }
  
}


