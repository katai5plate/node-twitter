const Twitter = require('twitter');
const config = (auth => {
    let data;
    try {
        data = require('../twitter.config.json');
    } catch (e) {
        data = auth;
    }
    return data;
})(
    // keyとtokenを入力
    {
        consumer_key: "",
        consumer_secret: "",
        access_token_key: "",
        access_token_secret: ""
    }
);
const client = new Twitter(config);
module.exports = client;