type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

type PixelBlastProps = {
    variant?: PixelBlastVariant;
    pixelSize?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    antialias?: boolean;
    patternScale?: number;
    patternDensity?: number;
    liquid?: boolean;
    liquidStrength?: number;
    liquidRadius?: number;
    pixelSizeJitter?: number;
    enableRipples?: boolean;
    rippleIntensityScale?: number;
    rippleThickness?: number;
    rippleSpeed?: number;
    liquidWobbleSpeed?: number;
    autoPauseOffscreen?: boolean;
    speed?: number;
    transparent?: boolean;
    edgeFade?: number;
    noiseAmount?: number;
};