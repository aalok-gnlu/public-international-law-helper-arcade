// --- Dino Game Engine ---
const canvas = document.getElementById('dino-canvas');
const ctx = canvas.getContext('2d');
const dinoSprite = new Image();
dinoSprite.src = 'dino_sprite.png'; // Official original Chrome offline sprite

let dinoState = 'start'; // start, playing, paused_fact, countdown, gameover
let highScore = 0;
let currentFactText = "";
let countdownVal = 3;
let countdownTimer = null;

let preWarningInterval = null;
let factLockInterval = null;
let preWarningMilestone = 0;
let factTouchLocked = false;
let factLockRemaining = 0;

const g = {
    dino: { x: 30, y: 150, width: 44, height: 47, velocityY: 0 },
    gravity: 0.6,
    jumpStrength: -11,
    isJumping: false,
    groundY: 200,
    obstacles: [],
    clouds: [],
    speed: 5,
    score: 0,
    nextMilestone: 50, // Score target to spawn the next fact
    frameCount: 0,
    factBox: null // Tracks the incoming collectible
};

function startDinoGame() {
    if (dinoState === 'start' || dinoState === 'gameover') {
        resetDino();
        dinoState = 'playing';
    }
}

function resetDino() {
    g.dino.y = g.groundY - g.dino.height;
    g.dino.velocityY = 0;
    g.isJumping = false;
    g.obstacles = [];
    g.clouds = [];
    g.score = 0;
    g.speed = 5;
    g.frameCount = 0;
    g.nextMilestone = (window.factsCollected + 1) * 50; 
    g.factBox = null;

    clearInterval(preWarningInterval);
    clearInterval(factLockInterval);
    factTouchLocked = false;
    preWarningMilestone = 0;
    dismissIsland();

    spawnCloud();
}

function dinoJump(e) {
    if (e && e.type !== 'keydown') e.preventDefault();
    if (activeScreen !== 'dino') return;

    if (dinoState === 'start' || dinoState === 'gameover') {
        startDinoGame();
    } else if (dinoState === 'playing' && !g.isJumping) {
        g.dino.velocityY = g.jumpStrength;
        g.isJumping = true;
    } else if (dinoState === 'paused_fact') {
        if (factTouchLocked) {
            setSmallIsland(islandTemplates.touchBlockedWarning(factLockRemaining), '100px');
            return;
        }

        // Slide facts out, No Internet text back in
        if (window.els && window.els.dinoErrorText) {
            window.els.dinoErrorText.classList.replace('-translate-x-[120%]', 'translate-x-0');
            window.els.dinoErrorText.classList.replace('opacity-0', 'opacity-100');
        }

        const factText = document.getElementById('dino-fact-text');
        factText.classList.replace('translate-x-0', 'translate-x-[120%]');
        factText.classList.replace('opacity-100', 'opacity-0');

        // Start Countdown
        dinoState = 'countdown';
        countdownVal = 3;

        const cdDisplay = document.getElementById('dino-countdown-display');
        const cdVal = document.getElementById('dino-countdown-val');
        cdVal.innerText = countdownVal;
        cdDisplay.classList.replace('opacity-0', 'opacity-100');

        countdownTimer = setInterval(() => {
            countdownVal--;
            if (countdownVal > 0) {
                cdVal.innerText = countdownVal;
                // Trigger a small scale animation reset
                cdVal.style.animation = 'none';
                void cdVal.offsetWidth;
                cdVal.style.animation = null;
            }

            if (countdownVal <= 0) {
                clearInterval(countdownTimer);
                cdDisplay.classList.replace('opacity-100', 'opacity-0');
                if (factsCollected >= requiredFactsCount) {
                    openWifiPortal();
                } else {
                    dinoState = 'playing';
                }
            }
        }, 800); // slightly faster countdown pacing
    }
}

document.getElementById('screen-dino').addEventListener('pointerdown', dinoJump);
window.addEventListener('keydown', (e) => {
    if (activeScreen === 'dino' && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault(); dinoJump(e);
    }
});

function spawnCloud() { g.clouds.push({ x: 360, y: Math.random() * 80 + 30, speed: Math.random() * 0.5 + 0.5 }); }

