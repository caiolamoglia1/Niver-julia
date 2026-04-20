import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FRASES = [
  'CRUZES',
  'CRENDIOS',
  'ELES VENDEM COPINHO SERÁ?',
  'BÓ?',
  'PODZIN NÉ',
  'BUMBLEBILL KKKK',
  "EXCUSE MA'AM",
  'MISERICÓRDIA',
  'PUTA Q PARIU, LARAZENTO',
  'OLHA LÁÁÁ, AZUL CALCINHA AQUELE',
]

// Background falling particles
const BG_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 6,
  size: 8 + Math.random() * 16,
  emoji: ['🌹', '🥀', '✦', '✧', '·', '∗'][Math.floor(Math.random() * 6)],
}))

// Firework particles — 2 rings: inner burst + outer spray
const FW_COLORS = ['#d4af37', '#f0c040', '#ffd700', '#8b2fc9', '#c41e3a', '#ff4d6d', '#ffffff', '#c0c0c0', '#b44de0']
const FIREWORK_P = [
  ...Array.from({ length: 32 }, (_, i) => ({
    id: `a${i}`,
    angle: (i / 32) * 360 + (Math.random() * 6 - 3),
    dist: 80 + Math.random() * 80,
    color: FW_COLORS[i % FW_COLORS.length],
    size: 5 + Math.random() * 9,
    delay: Math.random() * 0.05,
    dur: 0.45 + Math.random() * 0.2,
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `b${i}`,
    angle: (i / 24) * 360 + Math.random() * 15,
    dist: 150 + Math.random() * 140,
    color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
    size: 3 + Math.random() * 5,
    delay: 0.06 + Math.random() * 0.12,
    dur: 0.75 + Math.random() * 0.3,
  })),
]

const NUMBER_STYLES = {
  fontFamily: "'Cinzel Decorative', serif",
  fontSize: 'clamp(6rem, 20vw, 14rem)',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #d4af37 0%, #f0c040 40%, #d4af37 60%, #a07830 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
  userSelect: 'none',
}

