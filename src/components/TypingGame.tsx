// src/components/TypingGame.tsx
import { useState, useEffect, useCallback } from "react"

// 練習用の文章リスト
const sentences = [
  "こんにちは世界",
  "タイピング練習をしましょう",
  "プログラミングは楽しいです",
  "Next.jsでアプリを作成しています",
  "頑張ってタイピングの練習をしています"
]

export default function TypingGame() {
  // 状態管理用のstate
  const [currentSentence, setCurrentSentence] = useState("")  // 現在の問題文
  const [userInput, setUserInput] = useState("")             // ユーザーの入力
  const [startTime, setStartTime] = useState<number | null>(null)  // 開始時間
  const [endTime, setEndTime] = useState<number | null>(null)      // 終了時間
  const [isCompleted, setIsCompleted] = useState(false)     // 完了状態

  // ランダムな文章を選択する関数
  const getRandomSentence = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sentences.length)
    return sentences[randomIndex]
  }, [])

  // ゲームを初期化する関数
  const initializeGame = useCallback(() => {
    setCurrentSentence(getRandomSentence())
    setUserInput("")
    setStartTime(null)
    setEndTime(null)
    setIsCompleted(false)
  }, [getRandomSentence])

  // 初回レンダリング時に初期化
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  // ユーザーの入力を処理する関数
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(value)

    // 最初の入力時に開始時間を記録
    if (!startTime && value.length === 1) {
      setStartTime(Date.now())
    }

    // 入力が完了したかチェック
    if (value === currentSentence) {
      setEndTime(Date.now())
      setIsCompleted(true)
    }
  }

  // タイピング速度を計算する関数（文字/分）
  const calculateWPM = () => {
    if (startTime && endTime) {
      const timeInSeconds = (endTime - startTime) / 1000
      const characters = currentSentence.length
      return Math.round((characters / timeInSeconds) * 60)
    }
    return 0
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* 問題文の表示 */}
      <p className="text-xl mb-4 font-mono">{currentSentence}</p>
      
      {/* 入力フィールド */}
      <input
        type="text"
        value={userInput}
        onChange={handleInput}
        className="w-full p-2 border rounded mb-4 font-mono"
        placeholder="ここにタイプしてください"
        disabled={isCompleted}
      />

      {/* 完了時の表示 */}
      {isCompleted && (
        <div className="text-center">
          <p className="text-green-600 mb-2">完了！</p>
          <p className="mb-2">タイピング速度: {calculateWPM()} 文字/分</p>
          <button
            onClick={initializeGame}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}