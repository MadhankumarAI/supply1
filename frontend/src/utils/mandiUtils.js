// Utility functions for mandi simulation

// Haversine formula to calculate distance between two coordinates
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Find mandis that have the product with sufficient quantity
export function filterQualifiedMandis(mandis, productName, requiredQuantity) {
  return mandis.map(mandi => {
    const product = mandi.products.find(
      p => p.product_name.toLowerCase() === productName.toLowerCase()
    );
    
    if (!product || product.available_quantity < requiredQuantity) {
      return null;
    }
    
    return {
      ...mandi,
      matchedProduct: product
    };
  }).filter(Boolean);
}

// Calculate metrics for each qualified mandi
export function calculateMandiMetrics(
  mandi,
  retailerLat,
  retailerLon,
  requiredQuantity,
  resalePrice
) {
  const distance = calculateDistance(
    retailerLat,
    retailerLon,
    mandi.latitude,
    mandi.longitude
  );
  
  const product = mandi.matchedProduct;
  const totalCost = product.price_per_kg * requiredQuantity;
  const expectedRevenue = resalePrice * requiredQuantity;
  const profit = expectedRevenue - totalCost;
  const profitMargin = ((profit / totalCost) * 100).toFixed(1);
  
  return {
    ...mandi,
    distance,
    totalCost,
    expectedRevenue,
    profit,
    profitMargin,
    pricePerKg: product.price_per_kg,
    shelfLife: product.shelf_life_days
  };
}

// Rank mandis based on multiple factors
export function rankMandis(mandisWithMetrics, sortBy = 'balanced') {
  let ranked = [...mandisWithMetrics];
  
  switch (sortBy) {
    case 'distance':
      ranked.sort((a, b) => a.distance - b.distance);
      break;
      
    case 'price':
      ranked.sort((a, b) => a.pricePerKg - b.pricePerKg);
      break;
      
    case 'profit':
      ranked.sort((a, b) => b.profit - a.profit);
      break;
      
    case 'shelfLife':
      ranked.sort((a, b) => b.shelfLife - a.shelfLife);
      break;
      
    case 'balanced':
    default:
      // Balanced scoring: distance (40%), price (30%), shelf life (20%), profit (10%)
      ranked = ranked.map(mandi => {
        const maxDistance = Math.max(...mandisWithMetrics.map(m => m.distance));
        const maxPrice = Math.max(...mandisWithMetrics.map(m => m.pricePerKg));
        const maxShelfLife = Math.max(...mandisWithMetrics.map(m => m.shelfLife));
        const maxProfit = Math.max(...mandisWithMetrics.map(m => m.profit));
        
        // Normalize scores (0-100, higher is better)
        const distanceScore = ((maxDistance - mandi.distance) / maxDistance) * 100;
        const priceScore = ((maxPrice - mandi.pricePerKg) / maxPrice) * 100;
        const shelfLifeScore = (mandi.shelfLife / maxShelfLife) * 100;
        const profitScore = (mandi.profit / maxProfit) * 100;
        
        const totalScore = 
          (distanceScore * 0.4) +
          (priceScore * 0.3) +
          (shelfLifeScore * 0.2) +
          (profitScore * 0.1);
        
        return {
          ...mandi,
          score: Math.round(totalScore),
          distanceScore: Math.round(distanceScore),
          priceScore: Math.round(priceScore),
          shelfLifeScore: Math.round(shelfLifeScore),
          profitScore: Math.round(profitScore)
        };
      });
      
      ranked.sort((a, b) => b.score - a.score);
      break;
  }
  
  return ranked;
}

// Generate reasoning text for each mandi
export function generateReasoning(mandi, rank, allMandis) {
  const reasons = [];
  
  // Distance reasoning
  const nearestDistance = Math.min(...allMandis.map(m => m.distance));
  if (mandi.distance === nearestDistance) {
    reasons.push(`Nearest mandi (${mandi.distance} km)`);
  } else if (mandi.distance < nearestDistance * 1.5) {
    reasons.push(`Close proximity (${mandi.distance} km)`);
  } else {
    reasons.push(`${mandi.distance} km away`);
  }
  
  // Price reasoning
  const lowestPrice = Math.min(...allMandis.map(m => m.pricePerKg));
  const avgPrice = allMandis.reduce((sum, m) => sum + m.pricePerKg, 0) / allMandis.length;
  
  if (mandi.pricePerKg === lowestPrice) {
    reasons.push(`Lowest price (₹${mandi.pricePerKg}/kg)`);
  } else if (mandi.pricePerKg < avgPrice) {
    reasons.push(`Below average price (₹${mandi.pricePerKg}/kg)`);
  } else {
    reasons.push(`₹${mandi.pricePerKg}/kg (premium pricing)`);
  }
  
  // Shelf life reasoning
  const maxShelfLife = Math.max(...allMandis.map(m => m.shelfLife));
  if (mandi.shelfLife >= maxShelfLife * 0.8) {
    reasons.push(`Excellent freshness (${mandi.shelfLife} days)`);
  } else if (mandi.shelfLife >= 3) {
    reasons.push(`Good shelf life (${mandi.shelfLife} days)`);
  } else {
    reasons.push(`⚠️ Short shelf life (${mandi.shelfLife} days)`);
  }
  
  // Profit reasoning
  const maxProfit = Math.max(...allMandis.map(m => m.profit));
  if (mandi.profit >= maxProfit * 0.9) {
    reasons.push(`High profit potential (₹${mandi.profit})`);
  } else if (mandi.profit >= maxProfit * 0.7) {
    reasons.push(`Good profit margin (₹${mandi.profit})`);
  } else {
    reasons.push(`Moderate profit (₹${mandi.profit})`);
  }
  
  return reasons;
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Format date for order history
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
