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
      <div style={{ minHeight: '100vh', height: '100dvh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
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
      <div style={{ position: 'relative', maxWidth: '100vw', width: '100%', overflowX: 'hidden' }}>
        <button onClick={() => setActiveMockup(null)} style={{
          position: 'fixed', top: '20px', left: '20px', zIndex: 9999, padding: '12px 24px',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '30px', color: '#fff', fontSize: '13px', cursor: 'pointer'
        }}>
          ← Volver al menú
        </button>
        <div style={{ maxWidth: '100vw', width: '100%', overflowX: 'hidden' }}>
          <MockupComponent />
        </div>
      </div>
    );
  }

  // LANDING PAGE
  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%)', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', padding: '60px 20px' }}>
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

const VideoPlayer = ({ src, deviceType = 'mobile', loaderColor = '#fff' }) => {
  const [isLoading, setIsLoading] = useState(true);

  const getVideoStyles = () => {
    const baseStyles = {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };

    if (deviceType === 'desktop') {
      return {
        ...baseStyles,
        objectPosition: 'center center',
      };
    } else if (deviceType === 'tablet') {
      return {
        ...baseStyles,
        objectPosition: 'center center',
      };
    }
    // Mobile
    return {
      ...baseStyles,
      objectPosition: 'center top',
    };
  };

  const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32px',
    height: '32px',
    border: `3px solid ${loaderColor}30`,
    borderTopColor: loaderColor,
    borderRadius: '50%',
    animation: 'videoSpinner 0.8s linear infinite',
    zIndex: 10,
    opacity: isLoading ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  };

  return (
    <>
      <style>
        {`
          @keyframes videoSpinner {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={getVideoStyles()}
        onCanPlay={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
      />
    </>
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
  const [showUI, setShowUI] = useState(true);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden' }}
         onMouseEnter={() => setShowUI(true)} onMouseLeave={() => !isMobile && setShowUI(false)}>
      {/* Background layer - always present, no layout shifts */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Hero image - always rendered, fades out when video active */}
        <img
          src={heroImage}
          alt="Camila"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center top' : 'center 20%',
            opacity: activeService === null ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
        {/* Video container - always present to prevent layout shifts */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: activeService !== null ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          {/* Grey overlay when video is playing */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1 }} />
          {/* Render all videos but only show active one */}
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: activeService === i ? 1 : 0,
                visibility: activeService === i ? 'visible' : 'hidden'
              }}
            >
              <VideoPlayer src={s.video} deviceType={deviceType} loaderColor="#fff" />
            </div>
          ))}
          {/* Service title overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: isMobile ? '24px' : '48px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: activeService !== null ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}>
            <span style={{
              color: '#fff',
              fontSize: isMobile ? '48px' : 'clamp(56px, 12vw, 120px)',
              fontWeight: 200,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)'
            }}>
              {activeService !== null ? services[activeService].title : ''}
            </span>
          </div>
        </div>
      </div>
      {/* UI layer - completely isolated from background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: showUI ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: showUI ? 'auto' : 'none'
      }}>
        <h1 style={{
          position: 'absolute',
          bottom: isMobile ? '180px' : '48px',
          left: isMobile ? '24px' : '48px',
          fontSize: isMobile ? '36px' : 'clamp(42px, 8vw, 80px)',
          fontWeight: 200,
          color: '#fff',
          margin: 0,
          mixBlendMode: 'difference',
          pointerEvents: 'none'
        }}>Camila<br/>Valdivia</h1>
        {/* Button container with isolation */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '24px' : '48px',
          left: isMobile ? '32px' : 'auto',
          right: isMobile ? '24px' : '120px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? '12px' : '24px',
          justifyContent: isMobile ? 'flex-start' : 'flex-end',
          zIndex: 100,
          isolation: 'isolate'
        }}>
          {services.map((s, i) => (
            <button key={i}
              onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
              onMouseEnter={() => !isMobile && setActiveService(i)}
              onMouseLeave={() => !isMobile && setActiveService(null)}
              style={{
                background: activeService === i ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                color: activeService === i ? '#fff' : 'rgba(255,255,255,0.8)',
                fontSize: isMobile ? '12px' : '14px',
                cursor: 'pointer',
                padding: isMobile ? '8px 16px' : '10px 20px',
                width: isMobile ? 'auto' : '100px',
                height: isMobile ? '32px' : '40px',
                boxSizing: 'border-box',
                transition: 'background 0.2s ease, color 0.2s ease',
                flexShrink: 0,
                position: 'relative',
                zIndex: 101
              }}>{s.title}</button>
          ))}
        </div>
        <header style={{ position: 'absolute', top: '32px', left: isMobile ? '24px' : '48px', right: isMobile ? '24px' : '48px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'auto' }}>
          <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Lima, Perú</span>
        </header>
        <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
          position: 'fixed', bottom: isMobile ? '80px' : '48px', right: isMobile ? '24px' : '48px', width: '48px', height: '48px', borderRadius: '50%',
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
  const [activePanel, setActivePanel] = useState(null);
  const isMobile = deviceType === 'mobile';
  const panels = [
    { title: 'Camila', subtitle: 'Valdivia', type: 'hero' },
    { title: 'Marcas', type: 'video', video: videos.marcas },
    { title: 'Productos', type: 'video', video: videos.productos },
    { title: 'Eventos', type: 'video', video: videos.eventos },
    { title: 'Baile', type: 'video', video: videos.baile }
  ];

  // Get panel flex value - works the same for both mobile and desktop (horizontal layout)
  const getPanelFlex = (index) => {
    // On mobile, when a panel is active (tapped), it expands
    if (isMobile) {
      if (activePanel !== null) {
        return activePanel === index ? 4 : 0.5;
      }
      // Default: hero is larger, others share the rest
      return index === 0 ? 6 : 1;
    }
    // Desktop hover behavior
    if (hoveredPanel !== null) {
      return hoveredPanel === index ? 4 : 0.5;
    }
    // Default: hero is 75%, others are 6.25% each (12 + 1 + 1 + 1 + 1 = 16, so 12/16 = 75%)
    return index === 0 ? 12 : 1;
  };

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', overflowX: 'hidden', display: 'flex', flexDirection: 'row', margin: 0, padding: 0, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      {panels.map((panel, i) => (
        <div key={i}
          onClick={() => {
            if (isMobile) {
              if (panel.type === 'hero') {
                // Clicking hero panel resets to default state
                setActivePanel(null);
              } else {
                // Toggle video panels
                setActivePanel(activePanel === i ? null : i);
              }
            }
          }}
          onMouseEnter={() => !isMobile && setHoveredPanel(i)}
          onMouseLeave={() => !isMobile && setHoveredPanel(null)}
          style={{
            flex: getPanelFlex(i),
            height: '100%',
            position: 'relative',
            borderRight: i < panels.length - 1 ? '1px solid #1a1a1a' : 'none',
            cursor: 'pointer',
            transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            minWidth: 0
          }}>
          {panel.type === 'hero' ? (
            <>
              <img src={heroImage} alt="Camila" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 20%' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: isMobile ? '15%' : '10%' }}>
                <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.4)', padding: isMobile ? '12px 16px' : '40px 80px', borderRadius: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? '8px' : '11px', letterSpacing: '0.3em', display: 'block', marginBottom: isMobile ? '6px' : '16px' }}>LIMA, PERÚ</span>
                  <h1 style={{ fontSize: isMobile ? (activePanel === i || activePanel === null ? '18px' : '12px') : (hoveredPanel === i ? 'clamp(48px, 8vw, 80px)' : 'clamp(24px, 4vw, 36px)'), fontWeight: 200, color: '#fff', margin: 0, transition: 'font-size 0.5s ease', whiteSpace: 'nowrap' }}>{panel.title}<br/>{panel.subtitle}</h1>
                </div>
              </div>
            </>
          ) : (
            <div style={{ background: '#0a0a0a', position: 'absolute', inset: 0 }}>
              {(hoveredPanel === i || activePanel === i) && <VideoPlayer src={panel.video} deviceType={deviceType} loaderColor="#fff" />}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: (hoveredPanel === i || activePanel === i) ? 'rgba(0,0,0,0.3)' : 'transparent' }}>
                <span style={{
                  color: '#fff',
                  fontSize: isMobile ? (activePanel === i ? '24px' : '12px') : ((hoveredPanel === i || activePanel === i) ? '48px' : '24px'),
                  fontWeight: 200,
                  transition: 'all 0.5s ease',
                  writingMode: isMobile && activePanel !== i ? 'vertical-rl' : 'horizontal-tb',
                  textOrientation: 'mixed'
                }}>{panel.title}</span>
              </div>
            </div>
          )}
        </div>
      ))}
      <header style={{ position: 'fixed', top: '24px', left: isMobile ? '16px' : '32px', zIndex: 100 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: isMobile ? '11px' : '13px' }}>@camila.valdiviaa</a>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '44px', height: '44px', borderRadius: '50%',
        background: '#1a1a1a', border: '1px solid #333', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={18} color="#fff" />
      </button>
    </div>
  );
};

// Mockup 03 - Slideshow
const Mockup03 = ({ heroImage, videos, deviceType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = deviceType === 'mobile';
  const slides = [
    { type: 'photo', title: 'Camila Valdivia' },
    { type: 'video', title: 'Marcas', video: videos.marcas },
    { type: 'video', title: 'Productos', video: videos.productos },
    { type: 'video', title: 'Eventos', video: videos.eventos },
    { type: 'video', title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden' }}>
      {slides.map((slide, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: currentSlide === i ? 1 : 0, transition: 'opacity 0.8s ease', zIndex: currentSlide === i ? 1 : 0 }}>
          {slide.type === 'photo' ? (
            <>
              <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 20%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              <h1 style={{ position: 'absolute', bottom: isMobile ? '200px' : '140px', left: isMobile ? '50%' : '80px', transform: isMobile ? 'translateX(-50%)' : 'none', textAlign: isMobile ? 'center' : 'left', fontSize: isMobile ? '48px' : 'clamp(64px, 15vw, 180px)', fontWeight: 200, color: '#fff', margin: 0, lineHeight: 0.9 }}>Camila<br/>Valdivia</h1>
            </>
          ) : (
            <>
              {currentSlide === i && <VideoPlayer src={slide.video} deviceType={deviceType} loaderColor="#fff" />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
              <span style={{ position: 'absolute', bottom: isMobile ? '200px' : '140px', left: isMobile ? '50%' : '80px', transform: isMobile ? 'translateX(-50%)' : 'none', textAlign: isMobile ? 'center' : 'left', color: '#fff', fontSize: isMobile ? '36px' : 'clamp(48px, 10vw, 100px)', fontWeight: 200 }}>{slide.title}</span>
            </>
          )}
        </div>
      ))}
      <div style={{ position: 'fixed', bottom: '48px', left: '48px', zIndex: 100 }}>
        <span style={{ color: '#fff', fontSize: '64px', fontWeight: 200 }}>0{currentSlide + 1}</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px' }}>/0{slides.length}</span>
      </div>
      <div style={{ position: 'fixed', bottom: '48px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 100 }}>
        {slides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide === i ? '48px' : '12px', height: '12px', borderRadius: '6px', background: currentSlide === i ? '#fff' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease' }} />))}
      </div>
      <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} style={{ position: 'fixed', left: isMobile ? '16px' : '48px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: currentSlide === 0 ? '#222' : '#fff', fontSize: isMobile ? '36px' : '48px', cursor: 'pointer', zIndex: 100 }}>←</button>
      <button onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))} style={{ position: 'fixed', right: isMobile ? '16px' : '48px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: currentSlide === slides.length - 1 ? '#222' : '#fff', fontSize: isMobile ? '36px' : '48px', cursor: 'pointer', zIndex: 100 }}>→</button>
      <header style={{ position: 'fixed', top: '32px', left: '48px', right: '48px', display: 'flex', justifyContent: 'space-between', zIndex: 100 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>LIMA, PERÚ</span>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '48px', right: '48px', width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={20} color="#fff" />
      </button>
    </div>
  );
};

// Mockup 04 - Brutalist
const Mockup04 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'MARCAS', video: videos.marcas },
    { title: 'PRODUCTOS', video: videos.productos },
    { title: 'EVENTOS', video: videos.eventos },
    { title: 'BAILE', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#000', fontFamily: '"Arial Black", Impact, sans-serif', overflow: 'hidden', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0 }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 20%' }} />
        ) : (
          <>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor="#ff3333" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ fontSize: isMobile ? '48px' : 'clamp(80px, 20vw, 200px)', fontWeight: 900, color: '#fff' }}>{services[activeService].title}</span>
            </div>
          </>
        )}
      </div>
      <h1 style={{ position: 'fixed', bottom: '-0.1em', left: isMobile ? '5%' : '2%', fontSize: isMobile ? '64px' : 'clamp(120px, 28vw, 350px)', fontWeight: 900, color: 'transparent', WebkitTextStroke: isMobile ? '1px #ff3333' : '2px #ff3333', margin: 0, pointerEvents: 'none', zIndex: 10 }}>CAMILA</h1>
      <div style={{ position: 'fixed', top: isMobile ? 'auto' : '50%', bottom: isMobile ? '80px' : 'auto', left: isMobile ? '16px' : 'auto', right: isMobile ? '16px' : 0, transform: isMobile ? 'none' : 'translateY(-50%)', display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: isMobile ? '8px' : '0', justifyContent: isMobile ? 'center' : 'flex-start', zIndex: 20 }}>
        {services.map((service, i) => (
          <button key={i}
            onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
            onMouseEnter={() => !isMobile && setActiveService(i)}
            onMouseLeave={() => !isMobile && setActiveService(null)}
            style={{
              background: activeService === i ? '#ff3333' : 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: '2px solid #ff3333',
              padding: isMobile ? '12px 16px' : '20px 40px',
              fontSize: isMobile ? '11px' : '14px',
              fontWeight: 900,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              minWidth: isMobile ? 'auto' : '140px',
              boxSizing: 'border-box',
              transition: 'background 0.2s ease'
            }}>{service.title}</button>
        ))}
      </div>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', zIndex: 30 }}>
        <span style={{ color: '#ff3333', fontSize: '12px', fontWeight: 900, letterSpacing: '0.2em' }}>LIMA PERÚ</span>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px', fontWeight: 900 }}>@CAMILA.VALDIVIAA</a>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '52px', height: '52px', background: '#ff3333', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={20} color="#000" />
      </button>
    </div>
  );
};

// Mockup 05 - Mosaic
const Mockup05 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#0a0a0a', fontFamily: '-apple-system, sans-serif', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', height: '100%', gap: '2px' }}>
        {services.map((service, i) => (
          <div key={i}
            style={{ background: '#0f0f0f', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {activeService === i && <div style={{ position: 'absolute', inset: 0 }}><VideoPlayer src={service.video} deviceType={deviceType} loaderColor="#fff" /></div>}
            <div style={{ position: 'absolute', inset: 0, background: activeService === i ? 'rgba(0,0,0,0.4)' : (activeService !== null ? 'rgba(0,0,0,0.7)' : 'transparent'), transition: 'background 0.4s', zIndex: 5 }} />
            <div
              onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
              onMouseEnter={() => !isMobile && setActiveService(i)}
              onMouseLeave={() => !isMobile && setActiveService(null)}
              style={{ textAlign: 'center', zIndex: 10, cursor: 'pointer', padding: '20px' }}>
              <span style={{ fontSize: '14px', color: activeService === i ? '#fff' : 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', display: 'block', marginBottom: '16px', fontWeight: 600 }}>0{i + 1}</span>
              <span style={{ color: activeService === i ? '#fff' : '#fff', fontSize: isMobile ? (activeService === i ? '38px' : '25px') : (activeService === i ? '42px' : '28px'), fontWeight: 700, transition: 'all 0.4s', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{service.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => activeService !== null && setActiveService(null)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${activeService === null ? 1 : 0.25})`,
          textAlign: 'center',
          pointerEvents: activeService === null ? 'none' : 'auto',
          cursor: activeService === null ? 'default' : 'pointer',
          zIndex: 100,
          opacity: activeService === null ? 1 : 0.5,
          transition: 'transform 0.4s ease, opacity 0.4s ease'
        }}>
        <div style={{ width: isMobile ? 'min(225px, 56vw)' : 'min(300px, 40vw)', height: isMobile ? 'min(225px, 56vw)' : 'min(300px, 40vw)', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid rgba(255,255,255,0.3)', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}>
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 40%' }} />
        </div>
        <h1 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 200, color: '#fff', margin: 0 }}>Camila Valdivia</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '8px' }}>Influencer · Lima, Peru</p>
      </div>
      <header style={{ position: 'fixed', top: '24px', left: '32px', zIndex: 200 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '48px', height: '48px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={20} color="rgba(255,255,255,0.8)" />
      </button>
    </div>
  );
};

