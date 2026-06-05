import { useState } from 'react'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max === min) { h = s = 0 }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-xs font-semibold text-indigo-500 mb-0.5">{label}</div>
        <div className="font-mono text-sm text-gray-800">{value}</div>
      </div>
      <button
        onClick={copy}
        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors shrink-0 ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}
      >
        {copied ? '✓' : 'Copia'}
      </button>
    </div>
  )
}

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1')
  const { r, g, b } = hexToRgb(color)
  const { h, s, l } = rgbToHsl(r, g, b)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex flex-col items-center gap-3">
          <div className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg" style={{ backgroundColor: color }} />
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-48 h-12 rounded-xl cursor-pointer border border-gray-200"
          />
        </div>
        <div className="flex-1 space-y-3 w-full">
          <CopyField label="HEX" value={color.toUpperCase()} />
          <CopyField label="RGB" value={`rgb(${r}, ${g}, ${b})`} />
          <CopyField label="HSL" value={`hsl(${h}, ${s}%, ${l}%)`} />
          <CopyField label="CSS rgba" value={`rgba(${r}, ${g}, ${b}, 1)`} />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Inserisci HEX manualmente</label>
        <input
          type="text"
          value={color}
          onChange={e => {
            const v = e.target.value
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setColor(v)
          }}
          className="px-4 py-2 rounded-xl border border-gray-200 font-mono text-sm focus:border-indigo-400 focus:outline-none w-40"
        />
      </div>
    </div>
  )
}
