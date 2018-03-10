import Game from 'engine/Game';
import GameState from 'entities/GameState';
import { defaultConfig } from 'config/game';

const game = new Game(document.body, GameState.buildEmptyState(defaultConfig));
game.start();
