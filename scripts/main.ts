import * as Minecraft from "@minecraft/server";
import { HttpRequest, HttpHeader, HttpRequestMethod, http } from '@minecraft/server-net';

async function add_data(db_url:string,body:any) {
    const req = new HttpRequest(db_url);

    req.body = body

    req.method = HttpRequestMethod.Post;
    req.headers = [
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
        new HttpHeader('Content-Type', 'application/json'),
        new HttpHeader('token', 'windNB!!!'),
    ];

    return await http.request(req);
}

Minecraft.world.afterEvents.playerJoin.subscribe(
    player => add_data('https://api.windnb.top:5173/add_player', {player_uuid: player.playerId.toString(),}))