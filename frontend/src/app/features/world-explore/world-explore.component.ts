import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as PIXI from 'pixi.js';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-world-explore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-explore.component.html',
  styleUrls: ['./world-explore.component.css'],
})
export class WorldExploreComponent implements OnInit {
  app: PIXI.Application | undefined;

  stars: PIXI.Sprite[] = [];
  users: User[] = [];
  batchSize: number = 1; // Number of stars to create per batch
  displayLimit: number = 70; //limit user display

  selectedUser: User | null = null;
  selectedUserImage: string | null = null;

  async ngOnInit() {
    const app = new PIXI.Application();
    this.app = app;
    const numberOfUsers = 100000; // test Number of user
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({ id: i, name: `User ${i}` });
    }

    app.init({ resizeTo: window }).then(async () => {

      // Append the application canvas to the document body
      document.body.appendChild(app.canvas);

      // Add the assets to load
      PIXI.Assets.add({ alias: 'background', src: 'https://media.discordapp.net/attachments/1158347495747891270/1266402442954670091/bg.png?ex=66a504af&is=66a3b32f&hm=ade2aaf735f5a220664e95a621613140c5d6f73fc9796402f9077ba247aa0db7&=&format=webp&quality=lossless&width=316&height=676' });
      PIXI.Assets.add({ alias: 'star1', src: 'https://cdn.discordapp.com/attachments/612303746814312504/1266647157557956768/f1f49f8f0bbc6fd7.png?ex=66a5e897&is=66a49717&hm=5dc235c87b4f7b2d54b566400f88d0cd09129b720fe8f7d22a99891d22230026&' });
      PIXI.Assets.add({ alias: 'star2', src: 'https://cdn.discordapp.com/attachments/612303746814312504/1266647292837101569/1.png?ex=66a5e8b7&is=66a49737&hm=6c8b3db9dffd739354700f1363c7e60cf21cb6afdcd0e20da8ca8135e35f9b79&' });
      PIXI.Assets.add({ alias: 'star3', src: 'https://cdn.discordapp.com/attachments/612303746814312504/1266647307198136333/2.png?ex=66a5e8bb&is=66a4973b&hm=0cf00c636524abc6ebd050ae4a50ff449c92356920e6c3d2e72b5156411ec443&' });
      // Allow the assets to load in the background
      await PIXI.Assets.backgroundLoad(['background','star1', 'star2', 'star3']);

      await PIXI.Assets.load('star1')
      await PIXI.Assets.load('star2')
      await PIXI.Assets.load('star3')

      // Load the background image
      PIXI.Assets.load('background').then((backgroundTexture) => {
        const background = new PIXI.Sprite(backgroundTexture);

         if (window.innerWidth < 1100) { 
          background.width = app.screen.width;
          background.height = app.screen.height;
        } else {
        background.width = app.screen.width;
        background.height = app.screen.height;
        }
        app.stage.addChild(background);
      });


      let batchIndex = 0;
      const createNextBatch = () => {
        if (batchIndex < this.users.length && this.stars.length < this.displayLimit) {
          const endIndex = Math.min(batchIndex + this.batchSize, this.users.length);
          for (let i = batchIndex; i < endIndex; i++) {
            if (this.stars.length < this.displayLimit) {
              const user = this.users[i];
              this.createStar(app, user).then(star => {
                this.stars.push(star); // No type mismatch here
              });
            }
          }
          batchIndex += this.batchSize;
          requestAnimationFrame(createNextBatch);
        }
      };
      createNextBatch();
    });
  }

  async createStar(app: PIXI.Application, user: User): Promise<PIXI.Sprite> {
    const starTextures = ['star1', 'star2', 'star3'].map(name => PIXI.Assets.get(name));
    const randomTexture = starTextures[Math.floor(Math.random() * starTextures.length)];

    const star = new PIXI.Sprite(randomTexture);
    if (window.innerWidth < 1100) { 
      const size = Math.random() * 0.3 + 0.2;
      star.scale.set(size);
    } else {
      const size = Math.random() * 0.5 + 0.4;
      star.scale.set(size);
    }
    
    

    let x: number;
    let y: number;
    let overlap: boolean;

    do {
      x = Math.random() * app.renderer.width;
      y = Math.random() * app.renderer.height;
      overlap = this.stars.some(existingStar => {
        const distance = Math.sqrt((existingStar.x - x) ** 2 + (existingStar.y - y) ** 2);
        return distance < star.width; // Ensure no overlap
      });
    } while (overlap);


    star.x = x;
    star.y = y;

     // Enable interaction for the star
     star.interactive = true;
     
 
     // Add click event listener
     star.on('pointertap', () => {
       console.log(`Clicked on star of user ${user.name}`);
       this.selectedUser = user;
      this.selectedUserImage = `https://example.com/user-images/${user.id}.png`; // Replace with actual user image URL
     });

    app.stage.addChild(star);

    return star;
  }

  closeProfile() {
    this.selectedUser = null;
    this.selectedUserImage = null;
  }

}