// Mockup 06 - Letterbox
const Mockup06 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#000', fontFamily: '-apple-system, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ height: isMobile ? '10dvh' : '12vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 16px' : '0 48px' }}>
        <h1 style={{ fontSize: isMobile ? '16px' : '24px', fontWeight: 300, color: '#fff', margin: 0, letterSpacing: '0.1em' }}>CAMILA VALDIVIA</h1>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '12px' }}>@camila.valdiviaa</a>
      </div>
      <div style={{ width: '100%', height: isMobile ? '75dvh' : '76vh', position: 'relative', overflow: 'hidden' }}>
        {activeService === null ? (
          <>
            <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 40%' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)' }} />
            <h2 style={{ position: 'absolute', bottom: isMobile ? '30px' : '60px', left: isMobile ? '20px' : '60px', fontSize: isMobile ? '36px' : 'clamp(48px, 8vw, 100px)', fontWeight: 200, color: '#fff', margin: 0 }}>Influencer</h2>
          </>
        ) : (
          <>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor="#fff" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)' }} />
            <span style={{ position: 'absolute', bottom: isMobile ? '30px' : '60px', left: isMobile ? '20px' : '60px', color: '#fff', fontSize: isMobile ? '36px' : '72px', fontWeight: 200 }}>{services[activeService].title.toUpperCase()}</span>
          </>
        )}
      </div>
      <div style={{ height: isMobile ? '15dvh' : '12vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: isMobile ? '4px' : '4px', padding: isMobile ? '8px' : '0' }}>
        {services.map((service, i) => (
          <button key={i}
            onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
            onMouseEnter={() => !isMobile && setActiveService(i)}
            onMouseLeave={() => !isMobile && setActiveService(null)}
            style={{
              background: activeService === i ? '#fff' : 'transparent',
              color: activeService === i ? '#000' : '#fff',
              border: 'none',
              padding: isMobile ? '10px 14px' : '16px 40px',
              fontSize: isMobile ? '10px' : '12px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              fontWeight: 600,
              minWidth: isMobile ? 'auto' : '120px',
              boxSizing: 'border-box',
              transition: 'background 0.2s ease, color 0.2s ease'
            }}>{service.title.toUpperCase()}</button>
        ))}
        <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
          background: 'transparent', border: 'none', padding: isMobile ? '10px 14px' : '16px 20px', cursor: 'pointer', marginLeft: isMobile ? '0' : '20px', borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <WhatsAppIcon size={isMobile ? 18 : 20} color="#fff" />
        </button>
      </div>
    </div>
  );
};

