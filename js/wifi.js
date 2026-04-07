// --- WiFi Captive Portal Logic ---
        function openWifiPortal() {
            currentWifiQ = 0;
            skipsLeft = 3;
            wifiQuestionsState = window.selectedQuestions.map(q => ({
                ...q,
                status: 'unanswered', // 'unanswered', 'skipped', 'answered'
                selectedOpt: null
            }));

            setIslandState('wifi');

            // Bind new overlay and dynamic elements
            els.wifiWarningOverlay = document.getElementById('wifi-warning-overlay');
            els.wifiMainContent = document.getElementById('wifi-main-content');
            els.wifiSkipBtn = document.getElementById('wifi-skip-btn');
            els.wifiPrevBtn = document.getElementById('wifi-prev-btn');
            els.wifiQProgress = document.getElementById('wifi-q-progress');
            els.wifiArc3 = document.getElementById('wifi-arc-3');
            els.wifiArc2 = document.getElementById('wifi-arc-2');
            els.wifiArc1 = document.getElementById('wifi-arc-1');
            els.wifiDot = document.getElementById('wifi-dot');
            els.wifiResultScore = document.getElementById('wifi-result-score');
            els.wifiIntroContainer = document.getElementById('wifi-intro-container');
            els.wifiStartQuizBtn = document.getElementById('wifi-start-quiz-btn');
            els.wifiFooterActions = document.getElementById('wifi-footer-actions');

            els.wifiStartQuizBtn.onclick = startWifiQuiz;
            els.wifiSkipBtn.onclick = handleWifiSkip;
            els.wifiPrevBtn.onclick = handleWifiPrev;

            document.getElementById('wifi-understood-btn').onclick = () => {
                const cb = document.getElementById('wifi-warning-cb');
                if (cb.checked) {
                    gameState.hideWifiWarning = true;
                    localStorage.setItem('gnluGameState', JSON.stringify(gameState));
                }
                els.wifiWarningOverlay.style.display = 'none';
                els.wifiWarningOverlay.classList.remove('flex');
                els.wifiMainContent.style.filter = 'none';
                els.wifiMainContent.style.opacity = '1';

                if (pendingWarning === 'next') {
                    proceedToNextQuestion();
                } else if (pendingWarning === 'skip') {
                    proceedSkipQuestion();
                }
                pendingWarning = false;
            };

            els.wifiResultContainer.classList.add('hidden');
            els.wifiResultContainer.classList.remove('flex');
            
            // Set intro state
            els.wifiQuestionContainer = document.getElementById('wifi-question-container');
            els.wifiIntroContainer.classList.remove('hidden');
            els.wifiQuestionContainer.classList.add('hidden');
            els.wifiFooterActions.classList.add('hidden');
            els.wifiSkipBtn.classList.add('hidden');
        }

        function startWifiQuiz() {
            els.wifiIntroContainer.classList.add('hidden');
            els.wifiQuestionContainer.classList.remove('hidden');
            els.wifiFooterActions.classList.remove('hidden');
            els.wifiFooterActions.classList.add('flex');
            
            els.wifiActionBtn.textContent = "Next";
            updateWifiStrikes();
            renderWifiQuestion();
            els.wifiActionBtn.onclick = handleWifiNext;
        }

        function calculateStrikes() {
            return wifiQuestionsState.filter(q =>
                q.status === 'skipped' ||
                (q.status === 'answered' && q.selectedOpt !== q.correct)
            ).length;
        }

        function updateWifiStrikes() {
            const strikes = calculateStrikes();
            els.wifiArc3.style.opacity = strikes >= 1 ? '0.2' : '1';
            els.wifiArc2.style.opacity = strikes >= 2 ? '0.2' : '1';
            els.wifiArc1.style.opacity = strikes >= 3 ? '0.2' : '1';
            els.wifiDot.style.opacity = strikes >= 4 ? '0.2' : '1';
        }

        function triggerDimWarning(action) {
            if (!gameState.hideWifiWarning) {
                pendingWarning = action;
                els.wifiWarningOverlay.classList.add('flex');
                els.wifiWarningOverlay.classList.remove('hidden');
                els.wifiMainContent.style.filter = 'blur(4px)';
                els.wifiMainContent.style.opacity = '0.5';
                return true;
            }
            return false;
        }

        function renderWifiQuestion() {
            const qState = wifiQuestionsState[currentWifiQ];

            els.wifiQNum.textContent = `Question ${currentWifiQ + 1}`;
            els.wifiQProgress.textContent = `${currentWifiQ + 1} of ${wifiQuestionsState.length}`;
            els.wifiQText.textContent = qState.q;

            const isAnswered = qState.status === 'answered';

            let html = '';
            qState.opts.forEach((opt, idx) => {
                const isChecked = qState.selectedOpt === idx ? 'checked' : '';
                const isDisabled = isAnswered ? 'disabled' : '';
                const opacityClass = isAnswered && !isChecked ? 'opacity-50' : '';

                html += `<label class="flex items-start gap-3 ${isAnswered ? '' : 'cursor-pointer group'} mb-4 w-full ${opacityClass}">
                    <input type="radio" name="wq" value="${idx}" class="peer sr-only" ${isChecked} ${isDisabled}>
                    <div class="w-4 h-4 flex-shrink-0 mt-[1px] rounded-full border-[1.5px] border-white/40 transition-all peer-checked:border-[5px] peer-checked:border-[#0A84FF] peer-checked:bg-white bg-transparent"></div>
                    <span class="text-[14px] font-medium text-white/80 peer-checked:text-white transition-colors leading-[1.3] break-words">${opt}</span>
                </label>`;
            });
            els.wifiOptions.innerHTML = html;

            if (qState.status !== 'answered' && skipsLeft > 0) {
                els.wifiSkipBtn.style.display = 'block';
                els.wifiSkipBtn.textContent = `Skip (${skipsLeft})`;
            } else {
                els.wifiSkipBtn.style.display = 'none';
            }

            if (currentWifiQ > 0) {
                els.wifiPrevBtn.style.display = 'block';
            } else {
                els.wifiPrevBtn.style.display = 'none';
            }

            if (currentWifiQ === wifiQuestionsState.length - 1) {
                els.wifiActionBtn.textContent = "Submit";
            } else {
                els.wifiActionBtn.textContent = "Next";
            }
        }

        function handleWifiSkip() {
            const qState = wifiQuestionsState[currentWifiQ];
            if (qState.status === 'answered' || skipsLeft <= 0) return;

            const prevStrikes = calculateStrikes();
            qState.status = 'skipped';
            skipsLeft--;

            updateWifiStrikes();
            const newStrikes = calculateStrikes();

            if (newStrikes > 0 && prevStrikes === 0 && triggerDimWarning('skip')) {
                return;
            }
            proceedSkipQuestion();
        }

        function proceedSkipQuestion() {
            if (currentWifiQ < wifiQuestionsState.length - 1) {
                currentWifiQ++;
                renderWifiQuestion();
            } else {
                checkWifiAnswers();
            }
        }

        function handleWifiPrev() {
            if (currentWifiQ > 0) {
                currentWifiQ--;
                renderWifiQuestion();
            }
        }

        function handleWifiNext() {
            const qState = wifiQuestionsState[currentWifiQ];

            if (qState.status !== 'answered') {
                const selected = document.querySelector('input[name="wq"]:checked');
                if (selected) {
                    const prevStrikes = calculateStrikes();
                    qState.selectedOpt = parseInt(selected.value);
                    qState.status = 'answered';

                    updateWifiStrikes();
                    const newStrikes = calculateStrikes();

                    if (newStrikes > prevStrikes && prevStrikes === 0 && triggerDimWarning('next')) {
                        return;
                    }
                } else {
                    els.wifiOptions.classList.add('animate-pulse');
                    setTimeout(() => els.wifiOptions.classList.remove('animate-pulse'), 500);
                    return;
                }
            }

            proceedToNextQuestion();
        }

        function proceedToNextQuestion() {
            if (currentWifiQ < wifiQuestionsState.length - 1) {
                currentWifiQ++;
                renderWifiQuestion();
            } else {
                checkWifiAnswers();
            }
        }

        function checkWifiAnswers() {
            let correctCount = wifiQuestionsState.filter(q => q.status === 'answered' && q.selectedOpt === q.correct).length;
            
            // --- Log for Analytics ---
            if (window.gameState && window.gameState.analytics) {
                wifiQuestionsState.forEach((q, idx) => {
                    if (q.status === 'answered') {
                        // window.selectedFacts[idx] is available because wifi.js uses it too
                        const fact = window.selectedFacts[idx];
                        if (fact) {
                            const questionNum = fact.linked_question_number;
                            const cat = window.QUESTION_CATEGORY_MAP[questionNum] || "General Principles";
                            const isCorrect = q.selectedOpt === q.correct;
                            
                            window.gameState.analytics.academic.answers.push({
                                qNum: questionNum,
                                isCorrect: isCorrect,
                                category: cat,
                                timestamp: Date.now()
                            });

                            if (!window.gameState.analytics.academic.categoryStats[cat]) {
                                window.gameState.analytics.academic.categoryStats[cat] = { correct: 0, total: 0 };
                            }
                            window.gameState.analytics.academic.categoryStats[cat].total++;
                            if (isCorrect) window.gameState.analytics.academic.categoryStats[cat].correct++;
                        }
                    }
                });
                localStorage.setItem('gnluGameState', JSON.stringify(window.gameState));
            }

            let accuracy = correctCount / wifiQuestionsState.length;
            let passed = accuracy >= 0.85;

            els.wifiQContainer.classList.add('hidden');
            els.wifiSkipBtn.style.display = 'none';
            els.wifiPrevBtn.style.display = 'none';
            els.wifiResultContainer.classList.remove('hidden');
            els.wifiResultContainer.classList.add('flex');

            els.wifiResultScore.textContent = `${correctCount}/${wifiQuestionsState.length} Score`;

            if (passed) {
                window.selectedFacts.forEach(f => { if (!gameState.usedFactIds.includes(f.fact_number)) gameState.usedFactIds.push(f.fact_number); });
                localStorage.setItem('gnluGameState', JSON.stringify(gameState));

                els.wifiResultText.textContent = "Connected";
                els.wifiResultText.style.color = "#4ade80";
                els.wifiResultIcon.innerHTML = `<div class="w-[70px] h-[70px] bg-[#16A34A] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(22,163,74,0.4)]"><svg class="w-10 h-10 text-[#000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`;
                els.wifiActionBtn.textContent = "Done";
                els.wifiActionBtn.onclick = () => {
                    dismissIsland(); setWifiState(true); openApp('browser');
                    els.browserHome.classList.add('hidden'); els.browserResults.classList.remove('hidden'); els.browserResults.style.display = 'flex';
                    const m = activeMission; searchInputResults.value = m.trigger[0]; const highlightedAnswer = m.answer[0];
                    searchResultsContent.innerHTML = `<div class="px-4 py-3"><span class="text-[13px] text-[#70757a]">About 1 result (0.34 seconds)</span></div><div class="mx-4 mb-3 p-4 rounded-xl bg-[#f8f9fa] border border-[#e8eaed]"><div class="text-[15px] text-[#4d5156] leading-relaxed mb-2">${m.searchSnippet.replace(new RegExp(highlightedAnswer, 'gi'), match => `<strong style="background:#fef9c3;padding:2px 4px;border-radius:4px;color:#202124">${match}</strong>`)}</div><div class="flex items-center gap-2"><div class="w-5 h-5 rounded-full bg-[#4285F4] flex items-center justify-center"><span class="text-white text-[10px] font-bold">${m.searchSource.charAt(0)}</span></div><span class="text-[12px] text-[#4285F4] font-medium">${m.searchSource}</span></div></div>`;
                    setTimeout(() => showSiri("Connection restored! The search results should be visible now. Let's see what we found."), 600);
                };
            } else {
                els.wifiResultText.textContent = "Weak Signal";
                els.wifiResultText.style.color = "#f87171";
                els.wifiResultIcon.innerHTML = `<div class="w-[70px] h-[70px] bg-[#EF4444] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]"><svg class="w-10 h-10 text-[#000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>`;
                els.wifiActionBtn.textContent = "Try Again";
                els.wifiActionBtn.onclick = openWifiPortal;
            }
        }

