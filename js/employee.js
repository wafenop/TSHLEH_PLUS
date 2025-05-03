/**
 * employee.js - ملف JavaScript لصفحة الموظف
 * تشليح بلس - سوق قطع غيار السيارات المستعملة
 * نسخة محسنة للتوافق مع الأجهزة المحمولة
 */

// تأكيد تحميل الملف
console.log('تم تحميل employee.js بنجاح');

// تنفيذ الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل صفحة الموظف بالكامل');
    
    // إصلاح مشكلة توافق الصفحة مع الأجهزة المحمولة
    fixMobileLayout();
    
    // تهيئة اختيار التشليح
    setupYardSelection();
    
    // تهيئة تبديل الأقسام
    setupSectionToggle();
    
    // تهيئة نموذج إدارة القطع
    setupPartsForm();
    
    // تهيئة نموذج تسجيل السيارات
    setupVehicleForm();
    
    // تهيئة منطقة رفع الصور
    setupImageUpload();
    
    // تهيئة أزرار الإجراءات
    setupActionButtons();
    
    // تهيئة إشعارات الخطأ للميزات غير المتاحة
    setupErrorNotifications();
    
    // تهيئة روابط القائمة الجانبية غير النشطة
    setupInactiveNavLinks();
    
    // مراقبة تغيير حجم النافذة لإعادة الضبط
    window.addEventListener('resize', function() {
        fixMobileLayout();
    });
});

// ===== إصلاح مشكلة توافق الصفحة مع الأجهزة المحمولة =====
function fixMobileLayout() {
    // التأكد من عدم تجاوز العناصر لعرض الشاشة
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // التأكد من أن جميع العناصر الرئيسية لها عرض مناسب
    const mainElements = [
        '.employee-dashboard-container',
        '.employee-sidebar',
        '.employee-content',
        '.recent-vehicles',
        '.recent-parts',
        '.vehicles-table-container',
        '.parts-table-container',
        '.form-section',
        '.parts-form-container',
        '.vehicle-form-container'
    ];
    
    // ضبط الخصائص لكل عنصر
    mainElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.maxWidth = '100%';
            element.style.boxSizing = 'border-box';
        });
    });
    
    // تحسين عرض الجداول على الأجهزة المحمولة
    fixTablesForMobile();
    
    // تحسين النماذج للأجهزة المحمولة
    if (window.innerWidth <= 768) {
        optimizeFormsForMobile();
    }
    
    // إضافة دعم RTL للأجهزة المحمولة
    if (document.documentElement.dir === 'rtl') {
        fixRTLForMobile();
    }
}

// ===== تحسين عرض الجداول على الأجهزة المحمولة =====
function fixTablesForMobile() {
    const tableContainers = document.querySelectorAll('.vehicles-table-container, .parts-table-container');
    
    tableContainers.forEach(container => {
        // التحقق من الحاجة للتمرير الأفقي
        const table = container.querySelector('table');
        const containerWidth = container.clientWidth;
        const tableWidth = table ? table.scrollWidth : 0;
        
        // إذا كان الجدول أعرض من الحاوية
        if (tableWidth > containerWidth) {
            // تأكد من إمكانية التمرير
            container.style.overflowX = 'auto';
            container.style.WebkitOverflowScrolling = 'touch';
            
            // إضافة تلميح للتمرير إذا لم يكن موجوداً
            if (!container.previousElementSibling || !container.previousElementSibling.classList.contains('table-scroll-hint')) {
                const scrollHint = document.createElement('div');
                scrollHint.className = 'table-scroll-hint';
                scrollHint.textContent = document.documentElement.dir === 'rtl' ? 
                    '← مرر للمزيد →' : '← Scroll for more →';
                scrollHint.style.textAlign = 'center';
                scrollHint.style.fontSize = '0.8rem';
                scrollHint.style.color = '#777';
                scrollHint.style.marginBottom = '0.5rem';
                
                container.parentNode.insertBefore(scrollHint, container);
            }
        }
    });
}