// Mockup 07 - Split Reveal
const Mockup07 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  // Mobile layout - stacked vertically
  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', width: '100%', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', overflowX: 'hidden', position: 'relative' }}>
        {/* Hero image or active video */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {activeService === null ? (
            <>
              <img src={heroImage} alt="Camila" style={{ position: 'absolute', inset: 0, width: '75%', height: '100%', objectFit: 'cover', objectPosition: 'center top', left: '50%', transform: 'translateX(-50%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
            </>
          ) : (
            <>
              <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor="#fff" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
            </>
          )}
        </div>
        {/* Name at top */}
        <div style={{ position: 'absolute', top: '60px', left: '24px', zIndex: 10 }}>
          <h1 style={{ fontSize: '36px', fontWeight: 200, color: '#fff', margin: 0 }}>Camila<br/>Valdivia</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '12px' }}>Influencer · Lima</p>
          <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', display: 'block', marginTop: '8px' }}>@camila.valdiviaa</a>
        </div>
        {/* Active title at bottom of video, not covering it */}
        {activeService !== null && (
          <div style={{ position: 'absolute', bottom: '100px', left: '24px', zIndex: 10 }}>
            <span style={{ color: '#fff', fontSize: '48px', fontWeight: 200 }}>{services[activeService].title}</span>
          </div>
        )}
        {/* Links at bottom */}
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px', zIndex: 10 }}>
          {services.map((service, i) => (
            <button key={i} onClick={() => setActiveService(activeService === i ? null : i)}
              style={{
                background: activeService === i ? '#fff' : 'rgba(0,0,0,0.5)',
                color: activeService === i ? '#000' : '#fff',
                border: '1px solid rgba(255,255,255,0.5)',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                borderRadius: '20px',
                boxSizing: 'border-box',
                transition: 'background 0.2s ease, color 0.2s ease'
              }}>{service.title}</button>
          ))}
        </div>
        <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
          position: 'fixed', top: '24px', right: '24px', width: '44px', height: '44px', borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <WhatsAppIcon size={16} color="#000" />
        </button>
      </div>
    );
  }

  // Desktop layout - side by side
  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', display: 'flex' }}>
      <div style={{ width: activeService !== null ? '30%' : '75%', height: '100%', position: 'relative', transition: 'width 0.6s ease', overflow: 'hidden' }}>
        <img src={heroImage} alt="Camila" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
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
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor="#fff" />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '64px', fontWeight: 200 }}>{services[activeService].title}</span>
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
          {services.map((service, i) => (
            <button key={i} onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
              style={{
                background: activeService === i ? '#fff' : 'transparent',
                color: activeService === i ? '#000' : '#fff',
                border: 'none',
                padding: '16px 32px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'right',
                minWidth: '140px',
                boxSizing: 'border-box',
                transition: 'background 0.2s ease, color 0.2s ease'
              }}>{service.title}</button>
          ))}
        </div>
      </div>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '32px', left: '40px', width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={18} color="#000" />
      </button>
    </div>
  );
};

