// --- WhatsApp Logic ---
const waHome = document.getElementById('wa-home');
const waChatView = document.getElementById('wa-chat-view');
const waContactsList = document.getElementById('wa-contacts-list');

let currentActiveChat = null;
let currentChatType = 'mission'; // Tracks if we are looking at a dynamic mission or a static group

function renderWhatsAppHome() {
    waContactsList.innerHTML = '';

    let chatsData = [];
    let totalUnreadApp = 0;

    // Stage 1: Build the Chat Sort Array (Dynamic Missions + Personal Chat History from state.js)
    if (typeof gameState !== 'undefined' && gameState.juniorsOrder) {
        gameState.juniorsOrder.forEach((missionIndex, arrayIndex) => {
            const mission = MISSIONS[missionIndex];
            if (!mission) return;

            let msgHistory = gameState.messages[mission.contact] || [];
            const isActiveMission = (arrayIndex === activeMissionIndex);

            // If this is the active mission and the actual question hasn't been appended yet, initialize it!
            const hasMissionQ = msgHistory.some(m => m.text === mission.q);
            if (isActiveMission && !hasMissionQ && gamePhase !== 'onboarding' && gamePhase !== 'boot') {
                msgHistory.push({ text: mission.q, isSelf: false, time: getFormattedTime(), timestamp: Date.now(), read: false });
                gameState.messages[mission.contact] = msgHistory;
                localStorage.setItem('gnluGameState', JSON.stringify(gameState));
            }

            const lastMsgObj = msgHistory.length > 0 ? msgHistory[msgHistory.length - 1] : null;

            // Derive the sorting value
            let sortValue = 0;
            if (lastMsgObj && lastMsgObj.timestamp) {
                // Use explicit timestamp if saved
                sortValue = lastMsgObj.timestamp;
            } else if (lastMsgObj) {
                // Fallback for older save files without timestamp
                sortValue = isActiveMission ? Date.now() : 1000 - arrayIndex;
            } else {
                // Lowest priority fallback for empty histories
                sortValue = -arrayIndex;
            }

            // Calculate unread count for this specific chat
            let unreadCount = msgHistory.filter(m => !m.isSelf && m.read === false).length;
            // Backwards compatibility for old saves that don't have read property
            if (unreadCount === 0 && isActiveMission && lastMsgObj?.isSelf === false && lastMsgObj?.read === undefined) {
                unreadCount = 1;
            }
            totalUnreadApp += unreadCount;

            chatsData.push({
                type: 'mission',
                mission,
                msgHistory,
                isActiveMission,
                lastMsgObj,
                sortValue,
                unreadCount
            });
        });
    }

    // Stage 1.5: Build Static Chat Array for GROUPS ONLY (from data.js)
    if (window.whatsappChats) {
        window.whatsappChats.forEach((staticChat, index) => {
            // EXPLICITLY ignore personal chats (Aalok, Kuhu, etc.) if they are in data.js, 
            // because state.js already perfectly handles their rich history. 
            if (staticChat.type !== 'group') return;

            const lastMsgObj = staticChat.messages.length > 0 ? staticChat.messages[staticChat.messages.length - 1] : null;

            // Give it a fixed sort value slightly older than current time so they sort below active missions naturally
            let sortValue = Date.now() - (1000000 * (index + 1));

            chatsData.push({
                type: 'group',
                staticChat,
                lastMsgObj: lastMsgObj ? { text: lastMsgObj.type === 'image' ? '📷 Photo' : lastMsgObj.text, time: lastMsgObj.time, isSelf: lastMsgObj.sender === 'You' } : null,
                sortValue: sortValue,
                unreadCount: 0 // Groups are treated as read
            });
        });
    }

    // Stage 2: Sort based on message timing listing hierarchy (Descending)
    chatsData.sort((a, b) => b.sortValue - a.sortValue);

    // Stage 3: Render the correctly ordered contact list
    chatsData.forEach(chat => {
        // Destructure conditionally based on if it is a mission or static group
        const isGroup = chat.type === 'group';
        const name = isGroup ? chat.staticChat.name : chat.mission.contact;
        const avatar = isGroup ? chat.staticChat.profilePic : chat.mission.avatar;
        const lastMsgObj = chat.lastMsgObj;
        const unreadCount = isGroup ? 0 : chat.unreadCount;

        const lastMsg = lastMsgObj ? lastMsgObj.text : "";
        const isUnread = unreadCount > 0;

        // Format the text snippet to gracefully handle inline HTML from state.js AND image tags from data.js
        const lastMsgSnippet = lastMsg.replace(/<img[^>]*>/gi, '📷 Photo ').replace(/<[^>]*>?/gm, '').trim();

        const ringClass = isUnread ? "ring-2 ring-[#007AFF] ring-offset-2" : ""; // iOS Blue applied properly here
        const timeColor = isUnread ? "text-[#007AFF]" : "text-[#8E8E93]";

        const contactEl = document.createElement('div');
        contactEl.className = "flex items-center pl-4 bg-white active:bg-[#E5E5EA] cursor-pointer transition-colors";

        // Pass the entire chat object abstraction to the opener
        contactEl.onclick = () => openWaChat(chat);

        contactEl.innerHTML = `
                    <div class="w-[52px] h-[52px] rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-200 ${ringClass}">
                        <img src="${avatar}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 py-3 pr-4 border-b border-[#3C3C43]/20 flex flex-col justify-center min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <h3 class="font-semibold text-[17px] text-black tracking-tight">${name}</h3>
                            ${lastMsgObj ? `<span class="text-[15px] font-normal ${timeColor}">${lastMsgObj.time}</span>` : ''}
                        </div>
                        <div class="flex justify-between items-start">
                            <div class="text-[15px] ${isUnread ? 'text-[#3C3C43] font-medium' : 'text-[#8E8E93] font-normal'} truncate mr-2 leading-snug tracking-tight">${lastMsgSnippet}</div>
                            ${isUnread ? `<div class="min-w-[20px] h-[20px] px-1.5 bg-[#007AFF] rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0 mt-0.5 shadow-sm">${unreadCount}</div>` : ''}
                            ${!isUnread && lastMsg && lastMsgObj?.isSelf ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0"><polyline points="9 18 15 12 9 6"></polyline></svg>` : ''}
                        </div>
                    </div>
                `;
        waContactsList.appendChild(contactEl);
    });

    updateAppBadges(totalUnreadApp);
}

function updateAppBadges(totalUnread) {
    const badge = document.getElementById('wa-app-badge');
    if (!badge) return;
    if (totalUnread > 0) {
        badge.textContent = totalUnread;
        badge.classList.remove('hidden');
        setTimeout(() => { badge.classList.remove('scale-0'); badge.classList.add('scale-100'); }, 10);
    } else {
        badge.classList.remove('scale-100');
        badge.classList.add('scale-0');
        setTimeout(() => { badge.classList.add('hidden'); }, 300);
    }
}

function getDateString(timestamp) {
    if (!timestamp) return "Today";
    const d = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function openWaChat(chatData) {
    // Legacy fallback check for handling raw mission clicks from notifications
    if (!chatData || !chatData.type) {
        chatData = { type: 'mission', mission: chatData };
    }

    const isGroup = chatData.type === 'group';
    currentChatType = chatData.type;
    currentActiveChat = isGroup ? chatData.staticChat : chatData.mission;

    const name = isGroup ? chatData.staticChat.name : chatData.mission.contact;
    const avatar = isGroup ? chatData.staticChat.profilePic : chatData.mission.avatar;

    document.getElementById('active-chat-avatar').src = avatar;
    document.getElementById('active-chat-name').innerText = name;

    // Clear messages
    els.chatMessages.innerHTML = '';

    let history = [];
    let updatedReadStatus = false;
    let lastDateStr = null;

    if (isGroup) {
        history = chatData.staticChat.messages || [];
    } else {
        history = gameState.messages[name] || [];
    }

    history.forEach(msg => {
        if (!isGroup && !msg.isSelf && msg.read === false) {
            msg.read = true;
            updatedReadStatus = true;
        }
        // Backwards compatibility
        if (!isGroup && !msg.isSelf && msg.read === undefined) {
            msg.read = true;
            updatedReadStatus = true;
        }

        // Render dynamic Date Dividers based on the message timestamp/date
        let msgDateStr = "Today";
        if (isGroup && msg.date) {
            const d = new Date(msg.date);
            msgDateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        } else if (msg.timestamp) {
            msgDateStr = getDateString(msg.timestamp);
        }

        if (msgDateStr !== lastDateStr) {
            const dateDiv = document.createElement('div');
            dateDiv.className = "flex justify-center mt-3 mb-5";
            dateDiv.innerHTML = `<div class="bg-[#3C3C43]/10 text-black text-[11px] px-3 py-1 rounded-lg font-medium shadow-sm border border-white/50 backdrop-blur-md uppercase tracking-wider">${msgDateStr}</div>`;
            els.chatMessages.appendChild(dateDiv);
            lastDateStr = msgDateStr;
        }

        // Branching Render Logic
        if (isGroup) {
            renderGroupMessageBubble(msg, msg.sender === 'You');
        } else {
            // Uses exact original function to perfectly preserve state.js HTML structure
            renderMissionMessageBubble(msg.text, msg.isSelf, msg.time);
        }
    });

    if (updatedReadStatus && !isGroup) {
        gameState.messages[name] = history;
        localStorage.setItem('gnluGameState', JSON.stringify(gameState));
        // Update home screen dots in background silently
        renderWhatsAppHome();
    }

    waHome.classList.add('-translate-x-1/3');
    waChatView.classList.remove('translate-x-full');

    // Chat Input Bar enabling/disabling
    const inputContainer = document.getElementById('wa-input-container') || els.chatInput.parentElement;

    if (isGroup) {
        // Hide input completely for static group chats
        if (typeof disableChatInput === 'function') disableChatInput();
        if (inputContainer) {
            inputContainer.style.opacity = '0.5';
            inputContainer.style.pointerEvents = 'none';
        }
    } else {
        // Standard mission flow
        if (inputContainer) {
            inputContainer.style.opacity = '1';
            inputContainer.style.pointerEvents = 'auto';
        }
        if (activeMission && name === activeMission.contact && factsCollected >= requiredFactsCount && isWifiConnected && !isGameFinished) {
            if (typeof enableChatInput === 'function') enableChatInput();
        } else {
            if (typeof disableChatInput === 'function') disableChatInput();
        }
    }

    setTimeout(scrollToBottom, 50);
}

function closeWaChat() {
    waHome.classList.remove('-translate-x-1/3');
    waChatView.classList.add('translate-x-full');
    currentActiveChat = null;
    currentChatType = null;
    // Triggers dynamic re-sorting so the most recent chat goes to the top!
    renderWhatsAppHome();
}

window.els.chatSend.addEventListener('click', sendChat);
window.els.chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });

function scrollToBottom() {
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

document.head.insertAdjacentHTML("beforeend", `<style>@keyframes scaleIn { from { opacity:0; transform: scale(0.95) translateY(5px); } to { opacity:1; transform: scale(1) translateY(0); } } .clear-both { clear: both; }</style>`);

function getFormattedTime() {
    let date = new Date(), hours = date.getHours(), minutes = date.getMinutes(), ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; hours = hours ? hours : 12; minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}

function sendChat() {
    const text = els.chatInput.value.trim();

    // Prevent sending inside static groups
    if (!text || isGameFinished || !currentActiveChat || currentChatType === 'group') return;

    const timeStr = getFormattedTime();
    const timestamp = Date.now(); // Inject tracking timestamp for sorting

    // Save to state
    let history = gameState.messages[currentActiveChat.contact] || [];
    history.push({ text: text, isSelf: true, time: timeStr, timestamp: timestamp });
    gameState.messages[currentActiveChat.contact] = history;
    localStorage.setItem('gnluGameState', JSON.stringify(gameState));

    renderMissionMessageBubble(text, true, timeStr);
    els.chatInput.value = '';

    // Re-show input icons
    els.chatCameraBtn.style.display = 'flex';
    els.chatMicBtn.style.display = 'flex';
    els.chatSend.classList.add('hidden');

    const lowerText = text.toLowerCase();
    const isCorrect = currentActiveChat.answer.some(ans => lowerText.includes(ans.toLowerCase()));

    if (isCorrect) {
        disableChatInput();
        setTimeout(() => {
            const replyTime = getFormattedTime();
            // Inject timestamp + delay so it inherently sorts after your text message.
            const pushMsg = { text: "Thank you so much senior! You are the best!", isSelf: false, time: replyTime, timestamp: Date.now() + 1000, read: true };
            let pushHist = gameState.messages[currentActiveChat.contact] || [];
            pushHist.push(pushMsg);
            gameState.messages[currentActiveChat.contact] = pushHist;
            localStorage.setItem('gnluGameState', JSON.stringify(gameState));

            renderMissionMessageBubble(pushMsg.text, false, replyTime);

            // Re-render home in the background to update the message timing sort hierarchy
            renderWhatsAppHome();

            isGameFinished = true;
            if (window.gameState && window.gameState.analytics) {
                window.gameState.analytics.isUnlocked = true;
                localStorage.setItem('gnluGameState', JSON.stringify(window.gameState));
            }
            setTimeout(() => {
                let popupHtml = `
                            <div class="flex flex-col items-center w-full h-full justify-center pt-4">
                                <div class="text-white font-medium text-[18px] text-center leading-[1.4] mb-8">Mission Accomplished!<br>You safely delivered the answer.</div>
                                <div class="flex gap-3 w-full px-4">
                        `;
                if (gameState.currentLevel < 3) {
                    popupHtml += `<button onclick="advanceLevel()" class="flex-1 bg-[#0A84FF] text-white font-semibold py-3 rounded-full active:scale-95">Help Next Junior</button>`;
                } else {
                    popupHtml += `<button onclick="resetGame()" class="flex-1 bg-[#34C759] text-white font-semibold py-3 rounded-full active:scale-95">Finish</button>`;
                }
                popupHtml += `</div></div>`;

                islandTemplates.siriCustom = popupHtml;
                setIslandState('siri_custom');
            }, 1000);
        }, 1000);
    } else {
        let memos = ["That doesn't seem right based on the search result. Keep trying!"];
        if (activeMission) {
            memos = [
                `Hmm, that doesn't seem to match the information we found for ${activeMission.contact}.`,
                `Double-check coordinates and facts. That doesn't match what we discovered!`,
                `${activeMission.contact} is still waiting for the correct info. Let's try to be more precise based on the search.`,
                `Are you sure? Try looking at the search results again - we might be missing a specific detail.`
            ];
        }
        showSiri(memos[Math.floor(Math.random() * memos.length)]);
    }
}

