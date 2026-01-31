// Custom cursor effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Check if on touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        // Show custom cursor only on non-touch devices
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Animate follower cursor
        function animateCursor() {
            followerX += (mouseX - followerX) / 8;
            followerY += (mouseY - followerY) / 8;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Hover effects
        document.querySelectorAll('.btn, .nav-link-elite, .project-card, .social-icon').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#ff2a6d';
                cursorFollower.style.transform = 'scale(1.2)';
                cursorFollower.style.borderColor = '#ff2a6d88';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#00f3ff';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = '#00f3ff88';
            });
        });
        
        // Click effect
        document.addEventListener('click', () => {
            cursor.style.transform = 'scale(0.8)';
            cursorFollower.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            }, 100);
        });
    } else {
        // Hide custom cursor on touch devices
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}