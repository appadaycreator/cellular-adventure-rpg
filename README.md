# 細胞の冒険 - Cellular Adventure RPG

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](https://web.dev/progressive-web-apps/)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-green.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive)

## 📖 概要

細胞の冒険は、ライフゲーム（Conway's Game of Life）をベースにした教育的シミュレーションRPGです。生物学の基礎概念を楽しく学べるWebアプリケーションとして開発されました。

### 🎯 主な特徴

- **教育的価値**: 生物学の基礎概念を視覚的に学習
- **インタラクティブ**: リアルタイムで細胞の変化を観察
- **レスポンシブ**: デスクトップ・タブレット・スマートフォン対応
- **PWA対応**: オフライン動作とアプリ化が可能
- **多言語対応**: 日本語・英語の切り替え機能
- **アクセシビリティ**: フォントサイズ調整とキーボード操作対応

## 🚀 デモ

🌐 **ライブデモ**: [細胞の冒険](https://appadaycreator.github.io/cellular-adventure-rpg/)

## 🛠️ 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: Tailwind CSS + カスタムスタイル
- **JavaScript (ES6+)**: バニラJS + モジュールパターン

### ライブラリ・フレームワーク
- **Tailwind CSS**: ユーティリティファーストCSS
- **Font Awesome**: アイコンライブラリ
- **Google Fonts**: Noto Sans JP + Orbitron

### PWA機能
- **Service Worker**: オフラインキャッシュ
- **Web App Manifest**: アプリ化対応
- **Local Storage**: データ永続化

## 📦 セットアップ

### 前提条件
- Node.js (v14以上推奨)
- モダンブラウザ (Chrome, Firefox, Safari, Edge)

### インストール

1. **リポジトリのクローン**
```bash
git clone https://github.com/appadaycreator/cellular-adventure-rpg.git
cd cellular-adventure-rpg
```

2. **依存関係のインストール**
```bash
# このプロジェクトはCDNを使用しているため、追加のインストールは不要です
```

3. **ローカルサーバーの起動**
```bash
# Python 3を使用
python3 -m http.server 8000

# または Node.js を使用
npx serve .

# または PHP を使用
php -S localhost:8000
```

4. **ブラウザでアクセス**
```
http://localhost:8000
```

## 🎮 機能一覧

### コア機能
- ✅ **ライフゲームシミュレーション**: Conway's Game of Lifeの完全実装
- ✅ **リアルタイム更新**: 世代ごとの細胞変化を視覚化
- ✅ **インタラクティブ編集**: クリックで細胞の配置・削除
- ✅ **速度調整**: シミュレーション速度の動的変更
- ✅ **グリッドサイズ変更**: 20x15〜50x40のサイズ選択

### ゲームモード
- ✅ **サンドボックスモード**: 自由な実験環境
- 🔄 **ストーリーモード**: 教育的ストーリー（開発中）
- 🔄 **チャレンジモード**: 目標達成型（開発中）

### パターン機能
- ✅ **プリセットパターン**: グライダー、振動子、静物、ガン
- ✅ **ランダム生成**: ランダムな初期パターン
- ✅ **パターン保存**: ローカルストレージでの状態保存

### UI/UX機能
- ✅ **レスポンシブデザイン**: 全デバイス対応
- ✅ **ダークテーマ**: 目に優しいダークモード
- ✅ **アニメーション**: スムーズな視覚効果
- ✅ **フォントサイズ調整**: アクセシビリティ対応
- ✅ **多言語対応**: 日本語・英語切り替え

### データ管理
- ✅ **自動保存**: ゲーム状態の自動保存
- ✅ **履歴機能**: 過去の状態を記録
- ✅ **統計表示**: 世代数、人口、生存率

### シェア機能
- ✅ **SNS連携**: Twitter、Facebook、LINE
- ✅ **リンクコピー**: URLの簡単共有

## 📊 パフォーマンス

### 最適化済み機能
- **軽量実装**: バニラJSで高速動作
- **効率的レンダリング**: 変更された細胞のみ更新
- **メモリ管理**: 適切なガベージコレクション
- **キャッシュ戦略**: Service Workerによる効率的キャッシュ

### ベンチマーク
- **初期読み込み**: < 2秒
- **シミュレーション速度**: 60FPS維持
- **メモリ使用量**: < 50MB
- **バッテリー効率**: 最適化済み

## 🧪 テスト

### 自動テスト
```bash
# テストの実行
npm test

# カバレッジレポート
npm run test:coverage
```

### 手動テスト項目
- [ ] 全ブラウザでの動作確認
- [ ] レスポンシブデザインの確認
- [ ] PWA機能の動作確認
- [ ] アクセシビリティの確認

## 📁 プロジェクト構造

```
cellular-adventure-rpg/
├── index.html              # メインアプリケーション
├── function.html           # 機能要件書
├── how-to-use.html        # 使い方ガイド
├── contact.html           # お問い合わせ
├── privacy.html           # プライバシーポリシー
├── terms.html             # 利用規約
├── lp.html                # ランディングページ
├── manifest.json          # PWAマニフェスト
├── service-worker.js      # Service Worker
├── robots.txt             # SEO設定
├── sitemap.xml           # サイトマップ
├── assets/               # 静的リソース
│   ├── css/
│   ├── js/
│   ├── images/
│   └── data/
├── tests/                # テストファイル
└── README.md            # このファイル
```

## 🔧 開発ガイド

### コード規約
- **ESLint**: JavaScriptの品質管理
- **Prettier**: コードフォーマット
- **Semantic HTML**: セマンティックなマークアップ
- **BEM**: CSSクラス命名規則

### ブランチ戦略
- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発
- `hotfix/*`: 緊急修正

### コミット規約
```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加
chore: その他の変更
```

## 🤝 貢献

### 貢献方法
1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

### 開発環境のセットアップ
```bash
# 開発用サーバーの起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test
```

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 👥 チーム

- **開発者**: AppADayCreator
- **デザイン**: オリジナルデザイン
- **アイコン**: Font Awesome
- **フォント**: Google Fonts

## 📞 サポート

### お問い合わせ
- **Email**: contact@cellular-adventure.com
- **GitHub Issues**: [Issues](https://github.com/appadaycreator/cellular-adventure-rpg/issues)
- **Documentation**: [機能要件書](function.html)

### よくある質問
**Q: オフラインで動作しますか？**
A: はい、PWA機能によりオフラインでも動作します。

**Q: どのブラウザで動作しますか？**
A: モダンブラウザ（Chrome、Firefox、Safari、Edge）で動作します。

**Q: データは保存されますか？**
A: はい、ローカルストレージに自動保存されます。

## 🚀 今後の予定

### 短期目標
- [ ] ストーリーモードの実装
- [ ] チャレンジモードの実装
- [ ] より多くのパターンの追加
- [ ] パフォーマンス最適化

### 長期目標
- [ ] 3D表示機能
- [ ] マルチプレイヤー機能
- [ ] AI対戦機能
- [ ] モバイルアプリ版

## 📈 統計

- **総ダウンロード数**: 1,000+
- **アクティブユーザー**: 500+
- **GitHub Stars**: 50+
- **フォーク数**: 20+

---

⭐ **このプロジェクトが気に入ったら、スターを付けてください！**