// ===== تحسين النماذج للأجهزة المحمولة =====
function optimizeFormsForMobile() {
    // تعديل حجم الخط لجميع النماذج لمنع تكبير iOS التلقائي
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.style.fontSize = '16px';
    });
    
    // تعديل أزرار الإرسال للنماذج
    const formActions = document.querySelectorAll('.form-actions');
    formActions.forEach(actions => {
        if (window.innerWidth <= 768) {
            actions.style.flexDirection = 'column';
            
            const buttons = actions.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.width = '100%';
                button.style.marginBottom = '0.5rem';
            });
        } else {
            actions.style.flexDirection = 'row';
            
            const buttons = actions.querySelectorAll('button');
            buttons.forEach(button => {
                button.style.width = 'auto';
                button.style.marginBottom = '0';
            });
        }
    });
    
    // تحسين حجم منطقة رفع الصور
    const uploadDropzones = document.querySelectorAll('.upload-dropzone');
    uploadDropzones.forEach(dropzone => {
        if (window.innerWidth <= 768) {
            dropzone.style.padding = '1.5rem 1rem';
        } else {
            dropzone.style.padding = '2rem';
        }
    });
}

// ===== إصلاح دعم RTL للأجهزة المحمولة =====
function fixRTLForMobile() {
    // التأكد من الاتجاه الصحيح للعناصر في وضع RTL
    document.querySelectorAll('.employee-dashboard-container, .form-grid, .vehicles-table, .parts-table').forEach(element => {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
    });
    
    // التأكد من محاذاة النص بشكل صحيح في الجداول
    document.querySelectorAll('.vehicles-table th, .vehicles-table td, .parts-table th, .parts-table td').forEach(cell => {
        cell.style.textAlign = 'right';
    });
    
    // تعديل مظهر معلومات الموظف
    const employeeInfo = document.querySelector('.employee-info');
    if (employeeInfo && window.innerWidth <= 768) {
        employeeInfo.style.flexDirection = 'row';
        employeeInfo.style.textAlign = 'right';
        
        const avatar = employeeInfo.querySelector('.employee-avatar');
        if (avatar) {
            avatar.style.marginLeft = '0.75rem';
            avatar.style.marginBottom = '0';
        }
    }
}

// ===== تهيئة اختيار التشليح =====
function setupYardSelection() {
    const yardSelect = document.getElementById('active-yard');
    
    if (!yardSelect) {
        console.error('لم يتم العثور على عنصر اختيار التشليح');
        return;
    }
    
    // استمع لتغيير التشليح
    yardSelect.addEventListener('change', function() {
        const selectedYardId = this.value;
        const selectedYardName = this.options[this.selectedIndex].textContent;
        
        // إظهار إشعار بالتشليح المختار
        showNotification(
            document.documentElement.lang === 'ar' 
                ? `تم تغيير التشليح النشط إلى: ${selectedYardName}`
                : `Active salvage yard changed to: ${selectedYardName}`,
            'info'
        );
        
        console.log(`تم اختيار التشليح: ${selectedYardName} (ID: ${selectedYardId})`);
    });
}

// ===== تهيئة تبديل الأقسام =====
function setupSectionToggle() {
    const sectionToggleButtons = document.querySelectorAll('.toggle-section');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (sectionToggleButtons.length === 0 || contentSections.length === 0) {
        console.error('لم يتم العثور على أزرار تبديل الأقسام أو الأقسام نفسها');
        return;
    }
    
    // تبديل القسم النشط عند النقر على الزر
    sectionToggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على معرف القسم المستهدف
            const targetSectionId = this.getAttribute('data-section') + '-section';
            const targetSection = document.getElementById(targetSectionId);
            
            if (!targetSection) {
                console.error(`لم يتم العثور على القسم المستهدف: ${targetSectionId}`);
                return;
            }
            
            // إزالة الفئة النشطة من جميع الأزرار والأقسام
            sectionToggleButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر والقسم المستهدف
            this.classList.add('active');
            targetSection.classList.add('active');
            
            // التمرير إلى القسم المستهدف على الأجهزة المحمولة
            if (window.innerWidth <= 768) {
                targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });
}

