import {Component, Inject} from 'angular2/core';
import {DraftingService} from './drafting.service';
import {Player} from './player'

@Component({
    selector: 'player-detail',
    styles: [`
        .pd {
            position: fixed;
            top: 2em;
            right: 1em;
            color: white;
            padding: 1em;
            background-color: steelblue;
            line-height: 1.5em;
            height: 9em;
            margin-right: .8em;
            border-radius: 20px;
            font-family: sans-serif;
        }

        .pd div {
            padding: 0.2em;
        }

        .player {
            text-decoration: underline;
            font-weight: bold;
            color: black;
        }

        select {
            font-size: small;
        }

        input {
            font-size: small;
            border: none;
            border-radius: 3px;
        }
    `],
    templateUrl: 'app/drafting/player-detail.component.html',
    inputs: ['player']
})
export class PlayerDetailComponent {
    player: Player;

    constructor(@Inject(DraftingService) private _draftingService: DraftingService) {
    }

    updatePlayer() {
        this._draftingService.updatePlayer(this.player).subscribe(
            player => this.player = player);
    }
}
