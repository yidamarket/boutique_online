// ========== shop.js ==========
let currentLang = 'fr';
let products = [];
let cart = [];
let currentClient = null;
let activePromotions = [];
let pointsConfig = null;
let appliedCoupon = null;
let couponDiscount = 0;
let originalSubtotal = 0;
let usePoints = false;
let pointsDiscount = 0;
let pointsToUse = 0;
let currentCategory = 'all';

let currentPromotionDiscount = 0;    // 当前促销折扣金额
let currentAppliedPromotions = [];  // 当前使用的促销活动数组
// 分类标签映射
const categoryLabels = {
    'dry': { fr: 'Sec', zh: '干货' },
    'frozen': { fr: 'Surgelé', zh: '速冻' },
    'fresh': { fr: 'Frais', zh: '生鲜' },
    'nonfood': { fr: 'Hygiène', zh: '卫生用品' },
    'drinks': { fr: 'Boissons', zh: '酒水' },
    'bangkok': { fr: 'Bangkok Factory', zh: '曼谷工厂特供' },
    'packaging': { fr: "Sacs d'emballage", zh: '打包带' },
    'seasoning': { fr: 'Assaisonnement', zh: '调味料' },
    'promotion': { fr: 'Promotion', zh: '促销' }
};
// 8个大类配置
const mainCategories = [
    { id: 'dry', icon: '🥨', color: '#fef3c7', name_fr: 'Sec', name_zh: '干货', image: 'categories/dry.png' },
    { id: 'frozen', icon: '❄️', color: '#dbeafe', name_fr: 'Surgelé', name_zh: '速冻', image: 'categories/frozen.png' },
    { id: 'fresh', icon: '🥬', color: '#dcfce7', name_fr: 'Frais', name_zh: '生鲜', image: 'categories/fresh.png' },
    { id: 'nonfood', icon: '🧴', color: '#f3e8ff', name_fr: 'Hygiène', name_zh: '卫生用品', image: 'categories/nonfood.png' },
    { id: 'drinks', icon: '🍷', color: '#d1fae5', name_fr: 'Boissons', name_zh: '酒水', image: 'categories/drinks.png' },
    { id: 'bangkok', icon: '🍜', color: '#fef08a', name_fr: 'Bangkok Factory', name_zh: '曼谷工厂特供', image: 'categories/bangkok.jpg' },
    { id: 'packaging', icon: '🎒', color: '#e0e7ff', name_fr: 'Sacs d\'emballage', name_zh: '打包带', image: 'categories/packaging.png' },
    { id: 'seasoning', icon: '🧂', color: '#fed7aa', name_fr: 'Assaisonnement', name_zh: '调味料', image: 'categories/seasoning.png' }
];
const categoryClasses = {
    'dry': 'category-dry',
    'frozen': 'category-frozen',
    'fresh': 'category-fresh',
    'nonfood': 'category-nonfood',
    'drinks': 'category-drinks',
    'bangkok': 'category-bangkok',
    'packaging': 'category-packaging',
    'seasoning': 'category-seasoning',
    'promotion': 'category-promotion'
};

const translations = {
    fr: {
        catDrinks: "🍷 Boissons",
        catBangkok: "🍜 Bangkok Factory",
        catPackaging: "🎒 Sacs d'emballage",
        catSeasoning: "🧂 Assaisonnement",
        buyNGetMPromo: "Achetez N, obtenez M gratuit",
        free: "gratuit",
        stockInsufficient: "Stock insuffisant",
        stockAvailable: "Stock disponible",
        heroTitle: "Bienvenue chez Yida Food",
        heroSubtitle: "Produits asiatiques de qualité, livraison rapide",
        categoryTitle: "Nos catégories",
        catAll: "Tous les produits",
        catDry: "🥨 Sec",
        catFrozen: "❄️ Surgelé",
        catFresh: "🥬 Frais",
        catNonfood: "🧴 Non-alimentaire",
        cartTitle: "Mon panier",
        catPromotion: "🔥 Promotion",  // 添加这一行
        total: "Total",
        checkout: "Commander",
        emptyCart: "Votre panier est vide",
        addToCart: "Ajouter au panier",
        loginNeeded: "Veuillez vous connecter pour commander",
        loginSuccess: "Connexion réussie",
        registerSuccess: "Inscription réussie",
        orderConfirmTitle: "Confirmation de commande",
        deliveryDate: "Date de livraison",
        deliveryTime: "Créneau horaire",
        notes: "Notes (optionnel)",
        confirmOrder: "Confirmer la commande",
        orderSuccess: "Commande confirmée !",
        loginTitle: "Connexion",
        registerTitle: "Inscription",
        emailLabel: "Email",
        passwordLabel: "Mot de passe",
        regEmailLabel: "Email *",
        regPasswordLabel: "Mot de passe *",
        regCompanyLabel: "Nom de l'entreprise *",
        regAddressLabel: "Adresse *",
        regPhoneLabel: "Téléphone *",
        regKbisLabel: "Numéro KBIS *",
        loginBtn: "Se connecter",
        registerBtn: "S'inscrire",
        ordersLink: "Mes commandes",
        loading: "Chargement...",
        stock: "Stock",
        couponLabel: "Code promo",
        applyCoupon: "Appliquer",
        couponPlaceholder: "Entrez votre code",
        discountAmount: "Réduction",
        originalAmount: "Sous-total",
        finalAmount: "Total",
        accountFrozen: "❌ Votre compte a été gelé",
        kbisPending: "❌ Votre compte est en attente de vérification KBIS",
        promoMarquee: "🎉 Offres en cours : ",
        pointsEarned: "Points gagnés",
        usePoints: "Utiliser mes points",
        pointsAvailable: "points disponibles",
        pointsRedeem: "Points utilisés",
        subtotal: "Sous-total",
        discount: "Réduction",
        pointsWillEarn: "Vous gagnerez",
        pointsAfterConfirm: "points après paiement",
        emptyProducts: "Aucun produit dans cette catégorie",
        uploadImage: "Ajouter une image",
        promotionConflict: "Promotions non cumulables",
        cannotStack: "Les promotions ne peuvent pas être cumulées. Choisissez celle que vous souhaitez conserver :",
        keepExisting: "Garder celle-ci",
        useNew: "Utiliser la nouvelle",
        discountApplied: "Réduction appliquée",
        remove: "Supprimer",
         outOfStock: "Rupture de stock",
         discountDetails: "Détails des réductions"

    },
    zh: {
        discountDetails: "优惠详情",
        buyNGetMPromo: "买N送M",
        free: "免费",
        catDrinks: "🍷 酒水",
catDrinks: "🍷 酒水",
catBangkok: "🍜 曼谷工厂特供",
catPackaging: "🎒 打包带",
catSeasoning: "🧂 调味料",
         stockInsufficient: "库存不足",
        stockAvailable: "可用库存",
        heroTitle: "欢迎来到 Yida Food",
        heroSubtitle: "优质亚洲食品，快速配送",
        categoryTitle: "商品分类",
        catAll: "全部商品",
        catDry: "🥨 干货",
        catFrozen: "❄️ 速冻",
        catFresh: "🥬 生鲜",
        catNonfood: "🧴 非食品",
        catPromotion: "🔥 促销", 
        cartTitle: "我的购物车",
        total: "合计",
        checkout: "去结算",
        emptyCart: "购物车是空的",
        addToCart: "加入购物车",
        loginNeeded: "请先登录后再下单",
        loginSuccess: "登录成功",
        registerSuccess: "注册成功",
        orderConfirmTitle: "确认订单",
        deliveryDate: "配送日期",
        deliveryTime: "配送时段",
        notes: "备注（可选）",
        confirmOrder: "确认下单",
        orderSuccess: "订单已确认！",
        loginTitle: "登录",
        registerTitle: "注册",
        emailLabel: "邮箱",
        passwordLabel: "密码",
        regEmailLabel: "邮箱 *",
        regPasswordLabel: "密码 *",
        regCompanyLabel: "公司名称 *",
        regAddressLabel: "地址 *",
        regPhoneLabel: "电话 *",
        regKbisLabel: "KBIS 号码 *",
        loginBtn: "登录",
        registerBtn: "注册",
        ordersLink: "我的订单",
        loading: "加载中...",
        stock: "库存",
        couponLabel: "优惠码",
        applyCoupon: "应用",
        couponPlaceholder: "输入优惠码",
        discountAmount: "优惠金额",
        originalAmount: "小计",
        finalAmount: "合计",
        accountFrozen: "❌ 您的账户已被冻结",
        kbisPending: "❌ 您的账户正在等待KBIS审核",
        promoMarquee: "🎉 当前优惠活动：",
        pointsEarned: "获得积分",
        usePoints: "使用积分抵扣",
        pointsAvailable: "积分可用",
        pointsRedeem: "使用积分",
        subtotal: "小计",
        discount: "优惠",
        pointsWillEarn: "您将获得",
        pointsAfterConfirm: "积分（支付后到账）",
        emptyProducts: "该分类下暂无商品",
        uploadImage: "上传图片",
        promotionConflict: "优惠不可叠加",
        cannotStack: "优惠活动不能叠加使用，请选择保留哪一个：",
        keepExisting: "保留当前",
        useNew: "使用新的",
        discountApplied: "已应用优惠",
        remove: "移除",
         outOfStock: "缺货"
    }
};

