const deliverBtn = document.querySelector('.deliver-btn');
if (deliverBtn) {
    deliverBtn.addEventListener('click', () => {
        if (deliverBtn.classList.contains('delivering')) return;

        deliverBtn.classList.add('delivering');
        const originalText = deliverBtn.innerText;
        deliverBtn.innerText = '🛷 Delivering...';

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        setTimeout(() => {
            deliverBtn.innerText = '🎁 Delivered!';
            
            setTimeout(() => {
                deliverBtn.classList.remove('delivering');
                deliverBtn.innerText = originalText;
            }, 2000);
        }, duration);

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
const musicTime = parseFloat(localStorage.getItem('musicTime')) || 0;

if (bgMusic) {
    bgMusic.currentTime = musicTime;
    if (isMusicPlaying) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                musicBtn.textContent = '🔊';
            }).catch(error => {
                console.log("Autoplay prevented");
                musicBtn.textContent = '🔇';
            });
        }
    }
}

window.addEventListener('beforeunload', () => {
    if (bgMusic) {
        localStorage.setItem('musicTime', bgMusic.currentTime);
        localStorage.setItem('musicPlaying', !bgMusic.paused);
    }
});

musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
    }
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields to send a letter to Santa! 🎅");
            return;
        }

        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending... 📨";
        submitBtn.disabled = true;

        const envelope = document.getElementById('envelope');

        const hoHoHoSound = new Audio('Music/Free Santa Sound Effect  Ho Ho Ho Merry Christmas.mp3');
        hoHoHoSound.play().catch(e => console.log("Audio play failed", e));
        
        envelope.style.transform = "translate(-50%, -50%) scale(1)";
        setTimeout(() => envelope.classList.add('flying'), 50);

        setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });

            const successContainer = document.getElementById('success-container');
            const successText = document.getElementById('success-text');
            const tipText = document.getElementById('santa-tip-text');
            
            if (successContainer) {
                successContainer.style.display = 'block';
                successText.innerHTML = `Wonderful, <strong>${name}</strong>! Santa has received your letter with great joy! 🎄`;
                
                const tips = [
                    "Remember to leave some cookies and milk on Christmas Eve! 🍪🥛",
                    "Be kind to your friends and family every day! ❤️",
                    "Don't forget a carrot for Rudolph and the reindeer! 🥕",
                    "Go to bed early on Christmas Eve so magic can happen! 😴"
                ];
                tipText.innerText = tips[Math.floor(Math.random() * tips.length)];
            }

            envelope.classList.remove('flying');
            envelope.style.transform = "translate(-50%, -50%) scale(0)";
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinksArr = document.querySelectorAll(".nav-links a");

navLinksArr.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    
    loader.addEventListener("transitionend", () => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    });
});

const checkBtn = document.getElementById('checkBtn');
const nameInput = document.getElementById('nameInput');
const resultDisplay = document.getElementById('result');
const santaAdvice = document.getElementById('santaAdvice');
const adviceText = document.getElementById('adviceText');

if (checkBtn && nameInput && resultDisplay && santaAdvice) {
    checkBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        
        if (!name) {
            resultDisplay.innerHTML = "Please enter your name first! 🎅";
            resultDisplay.className = "result-display show naughty";
            santaAdvice.style.display = 'none';
            return;
        }

        checkBtn.disabled = true;
        resultDisplay.className = "result-display show";
        resultDisplay.innerHTML = `
            <div class="checking-status">Santa is checking your name...</div>
            <div class="progress-wrapper" style="width: 100%; background: #eee; border-radius: 10px; margin-top: 10px; overflow: hidden;">
                <div id="checkProgressBar" style="width: 0%; height: 10px; background: #d42426; transition: width 2s ease-in-out;"></div>
            </div>`;
        setTimeout(() => { document.getElementById('checkProgressBar').style.width = '100%'; }, 50);
        santaAdvice.style.display = 'none';

        setTimeout(() => {
            checkBtn.disabled = false;
            
            const isNice = Math.random() > 0.3;
            
            const niceMessages = [
                `${name}, you are shining bright on the list! ✨`,
                `Wow, ${name}! You've been incredibly kind this year! 🌟`,
                `${name}, your kindness warms Santa's heart! ❤️`
            ];
            
            const naughtyMessages = [
                `Oh dear, ${name}... there's still time to improve! 🍪`,
                `${name}, Santa knows you can do better next year! 🎄`,
                `Hmm, ${name}... try sharing more toys! 🎁`
            ];

            const niceAdvice = [
                "Keep spreading joy and helping others!",
                "Don't forget to leave cookies for Santa!",
                "Your smile lights up the room, keep it up!"
            ];

            const naughtyAdvice = [
                "Try helping with chores around the house.",
                "Sharing is caring! Share your toys with friends.",
                "Say 'please' and 'thank you' more often."
            ];

            const gifts = ["Teddy Bear 🧸", "Magic Train 🚂", "Storybook 📚", "Bicycle 🚲"];
            const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

            if (isNice) {
                const msg = niceMessages[Math.floor(Math.random() * niceMessages.length)];
                const advice = niceAdvice[Math.floor(Math.random() * niceAdvice.length)];
                
                resultDisplay.innerHTML = `<span class="result-icon">🌟</span>Ho Ho Ho! Nice List!<br><span style="font-size: 1.2rem">${msg}</span>`;
                resultDisplay.className = "result-display show nice";
                
                adviceText.innerHTML = `${advice}<br><div class="gift-recommendation">Santa recommends: ${randomGift}</div>`;
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            } else {
                const msg = naughtyMessages[Math.floor(Math.random() * naughtyMessages.length)];
                const advice = naughtyAdvice[Math.floor(Math.random() * naughtyAdvice.length)];
                
                resultDisplay.innerHTML = `<span class="result-icon">🔥</span>Oh no! Naughty List!<br><span style="font-size: 1.2rem">${msg}</span>`;
                resultDisplay.className = "result-display show naughty";
                
                adviceText.innerHTML = `${advice}<br><div class="gift-recommendation">Improve your behavior for a surprise!</div>`;
            }
            
            santaAdvice.style.display = 'block';
        }, 2000);
    });
}

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const galleryImages = document.querySelectorAll(".gallery-item");
const closeBtn = document.getElementsByClassName("close")[0];

