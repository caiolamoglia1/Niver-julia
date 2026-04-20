import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTitle } from './GaleriaFotos'
import { Eye, KeyRound } from 'lucide-react'

const TAROT_CARDS = [
  {
    id: 1,
    name: 'A Imperatriz',
    numeral: 'III',
    symbol: '👑',
    message: '// ESCREVE AQUI — ex: "você, obviamente. imponente, linda e impossível de ignorar."',
    color: '#d4af37',
  },
  {
    id: 2,
    name: 'A Lua',
    numeral: 'XVIII',
    symbol: '🌙',
    message: '// ESCREVE AQUI — ex: "ela governa o seu mundo — sonhos, intuição, e aquele olhar que lê tudo."',
    color: '#6a8fc9',
  },
  {
    id: 3,
    name: 'A Estrelada',
    numeral: 'XVII',
    symbol: '✦',
    message: '// ESCREVE AQUI — ex: "esperança. você sempre achou que ia dar certo. e deu."',
    color: '#9eb8e0',
  },
  {
    id: 4,
    name: 'O Mundo',
    numeral: 'XXI',
    symbol: '🌍',
    message: '// ESCREVE AQUI — ex: "realização. 20 anos e o mundo inteiro ainda por explorar."',
    color: '#8b2fc9',
  },
  {
    id: 5,
    name: 'O Sol',
    numeral: 'XIX',
    symbol: '☀️',
    message: '// ESCREVE AQUI — ex: "alegria pura. a energia que você traz pra qualquer ambiente."',
    color: '#e8a020',
  },
  {
    id: 6,
    name: 'A Força',
    numeral: 'VIII',
    symbol: '🦁',
    message: '// ESCREVE AQUI — ex: "você enfrenta tudo com mais classe do que parece. todo mundo vê."',
    color: '#c41e3a',
  },
  {
    id: 7,
    name: 'Os Amantes',
    numeral: 'VI',
    symbol: '🌹',
    message: '// ESCREVE AQUI — ex: "conexão. aquela que você sente quando tudo simplesmente encaixa."',
    color: '#c41e3a',
  },
  {
    id: 8,
    name: 'A Alta Sacerdotisa',
    numeral: 'II',
    symbol: '🔮',
    message: '// ESCREVE AQUI — ex: "intuição perfeita. ela sabe coisas. não pergunte como."',
    color: '#4a1070',
  },
  // Hidden card — the 130 days game
  {
    id: 130,
    name: '??? ',
    numeral: '???',
    symbol: '🗝️',
    message: '',
    color: '#d4af37',
    hidden: true,
  },
]

const DAYS_ANSWER = 130

