import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProgress } from '@react-three/drei'
import Scene from './Scene';

gsap.registerPlugin(ScrollTrigger);


function animateLoaderOut(setLoaderDone) {
    gsap.to(".loader-left", {
        x: "-100%",
        duration: 1.5,
        ease: "power2.inOut",
    })
    gsap.to(".loader-right", {
        x: "100%",
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            setLoaderDone(true) 
        }
    })
}

function LoaderInner({ setLoaderDone }) {
    const { progress } = useProgress()

    useEffect(() => {
        gsap.to(".progress-bar", {
            width: progress + "%",
            ease: "power1.inOut",
            duration: 0.3
        })

        if (progress >= 100) {
            setTimeout(() => {
                animateLoaderOut(setLoaderDone)
            }, 500)
        }
    }, [progress])

    return null
}


function Home() {
    const mainRef = useRef(null);
    const sceneRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [loaderDone, setLoaderDone] = useState(false);

    useEffect(() => {
        if (!loaderDone) return

        gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    setScrollProgress(self.progress)
                }
            }
        })
        .to(sceneRef.current, { ease: 'none', x: '-25vw' })
        .to(sceneRef.current, { ease: 'none', x: '25vw' })
        .to(sceneRef.current, { ease: 'none', x: '-25vw' })

    }, [loaderDone])

    return (
        <>
            {!loaderDone && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%', height: '100vh',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                    {/* Center content */}
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10001,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <h1 style={{ color: 'white', fontSize: '8rem',  fontFamily: 'Urbanist' }}>
                            Nexora (R)
                        </h1>
                        <p style={{ color: 'white', opacity: 0.5, fontSize: '1rem', fontFamily: 'Urbanist' }}>
                            Loading Vibes Setting Trends...
                        </p>
                        <div style={{
                            marginTop: '20px',
                            width: '240px',
                            height: '4px',
                            background: '#3f3f46',
                            borderRadius: '999px',
                            overflow: 'hidden'
                        }}>
                            <div className="progress-bar" style={{
                                width: '0%',
                                height: '100%',
                                background: 'white',
                                borderRadius: '999px'
                            }} />
                        </div>
                    </div>

                    {/* Left panel */}
                    <div className="loader-left" style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '50%', height: '100%',
                        backgroundColor: 'black',
                        zIndex: 10000,
                    }} />

                    {/* Right panel */}
                    <div className="loader-right" style={{
                        position: 'absolute',
                        top: 0, right: 0,
                        width: '50%', height: '100%',
                        backgroundColor: 'black',
                        zIndex: 10000,
                    }} />
                </div>
            )}

            {/* ===== MAIN WEBSITE ===== */}
            <div
                ref={mainRef}
                className='overflow-x-hidden'
                style={{ visibility: loaderDone ? 'visible' : 'hidden' }}
            >
                <div
                    ref={sceneRef}
                    className='fixed top-0 left-0 h-screen w-screen pointer-events-none'
                    style={{ zIndex: 10 }}
                >
                    <Canvas>
                        <Suspense fallback={null}>
                            <Scene progress={scrollProgress} />
                        </Suspense>
                        <LoaderInner setLoaderDone={setLoaderDone} />
                    </Canvas>
                </div>

                <section className='relative grid place-items-center h-screen bg-black' style={{ zIndex: 1 }}>
                    <p className='text-white text-center absolute top-[5%] mx-4 text-8xl font-bold'>Apple Watch</p>
                    <p className='text-white text-center absolute bottom-[5%] mx-4 text-8xl font-bold'>Ultra 2</p>
                </section>

                <section className='relative flex items-center justify-evenly h-screen bg-black' style={{ zIndex: 1 }}>
                    <p className='w-1/2'></p>
                    <p className='text-white w-1/2 text-center px-4 text-4xl font-semibold'>
                        Introducing the Apple Watch Ultra 2, the most advanced Apple Watch ever.
                    </p>
                </section>

                <section className='relative flex items-center justify-evenly h-screen bg-black' style={{ zIndex: 1 }}>
                    <p className='text-white order-1 w-1/2 text-center px-4 text-4xl font-semibold'>
                        The Apple Watch Ultra 2 features a stunning new design with a larger, brighter display.
                    </p>
                    <p className='w-1/2 order-2'></p>
                </section>

                <section className='relative flex items-center justify-evenly h-screen bg-black' style={{ zIndex: 1 }}>
                    <p className='w-1/2'></p>
                    <p className='text-white w-1/2 text-center px-4 text-4xl font-semibold'>
                        The most advanced Apple Watch ever, with up to 72 hours in low power mode.
                    </p>
                </section>
            </div>
        </>
    )
}

export default Home