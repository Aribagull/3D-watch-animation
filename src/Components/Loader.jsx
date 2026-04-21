import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'

function Loader() {
    const { progress } = useProgress() 

    useEffect(() => {
        gsap.to(".progress", {
            width: progress + "%",
            ease: "power1.inOut",
            duration: 0.3
        })
        if (progress >= 100) {
            gsap.to(".loader", {
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                onComplete: () => {
                    const loader = document.querySelector(".loader")
                    if (loader) loader.style.display = "none"
                }
            })
        }
    }, [progress])

    return (
        <div className="loader" style={{
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            backgroundColor: 'black'
        }}>
            <h1 style={{ color: 'white', fontSize: '5rem' }}>Nexora ®</h1>

            <div style={{ marginTop: '1rem', color: 'white', opacity: 0.6, fontSize: '0.9rem' }}>
                Loading Vibes Setting Trends...
            </div>

            <div style={{
                marginTop: '16px',
                width: '240px',
                height: '4px',
                background: '#3f3f46',
                borderRadius: '999px',
                overflow: 'hidden'
            }}>
                <div className="progress" style={{
                    width: '0%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '999px'
                }} />
            </div>

            <div style={{ color: 'white', marginTop: '8px', fontSize: '0.8rem', opacity: 0.5 }}>
                {Math.round(progress)}%
            </div>
        </div>
    )
}

export default Loader