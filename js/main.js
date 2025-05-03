/**
 * main.js - ملف JavaScript محسن
 * تشليح بلس - سوق قطع غيار السيارات المستعملة
 */

// تأكيد تحميل الملف
console.log('تم تحميل main.js بنجاح');

// ===== تهيئة الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بالكامل');
    
    // تفعيل القائمة المتنقلة للهواتف
    setupMobileMenu();
    
    // تهيئة النماذج
    setupForms();
    
    // تهيئة العداد التنازلي للمزادات
    setupCountdowns();
    
    // تفعيل الزر للعودة لأعلى الصفحة
    setupScrollToTop();
    
    // إصلاح روابط القائمة الرئيسية
    setupMainNavLinks();
    
    // تفعيل روابط الصفحات
    enablePageLinks();
    
    // تفعيل تأثيرات الحركة عند التمرير
    setupScrollAnimations();
});

// ===== تفعيل روابط الصفحات =====
function enablePageLinks() {
    // قائمة الصفحات المتاحة في التطبيق
    const availablePages = [
        'index.html',
        'search-results.html',
        'auctions.html',
        'auction-details.html',
        'part-details.html',
        'salvage-yards.html',
        'login.html',
        'register.html',
        'register-yard.html',
        'profile.html',
        'employee.html'
    ];
    
    // الحصول على جميع الروابط في الصفحة
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // تفعيل جميع الروابط المتاحة
        if (href && availablePages.some(page => href.includes(page))) {
            // إزالة أي مستمع أحداث قد يكون موجود (للتأكد من عدم تكرار الإضافة)
            const clonedLink = link.cloneNode(true);
            if (link.parentNode) {
                link.parentNode.replaceChild(clonedLink, link);
            }
            
            // إعادة تعيين سلوك الرابط إلى السلوك الافتراضي
            clonedLink.addEventListener('click', function(event) {
                // السماح بالسلوك الافتراضي للرابط (الانتقال إلى الصفحة المقصودة)
                return true;
            });
            
            // تعيينات خاصة لبعض الروابط
            if (href === 'auctions.html' || href.includes('auctions.html')) {
                // صفحة المزادات
                console.log('تمكين الانتقال إلى صفحة المزادات');
            } else if (href.includes('auction-details.html?id=1')) {
                // صفحة تفاصيل مزاد الكامري
                console.log('تمكين الانتقال إلى صفحة تفاصيل مزاد الكامري');
            } else if (href.includes('part-details.html?id=1')) {
                // صفحة تفاصيل قطعة الكامري
                console.log('تمكين الانتقال إلى صفحة تفاصيل قطعة الكامري');
            } else if (href === 'search-results.html' || href.includes('search-results.html')) {
                // صفحة نتائج البحث
                console.log('تمكين الانتقال إلى صفحة نتائج البحث');
            }
        }
    });
    
    // الروابط الخاصة في الصفحة الرئيسية
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        // روابط المزادات
        setupAuctionLinks();
        
        // روابط القطع
        setupPartLinks();
    }
}

// ===== إعداد روابط المزادات =====
function setupAuctionLinks() {
    // زر عرض مزاد الكامري
    const camryAuctionBtn = document.querySelector('.auction-card:first-child .btn');
    if (camryAuctionBtn) {
        camryAuctionBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'auction-details.html?id=1';
        };
    }
    
    // زر عرض مزاد الأكورد (إذا وجد)
    const accordAuctionBtn = document.querySelector('.auction-card:nth-child(2) .btn');
    if (accordAuctionBtn) {
        accordAuctionBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'auction-details.html?id=2';
        };
    }
    
    // زر عرض مزاد التيما (إذا وجد)
    const altimaAuctionBtn = document.querySelector('.auction-card:nth-child(3) .btn');
    if (altimaAuctionBtn) {
        altimaAuctionBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'auction-details.html?id=3';
        };
    }
    
    // زر عرض جميع المزادات
    const viewAllAuctionsBtn = document.querySelector('.auction-preview .view-more .btn');
    if (viewAllAuctionsBtn) {
        viewAllAuctionsBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'auctions.html';
        };
    }
}

// ===== إعداد روابط القطع =====
function setupPartLinks() {
    // زر عرض تفاصيل محرك الكامري
    const camryEngineBtn = document.querySelector('.part-card:first-child .btn');
    if (camryEngineBtn) {
        camryEngineBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'part-details.html?id=1';
        };
    }
    
    // زر عرض تفاصيل ناقل حركة هوندا (إذا وجد)
    const hondaTransBtn = document.querySelector('.part-card:nth-child(2) .btn');
    if (hondaTransBtn) {
        hondaTransBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'part-details.html?id=2';
        };
    }
    
    // زر عرض تفاصيل مصباح التيما (إذا وجد)
    const altimaLightBtn = document.querySelector('.part-card:nth-child(3) .btn');
    if (altimaLightBtn) {
        altimaLightBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'part-details.html?id=3';
        };
    }
    
    // زر عرض المزيد من القطع
    const viewMorePartsBtn = document.querySelector('.latest-parts .view-more .btn');
    if (viewMorePartsBtn) {
        viewMorePartsBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'search-results.html';
        };
    }
}