// ORIGINAL Renderer: Used for Mission Contacts to perfectly preserve state.js HTML string formatting
function renderMissionMessageBubble(text, isSelf, time) {
    const div = document.createElement('div');
    if (isSelf) {
        div.className = "bg-[#DCF2FF] text-[16px] text-black p-2 px-3 rounded-[18px] rounded-br-[4px] max-w-[75%] shadow-sm self-end leading-snug ml-auto mt-2 relative animate-[scaleIn_0.2s_ease-out]";
        div.innerHTML = `${text} <span class="text-[11px] text-[#007AFF]/70 float-right mt-[7px] ml-3 flex items-center gap-1">${time} <svg viewBox="0 0 16 15" width="14" height="14" fill="#007AFF"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg></span><div class="clear-both"></div>`;
    } else {
        div.className = "bg-white text-[16px] text-black p-2 px-3 rounded-[18px] rounded-bl-[4px] max-w-[75%] shadow-sm self-start relative leading-snug mt-2 animate-[scaleIn_0.2s_ease-out]";
        div.innerHTML = `${text} <span class="text-[11px] text-[#8E8E93] float-right mt-[7px] ml-3">${time}</span><div class="clear-both"></div>`;
    }
    els.chatMessages.appendChild(div);
    scrollToBottom();
}