// ========== 工具函数 ==========
function showToast(message, type = 'success') {
    const toast = document.getElementById('customToast');
    if (!toast) return;
    const icon = document.getElementById('toastIcon');
    const msg = document.getElementById('toastMessage');
    toast.classList.remove('success', 'error', 'warning');
    toast.classList.add(type);
    icon.textContent = type === 'success' ? '✅' : (type === 'error' ? '❌' : '⚠️');
    msg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function renderCategories() {
    const container = document.getElementById('categoriesGrid');
    if (!container) return;
    
    const html = mainCategories.map(cat => {
        const name = currentLang === 'fr' ? cat.name_fr : cat.name_zh;
        const nameZh = currentLang === 'fr' ? cat.name_zh : cat.name_fr;
        const imageUrl = cat.image || '';
        
        return `
            <div class="category-card" onclick="selectCategory('${cat.id}')">
                ${imageUrl ? 
                    `<img class="category-card-image" src="${imageUrl}" alt="${name}" onerror="this.src='https://placehold.co/300x200/${cat.color.slice(1)}/64748b?text=${cat.icon}'">` : 
                    `<div class="category-card-placeholder" style="background: ${cat.color}20;">
                        <div class="category-icon">${cat.icon}</div>
                    </div>`
                }
                <div class="category-card-info">
                    <div class="category-card-name">${escapeHtml(name)}</div>
                    <div class="category-card-name-zh">${escapeHtml(nameZh)}</div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}
window.selectCategory = function(categoryId) {
    currentCategory = categoryId;
    // 隐藏大类卡片页面
    document.getElementById('categoriesGrid').style.display = 'none';
    // 显示商品列表区域
    document.getElementById('productsSection').style.display = 'block';
    // 显示分类导航栏
    document.getElementById('categorySection').style.display = 'block';
    // 高亮对应的分类按钮
    document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.dataset.category === categoryId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    // 加载并显示商品
    renderProducts();
};
window.backToCategories = function() {
    // 显示大类卡片页面
    document.getElementById('categoriesGrid').style.display = 'grid';
    // 隐藏商品列表区域
    document.getElementById('productsSection').style.display = 'none';
    // 隐藏分类导航栏
    document.getElementById('categorySection').style.display = 'none';
    // 重置当前分类
    currentCategory = 'all';
};

function getPromotionName(promo) {
    if (!promo) return '';
    return currentLang === 'fr' ? promo.name : (promo.name_zh || promo.name);
}

function getPromotionDescription(promo, applicableSubtotal) {
    if (!promo) return '';
    if (promo.type === 'discount' && promo.discount_percent) {
        return `-${promo.discount_percent}%`;
    } else if (promo.type === 'spend_reduce' && promo.min_amount && promo.reduce_amount) {
        return `${promo.min_amount}€ → -${promo.reduce_amount}€`;
    }
    return '';
}

// 显示促销冲突弹窗
function showPromotionConflictModal(existingPromo, newPromo, newDiscount, onKeepExisting, onUseNew) {
    const existingName = getPromotionName(existingPromo);
    const newName = getPromotionName(newPromo);
    const t = translations[currentLang];
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10002;
        backdrop-filter: blur(4px);
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; width: 340px; max-width: 85%; padding: 24px 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 12px;">⚠️</div>
            <h3 style="color: #d97706; margin-bottom: 8px;">${t.promotionConflict}</h3>
            <p style="color: #666; margin-bottom: 20px; font-size: 14px;">${t.cannotStack}</p>
            <div style="background: #f1f5f9; border-radius: 16px; padding: 12px; margin-bottom: 12px; text-align: left;">
                <div style="font-weight: 600; color: #1e293b;">① ${escapeHtml(existingName)}</div>
                <div style="color: #10b981; font-size: 13px;">✓ ${t.discountApplied}</div>
            </div>
            <div style="background: #f1f5f9; border-radius: 16px; padding: 12px; margin-bottom: 20px; text-align: left;">
                <div style="font-weight: 600; color: #1e293b;">② ${escapeHtml(newName)}</div>
                <div style="color: #64748b; font-size: 13px;">-${formatPrice(newDiscount)}€</div>
            </div>
            <div style="display: flex; gap: 12px;">
                <button id="keepExistingBtn" style="flex:1; background: #e2e8f0; color: #475569; border: none; padding: 12px; border-radius: 40px; font-weight: 600; cursor: pointer;">${t.keepExisting}</button>
                <button id="useNewBtn" style="flex:1; background: #2f6d9e; color: white; border: none; padding: 12px; border-radius: 40px; font-weight: 600; cursor: pointer;">${t.useNew}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('keepExistingBtn').onclick = () => {
        document.body.removeChild(modal);
        if (onKeepExisting) onKeepExisting();
    };
    
    document.getElementById('useNewBtn').onclick = () => {
        document.body.removeChild(modal);
        if (onUseNew) onUseNew();
    };
}

// ========== 积分配置 ==========
async function loadPointsConfig() {
    try {
        const { data } = await window.supabase.from('points_config').select('*').limit(1);
        pointsConfig = data?.[0] || { exchange_rate: 10, redeem_rate: 0.01, register_bonus: 100, max_redeem_percent: 30 };
    } catch (err) {
        pointsConfig = { exchange_rate: 10, redeem_rate: 0.01, register_bonus: 100, max_redeem_percent: 30 };
    }
}

// ========== 促销活动 ==========
async function loadActivePromotions() {
    const now = new Date().toISOString();
    try {
        const { data } = await window.supabase
            .from('promotions')
            .select('*')
            .eq('is_active', true)
            .lte('start_date', now)
            .gte('end_date', now);
        activePromotions = data || [];
        updatePromotionMarquee();
    } catch (err) {
        activePromotions = [];
    }
}

function updatePromotionMarquee() {
    const marquee = document.getElementById('promoMarquee');
    const content = document.getElementById('marqueeContent');
    if (!marquee || !content) return;
    
    if (activePromotions.length === 0) {
        marquee.style.display = 'none';
        return;
    }
    
    marquee.style.display = 'block';
    const t = translations[currentLang];
    let texts = [];
    
    for (const p of activePromotions) {
        const name = currentLang === 'fr' ? p.name : (p.name_zh || p.name);
        
        if (p.type === 'discount') {
            texts.push(`${name} : -${p.discount_percent}%`);
        } 
        else if (p.type === 'spend_reduce') {
            if (p.spend_reduce_tiers) {
                const tiers = typeof p.spend_reduce_tiers === 'string' ? JSON.parse(p.spend_reduce_tiers) : p.spend_reduce_tiers;
                if (Array.isArray(tiers)) {
                    texts.push(`${name} : ${tiers[0].min}€ → -${tiers[0].reduce}€`);
                }
            } else if (p.min_amount && p.reduce_amount) {
                texts.push(`${name} : ${p.min_amount}€ → -${p.reduce_amount}€`);
            }
        }
        else if (p.type === 'points_multiplier') {
            texts.push(`${name} : x${p.points_multiplier} points`);
        }
        else if (p.type === 'buy_n_get_m') {
            const buyN = p.buy_n || 3;
            const getM = p.get_m || 1;
            texts.push(`${name} : ${buyN} achetés = ${getM} gratuit`);
        }
        else if (p.type === 'free_shipping') {
            texts.push(`${name} : Livraison gratuite`);
        }
    }
    
    if (texts.length === 0) {
        marquee.style.display = 'none';
        return;
    }
    
    content.innerHTML = `${t.promoMarquee} ${texts.join('  |  ')}`;
}

function calculateDiscounts(subtotal, couponDisc = 0, cartItems = null, couponPromo = null) {
    if (!cartItems || cartItems.length === 0) {
        return {
            finalTotal: subtotal,
            appliedPromotions: [],
            appliedCoupon: null,
            couponDiscount: 0,
            buyNGetMDiscount: 0,
            buyNGetMDetails: []
        };
    }
    
    // 计算普通商品小计（非促销商品）
    let normalCurrentSubtotal = 0;
    for (const item of cartItems) {
        const product = products.find(p => p.id === item.id);
        if (product && !product.is_promotion) {
            const currentPrice = product.promotion_price || product.price;
            normalCurrentSubtotal += currentPrice * item.quantity;
        }
    }
    
    // 1. 计算买N送M折扣
    const buyNGetMResult = calculateBuyNGetMDiscount(cartItems, activePromotions);
    let totalDiscount = buyNGetMResult.discount;
    let appliedPromotions = [...buyNGetMResult.appliedPromotions];
    
    // 2. 计算其他自动促销（折扣、满减等）
    let bestAutoPromo = null;
    let bestAutoDiscount = 0;
    
    for (const promo of activePromotions) {
        if (promo.need_coupon) continue;
        if (promo.type === 'buy_n_get_m') continue; // 已经处理过了
        
        let discount = 0;
        if (promo.type === 'discount' && promo.discount_percent) {
            discount = normalCurrentSubtotal * promo.discount_percent / 100;
        } else if (promo.type === 'spend_reduce' && promo.spend_reduce_tiers) {
            // 满减多档处理
            const tiers = typeof promo.spend_reduce_tiers === 'string' ? JSON.parse(promo.spend_reduce_tiers) : promo.spend_reduce_tiers;
            if (Array.isArray(tiers)) {
                for (let i = tiers.length - 1; i >= 0; i--) {
                    if (normalCurrentSubtotal >= tiers[i].min) {
                        discount = tiers[i].reduce;
                        break;
                    }
                }
            }
        } else if (promo.type === 'free_shipping') {
            discount = 0; // 免运费单独处理，不影响金额
        }
        
        if (discount > bestAutoDiscount) {
            bestAutoDiscount = discount;
            bestAutoPromo = promo;
        }
    }
    
    if (bestAutoPromo && bestAutoDiscount > 0) {
        // 检查是否可叠加
        const autoStackable = bestAutoPromo.stackable === true;
        if (autoStackable) {
            totalDiscount += bestAutoDiscount;
            appliedPromotions.push(bestAutoPromo);
        } else if (bestAutoDiscount > totalDiscount) {
            totalDiscount = bestAutoDiscount;
            appliedPromotions = [bestAutoPromo];
        }
    }
    
    // 3. 处理优惠码折扣
    let couponDiscountAmount = 0;
    let bestCouponPromo = null;
    
    if (couponDisc > 0 && couponPromo) {
        if (couponPromo.type === 'discount' && couponPromo.discount_percent) {
            couponDiscountAmount = normalCurrentSubtotal * couponPromo.discount_percent / 100;
        } else if (couponPromo.type === 'spend_reduce' && couponPromo.spend_reduce_tiers) {
            const tiers = typeof couponPromo.spend_reduce_tiers === 'string' ? JSON.parse(couponPromo.spend_reduce_tiers) : couponPromo.spend_reduce_tiers;
            if (Array.isArray(tiers)) {
                for (let i = tiers.length - 1; i >= 0; i--) {
                    if (normalCurrentSubtotal >= tiers[i].min) {
                        couponDiscountAmount = tiers[i].reduce;
                        break;
                    }
                }
            }
        } else if (couponPromo.type === 'free_shipping') {
            couponDiscountAmount = 0;
        }
        bestCouponPromo = couponPromo;
        
        // 检查优惠码是否可叠加
        const couponStackable = bestCouponPromo?.stackable === true;
        if (couponStackable) {
            totalDiscount += couponDiscountAmount;
        } else if (couponDiscountAmount > totalDiscount) {
            totalDiscount = couponDiscountAmount;
            appliedPromotions = [bestCouponPromo];
        }
        // 否则保持原有折扣，优惠码不应用
    }
    
    // 最终价格
    const finalTotal = Math.max(0, normalCurrentSubtotal - totalDiscount);
    
    return {
        finalTotal: finalTotal,
        appliedPromotions: appliedPromotions,
        appliedCoupon: bestCouponPromo,
        couponDiscount: couponDiscountAmount,
        buyNGetMDiscount: buyNGetMResult.discount,
        buyNGetMDetails: buyNGetMResult.details
    };
}
// ========== 买N送M促销计算 ==========
function calculateBuyNGetMDiscount(cartItems, activePromotions) {
    if (!cartItems || cartItems.length === 0) return { discount: 0, appliedPromotions: [], details: [] };
    
    let totalDiscount = 0;
    const appliedPromotions = [];
    const discountDetails = [];
    const usedProductQuantities = new Map(); // 记录已经用于促销的商品数量
    
    // 筛选出买N送M类型的促销
    const buyNGetMPromos = activePromotions.filter(p => p.type === 'buy_n_get_m' && !p.need_coupon);
    
    for (const promo of buyNGetMPromos) {
        const buyN = promo.buy_n || 3;
        const getM = promo.get_m || 1;
        let promoDiscount = 0;
        let promoApplied = false;
        
        // 遍历购物车中的每个商品
        for (const item of cartItems) {
            const product = products.find(p => p.id === item.id);
            if (!product) continue;
            
            // 检查商品是否符合促销条件
            let isApplicable = false;
            
            // 1. 检查适用商品（指定商品ID）
            if (promo.applicable_products && promo.applicable_products.length > 0) {
                if (promo.applicable_products.includes(item.id)) {
                    isApplicable = true;
                }
            }
            // 2. 检查适用分类
            else if (promo.applicable_categories && promo.applicable_categories.length > 0) {
                if (promo.applicable_categories.includes(product.category)) {
                    isApplicable = true;
                }
            }
            // 3. 没有指定分类和商品，全场适用
            else {
                isApplicable = true;
            }
            
            if (!isApplicable) continue;
            
            // 获取当前商品已经使用的数量
            const usedQty = usedProductQuantities.get(item.id) || 0;
            const availableQty = item.quantity - usedQty;
            if (availableQty < buyN) continue;
            
            // 计算可以享受多少次买N送M
            const times = Math.floor(availableQty / buyN);
            if (times > 0) {
                const currentPrice = product.is_promotion && product.promotion_price ? product.promotion_price : product.price;
                const freeValue = times * getM * currentPrice;
                promoDiscount += freeValue;
                promoApplied = true;
                usedProductQuantities.set(item.id, usedQty + (times * buyN));
                
                discountDetails.push({
                    productId: item.id,
                    productName: currentLang === 'fr' ? product.name_fr : product.name_zh,
                    buyN: buyN,
                    getM: getM,
                    times: times,
                    discount: freeValue
                });
            }
        }
        
        if (promoApplied && promoDiscount > 0) {
            totalDiscount += promoDiscount;
            appliedPromotions.push(promo);
        }
    }
    
    return { discount: totalDiscount, appliedPromotions, details: discountDetails };
}
function calculatePointsDiscount(subtotal, clientPoints) {
    if (!pointsConfig || !usePoints) return { discount: 0, usedPoints: 0 };
    const maxAmount = subtotal * (pointsConfig.max_redeem_percent / 100);
    const pointsValue = clientPoints * (pointsConfig.redeem_rate || 0.01);
    const discount = Math.min(maxAmount, pointsValue);
    const usedPoints = Math.floor(discount / (pointsConfig.redeem_rate || 0.01));
    return { discount, usedPoints };
}
// ========== 下单 ==========
async function showOrderModal() {
    const t = translations[currentLang];
    
    // 先检查库存
    for (const item of cart) {
        const p = products.find(p => p.id === item.id);
        if (p && item.quantity > (p.quantity || 0)) {
            showToast(t.stockInsufficient, 'warning');
            return;
        }
    }
    
    if (!currentClient) { 
        showToast(t.loginNeeded, 'warning'); 
        showAuthModal(); 
        return; 
    }
    if (cart.length === 0) { 
        showToast(t.emptyCart, 'warning'); 
        return; 
    }
    
    // 获取客户积分
    const { data: fresh } = await window.supabase
        .from('clients')
        .select('points')
        .eq('id', currentClient.id)
        .single();
    const clientPoints = fresh?.points || 0;
    document.getElementById('pointsInfo').innerHTML = `${clientPoints} ${t.pointsAvailable}`;
    
    // 设置配送日期
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('deliveryDate').min = tomorrow.toISOString().split('T')[0];
    
    // 计算小计和商品列表
    let subtotal = 0;
    let itemsHtml = '';
    
    for (const item of cart) {
        const p = products.find(p => p.id === item.id);
        if (!p) continue;
        
        const price = p.is_promotion && p.promotion_price ? p.promotion_price : p.price;
        const originalPrice = p.price;
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;
        const name = currentLang === 'fr' ? p.name_fr : p.name_zh;
        const hasDiscount = price < originalPrice;
        
        itemsHtml += `<div class="order-item">
            <div class="order-item-name">
                ${escapeHtml(name)} x ${item.quantity}
                ${hasDiscount ? `<span class="order-item-original">(${formatPrice(originalPrice)} €)</span>` : ''}
            </div>
            <span class="order-item-price">${formatPrice(itemTotal)} €</span>
        </div>`;
    }
    
    // ========== 重新计算优惠码折扣 ==========
    let couponDiscountAmount = 0;
    let appliedCouponPromo = null;
    
    if (appliedCoupon) {
        const couponPromo = activePromotions.find(p => p.need_coupon && p.coupon_code === appliedCoupon);
        if (couponPromo) {
            // 计算购物车小计用于优惠码
            let cartSubtotalForCoupon = 0;
            for (const item of cart) {
                const p = products.find(prod => prod.id === item.id);
                if (p) {
                    const price = p.is_promotion && p.promotion_price ? p.promotion_price : p.price;
                    cartSubtotalForCoupon += price * item.quantity;
                }
            }
            
            // 根据促销类型计算折扣
            if (couponPromo.type === 'discount' && couponPromo.discount_percent) {
                couponDiscountAmount = cartSubtotalForCoupon * couponPromo.discount_percent / 100;
                appliedCouponPromo = couponPromo;
            } 
            else if (couponPromo.type === 'spend_reduce') {
                if (couponPromo.spend_reduce_tiers) {
                    const tiers = typeof couponPromo.spend_reduce_tiers === 'string' ? JSON.parse(couponPromo.spend_reduce_tiers) : couponPromo.spend_reduce_tiers;
                    if (Array.isArray(tiers)) {
                        for (let i = tiers.length - 1; i >= 0; i--) {
                            if (cartSubtotalForCoupon >= tiers[i].min) {
                                couponDiscountAmount = tiers[i].reduce;
                                appliedCouponPromo = couponPromo;
                                break;
                            }
                        }
                    }
                } else if (couponPromo.min_amount && cartSubtotalForCoupon >= couponPromo.min_amount) {
                    couponDiscountAmount = couponPromo.reduce_amount || 0;
                    appliedCouponPromo = couponPromo;
                }
            }
            else if (couponPromo.type === 'buy_n_get_m') {
                // 买N送M类型
                const buyN = couponPromo.buy_n || 3;
                const getM = couponPromo.get_m || 1;
                for (const item of cart) {
                    const p = products.find(prod => prod.id === item.id);
                    if (!p) continue;
                    
                    let isApplicable = false;
                    if (couponPromo.applicable_products && couponPromo.applicable_products.length > 0) {
                        if (couponPromo.applicable_products.includes(item.id)) isApplicable = true;
                    } else if (couponPromo.applicable_categories && couponPromo.applicable_categories.length > 0) {
                        if (couponPromo.applicable_categories.includes(p.category)) isApplicable = true;
                    } else {
                        isApplicable = true;
                    }
                    
                    if (isApplicable && item.quantity >= buyN) {
                        const currentPrice = p.is_promotion && p.promotion_price ? p.promotion_price : p.price;
                        const freeValue = Math.floor(item.quantity / buyN) * getM * currentPrice;
                        couponDiscountAmount += freeValue;
                        appliedCouponPromo = couponPromo;
                    }
                }
            }
        }
        // 更新全局变量
        couponDiscount = couponDiscountAmount;
    }
    
    // ========== 计算自动促销折扣 ==========
    let autoPromoDiscount = 0;
    let autoPromo = null;
    
    for (const promo of activePromotions) {
        if (promo.need_coupon) continue;
        if (promo.type === 'buy_n_get_m') {
            // 买N送M促销
            const buyN = promo.buy_n || 3;
            const getM = promo.get_m || 1;
            let promoDiscount = 0;
            for (const item of cart) {
                const p = products.find(prod => prod.id === item.id);
                if (!p) continue;
                
                let isApplicable = false;
                if (promo.applicable_products && promo.applicable_products.length > 0) {
                    if (promo.applicable_products.includes(item.id)) isApplicable = true;
                } else if (promo.applicable_categories && promo.applicable_categories.length > 0) {
                    if (promo.applicable_categories.includes(p.category)) isApplicable = true;
                } else {
                    isApplicable = true;
                }
                
                if (isApplicable && item.quantity >= buyN) {
                    const currentPrice = p.is_promotion && p.promotion_price ? p.promotion_price : p.price;
                    const freeValue = Math.floor(item.quantity / buyN) * getM * currentPrice;
                    promoDiscount += freeValue;
                }
            }
            if (promoDiscount > autoPromoDiscount) {
                autoPromoDiscount = promoDiscount;
                autoPromo = promo;
            }
        }
        else if (promo.type === 'discount' && promo.discount_percent) {
            let normalSubtotal = 0;
            for (const item of cart) {
                const p = products.find(prod => prod.id === item.id);
                if (p && !p.is_promotion) {
                    normalSubtotal += p.price * item.quantity;
                }
            }
            const discount = normalSubtotal * promo.discount_percent / 100;
            if (discount > autoPromoDiscount) {
                autoPromoDiscount = discount;
                autoPromo = promo;
            }
        }
        else if (promo.type === 'spend_reduce' && promo.spend_reduce_tiers) {
            let normalSubtotal = 0;
            for (const item of cart) {
                const p = products.find(prod => prod.id === item.id);
                if (p && !p.is_promotion) {
                    normalSubtotal += p.price * item.quantity;
                }
            }
            const tiers = typeof promo.spend_reduce_tiers === 'string' ? JSON.parse(promo.spend_reduce_tiers) : promo.spend_reduce_tiers;
            if (Array.isArray(tiers)) {
                for (let i = tiers.length - 1; i >= 0; i--) {
                    if (normalSubtotal >= tiers[i].min) {
                        const discount = tiers[i].reduce;
                        if (discount > autoPromoDiscount) {
                            autoPromoDiscount = discount;
                            autoPromo = promo;
                        }
                        break;
                    }
                }
            }
        }
    }
    
    // ========== 处理折扣叠加 ==========
    let totalDiscount = 0;
    let finalAppliedPromotions = [];
    let finalAppliedCoupon = null;
    
    // 检查是否可叠加
    const autoStackable = autoPromo?.stackable === true;
    const couponStackable = appliedCouponPromo?.stackable === true;
    
    if (autoPromoDiscount > 0 && couponDiscountAmount > 0) {
        if (autoStackable && couponStackable) {
            // 都叠加
            totalDiscount = autoPromoDiscount + couponDiscountAmount;
            finalAppliedPromotions = [autoPromo];
            finalAppliedCoupon = appliedCouponPromo;
        } else if (autoStackable && !couponStackable) {
            totalDiscount = couponDiscountAmount;
            finalAppliedCoupon = appliedCouponPromo;
        } else if (!autoStackable && couponStackable) {
            totalDiscount = autoPromoDiscount;
            finalAppliedPromotions = [autoPromo];
        } else {
            // 都不叠加，取大的
            if (autoPromoDiscount >= couponDiscountAmount) {
                totalDiscount = autoPromoDiscount;
                finalAppliedPromotions = [autoPromo];
            } else {
                totalDiscount = couponDiscountAmount;
                finalAppliedCoupon = appliedCouponPromo;
            }
        }
    } else if (autoPromoDiscount > 0) {
        totalDiscount = autoPromoDiscount;
        finalAppliedPromotions = [autoPromo];
    } else if (couponDiscountAmount > 0) {
        totalDiscount = couponDiscountAmount;
        finalAppliedCoupon = appliedCouponPromo;
    }
    
    const finalTotal = subtotal - totalDiscount;
    
    // ========== 积分抵扣 ==========
    const { discount: ptsDisc, usedPoints } = calculatePointsDiscount(finalTotal, clientPoints);
    pointsDiscount = usePoints ? ptsDisc : 0;
    pointsToUse = usedPoints;
    const finalTotalWithPoints = finalTotal - pointsDiscount;
    
    // ========== 构建订单HTML ==========
    let orderHtml = itemsHtml;
    orderHtml += `<div class="order-divider"></div>`;
    
    // 小计
    orderHtml += `<div class="order-item order-subtotal">
        <span>${t.subtotal}</span>
        <span>${formatPrice(subtotal)} €</span>
    </div>`;
    
    // 自动促销折扣
    for (const promo of finalAppliedPromotions) {
        let promoDiscountDisplay = 0;
        if (promo.type === 'buy_n_get_m') {
            const buyN = promo.buy_n || 3;
            const getM = promo.get_m || 1;
            promoDiscountDisplay = autoPromoDiscount;
            orderHtml += `<div class="order-item order-discount">
                <span>🎁 ${getPromotionName(promo)} (${buyN}→+${getM})</span>
                <span style="color:#10b981;">-${formatPrice(promoDiscountDisplay)} €</span>
            </div>`;
        } else if (promo.type === 'discount') {
            promoDiscountDisplay = autoPromoDiscount;
            orderHtml += `<div class="order-item order-discount">
                <span>🏷️ ${getPromotionName(promo)} (-${promo.discount_percent}%)</span>
                <span style="color:#10b981;">-${formatPrice(promoDiscountDisplay)} €</span>
            </div>`;
        } else if (promo.type === 'spend_reduce') {
            promoDiscountDisplay = autoPromoDiscount;
            orderHtml += `<div class="order-item order-discount">
                <span>🏷️ ${getPromotionName(promo)}</span>
                <span style="color:#10b981;">-${formatPrice(promoDiscountDisplay)} €</span>
            </div>`;
        }
    }
    
    // 优惠码折扣
    if (finalAppliedCoupon && couponDiscountAmount > 0) {
        orderHtml += `<div class="order-item order-discount">
            <span>🎫 ${getPromotionName(finalAppliedCoupon)} (${escapeHtml(appliedCoupon)})</span>
            <span style="color:#10b981;">-${formatPrice(couponDiscountAmount)} €</span>
        </div>`;
    }
    
    // 积分抵扣
    if (pointsDiscount > 0) {
        orderHtml += `<div class="order-item order-discount">
            <span>⭐ ${t.pointsRedeem} (${pointsToUse} pts)</span>
            <span style="color:#10b981;">-${formatPrice(pointsDiscount)} €</span>
        </div>`;
    }
    
    // 合计
    orderHtml += `<div class="order-item order-total">
        <span>${t.finalAmount}</span>
        <span>${formatPrice(finalTotalWithPoints)} €</span>
    </div>`;
    
    // 预计获得积分
    const expectedPoints = calculatePointsEarned(finalTotalWithPoints);
    if (expectedPoints > 0) {
        orderHtml += `<div class="order-item order-points">
            <span>⭐ ${t.pointsWillEarn}</span>
            <span>${expectedPoints} ${t.pointsAfterConfirm}</span>
        </div>`;
    }
    
    document.getElementById('orderItems').innerHTML = orderHtml;
    document.getElementById('orderTotalAmount').textContent = `${formatPrice(finalTotalWithPoints)} €`;
    document.getElementById('orderModal').classList.add('active');
    
    // 积分复选框
    const pointsCheck = document.getElementById('usePointsCheckbox');
    if (pointsCheck) {
        pointsCheck.checked = usePoints;
        pointsCheck.onchange = async (e) => { 
            usePoints = e.target.checked; 
            await showOrderModal(); 
        };
    }
    
    // 优惠码按钮
    const applyBtn = document.getElementById('applyCouponBtn');
    if (applyBtn) {
        const newBtn = applyBtn.cloneNode(true);
        applyBtn.parentNode.replaceChild(newBtn, applyBtn);
        newBtn.onclick = async () => {
            const code = document.getElementById('couponCodeInput').value.trim();
            if (!code) return;
            
            const res = await applyCouponCode(code);
            const msgDiv = document.getElementById('couponMessage');
            
            if (res.success) {
                appliedCoupon = code;
                couponDiscount = res.discount;
                msgDiv.innerHTML = `<span style="color:#10b981;">✅ ${res.discount.toFixed(2)}€ appliqué</span>`;
                await showOrderModal();
            } else {
                msgDiv.innerHTML = `<span style="color:#dc2626;">❌ ${res.message}</span>`;
            }
        };
    }
}
function calculatePointsEarned(orderAmount) {
    if (!pointsConfig) return 0;
    let multiplier = 1;
    for (const promo of activePromotions) {
        if (promo.type === 'points_multiplier') {
            multiplier = promo.points_multiplier;
            break;
        }
    }
    return Math.floor(orderAmount * (pointsConfig.exchange_rate || 10) * multiplier);
}

// ========== 优惠码 ==========
async function applyCouponCode(code, subtotal) {
    if (!code) return { success: false, discount: 0, message: '' };
    
    const promo = activePromotions.find(p => p.need_coupon && p.coupon_code && p.coupon_code.toUpperCase() === code.toUpperCase());
    if (!promo) return { success: false, discount: 0, message: currentLang === 'fr' ? 'Code invalide' : '优惠码无效' };
    
    if (promo.usage_limit > 0 && (promo.usage_count || 0) >= promo.usage_limit) {
        return { success: false, discount: 0, message: currentLang === 'fr' ? 'Code expiré' : '优惠码已用完' };
    }
    
    // 计算购物车小计（所有商品，包括促销商品）
    let cartSubtotal = 0;
    for (const item of cart) {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const currentPrice = product.is_promotion && product.promotion_price ? product.promotion_price : product.price;
            cartSubtotal += currentPrice * item.quantity;
        }
    }
    
    let discount = 0;
    let discountApplied = false;
    
    // 根据促销类型计算折扣
    if (promo.type === 'discount' && promo.discount_percent) {
        discount = cartSubtotal * promo.discount_percent / 100;
        discountApplied = true;
    } 
    else if (promo.type === 'spend_reduce') {
        // 满减多档处理
        if (promo.spend_reduce_tiers) {
            const tiers = typeof promo.spend_reduce_tiers === 'string' ? JSON.parse(promo.spend_reduce_tiers) : promo.spend_reduce_tiers;
            if (Array.isArray(tiers)) {
                for (let i = tiers.length - 1; i >= 0; i--) {
                    if (cartSubtotal >= tiers[i].min) {
                        discount = tiers[i].reduce;
                        discountApplied = true;
                        break;
                    }
                }
            }
        }
        // 兼容旧格式
        else if (promo.min_amount && cartSubtotal >= promo.min_amount) {
            discount = promo.reduce_amount || 0;
            discountApplied = true;
        }
    }
    else if (promo.type === 'buy_n_get_m') {
        // 买N送M类型：需要在购物车中检查是否有符合条件的商品
        const buyN = promo.buy_n || 3;
        const getM = promo.get_m || 1;
        
        // 遍历购物车中的每个商品
        for (const item of cart) {
            const product = products.find(p => p.id === item.id);
            if (!product) continue;
            
            // 检查商品是否符合条件
            let isApplicable = false;
            
            // 检查适用商品
            if (promo.applicable_products && promo.applicable_products.length > 0) {
                if (promo.applicable_products.includes(item.id)) isApplicable = true;
            }
            // 检查适用分类
            else if (promo.applicable_categories && promo.applicable_categories.length > 0) {
                if (promo.applicable_categories.includes(product.category)) isApplicable = true;
            }
            else {
                isApplicable = true;
            }
            
            if (isApplicable && item.quantity >= buyN) {
                const currentPrice = product.is_promotion && product.promotion_price ? product.promotion_price : product.price;
                const freeValue = Math.floor(item.quantity / buyN) * getM * currentPrice;
                discount += freeValue;
                discountApplied = true;
            }
        }
    }
    else if (promo.type === 'free_shipping') {
        discount = 0;
        discountApplied = true;
    }
    else if (promo.type === 'points_multiplier') {
        discount = 0;
        discountApplied = true;
    }
    
    if (!discountApplied || discount <= 0) {
        return { success: false, discount: 0, message: currentLang === 'fr' ? 'Non applicable' : '不适用' };
    }
    
    return { success: true, discount, promo, message: '' };
}

// ========== 购物车 ==========
function loadCart() {
    const saved = localStorage.getItem('yida_cart');
    cart = saved ? JSON.parse(saved) : [];
    // 确保购物车中的商品数量不超过库存
    for (let i = 0; i < cart.length; i++) {
        const product = products.find(p => p.id === cart[i].id);
        if (product && cart[i].quantity > (product.quantity || 0)) {
            cart[i].quantity = product.quantity || 0;
        }
    }
    updateCartUI();
    renderProducts();  // 添加这一行
}

function saveCart() {
    localStorage.setItem('yida_cart', JSON.stringify(cart));
    updateCartUI();
    renderProducts();  // 添加这一行，刷新商品列表上的数量显示
}

function updateCartUI() {
    if (products.length === 0) {
        const count = cart.reduce((s, i) => s + i.quantity, 0);
        const cartCountEl = document.getElementById('cartCount');
        if (cartCountEl) cartCountEl.textContent = count;
        return;
    }
    
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.textContent = count;
    
    const container = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    
    if (!container || !totalSpan) return;
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><p>${translations[currentLang].emptyCart}</p></div>`;
        totalSpan.textContent = '0.00 €';
        // 清空折扣标签
        const discountTagsContainer = document.getElementById('discountTags');
        if (discountTagsContainer) discountTagsContainer.innerHTML = '';
        return;
    }
    
    let subtotal = 0;
    let html = '';
    
    for (const item of cart) {
        const p = products.find(p => p.id === item.id);
        if (!p) continue;
        
        const currentPrice = p.is_promotion && p.promotion_price ? p.promotion_price : p.price;
        const originalPrice = p.price;
        const itemTotal = currentPrice * item.quantity;
        subtotal += itemTotal;
        const name = currentLang === 'fr' ? p.name_fr : p.name_zh;
        const hasItemDiscount = currentPrice < originalPrice;
        const stock = p.quantity || 0;
        
        html += `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${escapeHtml(name)}</div>
                <div class="cart-item-price">
                    ${hasItemDiscount ? `<span class="original-price">${formatPrice(originalPrice)} €</span> ` : ''}
                    <span class="current-price">${formatPrice(currentPrice)} €</span>
                </div>
                <div class="cart-item-quantity-controls">
                    <button class="qty-btn" onclick="updateCartItemQuantity('${item.id}', -1)">-</button>
                    <input type="number" class="cart-qty-input" id="cart_qty_input_${item.id}" value="${item.quantity}" min="0" max="${stock}" onchange="updateCartItemQuantityDirect('${item.id}', this.value)">
                    <button class="qty-btn" onclick="updateCartItemQuantity('${item.id}', 1)">+</button>
                    <button class="remove-item" onclick="removeCartItem('${item.id}')">🗑️</button>
                </div>
            </div>
        </div>`;
    }
    
    container.innerHTML = html;
    originalSubtotal = subtotal;
    
    // 计算折扣并显示
    const discountResult = calculateDiscounts(subtotal, couponDiscount, cart, null);
    const finalTotal = discountResult.finalTotal;
    totalSpan.innerHTML = `${formatPrice(finalTotal)} €`;
    
    // 显示折扣标签
    const discountTagsContainer = document.getElementById('discountTags');
    if (discountTagsContainer) {
        let tagsHtml = '';
        const t = translations[currentLang];
        
        // 买N送M折扣标签
        for (const detail of discountResult.buyNGetMDetails) {
            tagsHtml += `<div class="discount-tag">
                🎁 ${escapeHtml(detail.productName)}: ${t.buyNGetMPromo || 'Achetez'} ${detail.buyN} = ${detail.getM} ${t.free || 'gratuit'} (${detail.times}x, -${formatPrice(detail.discount)}€)
                <button class="remove-discount" onclick="removeBuyNGetMPromotion()">✕</button>
            </div>`;
        }
        
        // 其他促销折扣标签
        for (const promo of discountResult.appliedPromotions) {
            if (promo.type !== 'buy_n_get_m') {
                let promoText = '';
                if (promo.type === 'discount') {
                    promoText = `${getPromotionName(promo)}: -${promo.discount_percent}%`;
                } else if (promo.type === 'spend_reduce') {
                    promoText = `${getPromotionName(promo)}: Réduction`;
                } else {
                    promoText = getPromotionName(promo);
                }
                tagsHtml += `<div class="discount-tag">
                    🏷️ ${escapeHtml(promoText)}
                    <button class="remove-discount" onclick="removePromotion('${promo.id}')">✕</button>
                </div>`;
            }
        }
        
        // 优惠码标签
        if (discountResult.appliedCoupon && discountResult.couponDiscount > 0) {
            tagsHtml += `<div class="discount-tag">
                🎫 ${getPromotionName(discountResult.appliedCoupon)}
                <button class="remove-discount" onclick="removeCoupon()">✕</button>
            </div>`;
        }
        
        discountTagsContainer.innerHTML = tagsHtml;
    }
}
// 购物车中加减数量
window.updateCartItemQuantity = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const stock = product.quantity || 0;
    const newQuantity = item.quantity + delta;
    const t = translations[currentLang];
    
    if (delta > 0 && newQuantity > stock) {
        showToast(t.stockInsufficient, 'warning');
        return;
    }
    
    if (newQuantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    } else {
        item.quantity = newQuantity;
    }
    
    saveCart();
    renderProducts();  // 刷新商品列表（同步显示数量）
};
// 移除买N送M促销（清空所有买N送M折扣）
window.removeBuyNGetMPromotion = function() {
    // 买N送M促销无法单独移除，需要清空所有促销
    showToast('Les promotions buy N get M sont automatiques', 'info');
};
// 购物车中直接输入数量
window.updateCartItemQuantityDirect = function(id, newQty) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const stock = product.quantity || 0;
    let quantity = parseInt(newQty);
    const t = translations[currentLang];
    
    if (isNaN(quantity)) quantity = 0;
    if (quantity < 0) quantity = 0;
    if (quantity > stock) {
        showToast(t.stockInsufficient, 'warning');
        quantity = stock;
        // 修正输入框的值
        const inputEl = document.getElementById(`cart_qty_input_${id}`);
        if (inputEl) inputEl.value = quantity;
    }
    
    if (quantity === 0) {
        cart = cart.filter(i => i.id !== id);
    } else {
        const existing = cart.find(i => i.id === id);
        if (existing) {
            existing.quantity = quantity;
        } else {
            cart.push({ id: id, quantity: quantity });
        }
    }
    
    saveCart();
    renderProducts();  // 刷新商品列表（同步显示数量）
};

