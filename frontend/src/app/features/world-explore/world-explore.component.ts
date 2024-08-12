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
  blueLinePath: PIXI.Graphics | undefined;

  stars: PIXI.Sprite[] = [];
  users: User[] = [];
  angle = 0;
  destinationY = 0;
  usersProcessed = 50;

  batchSize = 2;
  displayLimit = 0;
  rocketSpeed = 1;
  isMoving = true;

  selectedUser: User | null = null;
  selectedUserImage: string | null = null;

  private isRocketMoving = false; // Flag to check if the rocket is moving

  async ngOnInit() {
    this.initializePixiApp();
  }

  private async initializePixiApp() {
    const aspectRatio = 425 / 824; // Original aspect ratio of your canvas
    const appHeight = window.innerHeight;
    const appWidth = appHeight * aspectRatio; // Calculate width based on height

    const app = new PIXI.Application();
    this.app = app;
    const numberOfUsers = 5000;
    for (let i = 1; i <= numberOfUsers; i++) {
      this.users.push({
        id: i,
        name: `User ${i}`,
        score: Math.floor(Math.random() * 1000),
      });
    }

    app
      .init({
        width: appWidth,
        height: appHeight,
        resizeTo: window,
      })
      .then(async () => {
        document.body.appendChild(app.canvas);

        await this.loadAssets();

        const BackgroundTexture = await PIXI.Assets.load('background');
        const layer1Texture = await PIXI.Assets.load('layer1');

        this.setupBackground(BackgroundTexture);
        this.setupLayer1(layer1Texture);

        this.rocket = await this.createRocket();
        this.trail = new PIXI.Graphics();
        app.stage.addChild(this.trail);
        app.stage.setChildIndex(this.trail, app.stage.children.length - 1);

        app.canvas.addEventListener('click', async () => {
          if (!this.isRocketMoving) {
            this.isRocketMoving = true;

            const RocketTexture = await PIXI.Assets.load('rocketwithengine');
            if (this.rocket) {
              this.rocket.texture = RocketTexture;
            }

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
    await PIXI.Assets.add({
      alias: 'rocketwithengine',
      src: './assets/images/rocketwithengine.png',
    });

    await PIXI.Assets.backgroundLoad([
      'star1',
      'star2',
      'star3',
      'rocket',
      'layer1',
      'background',
      'rocketwithengine',
    ]);

    PIXI.Assets.load('star1');
    PIXI.Assets.load('star2');
    PIXI.Assets.load('star3');
  }

  private setupBackground(texture: PIXI.Texture) {
    const background = new PIXI.Sprite(texture);

    // Get the current width and height of the application
    const appWidth = this.app?.screen.width ?? 425;
    const appHeight = this.app?.screen.height ?? 824;

    // Calculate aspect ratio
    const textureRatio = texture.width / texture.height;
    const canvasRatio = appWidth / appHeight;

    if (canvasRatio > textureRatio) {
      // Fill based on height
      background.height = appHeight;
      background.width = appHeight * textureRatio * 1.1; // Optional scaling factor
    } else {
      // Fill based on width
      background.width = appWidth;
      background.height = appWidth / textureRatio; // Optional scaling factor
    }

    // Center the background dynamically
    background.x = (appWidth - background.width) / 2;
    background.y = (appHeight - background.height) / 2;

    this.app?.stage.addChild(background);
  }

  private setupLayer1(texture: PIXI.Texture) {
    const layer1 = new PIXI.Sprite(texture);

    // Scale the layer
    layer1.scale.set(0.5);

    const appHeight = this.app?.screen.height ?? 824;
    layer1.y = appHeight - 150;

    layer1.x = -10;

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

    const appHeight = this.app.screen.height ?? 824;
    rocket.y = appHeight - 150;

    rocket.zIndex = 1000;
    this.app?.stage.addChild(rocket);
    return rocket;
  }

  private calculateSumCoin(users: User[]): number {
    return users.reduce((sum, user) => sum + user.score, 0);
  }

  private async createText(message: string, xOffset: number, yOffset: number) {
    const textContainer = document.getElementById('text-container');

    if (!textContainer) return;

    // Create a new div element for the text
    const textElement = document.createElement('div');
    textElement.innerHTML = message;
    textElement.style.position = 'absolute';
    textElement.style.opacity = '1'; // Start fully visible
    textElement.style.transition = 'opacity 1s ease-out'; // Smooth fade out

    // Append the text element to the container
    textContainer.appendChild(textElement);

    // Position the text relative to the rocket's position
    const updateTextPosition = () => {
      if (!this.rocket) return;

      const rocketX = this.rocket.x + xOffset;
      const rocketY = this.rocket.y + yOffset;
      textElement.style.left = `${rocketX}px`;
      textElement.style.top = `${rocketY}px`;
    };

    updateTextPosition(); // Initial position update

    // Animate the text to fade out after a delay
    setTimeout(() => {
      textElement.style.opacity = '0'; // Start fading out
      setTimeout(() => {
        textContainer.removeChild(textElement); // Remove the text element after fading out
      }, 1000); // Match this delay with the transition duration
    }, 1200); // Short delay before starting to fade out
  }

  private processUserBatches() {
    const waypoints = [
      { x: 80, y: 550 },
      {
        x: 100,
        y: 525,
        displayText: 'สำเร็จแล้ว<br/>200,000 coins',
        xOffset: 50,
        yOffset: -30,
        minCoin: 200000,
      },
      {
        x: 340,
        y: 320,
      },
      {
        x: 320,
        y: 300,
        displayText: 'สำเร็จแล้ว<br/>300,000 coins',
        xOffset: -180,
        yOffset: -20,
        minCoin: 300000,
      },
      {
        x: 200,
        y: 190,
        displayText: 'สำเร็จแล้ว<br/>400,000 coins',
        xOffset: 70,
        yOffset: -40,
        minCoin: 400000,
      },
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
    const stopDuration = 1000; // Duration to stop at each waypoint in milliseconds

    const moveRocket = () => {
      if (!this.rocket || !this.trail || !this.app) return;

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
      const minSize = 0.5;
      const maxSize = 0.6;
      const newSize = maxSize - (maxSize - minSize) * progress;
      this.rocket.scale.set(newSize);

      this.rocket.x += dirX * speed;
      this.rocket.y += dirY * speed;

    //  const graphics = new PIXI.Graphics();
    //  this.app.stage.addChild(graphics);

    //  // Adjust sprayDensity dynamically, e.g., based on rocket speed or distance to the target
    //  const distanceToTarget = Math.hypot(
    //    target.x - this.rocket.x,
    //    target.y - this.rocket.y
    //  );
    //  const maxSprayDensity = 100; // Maximum number of spray particles
    //  const minSprayDensity = 10; // Minimum number of spray particles
    //  const sprayDensity = Math.max(
    //    minSprayDensity,
    //    maxSprayDensity * (distanceToTarget / 100)
    //  ); // Scale density based on distance

    //  const sprayRadius = 5; // Radius of the spray spread

    //  for (let i = 0; i < sprayDensity; i++) {
    //    const randomAngle = Math.random() * Math.PI * 2; // Random angle in radians
    //    const randomRadius = Math.random() * sprayRadius; // Random radius within spray spread

    //    const sprayX =
    //      this.rocket.x - dirX * speed + Math.cos(randomAngle) * randomRadius;
    //    const sprayY =
    //      this.rocket.y - dirY * speed + Math.sin(randomAngle) * randomRadius;

    //    // Start at the spray point
    //    graphics.moveTo(sprayX, sprayY);

    //    // Random offset for spray particle end point
    //    const offsetX = Math.random() * 2 - 1; // Random offset between -1 and 1
    //    const offsetY = Math.random() * 2 - 1; // Random offset between -1 and 1

    //    // Set opacity and draw the spray particle
    //   //  const alpha = 0.5; // Opacity value (0.0 - 1.0)
    //    graphics.lineStyle(100, 0x00007f); // Thinner line (1px) with opacity
    //    graphics.lineTo(sprayX + offsetX, sprayY + offsetY);
    //    graphics.stroke();
    //  }

      if (distance < speed) {
        // Calculate the sum score of users
        const sumCoin = this.calculateSumCoin(unusedUsers);

        // Check if the score is below the minimum required for the next waypoint
        if (currentWaypoint < totalWaypoints - 1) {
          const nextWaypoint = waypoints[currentWaypoint + 1];
          if (nextWaypoint.minCoin && sumCoin < nextWaypoint.minCoin) {
            // Stop the rocket and do not proceed to the next waypoint
            this.isMoving = false;
            if (target.displayText) {
              this.createText(
                target.displayText,
                target.xOffset || 0,
                target.yOffset || 0
              );
            }
            return; // Exit to stop further movement
          }
        }

        // If there is a displayText for the current waypoint
        if (target.displayText) {
          this.isMoving = false;

          this.createText(
            target.displayText,
            target.xOffset || 0,
            target.yOffset || 0
          ); // Show the text if the waypoint has one
          currentWaypoint++;

          // Wait for the specified duration before continuing to the next waypoint
          if (currentWaypoint < totalWaypoints) {
            setTimeout(() => {
              this.isMoving = true; // Allow the rocket to move again
              moveRocket(); // Continue moving to the next waypoint
            }, stopDuration);
            return; // Exit the function to wait
          }
        } else {
          // If there's no displayText, just move to the next waypoint
          currentWaypoint++;
        }
      }

      fadeLayer1();

      if (currentWaypoint >= waypoints.length) {
        return;
      }

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
    const maxOffset = 50;
    const minOffset = 10;
    const randomFactor = Math.random() * 1.5 + 0.5;

    const currentOffset = maxOffset - (maxOffset - minOffset) * progress;
    const extendedOffset = currentOffset * randomFactor;

    if (this.rocket) {
      const offsetX = (Math.random() - 0.5) * extendedOffset * 2;
      const offsetY = (Math.random() - 0.5) * extendedOffset * 2;

      star.x = this.rocket.x + offsetX;
      star.y = this.rocket.y + this.rocket.height / 2.5 + offsetY;
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
