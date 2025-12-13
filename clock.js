const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalDisplay = document.getElementById('digital-time');
const faceMarkings = document.getElementById('face-markings');

function initClockFace() {
    // 1. Create 60 Ticks
    for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        // Rotation: 6 degrees per minute (360 / 60)
        tick.style.transform = `rotate(${i * 6}deg)`;
        faceMarkings.appendChild(tick);
    }

    // 2. Create 12 Numbers
    const radius = 135; // Distance from center to numbers
    for (let i = 1; i <= 12; i++) {
        const num = document.createElement('div');
        num.classList.add('number');
        
        // Check if it's a major number (12, 3, 6, 9)
        if (i % 3 === 0) {
            num.classList.add('num-major');
        } else {
            num.classList.add('num-minor');
        }
        
        num.innerText = i;

        // Calculate Position using Math (Trigonometry)
        // -90 degrees offset because 0 degrees is usually 3 o'clock in trig
        const angle = (i * 30) * (Math.PI / 180); 
        
        // x = r * sin(angle), y = -r * cos(angle) for 12 o'clock top orientation
        const x = radius * Math.sin(angle);
        const y = -radius * Math.cos(angle);

        num.style.transform = `translate(${x}px, ${y}px)`;
        faceMarkings.appendChild(num);
    }
}

function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // --- Analog Clock Rotations ---
    const sDeg = s * 6;
    const mDeg = m * 6 + s * 0.1; // Smooth movement
    const hDeg = (h % 12) * 30 + m * 0.5;

    secondHand.style.transform = `rotate(${sDeg}deg)`;
    minuteHand.style.transform = `rotate(${mDeg}deg)`;
    hourHand.style.transform = `rotate(${hDeg}deg)`;

    // --- Digital Clock Text ---
    // Format: HH : MM : SS
    const displayH = h.toString().padStart(2, '0');
    const displayM = m.toString().padStart(2, '0');
    const displayS = s.toString().padStart(2, '0');
    
    digitalDisplay.innerText = `${displayH} : ${displayM} : ${displayS}`;
}

// Initialize the face (draw numbers/ticks)
initClockFace();

// Start the timer
setInterval(updateClock, 1000);
updateClock(); // Run once immediately