// 移除促销
window.removePromotion = function(promoId) {
    // 从数组中移除该促销
    currentAppliedPromotions = currentAppliedPromotions.filter(p => p.id !== promoId);
    updateCartUI();
    showToast('Promotion supprimée', 'success');
};

// 移除优惠码
window.removeCoupon = function() {
    appliedCoupon = null;
    couponDiscount = 0;
    document.getElementById('couponCodeInput').value = '';
    document.getElementById('couponMessage').innerHTML = '';
    updateCartUI();
    showToast('Code promo supprimé', 'success');
};

window.updateCartItem = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const productStock = product.quantity || 0;
    const newQuantity = item.quantity + delta;
    const t = translations[currentLang];
    
    // 增加数量时检查库存
    if (delta > 0 && newQuantity > productStock) {
        showToast(t.stockInsufficient, 'warning');
        return;
    }
    
    // 减少数量或移除
    if (newQuantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    } else {
        item.quantity = newQuantity;
    }
    saveCart();
};
window.removeCartItem = function(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
};

function addToCart(product) {
    const stock = product.quantity || 0;
    const existing = cart.find(i => i.id === product.id);
    const currentQty = existing ? existing.quantity : 0;
    const t = translations[currentLang];
    
    if (stock <= 0) {
        showToast(t.outOfStock, 'warning');
        return;
    }
    
    if (currentQty >= stock) {
        showToast(t.stockInsufficient, 'warning');
        return;
    }
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    saveCart();
    showToast(t.addToCart, 'success');
}


