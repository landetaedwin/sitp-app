import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-portafolio',
  templateUrl: './crear-portafolio.component.html',
  styleUrls: ['./crear-portafolio.component.css']
})
export class CrearPortafolioComponent implements OnInit {
  public loading = false;
  constructor() { }

  ngOnInit() {
  }

  guardarPortafolio(){
  // this.loading = true;

  }

}