// ===== معالجة الروابط غير المتاحة في النموذج الأولي =====
function handleUnavailableLinks() {
    // لم نعد بحاجة إلى هذه الدالة حيث أننا نفعّل جميع الروابط الآن
    console.log('تم تفعيل جميع الروابط');
}

// ===== إصلاح روابط القائمة الرئيسية =====
function setupMainNavLinks() {
    const mainNavLinks = document.querySelectorAll('.main-nav a');
    
    mainNavLinks.forEach(link => {
        // تصحيح الرابط بناءً على href
        link.addEventListener('click', function(event) {
            // الحصول على مسار الرابط
            const href = this.getAttribute('href');
            
            // تحقق من أن الرابط ليس # أو javascript:void(0)
            if (href && href !== '#' && !href.startsWith('javascript')) {
                console.log('تم النقر على رابط القائمة: ' + href);
                
                // سنسمح بالانتقال إلى جميع الصفحات الآن
                return true;
            }
        });
    });
    
    // تفعيل رابط المزادات في القائمة بشكل خاص
    const auctionsLink = document.querySelector('.main-nav a[href="auctions.html"]');
    if (auctionsLink) {
        auctionsLink.onclick = function(e) {
            // سنسمح بالانتقال
            return true;
        };
    }
}

// ===== إعداد القائمة المتنقلة =====
function setupMobileMenu() {
    // تفعيل زر القائمة المتنقلة
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                
                // تغيير شكل زر القائمة عند النقر عليه (اختياري)
                const spans = this.querySelectorAll('span');
                if (spans.length === 3) {
                    spans.forEach(span => span.classList.toggle('active'));
                }
            });
        }
    });
    
    if (!mobileMenuToggle || !mainNav) {
        console.error('لم يتم العثور على عناصر القائمة المتنقلة');
        return;
    }
    
    // إنشاء طبقة الخلفية المعتمة
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // تبديل حالة القائمة عند النقر على الزر
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // منع/السماح بالتمرير على الجسم
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // إغلاق القائمة عند النقر على الخلفية المعتمة
    menuOverlay.addEventListener('click', function() {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // إغلاق القائمة عند تغيير حجم النافذة إلى أكبر من 992 بكسل
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== إعداد النماذج =====
function setupForms() {
    // تحقق من وجود نماذج في الصفحة
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            // لا نمنع الإرسال إلا إذا كانت هناك حاجة للتحقق من صحة البيانات
            console.log('تم إرسال نموذج');
        });
    });
    
    // إعداد تفاعل علامات تبويب البحث
    setupSearchTabs();
    
    // تحسين أحجام مربعات البحث
    improveSearchBoxSizes();
}

// ===== تحسين أحجام مربعات البحث =====
function improveSearchBoxSizes() {
    // تحسين مربع بحث رقم الهيكل
    const chassisInputGroup = document.querySelector('#chassis-search .input-group');
    if (chassisInputGroup) {
        chassisInputGroup.style.width = '100%';
        
        const chassisInput = chassisInputGroup.querySelector('input');
        if (chassisInput) {
            chassisInput.style.flex = '1';
            chassisInput.style.height = '48px';
            chassisInput.style.fontSize = '1rem';
            chassisInput.style.paddingRight = '1rem';
            chassisInput.style.paddingLeft = '1rem';
        }
        
        const chassisButton = chassisInputGroup.querySelector('button');
        if (chassisButton) {
            chassisButton.style.height = '48px';
        }
    }
    
    // تحسين مربع بحث اسم القطعة
    const partInputGroup = document.querySelector('#part-search .input-group');
    if (partInputGroup) {
        partInputGroup.style.width = '100%';
        
        const partInput = partInputGroup.querySelector('input');
        if (partInput) {
            partInput.style.flex = '1';
            partInput.style.height = '48px';
            partInput.style.fontSize = '1rem';
            partInput.style.paddingRight = '1rem';
            partInput.style.paddingLeft = '1rem';
        }
        
        const partButton = partInputGroup.querySelector('button');
        if (partButton) {
            partButton.style.height = '48px';
        }
    }
}

// ===== إعداد علامات تبويب البحث =====
function setupSearchTabs() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchPanels = document.querySelectorAll('.search-panel');
    
    if (searchTabs.length > 0 && searchPanels.length > 0) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع علامات التبويب واللوحات
                searchTabs.forEach(t => t.classList.remove('active'));
                searchPanels.forEach(p => p.classList.remove('active'));
                
                // إضافة الفئة النشطة للعلامة الحالية
                this.classList.add('active');
                
                // تفعيل اللوحة المقابلة
                const tabId = this.getAttribute('data-tab');
                const targetPanel = document.getElementById(tabId + '-search');
                
                if (targetPanel) {
                    targetPanel.classList.add('active');
                } else {
                    console.error('لم يتم العثور على لوحة البحث المقابلة: ' + tabId);
                }
            });
        });
    }
}

