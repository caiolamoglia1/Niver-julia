import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function EasterEggs({ onCardEgg }) {
  const [spiderVisible, setSpiderVisible] = useState(false)
  const [mjVisible, setMjVisible] = useState(false)
  const [konamiModal, setKonamiModal] = useState(false)
  const [twilightModal, setTwilightModal] = useState(false)
  const [serenaModal, setSerenaModal] = useState(false)
  const [spiderModal, setSpiderModal] = useState(false)
  const konamiProgress = useRef([])
  const footerClicks = useRef(0)
  const twilightClicks = useRef([])
  const serenaClicks = useRef([])
  const spiderClicks = useRef([])

  // Abre modais via prop (chamado pelo InterestCards no dblclick)
  useEffect(() => {
    if (!onCardEgg) return
    if (onCardEgg === 'twilight') setTwilightModal(true)
    if (onCardEgg === 'gossipgirl') setSerenaModal(true)
    if (onCardEgg === 'spiderman') setSpiderModal(true)
  }, [onCardEgg])

  // Spider-Man crosses screen every 60s
  useEffect(() => {
    const run = () => {
      setSpiderVisible(true)
      setTimeout(() => setSpiderVisible(false), 6000)
    }
    // First run after 15s
    const first = setTimeout(run, 15000)
    const interval = setInterval(run, 60000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [])

  // MJ moonwalk every 90s (offset)
  useEffect(() => {
    const run = () => {
      setMjVisible(true)
      setTimeout(() => setMjVisible(false), 7000)
    }
    const first = setTimeout(run, 45000)
    const interval = setInterval(run, 90000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [])

  // Konami code
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key
      const expected = KONAMI[konamiProgress.current.length]
      if (key === expected) {
        konamiProgress.current.push(key)
        if (konamiProgress.current.length === KONAMI.length) {
          konamiProgress.current = []
          setKonamiModal(true)
        }
      } else {
        konamiProgress.current = key === KONAMI[0] ? [key] : []
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Easter eggs via listener global removido (agora via onDoubleClick no card)

  useEffect(() => {
    // Footer clicks
    const footer = document.getElementById('footer')
    if (!footer) return
    const handler = () => {
      footerClicks.current += 1
      if (footerClicks.current >= 5) {
        footerClicks.current = 0
        alert('😤 para de clicar no footer. sério.')
      }
    }
    footer.addEventListener('click', handler)
    return () => footer.removeEventListener('click', handler)
  }, [])

  return (
    <>
      {/* Spider-Man */}
      <AnimatePresence>
        {spiderVisible && (
          <motion.div
            key="spider"
            initial={{ left: -80 }}
            animate={{ left: 'calc(100vw + 80px)' }}
            transition={{ duration: 5, ease: 'linear' }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '15vh',
              zIndex: 9999,
              fontSize: '3.5rem',
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'drop-shadow(0 0 8px #c41e3a)',
            }}
          >
            🕷️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Michael Jackson moonwalk */}
      <AnimatePresence>
        {mjVisible && (
          <motion.div
            key="mj"
            initial={{ right: -150 }}
            animate={{ right: 'calc(100vw + 150px)' }}
            transition={{ duration: 6, ease: 'linear' }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '10vh',
              zIndex: 9999,
              pointerEvents: 'none',
              userSelect: 'none',
              transform: 'scaleX(-1)',
              filter: 'drop-shadow(0 0 16px #d4af37)',
            }}
          >
            <img src="/assets/micheal.gif" alt="MJ" style={{ height: '220px', width: 'auto' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spider-Man easter egg */}
      <AnimatePresence>
        {spiderModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: '#000000f2', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSpiderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(160deg, #1a0005, #0a0000)',
                border: '1px solid #c41e3a60',
                maxWidth: 360,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 0 80px #c41e3a30, 0 0 20px #000',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/spiderman.gif"
                alt="Spider-Man"
                style={{ width: '100%', display: 'block' }}
              />
              <div style={{ padding: '1.2rem 1.5rem 1rem' }}>
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  color: '#c41e3a',
                  fontSize: 'clamp(0.75rem, 3vw, 1rem)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.5,
                  textShadow: '0 0 20px #c41e3a80',
                }}>
                  com grande poder vem grande responsabilidade.
                </p>
                <button
                  onClick={() => setSpiderModal(false)}
                  style={{
                    marginTop: '0.8rem',
                    background: 'none',
                    border: 'none',
                    color: '#c41e3a60',
                    cursor: 'pointer',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                  }}
                >
                  ✦ fechar ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Serena easter egg */}
      <AnimatePresence>
        {serenaModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: '#000000f0', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSerenaModal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(160deg, #1a1200, #0d0800)',
                border: '1px solid #c9a96e60',
                padding: '0',
                maxWidth: 360,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 0 80px #c9a96e20, 0 0 20px #000',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src="/assets/serena.jpg"
                alt="Serena"
                style={{ width: '100%', display: 'block' }}
              />
              <div style={{ padding: '1.2rem 1.5rem 1rem' }}>
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  color: '#c9a96e',
                  fontSize: 'clamp(0.75rem, 3vw, 1rem)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.5,
                }}>
                  QUEM Q É ESSA SERÊNA AQUI?
                </p>
                <button
                  onClick={() => setSerenaModal(false)}
                  style={{
                    marginTop: '0.8rem',
                    background: 'none',
                    border: 'none',
                    color: '#c9a96e60',
                    cursor: 'pointer',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.25em',
                  }}
                >
                  ✦ fechar ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Twilight gif easter egg */}
      <AnimatePresence>
        {twilightModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: '#00000ef5', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTwilightModal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(160deg, #020818, #060020)',
                border: '1px solid #4a7fb580',
                padding: '2rem 2rem 1.5rem',
                maxWidth: 380,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 0 80px #4a7fb530, 0 0 20px #000',
                position: 'relative',
              }}
            >
              <p style={{
                fontFamily: "'Cinzel Decorative', serif",
                color: '#4a7fb5',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}>
                easter egg desbloqueado
              </p>
              <img
                src="/assets/twilight.gif"
                alt="Twilight"
                style={{
                  width: '100%',
                  borderRadius: 2,
                  border: '1px solid #4a7fb540',
                  display: 'block',
                }}
              />
              <p style={{
                fontFamily: "'Cinzel', serif",
                color: '#7aafd4',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                marginTop: '1.2rem',
                fontStyle: 'italic',
              }}>
                team edward forever
              </p>
              <button
                onClick={() => setTwilightModal(false)}
                style={{
                  marginTop: '1rem',
                  background: 'none',
                  border: 'none',
                  color: '#4a7fb580',
                  cursor: 'pointer',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                }}
              >
                ✦ fechar ✦
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami code modal */}
      <AnimatePresence>
        {konamiModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: '#000000e0', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setKonamiModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0f0a00',
                border: '1px solid #d4af37',
                padding: '2rem',
                maxWidth: 400,
                textAlign: 'center',
                boxShadow: '0 0 60px #d4af3750',
              }}
            >
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐟🍦</p>
              <h3 style={{ fontFamily: "'Cinzel', serif", color: '#d4af37', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                easter egg desbloqueado!
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#c0c0c0', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                "missa de 7 dias do porco monobola" — Inesquecivel.
              </p>
              <video
                src="/assets/missa de 7 dia do porco monobola.mp4"
                controls
                autoPlay
                playsInline
                style={{ width: '100%', marginTop: '1rem', border: '1px solid #d4af3740' }}
              />
              <button
                onClick={() => setKonamiModal(false)}
                style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em' }}
              >
                ✦ fechar ✦
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
