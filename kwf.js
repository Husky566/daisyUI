// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const animateOptions = {
        threshold: 0.3
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, animateOptions);

    animateElements.forEach(el => animateObserver.observe(el));

    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            let errorMessages = [];

            // Validate email
            const email = formData.get('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessages.push('กรุณากรอกอีเมลให้ถูกต้อง');
            }

            // Validate message length
            const message = formData.get('message');
            if (message.length < 10) {
                isValid = false;
                errorMessages.push('ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
            }

            if (!isValid) {
                // Show error messages
                const errorContainer = document.createElement('div');
                errorContainer.className = 'alert alert-error mt-4';
                errorContainer.innerHTML = errorMessages.join('<br>');
                contactForm.appendChild(errorContainer);
                
                setTimeout(() => {
                    errorContainer.remove();
                }, 5000);
                
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="loading loading-spinner"></span> กำลังส่ง...';
            submitButton.disabled = true;

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success mt-4';
                successAlert.textContent = 'ส่งข้อความเรียบร้อยแล้ว';
                contactForm.appendChild(successAlert);
                
                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    successAlert.remove();
                }, 5000);
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert alert-error mt-4';
                errorAlert.textContent = 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง';
                contactForm.appendChild(errorAlert);
                
                setTimeout(() => {
                    errorAlert.remove();
                }, 5000);
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Copy address functionality
    window.copyAddress = function(type) {
        const addresses = {
            'head-office': '318 หมู่ 5 ตำบลโคกขาม อำเภอเมืองสมุทรสาคร จ.สมุทรสาคร 74000',
            'factory': '318 หมู่ 5 ตำบลโคกขาม อำเภอเมืองสมุทรสาคร จ.สมุทรสาคร 74000'
        };

        const address = addresses[type];
        if (address) {
            navigator.clipboard.writeText(address).then(() => {
                // Show toast notification
                const toast = document.createElement('div');
                toast.className = 'toast toast-top toast-center';
                toast.innerHTML = `
                    <div class="alert alert-success">
                        <span>คัดลอกที่อยู่แล้ว</span>
                    </div>
                `;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            });
        }
    };

    // Map zoom functionality
    window.zoomMap = function(direction) {
        const iframe = document.querySelector('.map-container iframe');
        const src = new URL(iframe.src);
        const zoom = parseInt(src.searchParams.get('z')) || 15;
        
        src.searchParams.set('z', zoom + direction);
        iframe.src = src.toString();
    };

    // Statistics counter animation
    const stats = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.ceil(current).toLocaleString();
                    }
                }, 50);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));
});

// Add custom theme support
if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
}
// เก็บภาษาปัจจุบันใน localStorage
let currentLanguage = localStorage.getItem('language') || 'th';

// อัพเดตเนื้อหาตามภาษา
function updateContent() {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const keys = element.getAttribute('data-lang-key').split('.');
        let value = translations[currentLanguage];
        
        for (const key of keys) {
            if (value) {
                value = value[key];
            }
        }

        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });

    // อัพเดต document title
    document.title = currentLanguage === 'th' 
        ? 'บริษัท คิงเวลล์ เฟิร์ส จำกัด - ผู้นำด้านห้องเย็นและอาหารแปรรูป'
        : 'Kingwell First Co., Ltd. - Leader in Cold Storage and Food Processing';
    
    // อัพเดต lang attribute
    document.documentElement.lang = currentLanguage;
    
    // อัพเดตปุ่มเปลี่ยนภาษา
    updateLanguageIndicators();
}

// อัพเดตปุ่มเปลี่ยนภาษาทั้งหมด
function updateLanguageIndicators() {
    document.querySelectorAll('.language-indicator').forEach(indicator => {
        // แสดงภาษาตรงข้ามกับภาษาปัจจุบัน
        indicator.textContent = currentLanguage === 'th' ? 'EN' : 'TH';
    });
}

// ฟังก์ชั่นเปลี่ยนภาษา
function toggleLanguage() {
    currentLanguage = currentLanguage === 'th' ? 'en' : 'th';
    localStorage.setItem('language', currentLanguage);
    
    // เพิ่ม fade effect
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        updateContent();
        document.body.style.opacity = '1';
    }, 200);
}

// เริ่มต้นเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
});

