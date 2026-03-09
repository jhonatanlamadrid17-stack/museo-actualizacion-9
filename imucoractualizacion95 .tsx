import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight, Leaf, Search, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ExternalLink, Calendar, BookOpen, Microscope, GraduationCap, Users, Sprout, Bird, Fish, Bug, Activity, Globe, Music, Tent, Anchor, Headphones, FileText, CirclePlay, MousePointer2, Radio, Code, Download, FileJson, FileImage, Copy, Check, Terminal, FolderOpen, Monitor, Layers } from "lucide-react"

// --- Constants & Data ---

const PRIMARY_GREEN = '#508C46'
const LIGHT_GREEN = '#A3D17C'

// Navigation Structure
const NAV_ITEMS = [
  { name: 'Inicio', href: '#', action: 'home' },
  { name: 'Quienes somos', href: '#about', action: 'scroll' },
  {
    name: 'Colecciones',
    href: '#collections',
    submenu: [
      { name: 'Herbario', action: 'herbario' },
      { name: 'Zoológica', action: 'zoologica' },
      { name: 'Música', action: 'musica' },
      { name: 'Etnográfica', action: 'etnografica' }
    ]
  },
  {
    name: 'Museo',
    href: '#museum',
    submenu: [
      { name: 'Exposiciones permanentes', action: 'default' },
      { name: 'Exposiciones temporales', action: 'default' },
      { name: 'Charlas', action: 'default' },
      { name: 'Actividades pedagógicas', action: 'default' },
      { name: 'Talleres', action: 'default' }
    ]
  },
  { name: 'Proyección social', href: '#social', action: 'scroll' }
]

// Slider Images Data
const SLIDER_IMAGES = [
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a7eupvut0pyc3584.jpg',
    title: 'Bienvenido a Agua, hilos de vida.',
    subtitle: 'Explora la conexión vital entre nuestros recursos hídricos y la biodiversidad.',
    action: 'riosinutimeline',
    buttonText: 'Descubre el Río Sinú'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a8ay0wl7luz21040.jpg',
    title: 'Conoce nuestras colecciones.',
    subtitle: 'Un recorrido por la riqueza biológica y cultural del Caribe colombiano.'
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a69mslflvrj03779.jpg',
    title: 'Bienvenido al museo IMUCOR.',
    subtitle: 'Ciencia, patrimonio y educación al servicio de la comunidad.'
  }
]

