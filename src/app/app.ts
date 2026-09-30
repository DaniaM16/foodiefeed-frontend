import { Component,HostListener, signal } from '@angular/core'; //Grundkomponente d. APp u. HOstListener für Mausbewegungen
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar], //Navbar und RouterOutlet werden in app.html verwendet
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  



@HostListener('document:mousemove', ['$event']) //reagiert auf jede Mausbewegung auf d. Seite
mouseMove(event: MouseEvent) {
  const sparkle = document.createElement('span'); //erstellt Glitzer, neues Element

  sparkle.innerHTML = '*';
  sparkle.className = 'sparkle';
  sparkle.style.left = event.pageX + 'px';
  sparkle.style.top = event.pageY + 'px';

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}
}
