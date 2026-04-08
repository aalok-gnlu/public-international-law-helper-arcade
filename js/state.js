// Global handler for notification clicks
function handleNotificationClick(missionId) {
    dismissIsland();
    const mission = MISSIONS.find(m => m.id === missionId);
    if (mission) {
        openApp('chat');
        // Give DOM a tiny bit to update before sliding to chat
        setTimeout(() => {
            openWaChat(mission);
        }, 100);
    }
}

// --- Permissions State ---
window.appPermissions = { camera: false, location: false };
window.svgPermissions = {
    camera: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>`,
    location: `<svg class="w-8 h-8 text-[#34C759]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>`,
    contacts: `<svg class="w-8 h-8 text-[#0A84FF]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`
};

// --- Data ---
// FACTS_DB and QUESTIONS_DB loaded from data.js

// --- Missions & State ---
window.LAW_CATEGORIES = {
    SOURCES: "Sources of International Law",
    SUBJECTS: "Subjects of International Law",
    NATURE: "Nature & History of IL",
    MUNICIPAL: "IL & Municipal Law",
    TERRITORY: "Territory & Sovereignty",
    IMMUNITY: "Sovereign Immunity",
    DISPUTE: "Dispute & Force",
    GENERAL: "General Principles"
};

window.QUESTION_CATEGORY_MAP = {
    1: window.LAW_CATEGORIES.SOURCES, 2: window.LAW_CATEGORIES.SOURCES, 3: window.LAW_CATEGORIES.SOURCES,
    4: window.LAW_CATEGORIES.SOURCES, 5: window.LAW_CATEGORIES.SOURCES, 6: window.LAW_CATEGORIES.SOURCES,
    7: window.LAW_CATEGORIES.SOURCES, 8: window.LAW_CATEGORIES.SOURCES, 9: window.LAW_CATEGORIES.SOURCES,
    10: window.LAW_CATEGORIES.SOURCES, 11: window.LAW_CATEGORIES.SOURCES, 12: window.LAW_CATEGORIES.GENERAL,
    13: window.LAW_CATEGORIES.GENERAL, 14: window.LAW_CATEGORIES.SOURCES, 15: window.LAW_CATEGORIES.NATURE,
    16: window.LAW_CATEGORIES.SOURCES, 17: window.LAW_CATEGORIES.SOURCES, 18: window.LAW_CATEGORIES.SOURCES,
    19: window.LAW_CATEGORIES.SOURCES, 20: window.LAW_CATEGORIES.SOURCES, 21: window.LAW_CATEGORIES.SOURCES,
    22: window.LAW_CATEGORIES.SOURCES, 23: window.LAW_CATEGORIES.SUBJECTS, 24: window.LAW_CATEGORIES.SUBJECTS,
    25: window.LAW_CATEGORIES.SUBJECTS, 26: window.LAW_CATEGORIES.NATURE, 27: window.LAW_CATEGORIES.NATURE,
    28: window.LAW_CATEGORIES.NATURE, 29: window.LAW_CATEGORIES.NATURE, 30: window.LAW_CATEGORIES.NATURE,
    31: window.LAW_CATEGORIES.MUNICIPAL, 32: window.LAW_CATEGORIES.MUNICIPAL, 33: window.LAW_CATEGORIES.MUNICIPAL,
    34: window.LAW_CATEGORIES.MUNICIPAL, 35: window.LAW_CATEGORIES.MUNICIPAL, 36: window.LAW_CATEGORIES.TERRITORY,
    37: window.LAW_CATEGORIES.TERRITORY, 38: window.LAW_CATEGORIES.TERRITORY, 39: window.LAW_CATEGORIES.TERRITORY,
    40: window.LAW_CATEGORIES.TERRITORY, 41: window.LAW_CATEGORIES.TERRITORY, 42: window.LAW_CATEGORIES.TERRITORY,
    43: window.LAW_CATEGORIES.TERRITORY, 44: window.LAW_CATEGORIES.IMMUNITY, 45: window.LAW_CATEGORIES.IMMUNITY,
    46: window.LAW_CATEGORIES.DISPUTE, 47: window.LAW_CATEGORIES.DISPUTE, 48: window.LAW_CATEGORIES.DISPUTE,
    49: window.LAW_CATEGORIES.DISPUTE, 50: window.LAW_CATEGORIES.DISPUTE
};

