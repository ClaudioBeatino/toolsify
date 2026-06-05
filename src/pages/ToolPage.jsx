import { useParams, Link, Navigate } from 'react-router-dom'
import { tools } from '../tools/registry'
import AdBanner from '../components/AdBanner'

import WordCounter from '../tools/WordCounter'
import CaseConverter from '../tools/CaseConverter'
import LoremIpsum from '../tools/LoremIpsum'
import JsonFormatter from '../tools/JsonFormatter'
import Base64 from '../tools/Base64'
import UrlEncoder from '../tools/UrlEncoder'
import ColorPicker from '../tools/ColorPicker'
import QrGenerator from '../tools/QrGenerator'
import PasswordGenerator from '../tools/PasswordGenerator'
import UuidGenerator from '../tools/UuidGenerator'

const components = {
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'lorem-ipsum': LoremIpsum,
  'json-formatter': JsonFormatter,
  'base64': Base64,
  'url-encoder': UrlEncoder,
  'color-picker': ColorPicker,
  'qr-generator': QrGenerator,
  'password-generator': PasswordGenerator,
  'uuid-generator': UuidGenerator,
}

export default function ToolPage() {
  const { toolId } = useParams()
  const meta = tools.find(t => t.id === toolId)
  const Component = components[toolId]

  if (!meta || !Component) return <Navigate to="/" replace />

  const currentIndex = tools.findIndex(t => t.id === toolId)
  const prev = tools[currentIndex - 1]
  const next = tools[currentIndex + 1]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{meta.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{meta.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{meta.name}</h1>
        </div>
        <p className="text-gray-500 text-base">{meta.description}</p>
      </div>

      {/* Tool */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-8">
        <Component />
      </div>

      {/* Ad banner */}
      <AdBanner slot="5544332211" className="w-full h-28 rounded-xl overflow-hidden mb-8" />

      {/* Navigation between tools */}
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link to={`/tools/${prev.id}`}
            className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 text-sm text-gray-600 hover:text-indigo-600 transition-all">
            <span>←</span>
            <span className="hidden sm:inline">{prev.name}</span>
          </Link>
        ) : <div />}

        <Link to="/"
          className="px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 text-sm text-gray-600 hover:text-indigo-600 transition-all">
          Tutti i tool
        </Link>

        {next ? (
          <Link to={`/tools/${next.id}`}
            className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 text-sm text-gray-600 hover:text-indigo-600 transition-all">
            <span className="hidden sm:inline">{next.name}</span>
            <span>→</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
