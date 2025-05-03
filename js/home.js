/**
 * home.js - ملف JavaScript محسن للصفحة الرئيسية
 * تشليح بلس - سوق قطع غيار السيارات المستعملة
 */

// تأكيد تحميل الملف
console.log('تم تحميل home.js بنجاح');

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة الرئيسية بالكامل');
    
    // إعداد علامات تبويب البحث
    setupSearchTabs();
    
    // إعداد نماذج البحث وتوجيهها إلى صفحة النتائج
    setupSearchForms();
    
    // إعداد العداد التنازلي للمزادات
    setupCountdowns();
    
    // إضافة تأثيرات بصرية محسنة
    setupVisualEffects();
    
    // إعداد تفاعلات البطاقات
    setupCardInteractions();
    
    // إعداد الروابط والأزرار
    setupLinks();
});

// إعداد علامات تبويب البحث
function setupSearchTabs() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchPanels = document.querySelectorAll('.search-panel');
    
    if (searchTabs.length === 0 || searchPanels.length === 0) {
        console.warn('لم يتم العثور على عناصر البحث في الصفحة');
        return;
    }
    
    console.log('تم العثور على ' + searchTabs.length + ' علامة تبويب للبحث');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('تم النقر على علامة تبويب: ' + this.textContent.trim());
            
            // إزالة الفئة النشطة من جميع العلامات واللوحات
            searchTabs.forEach(t => t.classList.remove('active'));
            searchPanels.forEach(p => p.classList.remove('active'));
            
            // تفعيل العلامة واللوحة المقابلة
            this.classList.add('active');
            
            const tabId = this.dataset.tab;
            const targetPanel = document.getElementById(`${tabId}-search`);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            } else {
                console.error('لم يتم العثور على لوحة البحث بمعرف: ' + tabId + '-search');
            }
        });
    });
}

// إعداد نماذج البحث وتوجيهها إلى صفحة النتائج
function setupSearchForms() {
    // تحسين أحجام مربعات البحث
    improveSearchBoxSizes();
    
    // نموذج بحث رقم الهيكل
    const chassisForm = document.querySelector('#chassis-search-form');
    if (chassisForm) {
        chassisForm.addEventListener('submit', function(event) {
            // لا نوقف الإرسال هنا حتى يتم توجيه المستخدم إلى صفحة النتائج
            // نضيف فقط بعض الأكواد للتأكد من صحة البيانات
            
            const chassisInput = this.querySelector('input[name="chassis"]');
            const chassisNumber = chassisInput.value.trim();
            
            if (!chassisNumber) {
                // منع الإرسال إذا كان الحقل فارغاً
                event.preventDefault();
                showInputError(chassisInput, 'الرجاء إدخال رقم الهيكل');
            } else {
                console.log('جاري البحث عن رقم الهيكل: ' + chassisNumber);
                // سيتم إرسال النموذج تلقائيًا إلى صفحة النتائج
            }
        });
    }
    
    // نموذج البحث بالتصفية
    const filterForm = document.querySelector('#filter-search-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(event) {
            // نتحقق فقط من وجود قيمة واحدة على الأقل
            
            const manufacturer = filterForm.querySelector('select[name="manufacturer"]').value;
            const model = filterForm.querySelector('select[name="model"]').value;
            const year = filterForm.querySelector('select[name="year"]').value;
            const category = filterForm.querySelector('select[name="category"]').value;
            
            // التحقق من وجود قيمة واحدة على الأقل
            if (!manufacturer && !model && !year && !category) {
                // منع الإرسال إذا كانت جميع الحقول فارغة
                event.preventDefault();
                showNotification('الرجاء تحديد معيار واحد على الأقل للبحث', 'error');
            } else {
                console.log('جاري البحث بالتصفية: ', {
                    manufacturer,
                    model,
                    year,
                    category
                });
                // سيتم إرسال النموذج تلقائيًا إلى صفحة النتائج
            }
        });
        
        // إعداد اختيارات القوائم المنسدلة المتسلسلة
        setupDependentDropdowns(filterForm);
    }
    
    // نموذج البحث باسم القطعة
    const partForm = document.querySelector('#part-search-form');
    if (partForm) {
        partForm.addEventListener('submit', function(event) {
            const partInput = this.querySelector('input[name="part"]');
            const partName = partInput.value.trim();
            
            if (!partName) {
                // منع الإرسال إذا كان الحقل فارغاً
                event.preventDefault();
                showInputError(partInput, 'الرجاء إدخال اسم القطعة');
            } else {
                console.log('جاري البحث عن قطعة: ' + partName);
                // سيتم إرسال النموذج تلقائيًا إلى صفحة النتائج
            }
        });
    }
}

// تحسين أحجام مربعات البحث
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