// ===== تهيئة نموذج إدارة القطع =====
function setupPartsForm() {
    const partsForm = document.getElementById('parts-management-form');
    const manufacturerSelect = document.getElementById('vehicle-manufacturer');
    const modelSelect = document.getElementById('vehicle-model');
    
    if (!partsForm || !manufacturerSelect || !modelSelect) {
        console.warn('قد لا تكون بعض عناصر نموذج إدارة القطع موجودة');
        return;
    }
    
    // تهيئة القوائم المنسدلة المتسلسلة (الشركة المصنعة والموديل)
    manufacturerSelect.addEventListener('change', function() {
        // إفراغ قائمة الموديلات
        modelSelect.innerHTML = '';
        
        // إضافة الخيار الافتراضي
        addOption(modelSelect, '', 'Select Model', 'اختر الموديل');
        
        // الحصول على الشركة المصنعة المحددة
        const manufacturer = this.value;
        
        if (manufacturer) {
            // إضافة الموديلات بناءً على الشركة المصنعة
            const models = getModelsForManufacturer(manufacturer);
            
            // إضافة خيارات الموديلات
            models.forEach(model => {
                addOption(modelSelect, model.value, model.en, model.ar);
            });
        }
    });
    
    // معالجة إرسال نموذج القطع
    partsForm.addEventListener('submit', function(event) {
        // منع السلوك الافتراضي للنموذج
        event.preventDefault();
        
        // التحقق من صحة البيانات
        if (validateForm(this)) {
            // في النموذج الأولي، فقط إظهار إشعار نجاح
            showNotification(
                document.documentElement.lang === 'ar' 
                    ? 'تم إضافة القطعة بنجاح إلى المخزون'
                    : 'Part successfully added to inventory',
                'success'
            );
            
            // إعادة تعيين النموذج
            this.reset();
            
            // إعادة تعيين معاينة الصور
            resetImagePreview('part-images');
        }
    });
}

// ===== تهيئة نموذج تسجيل السيارات =====
function setupVehicleForm() {
    const vehicleForm = document.getElementById('vehicle-registration-form');
    
    if (!vehicleForm) {
        console.warn('نموذج تسجيل السيارات غير موجود');
        return;
    }
    
    // معالجة إرسال نموذج السيارات
    vehicleForm.addEventListener('submit', function(event) {
        // منع السلوك الافتراضي للنموذج
        event.preventDefault();
        
        // التحقق من صحة البيانات
        if (validateForm(this)) {
            // في النموذج الأولي، فقط إظهار إشعار نجاح
            showNotification(
                document.documentElement.lang === 'ar' 
                    ? 'تم تسجيل بيانات السيارة بنجاح'
                    : 'Vehicle data has been registered successfully',
                'success'
            );
            
            // إعادة تعيين النموذج
            this.reset();
            
            // إعادة تعيين معاينة الصور
            resetImagePreview('vehicle-images');
        }
    });
}

// ===== إضافة خيار إلى القائمة المنسدلة =====
function addOption(selectElement, value, textEn, textAr) {
    const option = document.createElement('option');
    option.value = value;
    option.setAttribute('data-en', textEn);
    option.setAttribute('data-ar', textAr);
    option.textContent = document.documentElement.lang === 'ar' ? textAr : textEn;
    selectElement.appendChild(option);
}

