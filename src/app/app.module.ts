import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableroComponent } from './tablero/tablero.component';
import { ControlComponent } from './control/control.component';
import { MensajesComponent } from './mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    ControlComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
