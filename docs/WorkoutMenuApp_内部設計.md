# 🧠 筋トレ記録アプリ：React内部設計（Spring Boot連携前提）

## 1. 📦 データ構造（TypeScript型）

将来的にSpring Bootと連携を考慮した**型定義**

```ts
// src/types/Workout.ts
export type WorkoutSet = {
  weight: number
  reps: number
}

export type WorkoutLog = {
  id: string
  date: string // ISO形式 "2025-08-20"
  muscleGroup: string // 例: "Chest"
  exercise: string // 例: "Bench Press"
  sets: WorkoutSet[]
  memo?: string
}
```
---

## 2. 🧩 コンポーネント設計

画面ごとの役割に応じて、**機能単位で分割**

| コンポーネント名       | 役割                                 |
|------------------------|--------------------------------------|
| `WorkoutForm`          | 筋トレ記録の入力フォーム             |
| `WorkoutList`          | 記録一覧の表示                       |
| `WorkoutItem`          | 1件の記録カード                      |
| `GraphPanel`           | 負荷量などのグラフ表示（拡張用）     |
| `CalendarView`         | トレーニング日をカレンダー表示       |
| `MotivationPanel`      | 音楽・写真記録の表示（拡張用）       |
| `WeightLogPanel`       | 体重記録とグラフ表示（拡張用）       |
| `Header` / `Footer`    | タイトルやナビゲーション             |

✅ MVP `WorkoutForm` + `WorkoutList` から

---

## 3. 🧠 状態管理（useState → Context or Zustand）

最初は `useState` で十分ですが、将来的に**グローバル管理**が必要になる場合は Context API や Zustand に移行しやすい構成にしておく

```ts
const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
```

✅ Spring Boot導入後は、APIから取得して `useEffect` で同期

---

## 4. 🔗 API設計（将来のSpring Boot連携）

バックエンド導入時に備えて、**API呼び出しの構造を分離**

```ts
// src/api/workout.ts
import axios from "axios"

export const fetchWorkouts = async () => {
  const res = await axios.get("/api/workouts")
  return res.data
}

export const postWorkout = async (log: WorkoutLog) => {
  await axios.post("/api/workouts", log)
}
```

✅ MVP `localStorage` に保存し、後でAPIに切り替え可能

---

## 5. 🗂️ ディレクトリ構成（拡張しやすく）

```plaintext
src/
├── components/
│   ├── WorkoutForm.tsx
│   ├── WorkoutList.tsx
│   └── ...
├── types/
│   └── Workout.ts
├── api/
│   └── workout.ts
├── utils/
│   └── dateFormatter.ts
├── pages/
│   ├── Home.tsx
│   ├── Graphs.tsx
│   └── Calendar.tsx
├── App.tsx
└── index.tsx
```

✅ Spring Boot連携時も、API層だけ差し替える

---

## 6. 💾 データ保存（MVPではlocalStorage）

```ts
useEffect(() => {
  localStorage.setItem("workoutLogs", JSON.stringify(workoutLogs))
}, [workoutLogs])
```

✅ 後でDB連携に切り替える際は、API呼び出しに置き換える

---

## 7. ✅ 設計方針まとめ

| 項目 | 内容 | 
|------------------------|--------------------------------------|
| 拡張性         | Spring Boot連携を前提にAPI層と型定義を分離 | 
| 保守性         | コンポーネント分割とディレクトリ構成で見通し◎ | 
| MVP対応        | 初期はlocalStorageで完結、後からAPIに切り替え可能 | 
| TypeScript活用 | 型安全でSpring Bootとの連携もスムーズ | 

🎨 デザイン指針
- カラーパレット：ネイビー × ライムグリーン
- UI：余白を活かしたシンプルでモダンなレイアウト
- モチベーションを高める視覚的演出（グラフ・写真・音楽）

🚀 今後の展望
- Spring BootによるDB連携とユーザー認証
- グラフ・カレンダー・モチベーション機能の追加
- モバイル対応とレスポンシブデザイン