async function loadProducts() {
    try {
        const { data } = await window.supabase.from('products').select('*');
        products = data || [];
        products.sort((a, b) => (a.is_promotion === b.is_promotion) ? 0 : a.is_promotion ? -1 : 1);
        renderProducts();
        // 商品加载完成后，刷新购物车显示
        updateCartUI();
    } catch (err) {
        document.getElementById('productsGrid').innerHTML = '<div class="loading-state"><p>❌ Erreur</p></div>';
    }
}
// 更新商品数量（从商品列表直接操作）
// 更新商品数量（加减按钮）
window.updateProductQuantity = function(productId, delta) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const stock = product.quantity || 0;
    const existing = cart.find(i => i.id === productId);
    const currentQty = existing ? existing.quantity : 0;
    const newQty = currentQty + delta;
    const t = translations[currentLang];
    
    if (delta > 0 && newQty > stock) {
        showToast(t.stockInsufficient, 'warning');
        return;
    }
    
    if (delta < 0 && newQty < 0) {
        return;
    }
    
    if (newQty === 0) {
        cart = cart.filter(i => i.id !== productId);
    } else if (existing) {
        existing.quantity = newQty;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart();
    renderProducts();  // 刷新商品列表
    updateCartUI();    // 刷新购物车侧边栏
};
// 直接设置商品数量（输入框变化时调用）
window.updateProductQuantityDirect = function(productId, newQty) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const stock = product.quantity || 0;
    let quantity = parseInt(newQty);
    const t = translations[currentLang];
    
    // 验证输入
    if (isNaN(quantity)) quantity = 0;
    if (quantity < 0) quantity = 0;
    if (quantity > stock) {
        showToast(t.stockInsufficient, 'warning');
        quantity = stock;
    }
    
    const existing = cart.find(i => i.id === productId);
    
    if (quantity === 0) {
        cart = cart.filter(i => i.id !== productId);
    } else if (existing) {
        existing.quantity = quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }
    
    saveCart();
    renderProducts();  // 刷新商品列表
    updateCartUI();    // 刷新购物车侧边栏
};
// 从购物车移除商品
window.removeFromCart = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    renderProducts();
    updateCartUI();
    showToast(translations[currentLang].remove, 'success');
};
function renderProducts() {
    let filtered = products;
    if (currentCategory === 'promotion') {
        filtered = products.filter(p => p.is_promotion === true);
    } else if (currentCategory !== 'all') {
        filtered = products.filter(p => p.category === currentCategory);
    }
    
    if (filtered.length === 0) {
        document.getElementById('productsGrid').innerHTML = `<div class="empty-state">${translations[currentLang].emptyProducts}</div>`;
        return;
    }
    
    const t = translations[currentLang];
    
    const html = filtered.map(product => {
        const isPromo = product.is_promotion === true;
        const displayPrice = isPromo && product.promotion_price ? product.promotion_price : product.price;
        const categoryLabel = categoryLabels[product.category][currentLang];
        const hasImage = product.image_url && product.image_url !== '';
        const imageUrl = hasImage ? product.image_url : '';
        const stock = product.quantity || 0;
        const isOutOfStock = stock <= 0;
        
        // 获取当前购物车中该商品的数量
        const cartItem = cart.find(i => i.id === product.id);
        const cartQty = cartItem ? cartItem.quantity : 0;
        const canIncrease = cartQty < stock;
        
        return `
        <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}">
            ${isPromo ? `<div class="promotion-badge">🔥 -${product.discount_percent || 0}%</div>` : ''}
            ${isOutOfStock ? `<div class="out-of-stock-badge">📦 ${t.outOfStock}</div>` : ''}
            <div class="product-image-container">
                ${imageUrl ? 
                    `<img class="product-image" src="${imageUrl}" alt="${product.name_fr}" onerror="this.src='https://placehold.co/400x200/e2e8f0/64748b?text=No+Image'">` : 
                    `<div class="product-image-placeholder">
                        📷 ${t.uploadImage}
                    </div>`
                }
            </div>
            <div class="product-info">
                <div class="product-name-fr">${escapeHtml(currentLang === 'fr' ? (product.name_fr || '') : (product.name_zh || ''))}</div>
                <div class="product-name-zh">${escapeHtml(currentLang === 'fr' ? (product.name_zh || '') : (product.name_fr || ''))}</div>
                <span class="product-category ${categoryClasses[product.category]}">${escapeHtml(categoryLabel)}</span>
                <div class="product-price">
                    ${isPromo ? `
                        <span class="price-promo">${formatPrice(displayPrice)} €</span>
                        <span class="price-original">${formatPrice(product.price)} €</span>
                    ` : `
                        <span class="price-current">${formatPrice(product.price)} €</span>
                    `}
                </div>
                <div class="product-quantity">
                    📦 ${t.stock}: ${stock}
                </div>
                ${!isOutOfStock ? `
                <div class="product-cart-controls">
                    <button class="qty-btn minus" onclick="updateProductQuantity('${product.id}', -1)" ${cartQty <= 0 ? 'disabled style="opacity:0.5;"' : ''}>-</button>
                    <input type="number" class="cart-qty-input" id="qty_input_${product.id}" value="${cartQty}" min="0" max="${stock}" onchange="updateProductQuantityDirect('${product.id}', this.value)">
                    <button class="qty-btn plus" onclick="updateProductQuantity('${product.id}', 1)" ${!canIncrease ? 'disabled style="opacity:0.5;"' : ''}>+</button>
                    ${cartQty > 0 ? `<button class="remove-from-cart-btn" onclick="removeFromCart('${product.id}')">🗑️</button>` : ''}
                </div>
                ` : `
                <button class="add-to-cart-btn disabled" disabled style="opacity:0.5; cursor:not-allowed; background:#cbd5e1; width:100%;">
                    📦 ${t.outOfStock}
                </button>
                `}
            </div>
        </div>
        `;
    }).join('');
    
    document.getElementById('productsGrid').innerHTML = html;
}
// ========== 认证 ==========
function showAuthModal() { document.getElementById('authModal').classList.add('active'); }
function hideAuthModal() { document.getElementById('authModal').classList.remove('active'); }

