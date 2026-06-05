import { useState } from 'react'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = () => {
    setError('')
    if (!input.trim()) { setOutput(''); return }
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch (e) {
      setError('URL non valido per la decodifica')
      setOutput('')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {['encode', 'decode'].map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setOutput(''); setError('') }}
            className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {m === 'encode' ? 'Codifica URL' : 'Decodifica URL'}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'https://esempio.com/pagina?q=ciao mondo' : 'https%3A%2F%2Fesempio.com%2Fpagina%3Fq%3Dciao%20mondo'}
        className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none font-mono text-sm text-gray-800"
      />

      <button
        onClick={process}
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        {mode === 'encode' ? 'Codifica' : 'Decodifica'}
      </button>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      {output && (
        <div className="relative">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Risultato</label>
          <div className="bg-white rounded-xl border border-gray-200 p-5 font-mono text-sm text-gray-800 break-all pr-16">
            {output}
          </div>
          <button
            onClick={copy}
            className={`absolute top-8 right-3 text-xs px-3 py-1 rounded-full font-medium transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}
          >
            {copied ? '✓ Copiato' : 'Copia'}
          </button>
        </div>
      )}
    </div>
  )
}
