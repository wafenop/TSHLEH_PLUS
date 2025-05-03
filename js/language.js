/**
 * language.js - ملف JavaScript للتبديل بين اللغات
 * تشليح بلس - سوق قطع غيار السيارات المستعملة
 */

// تحديد اللغة الافتراضية
let currentLanguage = 'ar'; // العربية هي اللغة الافتراضية

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحقق من اللغة المخزنة في متصفح المستخدم
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // تعيين اتجاه الصفحة واللغة
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث نص زر تبديل اللغة
    updateLanguageToggleButton();
    
    // تطبيق اللغة
    applyLanguage();
    
    // إضافة مستمع الحدث لزر تبديل اللغة
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
});

// دالة تبديل اللغة
function toggleLanguage() {
    // تبديل اللغة
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    
    // حفظ اللغة في التخزين المحلي
    localStorage.setItem('language', currentLanguage);
    
    // تعيين اتجاه الصفحة واللغة
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث نص زر تبديل اللغة
    updateLanguageToggleButton();
    
    // تطبيق اللغة على جميع العناصر
    applyLanguage();
}

// تحديث نص زر تبديل اللغة
function updateLanguageToggleButton() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.dataset.current = currentLanguage;
        
        // تحديث نص الزر
        const toggleText = langToggle.querySelector('span');
        if (toggleText) {
            toggleText.textContent = currentLanguage === 'ar' ? 'English' : 'العربية';
        }
    }
}

// تطبيق اللغة على جميع العناصر
function applyLanguage() {
    // العناصر التي تحتوي على سمات data-ar و data-en
    const elementsWithLang = document.querySelectorAll('[data-ar][data-en]');
    
    elementsWithLang.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'OPTION') {
            // إذا كان العنصر حقل إدخال أو منطقة نص
            if (element.hasAttribute('placeholder')) {
                element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
            } else {
                // للعناصر option
                element.textContent = element.getAttribute(`data-${currentLanguage}`);
            }
        } else {
            // للعناصر العادية
            element.textContent = element.getAttribute(`data-${currentLanguage}`);
        }
    });
    
    // للعناصر التي تحتوي على placeholder فقط
    const elementsWithPlaceholder = document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]');
    
    elementsWithPlaceholder.forEach(element => {
        element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
    });
    
    // تعديل أنماط CSS الخاصة بالاتجاه
    updateDirectionalStyles();
}

// تحديث الأنماط المرتبطة بالاتجاه
function updateDirectionalStyles() {
    // يمكن هنا إضافة أي تعديلات CSS مرتبطة بالاتجاه
    // مثل تغيير اتجاه الأيقونات أو إعادة ضبط العناصر المرنة
    
    // للعناصر التي تحتاج إلى تغيير الهوامش/الحشوة بناءً على الاتجاه
    const directionalElements = document.querySelectorAll('.direction-sensitive');
    
    directionalElements.forEach(element => {
        // إعادة تعيين الفئات
        element.classList.remove('rtl-layout', 'ltr-layout');
        
        // إضافة الفئة المناسبة
        element.classList.add(currentLanguage === 'ar' ? 'rtl-layout' : 'ltr-layout');
    });
    
    // تطبيق التغييرات على اتجاه الأيقونات
    const directionIcons = document.querySelectorAll('.direction-icon');
    
    directionIcons.forEach(icon => {
        if (currentLanguage === 'ar') {
            icon.classList.add('flip-horizontal');
        } else {
            icon.classList.remove('flip-horizontal');
        }
    });
}

// توفير هذه الدالة عالمياً لاستخدامها من ملفات JavaScript أخرى
window.applyLanguage = applyLanguage;