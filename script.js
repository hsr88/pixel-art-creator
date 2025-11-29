const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const gridSizeSelect = document.getElementById('gridSize');
const pixelSizeSelect = document.getElementById('pixelSize');

let currentColor = '#667eea';
let currentTool = 'draw';
let isDrawing = false;
let gridSize = 32;
let pixelSize = 10;
let grid = [];
let startX, startY;
let tempGrid = [];
let isShapeMode = false;

// Predefiniowana paleta kolorów
const colorPalette = [
    '#000000', '#FFFFFF', '#808080', '#C0C0C0',
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#800000', '#008000',
    '#000080', '#808000', '#800080', '#008080',
    '#FFA500', '#FFC0CB', '#A52A2A', '#DEB887',
    '#667eea', '#764ba2', '#f093fb', '#4facfe'
];

function initCanvas() {
    gridSize = parseInt(gridSizeSelect.value);
    pixelSize = parseInt(pixelSizeSelect.value);
    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;
    
    // Initialize grid with white
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill('#FFFFFF'));
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x];
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            
            // Grid lines
            ctx.strokeStyle = '#f0f0f0';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
}

function getPixelCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);
    return { x, y };
}

function drawPixel(x, y, color) {
    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        grid[y][x] = color;
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
}

// Bresenham's line algorithm
function drawLine(x0, y0, x1, y1, color) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        drawPixel(x0, y0, color);

        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function drawRectangle(x0, y0, x1, y1, color) {
    const minX = Math.min(x0, x1);
    const maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1);
    const maxY = Math.max(y0, y1);

    // Draw outline only
    for (let x = minX; x <= maxX; x++) {
        drawPixel(x, minY, color); // Top edge
        drawPixel(x, maxY, color); // Bottom edge
    }
    for (let y = minY; y <= maxY; y++) {
        drawPixel(minX, y, color); // Left edge
        drawPixel(maxX, y, color); // Right edge
    }
}

function drawCircle(cx, cy, x1, y1, color) {
    const radius = Math.round(Math.sqrt(Math.pow(x1 - cx, 2) + Math.pow(y1 - cy, 2)));
    
    // Midpoint circle algorithm
    let x = radius;
    let y = 0;
    let err = 0;

    while (x >= y) {
        drawPixel(cx + x, cy + y, color);
        drawPixel(cx + y, cy + x, color);
        drawPixel(cx - y, cy + x, color);
        drawPixel(cx - x, cy + y, color);
        drawPixel(cx - x, cy - y, color);
        drawPixel(cx - y, cy - x, color);
        drawPixel(cx + y, cy - x, color);
        drawPixel(cx + x, cy - y, color);

        if (err <= 0) {
            y += 1;
            err += 2 * y + 1;
        }
        if (err > 0) {
            x -= 1;
            err -= 2 * x + 1;
        }
    }
}

function floodFill(startX, startY, targetColor, fillColor) {
    if (targetColor === fillColor) return;
    
    const stack = [[startX, startY]];
    
    while (stack.length > 0) {
        const [x, y] = stack.pop();
        
        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) continue;
        if (grid[y][x] !== targetColor) continue;
        
        grid[y][x] = fillColor;
        
        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    
    drawGrid();
}

function handleCanvasInteraction(e) {
    const { x, y } = getPixelCoords(e);
    
    if (currentTool === 'draw') {
        drawPixel(x, y, currentColor);
    } else if (currentTool === 'erase') {
        drawPixel(x, y, '#FFFFFF');
    } else if (currentTool === 'fill' && e.type === 'mousedown') {
        const targetColor = grid[y][x];
        floodFill(x, y, targetColor, currentColor);
    }
}

function saveTemporaryGrid() {
    tempGrid = grid.map(row => [...row]);
}

function restoreTemporaryGrid() {
    grid = tempGrid.map(row => [...row]);
    drawGrid();
}

canvas.addEventListener('mousedown', (e) => {
    const { x, y } = getPixelCoords(e);
    isDrawing = true;
    
    if (currentTool === 'line' || currentTool === 'rectangle' || currentTool === 'circle') {
        isShapeMode = true;
        startX = x;
        startY = y;
        saveTemporaryGrid();
    } else {
        handleCanvasInteraction(e);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    
    const { x, y } = getPixelCoords(e);
    
    if (isShapeMode) {
        restoreTemporaryGrid();
        
        if (currentTool === 'line') {
            drawLine(startX, startY, x, y, currentColor);
        } else if (currentTool === 'rectangle') {
            drawRectangle(startX, startY, x, y, currentColor);
        } else if (currentTool === 'circle') {
            drawCircle(startX, startY, x, y, currentColor);
        }
    } else if (currentTool !== 'fill') {
        handleCanvasInteraction(e);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    isShapeMode = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    isShapeMode = false;
});

// Right click as eraser
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const { x, y } = getPixelCoords(e);
    drawPixel(x, y, '#FFFFFF');
});

// Color picker
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    updateActiveColor();
});

// Tool buttons
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTool = btn.dataset.tool;
    });
});

// Grid size change
gridSizeSelect.addEventListener('change', initCanvas);
pixelSizeSelect.addEventListener('change', initCanvas);

// Create color palette
function createColorPalette() {
    const paletteDiv = document.getElementById('colorPalette');
    colorPalette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', () => {
            currentColor = color;
            colorPicker.value = color;
            updateActiveColor();
        });
        paletteDiv.appendChild(swatch);
    });
}

function updateActiveColor() {
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        if (swatch.style.backgroundColor === currentColor || 
            rgbToHex(swatch.style.backgroundColor) === currentColor) {
            swatch.classList.add('active');
        } else {
            swatch.classList.remove('active');
        }
    });
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;
    return '#' + result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function clearCanvas() {
    if (confirm('CLEAR ENTIRE CANVAS?')) {
        grid = Array(gridSize).fill().map(() => Array(gridSize).fill('#FFFFFF'));
        drawGrid();
    }
}

function downloadImage() {
    // Create a temporary canvas without grid lines
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = gridSize * pixelSize;
    tempCanvas.height = gridSize * pixelSize;
    const tempCtx = tempCanvas.getContext('2d');
    
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            tempCtx.fillStyle = grid[y][x];
            tempCtx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
    
    const link = document.createElement('a');
    link.download = `pixel-art-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL();
    link.click();
}

function saveToGallery() {
    const artwork = {
        grid: grid,
        gridSize: gridSize,
        timestamp: Date.now()
    };
    
    let gallery = JSON.parse(localStorage.getItem('pixelArtGallery') || '[]');
    gallery.push(artwork);
    localStorage.setItem('pixelArtGallery', JSON.stringify(gallery));
    
    alert('[OK] SAVED TO GALLERY!');
}

// Initialize
createColorPalette();
initCanvas();
updateActiveColor();