// Mockup 08 - Portal
const Mockup08 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', width: '100%', background: '#000', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 20%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }} />
      </div>
      {activeService !== null && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: isMobile ? '85vw' : 'min(80vw, 80vh)', height: isMobile ? '85vw' : 'min(80vw, 80vh)', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor="#fff" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ color: '#fff', fontSize: isMobile ? '32px' : 'clamp(36px, 8vw, 64px)', fontWeight: 200 }}>{services[activeService].title}</span>
            </div>
          </div>
        </div>
      )}
      <h1 style={{ position: 'absolute', bottom: isMobile ? '140px' : '40px', left: isMobile ? '24px' : '40px', fontSize: isMobile ? '36px' : 'clamp(48px, 10vw, 120px)', fontWeight: 200, color: '#fff', margin: 0, zIndex: 10 }}>Camila<br/>Valdivia</h1>
      {/* Links - at bottom for mobile, on right side for desktop */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '24px' : 'auto',
        top: isMobile ? 'auto' : '50%',
        left: isMobile ? '24px' : 'auto',
        right: isMobile ? '24px' : '40px',
        transform: isMobile ? 'none' : 'translateY(-50%)',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? '8px' : '20px',
        zIndex: 20
      }}>
        {services.map((service, i) => (
          <button key={i}
            onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
            onMouseEnter={() => !isMobile && setActiveService(i)}
            onMouseLeave={() => !isMobile && setActiveService(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: activeService === i ? '#fff' : 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.6)',
              borderRadius: '25px',
              padding: isMobile ? '10px 18px' : '12px 20px',
              minWidth: isMobile ? 'auto' : '100px',
              boxSizing: 'border-box',
              transition: 'background 0.2s ease'
            }}>
            <span style={{ color: activeService === i ? '#000' : '#fff', fontSize: isMobile ? '13px' : '14px', fontWeight: 500, transition: 'color 0.2s ease' }}>{service.title}</span>
          </button>
        ))}
      </div>
      <header style={{ position: 'absolute', top: isMobile ? '24px' : '32px', left: isMobile ? '24px' : '40px', zIndex: 30 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px' }}>@camila.valdiviaa</a>
        <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 12px' }}>·</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Lima, Perú</span>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', top: isMobile ? '24px' : 'auto', bottom: isMobile ? 'auto' : '32px', right: isMobile ? '24px' : '40px', width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}>
        <WhatsAppIcon size={isMobile ? 20 : 24} color="#fff" />
      </button>
    </div>
  );
};

