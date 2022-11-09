class Bullet {
  constructor(scene, name) {
    this.name = name;
    this.isAttacking = true;
    this.target = null;
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y += 10;
    scene.add(this.mesh);
  }

  setIsAttacking(isAttacking) {
    this.isAttacking = isAttacking;
  }

  setTarget(target) {
    this.target = target;
    this.mesh.lookAt(this.target.position);
  }

  setPosition(x, z) {
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  attack(playerhealth) {
    playerhealth--;
    return playerhealth;
  }

  animate() {
    this.mesh.translateZ(0.5);
  }
}
