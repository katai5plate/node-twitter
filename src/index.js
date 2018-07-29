const fs = require("fs");
const client = require("./auth");

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
                fs.writeFileSync(
                    `${process.cwd()}/output/${fname}_x${fcount}.json`,
                    JSON.stringify(result, null, "\t")
                );
                console.log(`\nNEXT TWEET ID: ${result[result.length - 1].tweet.id}\n`);
            } else {
                console.log({ error });
            }
        }
    );
})()