// Mockup 09 - Editorial
const Mockup09 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', video: videos.marcas },
    { title: 'Productos', video: videos.productos },
    { title: 'Eventos', video: videos.eventos },
    { title: 'Baile', video: videos.baile }
  ];

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', width: '100%', background: '#f8f6f3', fontFamily: 'Georgia, serif', overflow: 'hidden', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '8%', left: '8%', right: '8%', bottom: '8%', overflow: 'hidden' }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 20%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor="#1a1a1a" />
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
        <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.2em', display: 'block' }}>LIMA, PERÚ</span>
        <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.2em' }}>2025</span>
      </div>
      <div style={{ position: 'absolute', bottom: isMobile ? '1%' : '3%', left: isMobile ? '4%' : '8%', right: isMobile ? '4%' : '8%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-end', gap: isMobile ? '16px' : '0' }}>
        <div style={{ display: 'flex', gap: isMobile ? '12px' : '32px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          {services.map((service, i) => (
            <button key={i}
              onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
              onMouseEnter={() => !isMobile && setActiveService(i)}
              onMouseLeave={() => !isMobile && setActiveService(null)}
              style={{
                background: 'none',
                border: 'none',
                padding: isMobile ? '10px 8px' : '12px 0',
                fontSize: isMobile ? '13px' : '14px',
                fontStyle: 'italic',
                color: activeService === i ? '#1a1a1a' : (isMobile ? '#1a1a1a' : '#444'),
                cursor: 'pointer',
                borderBottom: activeService === i ? '2px solid #1a1a1a' : '2px solid transparent',
                fontFamily: 'Georgia, serif',
                fontWeight: 500,
                transition: 'color 0.2s ease, border-color 0.2s ease'
              }}>{service.title}</button>
          ))}
        </div>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: isMobile ? '#1a1a1a' : '#444', textDecoration: 'none', fontSize: '12px', fontFamily: 'sans-serif', textAlign: isMobile ? 'center' : 'right' }}>@camila.valdiviaa</a>
      </div>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', bottom: '3%', right: '3%', width: '48px', height: '48px', background: 'none', border: '1px solid #ccc', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <WhatsAppIcon size={16} color="#1a1a1a" />
      </button>
    </div>
  );
};

