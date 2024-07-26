import { Component, OnInit,HostListener } from '@angular/core';
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

  stars: PIXI.Graphics[] = [];
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
      // Allow the assets to load in the background
      PIXI.Assets.backgroundLoad(['background']);

      // Load the background image
      PIXI.Assets.load('background').then((backgroundTexture) => {
        // Create a new Sprite for the background
        const background = new PIXI.Sprite(backgroundTexture);

        

         if (window.innerWidth < 1100) { 
          background.width = app.screen.width;
          background.height = app.screen.height;
        } else {
        background.width = app.screen.width;
        background.height = app.screen.height;
        }

        // Add the background to the stage
        app.stage.addChild(background);
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
    const size = Math.random() * 7 + 4;
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
      })



    } while (overlap);

    star.beginFill(color);
    star.drawStar(0, 0, 4, size);
    star.endFill();

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