export default function TarotSection() {
  const [openCard, setOpenCard] = useState(null)
  const [gameCard, setGameCard] = useState(false)

  return (
    <section style={{ width: '100%', padding: '5rem 1rem' }} id="tarot">
      <div style={{ maxWidth: '64rem', margin: '0 auto', width: '100%' }}>
        <SectionTitle
          icon={<Eye size={34} strokeWidth={1.5} />}
          title="as cartas falam"
          subtitle="clica em cada carta e descobre o que elas têm a dizer"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 180px))',
            gap: '16px',
            justifyContent: 'center',
          }}
        >
          {TAROT_CARDS.map((card, i) => (
            card.hidden ? (
              <HiddenCard key={card.id} index={i} onClick={() => setGameCard(true)} />
            ) : (
              <TarotCard key={card.id} card={card} index={i} onOpen={() => setOpenCard(card)} />
            )
          ))}
        </div>

        {/* Card Detail Modal */}
        <AnimatePresence>
          {openCard && (
            <CardModal card={openCard} onClose={() => setOpenCard(null)} />
          )}
        </AnimatePresence>

        {/* 130 Days Game Modal */}
        <AnimatePresence>
          {gameCard && (
            <DaysGame onClose={() => setGameCard(false)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function TarotCard({ card, index, onOpen }) {
  const [flipped, setFlipped] = useState(false)

  const handleClick = () => {
    if (!flipped) {
      setFlipped(true)
    } else {
      onOpen()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      style={{ perspective: '800px', height: '240px', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Card back (face down) */}
        <div
          style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #0a0014, #1a003a)',
            border: '1px solid #4a1070',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 160 240" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            {/* Celtic cross pattern */}
            {Array.from({ length: 5 }).map((_, row) => (
              Array.from({ length: 4 }).map((_, col) => (
                <text key={`${row}-${col}`} x={20 + col * 38} y={30 + row * 46} fontSize="20" fill="#8b2fc9" textAnchor="middle">✦</text>
              ))
            ))}
          </svg>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem' }}>🌙</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', color: '#8b2fc960', marginTop: 4, letterSpacing: '0.2em' }}>TAROT</div>
          </div>
        </div>

        {/* Card front (face up) */}
        <div
          style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(160deg, #0f0018, #1a0030)`,
            border: `1px solid ${card.color}60`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', boxShadow: `0 0 20px ${card.color}20`,
          }}
        >
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', color: card.color, letterSpacing: '0.2em', marginBottom: 6 }}>
            {card.numeral}
          </p>
          <span style={{ fontSize: '2rem', marginBottom: 8 }}>{card.symbol}</span>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', color: '#c0c0c0', textAlign: 'center', letterSpacing: '0.08em' }}>
            {card.name}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: '#555', marginTop: 8 }}>
            clica de novo para ler ✦
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function HiddenCard({ index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      style={{ perspective: '800px', height: '240px', cursor: 'pointer' }}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        animate={{ boxShadow: ['0 0 10px #d4af3720', '0 0 25px #d4af3760', '0 0 10px #d4af3720'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #1a0f00, #2a1800)',
          border: '1px solid #d4af3780',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: '#d4af37' }}
        >
          <KeyRound size={40} strokeWidth={1.5} />
        </motion.div>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', color: '#d4af3780', letterSpacing: '0.2em', marginTop: 8 }}>
          ???
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: '#d4af3760', marginTop: 4, fontStyle: 'italic' }}>
          carta secreta
        </p>
      </motion.div>
    </motion.div>
  )
}

function CardModal({ card, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: '#000000d0', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, #0f0018, #1a0030)',
          border: `1px solid ${card.color}80`,
          padding: '2.5rem',
          maxWidth: 380,
          width: '100%',
          textAlign: 'center',
          boxShadow: `0 0 60px ${card.color}30`,
        }}
      >
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color: card.color, letterSpacing: '0.3em', marginBottom: 12 }}>
          {card.numeral}
        </p>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }}>{card.symbol}</span>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.3rem', color: '#c0c0c0', letterSpacing: '0.1em', marginBottom: 20 }}>
          {card.name}
        </h3>
        <div style={{ width: '40px', height: '1px', background: card.color, margin: '0 auto 20px' }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#aaa', lineHeight: 1.8, fontStyle: 'italic' }}>
          {card.message}
        </p>
        <button onClick={onClose} style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em' }}>
          ✦ fechar ✦
        </button>
      </motion.div>
    </motion.div>
  )
}

