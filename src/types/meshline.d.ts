declare module 'meshline' {
    import * as THREE from 'three';

    export class MeshLineGeometry extends THREE.BufferGeometry {
        setPoints(points: THREE.Vector3[]): void;
    }

    export class MeshLineMaterial extends THREE.Material {
        constructor(parameters?: {
            color?: THREE.Color | string | number;
            depthTest?: boolean;
            resolution?: [number, number];
            useMap?: boolean;
            map?: THREE.Texture;
            repeat?: [number, number];
            lineWidth?: number;
            [key: string]: any;
        });
    }
} 