function spawnObstacle() {
    const isLarge = Math.random() > 0.5;
    const isCluster = Math.random() > 0.8;
    const width = isLarge ? 24 : 16;
    const height = isLarge ? 48 : 34;
    const actualWidth = isCluster ? width * 2 : width;
    const minDistance = 200 + (g.speed * 15);
    const lastObs = g.obstacles[g.obstacles.length - 1];

    if (!lastObs || (360 - lastObs.x > minDistance)) {
        g.obstacles.push({ x: 360, y: g.groundY - height, width: actualWidth, height, isLarge, isCluster });
    }
}

function updateDino() {
    g.dino.velocityY += g.gravity;
    g.dino.y += g.dino.velocityY;

    if (g.dino.y + g.dino.height >= g.groundY) {
        g.dino.y = g.groundY - g.dino.height;
        g.dino.velocityY = 0;
        g.isJumping = false;
    }

    g.obstacles.forEach(o => o.x -= g.speed);
    g.clouds.forEach(c => c.x -= c.speed);

    if (g.obstacles.length && g.obstacles[0].x + g.obstacles[0].width < 0) g.obstacles.shift();
    if (g.clouds.length && g.clouds[0].x + 50 < 0) g.clouds.shift();

    g.frameCount++;

    const spawnRate = Math.max(35, Math.floor(100 - g.speed * 8));
    if (g.frameCount % spawnRate === 0 && Math.random() > 0.3) spawnObstacle();
    if (g.frameCount % 150 === 0 && Math.random() > 0.5) spawnCloud();

    // Collision Detection with Cacti
    const mx = 8, my = 10;
    for (let o of g.obstacles) {
        if (g.dino.x + mx < o.x + o.width && g.dino.x + g.dino.width - mx > o.x &&
            g.dino.y + my < o.y + o.height && g.dino.y + g.dino.height - my > o.y) {

            dinoState = 'gameover';
            if (window.els && window.els.dinoErrorText) {
                window.els.dinoErrorText.style.opacity = '1';
            }

            // --- Log for Analytics ---
            if (window.gameState && window.gameState.analytics) {
                const scoreRemaining = g.nextMilestone - g.score;
                const isNearMilestone = scoreRemaining <= 20;
                const isDistracted = g.factBox && g.factBox.active;
                const phase = window.gameState.currentLevel || 1;

                window.gameState.analytics.gaming.totalDeaths++;
                if (!window.gameState.analytics.gaming.levelFailures) window.gameState.analytics.gaming.levelFailures = [0,0,0,0,0];
                
                // Safety: Ensure index exists
                const phaseIdx = Math.min(phase, 4);
                window.gameState.analytics.gaming.levelFailures[phaseIdx]++;
                
                if (isNearMilestone) window.gameState.analytics.gaming.milestoneFails++;
                if (isDistracted) window.gameState.analytics.gaming.distractions++;

                window.gameState.analytics.gaming.deaths.push({
                    level: phase,
                    score: Math.floor(g.score),
                    isNearMilestone,
                    isDistracted,
                    timestamp: Date.now()
                });
                localStorage.setItem('gnluGameState', JSON.stringify(window.gameState));
            }

            if (Math.floor(g.score) > highScore) highScore = Math.floor(g.score);
            return;
        }
    }

    g.score += 0.15;

    // RULE: Facts appear at multiples of 50. Skip if already collected.
    g.nextMilestone = (window.factsCollected + 1) * 50;

    // ATPS Pre-milestone warning (3 seconds before the box hits the dino)
    const scoreRemaining = g.nextMilestone - g.score;
    // Calculate how much score will pass while the box travels from x=360 to x=74 (hit point)
    const travelDistance = 286; 
    const scoreLead = (travelDistance / g.speed) * 0.15;

    if (scoreRemaining <= scoreLead + 10 && scoreRemaining > 0 && preWarningMilestone !== g.nextMilestone) {
        preWarningMilestone = g.nextMilestone;
        let count = 3;
        setSmallIsland(islandTemplates.preMilestoneWarning(count), '100px');
        clearInterval(preWarningInterval);
        preWarningInterval = setInterval(() => {
            count--;
            if (count > 0 && activeScreen === 'dino' && dinoState === 'playing') {
                setSmallIsland(islandTemplates.preMilestoneWarning(count), '100px');
            } else {
                clearInterval(preWarningInterval);
            }
        }, 1000);
    }

    // Spawn Fact Box such that it hits the dino close to the milestone
    if (scoreRemaining <= scoreLead && !g.factBox) {
        g.factBox = { x: 360, y: g.groundY - 85, width: 70, height: 28, active: true };
    }

    // Update Fact Box Position & Trigger Check
    if (g.factBox && g.factBox.active) {
        g.factBox.x -= g.speed;

        // Trigger automatically when it reaches the dino or hits the score milestone
        if (g.factBox.x <= g.dino.x + g.dino.width || g.score >= g.nextMilestone) {

            // TRIGGER THE FACT!
            g.factBox = null;

            g.speed += 0.4;
            dinoState = 'paused_fact';

            // Clear Pre-warning immediately
            clearInterval(preWarningInterval);
            dismissIsland();

            currentFactText = window.selectedFacts[factsCollected % window.selectedFacts.length].fact;

            // Trigger Slide Animation
            if (window.els && window.els.dinoErrorText) {
                window.els.dinoErrorText.classList.replace('translate-x-0', '-translate-x-[120%]');
                window.els.dinoErrorText.classList.replace('opacity-100', 'opacity-0');
            }

            const factContent = document.getElementById('dino-fact-content');
            factContent.innerText = currentFactText;
            const factText = document.getElementById('dino-fact-text');
            factText.classList.replace('translate-x-[120%]', 'translate-x-0');
            factText.classList.replace('opacity-0', 'opacity-100');

            // Initialize ATPS (Accidental Touch Protection System)
            factTouchLocked = true;
            factLockRemaining = 3;

            const hintEl = document.getElementById('dino-fact-hint');
            hintEl.innerText = "Touch Locked (" + factLockRemaining + "s)";
            hintEl.classList.remove('animate-pulse');
            hintEl.style.color = '#FF3B30';

            clearInterval(factLockInterval);
            factLockInterval = setInterval(() => {
                factLockRemaining--;
                if (factLockRemaining <= 0) {
                    factTouchLocked = false;
                    clearInterval(factLockInterval);
                    hintEl.innerText = "Tap screen to continue...";
                    hintEl.classList.add('animate-pulse');
                    hintEl.style.color = '#5f6368'; // Restore normal color

                    // Dismiss ATPS warning island if it's currently visible
                    if (window.els && window.els.islandBaseSmall && window.els.islandBaseSmall.classList.contains('active') && document.getElementById('island-content-small').innerHTML.includes('prevented')) {
                        dismissIsland();
                    }
                } else {
                    hintEl.innerText = "Touch Locked (" + factLockRemaining + "s)";
                    // Realtime update island tracker if the user has triggered the alert
                    if (window.els && window.els.islandBaseSmall && window.els.islandBaseSmall.classList.contains('active') && document.getElementById('island-content-small').innerHTML.includes('prevented')) {
                        setSmallIsland(islandTemplates.touchBlockedWarning(factLockRemaining), '100px');
                    }
                }
            }, 1000);

            factsCollected++;
        }
    }
}

