"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Baby, Gamepad2, Globe, Music, Users, Sparkles, Brain, Beaker, PartyPopper, PlayCircle } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
// Importando os componentes da biblioteca parallax
import { ParallaxProvider, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';


// --- COMPONENTES VISUAIS ---

// Componente do Modal
const SpringModal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden"
          >
            <Sparkles className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-4 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <PartyPopper />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Você me pegou!
              </h3>
              <p className="text-center mb-6">
                Não consegui escapar dessa vez, você foi mais rápido!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Continuar brincando!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente para o título com efeito de digitação
const TextType = ({ text, typingSpeed = 100, pauseDuration = 2000, cursorCharacter = "|" }: { text: string[], typingSpeed?: number, pauseDuration?: number, cursorCharacter?: string }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentString = text[textIndex];
      if (!currentString) return;
      
      if (!isDeleting && charIndex < currentString.length) {
        setCurrentText((prev) => prev + currentString[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting && charIndex === currentString.length) {
        timerRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        setCharIndex((prev) => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % text.length);
        setCurrentText("");
      }
    };

    timerRef.current = setTimeout(handleTyping, isDeleting ? typingSpeed / 2 : typingSpeed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [charIndex, isDeleting, text, textIndex, typingSpeed, pauseDuration]);

  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C77DFF", "#FF8C42"];

  return (
    <div className="text-5xl md:text-7xl font-bold drop-shadow-sm h-24 md:h-32 flex items-center justify-center flex-wrap font-heading">
      {currentText.split("").map((char, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-1 text-gray-500">
        {cursorCharacter}
      </motion.span>
    </div>
  );
};

// Componente para o Card com efeito 3D (Tilt)
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    setRotate({ x: -y * 10, y: x * 10 });
  };
  const onMouseLeave = () => setRotate({ x: 0, y: 0 });
  return (
    <motion.div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`, transition: "all 0.2s cubic-bezier(0.03, 0.98, 0.52, 0.99)"}} className={cn("rounded-2xl shadow-2xl transform-style-3d", className)}>
      {children}
    </motion.div>
  );
};

// --- DADOS ---
const ageGroups = [
    { id: "0-2", title: "0 a 2 anos",subtitle:"O Mundo das Descobertas", imageUrl: "/2anos.png" },
    { id: "3-5", title: "3 a 5 anos",subtitle:"Exploradores Lógicos", imageUrl: "/5anos.png" },
    { id: "6-8", title: "6 a 8 anos",subtitle:"Mestres dos Desafios", imageUrl: "/8anos.png"},
    { id: "9-12", title: "9 a 12 anos",subtitle:"Gênios em Treinamento", imageUrl: "/12anos.png" },
];
const thematicCategories = [
    { id: "english", title: "Inglês com Seraphine", icon: Globe, color: "bg-gradient-to-br from-orange-400 to-red-500", textColor: "text-white", emoji: "🌍" },
    { id: "science", title: "Pequenos Cientistas", icon: Beaker, color: "bg-gradient-to-br from-teal-400 to-cyan-500", textColor: "text-white", emoji: "🔬" },
    { id: "music", title: "Musicalização Infantil", icon: Music, color: "bg-gradient-to-br from-indigo-400 to-purple-500", textColor: "text-white", emoji: "🎵" },
];


export default function HomePage() {
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const ballRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null); 
  const adventureRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ballRef.current || !heroRef.current || !adventureRef.current) return;

      const ballRect = ballRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      const adventureRect = adventureRef.current.getBoundingClientRect();

      const ballCenterX = ballRect.left + ballRect.width / 2;
      const ballCenterY = ballRect.top + ballRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const distanceX = mouseX - ballCenterX;
      const distanceY = mouseY - ballCenterY;
      const directionX = distanceX > 0 ? -1 : 1;
      const directionY = distanceY > 0 ? -1 : 1;
      const speed = 5;
      const threshold = 120;
      
      let newX = ballPosition.x;
      let newY = ballPosition.y;

      if (Math.abs(distanceX) < threshold && Math.abs(distanceY) < threshold) {
        setIsHovering(true);
        newX += directionX * speed;
        newY += directionY * speed;
        
        const topLimit = heroRect.top;
        const bottomLimit = adventureRect.top - ballRect.height;
        const currentBallY = ballRect.top + newY - ballPosition.y;

        if (currentBallY < topLimit) newY = ballPosition.y + (topLimit - ballRect.top);
        if (currentBallY > bottomLimit) newY = ballPosition.y + (bottomLimit - ballRect.top);
        
        setBallPosition({ x: newX, y: newY });
      } else {
        setIsHovering(false);
        setBallPosition(prev => ({ x: prev.x * 0.9, y: prev.y * 0.9 }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ballPosition]);

  const handleBallClick = () => setIsModalOpen(true);

  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => { setCurrent(api.selectedScrollSnap() + 1); });
  }, [api]);


  return (
    <ParallaxProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-white">

        {/* Header & Hero Section */}
        <div ref={heroRef} className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/seraphine.png')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
            <header className="relative z-10 py-12 text-center flex flex-col justify-center h-full">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="inline-block">
                <motion.div
                ref={ballRef}
                onClick={handleBallClick}
                style={{ x: ballPosition.x, y: ballPosition.y, cursor: 'pointer', transition: 'transform 0.1s linear' }}
                animate={{
                    filter: ["drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))", "drop-shadow(0 0 25px rgba(238, 130, 238, 0.9))", "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300 rounded-full flex items-center justify-center shadow-2xl border-8 border-white mb-6"
                >
                <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-white" />
                </motion.div>
            </motion.div>
            <TextType text={["Seraphineplay", "A Jornada de uma Gênio"]} />
            </header>
        </div>

        {/* Age Groups com Tilt Effect */}
        <section ref={adventureRef} className="px-4 py-16 max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Escolha sua aventura mágica
            </h2>
            <div className="mt-4 max-w-2xl mx-auto">
                <p className="text-lg text-muted-foreground">
                Cada fase é um novo desafio, criado para desenvolver habilidades enquanto a diversão acontece.
                </p>
                <motion.div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} style={{ width: "150px" }}/>
            </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {ageGroups.map((group, index) => (
                <motion.div key={group.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}>
                <TiltCard>
                    <Link href={`/age/${group.id}`} className="block rounded-2xl overflow-hidden group relative h-96">
                        <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" style={{ backgroundImage: `url(${group.imageUrl})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="relative h-full flex flex-col justify-between items-center text-white p-6 text-center">
                        <div className="flex flex-col items-center">
                            <h4 className="text-xl font-semibold drop-shadow-md">{group.subtitle}</h4>
                            <h3 className="text-3xl font-bold font-heading drop-shadow-md">{group.title}</h3>
                        </div>
                        <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border-white/30 border hover:bg-white/30 rounded-full transition-all duration-300 group-hover:scale-110">
                            <PlayCircle className="mr-2 h-5 w-5" />
                            Jogar Agora
                        </Button>
                        </div>
                    </Link>
                </TiltCard>
                </motion.div>
            ))}
            </div>
        </section>
        
        {/* SEÇÃO PARALLAX ATUALIZADA */}
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[47vh]"
        >
            <ParallaxBanner className="h-[47vh]">
                <ParallaxBannerLayer image="background2.png" speed={-20} />
                <ParallaxBannerLayer className="absolute inset-0 bg-black/50" />
                <ParallaxBannerLayer className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true, amount: 0.5 }} 
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="text-center text-white p-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold drop-shadow-lg">
                            Um Universo de Descobertas
                        </h2>
                        <p className="mt-4 text-lg md:text-xl font-heading  max-w-3xl drop-shadow-lg">
                            Explore, desfrute, questione, desenvolva, evolua.
                        </p>
                    </motion.div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
            {/* Divs para o efeito de blur/camuflagem */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
        </motion.section>

        {/* Thematic Categories Carousel */}
        <section className="py-16 relative bg-white">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.2 }}>
            🌟 Categorias Especiais 🌟
            </motion.h3>
            
            <Carousel setApi={setApi} plugins={[autoplayPlugin.current]} className="w-full max-w-6xl mx-auto" opts={{ align: "center", loop: true }}>
                <CarouselContent className="-ml-4">
                    {thematicCategories.map((category, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <motion.div animate={{ scale: index + 1 === current ? 1 : 0.9, opacity: index + 1 === current ? 1 : 0.6 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                                    <Link href={`/category/${category.id}`}>
                                        <Card className={`${category.color} border-0 cursor-pointer transition-all duration-300 hover:shadow-xl group h-full`}>
                                            <CardContent className="p-8 text-center flex flex-col items-center justify-center aspect-square">
                                                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-6xl mb-4">{category.emoji}</motion.div>
                                                <category.icon className={`w-8 h-8 ${category.textColor} mx-auto mb-4 opacity-80`} />
                                                <h4 className={`text-xl font-bold ${category.textColor}`}>{category.title}</h4>
                                                <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-bold text-sm">🎮 Jogar Agora 🎮</div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </section>
        
        {/* Parents Section */}
        <section className="px-4 py-16 text-center bg-white">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Link href="/parents">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-10 py-6 shadow-xl rounded-full transform hover:scale-105 transition-transform">
                <Users className="w-6 h-6 mr-3" />
                Informações para os Pais
                </Button>
            </Link>
            </motion.div>
        </section>

        {/* Renderiza o modal */}
        <SpringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    </ParallaxProvider>
  )
}