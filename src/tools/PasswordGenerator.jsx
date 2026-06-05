import { useState, useCallback } from 'react'

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

function generatePassword(length, opts) {
  let charset = ''
  if (opts.lowercase) charset += LOWERCASE
  if (opts.uppercase) charset += UPPERCASE
  if (opts.numbers) charset += NUMBERS
  if (opts.symbols) charset += SYMBOLS
  if (!charset) return ''
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('')
}

function strengthLabel(password) {
  if (!password) return { label: '', color: '' }
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNum = /[0-9]/.test(password)
  const hasSym = /[^a-zA-Z0-9]/.test(password)
  const variety = [hasLower, hasUpper, hasNum, hasSym].filter(Boolean).length
  const score = (password.length >= 16 ? 2 : password.length >= 12 ? 1 : 0) + variety
  if (score <= 2) return { label: 'Debole', color: 'bg-red-500' }
  if (score <= 4) return { label: 'Media', color: 'bg-yellow-500' }
  return { label: 'Forte', color: 'bg-green-500' }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ lowercase: true, uppercase: true, numbers: true, symbols: false })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    setPassword(generatePassword(length, opts))
    setCopied(false)
  }, [length, opts])

  const copy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strength = strengthLabel(password)

  const toggle = (key) => setOpts(o => ({ ...o, [key]: !o[key] }))

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
            Lunghezza: <span className="text-indigo-600">{length} caratteri</span>
          </label>
          <input type="range" min={8} max={64} value={length} onChange={e => setLength(+e.target.value)}
            className="w-full accent-indigo-600" />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Caratteri inclusi</label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'lowercase', label: 'a-z minuscolo' },
              { key: 'uppercase', label: 'A-Z MAIUSCOLO' },
              { key: 'numbers', label: '0-9 Numeri' },
              { key: 'symbols', label: '!@# Simboli' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${opts[key] ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-base"
      >
        🔑 Genera Password
      </button>

      {password && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-lg text-gray-900 break-all flex-1">{password}</div>
            <button
              onClick={copy}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'}`}
            >
              {copied ? '✓ Copiata' : 'Copia'}
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Forza</span>
              <span className="font-medium">{strength.label}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${strength.color} ${strength.label === 'Debole' ? 'w-1/3' : strength.label === 'Media' ? 'w-2/3' : 'w-full'}`} />
            </div>
          </div>
          <button onClick={generate} className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors">
            ↻ Rigenera
          </button>
        </div>
      )}
    </div>
  )
}
