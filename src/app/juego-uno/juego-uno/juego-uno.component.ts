import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal/modal.component';

@Component({
  selector: 'app-juego-uno',
  templateUrl: './juego-uno.component.html',
  styleUrls: ['./juego-uno.component.css']
})
export class JuegoUnoComponent  implements OnInit{

  constructor(
    public modal: MatDialog
  ){}

  ngOnInit(){
    this.startGame()
  }

  public cardsGame: any = [];
  public cardsPc: any = [];
  public cardsUser: any = [];
  public message: string = 'Tu turno!';
  public spinner: boolean = false;
  public haveCard: any;
  public valuesCards = [0,1,2,3,4,5,6,7,8,9];
  public valueColors = ['#0297dd', '#eb313d', '#34974b', '#ffc827']
  public classGetcards: boolean = false;
  public turn: boolean = true;


  //Función que comienza el juego
  startGame() {

    let card, color

    //Ciclo para generar las 7 cartas del juego
    for (let i = 0; i < 7; i++) {
      
      card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
      color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];

      //Cartas de la maquina
      this.cardsPc.push({card:card, color:color})

      card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
      color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];

      //Cartas del usuario
      this.cardsUser.push({card:card, color:color, play: false})
      
    }

    //Carta con la que se debe comenzar el juego
    card = Math.floor(Math.random() * 9);
    color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];
    this.cardsGame.push({card:card, color:color})

    this.validateCards();
  }


  //Función que valida si el usuario o la Pc tiene cartas para jugar
  validateCards(){

    let haveCard = false;

    this.cardsUser.forEach((element:any) => {
      if(element.card == this.cardsGame[0].card || element.color == this.cardsGame[0].color){
        
        element.play = true;
        haveCard = true;
      }
    });

    if(haveCard == false){
      this.message = 'Debes tomar una carta de la mesa';
      this.classGetcards = true; 
    }else {
      this.message = 'Tu turno!'
      this.classGetcards = false; 
      this.turn = true;
    }


  }


  //Función para jugar cartas del usuario
  play(card:any, color:any, index:any, turn:any){

    //Valida si el usuario tiene una carta para jugar
    if(this.cardsGame[0].card == card && turn == true|| this.cardsGame[0].color == color && turn == true){

      this.cardsGame = []
      this.cardsGame.push({card:card, color:color})

      this.cardsUser.splice(index,1)

      console.log('Tus cartas', this.cardsUser)

      this.message = ''
      this.spinner = true;
      this.turn = false;

      //Valida si no tiene cartas para finalizar el juego
      if(this.cardsUser.length == 0){
        this.finishGame(); 

      }else{
        setTimeout(() => {
          this.playPc()
        }, 1000);
      }



    }else{
      if(turn){
        this.message = `No puedes jugar esa carta, sigue las reglas`;
      }
    }
  }


  //Función para jugar cartas de la Pc
  playPc(){

    let value:any = [], card: any, breakClicle:boolean = true
      this.spinner = false;
      this.turn = false;
    
      this.cardsPc.forEach((element:any) => {

        if(element.card == this.cardsGame[0].card || element.color == this.cardsGame[0].color){
          value.push({card: element.card, color: element.color})
        }

      });

      //Validate si tiene cartas para jugar
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

        //Valida si no tiene cartas para finalizar el juego
        if(this.cardsPc.length == 0 || this.cardsUser.length == 0){
          this.finishGame();
    
        }else{
          this.validateCards();
        }

      }else{
        this.getCards('Pc', true)
      }    
    
  }

  //Funcíón para generar nuevas cartas
  getCards(type:any, action:any){

    let card, color

    //Cartas para la Pc
    if(type == 'Pc' && action == true){
      card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
      color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];

      this.cardsPc.push({card:card, color:color})

      this.message = 'El oponente tomó una carta de la mesa';

      setTimeout(() => {
        this.message = 'Tu turno!';
        this.validateCards()
      }, 2000);

     //Cartas para el usuario 
    }else if(type == 'user' && action == true){
      card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
      color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];

      this.cardsUser.push({card:card, color:color})
      
      this.message = 'Tomaste una carta de la mesa';
      this.spinner = true;
      this.classGetcards = false; 

      setTimeout(() => {
        this.playPc()
      }, 1000);
      
    }
  }


  //Finaliza el juego
  finishGame(){
    if(this.cardsPc.length == 0){
      //LLama el componenete modal para mostrar el mensaje se finalización
      this.modal.open(ModalComponent, {data: {type: 'Pc'}, disableClose: true} )
      
    }else if (this.cardsUser.length == 0){
       //LLama el componenete modal para mostrar el mensaje se finalización
      this.modal.open(ModalComponent, {data: {type: 'user'}, disableClose: true})

    }
  }
  
}


