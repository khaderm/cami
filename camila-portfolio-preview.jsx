import React, { useState, useEffect } from 'react';

// Device detection hook for responsive design
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('mobile');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceType;
};


const CamilaPortfolioPreview = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeMockup, setActiveMockup] = useState(null);
  const deviceType = useDeviceType();

  const CORRECT_PASSWORD = 'camila2025';
  const heroImage = "images/cami.png";
  
  // Embedded video data
  const videos = {
    marcas: "videos/marcas.mp4",
    productos: "videos/freddo_marcas.mp4",
    eventos: "videos/food_eventos.mp4",
    baile: "videos/Baile.mp4"
  };

  const mockups = [
    { id: 1, name: 'Sin Bordes', description: 'UI minimalista que aparece al pasar el mouse' },
    { id: 2, name: 'Paneles Expansivos', description: 'Paneles verticales que se expanden' },
    { id: 3, name: 'Presentación Completa', description: 'Slides a pantalla completa con navegación' },
    { id: 4, name: 'Brutalista', description: 'Diseño audaz con texto delineado rojo' },
    { id: 5, name: 'Mosaico', description: 'Cuadrícula 2x2 con foto circular central' },
    { id: 6, name: 'Cinemático', description: 'Formato ultra-ancho estilo cine' },
    { id: 7, name: 'División Reveladora', description: 'Foto que se reduce para revelar video' },
    { id: 8, name: 'Portal Inmersivo', description: 'Portal circular que se abre para cada servicio' },
    { id: 9, name: 'Editorial Revista', description: 'Estilo revista elegante con tipografía serif' },
    { id: 10, name: 'Brillo Neón', description: 'Efectos de neón que cambian de color' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '60px 40px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', maxWidth: '400px', width: '90%' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 24px', border: '3px solid rgba(255,255,255,0.1)' }}>
            <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#fff', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>Camila Valdivia</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '0 0 40px 0' }}>Portfolio Preview · Acceso Privado</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              style={{
                width: '100%', padding: '16px 20px', fontSize: '15px', background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid #ff4757' : '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff',
                outline: 'none', marginBottom: '16px', boxSizing: 'border-box'
              }}
            />
            {error && <p style={{ color: '#ff4757', fontSize: '13px', margin: '0 0 16px 0' }}>{error}</p>}
            <button type="submit" style={{
              width: '100%', padding: '16px', fontSize: '15px', fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px',
              color: '#fff', cursor: 'pointer'
            }}>
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MOCKUP VIEWER
  if (activeMockup !== null) {
    const MockupComponent = getMockupComponent(activeMockup, heroImage, videos, deviceType);
    return (
      <div style={{ position: 'relative' }}>
        <button onClick={() => setActiveMockup(null)} style={{
          position: 'fixed', top: '20px', left: '20px', zIndex: 9999, padding: '12px 24px',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '30px', color: '#fff', fontSize: '13px', cursor: 'pointer'
        }}>
          ← Volver al menú
        </button>
        <MockupComponent />
      </div>
    );
  }

  // LANDING PAGE
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%)', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', padding: '60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 24px', border: '4px solid rgba(255,255,255,0.1)' }}>
            <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 200, color: '#fff', margin: '0 0 12px 0' }}>Camila Valdivia</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0 }}>Website Mockups · Selecciona un diseño</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockups.map((mockup, index) => (
            <button
              key={mockup.id}
              onClick={() => setActiveMockup(mockup.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '20px', padding: '24px 28px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', cursor: 'pointer', textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, minWidth: '24px' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '18px', color: '#fff', fontWeight: 500, display: 'block', marginBottom: '4px' }}>{mockup.name}</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{mockup.description}</span>
              </div>
              <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.3)' }}>→</span>
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            Contraseña: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>camila2025</code>
          </p>
        </div>
      </div>
    </div>
  );
};

