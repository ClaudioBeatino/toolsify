import { useState } from 'react'

function countStats(text) {
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.trim() === '' ? 0 : (text.match(/[.!?]+/g) || []).length
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0)
  const readingTime = Math.ceil(words / 200)
  return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime }
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const stats = countStats(text)

  const statCards = [
    { label: 'Parole', value: stats.words },
    { label: 'Caratteri', value: stats.chars },
    { label: 'Senza spazi', value: stats.charsNoSpaces },
    { label: 'Frasi', value: stats.sentences },
    { label: 'Paragrafi', value: stats.paragraphs },
    { label: 'Min. lettura', value: stats.readingTime },
  ]

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Incolla o scrivi il tuo testo qui..."
        className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-y text-gray-800 text-sm"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      {text && (
        <button
          onClick={() => setText('')}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Cancella testo
        </button>
      )}
    </div>
  )
}
