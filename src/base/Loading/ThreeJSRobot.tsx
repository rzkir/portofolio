'use client'

import { Canvas, useFrame } from '@react-three/fiber'

import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'

import { useRef, useState, Suspense } from 'react'

import * as THREE from 'three'

function ModernLoading() {
    const groupRef = useRef<THREE.Group>(null)
    const mainSphereRef = useRef<THREE.Mesh>(null)
    const ringRef = useRef<THREE.Mesh>(null)
    const cubesRef = useRef<THREE.Group>(null)
    const [time, setTime] = useState(0)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        setTime(t)

        // Main sphere pulsing
        if (mainSphereRef.current) {
            const scale = 1 + Math.sin(t * 3) * 0.1
            mainSphereRef.current.scale.setScalar(scale)
            mainSphereRef.current.rotation.y = t * 0.5
            mainSphereRef.current.rotation.x = t * 0.3
        }

        // Rotating ring
        if (ringRef.current) {
            ringRef.current.rotation.x = t * 0.8
            ringRef.current.rotation.z = t * 0.4
            ringRef.current.position.y = Math.sin(t * 2) * 0.1
        }

        // Floating cubes
        if (cubesRef.current) {
            cubesRef.current.rotation.y = t * 0.3
            cubesRef.current.rotation.x = t * 0.2
        }

        // Overall group movement
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 1.5) * 0.05
            groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1
        }
    })

    const blueGlow = new THREE.Color(0x00aaff)
    const purpleGlow = new THREE.Color(0x8a2be2)
    const cyanGlow = new THREE.Color(0x00ffff)
    const pinkGlow = new THREE.Color(0xff69b4)

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Main Central Sphere */}
            <Sphere
                ref={mainSphereRef}
                args={[0.8, 32, 32]}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial
                    color={blueGlow}
                    emissive={blueGlow}
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </Sphere>

            {/* Rotating Ring */}
            <Torus
                ref={ringRef}
                args={[1.2, 0.05, 16, 100]}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial
                    color={purpleGlow}
                    emissive={purpleGlow}
                    emissiveIntensity={1.5}
                />
            </Torus>

            {/* Floating Cubes */}
            <group ref={cubesRef} position={[0, 0, 0]}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <Box
                        key={i}
                        args={[0.15, 0.15, 0.15]}
                        position={[
                            Math.cos(i * (Math.PI / 4) + time * 0.5) * 1.8,
                            Math.sin(i * (Math.PI / 4) + time * 0.5) * 1.8,
                            Math.sin(time * 2 + i) * 0.3
                        ]}
                        rotation={[time * 2 + i, time * 1.5 + i, time + i]}
                    >
                        <meshStandardMaterial
                            color={i % 2 === 0 ? cyanGlow : pinkGlow}
                            emissive={i % 2 === 0 ? cyanGlow : pinkGlow}
                            emissiveIntensity={1}
                            transparent
                            opacity={0.7}
                        />
                    </Box>
                ))}
            </group>

            {/* Orbiting Spheres */}
            {Array.from({ length: 12 }).map((_, i) => (
                <Sphere
                    key={`orbit-${i}`}
                    args={[0.03 + Math.sin(time * 4 + i) * 0.01, 16, 16]}
                    position={[
                        Math.cos(time * 1.2 + i * (Math.PI / 6)) * 2.5,
                        Math.sin(time * 1.2 + i * (Math.PI / 6)) * 2.5,
                        Math.sin(time * 3 + i) * 0.5
                    ]}
                >
                    <meshStandardMaterial
                        color={[blueGlow, purpleGlow, cyanGlow, pinkGlow][i % 4]}
                        emissive={[blueGlow, purpleGlow, cyanGlow, pinkGlow][i % 4]}
                        emissiveIntensity={0.8 + Math.sin(time * 5 + i) * 0.4}
                    />
                </Sphere>
            ))}

            {/* Energy Waves */}
            {Array.from({ length: 3 }).map((_, i) => (
                <Torus
                    key={`wave-${i}`}
                    args={[2.2 + i * 0.3, 0.02, 8, 50]}
                    position={[0, 0, 0]}
                    rotation={[time * 0.3 + i, time * 0.2 + i, time * 0.1 + i]}
                >
                    <meshStandardMaterial
                        color={[blueGlow, purpleGlow, cyanGlow][i]}
                        emissive={[blueGlow, purpleGlow, cyanGlow][i]}
                        emissiveIntensity={0.3 + Math.sin(time * 2 + i) * 0.2}
                        transparent
                        opacity={0.4 + Math.sin(time * 3 + i) * 0.2}
                    />
                </Torus>
            ))}

            {/* Floating Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Sphere
                    key={`particle-${i}`}
                    args={[0.01 + Math.sin(time * 6 + i) * 0.005, 8, 8]}
                    position={[
                        Math.sin(time * 1.8 + i * 0.5) * (3 + Math.sin(time + i) * 0.5),
                        Math.cos(time * 1.8 + i * 0.5) * (3 + Math.sin(time + i) * 0.5),
                        Math.sin(time * 2.5 + i) * 1
                    ]}
                >
                    <meshStandardMaterial
                        color={[blueGlow, purpleGlow, cyanGlow, pinkGlow][i % 4]}
                        emissive={[blueGlow, purpleGlow, cyanGlow, pinkGlow][i % 4]}
                        emissiveIntensity={0.6 + Math.sin(time * 4 + i) * 0.4}
                    />
                </Sphere>
            ))}
        </group>
    )
}

function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <pointLight position={[0, 0, 5]} intensity={0.3} color="#00aaff" />

            {/* Modern Loading Animation */}
            <ModernLoading />
        </>
    )
}

export default function ThreeJSRobot() {
    return (
        <div className="w-full h-full">
            <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }>
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    style={{ background: 'transparent' }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
                    performance={{ min: 0.5 }}
                >
                    <Scene />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                    />
                </Canvas>
            </Suspense>
        </div>
    )
} 