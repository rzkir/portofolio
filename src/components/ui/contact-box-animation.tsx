'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Utility function to get theme colors
function getThemeColor(colorName: string): string {
    if (typeof window === 'undefined') return '#3b82f6' // fallback for SSR

    const computedStyle = getComputedStyle(document.documentElement)
    const color = computedStyle.getPropertyValue(`--${colorName}`).trim()

    // Convert OKLCH to hex if needed
    if (color.startsWith('oklch')) {
        // For simplicity, we'll use fallback colors for OKLCH
        // In a real implementation, you'd want to convert OKLCH to hex
        const colorMap: Record<string, string> = {
            'primary': '#3b82f6',
            'secondary': '#64748b',
            'accent': '#8b5cf6',
            'destructive': '#ef4444',
            'muted': '#6b7280',
            'ring': '#3b82f6',
            'chart-1': '#f59e0b',
            'chart-2': '#10b981',
            'chart-3': '#3b82f6',
            'chart-4': '#f97316',
            'chart-5': '#f59e0b'
        }
        return colorMap[colorName] || '#3b82f6'
    }

    return color || '#3b82f6'
}

// Meteor effect with trailing particles
function MeteorEffect() {
    const meteorRef = useRef<THREE.Group>(null)
    const trailRef = useRef<THREE.Points>(null)

    const trailPositions = useMemo(() => {
        const positions = new Float32Array(50 * 3)
        for (let i = 0; i < 50; i++) {
            positions[i * 3] = 0
            positions[i * 3 + 1] = 0
            positions[i * 3 + 2] = 0
        }
        return positions
    }, [])

    useFrame((state) => {
        if (meteorRef.current && trailRef.current) {
            const time = state.clock.elapsedTime

            // Meteor movement
            meteorRef.current.position.x = Math.sin(time * 0.3) * 6 - 3
            meteorRef.current.position.y = Math.cos(time * 0.4) * 4 + 2
            meteorRef.current.position.z = Math.sin(time * 0.5) * 2

            // Meteor rotation
            meteorRef.current.rotation.x = time * 2
            meteorRef.current.rotation.y = time * 1.5
            meteorRef.current.rotation.z = time * 0.8

            // Trail effect
            const trailMaterial = trailRef.current.material as THREE.PointsMaterial
            trailMaterial.size = 0.05 + Math.sin(time * 10) * 0.02

            // Update trail positions
            const positions = trailRef.current.geometry.attributes.position.array as Float32Array
            for (let i = 0; i < 50; i++) {
                const t = time - i * 0.02
                positions[i * 3] = Math.sin(t * 0.3) * 6 - 3
                positions[i * 3 + 1] = Math.cos(t * 0.4) * 4 + 2
                positions[i * 3 + 2] = Math.sin(t * 0.5) * 2
            }
            trailRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <group>
            {/* Meteor trail */}
            <Points ref={trailRef} positions={trailPositions} stride={3}>
                <PointMaterial
                    transparent
                    color={getThemeColor('chart-1')}
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Main meteor */}
            <group ref={meteorRef}>
                <mesh scale={0.1}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color={getThemeColor('chart-1')}
                        transparent
                        opacity={0.8}
                        emissive={getThemeColor('chart-1')}
                        emissiveIntensity={0.5}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Meteor glow */}
                <mesh scale={0.2}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color={getThemeColor('chart-1')}
                        transparent
                        opacity={0.3}
                        emissive={getThemeColor('chart-1')}
                        emissiveIntensity={0.2}
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>
            </group>
        </group>
    )
}

// Multiple meteors effect
function MultipleMeteors() {
    return (
        <group>
            {Array.from({ length: 3 }).map((_, i) => (
                <SingleMeteor key={i} index={i} />
            ))}
        </group>
    )
}

