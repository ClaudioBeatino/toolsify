export const tools = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences and estimate reading time',
    icon: '📝',
    category: 'Text',
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, camelCase and more',
    icon: '🔡',
    category: 'Text',
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text by words, sentences or paragraphs',
    icon: '📄',
    category: 'Text',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify and validate JSON data',
    icon: '🗂️',
    category: 'Developer',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode and decode text to and from Base64',
    icon: '🔐',
    category: 'Developer',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode and decode URLs and query strings',
    icon: '🔗',
    category: 'Developer',
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB and HSL formats',
    icon: '🎨',
    category: 'Design',
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from any text or URL, download as PNG',
    icon: '📱',
    category: 'Utility',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, random passwords with custom options',
    icon: '🔑',
    category: 'Utility',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUID v4 identifiers',
    icon: '🆔',
    category: 'Developer',
  },
]

export const categories = [...new Set(tools.map(t => t.category))]