const WhatsAppIcon = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const VideoPlayer = ({ src, deviceType = 'mobile' }) => {
  const getVideoStyles = () => {
    const baseStyles = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };

    if (deviceType === 'desktop') {
      return {
        ...baseStyles,
        objectPosition: 'center center',
        maxHeight: '80vh',
      };
    } else if (deviceType === 'tablet') {
      return {
        ...baseStyles,
        objectPosition: 'center center',
        maxHeight: '70vh',
      };
    }
    // Mobile
    return {
      ...baseStyles,
      objectPosition: 'center top',
    };
  };

  return (
    <video 
      src={src} 
      autoPlay 
      loop 
      muted 
      playsInline 
      style={getVideoStyles()} 
    />
  );
};

function getMockupComponent(id, heroImage, videos, deviceType) {
  const components = {
    1: () => <Mockup01 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    2: () => <Mockup02 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    3: () => <Mockup03 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    4: () => <Mockup04 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    5: () => <Mockup05 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    6: () => <Mockup06 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    7: () => <Mockup07 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    8: () => <Mockup08 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    9: () => <Mockup09 heroImage={heroImage} videos={videos} deviceType={deviceType} />,
    10: () => <Mockup10 heroImage={heroImage} videos={videos} deviceType={deviceType} />
  };
  return components[id] || (() => <div>Not found</div>);
}

// Mockup 01 - Zero Chrome
const Mockup01 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const [showUI, setShowUI] = useState(false);
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden' }}
         onMouseEnter={() => setShowUI(true)} onMouseLeave={() => setShowUI(false)}>
      <div style={{ position: 'absolute', inset: 0 }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0 }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', bottom: '120px', left: '48px', zIndex: 10 }}>
              <span style={{ color: '#fff', fontSize: 'clamp(56px, 12vw, 120px)', fontWeight: 200 }}>{services[activeService].title}</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ opacity: showUI ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: showUI ? 'auto' : 'none' }}>
        <h1 style={{ position: 'absolute', bottom: '48px', left: '48px', fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 200, color: '#fff', margin: 0, mixBlendMode: 'difference' }}>Camila<br/>Valdivia</h1>
        <div style={{ position: 'absolute', bottom: '48px', right: '120px', display: 'flex', gap: '24px' }}>
          {services.map((s, i) => (
            <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
              style={{ background: 'transparent', border: 'none', color: activeService === i ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '14px', cursor: 'pointer', padding: '8px 0', borderBottom: activeService === i ? '1px solid #fff' : '1px solid transparent' }}>{s.title}</button>
          ))}
        </div>
        <header style={{ position: 'absolute', top: '32px', left: '48px', right: '48px', display: 'flex', justifyContent: 'space-between' }}>
          <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Lima, Perú</span>
        </header>
        <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
          position: 'fixed', bottom: '48px', right: '48px', width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <WhatsAppIcon size={24} color="#fff" />
        </button>
      </div>
    </div>
  );
};

// Mockup 02 - Expanding Panels
const Mockup02 = ({ heroImage, videos, deviceType }) => {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const panels = [
    { title: 'Camila', subtitle: 'Valdivia', type: 'hero' },
    { title: 'Marcas', type: 'video', video: videos.marcas },
    { title: 'Productos', type: 'video', video: videos.productos },
    { title: 'Eventos', type: 'video', video: videos.eventos },
    { title: 'Baile', type: 'video', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', display: 'flex' }}>
      {panels.map((panel, i) => (
        <div key={i} onMouseEnter={() => setHoveredPanel(i)} onMouseLeave={() => setHoveredPanel(null)}
          style={{ flex: hoveredPanel === i ? 3 : (hoveredPanel === null ? 1 : 0.5), height: '100%', position: 'relative', borderRight: i < panels.length - 1 ? '1px solid #1a1a1a' : 'none', cursor: 'pointer', transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden' }}>
          {panel.type === 'hero' ? (
            <>
              <img src={heroImage} alt="Camila" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.4)', padding: '40px', borderRadius: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', letterSpacing: '0.3em', display: 'block', marginBottom: '16px' }}>LIMA, PERÚ</span>
                  <h1 style={{ fontSize: hoveredPanel === i ? 'clamp(48px, 8vw, 80px)' : 'clamp(24px, 4vw, 36px)', fontWeight: 200, color: '#fff', margin: 0, transition: 'font-size 0.5s ease' }}>{panel.title}<br/>{panel.subtitle}</h1>
                </div>
              </div>
            </>
          ) : (
            <div style={{ background: '#0a0a0a', position: 'absolute', inset: 0 }}>
              {hoveredPanel === i && <VideoPlayer src={panel.video} deviceType={deviceType} />}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: hoveredPanel === i ? 'rgba(0,0,0,0.3)' : 'transparent' }}>
                <span style={{ color: '#fff', fontSize: hoveredPanel === i ? '48px' : '18px', fontWeight: 200, writingMode: hoveredPanel === i ? 'horizontal-tb' : 'vertical-rl', transition: 'all 0.5s ease' }}>{panel.title}</span>
              </div>
            </div>
          )}
        </div>
      ))}
      <header style={{ position: 'fixed', top: '24px', left: '32px', zIndex: 100 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '24px', right: '24px', height: '44px', borderRadius: '22px',
        background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer', padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1000
      }}>
        <WhatsAppIcon size={18} color="#fff" />
        <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>Chat</span>
      </button>
    </div>
  );
};

