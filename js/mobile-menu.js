/**
 * mobile-menu.js
 * التعامل مع زر القائمة المتنقلة في الشريط العلوي
 */

document.addEventListener('DOMContentLoaded', function() {
    // الحصول على زر القائمة المتنقلة
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    // الحصول على قائمة التنقل
    const mainNav = document.querySelector('.main-nav');
    
    // التأكد من وجود العناصر قبل إضافة مستمعي الأحداث
    if (mobileMenuToggle && mainNav) {
        // إضافة مستمع حدث النقر على زر القائمة
        mobileMenuToggle.addEventListener('click', function() {
            // تبديل حالة القائمة (إظهار/إخفاء)
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // تغيير شكل الخطوط الثلاثة عند النقر
            const spans = this.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].classList.toggle('top-active');
                spans[1].classList.toggle('middle-active');
                spans[2].classList.toggle('bottom-active');
            }
        });
    }
});

function fixMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!mobileMenuToggle || !mainNav) {
        console.error('لم يتم العثور على عناصر القائمة المتنقلة');
        return;
    }
    
    console.log('تم العثور على عناصر القائمة المتنقلة');
    
    // التأكد من أن القائمة تظهر في النمط المتنقل عند تفعيلها
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @media (max-width: 992px) {
            .main-nav {
                display: block;
                position: fixed;
                top: 70px;
                right: -280px;
                width: 280px;
                height: calc(100vh - 70px);
                background-color: white;
                transition: right 0.3s ease;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                padding: 2rem 1rem;
                overflow-y: auto;
            }
            
            html[lang="en"] .main-nav {
                right: auto;
                left: -280px;
                transition: left 0.3s ease;
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
            }
            
            .main-nav a {
                display: block;
                padding: 0.8rem 1rem;
                width: 100%;
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
        }
    `;
    document.head.appendChild(styleElement);
    
    // إنشاء طبقة الخلفية المعتمة
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        console.log('تم إنشاء طبقة الخلفية المعتمة');
    }
    
    // تبديل حالة القائمة عند النقر على الزر
    mobileMenuToggle.addEventListener('click', function() {
        console.log('تم النقر على زر القائمة المتنقلة');
        
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
    });
    
    // إغلاق القائمة عند النقر على الخلفية المعتمة
    menuOverlay.addEventListener('click', function() {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('تم إغلاق القائمة المتنقلة بالنقر على الخلفية');
    });
    
    // إغلاق القائمة عند النقر على أي رابط داخلها
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('تم إغلاق القائمة المتنقلة بالنقر على رابط');
        });
    });
    
    // إغلاق القائمة عند تغيير حجم النافذة إلى أكبر من 992 بكسل
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('تم إغلاق القائمة المتنقلة بسبب تغيير حجم النافذة');
        }
    });
    
    console.log('تم إعداد القائمة المتنقلة بنجاح');
}