async function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pwd = document.getElementById('loginPassword').value;
    const t = translations[currentLang];
    if (!email || !pwd) { document.getElementById('loginError').textContent = 'Remplissez tous les champs'; return; }
    try {
        const { data } = await window.supabase.from('clients').select('*').eq('email', email).eq('password', pwd).maybeSingle();
        if (data) {
            if (!data.kbis_verified) { document.getElementById('loginError').textContent = t.kbisPending; return; }
            if (data.is_active === false) { document.getElementById('loginError').textContent = t.accountFrozen; return; }
            currentClient = data;
            window.saveClientSession(data);
            hideAuthModal();
            updateAuthUI();
            showToast(t.loginSuccess, 'success');
        } else { document.getElementById('loginError').textContent = 'Email ou mot de passe incorrect'; }
    } catch (err) { document.getElementById('loginError').textContent = 'Erreur'; }
}

async function handleRegister() {
    const email = document.getElementById('regEmail').value.trim();
    const pwd = document.getElementById('regPassword').value;
    const company = document.getElementById('regCompany').value.trim();
    const addr = document.getElementById('regAddress').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const kbis = document.getElementById('regKbis').value.trim();
    const t = translations[currentLang];
    if (!email || !pwd || !company || !addr || !phone || !kbis) {
        document.getElementById('registerError').textContent = 'Remplissez tous les champs';
        return;
    }
    try {
        const { data } = await window.supabase.from('clients').insert([{
            email, password: pwd, company_name: company, address: addr, phone: phone,
            kbis_number: kbis, kbis_verified: false, is_active: true, points: pointsConfig?.register_bonus || 100
        }]).select().single();
        if (data) {
            showToast('Inscription réussie ! En attente validation KBIS.', 'success');
            hideAuthModal();
            document.querySelector('.tab[data-tab="login"]').click();
        }
    } catch (err) { document.getElementById('registerError').textContent = 'Email déjà utilisé'; }
}

