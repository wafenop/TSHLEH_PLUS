/**
 * auctions.js - ملف JavaScript لصفحة مزادات السيارات
 * تشليح بلس - سوق قطع غيار السيارات المستعملة
 */

// تنفيذ الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل صفحة مزادات السيارات');
    
    // تهيئة عناصر الصفحة
    setupAuctionFilters();
    setupAuctionTimers();
    setupFaqItems();
    setupReminderButtons();
    
    // إصلاحات إضافية
    fixAuctionsPageStyles();
});

// ===== إعداد فلاتر المزادات =====
function setupAuctionFilters() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterBody = document.querySelector('.filter-body');
    const filterForm = document.getElementById('auctions-filter-form');
    
    if (!filterToggle || !filterBody || !filterForm) {
        console.error('لم يتم العثور على عناصر فلاتر المزادات');
        return;
    }
    
    // عرض/إخفاء قسم الفلاتر على الشاشات الصغيرة
    let isFilterVisible = true;
    
    if (window.innerWidth < 768) {
        isFilterVisible = false;
        filterBody.style.display = 'none';
    }
    
    filterToggle.addEventListener('click', function() {
        isFilterVisible = !isFilterVisible;
        
        if (isFilterVisible) {
            filterBody.style.display = 'block';
        } else {
            filterBody.style.display = 'none';
        }
    });
    
    // إعادة ضبط الفلاتر عند الضغط على زر إعادة الضبط
    const resetButton = filterForm.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            setTimeout(() => {
                console.log('تم إعادة ضبط الفلاتر');
            }, 10);
        });
    }
    
    // معالجة تغيير الشركة المصنعة لتحديث قائمة الموديلات
    const manufacturerSelect = filterForm.querySelector('select[name="manufacturer"]');
    if (manufacturerSelect) {
        // إضافة الموديلات بناءً على الشركة المصنعة (يمكن استبدالها بطلب API للبيانات الفعلية)
        const carModels = {
            'toyota': ['كامري', 'كورولا', 'لاندكروزر', 'RAV4', 'هايلكس'],
            'honda': ['أكورد', 'سيفيك', 'CR-V', 'HR-V', 'بايلوت'],
            'nissan': ['التيما', 'ماكسيما', 'باترول', 'صني', 'اكس-تريل'],
            'ford': ['F-150', 'إكسبلورر', 'إيدج', 'فيوجن', 'موستانج'],
            'bmw': ['الفئة 3', 'الفئة 5', 'الفئة 7', 'X3', 'X5'],
            'mercedes': ['الفئة C', 'الفئة E', 'الفئة S', 'GLC', 'GLE'],
        };
    }
    
    // معالجة تقديم نموذج البحث
    filterForm.addEventListener('submit', function(event) {
        // منع السلوك الافتراضي للنموذج (لأغراض العرض التجريبي)
        event.preventDefault();
        
        console.log('تم تقديم نموذج الفلاتر');
        
        // في النموذج الأولي، فقط إظهار رسالة نجاح
        showNotification('تم تطبيق الفلاتر بنجاح.', 'success');
    });
}

// ===== إعداد مؤقتات المزادات =====
function setupAuctionTimers() {
    const countdowns = document.querySelectorAll('.time-remaining span');
    
    if (countdowns.length === 0) {
        console.error('لم يتم العثور على مؤقتات المزادات');
        return;
    }
    
    console.log('تم العثور على ' + countdowns.length + ' مؤقت مزاد');
    
    // تحديث المؤقتات كل ثانية
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
            
            // إضافة تأثير وميض للمؤقتات التي على وشك الانتهاء
            const timeRemainingElement = countdown.parentElement;
            if (hours === 0 && minutes < 60) {
                timeRemainingElement.classList.add('ending-soon');
            }
            
            // تلوين المؤقتات بناءً على الوقت المتبقي
            if (hours === 0 && minutes < 30) {
                timeRemainingElement.style.backgroundColor = 'rgba(198, 40, 40, 0.8)';
            } else if (hours < 12) {
                timeRemainingElement.style.backgroundColor = 'rgba(230, 81, 0, 0.8)';
            }
            
            // تنسيق الوقت وتحديث العرض
            countdown.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        });
    }, 1000);
}

// ===== إعداد أقسام الأسئلة الشائعة =====
function setupFaqItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.error('لم يتم العثور على عناصر الأسئلة الشائعة');
        return;
    }
    
    console.log('تم العثور على ' + faqItems.length + ' سؤال شائع');
    
    // تفعيل أول سؤال افتراضياً
    faqItems[0].classList.add('active');
    
    // إضافة مستمع النقر لكل سؤال
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // تبديل حالة العنصر الحالي
                item.classList.toggle('active');
                
                // إغلاق العناصر الأخرى (سلوك الأكورديون)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// ===== إعداد أزرار التذكير للمزادات القادمة =====
