# Markdown Blog service

## features

- ユーザー管理・ログイン機能
  - `node manage.js` でユーザーを作成し、それに基づいてログインする
  - ログイン機能なしにもできる
  - ユーザーグループを作成することで、グループごとに権限を設定できる
- URLについて
  - 以下の三通りから選ぶことができる
  - 記事タイトル（日本語などの場合はエンコードして）
  - ID（Databaseの_id field)。インクリメンタル
  - 日付（タイムスタンプ）
- ログ
  - アクセスログをとって集計、人気記事等の解析ができる
- 同時編集
  - 設定でON/OFF可能
- 

## Routing

- `/` : トップページ
- `/search?query` : 検索
- `/entry/:title等` : 記事表示
- `/search` : 検索
- `/user` : ユーザー管理
  - /user/login,  /user/logout,  /user/register
  - adminの場合、ユーザーの作成、削除等ができる
  - `/user/:userid` : ユーザーのプロフィール詳細

- `/usergroup` : ユーザーグループの表示、設定
- `/admin` : アドミンのみが入れるページ
  - `/config` : 各種設定
    - design：フォント、フォントサイズ、カラーテーマ等
    - detail：詳細設定
    - permission：公開設定

  - `/comment` : コメント
  - `/export` : ブログの記事をJSON/CSSなどでエクスポートする
  - `/accesslog` : アクセスログの表示


## 設定できる内容

- Design
  - フォント、フォントサイズ
  - カラーテーマ
  - ヘッダ表示ON/OFF
  - フッタ表示ON/OFF
- Detail
  - ブログ名
  - ブログ説明
  - アイコン画像
  - 言語
  - コメント
    - ON（ログインした人のみ）
    - ON（全員）
    - OFF
    - 表示：許可されたものだけを表示 or すべて表示
    - 表示順序：古い順/新しい順
    - 通知：コメントが来たらSlackで通知
    - コメント拒否ユーザー？
  - アクセスログON/OFF
  - 解析ツール
    - Google analytics埋め込み
    - フィード用のパラメータ（フィードで配信するリンクにパラメーターを付加する）
    - Google Search Console（旧 Google ウェブマスター ツール）
    - Bing ウェブマスターツール
    - Google タグマネージャ
  - 編集
    - head内タグ
    - ブログのキーワード（meta keywords）
    - 検索エンジンに登録させない（noindex, nofollow）
    - head要素にメタデータを追加（HTML
  - 外部API
    - Slack APIを用いた記事投稿
    - メール投稿
  - 表示
    - トップページの形式
      - 全文形式 or 一覧形式
    - デフォルトの検索結果の記事数：20？
    - 関連記事を記事したに表示する : 何件？
    - いいね（LGTM）表示 ON/OFF
    - サイドバーHTML
    - シェアボタンの表示
      - Twitter、Instagram、Facebook、LINE、Quora？、URLなど個別に設定
  - 記事編集
    - Markdown
    - 許可されたメディア拡張子
    - メディアの最大ファイルサイズ
    - 「filebroken」タグを追加する　ON/OFF
    - ファイルアップロード
      - アップロード先：S3、ファイルシステム、Database
- Permission：公開設定
  - 公開、自分のみ
    - 自分のみ公開のときに表示するHTML
  - トップページのログイン有無：公開設定が「自分のみ」の場合は自動的にログイン必須に
  - URLの設定（記事タイトル？ID？）
- 



## アクセス解析

- 今日、今週、今月、合計のPV数を表示
- グラフで日、時間、月のPV数表示
- アクセス傾向（アクセスもとのサイト（Gooele、Yahooなど）を表示
- アクセス先ページ表示



## やりたいこと

- MediaWikiっぽいことができるが、Markdownで記事を書くことができるWiki
- ブログにもなる

## MediaWikiからの改善点
- 記事の作成・編集
    - Markdownで編集できる（一部記法追加、下の方参照）
    - 共同で同時編集できる
    - 画像、ファイルをドラッグ＆ドロップで追加できる
    - Ctrl + Sで保存など、キーボードショートカットの充実
    - Vimキーバインド追加？（優先度低）
- adminやuserの設定画面の作成
- API作成
- 検索システムの強化
    - 類似検索
    - カテゴリー内検索
    - フォルダ内検索
    - 画像検索
    - 更新日時/作成日時を指定して検索
    - 検索結果を　新しい順、古い順、閲覧数が多い順、文字数順etc,,,で分ける
- 記事にカテゴリーをつける
    - C++とかROSとか。今は
- 細かいこと：
    - スマホでのレスポンシブデザイン化
    - ダークモード作成
    - 自分のフォルダ内はページ削除を行えるようにする
    - 記事一覧のページを画像を付けて見やすくする？
    - プログラムのシンタックスハイライトを見やすく
    - ダークモード設置、ユーザごとにボタン一つで切り替えられるようにする
    - 数式がバグる
    - 画像タグ
        - `![]()`の画像タグで動画も対応させる
        - ![](url|w=200,h=300)のように書いて、スタイルを設定できる

