<template>
<div>
    <h1>About</h1>
    <p>MDWiki(仮称)はMarkdown形式のWikiです。同時編集でき、スケーラブルな設計を目指して作成しています</p>
    <p>プログラムはGitlabに上がっています</p>
    <ul>
      <li>Markdown編集ができる</li>
      <li>同時編集ができる</li>
      <li>編集時に画像のアップロードをDrag＆Dropでできる</li>
      <li>ページの削除、移動、etcが楽</li>
      <li>UIをすべてこちらで管理できる</li>
      <li>Slackとの連携（実装中）</li>
      <li>カードリンク機能（Markdownでリンクを書くときにalt属性を付けなかった場合、自動でタイル型に変換される）</li>
      <li>検索機能強化（カテゴリー内検索、ディレクトリ内検索、日時を指定して検索等）</li>
      <li><a href="/special/performance">パフォーマンスモニタリング</a></li>
      <li>カレンダー機能追加（タイトルに「作業日誌」と書くと目次がカレンダー型で表示される<br>例えば<a href="/view/RC2022/Workshop2022/屋横断/投擲/作業日誌">RC2022/Workshop2022/屋横断/投擲/作業日誌</a></li>
    </ul>
    <h1>ページ</h1>
    <ul>
      <li><a href="/view/">/view/〇〇</a> : 特定のページを見る</li>
      <li><a href="/view/test?acrion=true">/view/〇〇?action=true</a> : 特定のページを見たり編集したりする</li>
      <li><a href="/search">/search</a> : 検索ページ。</li>
      <li><a href="/special">/special</a> : このページ</li>
      <li><a href="/special/dev">/special/dev</a> : 仕様書</li>
      <li><a href="/special/dev/api">/special/dev</a> : API仕様書</li>
      <li><a href="/special/performance">/special/performance</a> : サーバーのパフォーマンスをリアルタイムでグラフ化します</li>
      <li><a href="/special/config">/special/config</a> : サーバー関連設定画面（Adminのみ閲覧/編集可能）</li>
      <li><a href="/special/config/user">/special/config/user</a> : 全ユーザーの設定画面（Adminのみ閲覧/編集可能）</li>
      <li><a href="/special/config/usergroup">/special/config/usergroup</a> : ユーザーグループの設定画面（Adminのみ閲覧/編集可能）</li>
      <li><a href="/special/config/page">/special/config/page</a> : 全ページの設定画面（Adminのみ閲覧/編集可能）</li>
      <li><a href="/api">/api</a> : 各種API(POST通信のみ可)</li>
      <li><a href="/mypage">/mypage</a> : マイページへのリンク</li>
      <li><a href="/user/login">/user/login</a> : ログイン</li>
      <li><a href="/user/login">/user/login</a> : 新規ユーザー登録</li>
      <li><a href="/user/logout">/user/logout</a> : ログアウト</li>
    </ul>

  <h1>一般config情報</h1>
  <p>ココの内容を編集するには、<code>/app/config.js</code>を編集して下さい。</p>

  <p>全般設定</p>
  <table>
    <tbody>
      <tr><td>タイトル</td><td>{{ config.general.title }}</td></tr>
      <tr><td>説明</td><td>{{ config.general.description}}</td></tr>
      <tr><td>URL</td><td>{{ config.general.url }}</td></tr>
      <tr><td>Port</td><td>{{ config.general.port }}</td></tr>
      <tr><td>expireTime</td><td>{{ config.general.expireTime }}</td></tr>
      <tr><td>defaultSearchReslut</td><td>{{ config.general.defaultSearchReslut }}</td></tr>
    </tbody>
  </table>

  <p>データベース</p>
  <table>
    <tbody>
      <tr><td>host</td><td>{{ config.database.host }}</td></tr>
      <tr><td>port</td><td>{{ config.database.port}}</td></tr>
      <tr><td>dbname</td><td>{{ config.database.dbname }}</td></tr>
      <tr><td>user</td><td>{{ config.database.user }}</td></tr>
      <tr><td>password</td><td>●●●●●●●●●●●</td></tr>
      <tr><td>engine</td><td>{{ config.database.engine }}</td></tr>
    </tbody>
  </table>

  <p>ユーザー設定</p>
  <table>
    <tbody>
      <tr><td>ログインせずに閲覧許可</td><td>{{ config.user.AllowViewWithoutLogin }}</td></tr>
      <tr><td>ログインなしで編集</td><td>{{ config.user.AllowEditWithoutLogin}}</td></tr>
      <tr><td>ログインなしで削除</td><td>{{ config.user.AllowDeleteWithoutLogin }}</td></tr>
      <tr><td>2段階認証を使用</td><td>{{ config.user.UseTwoStepVerification }}</td></tr>
      <tr><td>最大ユーザー数</td><td>config.user.MaxUserNumber</td></tr>
    </tbody>
  </table>

  <p>ページ設定</p>
  <table>
    <tbody>
      <tr><td>メインページ</td><td>{{ config.pages.mainPage }}</td></tr>
    </tbody>
  </table>

  <p>ディレクトリ設定</p>
  <table>
    <tbody>
      <tr><td>画像ファイル保存場所</td><td>{{ config.dirs.mediaFileDir }}</td></tr>
      <tr><td>ロゴ画像</td><td>{{ config.dirs.logoImg }}</td></tr>
      <tr><td>アップロードできる拡張子</td><td>{{ config.dirs.acceptUploadFileExtention }}</td></tr>
    </tbody>
  </table>
</div>
</template>

<script setup lang="ts">

import config_ from "../../backend/config";
const config = config_;

</script>
