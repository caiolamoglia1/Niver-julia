import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashReveal from './components/SplashReveal'
import HeroSection from './components/HeroSection'
import GaleriaFotos from './components/GaleriaFotos'
import VideoSection from './components/VideoSection'
import VideoFavorito from './components/VideoFavorito'
import InterestCards from './components/InterestCards'
import CentroDaPraca from './components/CentroDaPraca'
import PlaylistSection from './components/PlaylistSection'
import CartaAniversario from './components/CartaAniversario'
import EasterEggs from './components/EasterEggs'
import ContadorDois from './components/ContadorDois'

const SPOTIFY_TRACK = '70L6nHORQsblY813yNqUR3'

function SpotifyPlayer() {
  const [minimized, setMinimized] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 0,
      }}
    >
      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              background: '#09000f',
              border: '1px solid #5a1a8a',
              borderBottom: 'none',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
              boxShadow: '0 0 40px #8b2fc950, 0 -4px 20px #8b2fc920',
            }}
          >
            {/* Header bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px',
              borderBottom: '1px solid #2d0a4e',
            }}>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: '#8b2fc9',
              }}>♫ tocando agora</span>
              <button
                onClick={() => setMinimized(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8b2fc9',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  lineHeight: 1,
                  padding: '0 2px',
                  opacity: 0.7,
                }}
              >✕</button>
            </div>
            <iframe
              src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK}?utm_source=generator&autoplay=1&theme=0`}
              width="320"
              height="100"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: 'block' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab/pill quando minimizado */}
      <motion.button
        onClick={() => setMinimized(m => !m)}
        style={{
          background: '#09000f',
          border: '1px solid #5a1a8a',
          borderRadius: minimized ? '10px' : '0 0 10px 10px',
          color: '#c0a0e0',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          padding: '8px 18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: minimized ? '0 0 24px #8b2fc960' : '0 4px 16px #8b2fc930',
          whiteSpace: 'nowrap',
          width: minimized ? 'auto' : 320,
          justifyContent: minimized ? 'flex-start' : 'center',
        }}
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: '0.85rem' }}
        >♫</motion.span>
        {minimized ? 'Cherry Waves — Deftones' : 'minimizar'}
      </motion.button>
    </motion.div>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [cardEgg, setCardEgg] = useState(null)

  const handleCardEgg = (id) => {
    setCardEgg(id)
    setTimeout(() => setCardEgg(null), 100)
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh' }} className="bg-void">
      {!splashDone && <SplashReveal onFinish={() => setSplashDone(true)} />}
      {splashDone && (
        <main>
          <HeroSection />
          <GaleriaFotos />
          <VideoFavorito />
          <VideoSection />
          <CentroDaPraca />
          <ContadorDois />
          <InterestCards onEasterEgg={handleCardEgg} />
          <PlaylistSection />
          <CartaAniversario />
          <footer
            className="text-center py-8 text-silver-dim text-xs font-cinzel tracking-widest select-none cursor-default"
            id="footer"
          >
            <span className="opacity-30">feito com 🖤 por c.</span>
          </footer>
          <EasterEggs onCardEgg={cardEgg} />
          <SpotifyPlayer />
        </main>
      )}
    </div>
  )
}

