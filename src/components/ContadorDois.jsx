import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContadorDois() {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="py-16 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
        onClick={() => setRevealed(r => !r)}
      >
        {/* Número destaque */}
        <motion.div
          animate={{ opacity: revealed ? 0.15 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(5rem, 18vw, 10rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: '#8b2fc9',
            filter: 'drop-shadow(0 0 24px #8b2fc960)',
            cursor: 'pointer',
            userSelect: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          2
        </motion.div>

        {/* Pergunta */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p
              key="pergunta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                color: '#c0c0c0',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '-0.5rem',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              VCS SÃO CASADOS?
            </motion.p>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: '-0.5rem' }}
            >
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                color: '#8b2fc9',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}>
                VCS SÃO CASADOS?
              </p>
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.72rem',
                  color: '#555',
                  fontStyle: 'italic',
                  marginTop: '0.5rem',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}
              >
                esperando pela terceira vez kkkkkk
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!revealed && (
          <motion.p
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '0.6rem',
              color: '#333',
              letterSpacing: '0.3em',
              marginTop: '0.8rem',
              userSelect: 'none',
            }}
          >
            clica
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