const MISSIONS = [
    { id: 1, contact: "Aalok", avatar: "profile_pics/Aalok.png", q: "Quick question, how many member states are in the Asia-Pacific Group?", trigger: ["asia", "asian"], answer: ["54"], factsNeeded: 5, searchSnippet: "The Asia-Pacific Group is one of the five United Nations regional groups and currently consists of 54 Member States, making it the second largest regional group.", searchSource: "United Nations" },
    { id: 2, contact: "Kuhu", avatar: "profile_pics/Kuhu.png", q: "Do you remember where the International Court of Justice is located?", trigger: ["hague", "icj", "court"], answer: ["hague", "the hague"], factsNeeded: 10, searchSnippet: "The International Court of Justice (ICJ) is the principal judicial organ of the United Nations, located in The Hague, Netherlands.", searchSource: "ICJ Official" },
    { id: 3, contact: "Aaveksha", avatar: "profile_pics/Aaveksha.png", q: "Urgent - exactly what year was the United Nations Charter signed?", trigger: ["1945", "charter", "un charter"], answer: ["1945"], factsNeeded: 15, searchSnippet: "The United Nations Charter was signed on 26 June 1945, in San Francisco, at the conclusion of the United Nations Conference on International Organization.", searchSource: "United Nations" }
];

window.gameState = JSON.parse(localStorage.getItem('gnluGameState'));

// Migration: Ensure analytics structure exists for existing users
if (window.gameState) {
    if (!window.gameState.analytics) {
        window.gameState.analytics = {
            academic: { answers: [], categoryStats: {} },
            gaming: { totalDeaths: 0, distractions: 0, milestoneFails: 0, levelFailures: [0, 0, 0, 0, 0], deaths: [] },
            isUnlocked: false
        };
    } else {
        // Partial migration check
        if (!window.gameState.analytics.academic) window.gameState.analytics.academic = { answers: [], categoryStats: {} };
        if (!window.gameState.analytics.gaming) {
            window.gameState.analytics.gaming = { totalDeaths: 0, distractions: 0, milestoneFails: 0, levelFailures: [0, 0, 0, 0, 0], deaths: [] };
        } else {
            if (!window.gameState.analytics.gaming.levelFailures) window.gameState.analytics.gaming.levelFailures = [0, 0, 0, 0, 0];
            if (!window.gameState.analytics.gaming.deaths) window.gameState.analytics.gaming.deaths = [];
            // Ensure levelFailures has correct length
            if (window.gameState.analytics.gaming.levelFailures.length < 5) {
                while(window.gameState.analytics.gaming.levelFailures.length < 5) window.gameState.analytics.gaming.levelFailures.push(0);
            }
        }
    }

    // If already completed, unlock analytics immediately
    if (localStorage.getItem('gamePhase') === 'completed' || window.gameState.currentLevel > 3) {
        window.gameState.analytics.isUnlocked = true;
    }
    localStorage.setItem('gnluGameState', JSON.stringify(window.gameState));
}