// ===== الحصول على موديلات السيارات حسب الشركة المصنعة =====
function getModelsForManufacturer(manufacturer) {
    const modelsMap = {
        'toyota': [
            { value: 'camry', en: 'Camry', ar: 'كامري' },
            { value: 'corolla', en: 'Corolla', ar: 'كورولا' },
            { value: 'landcruiser', en: 'Land Cruiser', ar: 'لاند كروزر' },
            { value: 'rav4', en: 'RAV4', ar: 'راف 4' },
            { value: 'avalon', en: 'Avalon', ar: 'أفالون' },
            { value: 'hilux', en: 'Hilux', ar: 'هايلكس' }
        ],
        'honda': [
            { value: 'accord', en: 'Accord', ar: 'أكورد' },
            { value: 'civic', en: 'Civic', ar: 'سيفيك' },
            { value: 'crv', en: 'CR-V', ar: 'سي آر في' },
            { value: 'pilot', en: 'Pilot', ar: 'بايلوت' },
            { value: 'hrv', en: 'HR-V', ar: 'إتش آر في' }
        ],
        'nissan': [
            { value: 'altima', en: 'Altima', ar: 'التيما' },
            { value: 'maxima', en: 'Maxima', ar: 'ماكسيما' },
            { value: 'patrol', en: 'Patrol', ar: 'باترول' },
            { value: 'sunny', en: 'Sunny', ar: 'صني' },
            { value: 'xtrail', en: 'X-Trail', ar: 'إكس-تريل' }
        ],
        'ford': [
            { value: 'f150', en: 'F-150', ar: 'إف-150' },
            { value: 'explorer', en: 'Explorer', ar: 'إكسبلورر' },
            { value: 'escape', en: 'Escape', ar: 'إسكيب' },
            { value: 'edge', en: 'Edge', ar: 'إيدج' },
            { value: 'mustang', en: 'Mustang', ar: 'موستانج' }
        ],
        'bmw': [
            { value: '3series', en: '3 Series', ar: 'الفئة الثالثة' },
            { value: '5series', en: '5 Series', ar: 'الفئة الخامسة' },
            { value: '7series', en: '7 Series', ar: 'الفئة السابعة' },
            { value: 'x3', en: 'X3', ar: 'إكس 3' },
            { value: 'x5', en: 'X5', ar: 'إكس 5' }
        ],
        'mercedes': [
            { value: 'cclass', en: 'C-Class', ar: 'الفئة C' },
            { value: 'eclass', en: 'E-Class', ar: 'الفئة E' },
            { value: 'sclass', en: 'S-Class', ar: 'الفئة S' },
            { value: 'gclass', en: 'G-Class', ar: 'الفئة G' },
            { value: 'glc', en: 'GLC', ar: 'جي إل سي' }
        ],
        'hyundai': [
            { value: 'elantra', en: 'Elantra', ar: 'إلنترا' },
            { value: 'sonata', en: 'Sonata', ar: 'سوناتا' },
            { value: 'tucson', en: 'Tucson', ar: 'توسان' },
            { value: 'santafe', en: 'Santa Fe', ar: 'سانتافي' },
            { value: 'accent', en: 'Accent', ar: 'أكسنت' }
        ],
        'kia': [
            { value: 'optima', en: 'Optima', ar: 'أوبتيما' },
            { value: 'sportage', en: 'Sportage', ar: 'سبورتاج' },
            { value: 'sorento', en: 'Sorento', ar: 'سورينتو' },
            { value: 'cerato', en: 'Cerato', ar: 'سيراتو' },
            { value: 'rio', en: 'Rio', ar: 'ريو' }
        ]
    };
    
    return modelsMap[manufacturer] || [];
}

