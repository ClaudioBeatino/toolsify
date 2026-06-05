import { useState } from 'react'

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function generateSentence() {
  const len = 8 + Math.floor(Math.random() * 10)
  const words = Array.from({ length: len }, randomWord)
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph() {
  const count = 4 + Math.floor(Math.random() * 4)
  return Array.from({ length: count }, generateSentence).join(' ')
}

function generate(type, count) {
  if (type === 'parole') {
    return Array.from({ length: count }, randomWord).join(' ')
  }
  if (type === 'frasi') {
    return Array.from({ length: count }, generateSentence).join(' ')
  }
  return Array.from({ length: count }, generateParagraph).join('\n\n')
}

export default function LoremIpsum() {
  const [type, setType] = useState('paragrafi')
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => setOutput(generate(type, count))

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Tipo</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:outline-none bg-white"
          >
            <option value="parole">Parole</option>
            <option value="frasi">Frasi</option>
            <option value="paragrafi">Paragrafi</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Quantità</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:outline-none"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Genera
        </button>
      </div>

      {output && (
        <div className="relative">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
            {output}
          </div>
          <button
            onClick={copy}
            className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}
          >
            {copied ? '✓ Copiato' : 'Copia'}
          </button>
        </div>
      )}
    </div>
  )
}
