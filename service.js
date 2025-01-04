// service.js
document.addEventListener('DOMContentLoaded', () => {
    // Render Services
    const renderServices = () => {
        const servicesGrid = document.getElementById('servicesGrid');
        serviceData.services.forEach((service, index) => {
            const serviceCard = `
                <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <figure class="px-4 pt-4">
                        <img src="${service.image}" alt="${service.title}" class="rounded-xl h-48 w-full object-cover" loading="lazy">
                    </figure>
                    <div class="card-body">
                        <div class="flex items-center gap-2">
                            <h2 class="card-title">${service.title}</h2>
                            <div class="badge badge-primary">พรีเมี่ยม</div>
                        </div>
                        <p>${service.description}</p>
                        <div class="divider"></div>
                        <ul class="space-y-2">
                            ${service.details.map(detail => `
                                <li class="flex items-center gap-2">
                                    <div class="badge badge-sm"></div>
                                    ${detail}
                                </li>
                            `).join('')}
                        </ul>
                        <p class="text-sm opacity-75">ดำเนินการผลิต: ${service.price}</p>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary btn-block" 
                                    onclick="showContactModal('${service.title}')">
                                ติดต่อสอบถาม
                            </button>
                        </div>
                    </div>
                </div>
            `;
            servicesGrid.insertAdjacentHTML('beforeend', serviceCard);
        });
    };

    // Render Standards
    const renderStandards = () => {
        const standardsGrid = document.getElementById('standardsGrid');
        serviceData.standards.forEach((standard, index) => {
            const standardCard = `
                <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                     onclick="toggleStandardDetails(this)">
                    <div class="card-body items-center text-center">
                        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4">
                            ${standard.icon}
                        </div>
                        <h2 class="card-title">${standard.title}</h2>
                        <p>${standard.description}</p>
                        <div class="collapse">
                            <div class="collapse-content bg-base-200 rounded-box p-4 mt-4">
                                <h4 class="font-semibold mb-2">รายละเอียดเพิ่มเติม</h4>
                                <p>${standard.additionalInfo || 'ติดต่อเราเพื่อข้อมูลเพิ่มเติม'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            standardsGrid.insertAdjacentHTML('beforeend', standardCard);
        });
    };

    // Modal handlers
    window.showContactModal = (serviceName) => {
        const modal = document.getElementById('contact_modal');
        const titleElement = modal.querySelector('h3');
        titleElement.textContent = `ติดต่อสอบถาม ${serviceName}`;
        modal.showModal();
    };

    window.toggleStandardDetails = (element) => {
        const collapse = element.querySelector('.collapse');
        collapse.classList.toggle('collapse-open');
    };

    // Form handler
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            document.getElementById('contact_modal').close();
            // Show success message
            showAlert('ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด', 'success');
        }, 1500);
    });

    // Alert function
    window.showAlert = (message, type = 'info') => {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} fixed top-4 right-4 w-auto max-w-sm z-50`;
        alert.innerHTML = `
            <span>${message}</span>
        `;
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    };

    // Initialize
    const init = () => {
        renderServices();
        renderStandards();
    };

    init();
});


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

