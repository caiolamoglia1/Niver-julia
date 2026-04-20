import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTitle } from './GaleriaFotos'
import { Mail } from 'lucide-react'

const LETTER_TEXT = `Julia,

Saiba que vc vem sendo a pessoa preferida de alguém.


venho sentindo saudade quando to longê, e quando to perto, sinto que o tempo é passa rápido demais kkkk"

feliz aniversário, Julia.
Espero estar nos próximos proporcionando coisas boas pra vc .

`

export default function CartaAniversario() {
  const [opened, setOpened] = useState(false)
  const [photoRevealed, setPhotoRevealed] = useState(false)

  const handleOpen = () => {
    setOpened(true)
  }

  return (
    <section style={{ width: '100%', padding: '6rem 1rem', background: 'linear-gradient(to bottom, #080808, #06000f, #080808)' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto', width: '100%' }}>
        <SectionTitle icon={<Mail size={34} strokeWidth={1.5} />} title="uma carta" subtitle="tem uma coisa aqui pra você" />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Envelope */}
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: 360, cursor: 'pointer' }}
                onClick={handleOpen}
              >
                <EnvelopeSVG />
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.75rem',
                    color: '#8b2fc9',
                    letterSpacing: '0.2em',
                    marginTop: '1rem',
                  }}
                >
                  clica para abrir 💌
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  background: '#0a0014',
                  border: '1px solid #4a1070',
                  padding: 'clamp(1.5rem, 5vw, 3rem)',
                  boxShadow: '0 0 60px #8b2fc930',
                  position: 'relative',
                }}
              >
                {/* Corner decorations */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos}`}
                    style={{ width: 20, height: 20, border: '1px solid #8b2fc960', transform: ['rotate(0deg)', 'rotate(90deg)', 'rotate(-90deg)', 'rotate(180deg)'][i] }}
                  />
                ))}

                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', color: '#8b2fc9', letterSpacing: '0.3em', marginBottom: '1.5rem', textAlign: 'center' }}>
                  ✦ para julia, com amor ✦
                </div>

                <TypewriterLetter text={LETTER_TEXT} />

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 4, duration: 1 }}
                  style={{ marginTop: '2rem', textAlign: 'right' }}
                >
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#d4af37', fontWeight: 600 }}>
                    — C. 🖤
                  </p>
                </motion.div>

                {/* Photo reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 0.8 }}
                  style={{ marginTop: '2rem', borderTop: '1px solid #2d0a4e', paddingTop: '1.5rem', textAlign: 'center' }}
                >
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', color: '#8b2fc9', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                    {photoRevealed ? '✦ linda né ✦' : '✦ tem algo aqui pra você ver ✦'}
                  </p>
                  <div
                    onClick={() => setPhotoRevealed(true)}
                    style={{
                      position: 'relative',
                      cursor: photoRevealed ? 'default' : 'pointer',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      border: '1px solid #4a1070',
                      boxShadow: photoRevealed ? '0 0 40px #8b2fc940' : '0 0 20px #8b2fc920',
                    }}
                  >
                    <img
                      src="/assets/drageu.jpg"
                      alt="Julia"
                      style={{
                        width: '100%',
                        display: 'block',
                        filter: photoRevealed ? 'none' : 'blur(28px) brightness(0.6)',
                        transition: 'filter 0.8s ease',
                        transform: photoRevealed ? 'scale(1)' : 'scale(1.05)',
                        transition: 'filter 0.8s ease, transform 0.8s ease',
                      }}
                    />
                    {!photoRevealed && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column', gap: '0.5rem',
                      }}>
                        <span style={{ fontSize: '2rem' }}>👁️</span>
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', color: '#d4af37', letterSpacing: '0.2em' }}>clica para ver</span>
                      </div>
                    )}
                  </div>
                </motion.div>


              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function EnvelopeSVG() {
  const [hovered, setHovered] = useState(false)
  return (
    <svg
      viewBox="0 0 360 240"
      style={{ width: '100%', filter: hovered ? 'drop-shadow(0 0 40px #8b2fc970)' : 'drop-shadow(0 0 20px #8b2fc940)', transition: 'filter 0.3s ease', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Body */}
      <rect x="10" y="60" width="340" height="170" fill="#0a0014" stroke="#4a1070" strokeWidth="1.5" rx="2" />
      {/* Left flap fold line */}
      <line x1="10" y1="60" x2="180" y2="160" stroke="#2d0a4e" strokeWidth="1" />
      {/* Right flap fold line */}
      <line x1="350" y1="60" x2="180" y2="160" stroke="#2d0a4e" strokeWidth="1" />
      {/* Top flap */}
      <polygon points="10,60 350,60 180,155" fill="#12001e" stroke="#4a1070" strokeWidth="1.5" />
      {/* Wax seal */}
      <circle cx="180" cy="135" r="18" fill="#6b0f1a" stroke="#c41e3a" strokeWidth="1" />
      <text x="180" y="141" textAnchor="middle" fontSize="16" fill="#d4af37">🌹</text>
      {/* Decorative dots */}
      <text x="40" y="200" fontSize="12" fill="#4a1070" opacity="0.5">✦</text>
      <text x="310" y="200" fontSize="12" fill="#4a1070" opacity="0.5">✦</text>
    </svg>
  )
}

function TypewriterLetter({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const started = useRef(false)

  if (!started.current) {
    started.current = true
    let i = 0
    const speed = 18
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
  }

  return (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
        color: '#c0c0c0',
        lineHeight: 1.9,
        whiteSpace: 'pre-wrap',
        minHeight: '4rem',
      }}
    >
      {displayed}
      {!done && <span style={{ animation: 'flicker 1s infinite', opacity: 1 }}>|</span>}
    </p>
  )
}
