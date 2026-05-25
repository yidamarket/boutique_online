// ========== client_orders.js ==========
let currentLang = 'fr';
let currentClient = null;
let orders = [];
let transportOrders = [];
let changeRequests = [];
let currentFilter = 'all';
let pointsConfig = null;

const translations = {
    fr: {
        heroTitle: "📋 Mon espace",
        heroSubtitle: "Gérez vos points et commandes",
        filterTitle: "Mes commandes",
        pointsLabel: "Mes points",
        pointsPendingLabel: "Points à venir",
        filterAll: "Toutes",
        filterPending: "📝 En attente",
        filterConfirmed: "✅ Confirmée",
        filterDelivered: "🚚 Livrée",
        filterCancelled: "❌ Annulée",
        orderNumber: "Commande",
        subtotal: "Sous-total",
        discount: "Réduction",
        total: "Total",
        paymentStatus: "Paiement",
        paymentUnpaid: "En attente",
        paymentPaid: "Payé",
        viewDetail: "Voir détails",
        cancelOrder: "Annuler",
        cancelConfirm: "Annuler cette commande ?",
        cancelSuccess: "Commande annulée",
        cancelError: "Erreur lors de l'annulation",
        cancelNotAllowed: "Cette commande ne peut pas être annulée",
        orderDetails: "Détails",
        items: "Articles",
        deliveryDate: "Livraison",
        deliveryTime: "Créneau",
        status: "Statut",
        transportStatus: "Transport",
        notes: "Notes",
        orderDate: "Date",
        noOrders: "📭 Aucune commande",
        loading: "Chargement...",
        loginRequired: "Veuillez vous connecter",
        shopLink: "Boutique",
        ordersLink: "Mon espace",
        settingsLink: "Paramètres",
        pointsExpected: "Points à gagner",
        willBeCreditedAfterPayment: "sera crédité après paiement",
        settingsTitle: "Paramètres",
        settingsSubtitle: "Modifiez vos informations",
        tabPassword: "Mot de passe",
        tabAddress: "Adresse",
        tabPhone: "Téléphone",
        tabKbis: "KBIS",
        tabRequests: "Mes demandes",
        currentPasswordLabel: "Mot de passe actuel",
        newPasswordLabel: "Nouveau mot de passe",
        confirmPasswordLabel: "Confirmation",
        currentAddressLabel: "Adresse actuelle",
        newAddressLabel: "Nouvelle adresse",
        currentPhoneLabel: "Téléphone actuel",
        newPhoneLabel: "Nouveau téléphone",
        currentKbisLabel: "KBIS actuel",
        newKbisLabel: "Nouveau KBIS",
        submitBtn: "Envoyer",
        infoNote: "⚠️ Modification après validation admin",
        changeRequestSent: "Demande envoyée",
        allFieldsRequired: "Tous les champs sont requis",
        passwordMismatch: "Les mots de passe ne correspondent pas",
        passwordTooShort: "6 caractères minimum",
        wrongCurrentPassword: "Mot de passe incorrect",
        emptyRequests: "Aucune demande en cours",
        pendingRequests: "Demandes en attente",
        requestField: {
            password: "Mot de passe",
            address: "Adresse",
            phone: "Téléphone",
            kbis_number: "KBIS"
        },
        requestStatus: {
            pending: "En attente",
            approved: "Approuvé",
            rejected: "Rejeté"
        },
        statusLabels: {
            pending: "En attente",
            confirmed: "Confirmée",
            delivered: "Livrée",
            cancelled: "Annulée"
        },
        transportStatusLabels: {
            en_attente: "En attente",
            en_preparation: "Préparation",
            en_livraison: "En livraison",
            livree: "Livrée"
        }
    },
    zh: {
        heroTitle: "📋 我的空间",
        heroSubtitle: "管理积分和订单",
        filterTitle: "我的订单",
        pointsLabel: "我的积分",
        pointsPendingLabel: "即将到账",
        filterAll: "全部",
        filterPending: "📝 待确认",
        filterConfirmed: "✅ 已确认",
        filterDelivered: "🚚 已配送",
        filterCancelled: "❌ 已取消",
        orderNumber: "订单号",
        subtotal: "小计",
        discount: "优惠",
        total: "合计",
        paymentStatus: "支付",
        paymentUnpaid: "待支付",
        paymentPaid: "已支付",
        viewDetail: "查看详情",
        cancelOrder: "取消",
        cancelConfirm: "确定取消这个订单？",
        cancelSuccess: "订单已取消",
        cancelError: "取消失败",
        cancelNotAllowed: "此订单不能取消",
        orderDetails: "订单详情",
        items: "商品清单",
        deliveryDate: "配送日期",
        deliveryTime: "配送时段",
        status: "订单状态",
        transportStatus: "配送状态",
        notes: "备注",
        orderDate: "下单日期",
        noOrders: "📭 暂无订单",
        loading: "加载中...",
        loginRequired: "请先登录",
        shopLink: "商城",
        ordersLink: "我的空间",
        settingsLink: "设置",
        pointsExpected: "即将获得",
        willBeCreditedAfterPayment: "支付后到账",
        settingsTitle: "账户设置",
        settingsSubtitle: "修改个人信息",
        tabPassword: "修改密码",
        tabAddress: "修改地址",
        tabPhone: "修改电话",
        tabKbis: "修改KBIS",
        tabRequests: "我的申请",
        currentPasswordLabel: "当前密码",
        newPasswordLabel: "新密码",
        confirmPasswordLabel: "确认密码",
        currentAddressLabel: "当前地址",
        newAddressLabel: "新地址",
        currentPhoneLabel: "当前电话",
        newPhoneLabel: "新电话",
        currentKbisLabel: "当前KBIS",
        newKbisLabel: "新KBIS",
        submitBtn: "提交申请",
        infoNote: "⚠️ 修改需管理员审核",
        changeRequestSent: "申请已提交",
        allFieldsRequired: "请填写所有字段",
        passwordMismatch: "两次密码不一致",
        passwordTooShort: "密码至少6位",
        wrongCurrentPassword: "当前密码错误",
        emptyRequests: "暂无申请记录",
        pendingRequests: "待审核申请",
        requestField: {
            password: "密码",
            address: "地址",
            phone: "电话",
            kbis_number: "KBIS"
        },
        requestStatus: {
            pending: "待审核",
            approved: "已通过",
            rejected: "已拒绝"
        },
        statusLabels: {
            pending: "待确认",
            confirmed: "已确认",
            delivered: "已配送",
            cancelled: "已取消"
        },
        transportStatusLabels: {
            en_attente: "等待备货",
            en_preparation: "备货中",
            en_livraison: "配送中",
            livree: "已送达"
        }
    }
};