function updateAuthUI() {
    const section = document.getElementById('authSection');
    const session = window.checkClientAuth();
    const t = translations[currentLang];
    if (session) {
        currentClient = session;
        section.innerHTML = `<span class="user-name-nav">${escapeHtml(session.company_name)}</span><span class="logout-link" id="logoutBtn">Déconnexion</span>`;
        document.getElementById('logoutBtn').onclick = () => { window.clearClientSession(); currentClient = null; updateAuthUI(); showToast('Déconnecté', 'success'); };
    } else {
        currentClient = null;
        section.innerHTML = `<button class="login-btn-nav" id="loginBtnNav">${t.loginBtn}</button>`;
        document.getElementById('loginBtnNav').onclick = showAuthModal;
    }
}



async function submitOrder() {
    const deliveryDate = document.getElementById('deliveryDate').value;
    const timeSlot = document.getElementById('deliveryTimeSlot').value;
    const notes = document.getElementById('orderNotes').value;
    const t = translations[currentLang];
    
    // ========== 基础验证 ==========
    if (!deliveryDate) {
        showToast('Date requise', 'warning');
        return;
    }
    
    if (!currentClient) {
        showToast(t.loginNeeded, 'warning');
        showAuthModal();
        return;
    }
    
    if (cart.length === 0) {
        showToast(t.emptyCart, 'warning');
        return;
    }
    
    // ========== 获取客户最新信息 ==========
    const { data: client, error: clientError } = await window.supabase
        .from('clients')
        .select('id, kbis_verified, is_active, points')
        .eq('id', currentClient.id)
        .single();
    
    if (clientError) {
        console.error('获取客户信息失败:', clientError);
        showToast('Erreur client', 'error');
        return;
    }
    
    if (!client.kbis_verified) {
        showToast(t.kbisPending, 'warning');
        return;
    }
    
    if (client.is_active === false) {
        showToast(t.accountFrozen, 'warning');
        return;
    }
    
    // ========== 获取最新库存 ==========
    const { data: latestProducts, error: stockError } = await window.supabase
        .from('products')
        .select('id, quantity, name_fr, name_zh, price, promotion_price, is_promotion');
    
    if (stockError) {
        console.error('获取库存失败:', stockError);
        showToast('Erreur stock', 'error');
        return;
    }
    
    const productMap = new Map();
    latestProducts.forEach(p => {
        productMap.set(p.id, {
            quantity: p.quantity || 0,
            name_fr: p.name_fr,
            name_zh: p.name_zh,
            price: p.price,
            promotion_price: p.promotion_price,
            is_promotion: p.is_promotion
        });
    });
    
    // ========== 验证库存 ==========
    for (const item of cart) {
        const productStock = productMap.get(item.id);
        if (!productStock) {
            showToast(`Produit non trouvé`, 'error');
            return;
        }
        
        if (item.quantity > productStock.quantity) {
            const productName = currentLang === 'fr' ? productStock.name_fr : productStock.name_zh;
            showToast(`${t.stockInsufficient}: ${productName} (${t.stockAvailable}: ${productStock.quantity})`, 'error');
            return;
        }
    }
    
    // ========== 计算小计和商品列表 ==========
    let subtotal = 0;
    const items = [];
    
    for (const item of cart) {
        const productInfo = productMap.get(item.id);
        if (!productInfo) continue;
        
        const price = productInfo.is_promotion && productInfo.promotion_price 
            ? productInfo.promotion_price 
            : productInfo.price;
        
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;
        
        items.push({
            id: item.id,
            name_fr: productInfo.name_fr,
            name_zh: productInfo.name_zh,
            quantity: item.quantity,
            price: price,
            original_price: productInfo.price,
            is_promotion: productInfo.is_promotion || false
        });
    }
    
    // ========== 获取优惠码促销对象 ==========
    let couponPromo = null;
    if (appliedCoupon) {
        couponPromo = activePromotions.find(p => p.need_coupon && p.coupon_code === appliedCoupon);
    }
    
    // ========== 计算买N送M折扣 ==========
    let buyNGetMDiscount = 0;
    let buyNGetMDetails = [];
    
    for (const promo of activePromotions) {
        if (promo.need_coupon) continue;
        if (promo.type !== 'buy_n_get_m') continue;
        
        const buyN = promo.buy_n || 3;
        const getM = promo.get_m || 1;
        
        for (const item of cart) {
            const productInfo = productMap.get(item.id);
            if (!productInfo) continue;
            
            // 检查商品是否符合条件
            let isApplicable = false;
            if (promo.applicable_products && promo.applicable_products.length > 0) {
                if (promo.applicable_products.includes(item.id)) isApplicable = true;
            } else if (promo.applicable_categories && promo.applicable_categories.length > 0) {
                const productCategory = products.find(p => p.id === item.id)?.category;
                if (promo.applicable_categories.includes(productCategory)) isApplicable = true;
            } else {
                isApplicable = true;
            }
            
            if (!isApplicable) continue;
            
            const currentPrice = productInfo.is_promotion && productInfo.promotion_price 
                ? productInfo.promotion_price 
                : productInfo.price;
            
            const times = Math.floor(item.quantity / buyN);
            if (times > 0) {
                const discount = times * getM * currentPrice;
                buyNGetMDiscount += discount;
                buyNGetMDetails.push({
                    productName: currentLang === 'fr' ? productInfo.name_fr : productInfo.name_zh,
                    buyN: buyN,
                    getM: getM,
                    times: times,
                    discount: discount
                });
            }
        }
    }
    
    // ========== 计算普通商品小计（用于折扣促销） ==========
    let normalSubtotal = 0;
    for (const item of cart) {
        const productInfo = productMap.get(item.id);
        if (productInfo && !productInfo.is_promotion) {
            const price = productInfo.price;
            normalSubtotal += price * item.quantity;
        }
    }
    
    // ========== 计算自动促销折扣 ==========
    let autoPromoDiscount = 0;
    let autoPromo = null;
    
    for (const promo of activePromotions) {
        if (promo.need_coupon) continue;
        if (promo.type === 'buy_n_get_m') continue;
        
        let discount = 0;
        
        if (promo.type === 'discount' && promo.discount_percent) {
            discount = normalSubtotal * promo.discount_percent / 100;
        } else if (promo.type === 'spend_reduce') {
            if (promo.spend_reduce_tiers) {
                const tiers = typeof promo.spend_reduce_tiers === 'string' 
                    ? JSON.parse(promo.spend_reduce_tiers) 
                    : promo.spend_reduce_tiers;
                if (Array.isArray(tiers)) {
                    for (let i = tiers.length - 1; i >= 0; i--) {
                        if (normalSubtotal >= tiers[i].min) {
                            discount = tiers[i].reduce;
                            break;
                        }
                    }
                }
            } else if (promo.min_amount && normalSubtotal >= promo.min_amount) {
                discount = promo.reduce_amount || 0;
            }
        }
        
        if (discount > autoPromoDiscount) {
            autoPromoDiscount = discount;
            autoPromo = promo;
        }
    }
    
    // ========== 计算优惠码折扣 ==========
    let couponDiscountAmount = 0;
    let couponPromoApplied = null;
    
    if (couponPromo && couponDiscount > 0) {
        couponDiscountAmount = couponDiscount;
        couponPromoApplied = couponPromo;
    } else if (couponPromo && normalSubtotal > 0) {
        if (couponPromo.type === 'discount' && couponPromo.discount_percent) {
            couponDiscountAmount = normalSubtotal * couponPromo.discount_percent / 100;
            couponPromoApplied = couponPromo;
        } else if (couponPromo.type === 'spend_reduce') {
            if (couponPromo.spend_reduce_tiers) {
                const tiers = typeof couponPromo.spend_reduce_tiers === 'string' 
                    ? JSON.parse(couponPromo.spend_reduce_tiers) 
                    : couponPromo.spend_reduce_tiers;
                if (Array.isArray(tiers)) {
                    for (let i = tiers.length - 1; i >= 0; i--) {
                        if (normalSubtotal >= tiers[i].min) {
                            couponDiscountAmount = tiers[i].reduce;
                            couponPromoApplied = couponPromo;
                            break;
                        }
                    }
                }
            } else if (couponPromo.min_amount && normalSubtotal >= couponPromo.min_amount) {
                couponDiscountAmount = couponPromo.reduce_amount || 0;
                couponPromoApplied = couponPromo;
            }
        }
    }
    
    // ========== 计算积分抵扣 ==========
    let pointsDiscountAmount = 0;
    let pointsUsed = 0;
    
    if (usePoints && client.points > 0 && pointsConfig) {
        let afterPromoTotal = subtotal - buyNGetMDiscount - autoPromoDiscount - couponDiscountAmount;
        if (afterPromoTotal < 0) afterPromoTotal = 0;
        
        const maxDiscountPercent = pointsConfig.max_redeem_percent || 30;
        const maxDiscount = afterPromoTotal * (maxDiscountPercent / 100);
        const pointsValue = client.points * (pointsConfig.redeem_rate || 0.01);
        
        pointsDiscountAmount = Math.min(maxDiscount, pointsValue);
        pointsDiscountAmount = Math.min(pointsDiscountAmount, afterPromoTotal);
        pointsUsed = Math.floor(pointsDiscountAmount / (pointsConfig.redeem_rate || 0.01));
        
        if (pointsUsed > client.points) {
            pointsUsed = client.points;
            pointsDiscountAmount = pointsUsed * (pointsConfig.redeem_rate || 0.01);
        }
    }
    
    // ========== 计算最终总价 ==========
    let finalTotal = subtotal - buyNGetMDiscount - autoPromoDiscount - couponDiscountAmount - pointsDiscountAmount;
    if (finalTotal < 0) finalTotal = 0;
    
    const totalDiscount = subtotal - finalTotal;
    
    // ========== 构建优惠详情字符串 ==========
    let discountDetails = '';
    
    if (buyNGetMDetails.length > 0) {
        for (const detail of buyNGetMDetails) {
            discountDetails += `🎁 ${detail.productName}: Achetez ${detail.buyN} = ${detail.getM} gratuit (${detail.times}x, économie ${formatPrice(detail.discount)}€)\n`;
        }
    }
    
    if (autoPromo && autoPromoDiscount > 0) {
        const promoName = currentLang === 'fr' ? autoPromo.name : (autoPromo.name_zh || autoPromo.name);
        if (autoPromo.type === 'discount') {
            discountDetails += `🏷️ ${promoName}: -${autoPromo.discount_percent}% (${formatPrice(autoPromoDiscount)}€)\n`;
        } else if (autoPromo.type === 'spend_reduce') {
            discountDetails += `🏷️ ${promoName}: Réduction de ${formatPrice(autoPromoDiscount)}€\n`;
        }
    }
    
    if (couponPromoApplied && couponDiscountAmount > 0) {
        const promoName = currentLang === 'fr' ? couponPromoApplied.name : (couponPromoApplied.name_zh || couponPromoApplied.name);
        discountDetails += `🎫 ${promoName} (${appliedCoupon}): -${formatPrice(couponDiscountAmount)}€\n`;
    }
    
    if (pointsDiscountAmount > 0) {
        discountDetails += `⭐ Points: ${pointsUsed} pts = -${formatPrice(pointsDiscountAmount)}€\n`;
    }
    
    if (discountDetails === '') {
        discountDetails = 'Aucune réduction appliquée';
    }
    
    // ========== 生成订单号 ==========
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    
    const { data: lastOrders } = await window.supabase
        .from('customer_orders')
        .select('order_number')
        .order('created_at', { ascending: false })
        .limit(1);
    
    let seq = 1;
    if (lastOrders && lastOrders.length > 0) {
        const lastNumber = lastOrders[0].order_number;
        const parts = lastNumber.split('-');
        if (parts.length === 3) {
            const lastSeq = parseInt(parts[2]);
            if (!isNaN(lastSeq)) seq = lastSeq + 1;
        }
    }
    
    const orderNumber = `YIDA-${dateStr}-${String(seq).padStart(4, '0')}`;
    
    // ========== 更新优惠码使用次数 ==========
    if (couponPromoApplied && appliedCoupon) {
        const newUsageCount = (couponPromoApplied.usage_count || 0) + 1;
        await window.supabase
            .from('promotions')
            .update({ usage_count: newUsageCount })
            .eq('id', couponPromoApplied.id);
    }
    
    // ========== 构建订单数据 ==========
    const orderData = {
        order_number: orderNumber,
        client_id: currentClient.id,
        items: items,
        original_amount: subtotal,
        total_amount: finalTotal,
        discount_amount: totalDiscount,
        discount_details: discountDetails,
        delivery_date: deliveryDate,
        delivery_time_slot: timeSlot,
        status: 'pending',
        payment_status: 'unpaid',
        notes: notes || null,
        created_at: new Date().toISOString()
    };
    
    console.log('📦 订单数据:', orderData);
    console.log('📊 优惠详情:\n', discountDetails);
    console.log('💰 小计:', subtotal, '→ 最终:', finalTotal, '→ 优惠:', totalDiscount);
    
    // ========== 创建订单 ==========
    try {
        const { error: insertError, data: insertedOrder } = await window.supabase
            .from('customer_orders')
            .insert([orderData])
            .select();
        
        if (insertError) {
            console.error('插入订单失败:', insertError);
            throw insertError;
        }
        
        console.log('✅ 订单创建成功:', insertedOrder);
        
        // ========== 更新库存 ==========
        for (const item of cart) {
            const productStock = productMap.get(item.id);
            if (productStock) {
                const newQuantity = productStock.quantity - item.quantity;
                await window.supabase
                    .from('products')
                    .update({ quantity: newQuantity, updated_at: new Date() })
                    .eq('id', item.id);
                
                // 同步本地 products 数组
                const localProduct = products.find(p => p.id === item.id);
                if (localProduct) {
                    localProduct.quantity = newQuantity;
                }
            }
        }
        
        // ========== 更新客户积分（扣减使用的积分） ==========
        if (pointsUsed > 0) {
            const newPoints = client.points - pointsUsed;
            await window.supabase
                .from('clients')
                .update({ points: newPoints })
                .eq('id', currentClient.id);
            
            // 记录积分历史
            await window.supabase
                .from('points_history')
                .insert([{
                    client_id: currentClient.id,
                    points: pointsUsed,
                    type: 'spend',
                    reason: 'order_payment',
                    order_id: insertedOrder?.[0]?.id || null
                }]);
            
            currentClient.points = newPoints;
            window.saveClientSession(currentClient);
        }
        
        // ========== 清空购物车和相关变量 ==========
        cart = [];
        saveCart();
        appliedCoupon = null;
        couponDiscount = 0;
        usePoints = false;
        pointsDiscount = 0;
        currentAppliedPromotions = [];
        currentPromotionDiscount = 0;
        
        // ========== 关闭模态框并显示成功 ==========
        document.getElementById('orderModal').classList.remove('active');
        showToast(`${t.orderSuccess} (${orderNumber})`, 'success');
        
        // ========== 清空表单 ==========
        document.getElementById('deliveryDate').value = '';
        document.getElementById('orderNotes').value = '';
        document.getElementById('couponCodeInput').value = '';
        document.getElementById('couponMessage').innerHTML = '';
        
        // ========== 刷新界面 ==========
        renderProducts();
        updateCartUI();
        
        // ========== 可选：2秒后跳转到订单页面 ==========
        setTimeout(() => {
            if (confirm('Voir mes commandes ?')) {
                window.location.href = '../client_orders/client_orders.html';
            }
        }, 1500);
        
    } catch (err) {
        console.error('❌ 下单错误:', err);
        showToast('Erreur: ' + (err.message || 'Commande échouée'), 'error');
    }
}
function updateUILanguage() {
    const t = translations[currentLang];
    
    // 安全设置文本内容的辅助函数
    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
    
    setText('heroTitle', t.heroTitle);
    setText('heroSubtitle', t.heroSubtitle);
    setText('categoryTitle', t.categoryTitle);
    setText('catAll', t.catAll);
    setText('catDry', t.catDry);
    setText('catFrozen', t.catFrozen);
    setText('catFresh', t.catFresh);
    setText('catNonfood', t.catNonfood);
    setText('catPromotion', t.catPromotion);
    setText('cartTitle', t.cartTitle);
    setText('totalLabel', t.total);
    setText('checkoutBtn', t.checkout);
    setText('modalTitle', t.loginTitle);
    setText('tabLogin', t.loginTitle);
    setText('tabRegister', t.registerTitle);
    setText('emailLabel', t.emailLabel);
    setText('passwordLabel', t.passwordLabel);
    setText('doLoginBtn', t.loginBtn);
    setText('regEmailLabel', t.regEmailLabel);
    setText('regPasswordLabel', t.regPasswordLabel);
    setText('regCompanyLabel', t.regCompanyLabel);
    setText('regAddressLabel', t.regAddressLabel);
    setText('regPhoneLabel', t.regPhoneLabel);
    setText('regKbisLabel', t.regKbisLabel);
    setText('doRegisterBtn', t.registerBtn);
    setText('orderTitle', t.orderConfirmTitle);
    setText('deliveryDateLabel', t.deliveryDate);
    setText('deliveryTimeLabel', t.deliveryTime);
    setText('notesLabel', t.notes);
    setText('totalOrderLabel', t.total);
    setText('submitOrderBtn', t.confirmOrder);
    setText('ordersLink', t.ordersLink);
    setText('couponLabel', t.couponLabel);
    
    const applyBtn = document.getElementById('applyCouponBtn');
    if (applyBtn) applyBtn.textContent = t.applyCoupon;
    
    const couponInput = document.getElementById('couponCodeInput');
    if (couponInput) couponInput.placeholder = t.couponPlaceholder;
    
    const useLabel = document.getElementById('usePointsLabel');
    if (useLabel) useLabel.textContent = t.usePoints;
    
    // ========== 配送时段下拉菜单（动态翻译，支持所有选项） ==========
    const timeSlotSelect = document.getElementById('deliveryTimeSlot');
    if (timeSlotSelect) {
        const slots = timeSlotSelect.options;
        for (let i = 0; i < slots.length; i++) {
            const value = slots[i].value;
            if (value === 'flexible') {
                slots[i].text = currentLang === 'fr' 
                    ? '🕒 Flexible (selon disponibilité du livreur)' 
                    : '🕒 随意（根据配送员时间安排）';
            } else {
                slots[i].text = value;
            }
        }
    }
    
    // 返回按钮翻译
    const backBtn = document.getElementById('backToCategoriesBtn');
    if (backBtn) {
        backBtn.innerHTML = currentLang === 'fr' ? '← Retour aux catégories' : '← 返回分类';
    }
    
    updatePromotionMarquee();
    renderCategories();
    renderProducts();
    updateCartUI();
}

