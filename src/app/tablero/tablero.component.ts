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
    console.log("agujero"+x+i);
    if(this.turnoJugador){
      columna?.setAttribute("class", "ficha ficha-roja");
    }else{
      columna?.setAttribute("class", "ficha ficha-azul");
    }
  }

  evaluarPartida(){
    var contador:number = 1;
    //let contadorAzul:number = 0;
    var i:number = 0;
    var j:number = 0;
    var ganador:boolean = false;

    let index:number = 0;
    let indexMas:number = 0;

    if (!ganador) {
      ganador = this.recorrerPorAltura(ganador);
    }

    if (!ganador) {
      ganador = this.recorrerPorAnchura(ganador);
    }

    if (!ganador) {
      ganador = this.recorrerAbajoDerecha(ganador);
    }

    if (!ganador) {
      ganador = this.recorrerArribaIzquierda(ganador);
    }
    if(ganador){
      alert("Ganador");
    }
  }
  
  //  ARRIBA A ABAJO
  recorrerPorAltura(ganador: boolean){
    var contador:number = 1;
    var i:number = 0;
    var j:number = 0;

    let index:number = 0;
    let indexMas:number = 0;
    do {
      j=0;
      do {
        if (j<this.altoTabla.length-1){
          index = this.estadoTablero[i][j];
          indexMas = this.estadoTablero[i][j + 1];
          if ((index == indexMas) && (index != 0)) {
            contador++;
          } else {
            contador = 1;
          }
          if (contador == 4) {
            ganador = true;
            return ganador;
          }
        }
        j++;
      } while (j < this.altoTabla.length && !ganador);
      i++;
    }while (i<this.anchoTabla.length && !ganador);

    return ganador;
  }

  // IZQUIERDA A DERECHA
  recorrerPorAnchura(ganador: boolean){
    var contador:number = 1;
    var i:number = 0;
    var j:number = 0;

    let index:number = 0;
    let indexMas:number = 0;
    contador = 1;
    if(!ganador){
      do {
        i=0;
        do {
          if (i<this.anchoTabla.length-1){
            index = this.estadoTablero[i][j];
            indexMas = this.estadoTablero[i + 1][j];
            if ((index == indexMas) && (index != 0)) {
              contador++;
            } else {
              contador = 1;
            }
            if (contador == 4) {
              ganador = true;
              return ganador
            }
          }
          i++;
        } while (i < this.anchoTabla.length && !ganador);
        j++;
      }while (j<this.altoTabla.length && !ganador);
    }
    return ganador
  }

  //  ABAJO A DERECHA
  recorrerAbajoDerecha(ganador: boolean){
    var contador:number = 1;
    var i:number = 0;
    var j:number = 0;

    let index:number = 0;
    let indexMas:number = 0;
    contador = 1;

    if(!ganador){
      do {
        j=0;
        do {
          if (j<this.altoTabla.length && j>=0 && i<this.anchoTabla.length-1){
            index = this.estadoTablero[i][j];
            indexMas = this.estadoTablero[i + 1][j-1];
    
            if ((index == indexMas) && (index != 0)) {
              contador++;
            } else {
              contador = 1;
            }
            if (contador == 4) {
              ganador = true;
              return ganador;
            }
          }
          j++;
        } while (j < this.altoTabla.length && !ganador);
        i++;
      }while (i<this.anchoTabla.length && !ganador);
    }
    return ganador;
  }

  //  ARRIBA A DERECHA
  recorrerArribaIzquierda(ganador: boolean){
    var contador:number = 1;
    var i:number = this.anchoTabla.length-1;
    var j:number = 0;

    let index:number = 0;
    let indexMas:number = 0;
    contador = 1;

    if(!ganador){
      do {
        j=0;
        do {
          console.log("Vuelta: " + i + ", " + j);
          if (j<this.altoTabla.length && i>=0 && j>=0){
            index = this.estadoTablero[i][j];
            indexMas = this.estadoTablero[i-1][j-1];
    
            if ((index == indexMas) && (index != 0)) {
              contador++;
            } else {
              contador = 1;
            }
            if (contador == 4) {
              ganador = true;
              return ganador;
            }
          }
          j++;
        } while (j < this.altoTabla.length && !ganador);
        i--;
      }while (i>0 && !ganador);
    }
    return ganador;
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
