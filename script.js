
let player, musicPlayer;

// Ustawienia Wideo Muzyka
function onYouTubeIframeAPIReady() {
    
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'l87eeESMgog', // ID Wideo  https://www.youtube.com/watch?v=   po = Wklejamy 
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'mute': 1,
            'playlist': 'l87eeESMgog' // ID tego samego wideo, aby wideo mogło się zapętlać
        },
        events: {
            'onReady': onPlayerReady,
        }
    });

    // Background music player
    musicPlayer = new YT.Player('music-player', {
        height: '0',
        width: '0',
        videoId: 'l87eeESMgog', // // ID Audio  https://www.youtube.com/watch?v=   po = Wklejamy 
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'playlist': 'l87eeESMgog' // ID tego samego wideo, aby wideo mogło się zapętlać
        },
        events: {
            'onReady': onMusicPlayerReady,
        }
    });
}
// Funkcja Przyciski
function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
    document.getElementById('player').addEventListener('click', () => {
        if (player.isMuted()) {
            player.unMute();
        } else {
            player.mute();
        }
    });
}

function onMusicPlayerReady(event) {
    event.target.setVolume(50); 
    event.target.playVideo();
    document.getElementById('play-pause-btn').addEventListener('click', () => {
        if (musicPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            musicPlayer.pauseVideo();
            document.getElementById('play-pause-btn').textContent = 'Play';
        } else {
            musicPlayer.playVideo();
            document.getElementById('play-pause-btn').textContent = 'Pause';
        }
    });

    document.getElementById('volume-slider').addEventListener('input', (e) => {
        const volume = e.target.value;
        musicPlayer.setVolume(volume * 100);
        document.getElementById('volume-label').textContent = `${Math.round(volume * 100)}%`;
    });

    
    document.getElementById('volume-slider').dispatchEvent(new Event('input'));
}

// Animacja logo
function animateLogo() {
    const logo = document.getElementById('logo');
    let scale = 1;
    let growing = true;

    function animate() {
        if (growing) {
            scale += 0.01;
            if (scale >= 2.5) growing = false;
        } else {
            scale -= 0.01;
            if (scale <= 2) growing = true;
        }

        logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    animateLogo();
});

document.addEventListener('DOMContentLoaded', () => {
    animateLogo();

    const customCursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        customCursor.style.top = `${e.clientY}px`;
        customCursor.style.left = `${e.clientX}px`;
    });
});

