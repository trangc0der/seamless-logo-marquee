document.addEventListener('DOMContentLoaded', function() {
    const allTracks = document.querySelectorAll('.marquee-track');

    allTracks.forEach(track => {
        const logoSlide = track.querySelector('.logo-slide');
        if (!logoSlide || logoSlide.children.length === 0) return;

        // Lấy các tham số từ PHP (được truyền qua wp_localize_script)
        // Nếu không có, dùng giá trị mặc định
        const params = window.slm_params || { speed: 1, direction: 'rtl' };

        const cloneCount = Math.ceil(window.innerWidth / logoSlide.offsetWidth) + 2;
        for (let i = 0; i < cloneCount; i++) {
            track.appendChild(logoSlide.cloneNode(true));
        }

        let scrollPosition = 0;
        const speed = parseFloat(params.speed);
        let isPlaying = true;
        let animationFrameId = null;

        function scroll() {
            if (!isPlaying) return;

            // Áp dụng hướng chạy
            if (params.direction === 'ltr') { // Trái qua phải
                scrollPosition += speed;
            } else { // Phải qua trái (mặc định)
                scrollPosition -= speed;
            }
            
            const slideWidth = logoSlide.offsetWidth;

            // Reset vị trí tùy theo hướng
            if (params.direction === 'ltr' && scrollPosition >= 0) {
                 scrollPosition -= slideWidth;
            } else if (params.direction === 'rtl' && Math.abs(scrollPosition) >= slideWidth) {
                 scrollPosition += slideWidth;
            }

            track.style.transform = `translateX(${scrollPosition}px)`;
            animationFrameId = requestAnimationFrame(scroll);
        }

        track.addEventListener("mouseenter", () => { isPlaying = false; });
        track.addEventListener("mouseleave", () => { isPlaying = true; requestAnimationFrame(scroll); });
        
        requestAnimationFrame(scroll);
    });
});