// Automatically inject realistic history if the old state doesn't have the hasHistory flag!
if (!gameState || !gameState.juniorsOrder || !gameState.hasHistory) {
    const shuffled = [0, 1, 2].sort(() => Math.random() - 0.5);

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const minMs = 60 * 1000;
    const dummyMessages = {
        "Aalok": [
            { text: `Did sir upload the reading material for tomorrow?`, isSelf: false, time: "10:15 AM", timestamp: now - 5 * dayMs, read: true },
            { text: `Not yet, I'll let you know when he does 👍`, isSelf: true, time: "10:20 AM", timestamp: now - 5 * dayMs + 5 * minMs, read: true },
            { text: `Thanks man!`, isSelf: false, time: "10:22 AM", timestamp: now - 5 * dayMs + 7 * minMs, read: true },

            { text: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkNFZQXADk4R16wU8rEa7OrQANly4uvtP09Q&s" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">Hey senior, are you coming to the football match later?`, isSelf: false, time: "4:30 PM", timestamp: now - 4 * dayMs, read: true },
            { text: `Yeah, I'll be there!`, isSelf: true, time: "4:35 PM", timestamp: now - 4 * dayMs + 5 * minMs, read: true },

            { text: `Where are you guys eating today?`, isSelf: true, time: "1:00 PM", timestamp: now - 3 * dayMs, read: true },
            { text: `Mess is too crowded, going to the cafe.`, isSelf: false, time: "1:05 PM", timestamp: now - 3 * dayMs + 5 * minMs, read: true },
            { text: `Come join us 🍕`, isSelf: false, time: "1:06 PM", timestamp: now - 3 * dayMs + 6 * minMs, read: true },

            { text: `<img src="https://gnlu.ac.in//Document/photo-gallery/Banking-And-Finance-Law/L_d7214b76-46d1-45f8-a301-f572b705dffd.jpeg" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">Check out this crazy lecture today.`, isSelf: false, time: "11:15 AM", timestamp: now - 2 * dayMs, read: true },
            { text: `Looks intense. Good luck with the notes 😂`, isSelf: true, time: "11:30 AM", timestamp: now - 2 * dayMs + 15 * minMs, read: true },

            { text: `Are you free tonight? We are planning a movie.`, isSelf: false, time: "7:00 PM", timestamp: now - 1 * dayMs, read: true },
            { text: `Busy with assignments today 😭`, isSelf: true, time: "7:15 PM", timestamp: now - 1 * dayMs + 15 * minMs, read: true }
        ],
        "Kuhu": [
            { text: `<img src="https://www.campusoption.com/images/colleges/gallery/30_11_16_061248_gn_2.jpeg" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">The library is so packed today!`, isSelf: false, time: "2:00 PM", timestamp: now - 5 * dayMs, read: true },
            { text: `Can't even find a seat.`, isSelf: false, time: "2:01 PM", timestamp: now - 5 * dayMs + minMs, read: true },
            { text: `Try the second floor corner, usually empty.`, isSelf: true, time: "2:10 PM", timestamp: now - 5 * dayMs + 10 * minMs, read: true },

            { text: `Do you have the notes for Criminal Law from last week? 🙏`, isSelf: false, time: "4:00 PM", timestamp: now - 4 * dayMs, read: true },
            { text: `Yeah I'll send the PDF in a bit.`, isSelf: true, time: "4:15 PM", timestamp: now - 4 * dayMs + 15 * minMs, read: true },
            { text: `You are a lifesaver!! 💯`, isSelf: false, time: "4:16 PM", timestamp: now - 4 * dayMs + 16 * minMs, read: true },

            { text: `Are we still meeting for the project discussion?`, isSelf: false, time: "3:00 PM", timestamp: now - 3 * dayMs, read: true },
            { text: `Yes, 5 PM at the reading room.`, isSelf: true, time: "3:05 PM", timestamp: now - 3 * dayMs + 5 * minMs, read: true },

            { text: `Hey, I missed your call earlier.`, isSelf: false, time: "11:00 AM", timestamp: now - 2 * dayMs, read: true },
            { text: `No worries, it was just about the club registrations.`, isSelf: true, time: "11:30 AM", timestamp: now - 2 * dayMs + 30 * minMs, read: true },

            { text: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqmNDd9hQakKbw_ujLNZP4K4_aBohNgLOt1Q&s" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">Dance club intro night was amazing!!`, isSelf: false, time: "10:30 PM", timestamp: now - 1 * dayMs, read: true },
            { text: `Sad I missed it! Looked fun.`, isSelf: true, time: "10:45 PM", timestamp: now - 1 * dayMs + 15 * minMs, read: true }
        ],
        "Aaveksha": [
            { text: `When is the deadline for the research paper?`, isSelf: false, time: "9:00 AM", timestamp: now - 5 * dayMs, read: true },
            { text: `Friday 11:59 PM. Don't leave it to the last minute!`, isSelf: true, time: "9:10 AM", timestamp: now - 5 * dayMs + 10 * minMs, read: true },
            { text: `Oops 😅`, isSelf: false, time: "9:15 AM", timestamp: now - 5 * dayMs + 15 * minMs, read: true },

            { text: `Did you talk to the coordinator about the event?`, isSelf: true, time: "2:00 PM", timestamp: now - 4 * dayMs, read: true },
            { text: `Yes, it's approved! We can start promotions tomorrow 🎉`, isSelf: false, time: "2:15 PM", timestamp: now - 4 * dayMs + 15 * minMs, read: true },
            { text: `Perfect.`, isSelf: true, time: "2:20 PM", timestamp: now - 4 * dayMs + 20 * minMs, read: true },

            { text: `<img src="https://gnlu.ac.in//Document/photo-gallery/Law-And-Economics/L_6e05e791-499f-4cc8-8fa9-b0acabd9f267.jpeg" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">Moot court prep is draining me...`, isSelf: false, time: "6:00 PM", timestamp: now - 3 * dayMs, read: true },
            { text: `You've got this! Take a break.`, isSelf: true, time: "6:15 PM", timestamp: now - 3 * dayMs + 15 * minMs, read: true },

            { text: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gWeC-89DS0daJLXHcPijB8vHwN-FUDAvrQ&s" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">Took your advice, at Chai G now ☕️`, isSelf: false, time: "5:20 PM", timestamp: now - 2 * dayMs, read: true },
            { text: `Get me a cutting chai!`, isSelf: true, time: "5:22 PM", timestamp: now - 2 * dayMs + 2 * minMs, read: true },
            { text: `Haha sure, bringing it to the hostel.`, isSelf: false, time: "5:25 PM", timestamp: now - 2 * dayMs + 5 * minMs, read: true },

            { text: `<img src="https://i.ytimg.com/vi/4g8xmK8Z4eA/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGFEgXihlMA8=&rs=AOn4CLAnNHhhPDZM0NcJECyXaSfPZHEnMA" class="w-full max-h-[220px] rounded-[8px] mb-1.5 shadow-sm object-cover">Gym time! Never skipping leg day 💪`, isSelf: false, time: "7:00 AM", timestamp: now - 1 * dayMs, read: true }
        ]
    };

    gameState = {
        currentLevel: 1,
        userName: "",
        juniorsOrder: shuffled,
        usedFactIds: [],
        messages: dummyMessages,
        hasHistory: true,
        analytics: {
            academic: {
                answers: [], // Array of { question_number, isCorrect, category }
                categoryStats: {} // { "Category Name": { correct: 0, total: 0 } }
            },
            gaming: {
                totalDeaths: 0,
                distractions: 0, // Deaths within 5s of fact spawn/collect
                milestoneFails: 0, // Deaths within 20 points of milestone
                levelFailures: [0, 0, 0, 0, 0], // per phase
                deaths: []
            },
            isUnlocked: false
        },
        settings: {
            airplaneMode: false,
            wifiConnected: true,
            darkMode: false,
            wallpaper: 'default',
            lowPowerMode: false,
            batteryPercent: 88
        }
    };
    localStorage.setItem('gnluGameState', JSON.stringify(window.gameState));
}

// --- Apply System Settings ---
function applySystemSettings() {
    if (!window.gameState || !window.gameState.settings) return;
    const s = window.gameState.settings;

    // 1. Dark Mode
    const phoneContainer = document.getElementById('phone-container');
    if (phoneContainer) {
        if (s.darkMode) phoneContainer.classList.add('dark-mode');
        else phoneContainer.classList.remove('dark-mode');
    }

    // 2. Connectivity (Sync global isWifiConnected)
    isWifiConnected = s.airplaneMode ? false : s.wifiConnected;

    const wifiIcon = document.getElementById('wifi-icon');
    const noWifiIcon = document.getElementById('no-wifi-icon');
    const airplaneIcon = document.getElementById('airplane-mode-icon');
    const settingsWifiStatus = document.getElementById('settings-wifi-status');

    if (s.airplaneMode) {
        if (wifiIcon) wifiIcon.classList.add('hidden');
        if (noWifiIcon) noWifiIcon.classList.add('hidden');
        if (airplaneIcon) airplaneIcon.classList.remove('hidden');
        if (settingsWifiStatus) settingsWifiStatus.innerText = 'Off';
    } else {
        if (airplaneIcon) airplaneIcon.classList.add('hidden');
        if (isWifiConnected) {
            if (wifiIcon) wifiIcon.classList.remove('hidden');
            if (noWifiIcon) noWifiIcon.classList.add('hidden');
            if (settingsWifiStatus) settingsWifiStatus.innerText = 'GNLU-WIFI';
        } else {
            if (wifiIcon) wifiIcon.classList.add('hidden');
            if (noWifiIcon) noWifiIcon.classList.remove('hidden');
            if (settingsWifiStatus) settingsWifiStatus.innerText = 'Not Connected';
        }
    }

    // 3. Wallpaper
    const wpLayer = document.getElementById('home-wallpaper');
    if (wpLayer) {
        let wpUrl = "";
        if (s.wallpaper === 'default') {
            wpUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
        } else if (s.wallpaper === 'aurora') {
            wpUrl = "https://images.unsplash.com/photo-1531315630201-bb15b9966a1c?q=80&w=2564&auto=format&fit=crop";
        } else if (s.wallpaper === 'minimal') {
            wpUrl = "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2670&auto=format&fit=crop";
        }

        if (wpUrl) {
            wpLayer.style.backgroundImage = `url('${wpUrl}')`;
            wpLayer.classList.remove('bg-gradient-to-b');
            document.querySelectorAll('.home-decor').forEach(d => d.style.opacity = '0');
        } else {
            wpLayer.style.backgroundImage = "";
            wpLayer.classList.add('bg-gradient-to-b');
            document.querySelectorAll('.home-decor').forEach(d => d.style.opacity = '');
        }
    }

    // 4. Low Power Mode
    const batteryFill = document.getElementById('battery-fill');
    if (s.lowPowerMode) {
        if (batteryFill) batteryFill.classList.replace('bg-white', 'bg-yellow-400');
    } else {
        if (batteryFill) batteryFill.classList.replace('bg-yellow-400', 'bg-white');
    }

    // 5. User Name
    if (window.gameState.userName) {
        const nameEl = document.getElementById('settings-username');
        if (nameEl) nameEl.textContent = window.gameState.userName;
    }

    // 6. Analytics Visibility
    const analyticsRow = document.getElementById('settings-analytics-row');
    if (analyticsRow) {
        if (window.gameState.analytics && window.gameState.analytics.isUnlocked) {
            analyticsRow.classList.remove('hidden');
        } else {
            analyticsRow.classList.add('hidden');
        }
    }
}

// Initialize settings on load
if (!gameState.settings) {
    gameState.settings = {
        airplaneMode: false,
        wifiConnected: true,
        darkMode: false,
        wallpaper: 'default',
        lowPowerMode: false,
        batteryPercent: 88
    };
    localStorage.setItem('gnluGameState', JSON.stringify(gameState));
}
applySystemSettings();

const activeMissionIndex = window.gameState.currentLevel - 1;
window.activeMission = (window.gamePhase !== 'onboarding' && activeMissionIndex < 3) ? MISSIONS[window.gameState.juniorsOrder[activeMissionIndex]] : null;
window.requiredFactsCount = window.activeMission ? window.activeMission.factsNeeded : 5;

// --- Select N random facts (avoiding previously used ones) ---
function pickRandomFacts(count) {
    const available = FACTS_DB.filter(f => !gameState.usedFactIds.includes(f.fact_number));
    // Fisher-Yates shuffle
    for (let i = available.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [available[i], available[j]] = [available[j], available[i]];
    }
    return available.slice(0, count);
}
window.selectedFacts = pickRandomFacts(requiredFactsCount);
// Build matching questions from QUESTIONS_DB using linked_question_number
window.selectedQuestions = window.selectedFacts.map(f => {
    const qData = QUESTIONS_DB.find(q => q.question_number === f.linked_question_number);
    const answerIndex = qData.answer === 'Option A' ? 0 : qData.answer === 'Option B' ? 1 : 2;
    return { q: qData.question, opts: [qData.option_a, qData.option_b, qData.option_c], correct: answerIndex };
});

window.activeScreen = '';
window.isWifiConnected = true;
window.factsCollected = 0;
let typingInterval = null;
let islandCloseCallback = null;
window.isGameFinished = false;

let currentWifiQ = 0;
let wifiQuestionsState = [];
let skipsLeft = 3;
let pendingWarning = false;

// --- DOM Elements ---
window.els = {
    screens: document.querySelectorAll('.app-screen'),
    clock: document.getElementById('clock'),
    wifiIcon: document.getElementById('wifi-icon'),
    noWifiIcon: document.getElementById('no-wifi-icon'),
    homeBtn: document.getElementById('home-btn'),
    statusBar: document.getElementById('status-bar'),

    // Dynamic Island
    island: document.getElementById('dynamic-island'),
    siriText: document.getElementById('siri-text'),
    islandBaseSmall: document.getElementById('island-base-small'),
    islandContentSmall: document.getElementById('island-content-small'),
    islandBaseLarge: document.getElementById('island-base-large'),
    islandContentLarge: document.getElementById('island-content-large'),

    // Apps
    searchInput: document.getElementById('search-input'),
    searchForm: document.getElementById('search-form'),
    browserLoading: document.getElementById('browser-loading'),
    browserHome: document.getElementById('browser-home'),
    browserResults: document.getElementById('browser-results'),
    dinoErrorText: document.getElementById('dino-error-text'),

    chatInput: document.getElementById('chat-input'),
    chatSend: document.getElementById('chat-send'),
    chatMessages: document.getElementById('chat-messages'),
    chatPlusBtn: document.getElementById('chat-plus-btn'),
    stickerBtn: document.getElementById('sticker-btn'),
    chatCameraBtn: document.getElementById('chat-camera-btn'),
    chatMicBtn: document.getElementById('chat-mic-btn'),

    // WiFi Portal Elements
    wifiQNum: document.getElementById('wifi-q-num'),
    wifiQText: document.getElementById('wifi-q-text'),
    wifiOptions: document.getElementById('wifi-options'),
    wifiResultContainer: document.getElementById('wifi-result-container'),
    wifiResultText: document.getElementById('wifi-result-text'),
    wifiResultIcon: document.getElementById('wifi-result-icon'),
    wifiQContainer: document.getElementById('wifi-question-container'),
    wifiActionBtn: document.getElementById('wifi-action-btn')
};

// --- Game Phase Management ---
window.gamePhase = localStorage.getItem('gamePhase') || 'onboarding';
window.onboardingTipsVisited = false;

// --- Initialization ---
function init() {
    applySystemSettings();
    updateClock();
    setInterval(updateClock, 60000);
    renderWhatsAppHome();

    initLocationServices();
    loadDiscoverFeed();

    // Toggle input UI states
    els.chatInput.addEventListener('input', () => {
        if (els.chatInput.value.trim().length > 0) {
            els.chatCameraBtn.style.display = 'none';
            els.chatMicBtn.style.display = 'none';
            els.chatSend.classList.remove('hidden');
        } else {
            els.chatCameraBtn.style.display = 'flex';
            els.chatMicBtn.style.display = 'flex';
            els.chatSend.classList.add('hidden');
        }
    });

    // Handle taps on a locked chat input explicitly
    els.chatInput.addEventListener('click', (e) => {
        if (els.chatInput.hasAttribute('readonly') && !isGameFinished) {
            const remaining = requiredFactsCount - factsCollected;

            if (isWifiConnected && factsCollected === 0) {
                showSiri(`We don't have enough information yet. Why don't you try searching for more details on Google?`);
            } else if (remaining > 0) {
                showSiri(`We're currently offline! Go play the Dino game to collect ${remaining} more fact${remaining > 1 ? 's' : ''}.`);
            } else if (!isWifiConnected) {
                showSiri(`Connect to GNLU WiFi first so we can check the search results!`);
            }
        }
    });

    // --- Phase-based flow ---
    if (gamePhase === 'onboarding') {
        startBootSequence();
    } else if (gamePhase === 'completed') {
        // Phase 5: Free explore
        hideBootAndLock();
        openApp('home');
        setTimeout(() => {
            showSiri(`Congratulations! You've completed all 3 missions! If you noticed, this entire phone is fully functional — every single app works just like a real iPhone. Feel free to explore!`);
        }, 1000);
    } else {
        // Phases 2-4: Game levels (level_1, level_2, level_3)
        hideBootAndLock();
        openApp('home');
        setTimeout(() => {
            if (activeMission) {
                showWhatsappNotification(activeMission);
            }
        }, 1000);
    }
}

// --- Phase 1: Boot Sequence ---
function startBootSequence() {
    // Update lock screen time/date
    updateLockScreenTime();

    const bootScreen = document.getElementById('screen-boot');
    const lockScreen = document.getElementById('screen-lock');

    // Boot screen is already visible via CSS z-index
    // After loading bar completes (~3.7s), fade boot → show lock
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
            lockScreen.classList.add('active');
            initLockScreenGesture();
        }, 800);
    }, 3700);
}

