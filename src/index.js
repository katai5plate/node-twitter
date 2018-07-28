const client = require("./auth");

/**
 * @param {number} user_id ユーザーID
 * @param {number} count 取得ツイート数
 * @param {number} [max_id=NaN] どのツイートIDから取得するか
 */
const setParams = (user_id, count, max_id = Number.NaN) => {
    let ret = {
        user_id,
        count,
        include_entities: true, // entities取得用
        tweet_mode: "extended", // 全文表示
    };
    if (!isNaN(max_id)) {
        ret["max_id"] = max_id;
    }
    return ret;
}
client.get(
    'favorites/list',
    setParams("katai5plate", 5),
    (error, list) => {
        if (!error) {
            const result = list.map(tweet => {
                const { user } = tweet;
                return {
                    tweet: {
                        id: tweet.id,
                        text: tweet.full_text,
                        media: tweet.entities.media,
                    },
                    user: {
                        id: user.screen_name,
                        name: user.name,
                        image: user.profile_image_url_https,
                    },
                };
            });
            console.log(result);
        } else {
            console.log({ error });
        }
    }
);