function DaysGame({ onClose }) {
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong1' | 'wrong2'

  const handleGuess = () => {
    const guess = parseInt(input.trim(), 10)
    if (guess === DAYS_ANSWER) {
      setResult('correct')
    } else if (attempts === 0) {
      setResult('wrong1')
      setAttempts(1)
      setInput('')
    } else {
      setResult('wrong2')
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleGuess()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: '#000000e0', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        style={{
          background: 'linear-gradient(160deg, #1a0f00, #2a1800)',
          border: '1px solid #d4af3780',
          padding: '2.5rem',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 0 60px #d4af3730',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem' }}
        >
          ✕
        </button>

        <span style={{ display: 'block', marginBottom: 12, color: '#d4af37' }}><KeyRound size={48} strokeWidth={1.5} /></span>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', color: '#d4af37', letterSpacing: '0.15em', marginBottom: 8 }}>
          Carta Secreta
        </h3>
        <div style={{ width: '40px', height: '1px', background: '#d4af37', margin: '0 auto 20px' }} />

        {!result && (
          <>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#c0c0c0', lineHeight: 1.7, marginBottom: 6 }}>
              quantos dias fazem hoje?
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#888', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {attempts === 1 ? '⚠️ última tentativa...' : 'você tem 2 tentativas.'}
            </p>
            <input
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="escreve o número..."
              style={{
                background: '#00000060',
                border: '1px solid #d4af3760',
                color: '#d4af37',
                fontFamily: "'Cinzel', serif",
                fontSize: '1.5rem',
                textAlign: 'center',
                padding: '0.6rem 1rem',
                width: '100%',
                marginBottom: '1rem',
                outline: 'none',
                letterSpacing: '0.1em',
              }}
              autoFocus
            />
            <button
              onClick={handleGuess}
              style={{
                background: 'transparent',
                border: '1px solid #d4af37',
                color: '#d4af37',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                padding: '0.6rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              revelar ✦
            </button>
          </>
        )}

        <AnimatePresence>
          {result === 'correct' && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <motion.img
                src="/assets/mandy.gif"
                alt="acertou!"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  maxWidth: 280,
                  borderRadius: 4,
                  border: '1px solid #d4af3760',
                  boxShadow: '0 0 40px #d4af3730',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <p style={{ fontFamily: "'Cinzel', serif", color: '#d4af37', fontSize: '1.1rem', marginTop: 16, letterSpacing: '0.1em' }}>
                130 dias! 🎉
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#c0c0c0', fontSize: '0.85rem', marginTop: 8, lineHeight: 1.6 }}>
                ela sabia! hee-hee! 🕺<br />
                <span style={{ color: '#888', fontSize: '0.75rem' }}>130 dias desde que a gente se conheceu. e olha onde estamos.</span>
              </p>
            </motion.div>
          )}
          {result === 'wrong1' && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <FrankGallagher />
              <p style={{ fontFamily: "'Cinzel', serif", color: '#c41e3a', fontSize: '0.9rem', letterSpacing: '0.1em', marginTop: 12 }}>
                Frank Gallagher diz:
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#aaa', fontSize: '0.9rem', marginTop: 8, fontStyle: 'italic', lineHeight: 1.8 }}>
                "A vida é curta. Faça algo irresponsável de vez em quando."
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#555', fontSize: '0.72rem', marginTop: 6 }}>
                (e tenta de novo, talvez)
              </p>
              <button
                onClick={() => setResult(null)}
                style={{
                  marginTop: '1rem',
                  background: 'none',
                  border: '1px solid #c41e3a',
                  color: '#c41e3a',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  padding: '0.5rem 1.5rem',
                  cursor: 'pointer',
                }}
              >
                tentar de novo
              </button>
            </motion.div>
          )}
          {result === 'wrong2' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <ChuckBass />
              <p style={{ fontFamily: "'Cinzel', serif", color: '#c9a96e', fontSize: '0.9rem', letterSpacing: '0.1em', marginTop: 12 }}>
                Eu sou Chuck Bass.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#aaa', fontSize: '0.82rem', marginTop: 8, fontStyle: 'italic', lineHeight: 1.7 }}>
                "uma pessoa que conhece os próprios sentimentos<br />sabe que eram <strong style={{ color: '#d4af37' }}>130 dias</strong>."
              </p>
              <button
                onClick={onClose}
                style={{
                  marginTop: '1rem',
                  background: 'none',
                  border: '1px solid #c9a96e',
                  color: '#c9a96e',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  padding: '0.5rem 1.5rem',
                  cursor: 'pointer',
                }}
              >
                fechar com classe
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function ChuckBass() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 8 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 16 }}
      style={{
        width: 90,
        height: 90,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #c9a96e',
        margin: '0 auto',
        boxShadow: '0 0 20px #c9a96e60',
        background: '#1a1200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3.5rem',
        position: 'relative',
      }}
    >
      <img
        src="/assets/chuck.jpeg"
        alt="Chuck Bass"
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
      <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        🎩
      </div>
    </motion.div>
  )
}

function FrankGallagher() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      style={{
        width: 90,
        height: 90,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #c41e3a',
        margin: '0 auto',
        boxShadow: '0 0 20px #c41e3a60',
        background: '#1a0005',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3.5rem',
        position: 'relative',
      }}
    >
      <img
        src="/assets/frank.jpeg"
        alt="Frank Gallagher"
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
      <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        🧔
      </div>
    </motion.div>
  )
}

function MoonwalkMJ() {
  return (
    <motion.div
      animate={{ x: [60, -20, 60] }}
      transition={{ duration: 3, repeat: 2, ease: 'linear' }}
      style={{
        fontSize: '3rem',
        display: 'inline-block',
        transform: 'scaleX(-1)',
        filter: 'drop-shadow(0 0 10px #d4af37)',
      }}
    >
      🕺
    </motion.div>
  )
}