function setupReminderButtons() {
    const reminderButtons = document.querySelectorAll('.reminder-btn');
    
    if (reminderButtons.length === 0) {
        console.error('لم يتم العثور على أزرار التذكير');
        return;
    }
    
    console.log('تم العثور على ' + reminderButtons.length + ' زر تذكير');
    
    reminderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // التحقق من حالة تسجيل الدخول
            const isLoggedIn = false; // في التطبيق الحقيقي، سيتم التحقق من حالة تسجيل الدخول
            
            if (!isLoggedIn) {
                showNotification('يرجى تسجيل الدخول أولاً لاستخدام ميزة التذكير بالمزادات.', 'info');
                
                // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول (في التطبيق الحقيقي)
                // في النموذج الأولي، فقط نعرض رسالة
                console.log('إعادة توجيه المستخدم إلى صفحة تسجيل الدخول');
            } else {
                // تبديل حالة التذكير
                button.classList.toggle('active');
                
                if (button.classList.contains('active')) {
                    button.innerHTML = '<i class="fas fa-bell-slash"></i><span>إلغاء التذكير</span>';
                    showNotification('سيتم تذكيرك قبل بدء المزاد بساعة.', 'success');
                } else {
                    button.innerHTML = '<i class="fas fa-bell"></i><span>ذكرني</span>';
                    showNotification('تم إلغاء التذكير.', 'info');
                }
            }
        });
    });
}

// ===== إصلاحات لأنماط صفحة المزادات =====
function fixAuctionsPageStyles() {
    // إضافة أنماط CSS إضافية
    addAuctionsPageStyles();
    
    // إصلاح مشكلة عرض البطاقات على الشاشات الصغيرة
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            // إخفاء قسم الفلاتر تلقائياً على الشاشات الصغيرة
            const filterBody = document.querySelector('.filter-body');
            if (filterBody) {
                filterBody.style.display = 'none';
            }
        } else {
            // إظهار قسم الفلاتر على الشاشات الكبيرة
            const filterBody = document.querySelector('.filter-body');
            if (filterBody) {
                filterBody.style.display = 'block';
            }
        }
    });
}

// ===== إضافة أنماط CSS إضافية =====
function addAuctionsPageStyles() {
    // التحقق من عدم وجود أنماط سابقة
    if (document.getElementById('auctions-page-fix-styles')) {
        return;
    }
    
    // إنشاء عنصر <style>
    const styleElement = document.createElement('style');
    styleElement.id = 'auctions-page-fix-styles';
    
    // محتوى CSS الإضافي
    styleElement.textContent = `
        /* تأثيرات الحركة للمؤقتات */
        @keyframes pulse {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }
        
        .time-remaining.ending-soon i {
            animation: pulse 1s infinite;
            color: #ff5252;
        }
        
        .time-remaining .ended {
            color: white;
            font-weight: 600;
        }
        
        /* تحسين عرض بطاقات المزادات على الأجهزة المحمولة */
        @media (max-width: 576px) {
            .auction-card {
                display: flex;
                flex-direction: column;
            }
            
            .auction-img {
                height: 180px;
            }
            
            .auction-details {
                padding: 15px;
            }
            
            .auction-header h3 {
                font-size: 1.1rem;
            }
            
            .current-bid .value {
                font-size: 1.1rem;
            }
            
            .bids-count .value {
                font-size: 1.1rem;
            }
            
            /* تعديلات على قسم الأسئلة الشائعة */
            .faq-question h3 {
                font-size: 1rem;
            }
        }
        
        /* تحسينات لأزرار التذكير */
        .reminder-btn.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        /* تحسينات لشريط التنقل */
        .pagination-item, .pagination-arrow {
            cursor: pointer;
        }
        
        /* تأثيرات الحركة عند التمرير */
        .auction-card, .upcoming-card, .how-step-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .auction-card.show, .upcoming-card.show, .how-step-card.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* تصحيح مشكلة عرض التصنيفات في بطاقات المزاد */
        .condition-tags {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 5px;
        }
    `;
    
    // إضافة العنصر للـ <head>
    document.head.appendChild(styleElement);
    console.log('تم إضافة أنماط CSS إضافية لصفحة المزادات');
    
    // إضافة تأثيرات الظهور عند التمرير
    setupScrollAnimations();
}

// ===== إعداد تأثيرات الحركة عند التمرير =====
function setupScrollAnimations() {
    // الحصول على جميع العناصر المراد تحريكها
    const animateElements = document.querySelectorAll('.auction-card, .upcoming-card, .how-step-card');
    
    // إضافة تأخير للعناصر المتتابعة
    animateElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // المراقبة المشاهد للتفعيل عند الظهور
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // تفعيل عندما يكون 10% من العنصر مرئي
    });
    
    // مراقبة جميع العناصر
    animateElements.forEach(element => {
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

// ===== إضافة أنماط CSS للإشعارات =====
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