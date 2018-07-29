const fs = require("fs");
const client = require("./auth");
const date = require("date-and-time");

const _count = process.argv[2] || 5;
const _fromId = process.argv[3] || Number.NaN;

(() => {
    let fname = "newest";
    let fcount = 0;

    /**
     * @param {number} count 取得ツイート数
     * @param {number} [max_id=NaN] どのツイートIDから取得するか
     */
    const setParams = (count, max_id = Number.NaN) => {
        let ret = {
            count,
            include_entities: true, // entities取得用
            tweet_mode: "extended", // 全文表示
        };
        fcount = `${count}`;
        if (!isNaN(max_id)) {
            ret["max_id"] = max_id;
            fname = `${max_id}`
        }
        return ret;
    }
    client.get(
        'favorites/list',
        setParams(_count, _fromId),
        (error, list) => {
            if (!error) {
                let lastId = "";
                const result = list.reduce((prev, tweet) => {
                    const { user } = tweet;
                    const body = {
                        tweet: {
                            // id: tweet.id,
                            date: `${date.format(new Date(tweet.created_at), "YYYY/MM/DD HH:mm:ss")}`,
                            url: `https://twitter.com/${user.screen_name}/status/${tweet.id_str}`,
                            text: tweet.full_text,
                            media: tweet.entities.media,
                        },
                        user: {
                            id: user.screen_name,
                            name: user.name,
                            url: `https://twitter.com/${user.screen_name}`,
                            // image: user.profile_image_url_https,
                        },
                    }
                    lastId = `${tweet.id}`;
                    prev[lastId] = body;
                    return prev;
                }, {});
                console.log(result);
                fs.writeFileSync(
                    `${process.cwd()}/output/${fname}_x${fcount}.json`,
                    JSON.stringify(result, null, "\t")
                );
                console.log(`\nNEXT: yarn start ${fcount} ${lastId}\n`);
            } else {
                console.log({ error });
            }
        }
    );
})()