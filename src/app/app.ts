import { Component,HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('foodiefeed');



@HostListener('document:mousemove', ['$event'])
mouseMove(event: MouseEvent) {
  const sparkle = document.createElement('span');

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
