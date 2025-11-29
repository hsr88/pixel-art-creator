# 🎨 Pixel Art Creator

A modern, feature-rich pixel art editor built with vanilla JavaScript, HTML, and CSS. Create retro-style pixel art directly in your browser with an intuitive interface and powerful drawing tools.

![Pixel Art Creator](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🖌️ Drawing Tools
- **Draw** - Freehand pixel drawing
- **Erase** - Remove pixels (also via right-click)
- **Fill** - Bucket fill with flood algorithm
- **Line** - Draw straight lines (Bresenham's algorithm)
- **Rectangle** - Draw rectangle outlines
- **Circle** - Draw circle outlines (Midpoint algorithm)

### 🎨 Color Options
- Color picker for unlimited colors
- 24 preset color palette
- Quick color selection
- Visual active color indicator

### ⚙️ Customization
- **Grid Sizes**: 16x16, 32x32, 48x48
- **Pixel Sizes**: 6px, 8px, 10px, 12px
- Responsive canvas that adapts to settings

### 💾 Export & Save
- **Download PNG** - Export your art as PNG image
- **Gallery** - Save to browser localStorage
- High-quality export without grid lines

## 🚀 Demo

[Live Demo](https://hsr88.github.io/pixel-art-creator) *(Update this link after deploying)*

## 📸 Screenshots

*Add screenshots of your application here*

## 🛠️ Installation

### Option 1: Clone the Repository
```bash
git clone https://github.com/hsr88/pixel-art-creator.git
cd pixel-art-creator
```

### Option 2: Download ZIP
Download the ZIP file from the [releases page](https://github.com/hsr88/pixel-art-creator/releases) and extract it.

## 🎮 Usage

1. Open `index.html` in your web browser
2. Select a tool from the toolbar
3. Choose your colors from the palette or color picker
4. Click and drag on the canvas to draw
5. Use the settings to adjust grid and pixel size
6. Export your artwork when finished!

### Keyboard Shortcuts
- **Right Click** - Quick erase
- **Mouse Drag** - Continuous drawing

## 📁 Project Structure

```
pixel-art-creator/
│
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # Application logic
└── README.md           # This file
```

## 🎨 Color Palette

The app includes a carefully curated palette of 24 colors:
- Grayscale (Black, White, Grays)
- Primary colors (Red, Green, Blue, Yellow, etc.)
- Extended palette (Orange, Pink, Brown, etc.)
- Special colors (Purple gradients, Cyan tones)

## 🔧 Customization

### Adding New Colors
Edit the `colorPalette` array in `script.js`:
```javascript
const colorPalette = [
    '#000000', '#FFFFFF', // Add your colors here
    // ...
];
```

### Changing Grid Sizes
Modify the options in `index.html`:
```html
<select id="gridSize">
    <option value="16">16 x 16</option>
    <option value="64">64 x 64</option> <!-- Add new size -->
</select>
```

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (limited support)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add undo/redo functionality
- Implement layers system
- Add more drawing tools (spray, gradient)
- Create animation frames support
- Add export to different formats (SVG, GIF)
- Implement custom brush sizes
- Add keyboard shortcuts panel

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**hsr88**
- GitHub: [@hsr88](https://github.com/hsr88)

## 🙏 Acknowledgments

- Pixel art font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- Inspired by classic pixel art editors
- Built with ❤️ for the pixel art community

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/hsr88/pixel-art-creator?style=social)
![GitHub forks](https://img.shields.io/github/forks/hsr88/pixel-art-creator?style=social)

## 🔮 Future Features

- [ ] Undo/Redo system
- [ ] Layers support
- [ ] Animation frames
- [ ] Import existing images
- [ ] Custom canvas backgrounds
- [ ] Grid toggle
- [ ] Symmetry drawing mode
- [ ] Color mixer
- [ ] Eyedropper tool
- [ ] Touch device support

## 💡 Tips & Tricks

1. **Fast Drawing**: Click and drag to draw continuously
2. **Quick Erase**: Use right-click instead of switching to eraser
3. **Perfect Shapes**: Use Line, Rectangle, and Circle tools for clean geometry
4. **Color Workflow**: Use the preset palette for quick access to common colors
5. **Export Quality**: Exported PNGs are clean without grid lines

## 🐛 Known Issues

- None at the moment! Report issues on GitHub.

## 📱 Mobile Support

While the app works on mobile devices, it's optimized for desktop use with a mouse for the best experience.

---

**Made with pixel-perfect precision** 🎮✨

*Star ⭐ this repository if you find it useful!*
