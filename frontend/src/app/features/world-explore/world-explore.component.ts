import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as PIXI from 'pixi.js';

interface User {
  id: number;
  name: string;
  score: number;
}

@Component({
  selector: 'app-world-explore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-explore.component.html',
  styleUrls: ['./world-explore.component.css'],
})
export class WorldExploreComponent implements OnInit{
  app: PIXI.Application | undefined;

  stars: PIXI.Sprite[] = [];
  users: User[] = [];
  batchSize: number = 1; // Number of stars to create per batch
  displayLimit: number = 0; //limit user display

  selectedUser: User | null = null;
  selectedUserImage: string | null = null;

  async ngOnInit() {
    const app = new PIXI.Application();
    this.app = app;
    const numberOfUsers = 100000; // test Number of user
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({ id: i, name: `User ${i}`, score: Math.floor(Math.random() * 1000) });
    }

    app.init({ resizeTo: window }).then(async () => {

      // Append the application canvas to the document body
      document.body.appendChild(app.canvas);

      // Add the assets to load
      PIXI.Assets.add({ alias: 'star1', src: './assets/images/star1.png' });
      PIXI.Assets.add({ alias: 'star2', src: './assets/images/star2.png' });
      PIXI.Assets.add({ alias: 'star3', src: './assets/images/star3.png' });
     await PIXI.Assets.add({ alias: 'rocket', src: './assets/images/Rocket.png' });
     await PIXI.Assets.add({ alias: 'layer1', src: './assets/images/layer1.png' });
     await PIXI.Assets.add({ alias: 'background', src: './assets/images/BG-39.png' });
      // Allow the assets to load in the background
      await PIXI.Assets.backgroundLoad(['star1', 'star2', 'star3','rocket','layer1','background']);
       PIXI.Assets.load('star1')
       PIXI.Assets.load('star2')
       PIXI.Assets.load('star3')
       const BackgroundTexture = await PIXI.Assets.load('background')
       const layer1Texture = await PIXI.Assets.load('layer1')
       const RocketTexture = await PIXI.Assets.load('rocket')
       
       const background = new PIXI.Sprite(BackgroundTexture);
       
      background.scale.set(0.3);
      
       app.stage.addChild(background);

       const layer1 = new PIXI.Sprite(layer1Texture);
       
       if (window.innerWidth < 420) {
       layer1.scale.set(0.5);
       layer1.x = -2;
       layer1.y = 760;
       app.stage.addChild(layer1);
       }
       

       const rocket = new PIXI.Sprite(RocketTexture);
       rocket.scale.set(0.3);
       rocket.anchor.set(0.5);
       rocket.x = app.screen.width / 2;
       rocket.y = 760;
       app.stage.addChild(rocket);

    
     
     


      const shuffleUsers = () => {
        for (let i = this.users.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.users[i], this.users[j]] = [this.users[j], this.users[i]];
        }
    
      }

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
      shuffleUsers();
    }
    
  );
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
      this.selectedUserImage = `https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/397335422_3497034617218646_4443638139896152856_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFXmNzCD6Jgl2lglGwD0zwtjsJKYXdGlzSOwkphd0aXNO8l7kbZq0mBx1iRti_Ipgy3yMOSXpMCyOs9X0ZAVEjJ&_nc_ohc=2LRvsWrqdAsQ7kNvgHO09dN&_nc_ht=scontent.fbkk22-3.fna&oh=00_AYBRZbucqzIVIXMdTHnuQm5w5QoDHCJ2acpvMDjv8tl8mw&oe=66AD2F81`; // Replace with actual user image URL
     });

     
    app.stage.addChild(star);

    return star;
  }

  closeProfile() {
    this.selectedUser = null;
    this.selectedUserImage = null;
  }

 
}