function showToast(message, type = 'success') {
    const toast = document.getElementById('customToast');
    const icon = document.getElementById('toastIcon');
    const msg = document.getElementById('toastMessage');
    if (!toast) return;
    toast.classList.remove('success', 'error', 'warning');
    toast.classList.add(type);
    icon.textContent = type === 'success' ? '✅' : (type === 'error' ? '❌' : '⚠️');
    msg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function showConfirm(title, message, onConfirm) {
    const modal = document.getElementById('customConfirmModal');
    if (!modal) {
        if (confirm(title + '\n' + message)) onConfirm();
        return;
    }
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    modal.classList.add('active');
    const confirmBtn = document.getElementById('confirmOkBtn');
    const cancelBtn = document.getElementById('confirmCancelBtn');
    const handler = (confirmed) => {
        confirmBtn.removeEventListener('click', confirmHandler);
        cancelBtn.removeEventListener('click', cancelHandler);
        modal.classList.remove('active');
        if (confirmed && onConfirm) onConfirm();
    };
    const confirmHandler = () => handler(true);
    const cancelHandler = () => handler(false);
    confirmBtn.addEventListener('click', confirmHandler, { once: true });
    cancelBtn.addEventListener('click', cancelHandler, { once: true });
}

function formatPrice(p) { return parseFloat(p).toFixed(2); }
function formatDate(d) { if (!d) return '-'; return new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'zh-CN'); }
function formatDateTime(d) { if (!d) return '-'; return new Date(d).toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'zh-CN'); }
function escapeHtml(t) { if (!t) return ''; const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

async function loadPointsConfig() {
    try {
        const { data } = await window.supabase.from('points_config').select('*').limit(1);
        pointsConfig = data?.[0] || { exchange_rate: 10 };
    } catch (err) { pointsConfig = { exchange_rate: 10 }; }
}

function calcPointsEarned(amount) { return Math.floor(amount * (pointsConfig?.exchange_rate || 10)); }

async function updatePointsDisplay() {
    if (!currentClient) return;
    try {
        const { data } = await window.supabase.from('clients').select('points').eq('id', currentClient.id).single();
        document.getElementById('pointsValue').textContent = data?.points || 0;
        
        // 修改这里：只要没付钱就算 pending 积分
        const unpaidOrders = orders.filter(o => o.payment_status !== 'paid' && o.status !== 'cancelled');
        const pendingPoints = unpaidOrders.reduce((s, o) => s + calcPointsEarned(o.total_amount), 0);
        
        const div = document.getElementById('pointsPending');
        if (pendingPoints > 0) {
            div.style.display = 'flex';
            document.getElementById('pendingValue').textContent = pendingPoints;
        } else { 
            div.style.display = 'none'; 
        }
    } catch (err) {}
}

function getTransportClass(s) {
    switch(s) {
        case 'en_attente': return 'transport-status-pending';
        case 'en_preparation': return 'transport-status-preparing';
        case 'en_livraison': return 'transport-status-delivering';
        case 'livree': return 'transport-status-delivered';
        default: return 'transport-status-pending';
    }
}

function getTransportLabel(s) {
    const t = translations[currentLang];
    return t.transportStatusLabels[s] || s || 'En attente';
}

async function cancelOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || order.status !== 'pending') {
        showToast(translations[currentLang].cancelNotAllowed, 'warning');
        return;
    }
    const t = translations[currentLang];
    showConfirm(t.cancelOrder, t.cancelConfirm, async () => {
        try {
            // 1. 恢复库存
            if (order.items && order.items.length > 0) {
                for (const item of order.items) {
                    const { data: product } = await window.supabase
                        .from('products')
                        .select('quantity')
                        .eq('id', item.id)
                        .single();
                    
                    if (product) {
                        const newQuantity = (product.quantity || 0) + item.quantity;
                        await window.supabase
                            .from('products')
                            .update({ quantity: newQuantity })
                            .eq('id', item.id);
                    }
                }
            }
            
            // 2. 更新订单状态
            await window.supabase
                .from('customer_orders')
                .update({ status: 'cancelled', payment_status: 'unpaid' })
                .eq('id', orderId);
            
            showToast(t.cancelSuccess, 'success');
            await loadOrders();
        } catch (err) { 
            console.error(err);
            showToast(t.cancelError, 'error'); 
        }
    });
}

