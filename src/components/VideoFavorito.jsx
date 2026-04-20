import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTitle } from './GaleriaFotos'
import { Lock, LockOpen } from 'lucide-react'

const ANSWER = 'fica de tabela sempre'

function normalize(str) {
  return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default function VideoFavorito() {
  const [stage, setStage] = useState('card') // card → challenge → wrong → unlocked
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  const handleCardClick = () => {
    setStage('challenge')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (normalize(input) === normalize(ANSWER)) {
      setStage('unlocked')
    } else {
      setShake(true)
      setStage('wrong')
      setTimeout(() => { setShake(false); setStage('challenge'); setInput('') }, 1800)
    }
  }

  return (
    <section style={{ width: '100%', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto', width: '100%' }}>
        <SectionTitle
          icon={<Lock size={34} strokeWidth={1.5} />}
          title="O G TA CHARRADO"
        />

        <AnimatePresence mode="wait">

          {/* LOCKED CARD */}
          {(stage === 'card' || stage === 'challenge' || stage === 'wrong') && stage === 'card' && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onClick={handleCardClick}
              style={{
                maxWidth: 340,
                margin: '0 auto',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    '0 0 18px #8b2fc940, 0 0 40px #d4af3720',
                    '0 0 30px #8b2fc970, 0 0 60px #d4af3740',
                    '0 0 18px #8b2fc940, 0 0 40px #d4af3720',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, #0a0010, #160828)',
                  border: '1px solid #8b2fc960',
                  borderRadius: 4,
                  height: 340,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  padding: '2rem',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  style={{ color: '#8b2fc9' }}
                >
                  <Lock size={56} strokeWidth={1.5} />
                </motion.div>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1rem',
                  color: '#c0c0c0',
                  letterSpacing: '0.15em',
                  textAlign: 'center',
                }}>
                  vídeo especial
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  color: '#555',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                }}>
                  clique para desbloquear
                </p>
              </motion.div>

              {/* Corner decorations */}
              {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
                <div key={i} style={{ position: 'absolute', width: 12, height: 12, border: '2px solid #d4af37', ...pos }} />
              ))}
            </motion.div>
          )}

          {/* CHALLENGE */}
          {(stage === 'challenge' || stage === 'wrong') && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, x: shake ? [0, -10, 10, -8, 8, 0] : 0 }}
              transition={{ duration: shake ? 0.4 : 0.5 }}
              style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}
            >
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, #0a0010, #160828)',
                  border: `1px solid ${stage === 'wrong' ? '#c41e3a' : '#8b2fc960'}`,
                  borderRadius: 4,
                  padding: '2.5rem 2rem',
                  position: 'relative',
                }}
                animate={stage === 'wrong' ? { boxShadow: '0 0 30px #c41e3a60' } : {}}
              >
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.7rem',
                  color: '#8b2fc9',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}>
                  complete a frase
                </p>

                {/* Phrase display */}
                <div style={{
                  background: '#ffffff08',
                  border: '1px solid #2d0a4e',
                  borderRadius: 2,
                  padding: '1rem 1.2rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#c0c0c0',
                    lineHeight: 1.8,
                  }}>
                    <span style={{ color: '#d4af37' }}>"</span>
                    thiago fuma nunca,{' '}
                    <span style={{
                      display: 'inline-block',
                      minWidth: 180,
                      borderBottom: '1px dashed #8b2fc9',
                      color: '#8b2fc960',
                      fontStyle: 'italic',
                    }}>
                      {input || '_______________'}
                    </span>
                    <span style={{ color: '#d4af37' }}>"</span>
                  </p>
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="complete aqui..."
                    disabled={stage === 'wrong'}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${stage === 'wrong' ? '#c41e3a' : '#8b2fc9'}`,
                      color: '#c0c0c0',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9rem',
                      padding: '0.5rem 0',
                      outline: 'none',
                      textAlign: 'center',
                      letterSpacing: '0.05em',
                      marginBottom: '1.5rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={stage === 'wrong' || !input.trim()}
                    style={{
                      background: 'none',
                      border: '1px solid #8b2fc9',
                      color: '#c0c0c0',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      padding: '0.6rem 2rem',
                      cursor: input.trim() ? 'pointer' : 'default',
                      opacity: input.trim() ? 1 : 0.4,
                      textTransform: 'uppercase',
                      transition: 'all 0.3s',
                    }}
                  >
                    desbloquear ✦
                  </button>
                </form>

                {stage === 'wrong' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8rem',
                      color: '#c41e3a',
                      marginTop: '1rem',
                      fontStyle: 'italic',
                    }}
                  >
                    errou 😐 tenta de novo
                  </motion.p>
                )}
              </motion.div>

              <button
                onClick={() => { setStage('card'); setInput('') }}
                style={{
                  marginTop: '1rem',
                  background: 'none',
                  border: 'none',
                  color: '#444',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                }}
              >
                voltar
              </button>
            </motion.div>
          )}

          {/* UNLOCKED VIDEO */}
          {stage === 'unlocked' && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: 340, margin: '0 auto', position: 'relative' }}
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  textAlign: 'center',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.7rem',
                  color: '#d4af37',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <LockOpen size={16} strokeWidth={1.5} /> desbloqueado
              </motion.p>

              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 18px #8b2fc940, 0 0 40px #d4af3720',
                    '0 0 30px #8b2fc970, 0 0 60px #d4af3740',
                    '0 0 18px #8b2fc940, 0 0 40px #d4af3720',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ border: '1px solid #8b2fc960', borderRadius: 4, overflow: 'hidden', background: '#0a0010' }}
              >
                <div style={{ height: 560, overflow: 'hidden', position: 'relative' }}>
                  <iframe
                    src="https://www.tiktok.com/embed/v2/7478431198822419767"
                    style={{ width: '100%', height: 740, border: 'none', display: 'block', marginTop: -8 }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Vídeo favorito da Julia"
                  />
                </div>
              </motion.div>

              {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
                <div key={i} style={{ position: 'absolute', width: 12, height: 12, border: '2px solid #d4af37', ...pos }} />
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{
                  textAlign: 'center',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  color: '#555',
                  marginTop: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                veigh — tá xarrado 🖤
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}

