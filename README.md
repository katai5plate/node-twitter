# node-twitter
TwitterAPIを使って自分のふぁぼを収集します。
## つかいかた
1. おとす
```s
git clone https://github.com/katai5plate/node-twitter
```
2. いれる
```coffee
cd node-twitter
yarn install
```
3. いじる
- src/auth.js
```diff
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
+   consumer_key: "ここに Consumer API key",
+   consumer_secret: "ここに Consumer API secret key",
+   access_token_key: "ここに Access token",
+   access_token_secret: "ここに Access token secret"
  }
);
const client = new Twitter(config);
module.exports = client;
```
4. 実行
```coffee
yarn start <取得ツイート数> <取得開始するツイートID>
```

## メモ
### 動画URLの取得方法
- `tweet.media.display_url`の`pic.twitter.com/*********`を`https://video.twimg.com/tweet_video/*********.mp4`にすればいい