async function loadTransportOrders() {
    if (!currentClient) return;
    try {
        // 先获取当前客户的所有订单ID
        const { data: customerOrders } = await window.supabase
            .from('customer_orders')
            .select('id')
            .eq('client_id', currentClient.id);
        
        if (!customerOrders || customerOrders.length === 0) {
            transportOrders = [];
            return;
        }
        
        const orderIds = customerOrders.map(o => o.id);
        
        // 通过 source_order_id 关联查询内部配送表
        const { data } = await window.supabase
            .from('orders')
            .select('*')
            .in('source_order_id', orderIds)
            .order('created_at', { ascending: false });
        
        transportOrders = data || [];
    } catch (err) { 
        console.error('加载配送状态失败:', err);
        transportOrders = []; 
    }
}

async function loadChangeRequests() {
    if (!currentClient) return;
    try {
        const { data } = await window.supabase.from('client_change_requests').select('*').eq('client_id', currentClient.id).order('created_at', { ascending: false });
        changeRequests = data || [];
        renderChangeRequests();
    } catch (err) { changeRequests = []; }
}

function renderChangeRequests() {
    const container = document.getElementById('userRequestsList');
    const t = translations[currentLang];
    if (!container) return;
    if (!changeRequests.length) {
        container.innerHTML = `<div class="empty-requests">${t.emptyRequests}</div>`;
        return;
    }
    const html = changeRequests.map(req => {
        const fieldName = t.requestField[req.field_name] || req.field_name;
        let statusClass = 'status-pending';
        let statusText = t.requestStatus.pending;
        if (req.status === 'approved') {
            statusClass = 'status-approved';
            statusText = t.requestStatus.approved;
        } else if (req.status === 'rejected') {
            statusClass = 'status-rejected';
            statusText = t.requestStatus.rejected;
        }
        return `<div class="request-item">
            <span class="request-field">${fieldName}</span>
            <div class="request-values">
                <span class="request-old">${escapeHtml(req.old_value || '-')}</span>
                <span class="request-new">→ ${escapeHtml(req.new_value)}</span>
            </div>
            <span class="request-status ${statusClass}">${statusText}</span>
        </div>`;
    }).join('');
    container.innerHTML = html;
}

