import { useEffect } from 'react'

/**
 * AdSense banner component.
 *
 * SETUP:
 * 1. Aprire account su https://adsense.google.com
 * 2. Aggiungere il sito e aspettare l'approvazione (1-2 settimane)
 * 3. Sostituire "ca-pub-XXXXXXXXXXXXXXXXXX" con il tuo Publisher ID
 * 4. Sostituire "YYYYYYYYYY" con lo Slot ID dell'annuncio (lo trovi in AdSense > Annunci)
 * 5. Decommentare lo script in index.html
 * 6. Impostare VITE_ADSENSE_ENABLED=true nelle variabili ambiente
 */

const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXXXX'
const ENABLED = import.meta.env.VITE_ADSENSE_ENABLED === 'true'

export default function AdBanner({ slot, format = 'auto', className = '' }) {
  useEffect(() => {
    if (!ENABLED) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      // AdSense non ancora caricato
    }
  }, [])

  if (!ENABLED) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm ${className}`}>
        <div className="text-center py-4 px-6">
          <div className="text-2xl mb-1">💰</div>
          <div className="font-medium">Spazio Pubblicitario</div>
          <div className="text-xs mt-1">Attiva AdSense per monetizzare</div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