// إظهار خطأ في حقل المدخلات
function showInputError(inputElement, message) {
    inputElement.classList.add('is-invalid');
    
    // إنشاء رسالة خطأ إذا لم تكن موجودة
    let errorMessage = inputElement.parentElement.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        
        // إضافة الرسالة بعد الحقل أو داخل المجموعة
        const parent = inputElement.parentElement;
        parent.appendChild(errorMessage);
    }
    
    // تعيين نص الرسالة
    errorMessage.textContent = message;
    errorMessage.style.color = '#dc3545';
    errorMessage.style.fontSize = '0.85rem';
    errorMessage.style.marginTop = '0.25rem';
    
    // إزالة حالة الخطأ بعد تغيير قيمة الحقل
    inputElement.addEventListener('input', function onInput() {
        inputElement.classList.remove('is-invalid');
        errorMessage.remove();
        inputElement.removeEventListener('input', onInput);
    }, { once: true });
}

// إعداد القوائم المنسدلة المتسلسلة
function setupDependentDropdowns(form) {
    if (!form) return;
    
    const manufacturerSelect = form.querySelector('select[name="manufacturer"]');
    const modelSelect = form.querySelector('select[name="model"]');
    
    if (manufacturerSelect && modelSelect) {
        manufacturerSelect.addEventListener('change', function() {
            // إفراغ قائمة الموديلات
            modelSelect.innerHTML = '';
            
            // إضافة الخيار الافتراضي
            addOption(modelSelect, '', 'اختر الموديل', 'Select Model');
            
            // الحصول على الشركة المصنعة المحددة
            const manufacturer = this.value;
            
            if (manufacturer) {
                // إضافة الموديلات بناءً على الشركة المصنعة
                switch (manufacturer) {
                    case 'toyota':
                        addOption(modelSelect, 'camry', 'كامري', 'Camry');
                        addOption(modelSelect, 'corolla', 'كورولا', 'Corolla');
                        addOption(modelSelect, 'landcruiser', 'لاند كروزر', 'Land Cruiser');
                        addOption(modelSelect, 'avalon', 'أفالون', 'Avalon');
                        addOption(modelSelect, 'rav4', 'راف 4', 'RAV4');
                        break;
                        
                    case 'honda':
                        addOption(modelSelect, 'accord', 'أكورد', 'Accord');
                        addOption(modelSelect, 'civic', 'سيفيك', 'Civic');
                        addOption(modelSelect, 'crv', 'سي آر في', 'CR-V');
                        addOption(modelSelect, 'pilot', 'بايلوت', 'Pilot');
                        break;
                        
                    case 'ford':
                        addOption(modelSelect, 'fusion', 'فيوجن', 'Fusion');
                        addOption(modelSelect, 'explorer', 'إكسبلورر', 'Explorer');
                        addOption(modelSelect, 'taurus', 'توروس', 'Taurus');
                        addOption(modelSelect, 'edge', 'إيدج', 'Edge');
                        break;
                        
                    case 'bmw':
                        addOption(modelSelect, '3series', 'الفئة الثالثة', '3 Series');
                        addOption(modelSelect, '5series', 'الفئة الخامسة', '5 Series');
                        addOption(modelSelect, '7series', 'الفئة السابعة', '7 Series');
                        addOption(modelSelect, 'x5', 'إكس 5', 'X5');
                        break;
                        
                    case 'mercedes':
                        addOption(modelSelect, 'cclass', 'الفئة C', 'C Class');
                        addOption(modelSelect, 'eclass', 'الفئة E', 'E Class');
                        addOption(modelSelect, 'sclass', 'الفئة S', 'S Class');
                        addOption(modelSelect, 'glc', 'جي إل سي', 'GLC');
                        break;
                }
            }
        });
    }
}

// إضافة خيار للقائمة المنسدلة
function addOption(selectElement, value, textAr, textEn) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = textAr; // النص الافتراضي هو العربية
    
    // إضافة سمات اللغة
    option.setAttribute('data-ar', textAr);
    option.setAttribute('data-en', textEn);
    
    selectElement.appendChild(option);
}

