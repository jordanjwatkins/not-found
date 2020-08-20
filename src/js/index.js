import dom from './libs/dom';
import GameLoop from './libs/GameLoop';
import Beardman from './entities/Beardman';
import HookRope from './entities/HookRope';

const elBeardman = dom.findOne('.beardman');
const elTitle = dom.findOne('.game-title');

setTimeout(() => {
  console.log('throw');
  dom.findOne('.snowball').classList.add('throw');

  setTimeout(() => {
    console.log('throw');
    //dom.findOne('.beardman').classList.add('hit');
  }, 600);
}, 3000);

dom.onTap(elTitle, () => {
  elTitle.classList.add('hide');
});

setTimeout(() => {
  elTitle.classList.add('hide');
}, 4000);

const game = {
  el: dom.findOne('.app-container'),
  elWin: dom.findOne('.game-end')
};

const beardman = new Beardman(game, { el: elBeardman });
const hookRope = new HookRope(game);

game.entities = [
  beardman,
  hookRope
];

game.beardman = beardman;

game.gameLoop = new GameLoop(() => {
  game.entities.forEach((entity) => {
    if (entity.update) entity.update();
  });
});
