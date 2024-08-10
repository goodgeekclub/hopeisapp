import { Component, OnInit } from '@angular/core';
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
export class WorldExploreComponent implements OnInit {
  app: PIXI.Application | undefined;
  rocket: PIXI.Sprite | undefined;
  trail: PIXI.Graphics | undefined;

  stars: PIXI.Sprite[] = [];
  users: User[] = [];
  angle = 0;
  destinationY = 0;
  usersProcessed = 50;

  batchSize = 2;
  displayLimit = 0;
  rocketSpeed = 1;

  selectedUser: User | null = null;
  selectedUserImage: string | null = null;

  private isRocketMoving = false; // Flag to check if the rocket is moving

  async ngOnInit() {
    this.initializePixiApp();
  }

  private async initializePixiApp() {
    const app = new PIXI.Application();
    this.app = app;
    const numberOfUsers = 500;
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({
        id: i,
        name: `User ${i}`,
        score: Math.floor(Math.random() * 1000),
      });
    }

    app.init({ resizeTo: window }).then(async () => {
      document.body.appendChild(app.canvas);

      await this.loadAssets();

      const BackgroundTexture = await PIXI.Assets.load('background');
      const layer1Texture = await PIXI.Assets.load('layer1');

      this.setupBackground(BackgroundTexture);
      const layer1 = this.setupLayer1(layer1Texture);

      this.rocket = await this.createRocket();
      this.trail = new PIXI.Graphics();
      app.stage.addChild(this.trail);
      app.stage.setChildIndex(this.trail, app.stage.children.length - 1);

       app.canvas.addEventListener('click', () => {
         if (!this.isRocketMoving) {
           this.isRocketMoving = true;
           this.processUserBatches();
         }
       });

      this.createNextBatch();
    });
  }

  private async loadAssets() {
    PIXI.Assets.add({ alias: 'star1', src: './assets/images/star1.png' });
    PIXI.Assets.add({ alias: 'star2', src: './assets/images/star2.png' });
    PIXI.Assets.add({ alias: 'star3', src: './assets/images/star3.png' });
    await PIXI.Assets.add({
      alias: 'rocket',
      src: './assets/images/Rocket.png',
    });
    await PIXI.Assets.add({
      alias: 'layer1',
      src: './assets/images/layer1.png',
    });
    await PIXI.Assets.add({
      alias: 'background',
      src: './assets/images/BG-39.png',
    });

    await PIXI.Assets.backgroundLoad([
      'star1',
      'star2',
      'star3',
      'rocket',
      'layer1',
      'background',
    ]);

    PIXI.Assets.load('star1');
    PIXI.Assets.load('star2');
    PIXI.Assets.load('star3');
  }

  private setupBackground(texture: PIXI.Texture) {
    const background = new PIXI.Sprite(texture);
    // Set background scaling and position based on window width
    if (window.innerWidth < 1900 && window.innerWidth > 900) {
      background.scale.set(0.4);
      background.x = 230;
    } else if (window.innerWidth < 900) {
      background.scale.set(0.3);
      background.x = 1;
    } else if (window.innerWidth < 800) {
      background.scale.set(0.2);
      background.x = 1;
    } else {
      background.scale.set(0.3);
      background.x = 800;
    }
    this.app?.stage.addChild(background);
  }

  private setupLayer1(texture: PIXI.Texture) {
    const layer1 = new PIXI.Sprite(texture);
    if (window.innerWidth < 1900 && window.innerWidth > 600) {
      layer1.scale.set(0.9);
      layer1.x = 200;
      layer1.y = 1300;
    } else if (window.innerWidth < 900) {
      layer1.scale.set(0.5);
      layer1.x = -30;
      layer1.y = 700;
    } else {
      layer1.scale.set(0.6);
      layer1.x = 800;
      layer1.y = 870;
    }
    this.app?.stage.addChild(layer1);
    return layer1;
  }

  private async createRocket() {
    if (!this.app) {
      throw new Error('Pixi Application is not initialized.');
    }

    const RocketTexture = await PIXI.Assets.load('rocket');
    const rocket = new PIXI.Sprite(RocketTexture);
    rocket.scale.set(0.3);
    rocket.anchor.set(0.5);
    rocket.x = (this.app.screen.width ?? 0) / 2;
    rocket.y = 700;
    rocket.zIndex = 1000;
    this.app?.stage.addChild(rocket);
    return rocket;
  }

  private processUserBatches() {
    const waypoints = [
      { x: 80, y: 550 },
      { x: 100, y: 525 },
      { x: 250, y: 400 },
      { x: 340, y: 320 },
      { x: 200, y: 200 },
    ];

    let currentWaypoint = 0;
    const totalWaypoints = waypoints.length;
    const unusedUsers = [...this.users];

    const fadeLayer1 = () => {
      if (this.rocket && this.app?.stage.children[1]) {
        const layer1 = this.app?.stage.children[1] as PIXI.Sprite;
        const fadeProgress =
          (this.rocket.y - this.destinationY) / (800 - this.destinationY);
        layer1.alpha = fadeProgress;
        if (layer1.alpha <= 0) {
          layer1.visible = false; // Optional: Hide layer1 after fading out
        }
      }
    };

    let speed = this.rocketSpeed;

    const moveRocket = () => {
      if (!this.rocket || !this.trail) return;

      speed += 0.005;

      const target = waypoints[currentWaypoint];

      const dx = target.x - this.rocket.x;
      const dy = target.y - this.rocket.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const dirX = dx / distance;
      const dirY = dy / distance;

      const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;

      const angleDiff = targetAngle - this.rocket.rotation;
      this.rocket.rotation += angleDiff * 0.1;

      const progress = currentWaypoint / totalWaypoints;
      const minSize = 0.15;
      const maxSize = 0.2;
      const newSize = maxSize - (maxSize - minSize) * progress;
      this.rocket.scale.set(newSize);

      this.rocket.x += dirX * speed;
      this.rocket.y += dirY * speed;

      if (distance < speed) {
        currentWaypoint++;
      }

      fadeLayer1();

      if (currentWaypoint >= waypoints.length) {
        return;
      }

      this.trail?.clear();
      this.trail?.lineStyle(5, 0x0000ff, 100);
      this.trail?.moveTo(this.rocket.x, this.rocket.y);
      this.trail?.lineTo(
        this.rocket.x + dirX * speed,
        this.rocket.y + dirY * speed
      );

      const createUniqueStar = () => {
        if (unusedUsers.length === 0) return;

        const randomIndex = Math.floor(Math.random() * unusedUsers.length);
        const user = unusedUsers.splice(randomIndex, 1)[0];

        this.createStar(this.app!, user).then(star => {
          this.stars.push(star);
        });

        if (this.stars.length < this.displayLimit) {
          requestAnimationFrame(createUniqueStar);
        }
      };

      createUniqueStar();
      requestAnimationFrame(moveRocket);
    };

    moveRocket();
  }

  private createNextBatch() {
    const shuffleUsers = () => {
      for (let i = this.users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.users[i], this.users[j]] = [this.users[j], this.users[i]];
      }
    };

    let batchIndex = 0;
    const createBatch = () => {
      const speedFactor = Math.max(this.rocketSpeed / 2, 1);
      const starsToGenerate = Math.min(
        this.displayLimit - this.stars.length,
        Math.floor(this.batchSize * speedFactor)
      );

      if (
        batchIndex < this.users.length &&
        this.stars.length < this.displayLimit
      ) {
        const endIndex = Math.min(
          batchIndex + starsToGenerate,
          this.users.length
        );

        for (let i = batchIndex; i < endIndex; i++) {
          if (this.stars.length < this.displayLimit) {
            const user = this.users[i];
            this.createStar(this.app!, user).then(star => {
              this.stars.push(star);
            });
          }
        }

        batchIndex += starsToGenerate;
        requestAnimationFrame(createBatch);
      }
    };

    createBatch();
    shuffleUsers();
  }

  async createStar(app: PIXI.Application, user: User): Promise<PIXI.Sprite> {
    const starTextures = ['star1', 'star2', 'star3'].map(name =>
      PIXI.Assets.get(name)
    );

    const randomTexture =
      starTextures[Math.floor(Math.random() * starTextures.length)];
    const star = new PIXI.Sprite(randomTexture);

    const size =
      window.innerWidth < 1100
        ? Math.random() * 0.2 + 0.05
        : Math.random() * 0.3 + 0.2;
    star.scale.set(size);

    star.alpha = 0;

    const progress = this.angle / (Math.PI * 2);
    const maxOffset = 65;
    const minOffset = 5;
    const randomFactor = Math.random() * 1.5 + 0.5;

    const currentOffset = maxOffset - (maxOffset - minOffset) * progress;
    const extendedOffset = currentOffset * randomFactor;

    if (this.rocket) {
      const offsetX = (Math.random() - 0.5) * extendedOffset * 2;
      const offsetY = (Math.random() - 0.5) * extendedOffset * 2;

      star.x = this.rocket.x + offsetX;
      star.y = this.rocket.y + this.rocket.height / 1.5 + offsetY;
    }

    app.stage.addChild(star);
    app.stage.setChildIndex(star, app.stage.children.length - 1);

    star.interactive = true;

    star.on('pointertap', () => {
      console.log(`Clicked on star of user ${user.name}`);
      this.selectedUser = user;
      this.selectedUserImage = ``;
    });

    this.fadeInStar(star, 2000, 1);

    return star;
  }

  fadeInStar(star: PIXI.Sprite, duration: number, finalOpacity: number) {
    const ticker = new PIXI.Ticker();
    let elapsed = 0;

    ticker.add((tickerInstance: PIXI.Ticker) => {
      const deltaTime = tickerInstance.elapsedMS;
      elapsed += deltaTime;

      const progress = Math.min(elapsed / duration, 1);

      star.alpha = progress * finalOpacity;

      if (progress >= 1) {
        ticker.stop();
      }
    });

    ticker.start();
  }

  closeProfile() {
    this.selectedUser = null;
    this.selectedUserImage = null;
  }
}
