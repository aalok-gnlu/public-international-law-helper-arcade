// --- Browser & Search Logic ---
        let hasTriggeredGameFlow = false;
        const searchFormResults = document.getElementById('search-form-results');
        const searchInputResults = document.getElementById('search-input-results');
        const searchResultsContent = document.getElementById('search-results-content');

        window.els.searchForm.addEventListener('submit', handleSearch);
        searchFormResults.addEventListener('submit', handleSearch);

        function handleSearch(e) {
            e.preventDefault();
            const inputEl = (e.target.id === 'search-form') ? els.searchInput : searchInputResults;
            const query = inputEl.value.trim();
            if (!query) return;

            const lowerQuery = query.toLowerCase();

            // Check if query matches the current mission trigger
            let isTriggerSearch = false;
            if (activeMission) {
                isTriggerSearch = activeMission.trigger.some(triggerWord => lowerQuery.includes(triggerWord));
            }

            if (isTriggerSearch && !hasTriggeredGameFlow) {
                hasTriggeredGameFlow = true;
                els.browserLoading.classList.remove('hidden');
                inputEl.blur();

                setTimeout(() => {
                    els.browserLoading.classList.add('hidden');
                    setWifiState(false);
                    setIslandState('alert');

                    setTimeout(() => {
                        setIslandState('idle');
                        openApp('dino');
                        setTimeout(() => {
                            let memos = ["GNLU WiFi strikes again! Play the Dino game while we wait for the network to reconnect."];
                            if (window.activeMission && window.gamePhase !== 'onboarding') {
                                memos = [
                                    `GNLU WiFi struck again just as we were searching for ${window.activeMission.contact}! Play the Dino game while we wait.`,
                                    `Looks like the GNLU WiFi dropped right as we were searching! Time for some Dino jumping.`,
                                    `Connection lost! Let's play the Dino game until the network is back.`,
                                    `Oops, WiFi is down! While it reconnects, play the Dino game to stay sharp.`
                                ];
                            }
                            showSiri(memos[Math.floor(Math.random() * memos.length)], () => {
                                startDinoGame();
                            });
                        }, 600);
                    }, 3000);
                }, 1500);
                return;
            }

            // Functional search
            performRealSearch(query);
        }

        async function performRealSearch(query) {
            // Switch to results view
            els.browserHome.classList.add('hidden');
            els.browserResults.classList.remove('hidden');
            els.browserResults.style.display = 'flex';
            searchInputResults.value = query;
            els.browserLoading.classList.remove('hidden');

            // Show skeleton loading
            searchResultsContent.innerHTML = `
                <div class="p-4">
                    <div class="text-[13px] text-[#70757a] mb-4 search-skeleton">Fetching results...</div>
                    ${Array(4).fill('').map(() => `
                        <div class="google-result-item">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-7 h-7 rounded-full bg-[#f1f3f4] search-skeleton"></div>
                                <div class="h-3 w-32 bg-[#f1f3f4] rounded search-skeleton"></div>
                            </div>
                            <div class="h-5 w-4/5 bg-[#f1f3f4] rounded mb-2 search-skeleton"></div>
                            <div class="h-3 w-full bg-[#f1f3f4] rounded mb-1 search-skeleton"></div>
                            <div class="h-3 w-3/4 bg-[#f1f3f4] rounded search-skeleton"></div>
                        </div>
                    `).join('')}
                </div>
            `;

            try {
                // Fetch from Wikipedia and DuckDuckGo in parallel
                const [wikiResults, ddgResults] = await Promise.allSettled([
                    fetchWikipediaResults(query),
                    fetchDuckDuckGoResults(query)
                ]);

                const allResults = [];

                // Process Wikipedia results
                if (wikiResults.status === 'fulfilled' && wikiResults.value.length > 0) {
                    allResults.push(...wikiResults.value);
                }

                // Process DuckDuckGo results
                if (ddgResults.status === 'fulfilled' && ddgResults.value.length > 0) {
                    allResults.push(...ddgResults.value);
                }

                els.browserLoading.classList.add('hidden');

                // Limit results to 5 to reduce device load
                const limitedResults = allResults.slice(0, 5);

                renderSearchResults(query, limitedResults);
            } catch (err) {
                els.browserLoading.classList.add('hidden');
                searchResultsContent.innerHTML = `
                    <div class="p-6 text-center">
                        <div class="text-[48px] mb-4">🔍</div>
                        <div class="text-[16px] font-medium text-[#202124] mb-2">Something went wrong</div>
                        <div class="text-[14px] text-[#5f6368]">Could not fetch results. Please try again.</div>
                    </div>
                `;
            }
        }

        async function fetchWikipediaResults(query) {
            const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=5&srprop=snippet|titlesnippet`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.query || !data.query.search) return [];

            return data.query.search.map(item => ({
                title: item.title,
                url: `en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
                fullUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
                snippet: item.snippet.replace(/<[^>]*>/g, ''),
                source: 'Wikipedia',
                favicon: 'W'
            }));
        }

        async function fetchDuckDuckGoResults(query) {
            const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
            const response = await fetch(url);
            const data = await response.json();

            const results = [];

            // Abstract (main answer)
            if (data.AbstractText) {
                results.push({
                    title: data.Heading || query,
                    url: data.AbstractURL || 'duckduckgo.com',
                    fullUrl: data.AbstractURL || 'https://duckduckgo.com',
                    snippet: data.AbstractText.substring(0, 200) + (data.AbstractText.length > 200 ? '...' : ''),
                    source: data.AbstractSource || 'DuckDuckGo',
                    favicon: 'D',
                    isAnswer: true
                });
            }

            // Related topics
            if (data.RelatedTopics) {
                data.RelatedTopics.slice(0, 4).forEach(topic => {
                    if (topic.Text && topic.FirstURL) {
                        const domain = new URL(topic.FirstURL).hostname;
                        results.push({
                            title: topic.Text.split(' - ')[0].substring(0, 80),
                            url: domain,
                            fullUrl: topic.FirstURL,
                            snippet: topic.Text.substring(0, 180) + (topic.Text.length > 180 ? '...' : ''),
                            source: domain,
                            favicon: domain.charAt(0).toUpperCase()
                        });
                    }
                });
            }

            return results;
        }

        function renderSearchResults(query, results) {
            if (results.length === 0) {
                searchResultsContent.innerHTML = `
                    <div class="p-6 text-center">
                        <div class="text-[48px] mb-4">🤔</div>
                        <div class="text-[16px] font-medium text-[#202124] mb-2">No results found for "${query}"</div>
                        <div class="text-[14px] text-[#5f6368]">Try different keywords or check your spelling.</div>
                    </div>
                `;
                return;
            }

            let html = `<div class="px-4 py-3"><span class="text-[13px] text-[#70757a]">About ${results.length} result${results.length > 1 ? 's' : ''} (${(Math.random() * 0.5 + 0.1).toFixed(2)} seconds)</span></div>`;

            // Featured answer box if available
            const answerResult = results.find(r => r.isAnswer);
            if (answerResult) {
                html += `
                    <div class="mx-4 mb-3 p-4 rounded-xl bg-[#f8f9fa] border border-[#e8eaed]">
                        <div class="text-[15px] text-[#4d5156] leading-relaxed mb-2">${answerResult.snippet}</div>
                        <div class="flex items-center gap-2">
                            <div class="w-5 h-5 rounded-full bg-[#4285F4] flex items-center justify-center">
                                <span class="text-white text-[10px] font-bold">${answerResult.favicon}</span>
                            </div>
                            <span class="text-[12px] text-[#4285F4] font-medium">${answerResult.source}</span>
                        </div>
                    </div>
                `;
            }

            // Regular results
            results.forEach(result => {
                if (result.isAnswer) return;
                const clickUrl = result.fullUrl ? result.fullUrl.replace(/'/g, "\\'") : '';
                html += `
                    <div class="google-result-item">
                        <div class="flex items-center gap-2 mb-1.5">
                            <div class="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center flex-shrink-0">
                                <span class="text-[#5f6368] text-[11px] font-bold">${result.favicon}</span>
                            </div>
                            <div>
                                <div class="text-[12px] text-[#202124] font-medium">${result.source}</div>
                                <div class="text-[11px] text-[#5f6368] truncate" style="max-width:230px">${result.url}</div>
                            </div>
                        </div>
                        <div class="text-[17px] text-[#1a0dab] font-medium mb-1 leading-snug cursor-pointer hover:underline" onclick="openInIframe('${clickUrl}')">${result.title}</div>
                        <div class="text-[14px] text-[#4d5156] leading-relaxed">${result.snippet}</div>
                    </div>
                `;
            });

            // "People also search for" section
            html += `
                <div class="px-4 py-4">
                    <div class="text-[15px] font-medium text-[#202124] mb-3">People also search for</div>
                    <div class="flex flex-wrap gap-2">
                        ${generateRelatedSearches(query).map(term => `
                            <div class="px-3 py-2 rounded-full bg-[#f1f3f4] text-[13px] text-[#202124] cursor-pointer hover:bg-[#e8eaed] transition-colors" onclick="relatedSearch('${term.replace(/'/g, '')}')">${term}</div>
                        `).join('')}
                    </div>
                </div>
            `;

            searchResultsContent.innerHTML = html;
            searchResultsContent.scrollTop = 0;
        }

        function generateRelatedSearches(query) {
            const words = query.split(' ');
            const suggestions = [
                query + ' meaning',
                query + ' explained',
                query + ' history',
                'what is ' + query,
                query + ' facts',
                query + ' latest'
            ];
            return suggestions.slice(0, 5);
        }

        function relatedSearch(term) {
            searchInputResults.value = term;
            performRealSearch(term);
        }

        function closeSearchResults() {
            els.browserResults.classList.add('hidden');
            els.browserResults.style.display = '';
            els.browserHome.classList.remove('hidden');
            els.searchInput.value = '';
            searchInputResults.value = '';
            closeIframeViewer();
        }

