import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {
  turnoJugador: boolean = true; //True = Turno jugador 1, False = Turno jugador 2
  fichaUno: number = 1;
  fichaDos: number = 2;
  estadoTablero: number[][] = [[0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]];

  anchoTabla: string[] = ["0", "1", "2", "3", "4", "5", "6"];
  altoTabla: string[] = ["0", "1", "2", "3", "4", "5"];

  hacerJugada(x:number){
    if (this.turnoJugador){
      this.jugadaJugadorUno(x);
    }else{
      this.jugadaJugadorDos(x);
    }
    this.evaluarPartida();
  }

  jugadaJugadorUno(x: number){
    var i = this.estadoTablero.length;
    if (this.estadoTablero[x][0] == 0){
      do{
        if (this.estadoTablero[x][i]==0){
          this.estadoTablero[x][i]=this.fichaUno;
          console.log("INSERTADO EN " + x + ", " + i);
          this.crearFicha(x,i);
          this.turnoJugadorUno();
          i=-1;
        }else{
          i--;
        }
      }while (i>=0)
      console.log(this.estadoTablero);
    }else{
      console.log("COLUMNA LLENA");
    }
  }

  jugadaJugadorDos(x: number){
    var i = this.estadoTablero.length;
    if (this.estadoTablero[x][0] == 0){
      do{
        if (this.estadoTablero[x][i]==0){
          this.estadoTablero[x][i]=this.fichaDos;
          console.log("INSERTADO EN " + x + ", " + i);
          this.crearFicha(x,i);
          this.turnoJugadorUno();
          i=-1;
        }else{
          i--;
        }
      }while (i>=0)
      console.log(this.estadoTablero);
    }else{
      console.log("COLUMNA LLENA");
    }
  }

  turnoJugadorUno(): boolean{
    this.turnoJugador = !this.turnoJugador;
    return this.turnoJugador;
  }

  crearFicha(x:number, i:number){
    const columna = document.getElementById("agujero"+x+i);
    console.log(i);
    console.log("agujero"+x+i);
    const div = document.createElement("div");
    div.classList.add("ficha");
    if(this.turnoJugador){
      div.classList.add("ficha-roja");
      console.log("FICHA ROJA"+columna?.id.valueOf());
      div.textContent="ROJO";
    }else{
      div.classList.add("ficha-azul");
      console.log("FICHA AZUL"+columna?.id.valueOf());
      div.textContent="AZUL";
    }
    console.log(div.className);
    columna?.appendChild(div);
  }

  evaluarPartida(){
    var contador:number = 1;
    //let contadorAzul:number = 0;
    var i:number = 0;
    var j:number = 0;
    var ganador:boolean = false;

    let index:number = 0;
    let indexMas:number = 0;
   

    //RECORRIDO POR ALTURA
    do {
      j=0;
      do {
        if (j<this.altoTabla.length){
          index = this.estadoTablero[i][j];
          indexMas = this.estadoTablero[i][j + 1];
  
          if ((index == indexMas) && (index != 0)) {
            console.log("cont: " + contador + ", index: " + index);
            contador++;
          } else {
            contador = 1;
          }
          if (contador == 4) {
            ganador = true;
          }
          
          
        }
        console.log("vuelta " + i + "," + j);
        j++;
      } while (j < this.altoTabla.length && !ganador);
      i++;
    }while (i<this.anchoTabla.length && !ganador);

    //RECORRIDO POR ANCHURA
    i=0;
    j=0;
    contador = 1;
    if(!ganador){
      do {
        i=0;
        do {
          if (i<this.anchoTabla.length){
            index = this.estadoTablero[i][j];
            indexMas = this.estadoTablero[i + 1][j];
            console.log("cont: " + contador + ", index: " + indexMas);
    
            if ((index == indexMas) && (index != 0)) {
              console.log("cont: " + contador + ", index: " + index);
              contador++;
            } else {
              contador = 1;
            }
            if (contador == 4) {
              ganador = true;
            }
          }
          console.log("vuelta " + i + "," + j);
          i++;
        } while (i < this.anchoTabla.length && !ganador);
        j++;
      }while (j<this.altoTabla.length && !ganador);
    }
    
    if(ganador){
      alert("Ganador");
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.estadoTablero = [[0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]];
  }
  posicionesTablero: string[][] = [["0-0", "0-1", "0-2", "0-3", "0-4", "0-5"],
  ["1-0", "1-1", "1-2", "1-3", "1-4", "1-5"],
  ["2-0", "2-1", "2-2", "2-3", "2-4", "2-5"],
  ["3-0", "3-1", "3-2", "3-3", "3-4", "3-5"],
  ["4-0", "4-1", "4-2", "4-3", "4-4", "4-5"],
  ["5-0", "5-1", "5-2", "5-3", "5-4", "5-5"],
  ["6-0", "6-1", "6-2", "6-3", "6-4", "6-5"]];

}