// إعداد العداد التنازلي للمزادات
function setupCountdowns() {
    const countdowns = document.querySelectorAll('.time-remaining span');
    
    if (countdowns.length > 0) {
        console.log('تم العثور على ' + countdowns.length + ' عداد تنازلي');
        
        // تحديث العدادات كل ثانية
        setInterval(function() {
            countdowns.forEach(countdown => {
                // تحليل الوقت (الصيغة: ساعة:دقيقة:ثانية)
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

// إضافة تأثيرات بصرية محسنة
function setupVisualEffects() {
    // تأثير ظهور تدريجي للعناصر عند التمرير
    const animatedElements = document.querySelectorAll('.how-step-card, .featured-yard-card, .auction-card, .part-card, .section-title');
    
    // إنشاء كائن IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // تطبيق الأنماط الأولية ومراقبة العناصر
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
        
        // إضافة نمط CSS للتحريك
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(styleElement);
    } else {
        // Fallback إذا كان IntersectionObserver غير مدعوم
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// إعداد تفاعلات البطاقات
function setupCardInteractions() {
    // تفاعلات بطاقات التشاليح
    const yardCards = document.querySelectorAll('.featured-yard-card');
    
    yardCards.forEach(card => {
        const viewProfileBtn = card.querySelector('.yard-btn');
        
        if (viewProfileBtn) {
            // تغيير نمط الزر عند التحويم على البطاقة
            card.addEventListener('mouseenter', function() {
                viewProfileBtn.className = 'btn btn-primary yard-btn';
            });
            
            card.addEventListener('mouseleave', function() {
                viewProfileBtn.className = 'btn btn-outline yard-btn';
            });
        }
    });
    
    // تفاعلات بطاقات القطع
    const partCards = document.querySelectorAll('.part-card');
    
    partCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.btn-primary');
        
        if (viewDetailsBtn) {
            // تغيير لون الزر عند التحويم على البطاقة
            card.addEventListener('mouseenter', function() {
                viewDetailsBtn.style.backgroundColor = '#57c5b6';
            });
            
            card.addEventListener('mouseleave', function() {
                viewDetailsBtn.style.backgroundColor = '';
            });
        }
    });
}

// إعداد الروابط والأزرار
function setupLinks() {
    // ربط أزرار المزاد في القائمة العلوية
    const auctionsNavLink = document.querySelector('.main-nav a[href="auctions.html"]');
    if (auctionsNavLink) {
        auctionsNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'auctions.html';
        });
    }
    
    // ربط زر عرض المزاد لسيارة الكامري
    const camryAuctionButton = document.querySelector('.auction-card:first-child .btn');
    if (camryAuctionButton) {
        camryAuctionButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'auction-details.html?id=1';
        });
    }
    
    // ربط زر عرض جميع المزادات
    const viewAllAuctionsButton = document.querySelector('.auction-preview .view-more .btn');
    if (viewAllAuctionsButton) {
        viewAllAuctionsButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'auctions.html';
        });
    }
    
    // ربط زر عرض تفاصيل قطعة الكامري
    const camryPartButton = document.querySelector('.part-card:first-child .btn');
    if (camryPartButton) {
        camryPartButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'part-details.html?id=1';
        });
    }
    
    // ربط زر عرض المزيد من القطع
    const viewMorePartsButton = document.querySelector('.latest-parts .view-more .btn');
    if (viewMorePartsButton) {
        viewMorePartsButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'search-results.html';
        });
    }
}

// عرض إشعار للمستخدم
function showNotification(message, type = 'info') {
    // التحقق من وجود إشعار حالي
    let notification = document.querySelector('.notification');
    
    // إذا كان الإشعار موجوداً، قم بإزالته أولاً
    if (notification) {
        notification.remove();
    }
    
    // إنشاء إشعار جديد
    notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // إنشاء محتوى الإشعار
    const notificationContent = document.createElement('div');
    notificationContent.className = 'notification-content';
    
    // إضافة أيقونة
    const icon = document.createElement('i');
    icon.className = `fas ${getNotificationIcon(type)}`;
    
    // إضافة رسالة
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    // إضافة زر إغلاق
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    
    // تجميع العناصر
    notificationContent.appendChild(icon);
    notificationContent.appendChild(messageText);
    notification.appendChild(notificationContent);
    notification.appendChild(closeButton);
    
    // إضافة الإشعار إلى المستند
    document.body.appendChild(notification);
    
    // إضافة مستمع حدث لزر الإغلاق
    closeButton.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // إضافة أنماط CSS إذا لم تكن موجودة
    addNotificationStyles();
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار تلقائيًا بعد فترة
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// الحصول على أيقونة الإشعار المناسبة
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

// إضافة أنماط CSS للإشعارات
function addNotificationStyles() {
    // التحقق من عدم وجود أنماط سابقة
    if (document.getElementById('notification-styles')) {
        return;
    }
    
    // إنشاء عنصر <style>
    const styleElement = document.createElement('style');
    styleElement.id = 'notification-styles';
    
    // محتوى CSS
    styleElement.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 350px;
        background-color: white;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 1500;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-right: 4px solid var(--accent-color);
    }

    html[lang="en"] .notification {
        right: auto;
        left: 20px;
        transform: translateX(-400px);
        border-right: none;
        border-left: 4px solid var(--accent-color);
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-color: var(--success-color);
    }
    
    .notification.error {
        border-color: var(--danger-color);
    }
    
    .notification.warning {
        border-color: var(--warning-color);
    }

    .notification-content {
        display: flex;
        align-items: center;
    }

    .notification-content i {
        margin-left: 1rem;
        font-size: 1.5rem;
    }

    html[lang="en"] .notification-content i {
        margin-left: 0;
        margin-right: 1rem;
    }

    .notification.success i {
        color: var(--success-color);
    }

    .notification.error i {
        color: var(--danger-color);
    }

    .notification.info i {
        color: var(--accent-color);
    }
    
    .notification.warning i {
        color: var(--warning-color);
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--gray-600);
        cursor: pointer;
    }

    @media (max-width: 576px) {
        .notification {
            max-width: 90%;
            width: 90%;
        }
    }
    `;
    
    // إضافة العنصر للـ <head>
    document.head.appendChild(styleElement);
}