import { fetch } from "undici";
import type * as Lavalink from "@lavaclient/types";
import type { Node } from "./Node";

export type Options = { method?: string, data?: any };

export class REST {
    constructor(readonly node: Node) { }

    private get info() {
        return this.node.conn.info;
    }

    get baseUrl(): string {
        return `http${this.info.secure ? "s" : ""}://${this.info.host}:${this.info.port}`;
    }

    loadTracks(identifier: string): Promise<Lavalink.LoadTracksResponse> {
        return this.do(`/loadtracks?identifier=${encodeURIComponent(identifier)}`); "";
    }

    decodeTracks(...tracks: string[]): Promise<Lavalink.TrackInfo[]> {
        return this.do("/decodetracks", {
            method: "post",
            data: JSON.stringify(tracks),
        });
      }

    decodeTrack(track: string): Promise<Lavalink.TrackInfo> {
        return this.do(`/decodetrack?track=${track}`);
    }

    async do<T>(endpoint: string, options: Options = { }): Promise<T> {
        endpoint = /^\/.+/.test(endpoint) ? endpoint : `/${endpoint}`;
        const req = await fetch(`${this.baseUrl}${endpoint}`, {
            method: options?.method?.toUpperCase() ?? "GET",
            headers: {
                Authorization: this.info.password,
            },
            body: options.data ? JSON.stringify(options.data) : undefined,
        });
        const json = await req.json();
        this.node.debug("rest", `${options.method?.toUpperCase() ?? "GET"} ${endpoint}`);
        return json as T;
    }
}