async function loadOrders() {
    const t = translations[currentLang];
    if (!currentClient) {
        document.getElementById('ordersList').innerHTML = `<div class="empty-state"><p>${t.loginRequired}</p></div>`;
        return;
    }
    try {
        if (!pointsConfig) {
            await loadPointsConfig();
        }
        
        // 1. 获取客户的所有订单
        const { data: customerOrdersData, error: customerError } = await window.supabase
            .from('customer_orders')
            .select('*')
            .eq('client_id', currentClient.id)
            .order('created_at', { ascending: false });
        
        if (customerError) throw customerError;
        
        if (!customerOrdersData || customerOrdersData.length === 0) {
            orders = [];
            renderOrders();
            await updatePointsDisplay();
            return;
        }
        
        // 2. 获取所有订单ID
        const orderIds = customerOrdersData.map(o => o.id);
        
        // 3. 从内部配送表获取配送状态（通过 source_order_id 一一对应）
        const { data: transportData, error: transportError } = await window.supabase
            .from('orders')
            .select('source_order_id, status, driver, date, time_req')
            .in('source_order_id', orderIds);
        
        if (transportError) throw transportError;
        
        // 4. 创建映射表：source_order_id -> 配送信息
        const transportMap = new Map();
        if (transportData) {
            transportData.forEach(item => {
                transportMap.set(item.source_order_id, {
                    status: item.status,
                    driver: item.driver,
                    date: item.date,
                    time_req: item.time_req
                });
            });
        }
        
        // 5. 合并数据
        orders = customerOrdersData.map(order => {
            const transportInfo = transportMap.get(order.id);
            return {
                ...order,
                original_amount: order.original_amount || order.total_amount,
                transport_status: transportInfo?.status || null,
                transport_driver: transportInfo?.driver || null,
                transport_date: transportInfo?.date || null
            };
        });
        
        await updatePointsDisplay();
        renderOrders();
        
    } catch (err) { 
        console.error('加载订单失败:', err);
        document.getElementById('ordersList').innerHTML = `<div class="empty-state"><p>❌ ${t.loading}</p></div>`; 
    }
}

