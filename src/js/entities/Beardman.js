import dom from '../libs/dom';

class Beardman {
  constructor(game, options = {}) {
    const { el } = options;

    this.game = game;

    this.id = 'beardman';
    this.el = el || dom.findOne('.beardman');

    this.x = 100;

    setTimeout(() => {
      this.enter();
    }, 1000);

    dom.onTap(this.el, () => {
      this.toggleWalking();

      if (this.throwHook) {
        this.throwHook = false;
        this.resetThrow = true;
      } else {
        this.throwHook = true;
        this.resetThrow = false;
      }
    });
  }

  enter() {
    this.toggleWalking();
    this.el.classList.add('enter');

    setTimeout(() => {
      this.toggleWalking();
    }, 1300);
  }

  toggleWalking() {
    if (this.walking) {
      this.walking = false;
      this.el.classList.remove('walking');
      this.frame = 1;
    } else {
      this.walking = true;
      this.el.classList.add('walking');
      this.frame = 2;
    }
  }

  update() {
    const startingFrame = this.frame;

    // Walking
    if (this.walking) {
      if (Math.sin(Date.now() / 100) > 0) {
        this.frame = 2;
      } else {
        this.frame = 3;
      }
    } else {
      this.frame = 1;
    }

    if (this.frame !== startingFrame) {
      if (this.frame === 2) {
        this.el.classList.remove('frame-3');
        this.el.classList.add('frame-2');
      } else if (this.frame === 3) {
        this.el.classList.remove('frame-2');
        this.el.classList.add('frame-3');
      } else {
        this.el.classList.remove('frame-2', 'frame-3');
      }
    }
  }
}

export default Beardman;