function hideBootAndLock() {
    const boot = document.getElementById('screen-boot');
    const lock = document.getElementById('screen-lock');
    if (boot) boot.style.display = 'none';
    if (lock) lock.style.display = 'none';
}

function updateLockScreenTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    h = h % 12 || 12;
    m = m < 10 ? '0' + m : m;
    document.getElementById('lock-time').textContent = h + ':' + m;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('lock-date').textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
}

function initLockScreenGesture() {
    const lockScreen = document.getElementById('screen-lock');
    const swipeArea = document.getElementById('lock-swipe-area');

    // Click/tap handler for the swipe area (simplified for desktop)
    let startY = 0;

    lockScreen.addEventListener('mousedown', (e) => { startY = e.clientY; });
    lockScreen.addEventListener('mouseup', (e) => {
        if (startY - e.clientY > 40) unlockPhone();
    });
    lockScreen.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
    lockScreen.addEventListener('touchend', (e) => {
        if (startY - e.changedTouches[0].clientY > 40) unlockPhone();
    }, { passive: true });

    // Also allow click on the swipe hint text
    swipeArea.addEventListener('click', unlockPhone);
}

function unlockPhone() {
    const lockScreen = document.getElementById('screen-lock');
    if (lockScreen.classList.contains('fade-out')) return;

    // Phase 1: Show Smiley Outline (Stage 1) - Upgraded to Large Island
    const faceIdContent = `
                <div id="faceid-container" class="flex flex-col items-center justify-center w-full h-full pt-4">
                    <div id="faceid-wrapper" class="relative w-24 h-24 flex items-center justify-center mb-6">
                        <svg id="faceid-svg" class="w-20 h-20 text-[#34C759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <circle cx="12" cy="12" r="10"/>
                            <g id="face-features">
                                <line x1="9" y1="10" x2="9" y2="10.01" stroke-linecap="round" stroke-width="2.5"/>
                                <line x1="15" y1="10" x2="15" y2="10.01" stroke-linecap="round" stroke-width="2.5"/>
                                <path d="M8 15c1 1.5 5 1.5 6 0" stroke-linecap="round"/>
                            </g>
                            <path id="face-tick" class="opacity-0" d="M8 12.5l3 3 5-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/>
                        </svg>
                    </div>
                    <div class="text-[17px] font-semibold text-white/90">Face ID</div>
                </div>
            `;
    setLargeIsland(faceIdContent, '200px');

    const wrapper = document.getElementById('faceid-wrapper');
    const features = document.getElementById('face-features');
    const tick = document.getElementById('face-tick');

    // Stage 2: Vibrate and Flip
    setTimeout(() => {
        wrapper.classList.add('faceid-animating', 'faceid-flipping');

        // Stage 3: Reveal Tick (Mid-flip)
        setTimeout(() => {
            features.classList.add('opacity-0');
            tick.classList.remove('opacity-0');
            tick.classList.add('opacity-100');
        }, 200);
    }, 600);

    // Final: Dismiss and Unlock
    setTimeout(() => {
        resetIsland();
        lockScreen.classList.add('fade-out');

        setTimeout(() => {
            lockScreen.style.display = 'none';
            openApp('home');

            const tipsBtn = document.getElementById('tips-go-back-btn');
            if (tipsBtn) tipsBtn.classList.remove('hidden');

            if (window.gamePhase === 'onboarding' && !window.gameState.userName) {
                setTimeout(() => {
                    if (window.showNameInputIsland) window.showNameInputIsland();
                }, 600);
            } else if (window.gamePhase === 'onboarding') {
                setTimeout(() => {
                    showSiri(`Welcome back! Open the Tips app to learn how the game works.`);
                }, 800);
            }
        }, 500);
    }, 1800);
}

