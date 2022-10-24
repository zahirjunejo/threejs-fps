const GUNSHOT_VOL = 0;
class Pistol {
  constructor(listener) {
    this.name = "Pistol";
    this.listener = listener;
    this.gunshot = new THREE.Audio(this.listener);
    let audioLoader = new THREE.AudioLoader();
    this.audioPath = "assets/sounds/gunshot.ogg";
    this.flashTexturePath = "assets/images/flash.png";
    audioLoader.load(
      this.audioPath,
      function (buffer) {
        this.gunshot.setBuffer(buffer);
        this.gunshot.setLoop(false);
        this.gunshot.setVolume(GUNSHOT_VOL);
        this.gunshot.setPlaybackRate(2.5);
      }.bind(this)
    );

    this.shooting = false;

    this.barrelGeometry = new THREE.CylinderGeometry(1, 1, 30, 20);
    this.muzzleGeometry = new THREE.BoxGeometry(30, 4, 4);

    this.material = new THREE.MeshPhongMaterial({
      color: 0x2c3539,
      specular: 0x2c3539,
      shininess: 150.0,
    });

    this.barrel = new THREE.Mesh(this.barrelGeometry, this.material);
    this.barrel.rotation.z += Math.PI / 2;

    this.muzzleFlash = {
      geometry: new THREE.PlaneGeometry(150, 50),
      material: new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        map: new THREE.TextureLoader().load(this.flashTexturePath),
        blending: THREE.AdditiveBlending,
        depthTest: false,
      }),
    };

    this.muzzleFlash["mesh"] = new THREE.Mesh(
      this.muzzleFlash["geometry"],
      this.muzzleFlash["material"]
    );
    this.muzzleFlash["mesh"].position.x += 75;

    this.muzzle = new THREE.Mesh(this.muzzleGeometry, this.material);
    this.muzzle.position.x -= 0.4;
    this.muzzle.scale.z += 0.8;
    this.muzzle.scale.x -= 0.8;

    this.muzzle2 = this.muzzle.clone();
    // this.muzzle2.position.y -= 1;
    this.muzzle2.scale.x += 2.5;
    this.muzzle2.scale.y += 1.5;
    this.muzzle2.scale.z -= 0.8;

    this.handle = this.muzzle.clone();
    this.handle.position.y -= 10;
    this.handle.position.x -= 25;
    this.handle.rotation.z += (80 / 360) * 2 * Math.PI;
    this.handle.scale.y += 0.5;
    this.handle.scale.x += 0.25;
    this.handle.scale.z -= 1;

    this.trigger = this.muzzle.clone();
    this.trigger.position.y -= 12;
    this.trigger.position.x -= 3;
    this.trigger.scale.x += 0.1;
    this.trigger.scale.y += 3.0;
    this.trigger.scale.z -= 1;

    this.blackPhong = new THREE.MeshPhongMaterial({
      color: 0x000fff,
      shininess: 100.0,
    });

    this.darkGreyPhong = new THREE.MeshPhongMaterial({
      color: 0x7474fc,
      shininess: 100.0,
    });

    this.muzzle.material = this.handle.material = this.trigger.material = this.blackPhong;
    this.muzzle2.material = this.barrel.material = this.darkGreyPhong;

    this.mesh = new THREE.Group();
    this.mesh.add(this.barrel);

    this.mesh.add(this.muzzle);
    this.mesh.add(this.muzzle2);
    this.mesh.add(this.trigger);
    this.mesh.add(this.handle);
    this.mesh.add(this.muzzleFlash["mesh"]);

    document.addEventListener(
      "mousedown",
      function (event) {
        event.preventDefault();
        // if (!this.pistol.isShooting) {
        this.pistol.shooting = true;
        // this.pistol.muzzle.position.x -= 5;
        // if (this.pistol.gunshot.isPlaying) this.pistol.gunshot.stop();

        // this.pistol.gunshot.play();
        // } else {
        // this.pistol.gunshot.reset();
        // this.pistol.gunshot.stop();
        // }
      }.bind({ pistol: this })
    );

    document.addEventListener(
      "mouseup",
      function (event) {
        event.preventDefault();
        // if (!this.pistol.isShooting) {
        this.pistol.shooting = false;
        // this.pistol.muzzle.position.x -= 5;
        // if (this.pistol.gunshot.isPlaying) this.pistol.gunshot.stop();

        // this.pistol.gunshot.play();
        // } else {
        // this.pistol.gunshot.reset();
        // this.pistol.gunshot.stop();
        // }
      }.bind({ pistol: this })
    );
  }

  setShooting(isShooting) {
    this.shooting = isShooting;
  }

  animate() {
    if (this.shooting) {
      if (this.muzzle.position.x < -1) {
        this.muzzle.position.x += 1;
        this.muzzleFlash["material"].opacity = 0;
      } else {
        this.muzzle.position.x -= 5;
        this.muzzleFlash["material"].opacity = 1;
      }
    } else {
      this.muzzle.position.x = -0.4;
      this.muzzleFlash["material"].opacity = 0;
    }
  }
}
