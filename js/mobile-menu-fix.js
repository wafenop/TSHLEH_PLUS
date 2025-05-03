/**
 * mobile-menu-fix.js
 * إصلاح مشكلة زر القائمة المتنقل عند تكبير الشاشة
 */

// تنفيذ الكود عند تحميل الصفحة
// التحقق من عدم تنفيذ الكود مرتين
if (!window.mobileMenuFixInitialized) {
    window.mobileMenuFixInitialized = true;
    document.addEventListener('DOMContentLoaded', function () {
        console.log('جاري بدء تشغيل إصلاح القائمة المتنقلة...');
        fixMobileMenuIssue();
    });
}

function fixMobileMenuIssue() {
    // الحصول على عناصر القائمة
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // التأكد من وجود العناصر
    if (!mobileMenuToggle || !mainNav) {
        console.error('لم يتم العثور على عناصر القائمة المتنقلة');
        return;
    }

    console.log('تم العثور على عناصر القائمة المتنقلة');

    // إنشاء طبقة الخلفية المعتمة إذا لم تكن موجودة
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        console.log('تم إنشاء طبقة الخلفية المعتمة');
    }

    // إضافة أنماط CSS لضمان عمل القائمة المتنقلة بشكل صحيح
    addMobileMenuStyles();

    // التحقق مما إذا كان تم تهيئة القائمة المتنقلة مسبقًا
    if (window.mobileMenuEventsInitialized) {
        console.log('تم تهيئة أحداث القائمة المتنقلة مسبقًا');
        return;
    }

    // تعيين علامة لمنع تكرار تهيئة الأحداث
    window.mobileMenuEventsInitialized = true;

    // إزالة مستمعي الأحداث السابقة لتجنب التكرار
    mobileMenuToggle.removeEventListener('click', handleMobileMenuToggle);
    menuOverlay.removeEventListener('click', closeMobileMenu);
    window.removeEventListener('resize', handleWindowResize);

    // تعريف وظائف معالجة الأحداث كدوال منفصلة لتسهيل إزالتها وإعادة تعيينها
    function handleMobileMenuToggle(e) {
        console.log('تم النقر على زر القائمة المتنقلة');

        // منع السلوك الافتراضي (لتجنب التداخل مع الوظائف الأخرى)
        e.preventDefault();
        e.stopPropagation();

        // تبديل حالة القائمة
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        console.log('حالة القائمة المتنقلة: ', mainNav.classList.contains('active') ? 'مفتوحة' : 'مغلقة');

        // منع/السماح بالتمرير على الجسم
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('تم إغلاق القائمة المتنقلة');
    }

    function handleWindowResize() {
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            closeMobileMenu();
            console.log('تم إغلاق القائمة المتنقلة بسبب تغيير حجم النافذة');
        }
    }

    function handleNavLinkClick() {
        closeMobileMenu();
        console.log('تم إغلاق القائمة المتنقلة بالنقر على رابط');
    }

    // إضافة مستمعي الأحداث باستخدام الدوال المعرفة
    mobileMenuToggle.addEventListener('click', handleMobileMenuToggle, true);
    menuOverlay.addEventListener('click', closeMobileMenu);

    // إغلاق القائمة عند النقر على أي رابط داخلها
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // إغلاق القائمة عند تغيير حجم النافذة إلى أكبر من 992 بكسل
    window.addEventListener('resize', handleWindowResize);

    console.log('تم إعداد إصلاح القائمة المتنقلة بنجاح');
}

// إضافة أنماط CSS للقائمة المتنقلة
function addMobileMenuStyles() {
    // التحقق من عدم وجود أنماط سابقة
    if (document.getElementById('mobile-menu-fix-styles')) {
        return;
    }

    // إنشاء عنصر <style>
    const styleElement = document.createElement('style');
    styleElement.id = 'mobile-menu-fix-styles';

    // محتوى CSS
    styleElement.textContent = `
        @media (max-width: 992px) {
            .main-nav {
                display: block !important;
                position: fixed;
                top: 80px;
                right: -280px;
                width: 280px;
                height: 100vh;
                background-color: white;
                transition: right 0.3s ease, left 0.3s ease;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                padding: 2rem 1rem;
                overflow-y: auto;
                opacity: 1;
                visibility: visible;
                transform: none;
            }
            
            html[lang="en"] .main-nav {
                right: auto;
                left: -280px;
                box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
            }
            
            .main-nav.active {
                right: 0;
            }
            
            html[lang="en"] .main-nav.active {
                left: 0;
            }
            
            .main-nav ul {
                flex-direction: column;
                gap: 1rem;
                padding: 0;
                margin: 0;
            }
            
            .main-nav a {
                display: block;
                padding: 0.8rem 1rem;
                width: 100%;
                font-weight: 600;
            }
            
            .main-nav a.active::after {
                display: none;
            }
            
            .menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
                display: none;
            }
            
            .menu-overlay.active {
                display: block;
            }
            
            /* زر القائمة المتنقلة */
            .mobile-menu-toggle {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 21px;
                cursor: pointer;
                z-index: 1001;
            }
            
            .mobile-menu-toggle span {
                display: block;
                height: 3px;
                width: 100%;
                background-color: var(--primary-color);
                border-radius: 3px;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-toggle.active span:first-child {
                transform: translateY(9px) rotate(45deg);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:last-child {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
        
        /* تعديلات إضافية على الشاشات الصغيرة */
        @media (max-width: 576px) {
            .main-nav {
                top: 70px;
                width: 250px;
            }
        }
    `;

    // إضافة العنصر للـ <head>
    document.head.appendChild(styleElement);
    console.log('تم إضافة أنماط CSS للقائمة المتنقلة');
}