function drawDinoFrame() {
    ctx.clearRect(0, 0, 360, 250);

    // Clouds
    g.clouds.forEach(c => {
        if (dinoSprite.complete) {
            ctx.drawImage(dinoSprite, 86, 2, 46, 14, c.x, c.y, 46, 14);
        } else {
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(c.x + 10, c.y, 20, 10); ctx.fillRect(c.x, c.y + 5, 40, 10); ctx.fillRect(c.x + 5, c.y - 5, 15, 10);
        }
    });

    // Ground Line
    if (dinoSprite.complete) {
        // Slice a segment of the authentic ground
        const groundOffset = (g.frameCount * g.speed) % 1200;
        ctx.drawImage(dinoSprite, 2 + groundOffset, 54, 360, 14, 0, g.groundY - 10, 360, 14);
        // If the wrap-around leaves a gap
        if (360 + groundOffset > 1200) {
            ctx.drawImage(dinoSprite, 2, 54, 360 - (1200 - groundOffset), 14, 1200 - groundOffset, g.groundY - 10, 360 - (1200 - groundOffset), 14);
        }
    } else {
        ctx.beginPath(); ctx.moveTo(0, g.groundY); ctx.lineTo(360, g.groundY);
        ctx.strokeStyle = '#535353'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Obstacles
    g.obstacles.forEach(o => {
        if (dinoSprite.complete) {
            if (o.isLarge) {
                ctx.drawImage(dinoSprite, 332, 2, 25, 50, o.x, g.groundY - 48, 25, 48);
                if (o.isCluster) ctx.drawImage(dinoSprite, 357, 2, 25, 50, o.x + 18, g.groundY - 48, 25, 48);
            } else {
                ctx.drawImage(dinoSprite, 228, 2, 17, 35, o.x, g.groundY - 34, 17, 34);
                if (o.isCluster) ctx.drawImage(dinoSprite, 245, 2, 34, 35, o.x + 15, g.groundY - 34, 34, 34);
            }
        } else {
            ctx.fillStyle = '#535353';
            ctx.fillRect(o.x, o.y, o.isLarge ? 24 : 16, o.height);
        }
    });

    // Fact Box Collectible
    if (g.factBox && g.factBox.active) {
        const fx = g.factBox.x, fy = g.factBox.y, fw = g.factBox.width, fh = g.factBox.height;
        const r = 6; // border radius

        ctx.save();

        // Drop shadow
        ctx.shadowColor = "rgba(0,0,0,0.1)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        // Box background & border
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#cbd5e1"; // Tailwinds gray-300
        ctx.lineWidth = 1.5;

        // Draw rounded rectangle
        ctx.beginPath();
        ctx.moveTo(fx + r, fy);
        ctx.lineTo(fx + fw - r, fy);
        ctx.quadraticCurveTo(fx + fw, fy, fx + fw, fy + r);
        ctx.lineTo(fx + fw, fy + fh - r);
        ctx.quadraticCurveTo(fx + fw, fy + fh, fx + fw - r, fy + fh);
        ctx.lineTo(fx + r, fy + fh);
        ctx.quadraticCurveTo(fx, fy + fh, fx, fy + fh - r);
        ctx.lineTo(fx, fy + r);
        ctx.quadraticCurveTo(fx, fy, fx + r, fy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Reset shadow for text
        ctx.shadowColor = "transparent";

        // Blue Text inside the box
        ctx.fillStyle = "#85b9ff";
        ctx.font = 'bold 13px "Inter", "Helvetica Neue", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("FACT " + (factsCollected + 1), fx + fw / 2, fy + fh / 2 + 1);

        ctx.restore();
    }

    // Score
    ctx.font = 'bold 16px "Courier New", Courier, monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#535353';
    ctx.fillText("HI " + highScore.toString().padStart(5, '0') + "  " + Math.floor(g.score).toString().padStart(5, '0'), 340, 30);

    // Dino
    const x = g.dino.x, y = g.dino.y;

    if (dinoSprite.complete) {
        let dinoX = 848; // Standing
        if (dinoState === 'gameover') {
            dinoX = 1024; // Dead
        } else if (g.isJumping || dinoState === 'countdown' || dinoState === 'paused_fact') {
            dinoX = 848; // Jumping / Static
        } else {
            dinoX = (Math.floor(g.frameCount / 6) % 2 === 0) ? 936 : 980; // Running frames
        }
        ctx.drawImage(dinoSprite, dinoX, 2, 44, 47, x, y, 44, 47);
    } else {
        ctx.fillStyle = '#535353';
        ctx.fillRect(x, y, 44, 47); // fallback block
    }

    // Overlays
    ctx.textAlign = 'center';
    if (dinoState === 'paused_fact') {
        ctx.fillStyle = '#535353';
        ctx.font = 'bold 24px "Courier New", Courier, monospace';
        ctx.fillText('PAUSED', 180, 100);
    } else if (dinoState === 'countdown') {
        ctx.fillStyle = '#535353';
        ctx.font = 'bold 24px "Courier New", Courier, monospace';
        ctx.fillText('PAUSED', 180, 100);
    } else if (dinoState === 'gameover') {
        ctx.font = 'bold 20px "Courier New"'; ctx.fillText('G A M E  O V E R', 180, 100);
        ctx.font = '14px "Courier New"'; ctx.fillText('Tap to restart', 180, 140);
    } else if (dinoState === 'start') {
        ctx.font = 'bold 16px "Courier New"'; ctx.fillText('Tap screen to jump', 180, 100);
    }
}

function gameLoop() {
    if (window.activeScreen === 'dino') {
        ctx.imageSmoothingEnabled = false;
        if (dinoState === 'playing') updateDino();
        drawDinoFrame();
    }
    requestAnimationFrame(gameLoop);
}