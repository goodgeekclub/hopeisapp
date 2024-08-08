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
  rocket: PIXI.Sprite | undefined;
  trail: PIXI.Graphics | undefined;

  stars: PIXI.Sprite[] = [];
  users: User[] = [];
  angle: number = 0;
  destinationY: number = 0;
  usersProcessed: number = 100;

  batchSize: number = 1; 
  displayLimit: number = 0; 

  selectedUser: User | null = null;
  selectedUserImage: string | null = null;

  async ngOnInit() {
    const app = new PIXI.Application();
    this.app = app;
    const numberOfUsers = 100000; 
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({ id: i, name: `User ${i}`, score: Math.floor(Math.random() * 1000) });
    }

    app.init({ resizeTo: window }).then(async () => {

      
      document.body.appendChild(app.canvas);

    
      PIXI.Assets.add({ alias: 'star1', src: './assets/images/star1.png' });
      PIXI.Assets.add({ alias: 'star2', src: './assets/images/star2.png' });
      PIXI.Assets.add({ alias: 'star3', src: './assets/images/star3.png' });
     await PIXI.Assets.add({ alias: 'rocket', src: './assets/images/Rocket.png' });
     await PIXI.Assets.add({ alias: 'layer1', src: './assets/images/layer1.png' });
     await PIXI.Assets.add({ alias: 'background', src: './assets/images/BG-39.png' });
      
      await PIXI.Assets.backgroundLoad(['star1', 'star2', 'star3','rocket','layer1','background']);
       PIXI.Assets.load('star1')
       PIXI.Assets.load('star2')
       PIXI.Assets.load('star3')
       const BackgroundTexture = await PIXI.Assets.load('background')
       const layer1Texture = await PIXI.Assets.load('layer1')
       
       
       const background = new PIXI.Sprite(BackgroundTexture);
       
       if (window.innerWidth < 1900 && window.innerWidth > 900) { 
      background.scale.set(0.4);
      background.x = 230;
       }
       else if (window.innerWidth < 900 )
       {
        background.scale.set(0.3);
        background.x = 1;
       }
       else if (window.innerWidth < 800)
        {
         background.scale.set(0.2);
         background.x = 1;
       }
       else {
        background.scale.set(0.3);
        background.x = 800;
       }
      
       app.stage.addChild(background);

       const layer1 = new PIXI.Sprite(layer1Texture);
       
       if (window.innerWidth < 1900 && window.innerWidth > 600) { 
       layer1.scale.set(0.9);
       layer1.x = 200;
       layer1.y = 1300;
       }
       else if (window.innerWidth < 900)
       {
        layer1.scale.set(0.5);
       layer1.x = -30;
       layer1.y = 730;
       }
       else {
        layer1.scale.set(0.6);
        layer1.x = 800;
        layer1.y = 870;
       }
       app.stage.addChild(layer1);
       
       

      // Load assets and create rocket as before...
    const RocketTexture = await PIXI.Assets.load('rocket');
    this.rocket = new PIXI.Sprite(RocketTexture);
    this.rocket.scale.set(0.3);
    this.rocket.anchor.set(0.5);
    this.rocket.x = app.screen.width / 2;
    this.rocket.y = 870;
    app.stage.addChild(this.rocket);


    this.trail = new PIXI.Graphics();
    app.stage.addChild(this.trail);

    app.stage.setChildIndex(this.trail, app.stage.children.length - 1);


   

      
     

       const processUserBatches = () => {
        const moveRocket = () => {
          if (!this.rocket || !this.trail) return;
    
          const speed = 2;
          this.angle += Math.PI / 180; // Increase the angle for sine wave movement
          this.rocket.x = app.screen.width / 2 + Math.sin(this.angle) * 50;
          this.rocket.y -= speed;
    
          
           // Clear previous trail before drawing the new one
      this.trail.clear();
      this.trail.lineStyle(5, 0x0000ff, 1); // Set the color and thickness for the trail

      // Draw the trail behind the rocket using bezier curve
      this.trail.moveTo(this.rocket.x, this.rocket.y);
      this.trail.bezierCurveTo(
        this.rocket.x, this.rocket.y - 100,   // Control point 1
        this.rocket.x - 100, this.rocket.y + 100, // Control point 2
        this.rocket.x - 200, this.rocket.y // End point
          );
    
          requestAnimationFrame(moveRocket);
        };
        
        moveRocket();
      }
     


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
      processUserBatches();
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
