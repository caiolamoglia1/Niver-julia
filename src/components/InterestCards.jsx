import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from './GaleriaFotos'
import { Sparkles } from 'lucide-react'

const EASTER_CARDS = ['spiderman', 'twilight', 'gossipgirl']

const CARDS = [
  {
    id: 'spiderman',
    emoji: '🕷️',
    title: 'Spider-Man',
    subtitle: 'com grande poder...',
    photo: '/assets/spiderman.gif',
    back: 'ele tem o charme, mas ir assitir oq ? 5 vezes o mesmo filme é sacanagem.',
    color: '#c41e3a',
    bg: 'linear-gradient(135deg, #1a0005, #3d0010)',
    pattern: 'web',
  },
  {
    id: 'twilight',
    emoji: '🧛',
    title: 'Crepúsculo',
    subtitle: 'team edward forever',
    back: 'ela foi ao cinema ver Twilight em 2026 e não se arrependeu nem um segundo. respeitem.',
    color: '#4a7fb5',
    bg: 'linear-gradient(135deg, #020818, #0a1a30)',
    pattern: 'glitter',
  },
  {
    id: 'mj',
    emoji: '🕺',
    photo: '/assets/micheal.gif',
    title: 'Michael Jackson',
    subtitle: 'hee-hee!',
    back: 'billy jean pra vc .',
    color: '#d4af37',
    bg: 'linear-gradient(135deg, #1a1200, #2d2000)',
    pattern: 'notes',
  },
  {
    id: 'gossipgirl',
    emoji: '💬',
    title: 'Gossip Girl',
    subtitle: 'Eu sou Chuck Bass.',
    photo: '/assets/chuck.jpeg',
    back: '"Eu sou Chuck Bass." — e ela também tem essa energia. drama, poder, e um olhar que diz tudo. XOXO.',
    color: '#c9a96e',
    bg: 'linear-gradient(135deg, #1a1200, #2a1f08)',
    pattern: 'diamond',
  },
  {
    id: 'shameless',
    emoji: '😈',
    title: 'Shameless',
    subtitle: '"A vida é curta. Faça algo irresponsável."',
    back: '— Frank Gallagher. ela ama os Gallagher mais do que qualquer coisa, e Frank é a prova de que qualquer um pode ser o herói da própria história. de um jeito muito, muito errado.',
    color: '#8b4513',
    bg: 'linear-gradient(135deg, #0f0800, #1f1000)',
    pattern: 'grunge',
  },
  {
    id: 'bts',
    emoji: '💜',
    title: 'BTS',
    subtitle: 'ARMY forever',
    photo: '/assets/bts-julia.jpg',
    back: 'ela tem os cards, sabe as músicas, defende com unhas e dentes. a stan cultura mora nela.',
    color: '#6a0dad',
    bg: 'linear-gradient(135deg, #0a0014, #18003a)',
    pattern: 'stars',
  },
  {
    id: 'music',
    emoji: '🎸',
    title: 'Deftones + Paramore',
    subtitle: 'o gosto musical é impecável',
    back: 'de Chino Moreno a Hayley Williams, ela tem o melhor gosto musical que você vai encontrar. Decode toca na cabeça dela 24/7.',
    color: '#8b2fc9',
    bg: 'linear-gradient(135deg, #0a0015, #1a0035)',
    pattern: 'waves',
  },
  {
    id: 'bar',
    emoji: '🍺',
    title: 'Little Hell & Ruína',
    subtitle: 'a catedral dela',
    back: 'se ela sumir, olha no Ruína Bar ou no Little Hell. ela está lá, feliz, no ambiente que mais combina com ela.',
    color: '#c41e3a',
    bg: 'linear-gradient(135deg, #1a0005, #0a0000)',
    pattern: 'neon',
    bgImage: '/assets/little hell bar.jpeg',
  },
  {
    id: 'tarot',
    emoji: '🔮',
    title: 'Tarot',
    subtitle: 'ela lê as cartas',
    back: 'ela lê cartas de tarô e provavelmente já te deu uma leitura que foi assustadoramente certeira. creia.',
    color: '#d4af37',
    bg: 'linear-gradient(135deg, #12080a, #251020)',
    pattern: 'mystic',
  },
]

export default function InterestCards({ onEasterEgg }) {
  return (
    <section style={{ width: '100%', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
        <SectionTitle icon={<Sparkles size={34} strokeWidth={1.5} />} title="o universo dela" subtitle="hover pra saber mais sobre cada mundo que ela habita" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {CARDS.map((card, i) => (
            <FlipCard key={card.id} card={card} index={i} onEasterEgg={onEasterEgg} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlipCard({ card, index, onEasterEgg }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      style={{ perspective: '1000px', height: '220px', cursor: 'pointer' }}
      onClick={() => setFlipped(f => !f)}
      onDoubleClick={(e) => {
        if (EASTER_CARDS.includes(card.id) && onEasterEgg) {
          e.stopPropagation()
          setFlipped(false)
          onEasterEgg(card.id)
        }
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: card.bg,
            border: `1px solid ${card.color}40`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflow: 'hidden',
            boxShadow: `0 0 20px ${card.color}20`,
          }}
        >
          {card.bgImage && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${card.bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                filter: 'saturate(0.5)',
              }}
            />
          )}
          <PatternBg type={card.pattern} color={card.color} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {card.photo ? (
              <div style={{
                width: 64, height: 64, borderRadius: '50%', overflow: 'hidden',
                border: `2px solid ${card.color}`,
                margin: '0 auto 0.5rem',
                boxShadow: `0 0 14px ${card.color}80`,
              }}>
                <img
                  src={card.photo}
                  alt={card.title}
                  onError={e => { e.target.parentNode.innerHTML = `<span style="font-size:2rem;line-height:64px">${card.emoji}</span>` }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            ) : (
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>{card.emoji}</span>
            )}
            <h3
              className="font-cinzel"
              style={{ fontSize: '1rem', fontWeight: 700, color: card.color, letterSpacing: '0.1em', marginBottom: '0.3rem' }}
            >
              {card.title}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>
              {card.subtitle}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: '#444', marginTop: '0.8rem' }}>
              clica pra saber mais ✦
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: card.bg,
            border: `1px solid ${card.color}60`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            boxShadow: `0 0 30px ${card.color}30`,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              color: '#c0c0c0',
              textAlign: 'center',
              lineHeight: 1.7,
            }}
          >
            {card.back}
          </p>
          <div
            style={{
              marginTop: '1rem',
              width: '30px',
              height: '1px',
              background: card.color,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

function PatternBg({ type, color }) {
  if (type === 'web') return (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      {[20, 50, 80, 110, 140].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={color} strokeWidth="0.8" />
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <line key={i} x1="100" y1="100" x2={100 + Math.cos(a * Math.PI / 180) * 150} y2={100 + Math.sin(a * Math.PI / 180) * 150} stroke={color} strokeWidth="0.5" />
      ))}
    </svg>
  )
  if (type === 'stars') return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: 2, height: 2,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 4px ${color}`,
        }} />
      ))}
    </div>
  )
  if (type === 'waves') return (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      {[40, 60, 80, 100, 120, 140, 160].map((y, i) => (
        <path key={i} d={`M0,${y} Q50,${y - 15} 100,${y} Q150,${y + 15} 200,${y}`} fill="none" stroke={color} strokeWidth="0.8" />
      ))}
    </svg>
  )
  return null
}
