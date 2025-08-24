# FitLog（フィットログ）

**FitLog** は、筋トレ記録アプリです。  
React + TypeScript を使用し、視覚的にわかりやすいUIを目指して設計されています。

このアプリでは、日々のトレーニングメニューを記録・管理しながら、  
自分のペースで成長を実感できるよう考えています。

## 🚀 Create React App でのプロジェクト開始方法（日本語版）

このプロジェクトは [Create React App](https://github.com/facebook/create-react-app) を使用して作成しました。

### 利用可能なスクリプト

プロジェクトディレクトリ内で、以下のコマンドを実行できます：

### `npm start`

開発モードでアプリを起動します。  
ブラウザで [http://localhost:3000](http://localhost:3000) を開くと表示されます。

- ファイルを編集するとページが自動でリロードされます  
- コンソールには Lint エラーも表示されます

### `npm test`

対話型のウォッチモードでテストランナーを起動します。  
詳しくは [テストの実行方法](https://facebook.github.io/create-react-app/docs/running-tests) を参照してください。

### `npm run build`

本番環境向けにアプリを `build` フォルダにビルドします。

- React を本番モードで適切にバンドルし、パフォーマンスを最適化します。  
- ファイル名にはハッシュが含まれ、ビルドは圧縮されます  
- アプリはデプロイ準備完了です！

詳しくは [デプロイ方法](https://facebook.github.io/create-react-app/docs/deployment) を参照してください。

### `npm run eject`

**注意：この操作は一方通行です。`eject` を実行すると元に戻せません！**

ビルドツールや設定に満足できない場合は、いつでも `eject` を実行できます。  
このコマンドは、プロジェクトから単一のビルド依存関係を削除し、すべての設定ファイルと依存関係（webpack、Babel、ESLint など）をプロジェクト内にコピーします。

以降、`eject` 以外のコマンドは引き続き動作しますが、コピーされたスクリプトを参照するようになります。  
この時点からは、すべて自己責任で管理することになります。

`eject` を使う必要はありません。Create React App の機能セットは、小規模〜中規模のデプロイに適しており、無理に使う必要はありません。  
ただし、カスタマイズが必要なタイミングが来たときに使えるようになっています。

## 追加資料

- [外部設計はこちら](docs/WorkoutMenuApp_外部設計.md)
- [内部設計はこちら](docs/WorkoutMenuApp_内部設計.md)

## 📚 詳しく学ぶには

- [Create React App の公式ドキュメント](https://facebook.github.io/create-react-app/docs/getting-started)

## 🔒 npm audit の記録（2025年8月24日）

### 概要
- 脆弱性の件数：**9件**（重大6件、中程度3件）
- 影響のあるパッケージは主に開発用（例：`react-scripts`, `webpack-dev-server`）
- すべての脆弱性を修正するには `npm audit fix --force` が必要  
  → ただし、`react-scripts@0.0.0` がインストールされるため、**破壊的変更**となる可能性あり

### 対応方針
- 現時点では `--force` による修正は**行わない**
- 脆弱性は開発環境に限定されており、アプリの動作には影響しないため、**開発を優先して継続**
- 将来的に `react-scripts` から Vite などのモダンなツールへの移行を検討

### 備考
- 脆弱性の詳細は以下のGitHub Advisoryを参照：
  - [GHSA-rp65-9cf3-c2jxr](https://github.com/advisories/GHSA-rp65-9cf3-c2jxr)（nth-check）
  - [GHSA-7fh5-64p2-3v2j](https://github.com/advisories/GHSA-7fh5-64p2-3v2j)（PostCSS）

---
- [React の公式ドキュメント](https://reactjs.org/)