// Individual meteor with unique path
function SingleMeteor({ index }: { index: number }) {
    const meteorRef = useRef<THREE.Group>(null)
    const trailRef = useRef<THREE.Points>(null)

    const trailPositions = useMemo(() => {
        const positions = new Float32Array(30 * 3)
        for (let i = 0; i < 30; i++) {
            positions[i * 3] = 0
            positions[i * 3 + 1] = 0
            positions[i * 3 + 2] = 0
        }
        return positions
    }, [])

    useFrame((state) => {
        if (meteorRef.current && trailRef.current) {
            const time = state.clock.elapsedTime + index * 2

            // Unique path for each meteor
            const speed = 0.2 + index * 0.1
            const amplitude = 4 + index * 1

            meteorRef.current.position.x = Math.sin(time * speed) * amplitude
            meteorRef.current.position.y = Math.cos(time * speed * 1.2) * (amplitude * 0.8)
            meteorRef.current.position.z = Math.sin(time * speed * 0.8) * (amplitude * 0.5)

            // Rotation
            meteorRef.current.rotation.x = time * (1 + index * 0.5)
            meteorRef.current.rotation.y = time * (0.8 + index * 0.3)
            meteorRef.current.rotation.z = time * (0.6 + index * 0.2)

            // Trail effect
            const trailMaterial = trailRef.current.material as THREE.PointsMaterial
            trailMaterial.size = 0.03 + Math.sin(time * 8 + index) * 0.01

            // Update trail positions
            const positions = trailRef.current.geometry.attributes.position.array as Float32Array
            for (let i = 0; i < 30; i++) {
                const t = time - i * 0.015
                positions[i * 3] = Math.sin(t * speed) * amplitude
                positions[i * 3 + 1] = Math.cos(t * speed * 1.2) * (amplitude * 0.8)
                positions[i * 3 + 2] = Math.sin(t * speed * 0.8) * (amplitude * 0.5)
            }
            trailRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    const meteorColors = [
        getThemeColor('chart-1'),
        getThemeColor('chart-2'),
        getThemeColor('chart-3')
    ]

    return (
        <group>
            {/* Meteor trail */}
            <Points ref={trailRef} positions={trailPositions} stride={3}>
                <PointMaterial
                    transparent
                    color={meteorColors[index]}
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Main meteor */}
            <group ref={meteorRef}>
                <mesh scale={0.08}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color={meteorColors[index]}
                        transparent
                        opacity={0.9}
                        emissive={meteorColors[index]}
                        emissiveIntensity={0.6}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Meteor glow */}
                <mesh scale={0.15}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color={meteorColors[index]}
                        transparent
                        opacity={0.4}
                        emissive={meteorColors[index]}
                        emissiveIntensity={0.3}
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>
            </group>
        </group>
    )
}

// Modern wave pattern effect
// Modern glowing particles with interaction
function ModernParticles({ count = 300 }) {
    const ref = useRef<THREE.Points>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4

            // Create gradient colors using theme colors
            const themeColors = [
                getThemeColor('primary'),
                getThemeColor('accent'),
                getThemeColor('ring'),
                getThemeColor('chart-1'),
                getThemeColor('chart-2')
            ]
            const color = new THREE.Color(themeColors[i % themeColors.length])
            colors[i * 3] = color.r
            colors[i * 3 + 1] = color.g
            colors[i * 3 + 2] = color.b
        }
        return { positions, colors }
    }, [count])

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05 + mousePosition.y * 0.1
            ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05 + mousePosition.x * 0.1

            // Animate particle sizes
            const material = ref.current.material as THREE.PointsMaterial
            material.size = 0.02 + Math.sin(state.clock.elapsedTime * 2) * 0.01
        }
    })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <Points ref={ref} positions={positions.positions} colors={positions.colors} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

// Modern geometric shapes with advanced materials (without cubes)
function ModernGeometricShapes() {
    const groupRef = useRef<THREE.Group>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + mousePosition.y * 0.2
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + mousePosition.x * 0.2
        }
    })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <group ref={groupRef}>
            {/* Modern floating spheres */}
            {Array.from({ length: 6 }).map((_, i) => (
                <ModernSphere key={`sphere-${i}`} index={i} />
            ))}

            {/* Modern floating rings */}
            {Array.from({ length: 4 }).map((_, i) => (
                <ModernRing key={`ring-${i}`} index={i} />
            ))}
        </group>
    )
}