// --- Tips Onboarding Flow ---
function tipsGoBack() {
    onboardingTipsVisited = true;
    openApp('home');

    setTimeout(() => {
        // Show Siri confirmation with buttons
        const confirmContent = `
                    <div class="flex flex-col items-center w-full h-full pt-2">
                        <div class="relative w-[72px] h-[72px] mb-8">
                            <div class="absolute inset-[-15px] rounded-full opacity-30 blur-[15px] bg-gradient-to-r from-[#5b32ff] via-[#ff2a85] to-[#00f0ff] animate-pulse"></div>
                            <div class="siri-modern-container absolute inset-0">
                                <div class="siri-blob siri-blob-1"></div><div class="siri-blob siri-blob-2"></div><div class="siri-blob siri-blob-3"></div><div class="siri-core"></div><div class="siri-modern-glass"></div>
                            </div>
                        </div>
                        <p class="text-white text-[16px] font-medium text-center leading-snug px-4 mb-8">Now that you know how it works, are you ready to begin?</p>
                        <div class="flex gap-3 w-full px-4">
                            <button onclick="openApp('tips'); dismissIsland();" class="flex-1 py-3.5 bg-[#333333] active:bg-[#444444] rounded-2xl text-white text-[16px] font-semibold transition-colors">Open Tips</button>
                            <button onclick="startGame()" class="flex-1 py-3.5 bg-[#0A84FF] active:bg-[#0070E0] rounded-2xl text-white text-[16px] font-semibold transition-colors">Continue</button>
                        </div>
                    </div>
                `;
        setLargeIsland(confirmContent, '320px', true);
    }, 500);
}

