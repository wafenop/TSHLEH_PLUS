/**
 * part-details.js - ملف JavaScript لصفحة تفاصيل القطعة
 * تشليح بلس - سوق قطع غيار السيارات المستعملة
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة صفحة تفاصيل القطعة
    initializePartDetails();
});

function initializePartDetails() {
    // تهيئة معرض الصور
    setupImageGallery();
    
    // تهيئة علامات التبويب
    setupTabs();
    
    // تهيئة زر المشاركة
    setupShareButton();
    
    // تهيئة زر المفضلة
    setupFavoriteButton();
    
    // تهيئة نموذج التحقق من التوافق
    setupCompatibilityForm();
    
    // تهيئة عرض القطع المشابهة
    setupSimilarPartsSlider();
    
    // تهيئة تحميل المزيد من التقييمات
    setupLoadMoreReviews();
}

// ===== تهيئة معرض الصور =====
function setupImageGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // تغيير الصورة الرئيسية
            const newSrc = this.querySelector('img').src.replace('-thumb', '-large');
            mainImage.src = newSrc;
            
            // تحديث الصورة المصغرة النشطة
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // إضافة ميزة تكبير الصورة عند النقر على الصورة الرئيسية
    if (mainImage) {
        mainImage.addEventListener('click', function() {
            openZoomModal(this.src);
        });
    }
}

// فتح نافذة تكبير الصورة
function openZoomModal(imageSrc) {
    // إنشاء عنصر النافذة
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    zoomModal.innerHTML = `
        <div class="zoom-container">
            <button class="zoom-close"><i class="fas fa-times"></i></button>
            <img src="${imageSrc}" alt="صورة مكبرة">
        </div>
    `;
    
    // إضافة النافذة إلى المستند
    document.body.appendChild(zoomModal);
    
    // إظهار النافذة بتأثير بصري
    setTimeout(() => {
        zoomModal.classList.add('active');
    }, 10);
    
    // إضافة مستمع الحدث لزر الإغلاق
    const closeBtn = zoomModal.querySelector('.zoom-close');
    closeBtn.addEventListener('click', function() {
        zoomModal.classList.remove('active');
        
        // إزالة النافذة من DOM بعد انتهاء التأثير
        setTimeout(() => {
            zoomModal.remove();
        }, 300);
    });
    
    // إغلاق النافذة عند النقر خارج الصورة
    zoomModal.addEventListener('click', function(event) {
        if (event.target === zoomModal) {
            zoomModal.classList.remove('active');
            
            setTimeout(() => {
                zoomModal.remove();
            }, 300);
        }
    });
}

// ===== تهيئة علامات التبويب =====
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار واللوحات
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // إضافة الفئة النشطة إلى الزر المنقر عليه
            this.classList.add('active');
            
            // إظهار اللوحة المقابلة
            const tabId = this.dataset.tab;
            const targetPanel = document.getElementById(`${tabId}-panel`);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ===== تهيئة زر المشاركة =====
function setupShareButton() {
    const shareButton = document.querySelector('.btn-share');
    const shareModal = document.getElementById('share-modal');
    const closeButton = document.querySelector('.modal-close');
    const copyLinkButton = document.querySelector('.btn-copy-link');
    const shareUrlInput = document.getElementById('share-url');
    
    if (shareButton && shareModal) {
        // فتح نافذة المشاركة
        shareButton.addEventListener('click', function() {
            shareModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
        });
        
        // إغلاق نافذة المشاركة
        closeButton.addEventListener('click', function() {
            shareModal.classList.remove('active');
            document.body.style.overflow = ''; // إعادة تمكين التمرير
        });
        
        // إغلاق النافذة عند النقر خارجها
        shareModal.addEventListener('click', function(event) {
            if (event.target === shareModal) {
                shareModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // نسخ الرابط
        if (copyLinkButton && shareUrlInput) {
            copyLinkButton.addEventListener('click', function() {
                shareUrlInput.select();
                document.execCommand('copy');
                
                // تغيير نص الزر مؤقتًا
                const originalText = this.textContent;
                
                if (document.documentElement.lang === 'ar') {
                    this.textContent = 'تم النسخ!';
                } else {
                    this.textContent = 'Copied!';
                }
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        }
        
        // إعداد أزرار المشاركة على مواقع التواصل
        setupSocialShareButtons();
    }
}

// إعداد أزرار المشاركة على مواقع التواصل
function setupSocialShareButtons() {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.querySelector('.part-title').textContent);
    
    // واتساب
    const whatsappShare = document.querySelector('.share-option.whatsapp');
    if (whatsappShare) {
        whatsappShare.href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
        whatsappShare.target = '_blank';
    }
    
    // فيسبوك
    const facebookShare = document.querySelector('.share-option.facebook');
    if (facebookShare) {
        facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        facebookShare.target = '_blank';
    }
    
    // تويتر
    const twitterShare = document.querySelector('.share-option.twitter');
    if (twitterShare) {
        twitterShare.href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
        twitterShare.target = '_blank';
    }
    
    // تلجرام
    const telegramShare = document.querySelector('.share-option.telegram');
    if (telegramShare) {
        telegramShare.href = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`;
        telegramShare.target = '_blank';
    }
    
    // البريد الإلكتروني
    const emailShare = document.querySelector('.share-option.email');
    if (emailShare) {
        emailShare.href = `mailto:?subject=${pageTitle}&body=${pageUrl}`;
    }
}

// ===== تهيئة زر المفضلة =====
function setupFavoriteButton() {
    const favoriteButton = document.querySelector('.btn-favorite');
    
    if (favoriteButton) {
        const partId = getPartIdFromUrl(); // الحصول على معرف القطعة من URL
        
        // التحقق من حالة المفضلة
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        // تعيين الحالة الأولية
        if (favorites.includes(partId)) {
            favoriteButton.classList.add('active');
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i>';
        }
        
        // إضافة مستمع الحدث
        favoriteButton.addEventListener('click', function() {
            // تحديث قائمة المفضلة
            favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            if (favorites.includes(partId)) {
                // إزالة من المفضلة
                favorites = favorites.filter(id => id !== partId);
                favoriteButton.classList.remove('active');
                favoriteButton.innerHTML = '<i class="far fa-heart"></i>';
                
                // إظهار إشعار
                showNotification('تمت إزالة القطعة من المفضلة', 'info');
            } else {
                // إضافة إلى المفضلة
                favorites.push(partId);
                favoriteButton.classList.add('active');
                favoriteButton.innerHTML = '<i class="fas fa-heart"></i>';
                
                // إظهار إشعار
                showNotification('تمت إضافة القطعة إلى المفضلة', 'success');
            }
            
            // حفظ التغييرات
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    }
}

// الحصول على معرف القطعة من URL
function getPartIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1'; // إرجاع 1 كافتراضي إذا لم يتم تحديد معرف
}

// ===== تهيئة نموذج التحقق من التوافق =====
function setupCompatibilityForm() {
    const compatibilityForm = document.querySelector('.compatibility-form');
    const compatibilityResult = document.querySelector('.compatibility-result');
    
    if (compatibilityForm && compatibilityResult) {
        // إضافة مستمع الحدث للنموذج
        compatibilityForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // في النموذج التجريبي، نفترض أن السيارة متوافقة دائمًا
            // في التطبيق الحقيقي، سيكون هناك تحقق من البيانات من الخادم
            
            // إظهار نتيجة التوافق
            compatibilityResult.style.display = 'flex';
            
            // تمرير التمرير إلى نتيجة التوافق
            compatibilityResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        
        // إعداد القوائم المنسدلة المتسلسلة
        setupDependentDropdowns();
    }
}

// إعداد القوائم المنسدلة المتسلسلة
function setupDependentDropdowns() {
    const makeSelect = document.getElementById('check-make');
    const modelSelect = document.getElementById('check-model');
    
    if (makeSelect && modelSelect) {
        makeSelect.addEventListener('change', function() {
            // إعادة تعيين قائمة الموديلات
            modelSelect.innerHTML = '<option value="">اختر الموديل</option>';
            
            // الحصول على الشركة المصنعة المحددة
            const selectedMake = this.value;
            
            // إضافة الموديلات المناسبة
            if (selectedMake === 'toyota') {
                addOption(modelSelect, 'camry', 'كامري');
                addOption(modelSelect, 'corolla', 'كورولا');
                addOption(modelSelect, 'avalon', 'أفالون');
                addOption(modelSelect, 'rav4', 'راف 4');
                addOption(modelSelect, 'landcruiser', 'لاند كروزر');
            } else if (selectedMake === 'honda') {
                addOption(modelSelect, 'accord', 'أكورد');
                addOption(modelSelect, 'civic', 'سيفيك');
                addOption(modelSelect, 'crv', 'سي آر في');
                addOption(modelSelect, 'pilot', 'بايلوت');
            } else if (selectedMake === 'nissan') {
                addOption(modelSelect, 'altima', 'التيما');
                addOption(modelSelect, 'maxima', 'ماكسيما');
                addOption(modelSelect, 'patrol', 'باترول');
                addOption(modelSelect, 'sunny', 'صني');
            } else if (selectedMake === 'ford') {
                addOption(modelSelect, 'fusion', 'فيوجن');
                addOption(modelSelect, 'taurus', 'توروس');
                addOption(modelSelect, 'explorer', 'إكسبلورر');
                addOption(modelSelect, 'edge', 'ايدج');
            }
        });
    }
}

// إضافة خيار إلى القائمة المنسدلة
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// ===== تهيئة عرض القطع المشابهة =====
function setupSimilarPartsSlider() {
    // تنفيذ وهمي لعرض الشرائح
    // في التطبيق الحقيقي، يمكن استخدام مكتبة مثل Swiper.js
    
    const partsSlider = document.querySelector('.parts-slider');
    
    if (partsSlider) {
        // إضافة أزرار التنقل للعرض المتحرك
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav next';
        nextButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        // إضافة الأزرار إلى العرض
        const sliderContainer = partsSlider.parentElement;
        sliderContainer.style.position = 'relative';
        sliderContainer.appendChild(prevButton);
        sliderContainer.appendChild(nextButton);
        
        // إضافة التفاعل
        let scrollAmount = 300;
        
        nextButton.addEventListener('click', function() {
            partsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        prevButton.addEventListener('click', function() {
            partsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // تعديل المظهر والأداء لأجهزة الجوال
        if (window.innerWidth < 768) {
            // تحويل العرض إلى عرض متحرك أفقي
            partsSlider.style.display = 'flex';
            partsSlider.style.overflowX = 'auto';
            partsSlider.style.scrollSnapType = 'x mandatory';
            partsSlider.style.scrollPadding = '0 1rem';
            partsSlider.style.scrollbarWidth = 'none'; // إخفاء شريط التمرير في Firefox
            
            // تعديل نمط البطاقات
            const partCards = partsSlider.querySelectorAll('.part-card');
            partCards.forEach(card => {
                card.style.minWidth = '85%';
                card.style.scrollSnapAlign = 'center';
                card.style.marginRight = '1rem';
            });
        }
    }
}

// ===== تهيئة تحميل المزيد من التقييمات =====
function setupLoadMoreReviews() {
    const loadMoreButton = document.querySelector('.review-load-more button');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // في التطبيق التجريبي، نقوم بإضافة المزيد من التقييمات الوهمية
            const reviewsList = document.querySelector('.reviews-list');
            
            // إظهار مؤشر التحميل
            loadMoreButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            
            // محاكاة الاتصال بالخادم
            setTimeout(() => {
                // إنشاء تقييمات جديدة
                for (let i = 0; i < 2; i++) {
                    const newReview = createDummyReview();
                    
                    // إدراج التقييم قبل زر "تحميل المزيد"
                    reviewsList.insertBefore(newReview, document.querySelector('.review-load-more'));
                }
                
                // إعادة تعيين نص الزر
                if (document.documentElement.lang === 'ar') {
                    loadMoreButton.textContent = 'تحميل المزيد من التقييمات';
                } else {
                    loadMoreButton.textContent = 'Load More Reviews';
                }
                
                // إخفاء الزر بعد تحميل كل التقييمات
                if (document.querySelectorAll('.review-item').length >= 8) {
                    document.querySelector('.review-load-more').style.display = 'none';
                }
            }, 1000);
        });
    }
}

// إنشاء تقييم وهمي
function createDummyReview() {
    // بيانات وهمية للتقييم
    const names = ['محمد العتيبي', 'خالد السويلم', 'عبدالله القحطاني', 'فيصل الشمري', 'سعود الدوسري'];
    const dates = ['5 مارس 2025', '22 فبراير 2025', '17 فبراير 2025', '10 فبراير 2025'];
    const ratings = [5, 4, 4, 3, 5];
    const contents = [
        'قطعة ممتازة وبسعر معقول جداً. التشليح كان متعاون ووفر لي جميع المعلومات اللازمة.',
        'قطعة جيدة ولكن وصلت متأخرة قليلاً عما كان متوقعاً. بخلاف ذلك كل شيء ممتاز.',
        'جودة القطعة أفضل مما توقعت. لا توجد خدوش أو عيوب وتم تركيبها بسهولة.',
        'السعر مناسب والقطعة بحالة جيدة. أنصح بالتعامل مع هذا التشليح.'
    ];
    
    // إنشاء عنصر التقييم
    const reviewEl = document.createElement('div');
    reviewEl.className = 'review-item';
    
    // اختيار قيم عشوائية
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomDate = dates[Math.floor(Math.random() * dates.length)];
    const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    const avatarIndex = Math.floor(Math.random() * 5) + 1;
    
    // بناء HTML للتقييم
    reviewEl.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">
                    <img src="images/avatar-${avatarIndex}.jpg" alt="صورة المستخدم">
                </div>
                <div class="reviewer-meta">
                    <div class="reviewer-name">${randomName}</div>
                    <div class="review-date">${randomDate}</div>
                </div>
            </div>
            <div class="review-rating">
                ${generateStarRating(randomRating)}
            </div>
        </div>
        <div class="review-content">
            <p>${randomContent}</p>
        </div>
    `;
    
    return reviewEl;
}

// إنشاء HTML لتقييم النجوم
function generateStarRating(rating) {
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// ===== عرض إشعار =====
function showNotification(message, type = 'info') {
    // التحقق من وجود إشعار حالي
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الإشعار إلى المستند
    document.body.appendChild(notification);
    
    // تأثير الظهور
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // ضبط مؤقت لإخفاء الإشعار
    setTimeout(() => {
        notification.classList.remove('show');
        
        // إزالة الإشعار من DOM بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // إضافة مستمع الحدث لزر الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('show');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
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

// ===== إضافة أنماط CSS الإضافية =====
function addExtraStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            padding: 15px 20px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 450px;
            transition: transform 0.3s ease, opacity 0.3s ease;
            opacity: 0;
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
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
        
        .notification.success i {
            color: var(--success-color);
        }
        
        .notification.info i {
            color: var(--accent-color);
        }
        
        .notification.warning i {
            color: var(--warning-color);
        }
        
        .notification.error i {
            color: var(--danger-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--gray-600);
            cursor: pointer;
            font-size: 16px;
        }
        
        .zoom-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1100;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .zoom-modal.active {
            opacity: 1;
        }
        
        .zoom-container {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .zoom-container img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        
        .zoom-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
        
        .slider-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: white;
            border: none;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            color: var(--primary-color);
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .slider-nav.prev {
            right: -20px;
        }
        
        .slider-nav.next {
            left: -20px;
        }
        
        @media (max-width: 768px) {
            .notification {
                min-width: unset;
                width: 90%;
            }
            
            .slider-nav {
                width: 30px;
                height: 30px;
                font-size: 14px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// إضافة الأنماط الإضافية عند تحميل المستند
document.addEventListener('DOMContentLoaded', addExtraStyles);