function renderOrders() {
    const t = translations[currentLang];
    let filtered = currentFilter === 'all' ? orders : orders.filter(o => o.status === currentFilter);
    if (filtered.length === 0) {
        document.getElementById('ordersList').innerHTML = `<div class="empty-state"><p>${t.noOrders}</p></div>`;
        return;
    }
    const html = filtered.map(order => {
        const cancelled = order.status === 'cancelled';
        const preview = order.items ? order.items.slice(0,2).map(i => `${currentLang === 'fr' ? i.name_fr : i.name_zh} x${i.quantity}`).join(', ') : '';
        const more = order.items?.length > 2 ? ` +${order.items.length - 2}` : '';
        
        // 始终显示积分（即使是0）
        let points = 0;
        if (pointsConfig) {
            points = Math.floor(order.total_amount * (pointsConfig.exchange_rate || 10));
        }
        // 只有 pending 状态且未支付的订单才显示"即将到账"文字
        // 新代码：只要没付钱就显示
        const showPointsText = order.payment_status !== 'paid' && !cancelled;
        const pointsHtml = showPointsText ? `<div class="order-points">⭐ ${t.pointsExpected}: ${points} pts (${t.willBeCreditedAfterPayment})</div>` : '';
        
        const statusClass = order.status === 'pending' ? 'status-badge-pending' : (order.status === 'confirmed' ? 'status-badge-confirmed' : (order.status === 'delivered' ? 'status-badge-delivered' : 'status-badge-cancelled'));
        const transport = order.transport_status;
        const hasDiscount = order.original_amount > order.total_amount;
        const showCancel = order.status === 'pending' && !cancelled;
        
        return `<div class="order-card">
            <div class="order-header">
                <span class="order-number">${escapeHtml(order.order_number)}</span>
                <span class="order-date">${formatDate(order.created_at)}</span>
                <div class="order-status-group">
                    <span class="order-status ${statusClass}">${t.statusLabels[order.status]}</span>
                    ${!cancelled ? `<span class="payment-status ${order.payment_status === 'paid' ? 'payment-paid' : 'payment-unpaid'}">💰 ${order.payment_status === 'paid' ? t.paymentPaid : t.paymentUnpaid}</span>` : ''}
                    ${transport ? `<span class="order-status ${getTransportClass(transport)}">🚚 ${getTransportLabel(transport)}</span>` : ''}
                </div>
            </div>
            <div class="order-items-preview">${escapeHtml(preview)}${more}</div>
            <div class="order-price-group">${hasDiscount ? `<span class="order-original-price">${formatPrice(order.original_amount)} €</span> <span class="order-price-arrow">→</span> <span class="order-total">${formatPrice(order.total_amount)} €</span>` : `<span class="order-total">${formatPrice(order.total_amount)} €</span>`}</div>
            ${pointsHtml}
            <div class="order-footer">
                <span class="order-delivery">📅 ${formatDate(order.delivery_date)} ${order.delivery_time_slot}</span>
                <div class="order-actions">
                    <button class="view-detail-btn" onclick="showOrderDetail('${order.id}')">${t.viewDetail} →</button>
                    ${showCancel ? `<button class="cancel-order-btn" onclick="cancelOrder('${order.id}')">❌ ${t.cancelOrder}</button>` : ''}
                </div>
            </div>
        </div>`;
    }).join('');
    document.getElementById('ordersList').innerHTML = html;
}
async function showOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const t = translations[currentLang];
    const itemsHtml = order.items?.map(i => `<div class="detail-item"><span>${escapeHtml(currentLang === 'fr' ? i.name_fr : i.name_zh)} x ${i.quantity}</span><span>${formatPrice(i.price * i.quantity)} €</span></div>`).join('') || '<div>Aucun article</div>';
    const cancelled = order.status === 'cancelled';
    const statusBg = order.status === 'pending' ? '#fef3c7' : (order.status === 'confirmed' ? '#dcfce7' : (order.status === 'delivered' ? '#dbeafe' : '#fee2e2'));
    const statusColor = order.status === 'pending' ? '#d97706' : (order.status === 'confirmed' ? '#16a34a' : (order.status === 'delivered' ? '#2563eb' : '#dc2626'));
    const hasDiscount = order.original_amount > order.total_amount;
    const discountAmt = hasDiscount ? order.original_amount - order.total_amount : 0;
    document.getElementById('orderDetailContent').innerHTML = `
        <div class="detail-section"><h4>${t.items}</h4><div>${itemsHtml}</div></div>
        <div class="detail-section"><h4>${t.orderDetails}</h4>
            <div class="detail-info-row"><span class="detail-label">${t.orderNumber}</span><span>${escapeHtml(order.order_number)}</span></div>
            <div class="detail-info-row"><span class="detail-label">${t.orderDate}</span><span>${formatDateTime(order.created_at)}</span></div>
            <div class="detail-info-row"><span class="detail-label">${t.status}</span><span style="padding:2px 8px;border-radius:20px;background:${statusBg};color:${statusColor}">${t.statusLabels[order.status]}</span></div>
            ${!cancelled ? `<div class="detail-info-row"><span class="detail-label">${t.paymentStatus}</span><span>${order.payment_status === 'paid' ? t.paymentPaid : t.paymentUnpaid}</span></div>` : ''}
            <div class="detail-info-row"><span class="detail-label">${t.transportStatus}</span><span>${order.transport_status ? getTransportLabel(order.transport_status) : '-'}</span></div>
            ${hasDiscount ? `<div class="detail-info-row"><span class="detail-label">${t.subtotal}</span><span>${formatPrice(order.original_amount)} €</span></div>
            <div class="detail-info-row"><span class="detail-label">${t.discount}</span><span style="color:#10b981;">-${formatPrice(discountAmt)} €</span></div>` : ''}
            <div class="detail-info-row"><span class="detail-label">${t.total}</span><span style="font-weight:800;color:#e63946;">${formatPrice(order.total_amount)} €</span></div>
            <div class="detail-info-row"><span class="detail-label">${t.deliveryDate}</span><span>${formatDate(order.delivery_date)}</span></div>
            <div class="detail-info-row"><span class="detail-label">${t.deliveryTime}</span><span>${order.delivery_time_slot}</span></div>
            ${order.notes ? `<div class="detail-info-row"><span class="detail-label">${t.notes}</span><span>${escapeHtml(order.notes)}</span></div>` : ''}
        </div>
    `;
    document.getElementById('modalTitle').textContent = t.orderDetails;
    document.getElementById('orderDetailModal').classList.add('active');
}

