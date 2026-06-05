import { useState } from 'react'

const conversions = [
  {
    label: 'MAIUSCOLO',
    fn: t => t.toUpperCase(),
  },
  {
    label: 'minuscolo',
    fn: t => t.toLowerCase(),
  },
  {
    label: 'Title Case',
    fn: t => t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    label: 'Sentence case',
    fn: t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
  },
  {
    label: 'camelCase',
    fn: t => t.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (m, i) => i === 0 ? m.toLowerCase() : m.toUpperCase()).replace(/\s+/g, ''),
  },
  {
    label: 'PascalCase',
    fn: t => t.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, m => m.toUpperCase()).replace(/\s+/g, ''),
  },
  {
    label: 'snake_case',
    fn: t => t.toLowerCase().replace(/\s+/g, '_'),
  },
  {
    label: 'kebab-case',
    fn: t => t.toLowerCase().replace(/\s+/g, '-'),
  },
]

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}
    >
      {copied ? '✓ Copiato' : 'Copia'}
    </button>
  )
}

export default function CaseConverter() {
  const [input, setInput] = useState('')

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Inserisci il testo da convertire..."
        className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none text-gray-800 text-sm"
      />
      <div className="space-y-2">
        {conversions.map(({ label, fn }) => {
          const result = input ? fn(input) : ''
          return (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-indigo-500 mb-1">{label}</div>
                <div className="text-sm text-gray-800 truncate">{result || <span className="text-gray-300">—</span>}</div>
              </div>
              {result && <CopyBtn text={result} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