if (modal && modalImg && galleryImages.length > 0) {
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

window.submitQuiz = function(type) {
    const resultDiv = document.getElementById('quiz-result');
    let elfName = "";
    
    if (type === 'making') elfName = "Jingle (Toy Maker)";
    else if (type === 'wrapping') elfName = "Jolly (Gift Wrapper)";
    else if (type === 'checking') elfName = "Merry (Quality Checker)";
    
    resultDiv.innerText = `You are most like: ${elfName}! 🎄`;
    resultDiv.style.animation = "none";
    resultDiv.offsetHeight;
    resultDiv.style.animation = "fadeIn 0.5s ease";
}

const guestForm = document.getElementById('guestbook-form');
const guestEntries = document.getElementById('guestbook-entries');

if (guestForm) {
    guestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('guest-name').value;
        const msg = document.getElementById('guest-message').value;
        
        const entry = document.createElement('div');
        entry.className = 'guest-entry';
        entry.innerHTML = `<strong>${name}:</strong> ${msg}`;
        
        guestEntries.prepend(entry);
        guestForm.reset();
        alert("Your wish has been sent to the North Pole! 📨");
    });
}

const filterBtn = document.getElementById('filterBtn');
if (filterBtn) {
    filterBtn.addEventListener('click', () => {
        const category = document.getElementById('categorySelect').value;
        const age = document.getElementById('ageSelect').value;
        const toys = document.querySelectorAll('.toys-section li');

        toys.forEach(toy => {
            const toyCat = toy.dataset.category;
            const toyAge = toy.dataset.age;
            
            let catMatch = category === 'all' || toyCat === category;
            let ageMatch = age === 'all' || toyAge === age;
            
            if (toyAge === 'all') ageMatch = true;

            if (catMatch && ageMatch) {
                toy.style.display = 'flex';
            } else {
                toy.style.display = 'none';
            }
        });
    });
}

document.querySelectorAll('.star-rating').forEach(stars => {
    stars.addEventListener('click', (e) => {
        e.target.style.transform = "scale(1.4) rotate(10deg)";
        setTimeout(() => e.target.style.transform = "scale(1) rotate(0deg)", 300);
    });
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        
        const span = question.querySelector('span');
        if (item.classList.contains('active')) {
            span.textContent = '-';
        } else {
            span.textContent = '+';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, offset: 100, once: true });
    }
});

window.addToWishlist = function(itemName) {
    const saved = JSON.parse(localStorage.getItem('santaWishlist')) || [];
    if (!saved.includes(itemName)) {
        saved.push(itemName);
        localStorage.setItem('santaWishlist', JSON.stringify(saved));
        alert(`${itemName} added to your wishlist! 🎁`);
        loadWishlist();
    } else {
        alert("This item is already in your list!");
    }
};

window.loadWishlist = function() {
    const wishlistItems = document.getElementById('wishlistItems');
    const saved = JSON.parse(localStorage.getItem('santaWishlist')) || [];
    if (wishlistItems) {
        wishlistItems.innerHTML = '';
        if (saved.length === 0) {
            wishlistItems.innerHTML = '<li style="text-align:center; padding: 10px;">Your list is empty!</li>';
        } else {
            saved.forEach(item => {
                const li = document.createElement('li');
                li.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px dashed #ccc; background: rgba(255,255,255,0.95); margin-bottom: 5px; border-radius: 8px;";
                li.innerHTML = `<span style="font-weight:bold;">${item}</span> <button onclick="removeFromWishlist('${item}')" style="color:white; background:#d42426; border:none; border-radius:5px; padding:5px 10px; cursor:pointer;">Remove</button>`;
                wishlistItems.appendChild(li);
            });
        }
    }
};

window.removeFromWishlist = function(itemName) {
    let saved = JSON.parse(localStorage.getItem('santaWishlist')) || [];
    saved = saved.filter(i => i !== itemName);
    localStorage.setItem('santaWishlist', JSON.stringify(saved));
    loadWishlist();
};