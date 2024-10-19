// global.d.ts or screenOrientation.d.ts
interface Document {
    webkitFullscreenElement?: Element | null; // Optional property for webkit
}

interface ScreenOrientation {
    lock(orientation: string): Promise<void>;
    unlock(): Promise<void>;
}
