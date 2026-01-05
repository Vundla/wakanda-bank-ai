<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wakanda Bank - Vundla Eye Preview</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        /* Gold Leopard Print Background */
        .leopard-theme {
            background-color: #1a1a1a;
            background-image: 
                radial-gradient(circle at 20% 50%, rgba(218, 165, 32, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 60% 15%, rgba(218, 165, 32, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 70% 75%, rgba(218, 165, 32, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 30% 90%, rgba(218, 165, 32, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 90% 40%, rgba(218, 165, 32, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 10% 20%, rgba(218, 165, 32, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 50% 60%, rgba(218, 165, 32, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 85% 80%, rgba(218, 165, 32, 0.3) 0%, transparent 50%);
            background-size: 
                300px 300px,
                250px 250px,
                280px 280px,
                320px 320px,
                270px 270px,
                290px 290px,
                310px 310px,
                260px 260px;
            animation: leopardMove 60s infinite linear;
        }

        @keyframes leopardMove {
            0% { background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%, 50% 50%, 25% 75%, 75% 25%, 10% 90%; }
            100% { background-position: 100% 100%, 0% 100%, 100% 0%, 0% 0%, 25% 75%, 75% 25%, 25% 75%, 90% 10%; }
        }

        /* Standard Theme */
        .standard-theme {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Glass morphism effect */
        .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Gold accents for leopard theme */
        .leopard-theme .gold-accent {
            color: #DAA520;
            border-color: #DAA520;
        }

        .leopard-theme .gold-bg {
            background-color: rgba(218, 165, 32, 0.2);
            border-color: #DAA520;
        }

        /* Card hover effects */
        .card-hover {
            transition: all 0.3s ease;
        }

        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        /* Smooth transitions */
        * {
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(218, 165, 32, 0.5);
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: rgba(218, 165, 32, 0.8);
        }

        /* Pulse animation for health indicator */
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        /* Gold shimmer effect */
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }

        .gold-shimmer {
            background: linear-gradient(to right, #DAA520 0%, #FFD700 50%, #DAA520 100%);
            background-size: 2000px 100%;
            animation: shimmer 3s infinite;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="standard-theme min-h-screen transition-all duration-500" id="app">
    <div class="min-h-screen p-4 md:p-8">
        <!-- Header -->
        <header class="glass rounded-2xl p-6 mb-8 shadow-2xl">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-center md:text-left">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
                        🏦 <span class="gold-shimmer">Wakanda Bank</span>
                    </h1>
                    <p class="text-white/80 text-sm italic">
                        "Resilience and fault tolerance is the way of a wild hare"
                    </p>
                    <p class="text-white/60 text-xs mt-1">
                        Authorized by: Rev. Corrine McClinton
                    </p>
                </div>
                <div class="flex flex-col items-center gap-3">
                    <!-- Theme Toggle Button -->
                    <button 
                        onclick="toggleTheme()" 
                        class="glass px-6 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-all shadow-lg"
                    >
                        <span id="theme-icon">🐆</span> <span id="theme-text">Leopard Theme</span>
                    </button>
                    <!-- Health Status -->
                    <div class="flex items-center gap-2 glass px-4 py-2 rounded-lg">
                        <span class="pulse text-green-400 text-xl">●</span>
                        <span class="text-white font-semibold">System Healthy</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Database Info Bar -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="glass rounded-xl p-4 shadow-lg card-hover">
                <div class="text-white/60 text-sm uppercase mb-1">Database</div>
                <div class="text-white text-2xl font-bold gold-accent">world_DB</div>
            </div>
            <div class="glass rounded-xl p-4 shadow-lg card-hover">
                <div class="text-white/60 text-sm uppercase mb-1">Schema</div>
                <div class="text-white text-2xl font-bold gold-accent">public</div>
            </div>
            <div class="glass rounded-xl p-4 shadow-lg card-hover">
                <div class="text-white/60 text-sm uppercase mb-1">Authorized by</div>
                <div class="text-white text-xl font-bold">Rev. Corrine McClinton</div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-6">
            <button 
                onclick="showTab('users')" 
                id="users-tab"
                class="glass px-6 py-3 rounded-t-xl text-white font-semibold tab-active shadow-lg"
            >
                👥 Users
            </button>
            <button 
                onclick="showTab('transactions')" 
                id="transactions-tab"
                class="glass px-6 py-3 rounded-t-xl text-white/70 font-semibold hover:text-white shadow-lg"
            >
                💳 Transactions
            </button>
            <button 
                onclick="showTab('analytics')" 
                id="analytics-tab"
                class="glass px-6 py-3 rounded-t-xl text-white/70 font-semibold hover:text-white shadow-lg"
            >
                📊 Analytics
            </button>
        </div>

        <!-- Content Area -->
        <div class="glass rounded-2xl p-8 shadow-2xl min-h-[600px]">
            <!-- Users Tab -->
            <div id="users-content" class="tab-content">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-white">User Management</h2>
                    <button class="gold-bg px-6 py-2 rounded-lg text-white font-semibold hover:scale-105 transition-all shadow-lg">
                        ➕ Add User
                    </button>
                </div>

                <!-- Users Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- User Card 1 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover border-2 border-transparent hover:border-white/30">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-1">T'Challa</h3>
                                <p class="text-white/70 text-sm">tchalla@wakanda.gov</p>
                            </div>
                            <button class="text-white/70 hover:text-red-400 text-xl">🗑️</button>
                        </div>
                        <div class="mb-4">
                            <div class="text-white/60 text-sm mb-1">Balance</div>
                            <div class="text-3xl font-bold gold-accent">$10,000,000</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="gold-bg px-3 py-1 rounded-full text-white text-sm">Royal</span>
                            <span class="text-white/60 text-xs">Jan 1, 2024</span>
                        </div>
                    </div>

                    <!-- User Card 2 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover border-2 border-transparent hover:border-white/30">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-1">Shuri</h3>
                                <p class="text-white/70 text-sm">shuri@wakanda.tech</p>
                            </div>
                            <button class="text-white/70 hover:text-red-400 text-xl">🗑️</button>
                        </div>
                        <div class="mb-4">
                            <div class="text-white/60 text-sm mb-1">Balance</div>
                            <div class="text-3xl font-bold gold-accent">$5,000,000</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="gold-bg px-3 py-1 rounded-full text-white text-sm">Technology</span>
                            <span class="text-white/60 text-xs">Jan 15, 2024</span>
                        </div>
                    </div>

                    <!-- User Card 3 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover border-2 border-transparent hover:border-white/30">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-1">Okoye</h3>
                                <p class="text-white/70 text-sm">okoye@wakanda.mil</p>
                            </div>
                            <button class="text-white/70 hover:text-red-400 text-xl">🗑️</button>
                        </div>
                        <div class="mb-4">
                            <div class="text-white/60 text-sm mb-1">Balance</div>
                            <div class="text-3xl font-bold gold-accent">$2,500,000</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="gold-bg px-3 py-1 rounded-full text-white text-sm">Defense</span>
                            <span class="text-white/60 text-xs">Feb 1, 2024</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Transactions Tab -->
            <div id="transactions-content" class="tab-content hidden">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-white">Recent Transactions</h2>
                    <button class="gold-bg px-6 py-2 rounded-lg text-white font-semibold hover:scale-105 transition-all shadow-lg">
                        🔄 Refresh
                    </button>
                </div>

                <!-- Transactions List -->
                <div class="space-y-4">
                    <!-- Transaction 1 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="text-4xl">💰</div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Deposit</h3>
                                <p class="text-white/70 text-sm">Vibranium export revenue</p>
                                <p class="text-white/50 text-xs mt-1">Jan 5, 2024 • T'Challa</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-green-400">+$1,000,000</div>
                            <span class="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                ✅ Completed
                            </span>
                        </div>
                    </div>

                    <!-- Transaction 2 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="text-4xl">💸</div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Withdrawal</h3>
                                <p class="text-white/70 text-sm">Research equipment purchase</p>
                                <p class="text-white/50 text-xs mt-1">Jan 20, 2024 • Shuri</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-red-400">-$500,000</div>
                            <span class="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                ✅ Completed
                            </span>
                        </div>
                    </div>

                    <!-- Transaction 3 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="text-4xl">🔄</div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Transfer</h3>
                                <p class="text-white/70 text-sm">Transfer to Shuri</p>
                                <p class="text-white/50 text-xs mt-1">Feb 10, 2024 • T'Challa</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-blue-400">$250,000</div>
                            <span class="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                ✅ Completed
                            </span>
                        </div>
                    </div>

                    <!-- Transaction 4 -->
                    <div class="glass rounded-xl p-6 shadow-lg card-hover flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="text-4xl">💰</div>
                            <div>
                                <h3 class="text-xl font-bold text-white">Deposit</h3>
                                <p class="text-white/70 text-sm">Military budget allocation</p>
                                <p class="text-white/50 text-xs mt-1">Feb 15, 2024 • Okoye</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-green-400">+$500,000</div>
                            <span class="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                ✅ Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analytics Tab -->
            <div id="analytics-content" class="tab-content hidden">
                <h2 class="text-3xl font-bold text-white mb-6">Banking Analytics</h2>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="glass rounded-xl p-6 shadow-lg card-hover text-center">
                        <div class="text-4xl mb-2">👥</div>
                        <div class="text-white/60 text-sm mb-1">Total Users</div>
                        <div class="text-3xl font-bold text-white">3</div>
                    </div>
                    <div class="glass rounded-xl p-6 shadow-lg card-hover text-center">
                        <div class="text-4xl mb-2">💰</div>
                        <div class="text-white/60 text-sm mb-1">Total Balance</div>
                        <div class="text-3xl font-bold gold-accent">$17.5M</div>
                    </div>
                    <div class="glass rounded-xl p-6 shadow-lg card-hover text-center">
                        <div class="text-4xl mb-2">💳</div>
                        <div class="text-white/60 text-sm mb-1">Transactions</div>
                        <div class="text-3xl font-bold text-white">4</div>
                    </div>
                    <div class="glass rounded-xl p-6 shadow-lg card-hover text-center">
                        <div class="text-4xl mb-2">✅</div>
                        <div class="text-white/60 text-sm mb-1">Success Rate</div>
                        <div class="text-3xl font-bold text-green-400">100%</div>
                    </div>
                </div>

                <!-- Account Types Distribution -->
                <div class="glass rounded-xl p-6 shadow-lg mb-8">
                    <h3 class="text-2xl font-bold text-white mb-4">Account Types Distribution</h3>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-white">Royal</span>
                                <span class="text-white/70">33.3%</span>
                            </div>
                            <div class="w-full bg-white/10 rounded-full h-3">
                                <div class="gold-bg h-3 rounded-full" style="width: 33.3%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-white">Technology</span>
                                <span class="text-white/70">33.3%</span>
                            </div>
                            <div class="w-full bg-white/10 rounded-full h-3">
                                <div class="bg-blue-500/60 h-3 rounded-full" style="width: 33.3%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-white">Defense</span>
                                <span class="text-white/70">33.3%</span>
                            </div>
                            <div class="w-full bg-white/10 rounded-full h-3">
                                <div class="bg-red-500/60 h-3 rounded-full" style="width: 33.3%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- System Health -->
                <div class="glass rounded-xl p-6 shadow-lg">
                    <h3 class="text-2xl font-bold text-white mb-4">System Health</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
                            <div>
                                <div class="text-white/60 text-sm">Circuit Breaker</div>
                                <div class="text-xl font-bold text-green-400">CLOSED</div>
                            </div>
                            <div class="text-3xl">🟢</div>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
                            <div>
                                <div class="text-white/60 text-sm">API Status</div>
                                <div class="text-xl font-bold text-green-400">HEALTHY</div>
                            </div>
                            <div class="text-3xl">✅</div>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg">
                            <div>
                                <div class="text-white/60 text-sm">Response Time</div>
                                <div class="text-xl font-bold text-blue-400">&lt;100ms</div>
                            </div>
                            <div class="text-3xl">⚡</div>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg">
                            <div>
                                <div class="text-white/60 text-sm">Uptime</div>
                                <div class="text-xl font-bold text-purple-400">99.9%</div>
                            </div>
                            <div class="text-3xl">📈</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="glass rounded-2xl p-6 mt-8 text-center shadow-2xl">
            <p class="text-white/80 text-sm italic mb-2">
                "Defeated man don't see that they are already defeated. Resilience is the way."
            </p>
            <p class="text-white/60 text-xs">
                Official Stamp: Rev. Corrine McClinton • Database: world_DB • Schema: public
            </p>
        </footer>
    </div>

    <script>
        // Theme Toggle Function
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');
            
            if (body.classList.contains('standard-theme')) {
                body.classList.remove('standard-theme');
                body.classList.add('leopard-theme');
                themeIcon.textContent = '🎨';
                themeText.textContent = 'Standard Theme';
            } else {
                body.classList.remove('leopard-theme');
                body.classList.add('standard-theme');
                themeIcon.textContent = '🐆';
                themeText.textContent = 'Leopard Theme';
            }
        }

        // Tab Navigation Function
        function showTab(tabName) {
            // Hide all tab contents
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.add('hidden'));
            
            // Remove active class from all tabs
            const tabs = ['users-tab', 'transactions-tab', 'analytics-tab'];
            tabs.forEach(tab => {
                const element = document.getElementById(tab);
                element.classList.remove('tab-active', 'text-white');
                element.classList.add('text-white/70');
            });
            
            // Show selected tab content
            document.getElementById(tabName + '-content').classList.remove('hidden');
            
            // Add active class to selected tab
            const activeTab = document.getElementById(tabName + '-tab');
            activeTab.classList.add('tab-active', 'text-white');
            activeTab.classList.remove('text-white/70');
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🏦 Wakanda Bank - Vundla Eye Preview Loaded');
            console.log('Philosophy: Resilience and fault tolerance is the way of a wild hare');
            console.log('Database: world_DB (Schema: public, Password: Mv@8)');
            console.log('Authorized by: Rev. Corrine McClinton');
            
            // Optional: Add interactive features
            addInteractivity();
        });

        // Add Interactive Features
        function addInteractivity() {
            // Simulate real-time updates
            setInterval(() => {
                const healthIndicator = document.querySelector('.pulse');
                if (healthIndicator) {
                    healthIndicator.style.color = Math.random() > 0.95 ? '#fbbf24' : '#4ade80';
                }
            }, 5000);

            // Add click effects to cards
            const cards = document.querySelectorAll('.card-hover');
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 100);
                });
            });
        }

        // Mock API simulation (optional enhancement)
        const mockAPI = {
            users: [
                { id: 1, name: "T'Challa", email: "tchalla@wakanda.gov", balance: 10000000, accountType: "Royal" },
                { id: 2, name: "Shuri", email: "shuri@wakanda.tech", balance: 5000000, accountType: "Technology" },
                { id: 3, name: "Okoye", email: "okoye@wakanda.mil", balance: 2500000, accountType: "Defense" }
            ],
            transactions: [
                { id: 1, type: "deposit", amount: 1000000, description: "Vibranium export revenue", user: "T'Challa" },
                { id: 2, type: "withdrawal", amount: 500000, description: "Research equipment purchase", user: "Shuri" },
                { id: 3, type: "transfer", amount: 250000, description: "Transfer to Shuri", user: "T'Challa" },
                { id: 4, type: "deposit", amount: 500000, description: "Military budget allocation", user: "Okoye" }
            ],
            health: {
                status: "healthy",
                circuitBreaker: "CLOSED",
                responseTime: "<100ms",
                uptime: "99.9%"
            }
        };

        // Export for console debugging
        window.wakandaBank = {
            mockAPI,
            toggleTheme,
            showTab
        };
    </script>
</body>
</html>