// Modern sphere with glow effect
function ModernSphere({ index }: { index: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime
            meshRef.current.position.x = Math.sin(time * 0.3 + index) * 3.5
            meshRef.current.position.y = Math.cos(time * 0.4 + index) * 2.5
            meshRef.current.position.z = Math.sin(time * 0.5 + index) * 1.5
            meshRef.current.rotation.x = time * 0.2 + index
            meshRef.current.rotation.y = time * 0.3 + index

            // Breathing effect
            const scale = 0.06 + Math.sin(time * 2 + index) * 0.02
            meshRef.current.scale.setScalar(scale)
        }
    })

    const themeColors = [
        getThemeColor('primary'),
        getThemeColor('accent'),
        getThemeColor('ring'),
        getThemeColor('chart-1'),
        getThemeColor('chart-2'),
        getThemeColor('chart-3')
    ]

    return (
        <mesh ref={meshRef} scale={0.06}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color={themeColors[index % themeColors.length]}
                transparent
                opacity={0.5}
                wireframe
                emissive={themeColors[index % themeColors.length]}
                emissiveIntensity={0.4}
                metalness={0.6}
                roughness={0.3}
            />
        </mesh>
    )
}

// Modern ring with rotation effect
function ModernRing({ index }: { index: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime
            meshRef.current.position.x = Math.cos(time * 0.2 + index) * 3
            meshRef.current.position.y = Math.sin(time * 0.3 + index) * 2
            meshRef.current.rotation.z = time * 0.8 + index
            meshRef.current.rotation.x = time * 0.4 + index

            // Scale animation
            const scale = 0.12 + Math.sin(time * 1.5 + index) * 0.03
            meshRef.current.scale.setScalar(scale)
        }
    })

    const themeColors = [
        getThemeColor('chart-4'),
        getThemeColor('chart-5'),
        getThemeColor('accent'),
        getThemeColor('ring')
    ]

    return (
        <mesh ref={meshRef} scale={0.12}>
            <torusGeometry args={[1, 0.2, 16, 32]} />
            <meshStandardMaterial
                color={themeColors[index % themeColors.length]}
                transparent
                opacity={0.4}
                wireframe
                emissive={themeColors[index % themeColors.length]}
                emissiveIntensity={0.3}
                metalness={0.7}
                roughness={0.2}
            />
        </mesh>
    )
}

// Floating energy orbs
function FloatingEnergyOrbs() {
    return (
        <group>
            {Array.from({ length: 5 }).map((_, i) => (
                <EnergyOrb key={i} index={i} />
            ))}
        </group>
    )
}

// Individual energy orb
function EnergyOrb({ index }: { index: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime
            meshRef.current.position.x = Math.sin(time * 0.4 + index) * 2.5
            meshRef.current.position.y = Math.cos(time * 0.6 + index) * 1.8
            meshRef.current.position.z = Math.sin(time * 0.3 + index) * 1
            meshRef.current.rotation.x = time * 0.5 + index
            meshRef.current.rotation.y = time * 0.7 + index

            // Energy pulse
            const scale = 0.04 + Math.sin(time * 4 + index) * 0.015
            meshRef.current.scale.setScalar(scale)
        }
    })

    const themeColors = [
        getThemeColor('primary'),
        getThemeColor('accent'),
        getThemeColor('chart-1'),
        getThemeColor('chart-2'),
        getThemeColor('ring')
    ]

    return (
        <mesh ref={meshRef} scale={0.04}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color={themeColors[index % themeColors.length]}
                transparent
                opacity={0.6}
                wireframe
                emissive={themeColors[index % themeColors.length]}
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    )
}

// Main modern contact box animation component
export default function ContactBoxAnimation() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                style={{ background: 'transparent' }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={1} color={getThemeColor('primary')} />
                <pointLight position={[-5, -5, 5]} intensity={0.8} color={getThemeColor('accent')} />
                <spotLight
                    position={[0, 5, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={0.6}
                    color={getThemeColor('ring')}
                />

                <ModernParticles count={200} />
                <ModernGeometricShapes />
                <FloatingEnergyOrbs />
                <MultipleMeteors />
            </Canvas>
        </div>
    )
} 