import { Link } from 'react-router-dom'
import { useState } from 'react'
import { tools, categories } from '../tools/registry'
import AdBanner from '../components/AdBanner'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? tools : tools.filter(t => t.category === activeCategory)

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Strumenti Online <span className="text-indigo-600">Gratuiti</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {tools.length} tool pronti all'uso. Nessuna registrazione, nessun download, tutto funziona nel browser.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool, i) => (
          <>
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <div className="inline-block text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full mb-2">
                {tool.category}
              </div>
              <h2 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                {tool.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
              <div className="mt-4 text-indigo-600 text-sm font-medium flex items-center gap-1">
                Usa il tool <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </Link>
            {/* Ad ogni 6 card inserisce un banner */}
            {(i + 1) % 6 === 0 && i < filtered.length - 1 && (
              <div key={`ad-${i}`} className="sm:col-span-2 lg:col-span-3">
                <AdBanner slot="1122334455" className="w-full h-24 rounded-xl overflow-hidden" />
              </div>
            )}
          </>
        ))}
      </div>

      {/* Bottom info */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tutto gratis, sempre</h2>
        <p className="text-gray-500">Tutti gli strumenti sono gratuiti e funzionano direttamente nel tuo browser. I tuoi dati non vengono mai inviati a nessun server.</p>
      </div>
    </div>
  )
}