// ===== التحقق من صحة النموذج =====
function validateForm(form) {
    let isValid = true;
    
    // الحصول على الحقول المطلوبة
    const requiredFields = form.querySelectorAll('[required]');
    
    // التحقق من كل حقل مطلوب
    requiredFields.forEach(field => {
        // إزالة أي رسائل خطأ سابقة
        removeError(field);
        
        if (field.type === 'file') {
            // التحقق من تحميل ملف على الأقل
            if (field.files.length === 0) {
                showError(field, 
                    document.documentElement.lang === 'ar' 
                        ? 'يرجى تحميل صورة واحدة على الأقل'
                        : 'Please upload at least one image'
                );
                isValid = false;
            }
        } else {
            // التحقق من أن الحقل غير فارغ
            if (!field.value.trim()) {
                showError(field, 
                    document.documentElement.lang === 'ar' 
                        ? 'هذا الحقل مطلوب'
                        : 'This field is required'
                );
                isValid = false;
            }
        }
    });
    
    // التحقق من رقم الهيكل إذا تم إدخاله
    const chassisNumberField = form.querySelector('#chassis-number');
    if (chassisNumberField && chassisNumberField.value.trim()) {
        // نمط بسيط للتحقق من رقم الهيكل (VIN) - 17 حرف/رقم
        const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/i;
        
        if (!vinPattern.test(chassisNumberField.value.trim())) {
            showError(chassisNumberField, 
                document.documentElement.lang === 'ar' 
                    ? 'رقم الهيكل غير صالح. يجب أن يتكون من 17 حرف/رقم'
                    : 'Invalid chassis number. Must be 17 characters/digits'
            );
            isValid = false;
        }
    }
    
    // التحقق من صحة حقل السعر
    const priceField = form.querySelector('#part-price');
    if (priceField && priceField.value.trim()) {
        const price = parseFloat(priceField.value);
        if (isNaN(price) || price <= 0) {
            showError(priceField, 
                document.documentElement.lang === 'ar' 
                    ? 'الرجاء إدخال سعر صالح (أكبر من صفر)'
                    : 'Please enter a valid price (greater than zero)'
            );
            isValid = false;
        }
    }
    
    return isValid;
}

// ===== إظهار رسالة خطأ للحقل =====
function showError(field, message) {
    // إضافة فئة الخطأ للحقل
    field.classList.add('is-invalid');
    
    // إنشاء عنصر لرسالة الخطأ
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    
    // إضافة رسالة الخطأ بعد الحقل
    const parent = field.parentElement;
    const existingError = parent.querySelector('.error-message');
    if (!existingError) {
        parent.appendChild(errorElement);
    }
    
    // إضافة مستمع الحدث لإزالة حالة الخطأ عند تغيير القيمة
    field.addEventListener('input', function onInput() {
        removeError(field);
        field.removeEventListener('input', onInput);
    }, { once: true });
}

// ===== إزالة رسالة الخطأ من الحقل =====
function removeError(field) {
    // إزالة فئة الخطأ
    field.classList.remove('is-invalid');
    
    // البحث عن رسالة الخطأ وإزالتها
    const parent = field.parentElement;
    const errorElement = parent.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== تهيئة منطقة رفع الصور =====
function setupImageUpload() {
    setupSingleUploadArea('part-images');
    setupSingleUploadArea('vehicle-images');
}

// ===== تهيئة منطقة رفع الصور الفردية =====
function setupSingleUploadArea(inputId) {
    const fileInput = document.getElementById(inputId);
    if (!fileInput) return;
    
    const dropzone = fileInput.closest('.upload-dropzone');
    const previewContainer = fileInput.closest('.upload-container').querySelector('.upload-preview');
    
    if (!dropzone || !previewContainer) {
        console.error(`لم يتم العثور على عناصر رفع الصور الضرورية لـ ${inputId}`);
        return;
    }
    
    // فتح متصفح الملفات عند النقر على منطقة الإفلات
    dropzone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // التعامل مع سحب الملفات وإفلاتها
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropzone.classList.add('active');
    });
    
    dropzone.addEventListener('dragleave', function() {
        dropzone.classList.remove('active');
    });
    
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropzone.classList.remove('active');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateImagePreview(fileInput, previewContainer);
        }
    });
    
    // التعامل مع تغيير اختيار الملفات
    fileInput.addEventListener('change', function() {
        updateImagePreview(this, previewContainer);
    });
}

