import { Component, OnInit,HostListener } from '@angular/core';
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
  sprite: PIXI.Sprite | undefined;
  app: PIXI.Application | undefined;

  stars: PIXI.Graphics[] = [];
  users: User[] = [];
  batchSize: number = 1; // Number of stars to create per batch
  displayLimit: number = 100; //limit user display

  async ngOnInit() {
    const app = new PIXI.Application();
    this.app = app;
    const numberOfUsers = 100000; // test Number of user
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({ id: i, name: `User ${i}` });
    }

    app.init({ resizeTo: window }).then(() => {

      // Append the application canvas to the document body
      document.body.appendChild(app.canvas);

      // Add the assets to load
      PIXI.Assets.add({ alias: 'background', src: 'https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/03/032723_bdh_habitable-exomoons_feat.jpg?fit=1030%2C580&ssl=1' });
      PIXI.Assets.add({ alias: 'sprite', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png' }); // Add the new sprite image path

      // Allow the assets to load in the background
      PIXI.Assets.backgroundLoad(['background', 'sprite']);

      // Load the background image
      PIXI.Assets.load('background').then((backgroundTexture) => {
        // Create a new Sprite for the background
        const background = new PIXI.Sprite(backgroundTexture);

        

         if (window.innerWidth < 768) { 
         
        } else {
        background.width = app.screen.width;
        background.height = app.screen.height;
        }

        // Add the background to the stage
        app.stage.addChild(background);
      });

      // Load the additional sprite image
      PIXI.Assets.load('sprite').then((spriteTexture) => {
        // Create a new Sprite for the additional image
        this.sprite = new PIXI.Sprite(spriteTexture);
        

        // Set the position of the sprite
        this.sprite.x = app.screen.width / 1.15;
        this.sprite.y = app.screen.height / 1.15;

         // Scale the sprite
         if (window.innerWidth < 768) { 
          this.sprite.scale.set(0.3, 0.3); // Scale down for mobile
        } else {
          this.sprite.scale.set(0.6, 0.6);
        }

       
        this.sprite.anchor.set(0.65,0.65);


       
    this.sprite.x = app.screen.width;
    this.sprite.y = app.screen.height;



        app.stage.addChild( this.sprite);

      });


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
  );

  }

  createStar(app: PIXI.Application, user: User): PIXI.Graphics {
    const star = new PIXI.Graphics();
    const size = Math.random() * 5 + 1;
    const color = Math.random() * 0x000000;

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
      if (this.sprite) {
        const spriteBounds = this.sprite.getBounds();
        const starBounds = {
          x: x - size,
          y: y - size,
          width: size * 2,
          height: size * 2
        };

        // Check for overlap with sprite
        const spriteOverlap = starBounds.x < spriteBounds.x + spriteBounds.width &&
                              starBounds.x + starBounds.width > spriteBounds.x &&
                              starBounds.y < spriteBounds.y + spriteBounds.height &&
                              starBounds.y + starBounds.height > spriteBounds.y;

        overlap = overlap || spriteOverlap;
      }



    } while (overlap);

    star.beginFill(color);
    star.drawStar(0, 0, 4, size);
    star.endFill();

    star.x = x;
    star.y = y;

    app.stage.addChild(star);

    return star;
  }
}
