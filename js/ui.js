// --- Dynamic Island Templates ---
        const islandTemplates = {
            wifiAlert: `
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-[#0A84FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.95 2 4.21 3.34 1.2 5.53l10.8 13.92 10.8-13.92C19.79 3.34 16.05 2 12 2z"/></svg>
                    <span class="text-[14px] font-semibold tracking-wide">GNLU WiFi</span>
                </div>
                <span class="text-[13px] font-medium text-white/80">Disconnected</span>
            `,
            whatsappAlert: (mission) => `
                <div class="flex flex-col w-full text-white pb-2 pt-1 cursor-pointer" onclick="handleNotificationClick(${mission.id})">
                    <div class="flex items-center justify-between w-full mb-1.5 px-1">
                        <div class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span class="text-[12px] font-medium text-white/70 tracking-wide uppercase">WhatsApp</span>
                        </div>
                        <span class="text-[11px] text-white/50 tracking-wide">now</span>
                    </div>
                    <div class="flex items-center gap-3 w-full px-1">
                        <div class="relative w-[40px] h-[40px] flex-shrink-0">
                            <img src="${mission.avatar}" class="w-full h-full rounded-full object-cover shadow-sm">
                            <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#007AFF] rounded-full border-[1.5px] border-black"></div>
                        </div>
                        <div class="flex-1 flex flex-col text-left overflow-hidden pb-1">
                            <span class="text-[14.5px] font-semibold leading-tight truncate mb-0.5">${mission.contact}</span>
                            <span class="text-[13.5px] text-white/90 truncate leading-snug">${mission.q}</span>
                        </div>
                    </div>
                </div>
            `,
            siri: `
                <div class="flex flex-col items-center w-full h-full">
                    <h2 class="text-white font-bold text-[22px] tracking-tight mb-4">Siri</h2>
                    <div class="relative w-[60px] h-[60px] mb-4 flex-shrink-0">
                        <div class="absolute inset-[-12px] rounded-full opacity-30 blur-[12px] bg-gradient-to-r from-[#5b32ff] via-[#ff2a85] to-[#00f0ff] animate-pulse"></div>
                        <div class="siri-modern-container absolute inset-0 scale-[0.8]">
                            <div class="siri-blob siri-blob-1"></div><div class="siri-blob siri-blob-2"></div><div class="siri-blob siri-blob-3"></div><div class="siri-core"></div><div class="siri-modern-glass"></div>
                        </div>
                    </div>
                    <div class="flex-1 flex items-center justify-center w-full px-4 overflow-y-auto min-h-0">
                        <p id="siri-text" class="text-white text-[15px] font-medium text-center leading-snug w-full py-2"></p>
                    </div>
                    <button onclick="dismissIsland()" class="mt-4 mb-2 bg-[#0A84FF] text-white font-semibold text-[15px] py-2.5 px-8 rounded-full active:scale-95 transition-transform w-[140px] flex-shrink-0">Okay</button>
                </div>
            `,
            wifiPortal: `
                <div class="flex flex-col items-center w-full h-full relative">
                    <!-- Skip Button Container (Top Right) -->
                    <div class="absolute top-0 right-0 w-full flex justify-end px-4 pt-4 z-20">
                        <button id="wifi-skip-btn" class="bg-white/10 text-white/80 px-3 py-1.5 rounded-full text-[12px] font-medium backdrop-blur-md border border-white/10 active:scale-95 transition-all hidden">Skip (3)</button>
                    </div>

                    <!-- Warning Overlay -->
                    <div id="wifi-warning-overlay" class="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex-col items-center justify-center p-6 hidden rounded-[40px]">
                        <svg class="w-12 h-12 text-[#FF9F0A] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <div class="text-[15px] font-medium text-white text-center mb-6 leading-relaxed">
                            The WiFi connection slows down everytime you answer incorrectly or skip a question.
                        </div>
                        <label class="flex items-center gap-2 mb-8 cursor-pointer">
                            <div class="relative flex items-center justify-center w-5 h-5">
                                <input type="checkbox" id="wifi-warning-cb" class="appearance-none w-5 h-5 border-[1.5px] border-white/40 rounded-[4px] checked:bg-[#0A84FF] checked:border-[#0A84FF] transition-all">
                                <svg class="absolute w-3 h-3 text-white pointer-events-none opacity-0 check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span class="text-[13px] text-white/80 font-medium">Don't show this to me again</span>
                            <style>.appearance-none:checked + .check-icon { opacity: 1; }</style>
                        </label>
                        <button id="wifi-understood-btn" class="bg-[#0A84FF] text-white font-semibold text-[15px] py-2.5 px-8 rounded-full active:scale-95 transition-transform w-[140px] shadow-lg">Understood</button>
                    </div>

                    <!-- Main Content -->
                    <div id="wifi-main-content" class="flex flex-col items-center w-full h-full transition-all duration-300">
                        <svg id="wifi-dynamic-icon" class="w-[42px] h-[42px] mb-2 mt-4" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path id="wifi-arc-3" d="M 2 8.5 a 15 15 0 0 1 20 0" class="transition-opacity duration-300"></path>
                            <path id="wifi-arc-2" d="M 5 12.5 a 10 10 0 0 1 14 0" class="transition-opacity duration-300"></path>
                            <path id="wifi-arc-1" d="M 8.5 16.5 a 5 5 0 0 1 7 0" class="transition-opacity duration-300"></path>
                            <circle id="wifi-dot" cx="12" cy="20" r="1.5" fill="#0A84FF" stroke="none" class="transition-opacity duration-300"></circle>
                        </svg>
                        <h2 class="text-white font-bold text-[20px] tracking-wide mb-6">GNLU-STUDENT</h2>
                        
                        <div id="wifi-intro-container" class="w-full flex-1 flex flex-col items-center justify-center">
                            <button id="wifi-start-quiz-btn" class="w-full bg-white text-[#0A84FF] font-bold text-[16px] py-3.5 rounded-[14px] active:scale-95 transition-transform shadow-md">Answer to Connect</button>
                        </div>

                        <div id="wifi-question-container" class="w-full flex-1 flex flex-col text-left px-1 hidden">
                            <div class="flex justify-between items-end mb-1">
                                <div class="text-[15px] font-bold text-white" id="wifi-q-num">Question 1</div>
                                <div class="text-[11px] font-medium text-white/40" id="wifi-q-progress">1 of 5</div>
                            </div>
                            <div class="text-[14px] font-medium text-white/80 mb-5 leading-snug" id="wifi-q-text">When was the UN Charter signed?</div>
                            <div class="flex flex-col gap-1 pl-1 w-full" id="wifi-options"></div>
                        </div>

                        <div id="wifi-result-container" class="w-full flex-1 flex flex-col items-center justify-center hidden">
                            <div class="text-[18px] font-bold text-white mb-2" id="wifi-result-text">Connected</div>
                            <div class="text-[14px] font-medium text-white/60 mb-5" id="wifi-result-score">5/5 Score</div>
                            <div id="wifi-result-icon" class="w-16 h-16 rounded-full flex items-center justify-center mb-6"></div>
                        </div>

                        <div id="wifi-footer-actions" class="w-full flex justify-between items-center mt-auto pt-4 pb-2 px-1 hidden">
                            <button id="wifi-prev-btn" class="text-[#0A84FF] text-[15px] font-medium active:opacity-50 transition-opacity px-2 py-2 hidden">Previous</button>
                            <button id="wifi-action-btn" class="bg-[#0A84FF] text-white font-semibold text-[15px] py-2 px-8 rounded-full active:scale-95 transition-transform ml-auto shadow-sm">Next</button>
                        </div>
                    </div>
                </div>
            `,
            preMilestoneWarning: (sec) => `
                <div class="flex items-center gap-3 w-full px-1">
                    <span class="text-[13px] font-medium text-white/90 leading-tight flex-1">Milestone fact time!<br>The game pauses in</span>
                    <span class="text-[26px] font-bold text-[#0A84FF] w-6 text-center leading-none">${sec}</span>
                </div>
            `,
            touchBlockedWarning: (sec) => `
                <div class="flex items-center gap-3 w-full px-1">
                    <svg class="w-6 h-6 text-[#FF3B30] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    </svg>
                    <span class="text-[13px] font-medium text-white/90 leading-tight flex-1">Accidental touch has been prevented, please wait for</span>
                    <span class="text-[26px] font-bold text-[#FF3B30] w-6 text-center leading-none">${sec}</span>
                </div>
            `,
            permissionAlert: (type, appName, desc, iconSvg, onAllow, onDeny) => `
                <div class="flex flex-col items-center w-full h-full pt-2">
                    <div class="w-16 h-16 bg-[#1C1C1E] rounded-full flex items-center justify-center mb-4 border border-white/10 shadow-lg">
                        ${iconSvg}
                    </div>
                    <h2 class="text-white font-bold text-[19px] text-center tracking-tight mb-1.5 px-4 leading-tight">${appName}</h2>
                    <p class="text-white/60 text-[14px] text-center mb-auto px-5 leading-snug">${desc}</p>
                    <div class="flex flex-col w-full gap-2 mt-6 pb-2 px-1">
                        <button onclick="${onAllow}" class="w-full bg-[#0A84FF] text-white font-semibold py-3.5 rounded-[14px] active:scale-[0.98] transition-transform text-[16px] shadow-md">Allow</button>
                        <button onclick="${onDeny}" class="w-full bg-[#2C2C2E] text-white/90 font-medium py-3.5 rounded-[14px] active:scale-[0.98] transition-transform text-[16px]">Don't Allow</button>
                    </div>
                </div>
            `
        };

        // --- Navigation ---
        function triggerPermission(type, appName, desc, iconSvg, onAllowCode) {
            window.tempAllowCallback = () => { eval(onAllowCode); };
            setLargeIsland(islandTemplates.permissionAlert(type, appName, desc, iconSvg, 'tempAllowCallback()', 'dismissIsland()'), '380px', true);
        }

        function grantPermission(type, appToOpen) {
            appPermissions[type] = true;
            dismissIsland();
            setTimeout(() => { openApp(appToOpen); }, 400);
        }

        function openApp(screenId) {
            if (screenId === 'chat' && factsCollected >= requiredFactsCount && isWifiConnected && !isGameFinished) {
                enableChatInput();
                setTimeout(scrollToBottom, 100);
            }

            // Permissions Check Interceptors
            if (screenId === 'camera' && !appPermissions.camera) {
                triggerPermission('camera', '"Camera" Wants Camera Access', 'Would you like to have the personalised version of this app by allowing camera permission?', svgPermissions.camera, 'grantPermission("camera", "camera")');
                return;
            }
            if (screenId === 'maps' && !appPermissions.location) {
                triggerPermission('location', '"Maps" Wants Location Access', 'Would you like to have the personalised version of this app by allowing location permission?', svgPermissions.location, 'grantPermission("location", "maps")');
                return;
            }
            if (screenId === 'contacts' || screenId === 'phone') {
                // No permission required for contacts/phone now
            }

            // Stop camera if leaving camera app
            if (activeScreen === 'camera' && screenId !== 'camera') {
                stopCamera();
            }

            els.screens.forEach(s => s.classList.remove('active'));
            if (screenId === 'settings') updateSettingsToggles();
            document.getElementById('screen-' + screenId).classList.add('active');
            window.activeScreen = screenId;
            updateNavStyle();

            // Init specific apps
            if (screenId === 'camera') initCamera();
            if (screenId === 'maps') initMaps();
            if (screenId === 'contacts') initContacts();
            if (screenId === 'photos') renderPhotos();

            // Close iframe viewer when switching apps
            if (screenId !== 'browser') {
                const iv = document.getElementById('iframe-viewer');
                if (iv) iv.classList.remove('active');
            }

            if (screenId === 'dino') {
                document.getElementById('screen-dino').focus();
            }

            if (screenId === 'browser' && window.gamePhase !== 'onboarding' && !isWifiConnected && factsCollected < requiredFactsCount) {
                let memos = ["Type your search query and hit search."];
                if (window.activeMission) {
                    memos = [
                        `Let's help ${window.activeMission.contact} out! What keywords from their message should we look up?`,
                        `Google is ready. Try searching for key terms to find the answers we need.`,
                        `Ready to search? Let's find what ${window.activeMission.contact} is looking for.`,
                        `Need some help? Search for the main topic requested by ${window.activeMission.contact}.`
                    ];
                }
                setTimeout(() => showSiri(memos[Math.floor(Math.random() * memos.length)]), 400);
            }
        }

        function goHome() {
            if (window.activeScreen === 'tips' && window.gamePhase === 'onboarding') {
                tipsGoBack();
                return;
            }
            if (window.activeScreen === 'chat' && window.gamePhase !== 'onboarding' && window.factsCollected === 0) {
                let memos = ["Great. Now tap Google and search for the answer."];
                if (window.activeMission) {
                    memos = [
                        `To help ${window.activeMission.contact}, we'll need to find some info on Google first.`,
                        `${window.activeMission.contact} is waiting! See if you can find the answer in a search.`,
                        `Let's answer ${window.activeMission.contact}'s question. Head over to Google!`,
                        `Time to search! Open Google and let's find that answer for ${window.activeMission.contact}.`
                    ];
                }
                setTimeout(() => showSiri(memos[Math.floor(Math.random() * memos.length)]), 400);
            }
            if (window.activeScreen !== 'home') openApp('home');
        }

        // --- iOS Swipe-Up Gesture ---
        (function initSwipeGesture() {
            const phoneScreen = document.getElementById('phone-screen');
            if (!phoneScreen) return;

            let touchStartY = 0;
            let touchStartX = 0;
            let touchStartTime = 0;
            let isSwiping = false;

            phoneScreen.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                const rect = phoneScreen.getBoundingClientRect();
                const relativeY = touch.clientY - rect.top;
                const screenHeight = rect.height;

                // Only start tracking if touch begins in bottom 25% of screen
                if (relativeY > screenHeight * 0.75) {
                    touchStartY = touch.clientY;
                    touchStartX = touch.clientX;
                    touchStartTime = Date.now();
                    isSwiping = true;
                } else {
                    isSwiping = false;
                }
            }, { passive: true });

            phoneScreen.addEventListener('touchend', (e) => {
                if (!isSwiping) return;
                isSwiping = false;

                const touch = e.changedTouches[0];
                const deltaY = touchStartY - touch.clientY; // positive = swipe up
                const deltaX = Math.abs(touch.clientX - touchStartX);
                const elapsed = Date.now() - touchStartTime;

                // Swipe up: must travel >50px vertically, be more vertical than horizontal, and be fast
                if (deltaY > 50 && deltaY > deltaX && elapsed < 500) {
                    goHome();
                }
            }, { passive: true });

            // Also support mouse drag for desktop testing
            let mouseStartY = 0;
            let mouseStartX = 0;
            let mouseStartTime = 0;
            let isMouseSwiping = false;

            phoneScreen.addEventListener('mousedown', (e) => {
                const rect = phoneScreen.getBoundingClientRect();
                const relativeY = e.clientY - rect.top;
                const screenHeight = rect.height;

                if (relativeY > screenHeight * 0.75) {
                    mouseStartY = e.clientY;
                    mouseStartX = e.clientX;
                    mouseStartTime = Date.now();
                    isMouseSwiping = true;
                }
            });

            phoneScreen.addEventListener('mouseup', (e) => {
                if (!isMouseSwiping) return;
                isMouseSwiping = false;

                const deltaY = mouseStartY - e.clientY;
                const deltaX = Math.abs(e.clientX - mouseStartX);
                const elapsed = Date.now() - mouseStartTime;

                if (deltaY > 50 && deltaY > deltaX && elapsed < 500) {
                    goHome();
                }
            });
        })();

        // --- Dynamic Island Component Logic ---
        function setSmallIsland(contentHtml, height = '100px') {
            els.islandBaseLarge.classList.remove('active');
            els.islandBaseSmall.classList.add('active');

            els.island.style.width = '320px';
            els.island.style.height = height;
            els.island.style.borderRadius = '40px';
            els.island.style.border = '1px solid rgba(255,255,255,0.05)';
            els.island.classList.remove('siri-glow');
            els.statusBar.style.opacity = '1';

            els.islandContentSmall.innerHTML = contentHtml;

            const backdrop = document.getElementById('island-backdrop');
            if (backdrop) {
                backdrop.classList.replace('opacity-100', 'opacity-0');
                backdrop.style.pointerEvents = 'none';
            }
        }

        function setLargeIsland(contentHtml, height = '440px', glow = false) {
            els.islandBaseSmall.classList.remove('active');
            els.islandBaseLarge.classList.add('active');

            els.island.style.width = '320px';
            els.island.style.height = height;
            els.island.style.borderRadius = '40px';

            if (glow) {
                els.island.style.border = 'none';
                els.island.classList.add('siri-glow');
            } else {
                els.island.style.border = '1px solid rgba(255,255,255,0.05)';
                els.island.classList.remove('siri-glow');
            }

            els.statusBar.style.opacity = '0';
            els.islandContentLarge.innerHTML = contentHtml;

            // Blur apps behind island
            const backdrop = document.getElementById('island-backdrop');
            if (backdrop) {
                backdrop.classList.replace('opacity-0', 'opacity-100');
                backdrop.style.pointerEvents = 'auto';
            }

            // Re-bind DOM elements since innerHTML replaced them
            els.siriText = document.getElementById('siri-text');
            els.wifiQNum = document.getElementById('wifi-q-num');
            els.wifiQText = document.getElementById('wifi-q-text');
            els.wifiOptions = document.getElementById('wifi-options');
            els.wifiResultContainer = document.getElementById('wifi-result-container');
            els.wifiResultText = document.getElementById('wifi-result-text');
            els.wifiResultIcon = document.getElementById('wifi-result-icon');
            els.wifiQContainer = document.getElementById('wifi-question-container');
            els.wifiActionBtn = document.getElementById('wifi-action-btn');
        }

        function resetIsland() {
            els.islandBaseSmall.classList.remove('active');
            els.islandBaseLarge.classList.remove('active');

            els.island.style.width = '125px';
            els.island.style.height = '37px';
            els.island.style.borderRadius = '18.5px';
            els.island.style.border = '1px solid rgba(255,255,255,0.05)';
            els.island.classList.remove('siri-glow');
            els.statusBar.style.opacity = '1';

            const backdrop = document.getElementById('island-backdrop');
            if (backdrop) {
                backdrop.classList.replace('opacity-100', 'opacity-0');
                backdrop.style.pointerEvents = 'none';
            }
        }

        function setIslandState(state) {
            if (state === 'idle') {
                resetIsland();
            } else if (state === 'alert') {
                setSmallIsland(islandTemplates.wifiAlert, '100px');
            } else if (state === 'siri') {
                setLargeIsland(islandTemplates.siri, '380px', true);
            } else if (state === 'wifi') {
                setLargeIsland(islandTemplates.wifiPortal, '480px', false);
            } else if (state === 'siri_custom') {
                setLargeIsland(islandTemplates.siriCustom, '380px', true);
            }
        }

        function showSiri(text, callback = null) {
            islandCloseCallback = callback; clearInterval(typingInterval);

            setIslandState('siri');

            els.siriText.textContent = ''; els.siriText.classList.add('typewriter-text');
            let i = 0;
            typingInterval = setInterval(() => {
                els.siriText.textContent = text.substring(0, i + 1); i++;
                if (i >= text.length) {
                    clearInterval(typingInterval);
                    els.siriText.classList.remove('typewriter-text');
                }
            }, 30);
        }

        function showWhatsappNotification(mission) {
            islandCloseCallback = null;
            clearInterval(typingInterval);

            // Expanded downward to 140px to comfortably hold the content
            setSmallIsland(islandTemplates.whatsappAlert(mission), '140px');

            setTimeout(() => {
                if (els.islandBaseSmall.classList.contains('active')) {
                    dismissIsland();
                }
            }, 5000);
        }

        function dismissIsland() {
            setIslandState('idle');
            clearInterval(typingInterval);
            if (els.siriText) els.siriText.classList.remove('typewriter-text');
            if (islandCloseCallback) { const cb = islandCloseCallback; islandCloseCallback = null; setTimeout(cb, 500); }
        }


        // --- Settings Navigation & Logic ---
        function openSettingsSub(subId) {
            const sub = document.getElementById(`settings-sub-${subId}`);
            if (sub) {
                sub.classList.add('active');
                if (subId === 'analytics') renderAnalyticsCharts();
                if (subId === 'wallpaper') {
                    document.querySelectorAll('.wallpaper-item').forEach(el => el.classList.remove('active'));
                    const activeWp = document.getElementById(`wp-${gameState.settings.wallpaper}`);
                    if (activeWp) activeWp.classList.add('active');
                }
                updateSettingsToggles();
            }
        }

        function closeSettingsSub(subId) {
            const sub = document.getElementById(`settings-sub-${subId}`);
            if (sub) sub.classList.remove('active');
        }

        function toggleSetting(key) {
            if (!gameState.settings) return;
            gameState.settings[key] = !gameState.settings[key];
            localStorage.setItem('gnluGameState', JSON.stringify(gameState));
            updateSettingsToggles();
            applySystemSettings();
        }

        function setWallpaper(id) {
            if (!gameState.settings) return;
            gameState.settings.wallpaper = id;
            localStorage.setItem('gnluGameState', JSON.stringify(gameState));
            
            document.querySelectorAll('.wallpaper-item').forEach(el => el.classList.remove('active'));
            const activeWp = document.getElementById(`wp-${id}`);
            if (activeWp) activeWp.classList.add('active');
            
            applySystemSettings();
        }

        function updateSettingsToggles() {
            const s = gameState.settings;
            if (!s) return;
            
            const keys = ['airplaneMode', 'wifiConnected', 'darkMode', 'lowPowerMode'];
            keys.forEach(key => {
                const toggle = document.getElementById(`toggle-${key}`);
                if (toggle) {
                    if (s[key]) toggle.classList.add('active');
                    else toggle.classList.remove('active');
                }
            });
        }

        // --- Personalization & Onboarding ---
        window.showNameInputIsland = function() {
            const content = `
                <div class="flex flex-col items-center w-full px-4 pt-4 pb-2">
                    <div class="text-[17px] font-semibold text-white mb-4">What is your name?</div>
                    <div class="w-full relative mb-6">
                        <input type="text" id="name-island-input" 
                               class="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-white text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A84FF]" 
                               placeholder="Enter name..." 
                               onkeydown="if(event.key==='Enter') window.submitNameFromIsland()">
                    </div>
                    <button onclick="window.submitNameFromIsland()" 
                            class="w-full py-3.5 bg-[#0A84FF] active:bg-[#0070E0] rounded-2xl text-white text-[16px] font-semibold transition-colors">
                        Continue
                    </button>
                </div>
            `;
            setLargeIsland(content, '260px');
            setTimeout(() => {
                const input = document.getElementById('name-island-input');
                if (input) input.focus();
            }, 600);
        };

        window.submitNameFromIsland = function() {
            const input = document.getElementById('name-island-input');
            const name = input ? input.value.trim() : "";
            if (!name) return;

            window.gameState.userName = name;
            localStorage.setItem('gnluGameState', JSON.stringify(window.gameState));
            
            if (window.applySystemSettings) window.applySystemSettings();

            resetIsland();

            // Special Developer Welcome
            let welcomeMsg = `Welcome, ${name}! Open the Tips app to learn how the game works.`;
            const devs = ["kuhu", "aalok", "aaveksha"];
            if (devs.includes(name.toLowerCase())) {
                welcomeMsg = `Hello ${name}! It's an honor to welcome a member of the founding team. A very special welcome to you as we get things started! Tap the Tips app whenever you're ready.`;
            }

            setTimeout(() => {
                showSiri(welcomeMsg);
            }, 800);
        };

        window.renderAnalyticsCharts = function() {
            const data = window.gameState.analytics;
            if (!data) return;

            // 1. Academic Performance
            const academic = data.academic || { answers: [], categoryStats: {} };
            const total = academic.answers.length;
            const correctCount = academic.answers.filter(a => a.isCorrect).length;
            const accuracy = total > 0 ? (correctCount / total) * 100 : 0;

            const donutContainer = document.getElementById('academic-donut-container');
            if (donutContainer) {
                const radius = 45;
                const circ = 2 * Math.PI * radius;
                const offset = circ - (accuracy / 100) * circ;
                donutContainer.innerHTML = `
                    <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="#F3F4F6" stroke-width="8" />
                        <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="#0A84FF" stroke-width="10" 
                            stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round" style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-[20px] font-black text-gray-900">${Math.round(accuracy)}%</span>
                        <span class="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Score</span>
                    </div>
                `;
            }

            const cEl = document.getElementById('stat-correct-count');
            const tEl = document.getElementById('stat-total-count');
            const aBar = document.getElementById('stat-accuracy-bar');
            if (cEl) cEl.innerText = correctCount;
            if (tEl) tEl.innerText = total;
            if (aBar) aBar.style.width = `${accuracy}%`;

            // Domain Mastery Bars
            const catContainer = document.getElementById('academic-category-container');
            if (catContainer) {
                catContainer.innerHTML = '';
                const sortedCats = Object.entries(academic.categoryStats).sort((a,b) => b[1].total - a[1].total);
                if (sortedCats.length === 0) {
                    catContainer.innerHTML = '<div class="text-gray-400 text-[13px] py-4 text-center">No domain data yet. Complete mission levels to see analysis.</div>';
                }
                sortedCats.forEach(([name, stats]) => {
                    const mastery = (stats.correct / stats.total) * 100;
                    const color = mastery >= 80 ? '#34C759' : mastery >= 50 ? '#FF9F0A' : '#FF3B30';
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <div class="flex justify-between text-[13px] mb-1.5 items-end px-1">
                            <span class="text-gray-600 font-semibold truncate max-w-[70%]">${name}</span>
                            <span class="font-bold" style="color: ${color}">${Math.round(mastery)}%</span>
                        </div>
                        <div class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-100 p-[1.5px]">
                            <div class="h-full rounded-full transition-all duration-1000" style="width: ${mastery}%; background-color: ${color}"></div>
                        </div>
                    `;
                    catContainer.appendChild(div);
                });
            }

            // 2. Gaming Performance
            const gaming = data.gaming || { totalDeaths: 0, distractions: 0, milestoneFails: 0 };
            const dEl = document.getElementById('stat-gaming-deaths');
            const distEl = document.getElementById('stat-gaming-distractions');
            const mfEl = document.getElementById('stat-milestone-fails');
            const grEl = document.getElementById('stat-gaming-rank');
            const gOverlay = document.getElementById('gaming-score-overlay');

            if (dEl) dEl.innerText = gaming.totalDeaths;
            const dRate = gaming.totalDeaths > 0 ? (gaming.distractions / gaming.totalDeaths) * 100 : 0;
            if (distEl) distEl.innerText = `${Math.round(dRate)}%`;
            if (mfEl) mfEl.innerText = gaming.milestoneFails;

            let gScore = 100 - (gaming.totalDeaths * 4) - (gaming.distractions * 6);
            gScore = Math.max(5, Math.min(100, gScore));
            const ranks = ["Amateur", "Strategist", "Elite Gamer", "Dino Master", "Mission MVP", "Pixel God"];
            const rIdx = Math.min(ranks.length - 1, Math.floor((gScore / 100) * ranks.length));
            if (grEl) grEl.innerText = ranks[rIdx];
            if (gOverlay) gOverlay.style.width = `${gScore}%`;
        };
