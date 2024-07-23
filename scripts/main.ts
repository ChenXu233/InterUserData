import * as Minecraft from "@minecraft/server";
import * as MinecraftAdmin from "@minecraft/server-admin";
import { HttpRequest, HttpHeader, HttpRequestMethod, http } from '@minecraft/server-net';

async function add_data(db_url:string,body:any) {
    const req = new HttpRequest(db_url);

    req.body = body

    req.method = HttpRequestMethod.Post;
    req.headers = [
        new HttpHeader('accept', 'application/json'),
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('token', 'windNB!!!'),
    ];

    return await http.request(req);
}

async function get_data(db_url:string, body:any){
    const req = new HttpRequest(db_url);

    req.body = body

    req.method = HttpRequestMethod.Post;
    req.headers = [
        new HttpHeader('accept', 'application/json'),
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('token', 'windNB!!!'),
    ];

    return await http.request(req);
}

function get_player_by_id_and_name(id:string,name:string){
    let minecraft_players = Minecraft.world.getAllPlayers();
    let player = minecraft_players.find(p => p.name == name && p.id == id);
    if (!player) throw new Error('Player ${player.name} not found');
    return player;
}

Minecraft.world.afterEvents.playerJoin.subscribe(
    player => {
        add_data(
            'localhost:8080/player_data', 
            {player_uuid: player.playerId.toString(),}
        );
        let minecraft_player = get_player_by_id_and_name(player.playerId.toString(),player.playerName.toString())
        let data = minecraft_player.getComponent("minecraft:inventory")
        console.info(data)

    }
)