"use strict";
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
const server_net_1 = require("@minecraft/server-net");
function add_data(db_url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = new server_net_1.HttpRequest(db_url);
        req.body = body;
        req.method = server_net_1.HttpRequestMethod.Post;
        req.headers = [
            new server_net_1.HttpHeader('Content-Type', 'application/json'),
            new server_net_1.HttpHeader('auth', 'my-auth-token'),
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
            new server_net_1.HttpHeader('Content-Type', 'application/json'),
            new server_net_1.HttpHeader('auth', 'my-auth-token'),
        ];
        return yield server_net_1.http.request(req);
    });
}
