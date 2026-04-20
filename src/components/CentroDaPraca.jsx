import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CentroDaPraca() {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="py-16 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        {/* Label acima */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.75rem',
                color: '#555',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
              }}
            >
              aqui é o que mesmo?
            </motion.p>
          ) : (
            <motion.p
              key="answer"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #c0c0c0, #d4af37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                filter: 'drop-shadow(0 0 12px #d4af3760)',
              }}
            >
              O CENTRO DA PRAÇA kkkkkkkk!!!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Card com visual de mira */}
        <motion.div
          onClick={() => setRevealed(r => !r)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: 200,
            height: 200,
            margin: '0 auto',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          {/* SVG mira */}
          <svg
            viewBox="0 0 200 200"
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          >
            {/* Outer square corners */}
            <line x1="30" y1="30" x2="80" y2="30" stroke="#555" strokeWidth="1.5" />
            <line x1="30" y1="30" x2="30" y2="80" stroke="#555" strokeWidth="1.5" />
            <line x1="170" y1="30" x2="120" y2="30" stroke="#555" strokeWidth="1.5" />
            <line x1="170" y1="30" x2="170" y2="80" stroke="#555" strokeWidth="1.5" />
            <line x1="30" y1="170" x2="80" y2="170" stroke="#555" strokeWidth="1.5" />
            <line x1="30" y1="170" x2="30" y2="120" stroke="#555" strokeWidth="1.5" />
            <line x1="170" y1="170" x2="120" y2="170" stroke="#555" strokeWidth="1.5" />
            <line x1="170" y1="170" x2="170" y2="120" stroke="#555" strokeWidth="1.5" />
            {/* Outer circle */}
            <circle cx="100" cy="100" r="72" fill="none" stroke="#444" strokeWidth="1" />
            {/* Inner disc */}
            <circle cx="100" cy="100" r="50" fill="#1a1a1a" />
            {/* Lens ring */}
            <circle cx="100" cy="100" r="48" fill="none" stroke="#333" strokeWidth="1" />
            {/* Center dot */}
            <motion.circle
              cx="100" cy="100" r="10"
              fill={revealed ? '#d4af37' : '#0ea5e9'}
              animate={revealed
                ? { r: [10, 14, 10] }
                : { r: [10, 12, 10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>

          {/* Glow pulse */}
          <motion.div
            animate={{
              boxShadow: revealed
                ? ['0 0 20px #d4af3740', '0 0 40px #d4af3780', '0 0 20px #d4af3740']
                : ['0 0 10px #0ea5e920', '0 0 24px #0ea5e940', '0 0 10px #0ea5e920'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem',
            color: '#555',
            marginTop: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          clica pra descobrir
        </motion.p>
      </motion.div>
    </section>
  )
}
