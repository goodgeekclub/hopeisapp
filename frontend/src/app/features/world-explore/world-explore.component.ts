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

  


  async ngOnInit() {

    const numberOfUsers = 1000; // test Number of user
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({ id: i, name: `User ${i}` });
    }

    if (typeof window !== 'undefined') {
      
      
      const app = new PIXI.Application();

   
      await app.init({ background: '#000000', resizeTo: window });

      
      document.body.appendChild(app.canvas);
      
      if(numberOfUsers >= 0 && numberOfUsers <= 1000){
      this.users.forEach(user => {
        const star = this.createStar(app, user);
        this.stars.push(star);
      });
    }
    
    }
  }

  createStar(app: PIXI.Application, user:User): PIXI.Graphics {
    
    const star = new PIXI.Graphics();

    
    const size = Math.random() * 5 + 1;

   
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