// Mockup 03 - Slideshow
const Mockup03 = ({ heroImage, videos, deviceType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { type: 'photo', title: 'Camila Valdivia' },
    { type: 'video', title: 'Marcas', video: videos.marcas },
    { type: 'video', title: 'Productos', video: videos.productos },
    { type: 'video', title: 'Eventos', video: videos.eventos },
    { type: 'video', title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden' }}>
      {slides.map((slide, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: currentSlide === i ? 1 : 0, transition: 'opacity 0.8s ease', zIndex: currentSlide === i ? 1 : 0 }}>
          {slide.type === 'photo' ? (
            <>
              <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              <h1 style={{ position: 'absolute', bottom: '80px', left: '80px', fontSize: 'clamp(64px, 15vw, 180px)', fontWeight: 200, color: '#fff', margin: 0, lineHeight: 0.9 }}>Camila<br/>Valdivia</h1>
            </>
          ) : (
            <>
              {currentSlide === i && <VideoPlayer src={slide.video} deviceType={deviceType} />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
              <span style={{ position: 'absolute', bottom: '80px', left: '80px', color: '#fff', fontSize: 'clamp(48px, 10vw, 100px)', fontWeight: 200 }}>{slide.title}</span>
            </>
          )}
        </div>
      ))}
      <div style={{ position: 'fixed', bottom: '48px', left: '48px', zIndex: 100 }}>
        <span style={{ color: '#fff', fontSize: '64px', fontWeight: 200 }}>0{currentSlide + 1}</span>
        <span style={{ color: '#333', fontSize: '24px' }}>/0{slides.length}</span>
      </div>
      <div style={{ position: 'fixed', bottom: '48px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 100 }}>
        {slides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide === i ? '48px' : '12px', height: '12px', borderRadius: '6px', background: currentSlide === i ? '#fff' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease' }} />))}
      </div>
      <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} style={{ position: 'fixed', left: '48px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: currentSlide === 0 ? '#222' : '#fff', fontSize: '48px', cursor: 'pointer', zIndex: 100 }}>←</button>
      <button onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))} style={{ position: 'fixed', right: '120px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: currentSlide === slides.length - 1 ? '#222' : '#fff', fontSize: '48px', cursor: 'pointer', zIndex: 100 }}>→</button>
      <header style={{ position: 'fixed', top: '32px', left: '48px', right: '48px', display: 'flex', justifyContent: 'space-between', zIndex: 100 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>LIMA, PERÚ</span>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '48px', right: '48px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1000
      }}>
        <span style={{ color: '#555', fontSize: '14px' }}>WhatsApp</span>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <WhatsAppIcon size={20} color="#fff" />
        </div>
      </button>
    </div>
  );
};

// Mockup 04 - Brutalist
const Mockup04 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'MARCAS', video: videos.marcas },
    { title: 'PRODUCTOS', video: videos.productos },
    { title: 'EVENTOS', video: videos.eventos },
    { title: 'BAILE', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: '"Arial Black", Impact, sans-serif', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0 }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        ) : (
          <>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ fontSize: 'clamp(80px, 20vw, 200px)', fontWeight: 900, color: '#fff' }}>{services[activeService].title}</span>
            </div>
          </>
        )}
      </div>
      <h1 style={{ position: 'fixed', bottom: '-0.1em', left: '-2%', fontSize: 'clamp(120px, 28vw, 350px)', fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px #ff3333', margin: 0, pointerEvents: 'none', zIndex: 10 }}>CAMILA</h1>
      <div style={{ position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', zIndex: 20 }}>
        {services.map((service, i) => (
          <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
            style={{ background: activeService === i ? '#ff3333' : 'rgba(0,0,0,0.5)', color: '#fff', border: '2px solid #ff3333', padding: '20px 40px', fontSize: '14px', fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer' }}>{service.title}</button>
        ))}
      </div>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', zIndex: 30 }}>
        <span style={{ color: '#ff3333', fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em' }}>LIMA PERÚ</span>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px', fontWeight: 900 }}>@CAMILA.VALDIVIAA</a>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '24px', right: '24px', padding: '16px 24px', background: '#ff3333', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1000
      }}>
        <WhatsAppIcon size={20} color="#000" />
        <span style={{ color: '#000', fontSize: '12px', fontWeight: 900 }}>CHAT</span>
      </button>
    </div>
  );
};

// Mockup 05 - Mosaic
const Mockup05 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#0a0a0a', fontFamily: '-apple-system, sans-serif', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', height: '100%', gap: '2px' }}>
        {services.map((service, i) => (
          <div key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
            style={{ background: '#0f0f0f', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
            {activeService === i && <div style={{ position: 'absolute', inset: 0 }}><VideoPlayer src={service.video} deviceType={deviceType} /></div>}
            <div style={{ position: 'absolute', inset: 0, background: activeService === i ? 'rgba(0,0,0,0.4)' : (activeService !== null ? 'rgba(0,0,0,0.7)' : 'transparent'), transition: 'background 0.4s', zIndex: 5 }} />
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              <span style={{ fontSize: '12px', color: activeService === i ? '#fff' : '#333', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>0{i + 1}</span>
              <span style={{ color: activeService === i ? '#fff' : '#444', fontSize: activeService === i ? '42px' : '24px', fontWeight: 300, transition: 'all 0.4s' }}>{service.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 100, opacity: activeService === null ? 1 : 0, transition: 'opacity 0.4s' }}>
        <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '3px solid rgba(255,255,255,0.2)' }}>
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 200, color: '#fff', margin: 0 }}>Camila Valdivia</h1>
        <p style={{ color: '#555', fontSize: '13px', marginTop: '8px' }}>Influencer · Lima, Perú</p>
      </div>
      <header style={{ position: 'fixed', top: '24px', left: '32px', zIndex: 200 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '48px', height: '48px', background: '#0f0f0f', border: '1px solid #1a1a1a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={20} color="#555" />
      </button>
    </div>
  );
};

// Mockup 06 - Letterbox
const Mockup06 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#000', fontFamily: '-apple-system, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ height: '12vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 300, color: '#fff', margin: 0, letterSpacing: '0.1em' }}>CAMILA VALDIVIA</h1>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>@camila.valdiviaa</a>
      </div>
      <div style={{ width: '100%', height: '76vh', position: 'relative', overflow: 'hidden' }}>
        {activeService === null ? (
          <>
            <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)' }} />
            <h2 style={{ position: 'absolute', bottom: '60px', left: '60px', fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 200, color: '#fff', margin: 0 }}>Influencer</h2>
          </>
        ) : (
          <>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)' }} />
            <span style={{ position: 'absolute', bottom: '60px', left: '60px', color: '#fff', fontSize: '72px', fontWeight: 200 }}>{services[activeService].title.toUpperCase()}</span>
          </>
        )}
      </div>
      <div style={{ height: '12vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
        {services.map((service, i) => (
          <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
            style={{ background: activeService === i ? '#fff' : 'transparent', color: activeService === i ? '#000' : '#444', border: 'none', padding: '16px 40px', fontSize: '12px', letterSpacing: '0.15em', cursor: 'pointer' }}>{service.title.toUpperCase()}</button>
        ))}
        <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
          background: 'transparent', color: '#444', border: 'none', padding: '16px 40px', fontSize: '12px', letterSpacing: '0.15em', cursor: 'pointer', marginLeft: '20px', borderLeft: '1px solid #222'
        }}>WHATSAPP</button>
      </div>
    </div>
  );
};