// NEW Renderer: Used ONLY for data.js group chats to handle complex custom properties cleanly
function renderGroupMessageBubble(msg, isSelf) {
    const div = document.createElement('div');
    let textContent = msg.text || '';
    let timeContent = msg.time || '';
    let extraHtml = '';

    // Group Sender Names logic
    if (!isSelf && msg.sender) {
        const colors = ['text-[#FF3B30]', 'text-[#007AFF]', 'text-[#34C759]', 'text-[#AF52DE]', 'text-[#FF9500]'];
        const colorClass = colors[msg.sender.length % colors.length];
        extraHtml += `<div class="text-[12px] font-bold ${colorClass} mb-1">${msg.sender}</div>`;
    }

    // Image support logic (Now mimicking state.js UI formatting)
    if (msg.type === 'image' && msg.imgUrl) {
        extraHtml += `<img src="${msg.imgUrl}" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover cursor-pointer" alt="Shared image">`;
        if (textContent === "📸 image attached") textContent = '';
    }

    if (textContent) {
        extraHtml += `<div class="whitespace-pre-wrap leading-snug">${textContent}</div>`;
    }

    if (isSelf) {
        div.className = "bg-[#DCF2FF] text-[16px] text-black p-2 px-3 rounded-[18px] rounded-br-[4px] max-w-[75%] shadow-sm self-end leading-snug ml-auto mt-2 relative animate-[scaleIn_0.2s_ease-out]";
        div.innerHTML = `${extraHtml} <span class="text-[11px] text-[#007AFF]/70 float-right mt-[7px] ml-3 flex items-center gap-1">${timeContent} <svg viewBox="0 0 16 15" width="14" height="14" fill="#007AFF"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg></span><div class="clear-both"></div>`;
    } else {
        div.className = "bg-white text-[16px] text-black p-2 px-3 rounded-[18px] rounded-bl-[4px] max-w-[75%] shadow-sm self-start relative leading-snug mt-2 animate-[scaleIn_0.2s_ease-out]";
        div.innerHTML = `${extraHtml} <span class="text-[11px] text-[#8E8E93] float-right mt-[7px] ml-3">${timeContent}</span><div class="clear-both"></div>`;
    }
    els.chatMessages.appendChild(div);
    scrollToBottom();
}

function advanceLevel() {
    gameState.currentLevel += 1;
    localStorage.setItem('gnluGameState', JSON.stringify(gameState));
    // Set gamePhase to match the new level
    const phaseMap = { 2: 'level_2', 3: 'level_3' };
    localStorage.setItem('gamePhase', phaseMap[gameState.currentLevel] || 'level_3');
    window.location.reload();
}

function resetGame() {
    // Phase 5: Game completed → free explore
    localStorage.setItem('gamePhase', 'completed');
    window.location.reload();
}