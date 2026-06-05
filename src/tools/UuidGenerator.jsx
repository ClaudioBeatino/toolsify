import { useState } from 'react'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors shrink-0 ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}>
      {copied ? '✓' : 'Copia'}
    </button>
  )
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState([])
  const [allCopied, setAllCopied] = useState(false)

  const generate = () => setUuids(Array.from({ length: count }, generateUUID))

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Quantità</label>
          <input
            type="number" min={1} max={50} value={count}
            onChange={e => setCount(Math.max(1, Math.min(50, +e.target.value || 1)))}
            className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:outline-none"
          />
        </div>
        <button onClick={generate}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Genera UUID v4
        </button>
        {uuids.length > 0 && (
          <button onClick={copyAll}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${allCopied ? 'bg-green-100 text-green-600 border-green-200' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'}`}>
            {allCopied ? '✓ Copiati tutti' : 'Copia tutti'}
          </button>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
              <code className="font-mono text-sm text-gray-800 flex-1">{uuid}</code>
              <CopyBtn text={uuid} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
