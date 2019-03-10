import {Component, EventEmitter, Inject, Injectable, Output} from "angular2/core";
import {Team} from "./team";
import {TeamService} from "./team.service";
import {DraftingComponent} from "./drafting.component";
import {Player} from "./player";

@Component({
    selector: 'team',
    styles: [`
        .team {
            position: fixed;
            top: 14em;
            right: 1em;
            color: white;
            padding: 1em;
            background-color: darkgreen;
            line-height: 1.5em;
            height: 44em;
            margin-right: .8em;
            border-radius: 30px;
            font-family: sans-serif;
            width: 42em;
        }

        .menu {
            position: absolute;
            right: 1em;
        }

        .club {
            text-decoration-line: underline;
        }

        .info {
            font-size: 0.9em;
        }

        .pos {
            border-radius: 4px;
            border: thin solid darkgreen;
            background-color: white;
            color: black;
            font-size: 0.8em;
            width: 17em;
            height: 16em;
            list-style-type: none;
            padding: 0em;
        }

        .pos lh {
            text-decoration-line: underline;
        }

        .pos li {
            line-height: 1.2em;
            border-radius: 4px;
            background-color: darkblue;
            color: white;
            margin: 0.1em;
            padding: 0.0em 0.2em 0em 0.2em;
            cursor: pointer;
        }

        .pos li:hover {
            background-color: gray;
        }

        .kicks {
            position: absolute;
            top: 37em;
            left: 1em;
            height: 17em;
        }

        .handballs {
            position: absolute;
            top: 37em;
            left: 19em;
            height: 17em;
        }

        .marks {
            position: absolute;
            top: 21em;
            left: 1em;
            height: 15em;
        }

        .tackles {
            position: absolute;
            top: 21em;
            left: 19em;
            height: 15em;
        }

        .goals {
            position: absolute;
            top: 4em;
            left: 1em;
        }

        .rucks {
            position: absolute;
            top: 4em;
            left: 37em;
            height: 12em;
        }

        .star {
            position: absolute;
            top: 4em;
            left: 19em;
        }

        .unknown {
            position: absolute;
            top: 17em;
            left: 37em;
            height: 37em;
        }
    `],
    templateUrl: 'app/drafting/team.component.html',
    providers: [TeamService]
})
export class TeamComponent {
    team: Team;

    constructor(@Inject(TeamService) private _teamService: TeamService) {
    }

    getTeam(club) {
        this._teamService.getTeam(club).subscribe(
            team => this.team = team
        );
    }

    getTotalCents() {
        return this.team.k.reduce((sum, item) => sum + item.cents, 0)
            + this.team.h.reduce((sum, item) => sum + item.cents, 0)
            + this.team.m.reduce((sum, item) => sum + item.cents, 0)
            + this.team.t.reduce((sum, item) => sum + item.cents, 0)
            + this.team.g.reduce((sum, item) => sum + item.cents, 0)
            + this.team.r.reduce((sum, item) => sum + item.cents, 0)
            + this.team.s.reduce((sum, item) => sum + item.cents, 0)
            + this.team.x.reduce((sum, item) => sum + item.cents, 0)
    }

    getTotalPlayers() {
        return this.team.k.length
            + this.team.h.length
            + this.team.m.length
            + this.team.t.length
            + this.team.g.length
            + this.team.r.length
            + this.team.s.length
            + this.team.x.length
    }

    ngOnInit() {
        this.getTeam("Ruiboys");
    }

    @Output() playerSelectedEvent = new EventEmitter();

    selectPlayer(name: string) {
        this.playerSelectedEvent.emit(name)
    }
}
