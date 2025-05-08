document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen when AR scene is ready
    const loadingScreen = document.getElementById('loadingScreen');
    // Get the audio element
    const bgMusic = document.getElementById('bgMusic');
    
    // Listen for AR.js camera initialization
    const scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', function() {
        console.log('AR Scene loaded');
    });
    
    scene.addEventListener('camera-init', function() {
        console.log('Camera initialized');
    });
    
    // Hide loading screen when marker is found
    const marker = document.querySelector('a-marker');
    marker.addEventListener('markerFound', function() {
        console.log('Marker found');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
        
        // Play the music when marker is found
        bgMusic.play().catch(e => {
            console.log("Audio play failed:", e);
            // Show a play button for mobile browsers that require user interaction
            showPlayButton();
        });
    });
    
    marker.addEventListener('markerLost', function() {
        console.log('Marker lost');
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        
        // Stop the music when marker is lost
        bgMusic.pause();
        bgMusic.currentTime = 0; // Reset to beginning
    });
    
    // Function to show play button for mobile browsers
    function showPlayButton() {
        if (document.getElementById('playButton')) return;
        
        const playBtn = document.createElement('button');
        playBtn.id = 'playButton';
        playBtn.innerHTML = 'Play Audio';
        playBtn.style.position = 'fixed';
        playBtn.style.bottom = '20px';
        playBtn.style.left = '50%';
        playBtn.style.transform = 'translateX(-50%)';
        playBtn.style.zIndex = '1000';
        playBtn.style.padding = '10px 20px';
        playBtn.style.backgroundColor = '#4CAF50';
        playBtn.style.color = 'white';
        playBtn.style.border = 'none';
        playBtn.style.borderRadius = '5px';
        playBtn.style.cursor = 'pointer';
        
        playBtn.addEventListener('click', function() {
            bgMusic.play();
            this.remove();
        });
        
        document.body.appendChild(playBtn);
    }
    
    // Apply rounded corners to image in AR scene
    AFRAME.registerComponent('rounded', {
        init: function() {
            let el = this.el;
            let material = el.getObject3D('mesh').material;
            
            // Create canvas for rounded corners
            let canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            let ctx = canvas.getContext('2d');
            
            // Load the original image
            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function() {
                // Draw rounded rectangle
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                
                // Draw rounded rectangle
                let radius = 40; // border radius size
                ctx.beginPath();
                ctx.moveTo(radius, 0);
                ctx.lineTo(canvas.width - radius, 0);
                ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
                ctx.lineTo(canvas.width, canvas.height - radius);
                ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
                ctx.lineTo(radius, canvas.height);
                ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                ctx.closePath();
                ctx.clip();
                
                // Draw the image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.restore();
                
                // Update material
                let texture = new THREE.Texture(canvas);
                texture.needsUpdate = true;
                material.map = texture;
                material.needsUpdate = true;
            };
            img.src = el.getAttribute('src');
        }
    });
    
    // Fix for PNG transparency
    const imageElement = document.querySelector('a-image');
    if (imageElement) {
        imageElement.addEventListener('loaded', function() {
            console.log('Image loaded successfully');
            // Force material update for proper transparency
            const mesh = this.getObject3D('mesh');
            if (mesh) {
                mesh.material.transparent = true;
                mesh.material.alphaTest = 0.5;
                mesh.material.needsUpdate = true;
            }
        });
        
        // Add error handling for image loading
        imageElement.addEventListener('error', function(e) {
            console.error('Error loading image:', e);
            alert('Gagal memuat gambar! Periksa nama file dan path.');
        });
    }

    // Solusi untuk PNG dengan transparansi
    AFRAME.registerComponent('transparent-texture', {
        init: function () {
            this.el.addEventListener('loaded', e => {
                let mesh = this.el.getObject3D('mesh');
                if (mesh) {
                    mesh.material.transparent = true;
                    mesh.material.alphaTest = 0.1;
                    mesh.material.side = THREE.DoubleSide;
                    mesh.material.needsUpdate = true;
                    console.log("Material updated for transparency");
                }
            });
        }
    });

    // Terapkan komponen ke gambar
    const overlayImage = document.getElementById('overlayImage');
    if (overlayImage) {
        overlayImage.setAttribute('transparent-texture', '');
    }

    // Debug pengecekan loading gambar
    console.log("Mencoba memuat gambar: " + overlayImage.getAttribute('src'));
});
