import { useState, useEffect, useCallback } from "react"

const sentences = [
  "こんにちは世界",
  "タイピング練習をしましょう",
  "プログラミングは楽しいです",
  "Next.jsでアプリを作成しています",
  "頑張ってタイピングの練習をしています"
]

export default function TypingGame() {
  const [currentSentence, setCurrentSentence] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const getRandomSentence = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sentences.length)
    return sentences[randomIndex]
  }, [])

  const initializeGame = useCallback(() => {
    setCurrentSentence(getRandomSentence())
    setUserInput("")
    setStartTime(null)
    setEndTime(null)
    setIsCompleted(false)
  }, [getRandomSentence])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(value)

    if (!startTime && value.length === 1) {
      setStartTime(Date.now())
    }

    if (value === currentSentence) {
      setEndTime(Date.now())
      setIsCompleted(true)
    }
  }

  const calculateWPM = () => {
    if (startTime && endTime) {
      const timeInSeconds = (endTime - startTime) / 1000
      const characters = currentSentence.length
      return Math.round((characters / timeInSeconds) * 60)
    }
    return 0
  }

  // 入力済みの文字と未入力の文字を分けて表示する関数
  const renderText = () => {
    return (
      <div className="text-2xl mb-8 font-mono leading-relaxed tracking-wider">
        {currentSentence.split('').map((char, index) => {
          let className = "inline-block mx-0.5 "
          if (index < userInput.length) {
            // 入力済みの文字
            className += userInput[index] === char 
              ? "text-green-600 font-bold"  // 正しい入力
              : "text-red-600 font-bold"    // 誤った入力
          } else if (index === userInput.length) {
            // 現在入力すべき文字
            className += "text-black font-bold bg-yellow-100 px-1 rounded"
          } else {
            // 未入力の文字
            className += "text-gray-400"
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* 問題文の表示エリア */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        {renderText()}
      </div>

      {/* 入力フィールド */}
      <input
        type="text"
        value={userInput}
        onChange={handleInput}
        className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6 font-mono text-xl focus:outline-none focus:border-blue-500 transition-colors"
        placeholder="ここにタイプしてください"
        disabled={isCompleted}
      />

      {/* 完了時の表示 */}
      {isCompleted && (
        <div className="text-center">
          <p className="text-green-600 text-2xl font-bold mb-4">完了！</p>
          <p className="text-xl mb-4">タイピング速度: {calculateWPM()} 文字/分</p>
          <button
            onClick={initializeGame}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors"
          >
            もう一度
          </button>
        </div>
      )}
    </div>
  )
}