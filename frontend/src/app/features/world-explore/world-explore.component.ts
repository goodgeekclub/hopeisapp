import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';


interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-world-explore',
  standalone: true,
  imports: [],
  templateUrl: './world-explore.component.html',
  styleUrls: ['./world-explore.component.css'],
})
export class WorldExploreComponent implements OnInit {
  stars: PIXI.Graphics[] = [];
  users: User[] = [];
  batchSize: number = 1; // Number of stars to create per batch
  displayLimit: number = 1000; //limit user display
  


  async ngOnInit() {

    const numberOfUsers = 100000; // test Number of user
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({ id: i, name: `User ${i}` });
    }

    if (typeof window !== 'undefined') {
      
      
      const app = new PIXI.Application();

   
      await app.init({ background: '#000000', resizeTo: window });

      
      document.body.appendChild(app.canvas);
      
      let batchIndex = 0;
      const createNextBatch = () => {
        if (batchIndex < this.users.length && this.stars.length < this.displayLimit) {
          const endIndex = Math.min(batchIndex + this.batchSize, this.users.length);
          for (let i = batchIndex; i < endIndex; i++) {
            if (this.stars.length < this.displayLimit) {
              const user = this.users[i];
              const star = this.createStar(app, user);
              this.stars.push(star);
            }
          }
          batchIndex += this.batchSize;
          requestAnimationFrame(createNextBatch);
        }
      };
      createNextBatch();
    }
  }

  createStar(app: PIXI.Application, user: User): PIXI.Graphics {
    const star = new PIXI.Graphics();
    const size = Math.random() * 5 + 3;
    const color = Math.random() * 0xffffff;
  
    let x: number;
    let y: number;
    let overlap: boolean;
  
    do {
      x = Math.random() * app.renderer.width;
      y = Math.random() * app.renderer.height;
      overlap = this.stars.some(existingStar => {
        const distance = Math.sqrt((existingStar.x - x) ** 2 + (existingStar.y - y) ** 2);
        return distance < size * 2; // Ensure no overlap, adjust the multiplier as needed
      });
    } while (overlap);
  
    star.beginFill(color);
    star.drawStar(0, 0, 5, size);
    star.endFill();
  
    star.x = x;
    star.y = y;
  
    app.stage.addChild(star);
  
    return star;
  }
  
}