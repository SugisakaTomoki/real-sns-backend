// require関数を使用して、expressを呼ぶ
const express = require("express");
// app変数にexpress関数を格納する
const app = express();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
// ポート番号を指定する。何番でもいい
const PORT = 5000;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中...");
  })
  //   エラーが発生した際の処理
  .catch((err) => {
    console.log(err);
  });

// ミドルウェアの設定
// /imagesパスで、express.staticミドルウェアを使用し、public/imagesディレクトリ内の静的ファイルが提供される
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

// アプリケーション(app)が"/"へのGETリクエストを受け取った時に、クライアントに対して文字列を返すというエンドポイントの設定
// app.get("/", (req, res) => {
//   res.send("hello express");
// });
// app.get("/users", (req, res) => {
//   res.send("users express");
// });

// app.listenでサーバーを立ち上げる
app.listen(PORT, () => console.log("サーバーが起動しました。"));
