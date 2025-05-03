/**
 * mobile-menu-toggle.js
 * ملف لإصلاح مشكلة زر القائمة المتنقلة في الشريط العلوي
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
            
            console.log('تم النقر على زر القائمة المتنقلة');
        });
    }
});