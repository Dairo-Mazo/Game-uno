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
  public valuesCards = [0,1,2,3,4,5,6,7,8,9, 'color','+2', '+4', '🛇'];
  public valueColors = ['#0297dd', '#eb313d', '#34974b', '#ffc827']
  public classGetcards: boolean = false;
  public turn: boolean = true;
  public cardSpecial: any = []

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
      if(element.card === this.cardsGame[0].card || element.color == this.cardsGame[0].color && this.cardsGame[0].card !== '+2' && this.cardsGame[0].card !== '+4'
        || element.card == 'color'){
        
        element.play = true;
        haveCard = true;
      }
    });

    if(haveCard == false){

      if(this.cardsGame[0].card === '+2' || this.cardsGame[0].card === '+4'){
        
        this.getCards('user', true);

      }else{
        this.message = 'Debes tomar una carta de la mesa';
        this.classGetcards = true; 
      }

    }else {
      this.message = 'Tu turno!'
      this.classGetcards = false; 
      this.turn = true;
    }


  }


  //Función para jugar cartas del usuario
  play(card:any, color:any, index:any, turn:any){

    //Valida si el usuario tiene una carta para jugar
    if(this.cardsGame[0].card === card && turn == true
     || this.cardsGame[0].color == color && turn == true && this.cardsGame[0].card !== '+2' && this.cardsGame[0].card !== '+4' || card == 'color'
     || this.cardsGame[0].color == color && turn == true && this.cardsGame[0].card == '+2' && this.cardsGame[0].card == '+4' || card == 'color'
     || this.cardsGame[0].card == '+2' && card == '+4' || this.cardsGame[0].card == '+4' && card == '+2'){

      this.cardsGame = [];
      if(card == 'color'){
        this.cardSpecial = [];
        let dialogRef = this.modal.open(ModalComponent, { height: '400px', width: '600px', data:{type: 'cardSpecial', player: ''}, disableClose: true});
  
        dialogRef.afterClosed().subscribe(data =>{       
          color = data.data;
          this.deleteCardsUsage(index, card, color)
        })

      }else{
        this.deleteCardsUsage(index, card, color);
      }


    }else{
      if(turn){
        this.message = `No puedes jugar esa carta, sigue las reglas`;
      }
    }
  }

  //Elimina las cartas del usuario utilizadas
  deleteCardsUsage(index:any, card:any, color:any){

    this.cardsUser.splice(index,1)

    if(card === '+2'){
      this.cardSpecial.push(2);
    }else if(card === '+4'){
      this.cardSpecial.push(4);
    }


    this.cardsGame.push({card:card, color:color})

    this.message = ''
    this.spinner = true;
    this.turn = false;

    //Valida si no tiene cartas para finalizar el juego
    if(this.cardsUser.length == 0){
      this.finishGame(); 

    }else if(card == '🛇'){
      this.message = 'Bloqueaste el turno del oponente'
      this.spinner = true;
      this.turn = true;
      setTimeout(() => {
        this.spinner = false;
        this.validateCards();
      }, 1000);

    }else{
      setTimeout(() => {
        this.playPc()
      }, 1000);
    }
  }

  //Función para jugar cartas de la Pc
  playPc(){

    let value:any = [], card: any, breakClicle:boolean = true;
    this.spinner = false;
    this.turn = false;
  
    this.cardsPc.forEach((element:any) => {

      if(element.card == this.cardsGame[0].card && this.cardsGame[0].card !== '+2' && this.cardsGame[0].card !== '+4' 
        || element.color == this.cardsGame[0].color && this.cardsGame[0].card !== '+2' && this.cardsGame[0].card !== '+4'){

        value.push({card: element.card, color: element.color})

      }else if(element.card == 'color'){

        this.cardSpecial = [];
        let color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];
        value.push({card: element.card, color: color})

      }

      
    });

    //Validate si tiene cartas para jugar
    if(value.length != 0){
      this.cardsGame = []

      card = value[Math.floor(Math.random() * value.length)];
      this.cardsGame.push({card:card.card, color:card.color})

      this.cardsPc.forEach((element: any, index: any) => {
        if(element.card === card.card && element.color === card.color && breakClicle == true){
          
          this.cardsPc.splice(index,1);
          breakClicle = false;
        }
      });

      //Valida si no tiene cartas para finalizar el juego
      if(this.cardsPc.length == 0 || this.cardsUser.length == 0){
        this.finishGame();
  
      }else if(card.card === '+2'){
        this.cardSpecial.push(2);
        this.validateCards();
          
      }else if(card.card === '+4'){
        this.cardSpecial.push(4);
        this.validateCards();

      }else if(card.card == '🛇'){
        this.message = 'El oponente bloqueo tu turno'
        this.spinner = true;
        this.turn = false;

        setTimeout(() => {
          this.spinner = false;
          this.playPc();
        }, 2000);

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

      if(this.cardSpecial.length != 0){
        let cards:any = 0;

        this.cardSpecial.forEach((element:any) => {
          cards = element + cards;
        });

        for (let i = 0; i < cards; i++) {
          card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
          color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];
    
          this.cardsPc.push({card:card, color:color})
          
        }

        this.cardSpecial = [];
        this.message = `El oponente tomó ${cards} cartas`;

        
        setTimeout(() => {
          this.cardsGame[0].card = 'color'
          this.message = 'Se quita la carta especial de la mesa';
        }, 2000);

        setTimeout(() => {
          this.message = 'Tu turno!';
          this.validateCards()
        }, 4000);


      }else {
        card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
        color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];
  
        this.cardsPc.push({card:card, color:color})
  
        this.message = 'El oponente tomó una carta de la mesa';
  
        setTimeout(() => {
          this.message = 'Tu turno!';
          this.validateCards()
        }, 2000);
      }


      

     //Cartas para el usuario 
    }else if(type == 'user' && action == true || type == 'user' && this.turn == true){

      if(this.cardSpecial.length != 0){
        let cards:any = 0;

        this.cardSpecial.forEach((element:any) => {
          cards = element + cards;
        });

        for (let i = 0; i < cards; i++) {
          card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
          color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];
    
          this.cardsUser.push({card:card, color:color})
          
        }

        this.cardSpecial = [];
        this.message = `El oponete jugó una carta especial, se te asignaron ${cards} cartas`;
        this.spinner = true;
        this.turn = false; 
        this.classGetcards = false; 

        setTimeout(() => {
          this.cardsGame[0].card = 'color';
          this.message = 'Se quita la carta especial de la mesa';
        }, 3000);

        setTimeout(() => {
          this.playPc()
        }, 5000);


      }else {
        card = this.valuesCards[Math.floor(Math.random() * this.valuesCards.length)];
        color = this.valueColors[Math.floor(Math.random() * this.valueColors.length)];
  
        this.cardsUser.push({card:card, color:color})
        
        this.message = 'Tomaste una carta de la mesa';
        this.spinner = true;
        this.turn = false; 
        this.classGetcards = false; 
  
        setTimeout(() => {
          this.playPc()
        }, 1000);

      }


      
      
    }
  }


  //Finaliza el juego
  finishGame(){
    if(this.cardsPc.length == 0){
      //LLama el componenete modal para mostrar el mensaje se finalización
      this.modal.open(ModalComponent, {data:{type: 'win', player: 'Pc'}, disableClose: true} )
      
    }else if (this.cardsUser.length == 0){
       //LLama el componenete modal para mostrar el mensaje se finalización
      this.modal.open(ModalComponent, {data:{type: 'win', player: 'user'}, disableClose: true})

    }
  }
  
}


