// products.js - 产品数据库
const allProducts = {
    // 厨师服系列
    "chef-001": {
        id: "chef-001",
        title: "ChefMaster系列 专业厨师服",
        subtitle: "高级透气面料，专业设计，舒适耐穿",
        images: {
            white: [
                "https://free.picui.cn/free/2025/08/29/68b1533f90c0a.jpg",
                "https://free.picui.cn/free/2025/08/29/68b1530be46d4.jpg"
            ],
            black: [
                "https://free.picui.cn/free/2025/08/29/68b1533f512d2.jpg",
                "https://free.picui.cn/free/2025/08/29/68b1524f785ba.jpg"
            ]
        },
        category: "chef",
        features: ["透气舒适", "耐高温", "防油防水", "易清洗"],
        related: ["chef-002", "hat-001", "apron-001"]
    },
    
    "chef-002": {
        id: "chef-002",
        title: "夏季轻薄款厨师服",
        subtitle: "轻薄透气，适合夏季高温厨房",
        images: {
            white: ["image1.jpg", "image2.jpg"],
            blue: ["image3.jpg", "image4.jpg"]
        },
        category: "chef",
        features: ["超薄透气", "速干", "防油", "易打理"],
        related: ["chef-001", "hat-002", "apron-002"]
    },
    
    "hat-001": {
        id: "hat-001",
        title: "专业厨师帽",
        subtitle: "舒适透气，专业厨房必备",
        images: {
            white: ["hat1.jpg", "hat2.jpg"]
        },
        category: "hat",
        features: ["吸汗透气", "可调节", "专业外观", "易清洗"],
        related: ["chef-001", "apron-001", "shirt-001"]
    },
    
    // 更多产品...
};

// 推荐产品数据 - 增加到10个以上以支持8个产品的展示
const recommendedProducts = [
    {
        id: "chef-002",
        title: "君临天下",
        image: "https://free.picui.cn/free/2025/08/29/68b1533f90c0a.jpg",
        code: "NO：CF-CHEF002",
        category: "chef"
    },
    {
        id: "B01T",
        title: "大展宏图",
        image: "https://free.picui.cn/free/2025/08/29/68b1533f90c0a.jpg",
        code: "NO：CF-CAP001",
        category: "hat"
    },
    {
        id: "apron-001",
        title: "雄才大略",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-APR001",
        category: "apron"
    },
    {
        id: "shirt-001",
        title: "海纳百川",
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-SHT001",
        category: "shirt"
    },
    {
        id: "pants-001",
        title: "雄姿英发",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-PNT001",
        category: "chef"
    },
    {
        id: "glove-001",
        title: "防烫厨师手套",
        image: "https://images.unsplash.com/photo-1589987607627-0e3ad8b76c4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-GLV001",
        category: "accessory"
    },
    // 新增推荐产品
    {
        id: "shoes-001",
        title: "通用推荐",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-SHO001",
        category: "shoes"
    },
    {
        id: "knife-001",
        title: "通用推荐",
        image: "https://images.unsplash.com/photo-1556909211-36987caf7b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-KNF001",
        category: "tool"
    },
    {
        id: "coat-001",
        title: "通用推荐",
        image: "https://free.picui.cn/free/2025/08/29/68b1533f90c0a.jpg",
        code: "NO：CF-CT001",
        category: "chef"
    },
    {
        id: "neck-001",
        title: "厨师领巾",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        code: "NO：CF-NCK001",
        category: "accessory"
    }
];

// 根据当前产品ID获取相关推荐 - 修改为返回8个产品
function getRelatedProducts(currentProductId) {
    const currentProduct = allProducts[currentProductId];
    if (!currentProduct) return recommendedProducts.slice(0, 8); // 改为8个
    
    // 优先显示相关产品
    const relatedIds = currentProduct.related || [];
    const related = relatedIds
        .map(id => recommendedProducts.find(p => p.id === id))
        .filter(Boolean);
    
    // 如果相关产品不足8个，补充其他产品
    const remaining = recommendedProducts
        .filter(p => p.id !== currentProductId && !relatedIds.includes(p.id))
        .slice(0, 8 - related.length); // 补充到8个
    
    return [...related, ...remaining].slice(0, 8); // 确保最多返回8个
}

// 生成推荐产品HTML - 生成8个产品的HTML
function generateRecommendations(currentProductId = 'chef-001') {
    const products = getRelatedProducts(currentProductId);
    
    return products.map(product => `
        <div class="related-item" onclick="window.location.href='${product.id}.html'">
            <img src="${product.image}" alt="${product.title}">
            <div class="related-item-info">
                <h3 class="related-item-title">${product.title}</h3>
                <p class="related-item-code">${product.code}</p>
            </div>
        </div>
    `).join('');
}