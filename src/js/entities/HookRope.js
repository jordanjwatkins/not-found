import dom from '../libs/dom';

class HookRope {
  constructor(game, options = {}) {
    const { el } = options;

    this.game = game;

    this.id = 'hook-rope';
    this.el = el || dom.findOne('.hook-rope');
    this.elPlus = dom.findOne('.hook-rope .plus');
    this.elRope = dom.findOne('.hook-rope path.rope');
    this.elHook = dom.findOne('.hook-rope path.hook');

    this.x = 0;
    this.progress = 0;
    this.distX = 1;
    this.distY = 1;
    this.speedY = -12;
    this.dropped = true;

    this.addEvents();
  }

  addEvents() {
    const { el } = this;

    dom.onTap(el, () => {
    });
  }

  toggleDropped() {
    //console.log('drop hook rope');

    this.dropped = !this.dropped;

    this.render();
  }

  render() {
    const { elRope, elHook, distX, distY, game } = this;
    const { beardman } = game;

    const raftRect = dom.findOne('.app-container').getBoundingClientRect();

    const scale = 1;

    const ropeRaftX = 100;
    const ropeRaftY = 300;
    const ropeStartX = beardman.x + 80;
    const ropeStartY = (this.dropped) ? -3 : -30;
    const ropeEndX = ropeStartX + distX;
    const ropeEndY = ropeStartY + distY;

    /*if (beardman.throwHook) {
      elRope.setAttribute('d', `
        M${ropeRaftX - 20},-2
        L${ropeRaftX + 20},-2
        L${ropeRaftX - 15},-4
        L${ropeRaftX + 25},-4
        L${ropeRaftX},${ropeRaftY}
        L${ropeStartX - 60},${ropeStartY + 5}
        L${ropeEndX},${ropeEndY}
      `);
    } else {
      elRope.setAttribute('d', `
        M${ropeRaftX - 20},-2
        L${ropeRaftX + 20},-2
        L${ropeRaftX - 15},-4
        L${ropeRaftX + 25},-4
        L${ropeRaftX},${ropeRaftY}
        L${ropeStartX - 60},${ropeStartY + 5}
        L${ropeStartX},${ropeStartY}
        L${ropeEndX},${ropeEndY}
      `);
    }*/

    elRope.setAttribute('d', `
        M${ropeStartX - 60},${ropeStartY + 5}
        L${ropeEndX},${ropeEndY}
      `);

    elHook.setAttribute('d', `
      M${ropeEndX},${ropeEndY}
      L${ropeEndX + 30},${ropeEndY}
      L${ropeEndX + 20},${ropeEndY + 30}
    `);
  }

  update() {
    const { game } = this;
    const { beardman } = game;

    beardman.throwHook = true;

    if (beardman.resetThrow) {
      if (this.distX > 5) {
        this.distX -= 15;
        this.distY -= 4;
        //console.log('reset throw');

        this.progress += 100;
      } else {
        beardman.resetThrow = false;
        this.distX = 1;
        this.distY = 1;
        this.speedY = -12;
      }

      this.render();
    }

    if (beardman.throwHook) {
      if (this.distY < 70) {
        if (this.distX < 300) this.distX += 5;

        this.distY += this.speedY;
        this.speedY += 0.5;

        this.render();
      } else {
        beardman.hookLandeded = true;
      }
    }
  }
}

export default HookRope;
