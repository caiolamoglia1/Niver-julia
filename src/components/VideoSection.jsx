import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from './GaleriaFotos'
import { Clapperboard } from 'lucide-react'

const VIDEOS = [
  { src: '/assets/cinema crepusculo.mp4', label: '🎬 no cinema vendo Twilight', caption: 'ela escolheu o filme. diz que foi sem querer.' },
  { src: '/assets/crepusculo  kkkk.mp4', label: '😂 crepúsculo kkkkk', caption: 'a reação dela vale mais que o filme inteiro.' },
  { src: '/assets/missa de 7 dia do porco monobola.mp4', label: '🐷 missa de 7 dia do porco monobola', caption: 'o evento cultural mais importante do ano.' },
  { src: '/assets/musica engraçada.mp4', label: '🎵 a música', caption: 'trabalho é osso.' },
  { src: '/assets/primeiro role ruinabar.mp4', label: '🍺 primeiro role no Ruína', caption: 'o primeiro de muitos.' },
  { src: '/assets/risadinha ruina.mp4', label: '😄 a risadinha no Ruína', caption: 'a risadinha ❤️' },
  { src: '/assets/Rw.mp4', label: '✨ RW', caption: 'mais um role, mais uma memória.' },
  { src: '/assets/Rw1.mp4', label: '✨ RW 2', caption: 'a noite que não queria acabar.' },
  { src: '/assets/segundo dia ruina.mp4', label: '🌃 segundo dia no Ruína', caption: 'voltamos. óbvio.' },
  { src: '/assets/prank the office.mp4', label: '😈 o prank do The Office', caption: 'ela ACHA que foi engraçado. foi.' },
]

export default function VideoSection() {
  return (
    <section style={{ width: '100%', padding: '5rem 1rem', background: 'linear-gradient(to bottom, #080808, #0a0010, #080808)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', width: '100%' }}>
        <SectionTitle icon={<Clapperboard size={34} strokeWidth={1.5} />} title="nossos vídeos" subtitle="coisas que a câmera conseguiu capturar" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 280px))',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video, index }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!playing) {
      videoRef.current?.play()
      setPlaying(true)
    } else {
      videoRef.current?.pause()
      setPlaying(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      style={{
        background: '#0f0f0f',
        border: '1px solid #2d0a4e',
        overflow: 'hidden',
        boxShadow: '0 0 30px #2d0a4e30',
      }}
    >
      {/* Video container */}
      <div className="relative" style={{ aspectRatio: '9/16', background: '#000', cursor: 'pointer' }} onClick={handlePlay}>
        <video
          ref={videoRef}
          src={video.src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loop
          playsInline
          onEnded={() => setPlaying(false)}
        />
        {/* Play overlay */}
        {!playing && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: '#00000060' }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '2px solid #8b2fc9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#8b2fc920',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span style={{ fontSize: '1.5rem', marginLeft: 4 }}>▶</span>
            </div>
          </div>
        )}
        {/* Neon top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #c41e3a, #8b2fc9, transparent)' }} />
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color: '#c0c0c0', letterSpacing: '0.05em' }}>
          {video.label}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#555', marginTop: 4, fontStyle: 'italic' }}>
          {video.caption}
        </p>
      </div>
    </motion.div>
  )
}
