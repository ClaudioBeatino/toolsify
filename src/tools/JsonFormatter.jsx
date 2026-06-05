import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = (mode) => {
    setError('')
    setOutput('')
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, 2))
      } else if (mode === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else {
        setOutput('✅ JSON valido!')
      }
    } catch (e) {
      setError(`❌ JSON non valido: ${e.message}`)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Input JSON</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='{"nome": "Mario", "eta": 30}'
          className="w-full h-48 p-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-y font-mono text-sm text-gray-800"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => process('format')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Formatta
        </button>
        <button onClick={() => process('minify')} className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Minimizza
        </button>
        <button onClick={() => process('validate')} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-300 transition-colors">
          Valida
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
      )}

      {output && !error && (
        <div className="relative">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Output</label>
          <pre className="bg-gray-900 text-green-400 rounded-xl p-5 text-sm overflow-x-auto max-h-80 font-mono leading-relaxed">
            {output}
          </pre>
          {output !== '✅ JSON valido!' && (
            <button
              onClick={copy}
              className={`absolute top-8 right-3 text-xs px-3 py-1 rounded-full font-medium transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            >
              {copied ? '✓ Copiato' : 'Copia'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
