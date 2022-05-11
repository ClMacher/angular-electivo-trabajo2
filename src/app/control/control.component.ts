import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  jugador1: string = "";
  jugador2: string = "";

  comenzar(){
    this.jugador1 = (<HTMLInputElement>document.getElementById("input-jugador1")).value;
    this.jugador1 = (<HTMLInputElement>document.getElementById("input-jugador1")).value;
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