// ===== إعداد العداد التنازلي للمزادات =====
function setupCountdowns() {
    const countdowns = document.querySelectorAll('.time-remaining span');
    
    if (countdowns.length > 0) {
        console.log('تم العثور على ' + countdowns.length + ' عداد تنازلي');
        
        // تحديث العدادات كل ثانية
        setInterval(function() {
            countdowns.forEach(countdown => {
                // تحليز الوقت (الصيغة: ساعة:دقيقة:ثانية)
                let timeArr = countdown.textContent.split(':');
                if (timeArr.length !== 3) {
                    console.error('صيغة وقت غير صالحة: ' + countdown.textContent);
                    return;
                }
                
                let hours = parseInt(timeArr[0], 10);
                let minutes = parseInt(timeArr[1], 10);
                let seconds = parseInt(timeArr[2], 10);
                
                // خفض الثواني
                seconds--;
                
                // ضبط الدقائق والساعات عند الحاجة
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        
                        if (hours < 0) {
                            // انتهى الوقت
                            countdown.parentElement.innerHTML = '<span class="ended">انتهى المزاد</span>';
                            return;
                        }
                    }
                }
                
                // تنسيق الوقت وتحديث العرض
                countdown.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            });
        }, 1000);
    }
}

// ===== إعداد زر التمرير إلى الأعلى =====
function setupScrollToTop() {
    let scrollTopBtn = document.querySelector('.scroll-to-top');
    
    // إنشاء الزر إذا لم يكن موجودًا
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
    }
    
    // إظهار/إخفاء الزر أثناء التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // التمرير إلى الأعلى عند النقر
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== إعداد تأثيرات الحركة عند التمرير =====
function setupScrollAnimations() {
    // إضافة فئة التحريك لعناصر معينة
    const animateElements = document.querySelectorAll('.section-title, .category-card, .step, .yard-card, .auction-card, .join-content');
    
    // إضافة فئات التحريك مع تأخيرات مختلفة
    animateElements.forEach((element, index) => {
        element.classList.add('animate-fadeInUp');
        
        // إضافة تأخير للعناصر المتتابعة ضمن نفس القسم
        const delayIndex = index % 4; // تدوير بعد كل 4 عناصر
        element.classList.add(`animate-delay-${delayIndex + 1}`);
    });
    
    // المراقبة المشاهد للتفعيل عند الظهور
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // تفعيل عندما يكون 10% من العنصر مرئي
    });
    
    // إخفاء العناصر مبدئيًا ثم مراقبتها
    animateElements.forEach(element => {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ===== عرض إشعار للمستخدم =====
function showNotification(message, type = 'info') {
    // التحقق من وجود إشعار حالي
    let notification = document.querySelector('.notification');
    
    // إنشاء الإشعار إذا لم يكن موجودًا
    if (!notification) {
        notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const notificationContent = document.createElement('div');
        notificationContent.className = 'notification-content';
        
        const icon = document.createElement('i');
        icon.className = `fas ${getNotificationIcon(type)}`;
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        notificationContent.appendChild(icon);
        notificationContent.appendChild(messageText);
        notification.appendChild(notificationContent);
        
        // إضافة زر الإغلاق
        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        notification.appendChild(closeButton);
        document.body.appendChild(notification);

        // إضافة أنماط CSS للإشعارات إذا لم تكن موجودة
        addNotificationStyles();
    } else {
        // تحديث الإشعار الموجود
        notification.className = `notification ${type}`;
        const icon = notification.querySelector('.notification-content i');
        icon.className = `fas ${getNotificationIcon(type)}`;
        notification.querySelector('p').textContent = message;
    }
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار بعد فترة
    setTimeout(() => {
        notification.classList.remove('show');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== الحصول على أيقونة الإشعار المناسبة =====
function getNotificationIcon(type) {
    switch(type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        default:
            return 'fa-info-circle';
    }
}

// ===== إضافة أنماط CSS للإشعارات إذا لم تكن موجودة =====
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 350px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                padding: 15px 20px;
                z-index: 1500;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s ease;
                border-right: 4px solid var(--primary-color);
            }
            
            html[lang="en"] .notification {
                right: auto;
                left: 20px;
                transform: translateX(-400px);
                border-right: none;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification i {
                font-size: 20px;
            }
            
            .notification.success {
                border-color: #28a745;
            }
            
            .notification.success i {
                color: #28a745;
            }
            
            .notification.info {
                border-color: #57c5b6;
            }
            
            .notification.info i {
                color: #57c5b6;
            }
            
            .notification.warning {
                border-color: #ffc107;
            }
            
            .notification.warning i {
                color: #ffc107;
            }
            
            .notification.error {
                border-color: #dc3545;
            }
            
            .notification.error i {
                color: #dc3545;
            }
            
            .notification p {
                margin: 0;
                font-size: 0.95rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                font-size: 16px;
                padding: 5px;
            }
            
            @media (max-width: 576px) {
                .notification {
                    max-width: 90%;
                    width: 90%;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
}