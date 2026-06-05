import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QrGenerator() {
  const [text, setText] = useState('https://toolsify.vercel.app')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const svgRef = useRef(null)

  const downloadSvg = () => {
    const svgEl = svgRef.current?.querySelector('svg')
    if (!svgEl) return
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Testo o URL</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Inserisci testo o URL..."
            className="w-full h-24 p-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none text-sm text-gray-800"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Dimensione: {size}px</label>
          <input type="range" min={128} max={512} step={32} value={size} onChange={e => setSize(+e.target.value)}
            className="w-full accent-indigo-600" />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Colore QR</label>
            <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer border border-gray-200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Sfondo</label>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer border border-gray-200" />
          </div>
        </div>
      </div>

      {text && (
        <div className="flex flex-col items-center gap-4">
          <div ref={svgRef} className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm inline-block">
            <QRCodeSVG value={text} size={size} fgColor={fgColor} bgColor={bgColor} level="M" />
          </div>
          <button
            onClick={downloadSvg}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            ⬇️ Scarica SVG
          </button>
        </div>
      )}
    </div>
  )
}
