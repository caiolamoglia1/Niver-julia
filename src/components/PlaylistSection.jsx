import { motion } from 'framer-motion'
import { SectionTitle } from './GaleriaFotos'
import { Music2 } from 'lucide-react'

export default function PlaylistSection() {
  return (
    <section style={{ width: '100%', padding: '5rem 1rem', background: 'linear-gradient(to bottom, #080808, #06000f, #080808)' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto', width: '100%' }}>
        <SectionTitle
          icon={<Music2 size={34} strokeWidth={1.5} />}
          title="nossa playlist"
          subtitle="as músicas que a gente ouviu... e ainda ouve"
        />

        {/* Animated sound waves */}
        <div className="flex justify-center items-end gap-1 mb-8" style={{ height: 40 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              style={{ width: 3, borderRadius: 2, background: `hsl(${270 + i * 4}, 70%, 55%)` }}
              animate={{ height: [8, 20 + Math.random() * 24, 8] }}
              transition={{ duration: 0.6 + Math.random() * 0.6, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Spotify embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            border: '1px solid #2d0a4e',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 0 40px #8b2fc920',
          }}
        >
          <iframe
            title="Nossa playlist"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1EJx0bJJJHff7u?utm_source=generator&theme=0"
            width="100%"
            height="452"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: '#555',
            fontStyle: 'italic',
          }}
        >
          Os gostos estão evoluindo com certeza kkkkkk mas tem umas pérolas aí no meio, viu? 🎶
        </motion.p>
      </div>
    </section>
  )
}