## Markdownに追加される予定のMDWiki専用記法
- `[:contents]` : 見出しを表示する
- `[:latest(n)]` , `[:latest_text(n)]`: 最新のn記事を表示する（タイトルのみ）
- `[:latest_with_description(n)]` : 最新のn記事を表示する（タイトルと最初の200文字程度）
- `[:latest_with_img(n)]` : 最新のn記事を表示する（タイトルと最初の200文字程度とサムネ画像）


## TODO
- [x] 記事がない場合にエラーを表示
- [ ] 編集
    - [ ] 同時編集
    - [ ] 動画挿入
    - [ ] 画像のキャプション表示
    - [ ] PDF挿入
- [ ] 閲覧権限、編集権限
- [ ] ログイン
- [ ] ユーザーグループ
- [ ] 記事削除
- [ ] デザイン
    - [ ] TOPページ改変(メニューバーを作る)
    - [ ] レスポンシブデザイン
    - [ ] 【PC】サイドバー幅を調節できるようにする
    - [ ] TOC自動挿入
    - [ ] colorschmeをユーザーが変更できるようにする
    - [ ] preタグがうまく動かない
- [ ] Database
    - [ ] History
    - [ ] User
- [ ] API
    - [ ] 履歴表示API
    - [ ] そもそものAPI構造を整理する
    - [ ] ユーザー関連のAPI
    - [ ] 画像関連のAPI
    - [ ] データエクスポートAPI
    - [ ] Slackとの連携
- [ ] 検索
    - [ ] 画像検索
    - [ ] Elastic Search
    - [ ] タイトルを優先的に検索する
    - [ ] 検索単語予測
    - [ ] タイトルにその単語がある時に自動リダイレクト
    - [ ] 「〇〇の節」の表示
    - [ ] 高度な検索

## API

//TODO:



## database

### page

| field       | type        | 意味                                        |
| ----------- | ----------- | ------------------------------------------- |
| title       | text        | タイトル                                    |
| content     | text        | 内容                                        |
| category    | string list | カテゴリー                                  |
| create_time | datetime    | 作成日時                                    |
| update_time | datetime    | 最終更新日                                  |
| author_id   | int         | 作成者                                      |
| edit_count  | int         | 編集回数                                    |
| lgtm_count  | int         | LGTMの個数                                  |
| view_count  | int         | 見られた回数                                |
| visible     | bool        | 見える？（削除されている場合はFalseになる） |
| thumb_url   | text        | サムネイル画像のURL                         |


### user

| field         | type     | 意味                                        |
| ------------- | -------- | ------------------------------------------- |
| name          | text     | ユーザー名                                  |
| password      | ?        | password                                    |
| email         | text     | e-,mail                                     |
| register_time | datetime | 作成日時                                    |
| edit_count    | int      | 編集回数                                    |
| is_admin      | bool     | admin ?                                     |

### usergroup

| field             | type         | 意味               |
| ----------------- | ------------ | ------------------ |
| name              | text         | ユーザーグループ名 |
| users             | list of _ids | ユーザー一覧       |
| admin_permission  | bool         | admin access       |
| view_permission   | bool         | view permission    |
| edit_permission   | bool         | edit permission    |
| delete_permission | bool         | delete permission  |

### storage

| field            | type         | 意味           |
| ---------------- | ------------ | -------------- |
| name             | text         | ファイルタイプ |
| tag              | list of text | タグ           |
| author_id        | ?            | password       |
| create_time      | datetime     | created time   |
| edit_time	 | datetime     | 最終編集日時   |
| file_information | datetime     | 作成日時       |
| file_size        | int          | ファイルサイズ in kB |
| file_type        | int       | ファイルタイプ     |
| broken           | bool         | 壊れてる？   |

### accesslog

| field    | type     | 意味                       |
| -------- | -------- | -------------------------- |
| time     | datetime | time                       |
| ip       | text     | ip address                 |
| username | text     | username                   |
| url      | text     | アクセス先のURL            |
| from     | text     | 作成日時                   |
| device   | text     | 端末の種類（スマホ？PC？） |
| browser  | text     | ブラウザーの種類           |
| ?  | int	     | 滞在時間           |
| next | text     | 次に向かったURL   |
|  |  |  |

## manage.js

https://docs.djangoproject.com/en/4.0/ref/django-admin/

- help
  - ヘルプ表示
- create_user
  - ユーザーを作成する。作成時にAdminかどうかを選択できる
- delete_user
  - ユーザーを削除する
- flush
  -　データベースの中身を空にする
- create_db
  - データベースのIndexを作成
- dumpdata
  - 特定のディレクトリにDBのデータを出力する
- loaddata
  - dumpdataで作成したバックアップファイルを読み込む
- 