// Mockup 07 - Split Reveal
const Mockup07 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', display: 'flex' }}>
      <div style={{ width: activeService !== null ? '30%' : '50%', height: '100%', position: 'relative', transition: 'width 0.6s ease', overflow: 'hidden' }}>
        <img src={heroImage} alt="Camila" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: '60px', left: '40px', zIndex: 10 }}>
          <h1 style={{ fontSize: activeService !== null ? 'clamp(28px, 4vw, 36px)' : 'clamp(36px, 6vw, 56px)', fontWeight: 200, color: '#fff', margin: 0, transition: 'font-size 0.6s' }}>Camila<br/>Valdivia</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '16px' }}>Influencer · Lima</p>
          <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', display: 'block', marginTop: '8px' }}>@camila.valdiviaa</a>
        </div>
      </div>
      <div style={{ flex: 1, height: '100%', background: '#0f0f0f', position: 'relative', overflow: 'hidden' }}>
        {activeService !== null && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '64px', fontWeight: 200 }}>{services[activeService].title}</span>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
          {services.map((service, i) => (
            <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
              style={{ background: activeService === i ? '#fff' : 'transparent', color: activeService === i ? '#000' : '#444', border: 'none', padding: '16px 32px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textAlign: 'right' }}>{service.title}</button>
          ))}
        </div>
      </div>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '32px', left: '40px', height: '48px', borderRadius: '24px', background: '#fff', border: 'none', cursor: 'pointer', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1000
      }}>
        <WhatsAppIcon size={18} color="#000" />
        <span style={{ color: '#000', fontSize: '13px', fontWeight: 500 }}>Contactar</span>
      </button>
    </div>
  );
};

