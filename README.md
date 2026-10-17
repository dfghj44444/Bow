# 十环 (Bow)

个人训练计环 App（包名 `com.onedouble.gongyujian`）。射手在本机记录一组箭的环数分布、总分、箭数、方差、箭道长度、弓种、靶纸和靶纸照片。成绩存在手机 `localStorage`，不上传。

技术栈：Ionic 1.3 + AngularJS + Cordova。本仓库与比赛系统、赛事列表站点独立维护。

## 目录

| 路径 | 说明 |
|------|------|
| `www/` | App 页面与脚本 |
| `archery_game_list/` | 赛事列表静态页（原独立仓库，已并入） |
| `server/` | 通用 PHP PDO 封装，与计环业务无关 |
| `resources/` | iOS / Android 图标与启动图 |

## 赛事列表

`archery_game_list/` 是可单独打开的静态页（Bootstrap + jQuery），展示比赛名称、时间、地点、弓种、报名费和微信详情链接。

后续计划：由 App 加载服务器上的该网页（InAppBrowser / WebView），不必再维护独立仓库。本地预览：用浏览器直接打开 `archery_game_list/index.html`。

## 本地运行（历史 Ionic 1）

```bash
npm install
ionic serve
```

打包 Android（仓库内旧备注）：

```bash
ionic build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore my-release-key.keystore \
  platforms/android/build/outputs/apk/android-release-unsigned.apk \
  shihuanjian
```

## 相关仓库

- 比赛成绩与淘汰赛：`xm_archery_match`
- 成绩看板空壳：`archery-game-board`
