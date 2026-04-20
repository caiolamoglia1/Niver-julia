import { motion } from 'framer-motion'
import { Bug, Moon, Music, MessageCircle, Eye, Flower2 } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 40%, #2d0a4e30 0%, #080808 70%)' }}
    >
      {/* Backdrop: crepúsculo */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url('/assets/crepusculo filme.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'blur(4px) saturate(0.3)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #08080800, #080808ee 90%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p
            className="font-cinzel tracking-[0.4em] uppercase mb-4"
            style={{ color: '#8b2fc9', fontSize: '0.75rem' }}
          >
            ✦ um site pra você ✦
          </p>
          <h1
            className="font-cinzel-deco"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #c0c0c0 0%, #ffffff 30%, #d4af37 60%, #c0c0c0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              textShadow: 'none',
            }}
          >
            Julia
          </h1>
          <p
            className="font-cinzel mt-3"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#8b2fc9', letterSpacing: '0.3em' }}
          >
            🖤 vinte anos 🖤
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 max-w-xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            color: '#888888',
            lineHeight: 1.8,
            fontStyle: 'italic',
          }}
        >
          "Crendios, 20 aninhos.{' '}
          <span style={{ color: '#d4af37' }}>Daqui um tempinho a gente vai estar de bumblebee.</span>"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex justify-center gap-3 flex-wrap"
        >
          {[
            { icon: <Bug size={26} strokeWidth={1.5} />, color: '#c41e3a' },
            { icon: <Moon size={26} strokeWidth={1.5} />, color: '#4a7fb5' },
            { icon: <Music size={26} strokeWidth={1.5} />, color: '#d4af37' },
            { icon: <MessageCircle size={26} strokeWidth={1.5} />, color: '#c9a96e' },
            { icon: <Eye size={26} strokeWidth={1.5} />, color: '#8b2fc9' },
            { icon: <Flower2 size={26} strokeWidth={1.5} />, color: '#c41e3a' },
          ].map((item, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-flex', cursor: 'default', color: item.color, filter: `drop-shadow(0 0 6px ${item.color}80)` }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {item.icon}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-14"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a
            href="#galeria"
            style={{
              color: '#d4af3780',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
            }}
          >
            ↓ role pra ver tudo ↓
          </a>
        </motion.div>
      </div>
    </section>
  )
}
