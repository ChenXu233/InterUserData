"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Minecraft = __importStar(require("@minecraft/server"));
const server_net_1 = require("@minecraft/server-net");
function add_data(db_url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = new server_net_1.HttpRequest(db_url);
        req.body = body;
        req.method = server_net_1.HttpRequestMethod.Post;
        req.headers = [
            new server_net_1.HttpHeader('accept', 'application/json'),
            new server_net_1.HttpHeader('Content-Type', 'application/json'),
            new server_net_1.HttpHeader('token', 'windNB!!!'),
        ];
        return yield server_net_1.http.request(req);
    });
}
function get_data(db_url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = new server_net_1.HttpRequest(db_url);
        req.body = body;
        req.method = server_net_1.HttpRequestMethod.Post;
        req.headers = [
            new server_net_1.HttpHeader('accept', 'application/json'),
            new server_net_1.HttpHeader('Content-Type', 'application/json'),
            new server_net_1.HttpHeader('token', 'windNB!!!'),
        ];
        return yield server_net_1.http.request(req);
    });
}
function get_player_by_id_and_name(id, name) {
    let minecraft_players = Minecraft.world.getAllPlayers();
    let player = minecraft_players.find(p => p.name == name && p.id == id);
    if (!player)
        throw new Error('Player ${player.name} not found');
    return player;
}
Minecraft.world.afterEvents.playerJoin.subscribe(player => {
    add_data('localhost:8080/player_data', { player_uuid: player.playerId.toString(), });
    let minecraft_player = get_player_by_id_and_name(player.playerId.toString(), player.playerName.toString());
    let data = minecraft_player.getComponent("minecraft:inventory");
    console.info(data);
});