// Mockup 10 - Neon
const Mockup10 = ({ heroImage, videos, deviceType }) => {
  const [activeService, setActiveService] = useState(null);
  const isMobile = deviceType === 'mobile';
  const services = [
    { title: 'Marcas', color: '#ff00ff', video: videos.marcas },
    { title: 'Productos', color: '#00ffff', video: videos.productos },
    { title: 'Eventos', color: '#ff6600', video: videos.eventos },
    { title: 'Baile', color: '#00ff88', video: videos.baile }
  ];
  const activeColor = activeService !== null ? services[activeService].color : '#fff';

  return (
    <div style={{ minHeight: '100vh', height: '100dvh', maxWidth: '100vw', width: '100%', background: '#050508', fontFamily: '-apple-system, sans-serif', overflow: 'hidden', overflowX: 'hidden', position: 'relative' }}>
      {activeService !== null && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', borderRadius: '50%', background: 'radial-gradient(circle, ' + activeColor + '30 0%, transparent 60%)', pointerEvents: 'none', zIndex: 5 }} />
      )}
      <div style={{ position: 'absolute', top: '5%', left: '5%', right: '5%', bottom: '5%', border: '1px solid ' + (activeService !== null ? activeColor : '#1a1a2e'), overflow: 'hidden', transition: 'border-color 0.4s' }}>
        {activeService === null ? (
          <img src={heroImage} alt="Camila" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center top' : 'center 20%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <VideoPlayer src={services[activeService].video} deviceType={deviceType} loaderColor={activeColor} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
              <span style={{ color: activeColor, fontSize: isMobile ? '36px' : '56px', fontWeight: 300, textShadow: '0 0 40px ' + activeColor + '80' }}>{services[activeService].title}</span>
            </div>
          </div>
        )}
      </div>
      <h1 style={{ position: 'absolute', bottom: isMobile ? '18%' : '12%', left: isMobile ? '6%' : '8%', right: isMobile ? '6%' : 'auto', fontSize: isMobile ? '28px' : 'clamp(48px, 10vw, 100px)', fontWeight: 200, color: '#fff', margin: 0, textShadow: activeService !== null ? '0 0 60px ' + activeColor + '60' : 'none', transition: 'text-shadow 0.4s', zIndex: 10 }}>Camila Valdivia</h1>
      {/* Links - bottom with proper mobile layout */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '6%' : '5%',
        left: isMobile ? '6%' : 'auto',
        right: isMobile ? '6%' : '8%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: isMobile ? '6px' : '8px',
        justifyContent: isMobile ? 'center' : 'flex-end',
        zIndex: 20
      }}>
        {services.map((service, i) => (
          <button key={i}
            onClick={() => isMobile && setActiveService(activeService === i ? null : i)}
            onMouseEnter={() => !isMobile && setActiveService(i)}
            onMouseLeave={() => !isMobile && setActiveService(null)}
            style={{
              background: activeService === i ? service.color : 'rgba(0,0,0,0.5)',
              color: activeService === i ? '#000' : service.color,
              border: '1px solid ' + service.color,
              padding: isMobile ? '8px 12px' : '14px 28px',
              fontSize: isMobile ? '9px' : '12px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              boxShadow: activeService === i ? '0 0 30px ' + service.color + '60' : 'none',
              minWidth: isMobile ? 'auto' : '100px',
              boxSizing: 'border-box',
              transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'
            }}>{service.title.toUpperCase()}</button>
        ))}
      </div>
      <header style={{ position: 'absolute', top: '5%', left: isMobile ? '6%' : '8%', right: isMobile ? '6%' : '8%', display: 'flex', justifyContent: 'space-between', zIndex: 30 }}>
        <a href="https://www.instagram.com/camila.valdiviaa/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: isMobile ? '11px' : '13px' }}>@camila.valdiviaa</a>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: isMobile ? '10px' : '12px' }}>LIMA, PERÚ</span>
      </header>
      <button onClick={() => window.open('https://wa.me/51999999999', '_blank')} style={{
        position: 'fixed', top: isMobile ? '6%' : 'auto', bottom: isMobile ? 'auto' : '5%', left: isMobile ? 'auto' : '8%', right: isMobile ? '6%' : 'auto', width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)', border: '1px solid ' + activeColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, boxShadow: activeService !== null ? '0 0 30px ' + activeColor + '40' : 'none', transition: 'all 0.4s'
      }}>
        <WhatsAppIcon size={isMobile ? 20 : 24} color={activeColor} />
      </button>
    </div>
  );
};

export default CamilaPortfolioPreview;
