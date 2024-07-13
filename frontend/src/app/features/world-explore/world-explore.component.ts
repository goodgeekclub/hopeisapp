import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-world-explore',
  standalone: true,
  imports: [],
  templateUrl: './world-explore.component.html',
  styleUrls: ['./world-explore.component.css'],
})
export class WorldExploreComponent implements OnInit {
  stars: PIXI.Graphics[] = [];
  async ngOnInit() {
    if (typeof window !== 'undefined') {
      
      
      const app = new PIXI.Application();

   
      await app.init({ background: '#000000', resizeTo: window });

      
      document.body.appendChild(app.canvas);

      for (let i = 0; i < 1000; i++) {
        const star = this.createStar(app);
        this.stars.push(star);
      }
    }
  }

  createStar(app: PIXI.Application): PIXI.Graphics {
    
    const star = new PIXI.Graphics();

    
    const size = Math.random() * 2 + 1;

   
    const color = Math.random() * 0xffffff;

  
    const x = Math.random() * app.renderer.width;
    const y = Math.random() * app.renderer.height;

    
    star.beginFill(color);
    star.drawStar(0, 0, 5, size);
    star.endFill();

    
    star.x = x;
    star.y = y;

   
    app.stage.addChild(star);

    return star;
      
    }
  }
