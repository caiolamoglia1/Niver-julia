import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Camera } from 'lucide-react'

const PHOTOS = [
  {
    src: '/assets/crepusculo filme.jpeg',
    caption: '🧛 Nunca ri tanto no cinema. sem arrependimentos.',
    category: 'Cinema & Culture',
  },
  {
    src: '/assets/crepusculo filme1.jpeg',
    caption: '🎬 the bella swan look. olha a expressão dela. é você.',
    category: 'Cinema & Culture',
  },
  {
    src: '/assets/decode paramore.jpeg',
    caption: '🎸 Decode tocando ao fundo na nossa cabeça o tempo todo.',
    category: 'Cinema & Culture',
  },
  {
    src: '/assets/bts.jpeg',
    caption: '💜 o card que ela guarda com mais carinho do que qualquer coisa.',
    category: 'Cinema & Culture',
  },
  {
    src: '/assets/bts1.jpeg',
    caption: '💜 mais BTS porque uma foto não é suficiente.',
    category: 'Cinema & Culture',
  },
  {
    src: '/assets/bts2.jpeg',
    caption: '💜 esse é o V ?',
    category: 'Cinema & Culture',
  },
  {
    src: '/assets/little hell bar.jpeg',
    caption: '😈 Little Hell — perfeito pra nós dois tbm.',
    category: 'Roles',
  },
  {
    src: '/assets/primeira vez no little hell.jpeg',
    caption: '🍺 a primeira vez no Little Hell. histórico.',
    category: 'Roles',
  },
  {
    src: '/assets/primeiro role no ruina.jpeg',
    caption: '🌃 Ruína Bar, Curitiba. o lugar que parece feito pra você.',
    category: 'Roles',
  },
  {
    src: '/assets/role na Rw.jpeg',
    caption: '✨ RW — mais um role, mais uma memória boa graças a trajano e a missa de sétimo dia.',
    category: 'Roles',
  },
  {
    src: '/assets/pegou o maior peixe.jpeg',
    caption: '🎣 ela pegou o maior peixe. ficou orgulhosa por 3 dias seguidos.',
    category: 'Aventuras',
  },
  {
    src: '/assets/peixe.jpeg',
    caption: '🐟 o peixe que não sabia com quem estava lidando.',
    category: 'Aventuras',
  },
  {
    src: '/assets/sorvete de peixe.jpeg',
    caption: '🍦 sorvete de peixe. não precisa de explicação. só precisa de respeito.',
    category: 'Aventuras',
  },
  {
    src: '/assets/flor.jpeg',
    caption: '🌸 linda, como você.',
    category: 'Aventuras',
  },
  {
    src: '/assets/dia do mexicano.jpeg',
    caption: '🌮 dia do mexicano — É uma chef de respeito.',
    category: 'Momentos',
  },
  {
    src: '/assets/dia do mexicanoflor.jpeg',
    caption: '🌺 até a flor entrou no espírito mexicano.',
    category: 'Momentos',
  },
  {
    src: '/assets/cozinhando dia mexicano.png',
    caption: '👩‍🍳 ela na cozinha é um evento. e ficou bom demais.',
    category: 'Momentos',
  },
  {
    src: '/assets/compramos juntos o mesmo tenis.jpeg',
    caption: '👟 7 belo um dia, PLAQTUDUM no outro, é o drek n tem como',
    category: 'Momentos',
  },
]

const CATEGORIES = ['Tudo', 'Cinema & Culture', 'Roles', 'Aventuras', 'Momentos']

export default function GaleriaFotos() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [activeCategory, setActiveCategory] = useState('Tudo')

  const filtered = activeCategory === 'Tudo' ? PHOTOS : PHOTOS.filter(p => p.category === activeCategory)
  const slides = filtered.map(p => ({ src: p.src }))

  return (
    <section id="galeria" className="py-20 px-4">
      <div style={{ maxWidth: '80rem', margin: '0 auto', width: '100%' }}>
      <SectionTitle icon={<Camera size={34} strokeWidth={1.5} />} title="nossa galeria" subtitle="momentos que a gente não repete, mas não esquece" />

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: '-2rem', marginBottom: '4rem' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.4rem 1.2rem',
              border: `1px solid ${activeCategory === cat ? '#8b2fc9' : '#2d0a4e'}`,
              background: activeCategory === cat ? '#2d0a4e40' : 'transparent',
              color: activeCategory === cat ? '#c0c0c0' : '#666',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div
        style={{
          columns: 'auto',
          columnWidth: '280px',
          gap: '16px',
        }}
      >
        {filtered.map((photo, i) => (
          <PhotoCard key={photo.src} photo={photo} index={i} onClick={() => setLightboxIndex(i)} />
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        index={lightboxIndex}
        styles={{ container: { backgroundColor: '#080808f0' } }}
      />
      </div>
    </section>
  )
}

function PhotoCard({ photo, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: (index % 2 === 0 ? -2 : 2) }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? -1 : 1, zIndex: 10 }}
      onClick={onClick}
      className="cursor-pointer"
      style={{
        breakInside: 'avoid',
        marginBottom: '16px',
        display: 'block',
        background: '#111',
        border: '1px solid #2d0a4e',
        padding: '10px 10px 4px',
        boxShadow: '0 4px 20px #00000080',
        position: 'relative',
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        loading="lazy"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.7rem',
          color: '#888',
          padding: '8px 4px 4px',
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}
      >
        {photo.caption}
      </p>
    </motion.div>
  )
}

export function SectionTitle({ emoji, icon, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '4rem', width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b2fc9' }}>
          {icon || <span style={{ fontSize: '2rem' }}>{emoji}</span>}
        </div>
        <h2
          className="font-cinzel"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #c0c0c0, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.1em',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: '#666', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginTop: '0.5rem', fontStyle: 'italic', textAlign: 'center' }}>
            {subtitle}
          </p>
        )}
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #8b2fc9, transparent)', marginTop: '1rem' }} />
      </motion.div>
    </div>
  )
}