function startGame() {
    localStorage.setItem('gamePhase', 'level_1');
    window.location.reload();
}

function updateClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    els.clock.textContent = hours + ':' + minutes + ' ' + ampm;
    // Update widget clock
    const widgetClock = document.getElementById('widget-clock');
    if (widgetClock) widgetClock.textContent = hours + ':' + minutes + ' ' + ampm;
}

function setWifiState(connected) {
    isWifiConnected = connected;
    if (connected) {
        els.wifiIcon.classList.remove('hidden');
        els.noWifiIcon.classList.add('hidden');
    } else {
        els.wifiIcon.classList.add('hidden');
        els.noWifiIcon.classList.remove('hidden');
    }
}

function updateNavStyle() {
    const darkScreens = ['home', 'camera', 'dino', 'calculator', 'clock', 'phone', 'maps'];
    const isWhiteStatus = darkScreens.includes(activeScreen);

    if (isWhiteStatus) {
        els.statusBar.classList.remove('text-black');
        els.statusBar.classList.add('text-white');
        els.statusBar.classList.add('drop-shadow-sm');
        els.homeBtn.style.backgroundColor = '#fff';
    } else {
        els.statusBar.classList.remove('text-white');
        els.statusBar.classList.add('text-black');
        els.statusBar.classList.remove('drop-shadow-sm');
        els.homeBtn.style.backgroundColor = '#000';
    }

    // Always keep status bar on top so the time is visible in light-mode apps
    els.statusBar.classList.replace('z-[10]', 'z-[70]');
}

function enableChatInput() {
    els.chatInput.removeAttribute('readonly');
    els.chatInput.placeholder = "Type a message...";
}

function disableChatInput() {
    els.chatInput.setAttribute('readonly', 'true');
    els.chatInput.placeholder = "Waiting for facts...";
}

// --- Start ---
// Initialization moved to index.html to ensure all modules load first.

// ============================================
// LOCATION SERVICES, WEATHER & LIVE WIDGETS
// ============================================