// ===== تحديث معاينة الصور =====
function updateImagePreview(fileInput, previewContainer) {
    if (!fileInput || !previewContainer) return;
    
    // إفراغ حاوية المعاينة
    previewContainer.innerHTML = '';
    
    // التحقق من عدد الملفات (بحد أقصى 5 صور)
    const maxFiles = 5;
    const filesToShow = Array.from(fileInput.files).slice(0, maxFiles);
    
    // إظهار رسالة إذا تجاوز عدد الملفات الحد المسموح
    if (fileInput.files.length > maxFiles) {
        showNotification(
            document.documentElement.lang === 'ar' 
                ? `يمكنك رفع 5 صور كحد أقصى. تم اختيار أول ${maxFiles} صور.`
                : `You can upload a maximum of 5 images. First ${maxFiles} selected.`,
            'warning'
        );
    }
    
    // إضافة معاينات الصور
    filesToShow.forEach(file => {
        // التحقق من أن الملف هو صورة
        if (!file.type.startsWith('image/')) {
            showNotification(
                document.documentElement.lang === 'ar' 
                    ? `الملف "${file.name}" ليس صورة ولن يتم رفعه.`
                    : `File "${file.name}" is not an image and won't be uploaded.`,
                'error'
            );
            return;
        }
        
        // التحقق من حجم الملف (بحد أقصى 5 ميجابايت)
        if (file.size > 5 * 1024 * 1024) {
            showNotification(
                document.documentElement.lang === 'ar' 
                    ? `الملف "${file.name}" أكبر من 5 ميجابايت ولن يتم رفعه.`
                    : `File "${file.name}" is larger than 5MB and won't be uploaded.`,
                'error'
            );
            return;
        }
        
        // إنشاء عنصر المعاينة
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        // تجهيز المعاينة باستخدام FileReader
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewItem.innerHTML = `
                <div class="preview-image">
                    <img src="${e.target.result}" alt="${file.name}">
                    <button type="button" class="preview-remove" title="إزالة">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="preview-info">
<span class="preview-name">${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}</span>
                </div>
            `;
            
            // إضافة حدث النقر لزر الإزالة
            const removeButton = previewItem.querySelector('.preview-remove');
            if (removeButton) {
                removeButton.addEventListener('click', function() {
                    previewItem.remove();
                });
            }
            
            // إضافة المعاينة إلى الحاوية
            previewContainer.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    });
}

// ===== إعادة تعيين معاينة الصور =====
function resetImagePreview(inputId) {
    const fileInput = document.getElementById(inputId);
    if (!fileInput) return;
    
    const previewContainer = fileInput.closest('.upload-container').querySelector('.upload-preview');
    
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    
    // إعادة تعيين حقل الملف
    fileInput.value = '';
}

// ===== تهيئة أزرار الإجراءات =====
function setupActionButtons() {
    // أزرار عرض تفاصيل القطع/السيارات
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showUnavailableFeatureError();
        });
    });
    
    // أزرار تعديل بيانات القطع/السيارات
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showUnavailableFeatureError();
        });
    });
    
    // أزرار إدارة القطع (في جدول السيارات)
    const partsButtons = document.querySelectorAll('.parts-btn');
    partsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showUnavailableFeatureError();
        });
    });
    
    // أزرار حذف القطع
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showUnavailableFeatureError();
        });
    });
    
    // أزرار عرض الكل
    const viewAllButtons = document.querySelectorAll('.view-more .btn');
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showUnavailableFeatureError();
        });
    });
    
    // تحسين منطقة اللمس على الأجهزة المحمولة
    if (window.innerWidth <= 768) {
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.style.minHeight = '36px';
            btn.style.minWidth = '36px';
        });
    }
}

// ===== تهيئة روابط القائمة الجانبية غير النشطة =====
function setupInactiveNavLinks() {
    // أزرار التنقل باستثناء الأزرار النشطة وأزرار تبديل الأقسام
    const inactiveNavLinks = document.querySelectorAll('.employee-nav a:not(.active):not(.toggle-section)');
    inactiveNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showUnavailableFeatureError();
        });
    });
}

