import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mtsgmusic';

  barsThin = Array.from({ length: 32 }); // try 32, 48, 64…

  // Baseline order for non-hero tiles
  private readonly initialOrder = {
    about: 1,
    music: 2,
    shows: 3,
    poster: 4,
    contact: 5,
  };

  order = { ...this.initialOrder };
  isMixing = false;

  shuffle(): void {
    this.pulseMixing();
    const keys = Object.keys(this.order) as (keyof typeof this.order)[];
    // Generate a shuffled array of [1..keys.length]
    const shuffled = Array.from({ length: keys.length }, (_, i) => i + 1)
      .map(v => ({ v, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(x => x.v);

    keys.forEach((k, i) => (this.order[k] = shuffled[i]));
  }

  resetLayout(): void {
    this.pulseMixing();
    this.order = { ...this.initialOrder };
  }

  private pulseMixing(): void {
    this.isMixing = true;
    // short pulse to trigger the micro animation
    window.setTimeout(() => (this.isMixing = false), 180);
  }
}