// Asset Registry
const SITE_ASSETS = [
  { name: 'Logo IMUCOR', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d63bbjudl83nr7154.png' },
  { name: 'Logo UniCórdoba', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d64ca17yk9jz33721.png' },
  { name: 'Mascota Guía', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d6429mfquv1g34970.png' },
  { name: 'Banner Herbario', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a7eupvut0pyc3584.jpg' },
  { name: 'Instalaciones Herbario', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a69mslflvrj03779.jpg' },
  { name: 'Banner Zoológica', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/09m6m35824bfvd1u/69a1bb75e6df3w1fw81jeq7434.JPG' },
  { name: 'Colección Zoológica 1', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/09m6m35824bfvd1u/69a1bb75e6de39gh8zlfr42802.JPG' },
  { name: 'Colección Zoológica 2', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/02mfm55de3rbx13e/69a20d2b7bfe5wowojwasu6520.png' },
  { name: 'Banner Etnográfica', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce1100alr3tujvd1405.JPG' },
  { name: 'Artefacto Etnográfico', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce10eboepusn2v69292.JPG' },
  { name: 'Vida Río Sinú', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce10f8bywhabyjb358.JPG' },
  { name: 'Banner Música', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/08mdm65e41a4v3v0/69a1c6a50bab8pivoa08np6133.JPG' },
  { name: 'Guía Musical', type: 'image/png', url: 'https://roboneo-public.meitudata.com/public/html_imgs/03m4m75bf72435zm/69a20efdd41bcrthhnt6xv9864.png' },
  { name: 'Niño Música', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/08mdm65e41a4v3v0/69a1c6a50babeh8t3sa5tb6265.JPG' },
  { name: 'Rio Sinú Panorámica', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af372897c60hsd07z2r09823.png' },
  { name: 'Rio Sinú Vida Comunitaria', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af37425bfc59jv0mi3g92174.png' },
  { name: 'Rio Sinú Cultura', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af374d58de0jgs2idisq1104.png' },
  { name: 'Personaje Rio 1', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/08m4mb97k006l48a/69a5e01d5c45flo9lcwaq71013.png' },
  { name: 'Personaje Rio 2', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/08m4mb97k006l48a/69a5e01d5c4696sju2g6d78664.png' },
  { name: 'Personaje Rio 3', type: 'image/jpg', url: 'https://roboneo-public.meitudata.com/public/html_imgs/08m4mb97k006l48a/69a5e01d5c4786iv1za11z4516.png' }
]

// --- Components ---

// 1. Navigation Item Component
interface NavItemProps {
  item: typeof NAV_ITEMS[0]
  isMobile?: boolean
  onNavigate: (action: string, target?: string) => void
}

const NavItem = ({ item, isMobile = false, onNavigate }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (item.submenu) {
      if (isMobile) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    } else {
      e.preventDefault()
      onNavigate(item.action || 'default', item.href)
      if (isMobile) setIsOpen(false)
    }
  }

  if (item.submenu) {
    return (
      <div className={`relative group ${isMobile ? 'w-full' : ''}`}>
        <button
          className={`flex items-center justify-between w-full px-4 py-2 font-medium text-gray-700 hover:text-[#508C46] transition-colors ${isMobile ? 'border-b border-gray-100' : ''}`}
          onClick={handleClick}
        >
          {item.name}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''} ${!isMobile && 'group-hover:rotate-180'}`} />
        </button>

        <div className={`
          ${isMobile
            ? (isOpen ? 'block bg-gray-50 pl-4' : 'hidden')
            : 'absolute top-full left-0 w-64 bg-white shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50'
          }
        `}>
          {item.submenu.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(sub.action)}
              className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-[#A3D17C] hover:text-white transition-colors border-b border-gray-50 last:border-0"
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`block px-4 py-2 font-medium text-gray-700 hover:text-[#508C46] transition-colors ${isMobile ? 'border-b border-gray-100 w-full' : ''}`}
    >
      {item.name}
    </a>
  )
}

// 2. Guide Mascot Component
const GuideMascot = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="fixed bottom-4 right-4 z-40 hidden md:flex flex-col items-end pointer-events-none"
      style={{ maxWidth: '300px' }}
    >
      <div
        className={`bg-white border-2 border-[#508C46] p-4 rounded-2xl rounded-br-none shadow-lg mb-2 mr-4 transition-all duration-300 transform origin-bottom-right pointer-events-auto
        ${isHovered ? 'scale-110 translate-y-[-5px]' : 'scale-100'}
        `}
      >
        <p className="text-[#508C46] font-bold text-sm">
          {isHovered ? '¡Explora nuestras colecciones!' : '¡Hola! Soy tu guía del museo.'}
        </p>
      </div>

      <div
        className="relative cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d6429mfquv1g34970.png"
          alt="Guía del Museo"
          className="h-48 md:h-56 object-contain drop-shadow-xl"
        />
      </div>
    </div>
  )
}

// 3. Hero Carousel Component
interface HeroSliderProps {
  onNavigate: (action: string) => void
}

const HeroSlider = ({ onNavigate }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0)
  const length = SLIDER_IMAGES.length
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }, [current, length])

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 5000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [nextSlide])

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDER_IMAGES.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#508C46]/80 via-transparent to-transparent opacity-90"></div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white transform transition-all duration-700 translate-y-0">
              <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                {slide.subtitle && <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">{slide.subtitle}</p>}
                <button
                  onClick={() => slide.action ? onNavigate(slide.action) : onNavigate('default')}
                  className="mt-6 px-6 py-3 bg-[#A3D17C] text-[#508C46] font-bold rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {slide.buttonText || 'Explorar Colección'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-[#508C46] text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg opacity-0 group-hover:opacity-100">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-[#508C46] text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg opacity-0 group-hover:opacity-100">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-[#A3D17C] w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// 4. Source Code Modal Component
const SourceCodeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'assets' | 'html'>('guide')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMUCOR - Museo</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    // Paste the full component code here
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
    lucide.createIcons();
  </script>
</body>
</html>`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-[#508C46] text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Developer Package & Source Code</h2>
              <p className="text-xs opacity-80">IMUCOR Website Project Resources</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col hidden md:flex">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === 'guide' ? 'bg-white border-l-4 border-[#508C46] text-[#508C46]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Terminal size={18} /> Setup Guide
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === 'assets' ? 'bg-white border-l-4 border-[#508C46] text-[#508C46]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileImage size={18} /> Asset Manager
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors ${activeTab === 'html' ? 'bg-white border-l-4 border-[#508C46] text-[#508C46]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileJson size={18} /> HTML Template
            </button>

            <div className="mt-auto p-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-xs text-gray-600 mb-2">Project Status</p>
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Ready to Export
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'guide' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b pb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">How to run locally</h3>
                  <p className="text-gray-600">Follow these steps to host this website on your local machine.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <Monitor size={20} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Option A: Single File (Easiest)</h4>
                    <p className="text-sm text-gray-600 mb-4">Run directly in browser without installation.</p>
                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mb-4">
                      <li>Create a file named <code className="bg-gray-100 px-1 rounded">index.html</code></li>
                      <li>Copy the <b>HTML Template</b> from the tab on the left.</li>
                      <li>Copy the <b>Component Code</b> (App.tsx content).</li>
                      <li>Paste the code inside the <code className="bg-gray-100 px-1 rounded">{'<script>'}</code> tag.</li>
                      <li>Open <code className="bg-gray-100 px-1 rounded">index.html</code> in Chrome/Edge.</li>
                    </ol>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Layers size={20} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Option B: Vite Project (Pro)</h4>
                    <p className="text-sm text-gray-600 mb-4">For development and production build.</p>
                    <div className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs font-mono mb-4">
                      <p>npm create vite@latest museum-site -- --template react-ts</p>
                      <p>cd museum-site</p>
                      <p>npm install</p>
                      <p>npm install lucide-react</p>
                      <p>npm run dev</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3">
                   <div className="text-yellow-600"><FolderOpen size={20} /></div>
                   <div>
                     <h5 className="font-bold text-yellow-800 text-sm">Note on Assets</h5>
                     <p className="text-sm text-yellow-700">This demo uses external image links. For a completely offline experience, please download the images from the <b>Asset Manager</b> tab and update the URLs in the code.</p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'assets' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-end border-b pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Asset Manager</h3>
                    <p className="text-gray-600">View and download all resources used in this website.</p>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                    {SITE_ASSETS.length} files
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SITE_ASSETS.map((asset, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all group">
                      <div className="aspect-video bg-gray-100 rounded-md mb-3 overflow-hidden relative">
                         <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <a href={asset.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-200">
                             <ExternalLink size={16} className="text-gray-800" />
                           </a>
                         </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm text-gray-800 truncate">{asset.name}</p>
                          <p className="text-xs text-gray-500 uppercase">{asset.type.split('/')[1]}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(asset.url)}
                          className="text-gray-400 hover:text-[#508C46] transition-colors"
                          title="Copy URL"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'html' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">HTML Template</h3>
                    <p className="text-gray-600 text-sm">Use this boilerplate to run the app without a build step.</p>
                  </div>
                  <button
                    onClick={() => handleCopy(htmlTemplate)}
                    className="flex items-center gap-2 bg-[#508C46] text-white px-4 py-2 rounded-lg hover:bg-[#3e6e36] transition-colors text-sm font-bold"
                  >
                    {copied ? <Check size={16} /> : 'Copy Template'}
                  </button>
                </div>

                <div className="relative flex-1 bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-xs text-gray-400 font-mono">index.html</span>
                  </div>
                  <pre className="p-4 pt-10 text-gray-300 font-mono text-sm overflow-auto h-full w-full">
                    {htmlTemplate}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. Herbario View Component
const HerbarioView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-[300px] w-full overflow-hidden bg-[#508C46]">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a7eupvut0pyc3584.jpg"
          alt="Herbario Banner"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          <Leaf size={64} className="mb-4 text-[#A3D17C]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Colección Herbario</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl text-[#A3D17C]">Universidad de Córdoba</p>
        </div>
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={20} className="mr-1" />
          Volver al Inicio
        </button>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <section className="mb-20 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold text-[#508C46] border-l-4 border-[#A3D17C] pl-4">Salvaguardia y Conservación</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              La colección herbario de la Universidad de Córdoba es un espacio dedicado a la salvaguardia, investigación y conservación de la flora, con especial atención a la diversidad vegetal de la región Caribe. Su labor se centra en la recolección, preservación y documentación de especies, garantizando que cada ejemplar se convierta en una fuente de información científica para las generaciones presentes y futuras.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Con cerca de <span className="font-bold text-[#508C46]">9.000 registros biológicos</span>, el herbario se consolida como un referente regional y nacional para el estudio de la biodiversidad, aportando al conocimiento, valoración y protección del patrimonio natural.
            </p>
          </div>
          <div className="md:col-span-5 bg-green-50 p-8 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden">
            <Leaf className="absolute -right-8 -bottom-8 w-48 h-48 text-[#508C46]/10" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[#508C46] mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2" /> Datos Clave
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#A3D17C] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Referente regional del Caribe</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#A3D17C] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Patrimonio natural protegido</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#A3D17C] rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Fuente de información científica</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Nuestra Misión</span>
            <h2 className="text-3xl font-bold text-[#508C46] mt-2">Objetivos Principales</h2>
            <div className="w-20 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#508C46] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-[#508C46]">
                <Microscope size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Investigación</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Fortalecer los procesos de investigación botánica, fomentando el trabajo interdisciplinario y la colaboración con grupos científicos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#A3D17C] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-[#508C46]">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Formación</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Apoyar la formación académica y pedagógica, sirviendo como base para estudiantes y docentes de diversas disciplinas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#508C46] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-[#508C46]">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Divulgación</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Promover el conocimiento a través de conversatorios, exposiciones y talleres en etnobotánica e ilustración científica.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-green-50 p-6 rounded-xl text-center text-gray-700 italic border border-green-100">
            "Reconocemos que la conservación de la flora requiere tanto del rigor científico como de estrategias pedagógicas y culturales que acerquen la biodiversidad a la comunidad."
          </div>
        </section>

        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3D17C]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#508C46] mb-6">Ubicación y Servicios</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ubicado en la Universidad de Córdoba, el herbario presta servicios a estudiantes, docentes, investigadores y público en general. Se constituye en un centro de apoyo clave para la investigación y la educación ambiental.
              </p>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center">
                  <Sprout className="w-5 h-5 mr-2 text-[#A3D17C]" /> Nuestros Servicios:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Identificación de plantas superiores', 'Identificación de micro y macroalgas', 'Asesoría en recolección de muestras', 'Procesamiento de muestras botánicas', 'Depósito de material botánico', 'Acompañamiento a proyectos'].map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                      <div className="w-2 h-2 bg-[#508C46] rounded-full mr-2"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl transform rotate-1 md:rotate-2 border border-gray-100">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                 <img
                  src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a69mslflvrj03779.jpg"
                  alt="Instalaciones Herbario"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">Atención Especializada</p>
                  <p className="text-sm text-gray-500">Consultas para investigación</p>
                </div>
                <button className="bg-[#508C46] text-white p-2 rounded-full hover:bg-[#3d6e35] transition-colors">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// 6. Colección Zoológica View Component
const ZoologicaView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/09m6m35824bfvd1u/69a1bb75e6df3w1fw81jeq7434.JPG"
          alt="Banner Colección Zoológica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#508C46]/90 via-[#508C46]/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 container mx-auto">
          <div className="flex items-center space-x-3 mb-2 text-[#A3D17C]">
            <Bird size={32} />
            <Fish size={28} />
            <Bug size={24} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Colección Zoológica</h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl">
            Resguardo de la diversidad animal del Caribe
          </p>
          <div className="mt-8">
            <button
              onClick={onBack}
              className="flex items-center text-white bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
            >
              <ChevronLeft size={20} className="mr-2" />
              Volver al Museo
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 text-[#508C46] font-semibold tracking-wider text-sm uppercase">
              <span className="w-8 h-0.5 bg-[#508C46]"></span>
              <span>CZUC - Universidad de Córdoba</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Preservando el Patrimonio Biológico de la Región
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              La <span className="font-bold text-[#508C46]">Colección Zoológica de la Universidad de Córdoba (CZUC)</span> tiene como propósito resguardar y conservar, a largo plazo, muestras representativas de la diversidad animal, con especial énfasis en la Región Caribe.
            </p>
            <p className="text-gray-600 leading-relaxed border-l-4 border-[#A3D17C] pl-6 italic">
              "Estas colecciones no solo preservan el patrimonio biológico, sino que también sirven de apoyo a la docencia, la investigación y los procesos de extensión, poniendo la información a disposición tanto de la comunidad científica como de la sociedad en general."
            </p>
            <div className="pt-4">
               <button className="text-[#508C46] font-bold border-b-2 border-[#A3D17C] hover:text-[#3d6e35] transition-colors pb-1">
                 Conoce nuestros proyectos de investigación
               </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#A3D17C] rounded-2xl transform rotate-3 translate-x-2 translate-y-2 opacity-30"></div>
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/09m6m35824bfvd1u/69a1bb75e6de39gh8zlfr42802.JPG"
              alt="Presentación de Colección"
              className="relative rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform hover:-translate-y-1 duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block border-l-4 border-[#508C46]">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Docencia y Extensión</p>
              <p className="text-sm font-medium text-gray-800">Espacios de aprendizaje interactivo con la biodiversidad local.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-green-50 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <Bug className="absolute top-10 right-10 text-[#508C46] opacity-5 w-32 h-32 rotate-12" />

          <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#508C46] mb-4">Consolidación y Futuro</h2>
            <p className="text-gray-700 text-lg">
              La CZUC trabaja para fortalecer y ampliar sus colecciones, consolidándose como un referente en el estudio y la documentación de la fauna del Caribe colombiano y como un centro de apoyo para la conservación de la biodiversidad en el país.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4 text-[#508C46]">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Colaboración Institucional</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Promovemos la colaboración con otras instituciones mediante visitas, préstamos e intercambios de ejemplares a nivel nacional e internacional.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
               <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4 text-[#508C46]">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Asesoría Especializada</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Brindamos asesoría en la selección, procesamiento e incorporación de muestras provenientes de proyectos desarrollados en la Universidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-12">
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-full min-h-[400px]">
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/02mfm55de3rbx13e/69a20d2b7bfe5wowojwasu6520.png"
              alt="Estudiante interactuando con la colección"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="bg-[#A3D17C] text-[#508C46] text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                Experiencia Educativa
              </div>
              <h3 className="text-2xl font-bold mb-2">Conectando Ciencia y Sociedad</h3>
              <p className="text-gray-200 text-sm">
                La colección está abierta a consultas de estudiantes, investigadores y público interesado, fomentando la apropiación social del conocimiento.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
             <div className="mb-6">
               <h3 className="text-2xl font-bold text-[#508C46] flex items-center mb-4">
                 <div className="w-10 h-10 rounded-full bg-[#508C46] text-white flex items-center justify-center mr-3 text-sm">
                   <BookOpen size={20} />
                 </div>
                 Nuestros Servicios
               </h3>
               <p className="text-gray-600 mb-6">
                 La CZUC offers una amplia gama de servicios académicos y técnicos para apoyar el desarrollo científico de la región:
               </p>
             </div>

             <div className="grid gap-4">
               {[
                 'Acompañamiento a proyectos académicos y científicos',
                 'Identificación taxonómica de especímenes',
                 'Atención a consultas de estudiantes e investigadores',
                 'Realización de charlas académicas y talleres',
                 'Asesoría en procesamiento de muestras biológicas',
                 'Depósito de material biológico de referencia'
               ].map((service, idx) => (
                 <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-lg border-l-4 border-transparent hover:border-[#A3D17C] hover:bg-white hover:shadow-md transition-all group">
                   <div className="w-6 h-6 rounded-full bg-white border-2 border-[#A3D17C] flex items-center justify-center mr-4 group-hover:bg-[#508C46] group-hover:border-[#508C46] transition-colors">
                     <span className="w-2 h-2 rounded-full bg-[#508C46] group-hover:bg-white"></span>
                   </div>
                   <span className="text-gray-700 font-medium">{service}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// 7. Colección Etnográfica View Component
const EtnograficaView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce1100alr3tujvd1405.JPG"
          alt="Paisaje Natural Córdoba"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 container mx-auto">
          <div className="flex items-center space-x-4 mb-4 text-[#A3D17C] opacity-90">
            <Users size={32} />
            <Globe size={32} />
            <Tent size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">Colección Etnográfica</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl drop-shadow-md">
            Identidad, Memoria y Tradición del Caribe
          </p>
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
          >
            <ChevronLeft size={20} className="mr-1" />
            Inicio
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#508C46] mb-8 relative inline-block">
            Diversidad y Territorio
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#A3D17C] rounded-full"></span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Colombia es reconocida como uno de los países más biodiversos del planeta, no solo por la riqueza de su flora y fauna, sino también por la diversidad de saberes, tradiciones y formas de vida que habitan su territorio.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed italic">
            "En este contexto, el departamento de Córdoba ocupa un lugar fundamental dentro del Caribe colombiano: desde el Parque Nacional Natural Paramillo hasta la desembocadura del río Sinú, convergen múltiples expresiones culturales que reflejan distintas maneras de ser y habitar el mundo."
          </p>
        </section>

        <section className="mb-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4 text-[#508C46]">
                <Tent size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Salvaguardia del Patrimonio</h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              La Colección Etnográfica de la Universidad de Córdoba nace con el propósito de salvaguardar, investigar y divulgar este patrimonio cultural, fortaleciendo el reconocimiento y el cuidado de las identidades del Caribe, especialmente las del departamento.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              En ella se resguardan <span className="font-bold text-[#508C46]">objetos de alto valor etnográfico</span>, muchos de ellos vinculados al pueblo Zenú del bajo río Sinú, así como manifestaciones asociadas al trenzado de la caña flecha, la música sabanera, la oralidad indígena y las tradiciones campesinas. Cada pieza y cada relato conservado forman parte de una memoria viva que conecta pasado y presente.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Pueblo Zenú', 'Caña Flecha', 'Música Sabanera', 'Tradición Oral'].map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="absolute -inset-4 bg-[#A3D17C]/20 rounded-full blur-2xl group-hover:bg-[#A3D17C]/30 transition-colors"></div>
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce10eboepusn2v69292.JPG"
              alt="Artefacto Etnográfico"
              className="relative w-full rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105 border-4 border-white object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg max-w-[200px]">
              <p className="text-xs text-[#508C46] font-bold uppercase">Pieza de Colección</p>
              <p className="text-xs text-gray-600">Representación cultural de alto valor histórico.</p>
            </div>
          </div>
        </section>

        <section className="bg-green-50 rounded-3xl p-8 md:p-16 relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#508C46 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="relative">
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/09m1mc5b24q5b7zv/69a1be2ce10f8bywhabyjb358.JPG"
                alt="Vida en el Río Sinú"
                className="rounded-xl shadow-lg border-4 border-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500 w-full object-cover h-80"
              />
              <div className="absolute top-4 left-4 bg-[#508C46] text-white p-2 rounded-lg shadow-md">
                <Anchor size={20} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#508C46]">Diálogo Cultural y Formación</h3>
              <p className="text-gray-700 leading-relaxed">
                Además de su labor de conservación, la colección impulsa procesos de investigación, formación y trabajo comunitario. Se destaca la alianza con museos etnográficos en instituciones educativas, espacios que contribuyen a proteger, difundir y reafirmar el orgullo de ser cordobés.
              </p>
              <div className="bg-white p-6 rounded-xl border-l-4 border-[#A3D17C] shadow-sm">
                <p className="text-gray-800 font-medium italic">
                  "De esta manera, la colección se consolida como un escenario para el diálogo cultural, la valoración de la diversidad humana y la construcción de identidad regional."
                </p>
              </div>
              <button className="flex items-center text-[#508C46] font-bold hover:text-[#3d6e35] transition-colors group">
                Conocer proyectos educativos <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// 8. Colección Música View Component
const MusicaView = ({ onBack }: { onBack: () => void }) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleMascotClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const phrases = [
      '¡La música es vida!',
      'Disfruta de la melodía',
      'La música une corazones',
      'Siente el ritmo del Caribe',
      'Nuestra herencia sonora'
    ]
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    setShowTooltip(randomPhrase)

    setTimeout(() => {
      setShowTooltip(null)
    }, 3000)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://roboneo-public.meitudata.com/public/html_imgs/08mdm65e41a4v3v0/69a1c6a50bab8pivoa08np6133.JPG"
          alt="Bailarinas Folclóricas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 10%, 0 100%)' }}></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 container mx-auto">
          <div className="flex items-center space-x-4 mb-4 text-[#A3D17C] animate-pulse">
            <Music size={40} />
            <MousePointer2 size={32} />
            <Radio size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl tracking-tight">Colección Música</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl drop-shadow-md">
            Biblioteca Virtual Musical de Córdoba
          </p>
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
          >
            <ChevronLeft size={20} className="mr-1" />
            Inicio
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section className="mb-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex justify-center relative">
            <div className="relative z-10 cursor-pointer" onClick={handleMascotClick} onTouchEnd={handleMascotClick}>
              <style>
                {`
                  @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }
                  .animate-float {
                    animation: float 4s ease-in-out infinite;
                  }
                `}
              </style>
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/03m4m75bf72435zm/69a20efdd41bcrthhnt6xv9864.png"
                alt="Guía Musical"
                className="w-full max-w-sm mx-auto object-contain drop-shadow-2xl animate-float hover:scale-105 transition-transform duration-300"
              />

              {showTooltip && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#508C46] px-4 py-2 rounded-xl shadow-lg border-2 border-[#A3D17C] whitespace-nowrap z-20 animate-in fade-in zoom-in duration-300">
                  <p className="font-bold text-sm">{showTooltip}</p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#A3D17C] transform rotate-45"></div>
                </div>
              )}

              <div className="absolute top-0 right-10 bg-white text-[#508C46] p-3 rounded-full shadow-lg border-2 border-[#A3D17C] animate-bounce pointer-events-none">
                <Music size={24} />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-50 rounded-full -z-0"></div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center space-x-2 text-[#508C46] font-semibold tracking-wider text-sm uppercase">
              <span className="w-8 h-0.5 bg-[#508C46]"></span>
              <span>Patrimonio Sonoro</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Bienvenido a la Biblioteca Virtual Musical
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              Esta Biblioteca Virtual musical del departamento de Córdoba consiste en una recopilación de las obras más representativas de los principales compositores y músicos del departamento de Córdoba agrupados por subregiones: <span className="font-bold text-[#508C46]">Sinú, San Jorge, Costanera, Sábanas y Cultura Embera</span>.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Aquí podrá encontrar la publicación de partituras con arreglos originales para distintos ensambles en formato PDF, una muestra auditiva en MP3 de cada obra y aspectos biográficos relevantes de cada compositor. Usted accederá al material de manera gratuita por medio del repositorio institucional.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg text-[#508C46] font-medium">
                <FileText size={18} className="mr-2" /> Partituras PDF
              </div>
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg text-[#508C46] font-medium">
                <CirclePlay size={18} className="mr-2" /> Audio MP3
              </div>
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg text-[#508C46] font-medium">
                <Users size={18} className="mr-2" /> Biografías
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#508C46] rounded-3xl p-8 md:p-16 relative overflow-hidden text-white shadow-2xl mb-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-4 flex items-center">
                <Headphones className="mr-4 w-10 h-10 text-[#A3D17C]" />
                Centro de Documentación
              </h3>
              <p className="text-green-50 text-lg leading-relaxed text-justify">
                Nuestro objetivo principal es consolidarnos como un importante centro de documentación musical en el cual estudiosos y amantes de la música recurran para conocer, por medio de materiales elaborados de manera rigurosa, la música tradicional y popular del departamento de Córdoba, principales exponentes y compositores, obras, discografía, organología y agrupaciones representativas, entre otros.
              </p>
              <button className="bg-white text-[#508C46] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#A3D17C] hover:text-white transition-all transform hover:-translate-y-1">
                Acceder al Repositorio
              </button>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-[#A3D17C] rounded-2xl transform rotate-2 opacity-50"></div>
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/08mdm65e41a4v3v0/69a1c6a50babeh8t3sa5tb6265.JPG"
                alt="Niño escuchando música"
                className="relative rounded-2xl shadow-xl w-full h-80 object-cover border-4 border-white/20"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-xl">
                <p className="text-sm font-light">"La música tradicional al alcance de las nuevas generations"</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center max-w-4xl mx-auto mb-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#508C46]">
            <Globe size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Proyección Global</h2>
          <p className="text-gray-600 text-lg leading-relaxed italic relative px-8">
            <span className="text-6xl text-[#A3D17C] absolute top-[-20px] left-0 opacity-30 font-serif">"</span>
            Deseamos ser un referente mundial y brindar una plataforma para que nuestra cultura musical trascienda el nivel local y se proyecte en distintos escenarios, tanto académicos como en la puesta en escena a través de conciertos.
            <span className="text-6xl text-[#A3D17C] absolute bottom-[-40px] right-0 opacity-30 font-serif">"</span>
          </p>
        </section>
      </div>
    </div>
  )
}

// 9. Home View Component
interface HomeViewProps {
  onNavigate: (action: string) => void
}

const HomeView = ({ onNavigate }: HomeViewProps) => {
  return (
    <>
      <HeroSlider onNavigate={onNavigate} />

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Nuestra Institución</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#508C46] mt-2">Quienes Somos</h2>
            <div className="w-20 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#508C46] hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Leaf className="text-[#508C46] mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Misión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Somos una unidad académico-administrativa de la Universidad de Córdoba, dedicada a la preservación, investigación y divulgación del patrimonio biológico y cultural de la región. Fomentamos la apropiación social del conocimiento a través de nuestras colecciones y programas educativos.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-[#A3D17C] hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Search className="text-[#508C46] mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Visión</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Consolidarnos como un referente nacional e internacional en la gestión de colecciones biológicas y museales, liderando procesos de conservación de la biodiversidad y el patrimonio cultural del Caribe colombiano, integrando la ciencia con la comunidad.
                </p>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b44ac0a69mslflvrj03779.jpg"
                alt="Instalaciones del Museo"
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#508C46]/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">Colección Zoológica CZUC</p>
                <p className="text-sm opacity-90">Patrimonio de todos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3D17C]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#508C46]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#A3D17C] font-bold tracking-wider uppercase text-sm">Comunidad</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#508C46] mt-2">Proyección Social</h2>
            <div className="w-20 h-1 bg-[#A3D17C] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-t-4 border-transparent hover:border-[#508C46]">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#508C46] transition-colors">
                <BookOpen className="w-8 h-8 text-[#508C46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Educación</h3>
              <p className="text-gray-600 mb-6">Talleres lúdicos y visitas guiadas para escuelas y colegios, fomentando el amor por la ciencia desde temprana edad.</p>
              <a href="#" className="text-[#508C46] font-semibold flex items-center justify-center hover:underline">
                Ver programas <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-t-4 border-transparent hover:border-[#A3D17C]">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#A3D17C] transition-colors">
                <MapPin className="w-8 h-8 text-[#508C46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Territorio</h3>
              <p className="text-gray-600 mb-6">Proyectos de conservación in-situ y ex-situ, trabajando de la mano con comunidades locales y campesinas.</p>
              <a href="#" className="text-[#A3D17C] font-semibold flex items-center justify-center hover:underline">
                Nuestros proyectos <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-t-4 border-transparent hover:border-[#508C46]">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#508C46] transition-colors">
                <Calendar className="w-8 h-8 text-[#508C46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Eventos</h3>
              <p className="text-gray-600 mb-6">Participación en ferias de ciencia, seminarios ambientales y exposiciones itinerantes por todo el departamento.</p>
              <a href="#" className="text-[#508C46] font-semibold flex items-center justify-center hover:underline">
                Agenda cultural <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// 10. Rio Sinu Timeline Component
interface RioSinuTimelineProps {
  onBack: () => void
}

const TIMELINE_IMAGES = [
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af372897c60hsd07z2r09823.png',
    character: 'https://roboneo-public.meitudata.com/public/html_imgs/08m4mb97k006l48a/69a5e01d5c45flo9lcwaq71013.png',
    showTitle: true
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af37425bfc59jv0mi3g92174.png',
    character: 'https://roboneo-public.meitudata.com/public/html_imgs/08m4mb97k006l48a/69a5e01d5c4786iv1za11z4516.png',
    showTitle: false
  },
  {
    url: 'https://roboneo-public.meitudata.com/public/html_imgs/0emamdjeofg380zy/69af374d58de0jgs2idisq1104.png',
    character: 'https://roboneo-public.meitudata.com/public/html_imgs/08m4mb97k006l48a/69a5e01d5c4696sju2g6d78664.png',
    showTitle: false
  }
]

const RadioButton = ({ onClick, isPlaying }: { onClick: () => void, isPlaying: boolean }) => (
  <button
    onClick={onClick}
    className="group relative flex flex-col items-center justify-center bg-[#2C3E2D] p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-t-2 border-[#508C46] border-b-4 border-[#1A251B] transition-transform hover:-translate-y-1 active:translate-y-1 active:border-b-0 mt-8 cursor-pointer z-50 w-24 h-24"
    aria-label="Play Radio"
  >
    <div className="absolute -top-6 w-1 h-8 bg-gray-400 rounded-t-full shadow-inner transform rotate-12 right-6 group-hover:rotate-6 transition-transform"></div>
    <div className="absolute top-2 left-2 flex gap-1">
      <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
      <div className={`w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)] ${isPlaying ? 'animate-pulse' : 'opacity-50'}`}></div>
    </div>
    
    <div className="bg-[#1A251B] w-full h-8 rounded mb-2 overflow-hidden relative shadow-inner border border-gray-700 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center px-1">
        <div className="w-full border-t border-gray-600/50"></div>
      </div>
      {isPlaying && (
        <div className="w-full flex justify-around items-center h-4 px-2 z-10 gap-0.5">
           <div className="w-1 bg-green-400 h-full animate-[ping_1s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-1/2 animate-[ping_1.2s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-3/4 animate-[ping_0.8s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-full animate-[ping_1.5s_ease-in-out_infinite]"></div>
           <div className="w-1 bg-green-400 h-1/3 animate-[ping_0.9s_ease-in-out_infinite]"></div>
        </div>
      )}
    </div>
    
    <div className="flex w-full justify-between items-end">
      <div className="w-6 h-6 rounded-full bg-gray-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-gray-400">
        <div className={`w-1 h-3 bg-gray-600 rounded-full transition-transform duration-300 ${isPlaying ? 'rotate-45' : '-rotate-45'}`}></div>
      </div>
      <div className="flex gap-1">
         <div className="w-2 h-4 bg-[#A3D17C] rounded shadow-inner"></div>
         <div className="w-2 h-4 bg-[#A3D17C] rounded shadow-inner"></div>
         <div className="w-2 h-4 bg-[#A3D17C] rounded shadow-inner"></div>
      </div>
    </div>
    <div className="mt-2 text-[10px] font-bold text-gray-400 tracking-wider font-mono">FM/AM</div>
  </button>
)

const RioSinuTimeline = ({ onBack }: RioSinuTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({ 0: false, 1: false, 2: false })

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollY = containerRef.current.scrollTop
      const slideHeight = window.innerHeight
      const newSlide = Math.round(scrollY / slideHeight)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
      }
    }
  }, [currentSlide])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleRadioClick = (index: number) => {
    setIsPlaying(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
    console.log(`Radio button ${index + 1} clicked!`)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-medium {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-1 { animation: float-slow 4s ease-in-out infinite; }
          .animate-float-2 { animation: float-medium 5s ease-in-out infinite 1s; }
          .animate-float-3 { animation: float-fast 3.5s ease-in-out infinite 0.5s; }
        `}
      </style>
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent p-6 z-20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30"
        >
          <ChevronLeft size={20} className="mr-1" />
          Volver al Inicio
        </button>
        {/* Title hidden via CSS as requested */}
        <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-md hidden md:hidden">Navegando por nuestro Rio Sinú</h1>
        <div className="w-24"></div>
      </div>

      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {TIMELINE_IMAGES.map((item, index) => (
          <div key={index} className="snap-start h-screen w-full flex items-center justify-center relative flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img
                src={item.url}
                alt={'Rio Sinu Image'}
                className="w-full h-full object-cover opacity-90 transition-transform duration-[10000ms] ease-linear scale-105 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
            </div>

            {item.showTitle && (
              <>
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] border-b-2 border-[#A3D17C] pb-2 uppercase bg-black/30 px-6 py-2 rounded-xl backdrop-blur-sm">
                    Sesión Colección herbario
                  </h2>
                </div>
                
                {/* Floating Circular Images - Only on First Section */}
                <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Circle 1 - Top Left */}
                  <div className="absolute top-[20%] left-[10%] md:left-[15%] lg:left-[20%] animate-float-1 pointer-events-auto">
                    <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://roboneo-public.meitudata.com/public/html_imgs/07m7m9j5q0d6u0yu/69af43e7aa5f0qbty28fya199.JPG" 
                        alt="Flora acuática con flor lila" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Circle 2 - Middle Right */}
                  <div className="absolute top-[40%] right-[10%] md:right-[20%] lg:right-[25%] animate-float-2 pointer-events-auto">
                    <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://roboneo-public.meitudata.com/public/html_imgs/07m7m9j5q0d6u0yu/69af43e7aa5fbtg6wg05il2499.JPG" 
                        alt="Superficie del río" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Circle 3 - Bottom Left (above radio) */}
                  <div className="absolute bottom-[30%] left-[15%] md:left-[25%] lg:left-[30%] animate-float-3 pointer-events-auto">
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://roboneo-public.meitudata.com/public/html_imgs/07m7m9j5q0d6u0yu/69af43e7aa608ee91zzees9468.JPG" 
                        alt="Raíces y vegetación" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={`absolute z-10 w-full h-full pointer-events-none flex items-end 
              ${index === 0 ? 'justify-end pr-4 md:pr-20 pb-0' : ''}
              ${index === 1 ? 'justify-start pl-4 md:pl-20 pb-0' : ''}
              ${index === 2 ? 'justify-start pl-4 md:pl-20 pb-0' : ''}
            `}>
              <div className={`transition-all duration-1000 transform 
                ${currentSlide === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}
              `}>
                 <img 
                   src={item.character} 
                   alt="Exploradora del Río" 
                   className={`
                     drop-shadow-2xl object-contain filter brightness-90 contrast-110
                     ${index === 0 ? 'h-[40vh] md:h-[60vh] lg:h-[70vh] origin-bottom-right' : ''}
                     ${index === 1 ? 'h-[45vh] md:h-[65vh] lg:h-[75vh] origin-bottom-left' : ''}
                     ${index === 2 ? 'h-[50vh] md:h-[70vh] lg:h-[80vh] origin-bottom-left' : ''}
                   `}
                 />
              </div>
            </div>

            <div className={`relative z-20 w-full h-full flex flex-col justify-center items-center pointer-events-none`}>
              <div className={`transition-all duration-1000 delay-300 transform pointer-events-auto mt-auto mb-20 md:mb-32
                 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}>
                <RadioButton onClick={() => handleRadioClick(index)} isPlaying={isPlaying[index] || false} />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-30">
        {TIMELINE_IMAGES.map((_, index) => (
          <div key={index} className="group relative flex items-center justify-end">
            <span className={`absolute right-8 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mr-2 pointer-events-none`}>
              {index === 0 ? 'Inicio' : index === 1 ? 'Interacción' : 'Música y Archivos'}
            </span>
            <button
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 border-2 border-white shadow-lg
                ${index === currentSlide ? 'bg-[#A3D17C] scale-150 border-[#A3D17C]' : 'bg-transparent hover:bg-white'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center transition-opacity duration-500 ${currentSlide === 2 ? 'opacity-0' : 'opacity-70'}`}>
        <span className="text-xs uppercase tracking-widest mb-2 font-light">Desliza</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

// --- Main App Component ---

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'herbario' | 'zoologica' | 'etnografica' | 'musica' | 'riosinutimeline'>('home')
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false)

  useEffect(() => {
    let title = 'IMUCOR - Instituto Museo Universidad de Córdoba'
    if (currentView === 'herbario') title = 'Herbario - IMUCOR'
    if (currentView === 'zoologica') title = 'Colección Zoológica - IMUCOR'
    if (currentView === 'etnografica') title = 'Colección Etnográfica - IMUCOR'
    if (currentView === 'musica') title = 'Colección Música - IMUCOR'
    if (currentView === 'riosinutimeline') title = 'Río Sinú: Hilos de Vida - IMUCOR'
    document.title = title
  }, [currentView])

  const handleNavigation = (action: string, target?: string) => {
    setIsMobileMenuOpen(false)

    if (action === 'herbario') setCurrentView('herbario')
    else if (action === 'zoologica') setCurrentView('zoologica')
    else if (action === 'etnografica') setCurrentView('etnografica')
    else if (action === 'musica') setCurrentView('musica')
    else if (action === 'riosinutimeline') setCurrentView('riosinutimeline')
    else if (action === 'home') setCurrentView('home')
    else if (action === 'scroll' && target) {
      if (currentView !== 'home') {
        setCurrentView('home')
        setTimeout(() => {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      if (target) window.location.href = target
    }
    
    if (action !== 'scroll') window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <button
        onClick={() => setIsSourceModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-[#508C46] text-white p-3 rounded-full shadow-lg hover:bg-[#3e6e36] transition-all flex items-center gap-2 pr-4 group animate-in slide-in-from-left-4 duration-1000"
        title="Download Source Code"
      >
        <div className="bg-white/20 p-1 rounded-full">
           <Download size={20} className="animate-bounce" />
        </div>
        <span className="font-bold text-sm hidden group-hover:inline-block">Get Source Code</span>
      </button>

      <SourceCodeModal isOpen={isSourceModalOpen} onClose={() => setIsSourceModalOpen(false)} />

      <header className={`bg-white shadow-md sticky top-0 z-50 ${currentView === 'riosinutimeline' ? 'hidden' : ''}`}>
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('home')}>
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d63bbjudl83nr7154.png"
              alt="IMUCOR Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} item={item} onNavigate={handleNavigation} />
            ))}
          </nav>

          <div className="hidden md:block flex-shrink-0">
            <img
              src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d64ca17yk9jz33721.png"
              alt="Universidad de Córdoba Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>

          <button
            className="lg:hidden p-2 text-[#508C46]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
          <div className="container mx-auto px-4 flex flex-col space-y-1">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} item={item} isMobile={true} onNavigate={handleNavigation} />
            ))}
            <div className="pt-4 flex justify-center md:hidden">
              <img src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d64ca17yk9jz33721.png" alt="UniCórdoba" className="h-14 object-contain" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-grow">
        {currentView === 'home' && <HomeView onNavigate={handleNavigation} />}
        {currentView === 'herbario' && <HerbarioView onBack={() => handleNavigation('home')} />}
        {currentView === 'zoologica' && <ZoologicaView onBack={() => handleNavigation('home')} />}
        {currentView === 'etnografica' && <EtnograficaView onBack={() => handleNavigation('home')} />}
        {currentView === 'musica' && <MusicaView onBack={() => handleNavigation('home')} />}
        {currentView === 'riosinutimeline' && <RioSinuTimeline onBack={() => handleNavigation('home')} />}

        {currentView !== 'riosinutimeline' && <GuideMascot />}
      </main>

      <footer className={`bg-[#508C46] text-white mt-auto ${currentView === 'riosinutimeline' ? 'hidden' : ''}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white p-2 rounded-lg inline-block mb-4">
                <img src="https://roboneo-public.meitudata.com/public/html_imgs/0amfm3531albxced/69a1b5d49d63bbjudl83nr7154.png" alt="IMUCOR" className="h-12 object-contain" />
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Instituto Museo de la Universidad de Córdoba. Comprometidos con la biodiversidad y la cultura del Caribe.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-[#A3D17C] pb-2 inline-block">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-[#A3D17C] flex-shrink-0" />
                  <span>Carrera 6 No. 76-103, Montería, Córdoba, Colombia</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#A3D17C] flex-shrink-0" />
                  <span>+57 (4) 786 0300</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-[#A3D17C] flex-shrink-0" />
                  <span>museo@unicordoba.edu.co</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-[#A3D17C] pb-2 inline-block">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => handleNavigation('home')} className="hover:text-[#A3D17C] transition-colors">Inicio</button></li>
                <li><a href="#" className="hover:text-[#A3D17C] transition-colors">Sistema de Bibliotecas</a></li>
                <li><a href="#" className="hover:text-[#A3D17C] transition-colors">Admisiones</a></li>
                <li><a href="#" className="hover:text-[#A3D17C] transition-colors">Investigación</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-[#A3D17C] pb-2 inline-block">Síguenos</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A3D17C] hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A3D17C] hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#A3D17C] hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
              </div>
              <p className="text-xs opacity-75">
                © {new Date().getFullYear()} Universidad de Córdoba. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#3e6e36] py-4 text-center text-xs opacity-80 px-4">
          <p>Vigilada Mineducación | Diseño Demo para propósitos ilustrativos</p>
        </div>
      </footer>
    </div>
  )
}

export default App