// ===== تهيئة إشعارات الخطأ للميزات غير المتاحة =====
function setupErrorNotifications() {
    const notification = document.querySelector('.notification');
    
    if (notification) {
        // إعداد زر إغلاق الإشعار
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                hideNotification(notification);
            });
        }
    }
}

// ===== إظهار إشعار خطأ للميزات غير المتاحة =====
function showUnavailableFeatureError() {
    showNotification(
        document.documentElement.lang === 'ar' 
            ? 'هذه الميزة غير متوفرة في النموذج الأولي'
            : 'This feature is not available in the prototype',
        'error'
    );
}

// ===== إظهار إشعار =====
function showNotification(message, type = 'info') {
    // البحث عن الإشعار الموجود أو إنشاء واحد جديد
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        // إنشاء إشعار جديد
        notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // إنشاء محتوى الإشعار
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        // إضافة أيقونة مناسبة
        const icon = document.createElement('i');
        icon.className = `fas ${getNotificationIcon(type)}`;
        
        // إضافة نص الرسالة
        const text = document.createElement('p');
        text.textContent = message;
        
        // إضافة زر الإغلاق
        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        
        // تجميع العناصر
        content.appendChild(icon);
        content.appendChild(text);
        notification.appendChild(content);
        notification.appendChild(closeButton);
        
        // إضافة الإشعار إلى المستند
        document.body.appendChild(notification);
        
        // إضافة حدث النقر لزر الإغلاق
        closeButton.addEventListener('click', function() {
            hideNotification(notification);
        });
    } else {
        // تحديث الإشعار الموجود
        notification.className = `notification ${type}`;
        
        // تحديث الأيقونة
        const icon = notification.querySelector('.notification-content i');
        if (icon) {
            icon.className = `fas ${getNotificationIcon(type)}`;
        }
        
        // تحديث النص
        const text = notification.querySelector('.notification-content p');
        if (text) {
            text.textContent = message;
        }
    }
    
    // تكييف موضع الإشعار بناءً على حجم الشاشة
    adjustNotificationPosition(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار تلقائيًا بعد فترة
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

// ===== ضبط موضع الإشعار حسب حجم الشاشة =====
function adjustNotificationPosition(notification) {
    if (window.innerWidth <= 576) {
        // للشاشات الصغيرة جدًا
        notification.style.maxWidth = '90%';
        notification.style.width = '90%';
        notification.style.right = '5%';
        notification.style.left = '5%';
        notification.style.top = '20px';
    } else if (window.innerWidth <= 768) {
        // للشاشات المتوسطة
        notification.style.maxWidth = '350px';
        notification.style.width = 'auto';
        notification.style.top = '20px';
        
        if (document.documentElement.dir === 'rtl') {
            notification.style.right = '20px';
            notification.style.left = 'auto';
        } else {
            notification.style.left = '20px';
            notification.style.right = 'auto';
        }
    }
}

// ===== إخفاء الإشعار =====
function hideNotification(notification) {
    if (!notification) return;
    
    notification.classList.remove('show');
    
    // إزالة الإشعار من DOM بعد انتهاء الرسوم المتحركة
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
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

// ===== إضافة مستمع حدث لتحسين العرض عند تغيير حجم النافذة =====
window.addEventListener('resize', function() {
    // تحديث الإشعارات الحالية
    const notification = document.querySelector('.notification.show');
    if (notification) {
        adjustNotificationPosition(notification);
    }
    
    // تحديث الجداول
    fixTablesForMobile();
    
    // تحديث النماذج
    if (window.innerWidth <= 768) {
        optimizeFormsForMobile();
    }
});

// ===== مساعدة المطورين في وضع التصحيح =====
function debug(message) {
    // اضبط هذا المتغير إلى true لعرض رسائل التصحيح
    const enableDebug = false;
    
    if (enableDebug && console) {
        console.log('[DEBUG] ' + message);
    }
}
