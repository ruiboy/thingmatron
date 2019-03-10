'use strict';

import {Component, Inject, Injectable} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {RouterLink} from "angular2/router";
import {DraftingService} from "./drafting.service";
import {Player} from "./player";
import {PlayerDetailComponent} from "./player-detail.component";
import {TeamComponent} from "./team.component";

@Component({
    selector: 'home',
    styles: [`
        button {
            border-radius: 4px;
            margin: 0 5px 5px 0;
        }

        .players {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 55em;
            font-family: sans-serif;
        }

        .players li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .1em;
            padding: 0;
            border-radius: 4px;
        }

        .players li:hover {
            color: black;
            background-color: #DDD;
            left: .1em;
        }

        .players li.selected {
            background-color: steelblue !important;
            color: black;
        }

        .players .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.5em 0.7em 0.5em 0.7em;
            background-color: midnightblue;
            position: relative;
            left: -1px;
            margin-right: .8em;
            border-radius: 4px 0 0 4px;
        }

        .players .text {
            font-size: small;
        }

        .players .text .prioritized {
            background-color: white;
            border-radius: 4px;
            padding: 0 0.2em 0 0.2em;
            margin: 0.5em 0.3em 0 0;
        }

        .players .text .stats {
            background-color: white;
            border-radius: 4px;
            padding: 0 0.2em 0 0.2em;
            margin: 0.5em 0.3em 0 0;
            float: right;
        }

        .players .text .draftedBy {
            background-color: firebrick;
            color: white;
            border-radius: 4px;
            margin-left: 1em;
            padding: 0 0.2em 0 0.2em;
            margin: 0.5em 0.3em 0 0;
            float: right;
        }

        .players .want {
            background-color: yellowgreen;
        }

        .players .avoid {
            background-color: palevioletred;
        }

        .players .drafted {
            background-color: #888888;
        }

        .players .mine {
            background-color: gold;
        }

        .players .mine .stats,
        .players .drafted .stats,
        .players .avoid .stats {
            text-decoration-line: line-through;
        }

        .players .mine .badge,
        .players .drafted .badge,
        .players .avoid .badge {
            background-color: gray;
        }
    `],
    templateUrl: 'app/drafting/drafting.component.html',
    providers: [DraftingService],
    directives: [CORE_DIRECTIVES, RouterLink, PlayerDetailComponent, TeamComponent]
})
@Injectable()
export class DraftingComponent {
    public players: Player[];
    public selectedPlayer: Player;

    constructor(@Inject(DraftingService) private _draftingService: DraftingService) {
    }

    onSelect(player: Player) {
        this.selectedPlayer = player;
    }

    selectByName(name: string) {
        this.selectedPlayer = this.players.find(p => p.name == name)  ;
    }

    getPlayers() {
        this._draftingService.getAllPlayers().subscribe(
            players => this.players = players
        );
    }

    getSortDraftedBy() {
        this._draftingService.getSortDraftedBy().subscribe(
            players => this.players = players
        );
    }

    getSortAvailable() {
        this._draftingService.getSortAvailable().subscribe(
            players => this.players = players
        );
    }

    getSortWanted() {
        this._draftingService.getSortWanted().subscribe(
            players => this.players = players
        );
    }

    getSortAflClub() {
        this._draftingService.getSortAflClub().subscribe(
            players => this.players = players
        );
    }

    getSortStat(stat) {
        this._draftingService.getSortStat(stat).subscribe(
            players => this.players = players
        );
    }

    getByComment(comment) {
        this._draftingService.getByComment(comment).subscribe(
            players => this.players = players
        );
    }

    ngOnInit() {
        this.getPlayers();
    }
}