function updateAuthUI() {
    const session = window.checkClientAuth();
    if (session) {
        currentClient = session;
        document.getElementById('userName').textContent = session.company_name;
        document.getElementById('authSection').style.display = 'flex';
        loadOrders();
        loadChangeRequests();
    } else {
        currentClient = null;
        showToast(translations[currentLang].loginRequired, 'warning');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    }
}

let clientData = {};
async function loadClientData() {
    if (!currentClient) return;
    const { data } = await window.supabase.from('clients').select('address, phone, kbis_number, password').eq('id', currentClient.id).single();
    if (data) {
        clientData = data;
        document.getElementById('currentAddressDisplay').textContent = data.address || '-';
        document.getElementById('currentPhoneDisplay').textContent = data.phone || '-';
        document.getElementById('currentKbisDisplay').textContent = data.kbis_number || '-';
    }
}

window.showSettingsModal = function() {
    loadClientData();
    document.getElementById('settingsModal').classList.add('active');
    ['currentPassword','newPassword','confirmPassword','newAddress','newPhone','newKbis'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    ['passwordMessage','addressMessage','phoneMessage','kbisMessage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
};

async function verifyPwd(pwd) {
    const { data } = await window.supabase.from('clients').select('password').eq('id', currentClient.id).single();
    return data?.password === pwd;
}

async function submitChange(field, newVal, oldVal) {
    const t = translations[currentLang];
    try {
        await window.supabase.from('client_change_requests').insert([{
            client_id: currentClient.id,
            field_name: field,
            old_value: oldVal,
            new_value: newVal,
            status: 'pending'
        }]);
        showToast(t.changeRequestSent, 'success');
        loadChangeRequests();
        return true;
    } catch (err) { showToast('Erreur', 'error'); return false; }
}

async function submitPassword() {
    const cur = document.getElementById('currentPassword').value;
    const neu = document.getElementById('newPassword').value;
    const conf = document.getElementById('confirmPassword').value;
    const msg = document.getElementById('passwordMessage');
    const t = translations[currentLang];
    if (!cur || !neu || !conf) { msg.innerHTML = `<span class="error">${t.allFieldsRequired}</span>`; return; }
    if (neu !== conf) { msg.innerHTML = `<span class="error">${t.passwordMismatch}</span>`; return; }
    if (neu.length < 6) { msg.innerHTML = `<span class="error">${t.passwordTooShort}</span>`; return; }
    const ok = await verifyPwd(cur);
    if (!ok) { msg.innerHTML = `<span class="error">${t.wrongCurrentPassword}</span>`; return; }
    const success = await submitChange('password', neu, '********');
    if (success) {
        ['currentPassword','newPassword','confirmPassword'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        msg.innerHTML = `<span class="success">${t.changeRequestSent}</span>`;
    }
}

async function submitAddress() {
    const newAddr = document.getElementById('newAddress').value.trim();
    const msg = document.getElementById('addressMessage');
    const t = translations[currentLang];
    if (!newAddr) { msg.innerHTML = `<span class="error">${t.allFieldsRequired}</span>`; return; }
    const success = await submitChange('address', newAddr, clientData.address || '');
    if (success) {
        document.getElementById('newAddress').value = '';
        msg.innerHTML = `<span class="success">${t.changeRequestSent}</span>`;
    }
}

async function submitPhone() {
    const newPhone = document.getElementById('newPhone').value.trim();
    const msg = document.getElementById('phoneMessage');
    const t = translations[currentLang];
    if (!newPhone) { msg.innerHTML = `<span class="error">${t.allFieldsRequired}</span>`; return; }
    const success = await submitChange('phone', newPhone, clientData.phone || '');
    if (success) {
        document.getElementById('newPhone').value = '';
        msg.innerHTML = `<span class="success">${t.changeRequestSent}</span>`;
    }
}

async function submitKbis() {
    const newK = document.getElementById('newKbis').value.trim();
    const msg = document.getElementById('kbisMessage');
    const t = translations[currentLang];
    if (!newK) { msg.innerHTML = `<span class="error">${t.allFieldsRequired}</span>`; return; }
    const success = await submitChange('kbis_number', newK, clientData.kbis_number || '');
    if (success) {
        document.getElementById('newKbis').value = '';
        msg.innerHTML = `<span class="success">${t.changeRequestSent}</span>`;
    }
}

function updateUILanguage() {
    const t = translations[currentLang];
    const ids = [
        'heroTitle', 'heroSubtitle', 'filterTitle', 'pointsLabel', 'pendingLabel',
        'filterAll', 'filterPending', 'filterConfirmed', 'filterDelivered', 'filterCancelled',
        'shopLink', 'ordersLink', 'settingsLink', 'settingsTitle', 'settingsSubtitle',
        'tabPasswordText', 'tabAddressText', 'tabPhoneText', 'tabKbisText', 'tabRequestsText',
        'currentPasswordLabel', 'newPasswordLabel', 'confirmPasswordLabel',
        'currentAddressLabel', 'newAddressLabel', 'currentPhoneLabel', 'newPhoneLabel',
        'currentKbisLabel', 'newKbisLabel', 'submitPasswordText', 'submitAddressText',
        'submitPhoneText', 'submitKbisText', 'infoNote', 'emptyRequestsText'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id] || t[id.replace('Text','')] || t[id.replace('Label','')] || el.textContent;
    });
    renderOrders();
    renderChangeRequests();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPointsConfig();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            updateUILanguage();
        };
    });
    document.querySelector('.lang-btn[data-lang="fr"]')?.classList.add('active');
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.status;
            renderOrders();
        };
    });
    
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(`${tab.dataset.tab}Panel`)?.classList.add('active');
        };
    });
    
    document.getElementById('closeModalBtn')?.addEventListener('click', () => document.getElementById('orderDetailModal')?.classList.remove('active'));
    document.getElementById('orderDetailModal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('orderDetailModal')) document.getElementById('orderDetailModal').classList.remove('active');
    });
    document.getElementById('closeSettingsBtn')?.addEventListener('click', () => document.getElementById('settingsModal')?.classList.remove('active'));
    document.getElementById('settingsModal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('settingsModal')) document.getElementById('settingsModal').classList.remove('active');
    });
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        window.clearClientSession();
        window.location.href = 'index.html';
    });
    document.getElementById('submitPasswordBtn')?.addEventListener('click', submitPassword);
    document.getElementById('submitAddressBtn')?.addEventListener('click', submitAddress);
    document.getElementById('submitPhoneBtn')?.addEventListener('click', submitPhone);
    document.getElementById('submitKbisBtn')?.addEventListener('click', submitKbis);
    
    updateAuthUI();
    updateUILanguage();
});

window.showOrderDetail = showOrderDetail;
window.showSettingsModal = window.showSettingsModal;
window.cancelOrder = cancelOrder;