export default function SplashReveal({ onFinish }) {
  // phases: dark → counting → explode → twenty → text → button → exit
  const [phase, setPhase] = useState('dark')
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [currentFrase, setCurrentFrase] = useState(null)
  const fraseTimerRef = useRef(null)
  const fraseKeyRef = useRef(0)

  // Start counting after brief dark pause
  useEffect(() => {
    const t = setTimeout(() => setPhase('counting'), 600)
    return () => clearTimeout(t)
  }, [])

  // Counting 1 → 20 every 80ms
  useEffect(() => {
    if (phase !== 'counting') return
    let current = 0
    const iv = setInterval(() => {
      current++
      setCount(current)
      if (current >= 20) {
        clearInterval(iv)
        setTimeout(() => setPhase('explode'), 60)
        setTimeout(() => setPhase('twenty'), 720)
        setTimeout(() => setPhase('text'), 1720)
        setTimeout(() => setPhase('button'), 3200)
      }
    }, 80)
    return () => clearInterval(iv)
  }, [phase])

  // Frases relâmpago durante o counting
  useEffect(() => {
    if (phase !== 'counting') {
      if (fraseTimerRef.current) clearInterval(fraseTimerRef.current)
      setCurrentFrase(null)
      return
    }
    const shuffled = [...FRASES].sort(() => Math.random() - 0.5)
    let idx = 0
    const fire = () => {
      fraseKeyRef.current += 1
      setCurrentFrase({ text: shuffled[idx % shuffled.length], key: fraseKeyRef.current })
      idx++
      // sumiu: apaga depois de 350ms
      setTimeout(() => setCurrentFrase(null), 350)
    }
    fire() // primeira logo de cara
    fraseTimerRef.current = setInterval(fire, 480)
    return () => clearInterval(fraseTimerRef.current)
  }, [phase])

  const handleEnter = () => {
    setPhase('exit')
    setTimeout(onFinish, 800)
  }

  const showExplosion = phase === 'explode'
  const showNumber = ['counting', 'explode', 'twenty', 'text', 'button'].includes(phase)
  const showText = phase === 'text' || phase === 'button'
  const showButton = phase === 'button'

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center, #0f0519 0%, #080808 70%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background falling particles */}
          {BG_PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none select-none"
              style={{ left: `${p.x}%`, top: -30, fontSize: p.size }}
              animate={{ y: '110vh', rotate: 360, opacity: [0, 1, 0.8, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            >
              {p.emoji}
            </motion.div>
          ))}

          {/* Web top-left */}
          <svg className="absolute top-0 left-0 w-48 h-48 opacity-20" viewBox="0 0 200 200">
            {[20, 40, 60, 80, 100, 120, 140].map((r, i) => (
              <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#8b2fc9" strokeWidth="0.5" />
            ))}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
              <line key={i} x1="0" y1="0"
                x2={Math.cos(a * Math.PI / 180) * 160}
                y2={Math.sin(a * Math.PI / 180) * 160}
                stroke="#8b2fc9" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Screen flash on explosion */}
          <AnimatePresence>
            {phase === 'explode' && (
              <motion.div
                key="flash"
                className="absolute inset-0 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ background: 'radial-gradient(ellipse at center, #ffffff 0%, #d4af3740 60%, transparent 100%)' }}
              />
            )}
          </AnimatePresence>

          {/* Firework particles */}
          {showExplosion && FIREWORK_P.map(p => {
            const rad = p.angle * Math.PI / 180
            return (
              <motion.div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: p.size,
                  height: p.size,
                  marginLeft: -p.size / 2,
                  marginTop: -p.size / 2,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}60`,
                  pointerEvents: 'none',
                  zIndex: 15,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * p.dist,
                  y: Math.sin(rad) * p.dist,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut' }}
              />
            )
          })}

          {/* Content */}
          <div className="relative z-10 text-center px-6">

            {/* Frases relâmpago durante counting */}
            <div style={{ minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
              <AnimatePresence mode="wait">
                {phase === 'counting' && currentFrase && (
                  <motion.p
                    key={currentFrase.key}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.3, ease: 'easeOut' } }}
                    transition={{ duration: 0.08, ease: 'easeOut' }}
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(0.75rem, 2.5vw, 1.05rem)',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#c0c0c0',
                      textShadow: '0 0 12px #8b2fc9aa, 0 0 4px #ffffff40',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {currentFrase.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Number — counting or settled 20 */}
            {showNumber && (
              <div style={{ minHeight: 'clamp(6rem, 20vw, 14rem)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {phase === 'counting' && (
                  <motion.div
                    key={count}
                    initial={{ opacity: 0.4, scale: 1.5, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.065 }}
                    style={{
                      ...NUMBER_STYLES,
                      filter: `drop-shadow(0 0 ${12 + count * 2}px #d4af37) drop-shadow(0 0 ${6 + count}px #f0c04080)`,
                    }}
                  >
                    {count || ''}
                  </motion.div>
                )}

                {phase === 'explode' && (
                  <motion.div
                    key="twenty-explode"
                    initial={{ scale: 2.2, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      ...NUMBER_STYLES,
                      filter: 'drop-shadow(0 0 80px #d4af37) drop-shadow(0 0 30px #f0c040) drop-shadow(0 0 10px #ffffff)',
                    }}
                  >
                    20
                  </motion.div>
                )}

                {(phase === 'twenty' || phase === 'text' || phase === 'button') && (
                  <motion.div
                    key="twenty-final"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    style={{
                      ...NUMBER_STYLES,
                      filter: 'drop-shadow(0 0 30px #d4af3780)',
                      cursor: 'default',
                    }}
                    onClick={() => setClickCount(c => c + 1)}
                    className="glitch"
                  >
                    20
                  </motion.div>
                )}
              </div>
            )}

            {/* feliz aniversário */}
            <AnimatePresence>
              {showText && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="mt-4"
                >
                  <TypewriterText
                    text="feliz aniversário, julia"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(1.1rem, 3vw, 2rem)',
                      color: '#c0c0c0',
                      letterSpacing: '0.2em',
                      textTransform: 'lowercase',
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1.5 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      color: '#8b2fc9',
                      marginTop: '0.5rem',
                      letterSpacing: '0.15em',
                    }}
                  >
                    🖤 20 anos de você no mundo
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enter button */}
            <AnimatePresence>
              {showButton && (
                <motion.button
                  key="btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px #8b2fc9' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnter}
                  style={{
                    marginTop: '2.5rem',
                    padding: '0.9rem 2.5rem',
                    border: '1px solid #8b2fc9',
                    background: 'transparent',
                    color: '#c0c0c0',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.9rem',
                    letterSpacing: '0.25em',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                  }}
                >
                  entrar ✦
                </motion.button>
              )}
            </AnimatePresence>

            {/* Secret click counter */}
            {clickCount >= 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '1rem', color: '#d4af37', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem' }}
              >
                para de clicar no 20 🙄
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TypewriterText({ text, style }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++ }
      else clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [text])
  return (
    <span style={style}>
      {displayed}
      <span style={{ animation: 'flicker 1s infinite', marginLeft: 2 }}>|</span>
    </span>
  )
}
