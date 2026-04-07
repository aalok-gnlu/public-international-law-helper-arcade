// --- Geolocation + Weather ---
        async function initLocationServices() {
            try {
                const position = await new Promise((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error('Geolocation not supported'));
                        return;
                    }
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: false,
                        timeout: 10000,
                        maximumAge: 300000
                    });
                });

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Fetch weather & city in parallel
                await Promise.all([
                    fetchWeather(lat, lon),
                    fetchCityName(lat, lon)
                ]);
            } catch (err) {
                console.log('Location denied, using IP geolocation...');
                // Fallback: use IP-based geolocation
                try {
                    const ipRes = await fetch('https://ipapi.co/json/');
                    const ipData = await ipRes.json();
                    if (ipData.latitude && ipData.longitude) {
                        document.getElementById('weather-city').textContent = ipData.city || 'Your City';
                        await fetchWeather(ipData.latitude, ipData.longitude);
                    }
                } catch (e) {
                    // Final fallback - show default
                    document.getElementById('weather-city').textContent = 'Weather';
                    document.getElementById('weather-temp').textContent = '28°';
                    document.getElementById('weather-desc').textContent = 'Unavailable';
                }
            }
        }

        async function fetchWeather(lat, lon) {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
                const res = await fetch(url);
                const data = await res.json();

                if (data.current) {
                    const temp = Math.round(data.current.temperature_2m);
                    const humidity = data.current.relative_humidity_2m;
                    const weatherCode = data.current.weather_code;
                    const icon = getWeatherEmoji(weatherCode);
                    const desc = getWeatherDescription(weatherCode);

                    document.getElementById('weather-temp').textContent = temp + '°';
                    document.getElementById('weather-desc').textContent = `💧 ${humidity}%`;
                    document.getElementById('weather-icon').textContent = icon;
                }
            } catch (e) {
                console.log('Weather fetch failed:', e);
            }
        }

        async function fetchCityName(lat, lon) {
            try {
                const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
                const res = await fetch(url);
                const data = await res.json();
                const city = data.city || data.locality || data.principalSubdivision || 'Your Location';
                document.getElementById('weather-city').textContent = city;
            } catch (e) {
                document.getElementById('weather-city').textContent = 'Your City';
            }
        }

        function getWeatherEmoji(code) {
            if (code === 0) return '☀️';
            if (code <= 3) return '⛅';
            if (code <= 48) return '🌫️';
            if (code <= 57) return '🌧️';
            if (code <= 67) return '🌧️';
            if (code <= 77) return '🌨️';
            if (code <= 82) return '🌧️';
            if (code <= 86) return '🌨️';
            if (code <= 99) return '⛈️';
            return '🌤';
        }

        function getWeatherDescription(code) {
            if (code === 0) return 'Clear';
            if (code <= 3) return 'Partly cloudy';
            if (code <= 48) return 'Foggy';
            if (code <= 57) return 'Drizzle';
            if (code <= 67) return 'Rain';
            if (code <= 77) return 'Snow';
            if (code <= 82) return 'Showers';
            if (code <= 86) return 'Snow showers';
            if (code <= 99) return 'Thunderstorm';
            return 'Unknown';
        }

        // --- Iframe Browser-in-Browser ---
        const iframeViewer = document.getElementById('iframe-viewer');
        const pageIframe = document.getElementById('page-iframe');
        const iframeUrlText = document.getElementById('iframe-url-text');
        const iframeLoadingBar = document.getElementById('iframe-loading-bar');

        function openInIframe(url) {
            if (!url) return;
            // Show iframe viewer
            iframeViewer.classList.add('active');
            iframeLoadingBar.style.display = 'block';

            // Set URL bar text
            try {
                const domain = new URL(url).hostname;
                iframeUrlText.textContent = domain;
            } catch (e) {
                iframeUrlText.textContent = url;
            }

            // Load the page
            pageIframe.src = url;
            pageIframe.onload = () => {
                iframeLoadingBar.style.display = 'none';
            };

            // Timeout fallback in case onload doesn't fire
            setTimeout(() => {
                iframeLoadingBar.style.display = 'none';
            }, 5000);
        }

        function closeIframeViewer() {
            iframeViewer.classList.remove('active');
            pageIframe.src = '';
            iframeUrlText.textContent = 'loading...';
        }

        // --- Discover Feed (Trending articles from Wikipedia) ---
        async function loadDiscoverFeed() {
            const feedContainer = document.getElementById('discover-feed');
            if (!feedContainer) return;

            try {
                const feeds = [
                    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theverge.com%2Frss%2Findex.xml',
                    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml'
                ];

                const responses = await Promise.allSettled(feeds.map(url => fetch(url).then(r => r.json())));
                let allArticles = [];

                responses.forEach(res => {
                    if (res.status === 'fulfilled' && res.value && res.value.status === 'ok' && res.value.items) {
                        const sourceName = res.value.feed.title || 'News';
                        const items = res.value.items.map(item => ({ ...item, sourceName }));
                        allArticles = allArticles.concat(items);
                    }
                });

                if (allArticles.length === 0) throw new Error("No articles fetched");

                // Sort by publication date descending
                allArticles.sort((a, b) => new Date(b.pubDate.replace(' ', 'T') + 'Z') - new Date(a.pubDate.replace(' ', 'T') + 'Z'));

                // Take top 8 mixed articles
                const topNews = allArticles.slice(0, 8);
                let feedHtml = '';

                function getThumbnail(item) {
                    if (item.thumbnail && item.thumbnail.indexOf('no_image') === -1) return item.thumbnail;
                    if (item.enclosure && item.enclosure.link) return item.enclosure.link;
                    const imgMatch = (item.content || '').match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) return imgMatch[1];
                    return 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=200&fit=crop';
                }

                function timeAgo(dateStr) {
                    const date = new Date(dateStr.replace(' ', 'T') + 'Z');
                    const diffMins = Math.floor((Date.now() - date.getTime()) / 60000);
                    if (diffMins < 0 || isNaN(diffMins)) return 'Just now';
                    if (diffMins < 60) return `${diffMins} mins ago`;
                    const diffHours = Math.floor(diffMins / 60);
                    if (diffHours < 24) return `${diffHours} hours ago`;
                    return `${Math.floor(diffHours / 24)} days ago`;
                }

                topNews.forEach(item => {
                    const title = item.title;
                    // Provide a cleaner snippet by extracting text from description
                    const rawDesc = item.description || '';
                    const snippet = rawDesc.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
                    const pageUrl = item.link;
                    const thumb = getThumbnail(item);
                    const timeStr = timeAgo(item.pubDate);
                    const publisher = item.sourceName;

                    feedHtml += `
                        <div class="google-feed-card mb-3" onclick="openInIframe('${pageUrl.replace(/'/g, '')}')" style="cursor:pointer">
                            <div class="relative">
                                <img src="${thumb}" class="w-full h-[160px] object-cover" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=200&fit=crop'">
                            </div>
                            <div class="p-4">
                                <div class="text-[17px] font-medium text-[#202124] leading-[1.3] mb-1.5" style="font-family: 'Google Sans', 'Inter', sans-serif;">${title}</div>
                                <div class="text-[13px] text-[#5f6368] leading-snug mb-3">${snippet.substring(0, 110)}${snippet.length > 110 ? '...' : ''}</div>
                                <div class="flex items-center justify-between text-[11px] text-[#5f6368] font-medium">
                                    <div class="flex items-center gap-2">
                                        <div class="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <span class="text-[10px] uppercase font-bold text-gray-500">${publisher.charAt(0)}</span>
                                        </div>
                                        <span>${publisher}</span>
                                        <span>·</span>
                                        <span>${timeStr}</span>
                                    </div>
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                </div>
                            </div>
                        </div>
                    `;
                });

                if (feedHtml) {
                    feedContainer.innerHTML = feedHtml;
                } else {
                    feedContainer.innerHTML = `
                        <div class="google-feed-card mb-3">
                            <div class="p-4 text-center">
                                <div class="text-[14px] text-[#5f6368]">No discover content available right now</div>
                            </div>
                        </div>
                    `;
                }
            } catch (e) {
                console.log('Discover feed failed:', e);
                // Keep shimmer or show fallback
            }
        }

        // --- Initialize all live services ---
        initLocationServices();
        loadDiscoverFeed();
        // Update widget clock every second for responsiveness
        setInterval(() => {
            const widgetClock = document.getElementById('widget-clock');
            if (widgetClock) {
                let d = new Date();
                let h = d.getHours();
                let m = d.getMinutes();
                let s = d.getSeconds();
                let ampm = h >= 12 ? 'PM' : 'AM';
                h = h % 12; h = h ? h : 12;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                widgetClock.textContent = h + ':' + m + ':' + s + ' ' + ampm;
            }
        }, 1000);

        // ============================================
          // --- Calculator ---
        let calcExp = '0';
        const calcDisplay = document.getElementById('calc-display');
        let calcHistory = []; // To store history

        function getCalcDisplayFont() {
            if (calcExp.length > 9) return 'text-[50px]';
            if (calcExp.length > 6) return 'text-[65px]';
            return 'text-[80px]';
        }

        function updateCalcDisplay() {
            calcDisplay.className = `text-white ${getCalcDisplayFont()} font-light text-right leading-none mb-2 w-full truncate px-2 transition-all`;
            calcDisplay.textContent = calcExp;
        }

        function calcNum(num) {
            if (calcExp === '0' && num !== '.') calcExp = num;
            else calcExp += num;
            updateCalcDisplay();
        }

        function calcOp(op) {
            if (calcExp !== '0' && !isNaN(calcExp.slice(-1))) {
                calcExp += op;
            }
            updateCalcDisplay();
        }

        function calcClear() { calcExp = '0'; updateCalcDisplay(); }

        function calcBackspace() {
            if (calcExp.length > 1) calcExp = calcExp.slice(0, -1);
            else calcExp = '0';
            updateCalcDisplay();
        }

        function calcToggleSign() {
            if (!isNaN(calcExp) && calcExp !== '0') {
                calcExp = (parseFloat(calcExp) * -1).toString();
                updateCalcDisplay();
            }
        }

        function calcEq() {
            try {
                let evalExp = calcExp.replace(/×/g, '*').replace(/÷/g, '/'); // ensure standard math
                let res = eval(evalExp).toString();
                if (res.length > 8 && res.includes('.')) res = parseFloat(res).toPrecision(8).replace(/\.0+$/, "");
                
                // Add to history
                if (calcExp !== res) {
                    calcHistory.unshift({ exp: calcExp, result: res });
                    if (calcHistory.length > 30) calcHistory.pop(); // Keep last 30
                    renderCalcHistory();
                }
                
                calcExp = res;
            } catch (e) { calcExp = 'Error'; }
            updateCalcDisplay();
            if (calcExp === 'Error') setTimeout(calcClear, 1500);
        }

        function toggleCalcHistory() {
            const modal = document.getElementById('calc-history-modal');
            const sheet = document.getElementById('calc-history-sheet');
            if (modal.classList.contains('opacity-0')) {
                modal.classList.remove('hidden');
                // Force reflow
                void modal.offsetWidth;
                modal.classList.remove('opacity-0', 'pointer-events-none');
                sheet.classList.remove('translate-y-full');
            } else {
                modal.classList.add('opacity-0', 'pointer-events-none');
                sheet.classList.add('translate-y-full');
                setTimeout(() => modal.classList.add('hidden'), 300);
            }
        }

        function toggleCalcModeMenu() {
            const menu = document.getElementById('calc-mode-menu');
            menu.classList.toggle('hidden');
        }

        function setCalcMode(mode) {
            document.getElementById('calc-mode-menu').classList.add('hidden');
            
            // clear checks
            ['basic', 'scientific', 'mathnotes', 'convert'].forEach(m => {
                document.getElementById('calc-check-' + m).textContent = (m === mode) ? '✓' : '';
            });

            const sciKeys = document.getElementById('calc-sci-keys');

            if (mode === 'scientific') {
                sciKeys.classList.remove('hidden');
                sciKeys.classList.add('grid');
            } else {
                sciKeys.classList.add('hidden');
                sciKeys.classList.remove('grid');
            }
        }

        function renderCalcHistory() {
            const list = document.getElementById('calc-history-list');
            let html = '';
            calcHistory.forEach((item, idx) => {
                html += `
                <div class="py-3 border-b border-white/5 active:bg-white/5 cursor-pointer" onclick="calcExp='${item.result}'; updateCalcDisplay(); toggleCalcHistory();">
                    <div class="text-[#8E8E93] text-[15px] font-medium tracking-tight mb-1">${item.exp}</div>
                    <div class="text-white text-[28px] font-semibold tracking-tight">${item.result}</div>
                </div>`;
            });
            list.innerHTML = html;
        }

        // Global keyboard listener for Calculator & Phone
        document.addEventListener('keydown', (e) => {
            if (activeScreen === 'calculator') {
                const key = e.key;
                if (/[0-9\.]/.test(key)) calcNum(key);
                if (key === '+' || key === '-' || key === '*' || key === '/') {
                    e.preventDefault();
                    if(key === '*') calcOp('×');
                    else if(key === '/') calcOp('÷');
                    else calcOp(key);
                }
                if (key === 'Enter' || key === '=') {
                    e.preventDefault();
                    calcEq();
                }
                if (key === 'Backspace') calcBackspace();
                if (key === 'Escape' || key.toLowerCase() === 'c') calcClear();
            } else if (activeScreen === 'phone') {
                const key = e.key;
                if (/[0-9\*\#]/.test(key)) phoneType(key);
                if (key === 'Backspace') phoneDelete();
                if (key === 'Enter') phoneCall();
            }
        });

        // --- Phone Dialer ---
        let phoneNumber = '';
        const phoneDisplay = document.getElementById('phone-display');
        const phoneAddBtn = document.getElementById('phone-add-number');
        const phoneDeleteBtn = document.getElementById('phone-delete-btn');

        function updatePhoneDisplay() {
            phoneDisplay.textContent = phoneNumber;
            
            // Show/Hide "Add Number" and "Delete" button
            if (phoneNumber.length > 0) {
                phoneAddBtn.classList.remove('hidden');
                phoneDeleteBtn.classList.replace('opacity-0', 'opacity-100');
                phoneDeleteBtn.classList.remove('pointer-events-none');
                phoneDisplay.style.fontSize = phoneNumber.length > 10 ? '32px' : '48px';
            } else {
                phoneAddBtn.classList.add('hidden');
                phoneDeleteBtn.classList.replace('opacity-100', 'opacity-0');
                phoneDeleteBtn.classList.add('pointer-events-none');
            }
        }

        function phoneType(digit) {
            if (phoneNumber.length < 15) {
                phoneNumber += digit;
                updatePhoneDisplay();
            }
        }

        function phoneDelete() {
            phoneNumber = phoneNumber.slice(0, -1);
            updatePhoneDisplay();
        }

        function phoneAddContact() {
            // Placeholder: maybe open contacts in future
            alert('Adding ' + phoneNumber + ' to contacts...');
        }

        function phoneCall() {
            if (phoneNumber.length === 0) return;
            window.location.href = 'tel:' + phoneNumber;
        }

        // --- Files App ---
        function openPDF(title) {
            // Since we can't fetch real local PDFs easily, we'll show a nice "Preview" in the island or the iframe viewer
            const content = `
                <div class="w-full flex flex-col items-center py-4">
                    <div class="w-20 h-24 relative mb-4">
                        <div class="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                            <div class="h-6 bg-[#FF3B30] flex items-center justify-center">
                                <span class="text-[10px] text-white font-bold">PDF</span>
                            </div>
                            <div class="flex-1 p-2 space-y-1">
                                <div class="h-1 bg-gray-100 w-full"></div>
                                <div class="h-1 bg-gray-100 w-3/4"></div>
                                <div class="h-1 bg-gray-100 w-full"></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-white text-[18px] font-bold mb-1">${title}</div>
                    <div class="text-white/60 text-[13px] mb-6">PDF Document - 1.2 MB</div>
                    <div class="flex gap-3 w-full px-4">
                        <button onclick="resetIsland()" class="flex-1 py-3.5 bg-[#333333] active:bg-[#444444] rounded-2xl text-white text-[16px] font-semibold transition-colors">Close</button>
                        <button onclick="window.open('https://www.google.com/search?q=' + encodeURIComponent(title + ' pdf'), '_blank'); resetIsland();" class="flex-1 py-3.5 bg-[#0A84FF] active:bg-[#0070E0] rounded-2xl text-white text-[16px] font-semibold transition-colors">Download</button>
                    </div>
                </div>
            `;
            setLargeIsland(content, '320px');
        }

        // --- Camera ---
        let mediaStream = null;
        let cameraFacing = 'environment';
        let cameraIndicatorInterval = null;

        function initCamera() {
            const video = document.getElementById('camera-feed');
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Stop existing stream first
                if (mediaStream) {
                    mediaStream.getTracks().forEach(t => t.stop());
                    mediaStream = null;
                }
                navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraFacing } })
                    .then(stream => {
                        mediaStream = stream;
                        video.srcObject = stream;
                        showCameraIslandIndicator();
                    }).catch(e => console.log('Camera access issue:', e));
            }
        }

        function stopCamera() {
            const video = document.getElementById('camera-feed');
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                mediaStream = null;
            }
            if (video) video.srcObject = null;
            hideCameraIslandIndicator();
            // Close camera menu if open
            const menu = document.getElementById('camera-menu');
            if (menu) { menu.style.display = 'none'; menu.classList.add('hidden'); }
        }

        function showCameraIslandIndicator() {
            const island = document.getElementById('dynamic-island');
            if (!island) return;
            // Remove existing indicator if any
            hideCameraIslandIndicator();
            const indicator = document.createElement('div');
            indicator.id = 'camera-island-indicator';
            indicator.className = 'absolute top-[12px] left-[14px] flex items-center gap-1.5 pointer-events-none';
            indicator.innerHTML = `<div class="w-[8px] h-[8px] rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" id="cam-blink-dot"></div><svg class="w-[11px] h-[11px] text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3v4c0 1.66-1.34 3-3 3s-3-1.34-3-3V8c0-1.66 1.34-3 3-3z"/></svg>`;
            island.appendChild(indicator);
            // Blink animation
            cameraIndicatorInterval = setInterval(() => {
                const dot = document.getElementById('cam-blink-dot');
                if (dot) dot.style.opacity = dot.style.opacity === '0.3' ? '1' : '0.3';
            }, 800);
        }

        function hideCameraIslandIndicator() {
            const indicator = document.getElementById('camera-island-indicator');
            if (indicator) indicator.remove();
            if (cameraIndicatorInterval) {
                clearInterval(cameraIndicatorInterval);
                cameraIndicatorInterval = null;
            }
        }

        function flipCamera() {
            cameraFacing = cameraFacing === 'environment' ? 'user' : 'environment';
            initCamera();
        }

        function toggleCameraMenu() {
            const menu = document.getElementById('camera-menu');
            if (menu.style.display === 'none' || menu.classList.contains('hidden')) {
                menu.style.display = 'block';
                menu.classList.remove('hidden');
            } else {
                menu.style.display = 'none';
                menu.classList.add('hidden');
            }
        }

        function toggleCameraSetting(setting) {
            // Visual toggle only
            if (setting === 'flash') {
                const btn = document.getElementById('cam-flash-btn');
                btn.classList.toggle('text-yellow-400');
                btn.classList.toggle('text-white/40');
            } else if (setting === 'night') {
                const btn = document.getElementById('cam-night-btn');
                btn.classList.toggle('text-yellow-400');
                btn.classList.toggle('text-white');
            }
        }

        function setCameraZoom(zoom) {
            const btn05 = document.getElementById('cam-zoom-05');
            const btn1 = document.getElementById('cam-zoom-1');
            if (zoom === '0.5') {
                btn05.className = 'w-10 h-10 rounded-full bg-yellow-500/90 text-black text-[13px] font-bold flex items-center justify-center active:bg-yellow-400';
                btn1.className = 'w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white text-[13px] font-semibold flex items-center justify-center border border-white/20 active:bg-white/20';
                btn1.textContent = '1×';
                btn05.textContent = '0.5×';
            } else {
                btn1.className = 'w-10 h-10 rounded-full bg-yellow-500/90 text-black text-[13px] font-bold flex items-center justify-center active:bg-yellow-400';
                btn05.className = 'w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white text-[13px] font-semibold flex items-center justify-center border border-white/20 active:bg-white/20';
                btn05.textContent = '0.5';
                btn1.textContent = '1×';
            }
        }

        function setCameraMode(mode) {
            const btnVideo = document.getElementById('cam-mode-video');
            const btnPhoto = document.getElementById('cam-mode-photo');
            if (mode === 'video') {
                btnVideo.className = 'px-4 py-1.5 rounded-full bg-[#2C2C2E]/80 text-red-500 text-[13px] font-bold active:bg-[#3A3A3C] transition-colors';
                btnPhoto.className = 'px-4 py-1.5 rounded-full text-[13px] font-semibold text-white/60 active:text-white transition-colors';
            } else {
                btnPhoto.className = 'px-4 py-1.5 rounded-full bg-[#2C2C2E]/80 text-yellow-400 text-[13px] font-bold active:bg-[#3A3A3C] transition-colors';
                btnVideo.className = 'px-4 py-1.5 rounded-full text-[13px] font-semibold text-white/60 active:text-white transition-colors';
            }
        }

        let localPhotos = []; // Store custom captured/uploaded photos
        function takePhoto() {
            const video = document.getElementById('camera-feed');
            const canvas = document.getElementById('camera-canvas');
            if (video.srcObject) {
                // Flash effect
                const overlay = document.createElement('div');
                overlay.className = 'absolute inset-0 bg-white z-50 animate-[fadeOut_0.5s_ease-out_forwards]';
                video.parentElement.appendChild(overlay);
                setTimeout(() => overlay.remove(), 500);

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg');
                document.getElementById('camera-gallery-preview').innerHTML = `<img src="${dataUrl}" class="w-full h-full object-cover">`;
                localPhotos.unshift(dataUrl);
            }
        }

        // --- Photos ---
        let currentPhotoIndex = 0;
        let currentPhotoList = [];
        let photoFavorited = false;

        function uploadPhotos(event) {
            const files = event.target.files;
            if (!files) return;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    localPhotos.unshift(e.target.result);
                    renderPhotos();
                }
                reader.readAsDataURL(files[i]);
            }
        }
        function renderPhotos() {
            const grid = document.getElementById('photos-grid');
            if (!grid) return;

            const allPhotos = [...localPhotos, "https://www.campusoption.com/images/colleges/gallery/30_11_16_061248_gn_2.jpeg", "https://gnlu.ac.in//Document/photo-gallery/Banking-And-Finance-Law/L_d7214b76-46d1-45f8-a301-f572b705dffd.jpeg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gWeC-89DS0daJLXHcPijB8vHwN-FUDAvrQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkNFZQXADk4R16wU8rEa7OrQANly4uvtP09Q&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmNDd9hQakKbw_ujLNZP4K4_aBohNgLOt1Q&s"];
            currentPhotoList = allPhotos;

            // Update count
            const countEl = document.getElementById('photos-count');
            if (countEl) countEl.textContent = allPhotos.length + ' Items';

            let html = '';
            allPhotos.forEach((url, index) => {
                html += `<div class="aspect-square bg-gray-200 overflow-hidden cursor-pointer active:opacity-80 transition-opacity" onclick="openPhotoViewer(${index})"><img src="${url}" class="w-full h-full object-cover" loading="lazy"></div>`;
            });
            grid.innerHTML = html;
        }

        function openPhotoViewer(index) {
            currentPhotoIndex = index;
            photoFavorited = false;
            const viewer = document.getElementById('photo-viewer');
            const img = document.getElementById('photo-viewer-img');
            img.src = currentPhotoList[index];
            viewer.style.display = 'flex';
            viewer.classList.remove('hidden');
            updateFavIcons();
        }

        function closePhotoViewer() {
            const viewer = document.getElementById('photo-viewer');
            viewer.style.display = 'none';
            viewer.classList.add('hidden');
        }

        function prevPhoto() {
            if (currentPhotoList.length === 0) return;
            currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotoList.length) % currentPhotoList.length;
            document.getElementById('photo-viewer-img').src = currentPhotoList[currentPhotoIndex];
            photoFavorited = false;
            updateFavIcons();
        }

        function nextPhoto() {
            if (currentPhotoList.length === 0) return;
            currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotoList.length;
            document.getElementById('photo-viewer-img').src = currentPhotoList[currentPhotoIndex];
            photoFavorited = false;
            updateFavIcons();
        }

        function togglePhotoFavorite() {
            photoFavorited = !photoFavorited;
            updateFavIcons();
        }

        function updateFavIcons() {
            const fill = photoFavorited ? '#FF3B30' : 'none';
            const stroke = photoFavorited ? '#FF3B30' : 'currentColor';
            ['photo-fav-icon', 'photo-fav-icon-bar'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.setAttribute('fill', fill);
                    el.setAttribute('stroke', stroke);
                }
            });
        }

        function switchPhotosTab(tab) {
            const libraryView = document.getElementById('photos-library-view');
            const collectionsView = document.getElementById('photos-collections-view');
            const tabLibrary = document.getElementById('photos-tab-library');
            const tabCollections = document.getElementById('photos-tab-collections');

            if (tab === 'library') {
                libraryView.classList.remove('hidden');
                collectionsView.classList.add('hidden');
                tabLibrary.className = 'flex-1 flex flex-col items-center gap-1 text-[#007AFF]';
                tabLibrary.querySelector('span').className = 'text-[10px] font-semibold';
                tabCollections.className = 'flex-1 flex flex-col items-center gap-1 text-[#8E8E93]';
                tabCollections.querySelector('span').className = 'text-[10px] font-medium';
            } else {
                libraryView.classList.add('hidden');
                collectionsView.classList.remove('hidden');
                tabCollections.className = 'flex-1 flex flex-col items-center gap-1 text-[#007AFF]';
                tabCollections.querySelector('span').className = 'text-[10px] font-semibold';
                tabLibrary.className = 'flex-1 flex flex-col items-center gap-1 text-[#8E8E93]';
                tabLibrary.querySelector('span').className = 'text-[10px] font-medium';
            }
        }

        // --- Maps ---
        let leafletMap = null;
        let mapMarkers = [];
        let mapSearchTimeout = null;
        let mapsSheetExpanded = false;
        let mapUseSatellite = true;
        let mapTileLayer = null;

        function initMaps() {
            if (leafletMap) {
                setTimeout(() => leafletMap.invalidateSize(), 200);
                return;
            }
            // Default: GNLU Gandhinagar
            const defaultLat = 23.2324;
            const defaultLng = 72.6513;

            leafletMap = L.map('leaflet-map', {
                zoomControl: false,
                attributionControl: false
            }).setView([defaultLat, defaultLng], 15);

            // Satellite tile
            mapTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 19
            }).addTo(leafletMap);

            // Try user location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    leafletMap.setView([lat, lng], 15);
                    // Blue pulsing dot
                    L.circleMarker([lat, lng], {
                        radius: 8, fillColor: '#007AFF', fillOpacity: 1,
                        color: '#fff', weight: 3, opacity: 1
                    }).addTo(leafletMap);
                    L.circleMarker([lat, lng], {
                        radius: 20, fillColor: '#007AFF', fillOpacity: 0.15,
                        color: '#007AFF', weight: 1, opacity: 0.3
                    }).addTo(leafletMap);
                }, () => {}, { enableHighAccuracy: true, timeout: 5000 });
            }

            setTimeout(() => leafletMap.invalidateSize(), 300);
        }

        function toggleMapStyle() {
            if (!leafletMap || !mapTileLayer) return;
            leafletMap.removeLayer(mapTileLayer);
            mapUseSatellite = !mapUseSatellite;
            if (mapUseSatellite) {
                mapTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }).addTo(leafletMap);
            } else {
                mapTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(leafletMap);
            }
        }

        function mapsLocateMe() {
            if (!leafletMap || !navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(pos => {
                leafletMap.setView([pos.coords.latitude, pos.coords.longitude], 16, { animate: true });
            });
        }

        function toggleMapsSheet() {
            const sheet = document.getElementById('maps-bottom-sheet');
            mapsSheetExpanded = !mapsSheetExpanded;
            sheet.style.maxHeight = mapsSheetExpanded ? '70%' : '45%';
        }

        function openMapsSearch() {
            const overlay = document.getElementById('maps-search-overlay');
            overlay.style.display = 'flex';
            overlay.classList.remove('hidden');
            setTimeout(() => document.getElementById('maps-search-input').focus(), 100);
            // Reset to Find Nearby
            document.getElementById('maps-find-nearby').classList.remove('hidden');
            document.getElementById('maps-search-results').classList.add('hidden');
            document.getElementById('maps-search-results').innerHTML = '';
            document.getElementById('maps-search-input').value = '';
        }

        function closeMapsSearch() {
            const overlay = document.getElementById('maps-search-overlay');
            overlay.style.display = 'none';
            overlay.classList.add('hidden');
        }

        function clearMapMarkers() {
            mapMarkers.forEach(m => leafletMap.removeLayer(m));
            mapMarkers = [];
        }

        function searchMapsPlaces(query) {
            clearTimeout(mapSearchTimeout);
            const resultsDiv = document.getElementById('maps-search-results');
            const nearbyDiv = document.getElementById('maps-find-nearby');

            if (!query || query.length < 2) {
                nearbyDiv.classList.remove('hidden');
                resultsDiv.classList.add('hidden');
                resultsDiv.innerHTML = '';
                return;
            }

            nearbyDiv.classList.add('hidden');
            resultsDiv.classList.remove('hidden');
            resultsDiv.innerHTML = '<div class="py-4 text-center text-[#8E8E93] text-[14px]">Searching...</div>';

            mapSearchTimeout = setTimeout(() => {
                const center = leafletMap ? leafletMap.getCenter() : { lat: 23.23, lng: 72.65 };
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&viewbox=${center.lng-0.5},${center.lat+0.5},${center.lng+0.5},${center.lat-0.5}&bounded=0`)
                    .then(r => r.json())
                    .then(data => {
                        if (!data.length) {
                            resultsDiv.innerHTML = '<div class="py-4 text-center text-[#8E8E93] text-[14px]">No results found</div>';
                            return;
                        }
                        let html = '<div class="bg-[#2C2C2E] rounded-xl overflow-hidden">';
                        data.forEach((place, i) => {
                            const border = i < data.length - 1 ? 'border-b border-white/5' : '';
                            html += `<div onclick="selectMapsPlace(${place.lat},${place.lon},'${place.display_name.replace(/'/g, "\\'").substring(0,50)}')" class="flex items-center px-4 py-3 ${border} cursor-pointer active:bg-[#3A3A3C]">
                                <div class="w-8 h-8 rounded-full bg-[#3A3A3C] flex items-center justify-center mr-3 flex-shrink-0">
                                    <svg class="w-4 h-4 text-[#FF3B30]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-white text-[15px] font-medium truncate">${place.display_name.split(',')[0]}</div>
                                    <div class="text-[#8E8E93] text-[12px] truncate">${place.display_name.substring(0, 60)}</div>
                                </div>
                            </div>`;
                        });
                        html += '</div>';
                        resultsDiv.innerHTML = html;
                    })
                    .catch(() => {
                        resultsDiv.innerHTML = '<div class="py-4 text-center text-[#8E8E93] text-[14px]">Search failed</div>';
                    });
            }, 400);
        }

        function selectMapsPlace(lat, lon, name) {
            closeMapsSearch();
            if (!leafletMap) return;
            clearMapMarkers();
            leafletMap.setView([lat, lon], 16, { animate: true });
            const marker = L.marker([lat, lon]).addTo(leafletMap).bindPopup(name).openPopup();
            mapMarkers.push(marker);
            // Add to recents
            addMapRecent(name);
        }

        function searchMapsCategory(category) {
            document.getElementById('maps-search-input').value = category;
            searchMapsPlaces(category);
        }

        function addMapRecent(name) {
            const recentsDiv = document.getElementById('maps-recents');
            if (!recentsDiv) return;
            const item = document.createElement('div');
            item.className = 'flex items-center px-4 py-3 border-t border-white/5';
            item.innerHTML = `<div class="w-8 h-8 rounded-full bg-[#3A3A3C] flex items-center justify-center mr-3 flex-shrink-0">
                <svg class="w-4 h-4 text-[#8E8E93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <span class="text-white text-[15px] font-medium flex-1 truncate">${name}</span>
            <button class="text-[#8E8E93] active:text-white">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </button>`;
            recentsDiv.insertBefore(item, recentsDiv.children[1] || null);
        }

        // --- Contacts ---
        function initContacts() {
            const container = document.getElementById('contacts-list-container');
            const mockContacts = [
                { name: 'Aalok Kumar', img: 'profile_pics/Aalok.png' },
                { name: 'Aaveksha', img: 'profile_pics/Aaveksha.png' },
                { name: 'Dean Office', img: '' },
                { name: 'Kuhu', img: 'profile_pics/Kuhu.png' },
                { name: 'Library Desk', img: '' },
                { name: 'Warden', img: '' }
            ];

            let html = '';
            let currentLetter = '';
            mockContacts.forEach(c => {
                const initial = c.name.charAt(0).toUpperCase();
                if (initial !== currentLetter) {
                    currentLetter = initial;
                    html += `<div class="py-1 mt-4 border-b border-gray-100"><span class="text-[14px] font-bold text-gray-500">${currentLetter}</span></div>`;
                }
                html += `
                    <div class="flex items-center py-3 border-b border-gray-100 last:border-none cursor-pointer active:bg-gray-50">
                        ${c.img ? `<img src="${c.img}" class="w-10 h-10 rounded-full mr-3 object-cover border border-gray-100">` : `<div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-medium text-gray-600 mr-3">${initial}</div>`}
                        <span class="text-[17px] font-medium text-black">${c.name}</span>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        // --- Clock / Stopwatch ---
        let currentClockTab = 'stopwatch';

        function switchClockTab(tab) {
            // Hide all views
            document.getElementById('clock-view-worldclock').classList.add('hidden');
            document.getElementById('clock-view-alarms').classList.add('hidden');
            document.getElementById('clock-view-stopwatch').classList.add('hidden');
            document.getElementById('clock-view-timers').classList.add('hidden');
            
            // Reset all nav icons
            document.getElementById('clock-tab-worldclock').className = 'flex flex-col items-center gap-1 text-[#8E8E93] px-2';
            document.getElementById('clock-tab-alarms').className = 'flex flex-col items-center gap-1 text-[#8E8E93] px-2';
            document.getElementById('clock-tab-stopwatch').className = 'flex flex-col items-center gap-1 text-[#8E8E93] px-2';
            document.getElementById('clock-tab-timers').className = 'flex flex-col items-center gap-1 text-[#8E8E93] px-2';

            // Show active view
            document.getElementById('clock-view-' + tab).classList.remove('hidden');
            // Set active nav icon
            document.getElementById('clock-tab-' + tab).className = 'flex flex-col items-center gap-1 text-[#FF9F0A] px-2';
            
            currentClockTab = tab;
            if(tab === 'worldclock') renderWorldClock();
            if(tab === 'alarms') renderAlarms();
        }

        // World Clock
        const worldClocks = [
            { city: 'New Delhi', tz: 'Asia/Kolkata', offsetOffset: '+0HRS' },
            { city: 'Caracas', tz: 'America/Caracas', offsetOffset: '-9:30' }
        ];

        function renderWorldClock() {
            const list = document.getElementById('world-clock-list');
            if(!list) return;
            let html = '';
            const now = new Date();
            
            worldClocks.forEach((c, idx) => {
                const timeStr = new Intl.DateTimeFormat('en-US', {
                    timeZone: c.tz,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).format(now);
                
                const ampm = timeStr.slice(-2);
                const time = timeStr.slice(0, -3);
                const border = idx < worldClocks.length - 1 ? 'border-b border-white/10' : '';
                
                html += `
                <div class="flex justify-between items-center py-4 ${border}">
                    <div class="flex flex-col">
                        <span class="text-[#8E8E93] text-[15px]">Today, ${c.offsetOffset}</span>
                        <span class="text-white text-[28px] font-medium tracking-tight">${c.city}</span>
                    </div>
                    <div class="flex items-baseline text-white">
                        <span class="text-[52px] font-light tracking-tight" style="font-variant-numeric: tabular-nums;">${time}</span>
                        <span class="text-[20px] font-light ml-1">${ampm}</span>
                    </div>
                </div>`;
            });
            list.innerHTML = html;
        }

        // Alarms
        const alarmData = [
            { time: '5:35', ampm: 'AM', label: 'Alarm', active: false },
            { time: '6:30', ampm: 'AM', label: 'Alarm', active: false },
            { time: '7:15', ampm: 'AM', label: 'Alarm', active: false },
            { time: '7:30', ampm: 'AM', label: 'Alarm', active: false }
        ];

        function renderAlarms() {
            const list = document.getElementById('alarms-list');
            if(!list) return;
            let html = '';
            alarmData.forEach((a, idx) => {
                const border = idx < alarmData.length - 1 ? 'border-b border-white/10 pb-3' : '';
                const toggleBg = a.active ? 'bg-[#34C759]' : 'bg-[#3A3A3C]';
                const toggleKnob = a.active ? 'translate-x-[20px]' : 'translate-x-0';
                
                html += `
                <div class="flex justify-between items-center mt-3 ${border}">
                    <div class="flex flex-col">
                        <div class="flex items-baseline text-white">
                            <span class="text-[52px] font-light tracking-tight" style="font-variant-numeric: tabular-nums; opacity: ${a.active ? '1' : '0.5'};">${a.time}</span>
                            <span class="text-[20px] font-light ml-1" style="opacity: ${a.active ? '1' : '0.5'};">${a.ampm}</span>
                        </div>
                        <span class="text-white text-[15px]" style="opacity: ${a.active ? '1' : '0.5'};">${a.label}</span>
                    </div>
                    <button onclick="toggleAlarm(${idx})" class="w-[51px] h-[31px] rounded-full ${toggleBg} relative transition-colors duration-200 shrink-0">
                        <div class="w-[27px] h-[27px] bg-white rounded-full absolute top-[2px] left-[2px] transition-transform duration-200 shadow-sm ${toggleKnob}"></div>
                    </button>
                </div>`;
            });
            list.innerHTML = html;
        }

        function toggleAlarm(idx) {
            alarmData[idx].active = !alarmData[idx].active;
            renderAlarms();
        }
        function addNewAlarm() {
            alarmData.push({ time: '8:00', ampm: 'AM', label: 'Alarm', active: true });
            renderAlarms();
        }

        // Stopwatch
        let swTimer = null;
        let swMs = 0;
        let lapCount = 1;
        function formatSw(ms) {
            let date = new Date(ms);
            let m = date.getUTCMinutes().toString().padStart(2, '0');
            let s = date.getSeconds().toString().padStart(2, '0');
            let cs = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
            return `${m}:${s}.${cs}`;
        }
        function stopwatchStartStop() {
            const btn = document.getElementById('stopwatch-start-btn');
            if (swTimer) {
                clearInterval(swTimer); swTimer = null;
                btn.textContent = 'Start';
                btn.className = "w-[80px] h-[80px] rounded-full bg-[#0A3A1A] text-[#34C759] active:bg-[#0D4D22] flex items-center justify-center font-semibold text-[17px]";
                document.getElementById('stopwatch-lap-btn').textContent = 'Reset';
            } else {
                swTimer = setInterval(() => {
                    swMs += 10;
                    document.getElementById('stopwatch-display').textContent = formatSw(swMs);
                }, 10);
                btn.textContent = 'Stop';
                btn.className = "w-[80px] h-[80px] rounded-full bg-[#3B1A12] text-[#FF3B30] active:bg-[#4A2015] flex items-center justify-center font-semibold text-[17px]";
                document.getElementById('stopwatch-lap-btn').textContent = 'Lap';
            }
        }
        function stopwatchLapReset() {
            const btn = document.getElementById('stopwatch-lap-btn');
            const list = document.getElementById('stopwatch-laps');
            if (swTimer) {
                // Lap
                const lapDiv = document.createElement('div');
                lapDiv.className = "flex justify-between py-3 border-b border-white/10 text-white text-[17px] font-mono";
                lapDiv.innerHTML = `<span>Lap ${lapCount++}</span><span>${formatSw(swMs)}</span>`;
                list.insertBefore(lapDiv, list.firstChild);
            } else {
                // Reset
                swMs = 0;
                lapCount = 1;
                document.getElementById('stopwatch-display').textContent = "00:00.00";
                list.innerHTML = '';
                btn.textContent = 'Lap';
            }
        }

        // Timer
        let timerInterval = null;
        let timerSeconds = 0;
        let isTimerPaused = false;

        function startTimer() {
            const h = parseInt(document.getElementById('timer-hours').value) || 0;
            const m = parseInt(document.getElementById('timer-minutes').value) || 0;
            const s = parseInt(document.getElementById('timer-seconds').value) || 0;
            
            timerSeconds = (h * 3600) + (m * 60) + s;
            if (timerSeconds <= 0) return;
            
            document.getElementById('timer-picker-display').classList.add('hidden');
            document.getElementById('timer-running-display').classList.remove('hidden');
            document.getElementById('timer-running-display').classList.add('flex');
            isTimerPaused = false;
            document.getElementById('timer-pause-btn').textContent = 'Pause';
            document.getElementById('timer-pause-btn').className = 'w-[80px] h-[80px] rounded-full bg-[#3B1A12] text-[#FF9F0A] active:bg-[#4A2015] flex items-center justify-center font-semibold text-[17px]';
            
            updateTimerDisplay();
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (!isTimerPaused) {
                    timerSeconds--;
                    updateTimerDisplay();
                    if (timerSeconds <= 0) {
                        clearInterval(timerInterval);
                        cancelTimer();
                    }
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            const h = Math.floor(timerSeconds / 3600);
            const m = Math.floor((timerSeconds % 3600) / 60);
            const s = timerSeconds % 60;
            
            let disp = '';
            if (h > 0) {
                disp += h.toString() + ':';
                disp += m.toString().padStart(2, '0') + ':';
            } else {
                disp += m.toString().padStart(2, '0') + ':';
            }
            disp += s.toString().padStart(2, '0');
            
            document.getElementById('timer-countdown').textContent = disp;
        }

        function pauseResumeTimer() {
            isTimerPaused = !isTimerPaused;
            const btn = document.getElementById('timer-pause-btn');
            if (isTimerPaused) {
                btn.textContent = 'Resume';
                btn.className = 'w-[80px] h-[80px] rounded-full bg-[#0A3A1A] text-[#34C759] active:bg-[#0D4D22] flex items-center justify-center font-semibold text-[17px]';
            } else {
                btn.textContent = 'Pause';
                btn.className = 'w-[80px] h-[80px] rounded-full bg-[#3B1A12] text-[#FF9F0A] active:bg-[#4A2015] flex items-center justify-center font-semibold text-[17px]';
            }
        }

        function cancelTimer() {
            clearInterval(timerInterval);
            document.getElementById('timer-running-display').classList.add('hidden');
            document.getElementById('timer-running-display').classList.remove('flex');
            document.getElementById('timer-picker-display').classList.remove('hidden');
        }

        // Initial update per minute to keep world clock alive
        setInterval(() => {
            if (currentClockTab === 'worldclock') renderWorldClock();
        }, 60000);

        // Add fadeOut animation dynamically
        document.head.insertAdjacentHTML("beforeend", `<style>@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }</style>`);