// Mockup 08 - Portal
const Mockup08 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }} />
      </div>
      {activeService !== null && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 'min(80vw, 80vh)', height: 'min(80vw, 80vh)', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ color: '#fff', fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 200 }}>{services[activeService].title}</span>
            </div>
          </div>
        </div>
      )}
      <h1 style={{ position: 'absolute', bottom: '40px', left: '40px', fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 200, color: '#fff', margin: 0, zIndex: 10 }}>Camila<br/>Valdivia</h1>
      <div style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 20 }}>
        {services.map((service, i) => (
          <div key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
            <span style={{ color: activeService === i ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: '13px', opacity: activeService === i ? 1 : 0, transform: activeService === i ? 'translateX(0)' : 'translateX(10px)', transition: 'all 0.3s' }}>{service.title}</span>
            <div style={{ width: activeService === i ? '48px' : '12px', height: '12px', borderRadius: '6px', background: activeService === i ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s' }} />
          </div>
        ))}
      </div>
      <header style={{ position: 'absolute', top: '32px', left: '40px', zIndex: 30 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
        <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 12px' }}>·</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Lima, Perú</span>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '32px', right: '40px', width: '56px', height: '56px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={24} color="#fff" />
      </button>
    </div>
  );
};

// Mockup 09 - Editorial
const Mockup09 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ height: '100vh', background: '#f8f6f3', fontFamily: 'Georgia, serif', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '8%', left: '8%', right: '8%', bottom: '8%', overflow: 'hidden' }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ color: '#fff', fontSize: '56px', fontStyle: 'italic' }}>{services[activeService].title}</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', top: '10%', left: '3%', transform: 'rotate(-90deg) translateX(-100%)', transformOrigin: 'top left' }}>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontStyle: 'italic', color: '#1a1a1a', margin: 0, whiteSpace: 'nowrap' }}>Camila Valdivia</h1>
      </div>
      <div style={{ position: 'absolute', top: '3%', right: '3%', textAlign: 'right', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: '11px', color: '#999', letterSpacing: '0.2em', display: 'block' }}>LIMA, PERÚ</span>
        <span style={{ fontSize: '11px', color: '#999', letterSpacing: '0.2em' }}>2025</span>
      </div>
      <div style={{ position: 'absolute', bottom: '3%', left: '8%', right: '8%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          {services.map((service, i) => (
            <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
              style={{ background: 'none', border: 'none', padding: '12px 0', fontSize: '14px', fontStyle: 'italic', color: activeService === i ? '#1a1a1a' : '#999', cursor: 'pointer', borderBottom: activeService === i ? '2px solid #1a1a1a' : '2px solid transparent', fontFamily: 'Georgia, serif' }}>{service.title}</button>
          ))}
        </div>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', fontSize: '12px', fontFamily: 'sans-serif' }}>@camila.valdiviaa</a>
      </div>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '3%', right: '3%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #ccc'
      }}>
        <WhatsAppIcon size={16} color="#1a1a1a" />
        <span style={{ color: '#1a1a1a', fontSize: '13px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Escríbeme</span>
      </button>
    </div>
  );
};

