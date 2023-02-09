const fs = require('fs')
const path = require('path');

class Movies {
    constructor(info_file) {
        fs.readFile(info_file, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            const trakt_info = JSON.parse(jsonString)
            this.init(trakt_info.client_id, trakt_info.client_secret)
        })
    }

    init(client_id, client_secret) {
        const Trakt = require('trakt.tv');

        let options = {
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: null,   // defaults to 'urn:ietf:wg:oauth:2.0:oob'
            api_url: null,        // defaults to 'https://api.trakt.tv'
            useragent: null,      // defaults to 'trakt.tv/<version>'
            pagination: true      // defaults to false, global pagination (see below)
        };
        const trakt = new Trakt(options);
    }

    get_now_playing() {
        trakt.movies.watching()
    }
}

new Movies(path.join(__dirname+'/trackt_info.json'))