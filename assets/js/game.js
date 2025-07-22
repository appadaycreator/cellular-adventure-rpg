// Cellular Adventure - Game Logic

class CellularGame {
    constructor() {
        this.grid = [];
        this.width = 30;
        this.height = 20;
        this.isRunning = false;
        this.generation = 0;
        this.speed = 5;
        this.intervalId = null;
        this.history = [];
        this.currentLanguage = 'ja';
        this.maxHistorySize = 50;
        
        this.init();
    }
    
    init() {
        console.log('🎮 ゲームを初期化中...');
        this.createGrid();
        this.setupEventListeners();
        this.loadFromStorage();
        this.updateUI();
        console.log('✅ ゲーム初期化完了');
    }
    
    createGrid() {
        const gridElement = document.getElementById('gameGrid');
        if (!gridElement) return;
        
        gridElement.innerHTML = '';
        gridElement.style.gridTemplateColumns = `repeat(${this.width}, 12px)`;
        gridElement.style.gridTemplateRows = `repeat(${this.height}, 12px)`;
        
        // Initialize grid array
        this.grid = Array(this.height).fill().map(() => Array(this.width).fill(false));
        
        // Create DOM elements
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', () => this.toggleCell(x, y));
                gridElement.appendChild(cell);
            }
        }
        console.log(`🔧 グリッド作成完了: ${this.width}x${this.height}`);
    }
    
    toggleCell(x, y) {
        this.grid[y][x] = !this.grid[y][x];
        this.updateCellDisplay(x, y);
        this.updateStats();
        console.log(`🔄 細胞状態変更: (${x}, ${y}) -> ${this.grid[y][x]}`);
    }
    
    updateCellDisplay(x, y) {
        const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            cell.className = this.grid[y][x] ? 'cell alive' : 'cell';
        }
    }
    
    updateAllCells() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.updateCellDisplay(x, y);
            }
        }
    }
    
    nextGeneration() {
        const newGrid = Array(this.height).fill().map(() => Array(this.width).fill(false));
        let changedCells = [];
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const neighbors = this.countNeighbors(x, y);
                const current = this.grid[y][x];
                
                if (current) {
                    // Living cell
                    newGrid[y][x] = neighbors === 2 || neighbors === 3;
                } else {
                    // Dead cell
                    newGrid[y][x] = neighbors === 3;
                }
                
                if (newGrid[y][x] !== current) {
                    changedCells.push({ x, y, born: !current });
                }
            }
        }
        
        this.grid = newGrid;
        this.generation++;
        
        // Animate changed cells
        changedCells.forEach(({ x, y, born }) => {
            const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            if (cell) {
                cell.className = `cell ${this.grid[y][x] ? 'alive' : ''} ${born ? 'born' : 'dying'}`;
                setTimeout(() => {
                    cell.className = this.grid[y][x] ? 'cell alive' : 'cell';
                }, 500);
            }
        });
        
        this.updateStats();
        this.saveToStorage();
        console.log(`⏭️ 世代 ${this.generation}: ${changedCells.length} 個の細胞が変化`);
    }
    
    countNeighbors(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                    if (this.grid[ny][nx]) count++;
                }
            }
        }
        return count;
    }
    
    updateStats() {
        let population = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x]) population++;
            }
        }
        
        const totalCells = this.width * this.height;
        const survivalRate = Math.round((population / totalCells) * 100);
        
        const generationEl = document.getElementById('generation');
        const populationEl = document.getElementById('population');
        const survivalRateEl = document.getElementById('survivalRate');
        
        if (generationEl) generationEl.textContent = this.generation;
        if (populationEl) populationEl.textContent = population;
        if (survivalRateEl) survivalRateEl.textContent = `${survivalRate}%`;
    }
    
    playPause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
            const btn = document.getElementById('playPauseBtn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-play"></i><span class="ml-2">再生</span>';
            }
            console.log('⏸️ ゲーム一時停止');
        } else {
            const delay = 1100 - this.speed * 100;
            this.intervalId = setInterval(() => this.nextGeneration(), delay);
            this.isRunning = true;
            const btn = document.getElementById('playPauseBtn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-pause"></i><span class="ml-2">一時停止</span>';
            }
            console.log(`▶️ ゲーム開始 (速度: ${this.speed}, 間隔: ${delay}ms)`);
        }
    }
    
    resetGame() {
        if (this.isRunning) {
            this.playPause();
        }
        
        this.grid = Array(this.height).fill().map(() => Array(this.width).fill(false));
        this.generation = 0;
        this.updateAllCells();
        this.updateStats();
        console.log('🔄 ゲームリセット完了');
    }
    
    randomize() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = Math.random() < 0.3;
            }
        }
        this.generation = 0;
        this.updateAllCells();
        this.updateStats();
        console.log('🎲 ランダムパターン生成完了');
    }
    
    placePattern(patternName) {
        const patterns = this.getPatterns();
        const pattern = patterns[patternName];
        if (!pattern) return;
        
        this.resetGame();
        
        const startX = Math.floor((this.width - pattern[0].length) / 2);
        const startY = Math.floor((this.height - pattern.length) / 2);
        
        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                const gridX = startX + x;
                const gridY = startY + y;
                
                if (gridX >= 0 && gridX < this.width && gridY >= 0 && gridY < this.height) {
                    this.grid[gridY][gridX] = pattern[y][x] === 1;
                }
            }
        }
        
        this.updateAllCells();
        this.updateStats();
        console.log(`🎯 パターン "${patternName}" を配置しました`);
    }
    
    getPatterns() {
        return {
            glider: [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1]
            ],
            oscillator: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ],
            still: [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [0, 1, 1, 0]
            ],
            gun: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ]
        };
    }
    
    saveToStorage() {
        const data = {
            grid: this.grid,
            generation: this.generation,
            language: this.currentLanguage,
            timestamp: Date.now()
        };
        
        // Save current state
        localStorage.setItem('cellularGame', JSON.stringify(data));
        
        // Save to history
        let history = JSON.parse(localStorage.getItem('cellularHistory') || '[]');
        history.push(data);
        if (history.length > this.maxHistorySize) {
            history = history.slice(-this.maxHistorySize);
        }
        localStorage.setItem('cellularHistory', JSON.stringify(history));
    }
    
    loadFromStorage() {
        const saved = localStorage.getItem('cellularGame');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.grid && data.grid.length === this.height && data.grid[0].length === this.width) {
                    this.grid = data.grid;
                    this.generation = data.generation || 0;
                    if (data.language) {
                        this.currentLanguage = data.language;
                        document.documentElement.lang = this.currentLanguage;
                    }
                    this.updateAllCells();
                    this.updateStats();
                    console.log('💾 保存されたゲーム状態を読み込みました');
                }
            } catch (error) {
                console.error('❌ 保存データの読み込みエラー:', error);
            }
        }
    }
    
    setupEventListeners() {
        // Game controls
        const playPauseBtn = document.getElementById('playPauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const randomBtn = document.getElementById('randomBtn');
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.playPause());
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetGame());
        }
        if (randomBtn) {
            randomBtn.addEventListener('click', () => this.randomize());
        }
        
        // Speed control
        const speedSlider = document.getElementById('speedSlider');
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
                this.updateUI();
                
                if (this.isRunning) {
                    clearInterval(this.intervalId);
                    const delay = 1100 - this.speed * 100;
                    this.intervalId = setInterval(() => this.nextGeneration(), delay);
                }
                console.log(`⚡ 速度を ${this.speed} に変更しました`);
            });
        }
        
        // Grid size control
        const gridSizeSelect = document.getElementById('gridSize');
        if (gridSizeSelect) {
            gridSizeSelect.addEventListener('change', (e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                this.width = width;
                this.height = height;
                this.createGrid();
                this.updateStats();
                console.log(`📏 グリッドサイズを ${width}x${height} に変更しました`);
            });
        }
        
        // Pattern buttons
        document.querySelectorAll('.pattern-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const pattern = btn.dataset.pattern;
                this.placePattern(pattern);
            });
        });
    }
    
    updateUI() {
        const speedValue = document.getElementById('speedValue');
        if (speedValue) {
            speedValue.textContent = this.speed;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CellularGame;
} else {
    window.CellularGame = CellularGame;
} 