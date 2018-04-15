import { Player } from 'entities/GameState';
import { point as pointStyle } from 'config/styles';

export function getPointColourForPlayer(player: Player) {
    return player === Player.Player1 ? pointStyle.firstPlayersColour : pointStyle.seconfPlayersColour;
}
