import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from './Scene';


gsap.registerPlugin(ScrollTrigger);

// Home.jsx - Key changes:

function Home() {
    const mainRef = useRef(null);
    const sceneRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    setProgress(self.progress)
                }
            }
        })
        .to(sceneRef.current, { ease: 'none', x: '-25vw' })
        .to(sceneRef.current, { ease: 'none', x: '25vw' })
        .to(sceneRef.current, { ease: 'none', x: '-25vw' })

    }, [])

    return (
        <div ref={mainRef} className='overflow-x-hidden'>
            <Suspense fallback={
                <div className='fixed inset-0 grid place-items-center bg-black text-white'>Loading...</div>
            }>

                {/* ✅ Scene ab FIXED hai - hamesha sab ke upar rahega */}
                <div
                    ref={sceneRef}
                    className='fixed top-0 left-0 h-screen w-screen pointer-events-none'
                    style={{ zIndex: 10 }}
                >
                    <Canvas>
                        <Suspense fallback={null}>
                            <Scene progress={progress} />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Section 1 - Sirf text, Canvas nahi */}
                <section
                    className='relative grid place-items-center h-screen bg-black'
                    style={{ zIndex: 1 }}
                >
                    <p className='text-white text-center absolute top-[5%] mx-4 text-8xl font-bold'>
                        Apple Watch
                    </p>
                    <p className='text-white text-center absolute bottom-[5%] mx-4 text-8xl font-bold'>
                        Ultra 2
                    </p>
                </section>

                {/* Section 2 - z-index 1 rakho takey scene (z:10) upar rahe */}
                <section
                    className='relative flex items-center justify-evenly h-screen bg-black'
                    style={{ zIndex: 1 }}
                >
                    <p className='w-1/2'></p>
                    <p className='text-white w-1/2 text-center px-4 text-4xl font-semibold'>
                         Introducing the Apple Watch Ultra 2, the most advanced Apple Watch ever. With a powerful new S9 SiP, it delivers up to 36 hours 
                         of battery life and up to 72 hours in low power mode, so you can go longer than ever before.
                    </p>
                </section>

                {/* Section 3 */}
                <section
                    className='relative flex items-center justify-evenly h-screen bg-black'
                    style={{ zIndex: 1 }}
                >
                    <p className='text-white order-1 w-1/2 text-center px-4 text-4xl font-semibold'>
                        The Apple Watch Ultra 2 features a stunning new design with a larger, brighter display and a more durable case Apple Watch to be certified to the MIL-STD 810H standard.
                    </p>
                    <p className='w-1/2 order-2'></p>
                </section>

                {/* Section 4 */}
                <section
                    className='relative flex items-center justify-evenly h-screen bg-black'
                    style={{ zIndex: 1 }}
                >
                    <p className='w-1/2'></p>
                    <p className='text-white w-1/2 text-center px-4 text-4xl font-semibold'>
                        The Apple Watch Ultra 2 is the most advanced Apple Watch ever, with a powerful new S9 SiP that delivers up to 36 hours of 
                       battery life and up to 72 hours in low power mode.
                    </p>
                </section>

            </Suspense>
        </div>
    )
}

export default Home