// ========== 添加折扣标签区域到 HTML ==========
function addDiscountTagsContainer() {
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter && !document.getElementById('discountTags')) {
        const discountTagsDiv = document.createElement('div');
        discountTagsDiv.id = 'discountTags';
        discountTagsDiv.style.marginBottom = '10px';
        discountTagsDiv.style.display = 'flex';
        discountTagsDiv.style.flexWrap = 'wrap';
        discountTagsDiv.style.gap = '8px';
        
        const cartTotalDiv = cartFooter.querySelector('.cart-total');
        if (cartTotalDiv) {
            cartFooter.insertBefore(discountTagsDiv, cartTotalDiv);
        }
    }
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', async () => {
    // 语言切换按钮
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            updateUILanguage();
        };
    });
    
    // 分类切换按钮
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderProducts();
        };
    });
    
    // 购物车相关
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCartBtn');
    const sidebar = document.getElementById('cartSidebar');
    if (cartIcon) cartIcon.onclick = () => sidebar.classList.add('open');
    if (closeCart) closeCart.onclick = () => sidebar.classList.remove('open');
    
    // 模态框关闭
    const closeModal = document.getElementById('closeModalBtn');
    const authModal = document.getElementById('authModal');
    if (closeModal) closeModal.onclick = hideAuthModal;
    if (authModal) authModal.onclick = (e) => { if (e.target === authModal) hideAuthModal(); };
    
    // 登录注册按钮
    document.getElementById('doLoginBtn').onclick = handleLogin;
    document.getElementById('doRegisterBtn').onclick = handleRegister;
    
    // Tab切换
    document.querySelectorAll('.tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tab.dataset.tab}Form`).classList.add('active');
        };
    });
    
    // 订单模态框
    const closeOrder = document.getElementById('closeOrderModalBtn');
    const orderModal = document.getElementById('orderModal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const submitBtn = document.getElementById('submitOrderBtn');
    if (closeOrder) closeOrder.onclick = () => orderModal.classList.remove('active');
    if (orderModal) orderModal.onclick = (e) => { if (e.target === orderModal) orderModal.classList.remove('active'); };
    if (checkoutBtn) checkoutBtn.onclick = showOrderModal;
    if (submitBtn) submitBtn.onclick = submitOrder;
    
    // 返回分类按钮
    const backBtn = document.getElementById('backToCategoriesBtn');
    if (backBtn) backBtn.onclick = backToCategories;
    
    // ========== 加载数据 ==========
        // 在 DOMContentLoaded 中
        await loadPointsConfig();
        await loadActivePromotions();  // 确保这行存在
        await loadProducts();
        loadCart();
        updateAuthUI();
        updateUILanguage();  // 这个会调用 updatePromotionMarquee
    
    // ========== 页面初始状态 ==========
    // 显示大类卡片，隐藏商品列表
    const categoriesGrid = document.getElementById('categoriesGrid');
    const productsSection = document.getElementById('productsSection');
    const categorySection = document.getElementById('categorySection');
    
    if (categoriesGrid) categoriesGrid.style.display = 'grid';
    if (productsSection) productsSection.style.display = 'none';
    if (categorySection) categorySection.style.display = 'none';
});
window.addToCart = addToCart;
window.updateCartItem = updateCartItem;
window.removeCartItem = removeCartItem;
window.removePromotion = removePromotion;
window.removeCoupon = removeCoupon;