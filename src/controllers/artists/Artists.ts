import Logger from "../../logging/Logger";
import Responses from "../../utils/Responses";

export default class Artists {
    public static async GET(req: any, res: any): Promise<void> {
        try {
            // Temporary artists list
            const artists = [
                {
                    id: 1,
                    name: "+TEK",
                    links: [
                        {
                            name: "Twitter",
                            url: "https://twitter.com/plrusek"
                        },
                        {
                            name: "SoundCloud",
                            url: "https://soundcloud.com/plrusek-chan"
                        }
                    ],
                    songs: 10
                },
                {
                    id: 2,
                    name: "HyuN",
                    links: [
                        {
                            name: "Twitter",
                            url: "https://twitter.com/hyunesis"
                        },
                        {
                            name: "SoundCloud",
                            url: "https://soundcloud.com/hyunesis"
                        }
                    ],
                    songs: 10
                },
                {
                    id: 3,
                    name: "Plum",
                    links: [
                        {
                            name: "Twitter",
                            url: "https://twitter.com/plumwriter"
                        },
                        {
                            name: "YouTube",
                            url: "https://www.youtube.com/channel/UC0AwIqrAIR_98iXdDvLzUNg"
                        }
                    ],
                    songs: 10
                },
                {
                    id: 4,
                    name: "Rabbit House",
                    links: [
                        {
                            name: "Twitter",
                            url: "https://twitter.com/ri_neb"
                        },
                        {
                            name: "SoundCloud",
                            url: "https://soundcloud.com/dksslqj"
                        }
                    ],
                    songs: 10
                },
                {
                    id: 5,
                    name: "SCTL",
                    links: [
                        {
                            name: "SoundCloud",
                            url: "https://soundcloud.com/sctl_shin/venus-invader"
                        }
                    ],
                    songs: 10
                },
                {
                    id: 6,
                    name: "SVENS",
                    links: [
                        {
                            name: "Twitter",
                            url: "https://twitter.com/SVENS_Project"
                        },
                        {
                            name: "SoundCloud",
                            url: "https://soundcloud.com/svens_project"
                        }
                    ],
                    songs: 10
                },
                {
                    id: 7,
                    name: "zetoban",
                    links: [
                        {
                            name: "Twitter",
                            url: "https://soundcloud.com/zetoban"
                        },
                        {
                            name: "SoundCloud",
                            url: "https://soundcloud.com/zetoban"
                        }
                    ],
                    songs: 10
                }
            ]

            Responses.Send(req, res, "artists/artists", `Artists | Quaver`, {
                artists: artists
            });
        } catch (err: any) {
            Logger.Error(err);
            Responses.Return500(req, res);
        }
    }

    public static async ArtistGET(req: any, res: any): Promise<void> {
        try {


            Responses.Send(req, res, "artists/artist", `Artist NAME | Quaver`, {

            });
        } catch (err: any) {
            Logger.Error(err);
            Responses.Return500(req, res);
        }
    }
}