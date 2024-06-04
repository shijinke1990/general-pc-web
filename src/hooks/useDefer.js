import { useState } from 'react';

export default function useDefer() {
    const [frameCount, setFrameCount] = useState(0);
    function updateFrameCount() {
        requestAnimationFrame(() => {
            if (frameCount < 20000) {
                setFrameCount(frameCount + 1);
                updateFrameCount();
            }
        });
    }
    updateFrameCount();
    return function defer(n) {
        return frameCount >= n;
    };
}