// Mockup 10 - Neon
const Mockup10 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const services = [
    { title: 'Marcas', color: '#ff00ff', video: videos.marcas },
    { title: 'Productos', color: '#00ffff', video: videos.productos },
    { title: 'Eventos', color: '#ff6600', video: videos.eventos },
    { title: 'Baile', color: '#00ff88', video: videos.baile }
  ];
  const activeColor = activeService !== null ? services[activeService].color : '#fff';

  return (
    <div style={{ height: '100vh', background: '#050508', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', position: 'relative' }}>
      {activeService !== null && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', borderRadius: '50%', background: 'radial-gradient(circle, ' + activeColor + '30 0%, transparent 60%)', pointerEvents: 'none', zIndex: 5 }} />
      )}
      <div style={{ position: 'absolute', top: '5%', left: '5%', right: '5%', bottom: '5%', border: '1px solid ' + (activeService !== null ? activeColor : '#1a1a2e'), overflow: 'hidden', transition: 'border-color 0.4s' }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ color: activeColor, fontSize: '56px', fontWeight: 300, textShadow: '0 0 40px ' + activeColor + '80' }}>{services[activeService].title}</span>
            </div>
          </div>
        )}
      </div>
      <h1 style={{ position: 'absolute', bottom: '12%', left: '8%', fontSize: 'clamp(48px, 10vw, 100px)', fontWeight: 200, color: '#fff', margin: 0, textShadow: activeService !== null ? '0 0 60px ' + activeColor + '60' : 'none', transition: 'text-shadow 0.4s', zIndex: 10 }}>Camila Valdivia</h1>
      <div style={{ position: 'absolute', bottom: '5%', right: '8%', display: 'flex', gap: '8px', zIndex: 20 }}>
        {services.map((service, i) => (
          <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
            style={{ background: activeService === i ? service.color : 'rgba(0,0,0,0.5)', color: activeService === i ? '#000' : service.color, border: '1px solid ' + service.color, padding: '14px 28px', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', cursor: 'pointer', boxShadow: activeService === i ? '0 0 30px ' + service.color + '60' : 'none' }}>{service.title.toUpperCase()}</button>
        ))}
      </div>
      <header style={{ position: 'absolute', top: '5%', left: '8%', right: '8%', display: 'flex', justifyContent: 'space-between', zIndex: 30 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>LIMA, PERÚ</span>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '5%', left: '8%', width: '56px', height: '56px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)', border: '1px solid ' + activeColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, boxShadow: activeService !== null ? '0 0 30px ' + activeColor + '40' : 'none', transition: 'all 0.4s'
      }}>
        <WhatsAppIcon size={24} color={activeColor} />
      </button>
    </div>
  );
};

export default CamilaPortfolioPreview;
