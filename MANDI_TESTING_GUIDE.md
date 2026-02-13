# 🧪 Bangalore Mandi-Retailer Simulation - Testing Guide

## Quick Start
**Base URL**: `http://localhost:3000/mandi/search`

---

## 📋 Complete Testing Flow

### **Test 1: Basic Search Flow (5 minutes)**

1. **Go to Search Page**
   - URL: `http://localhost:3000/mandi/search`
   - ✅ Verify: Header shows "Mandi Connect" with green icon
   - ✅ Verify: Retailer info shows "Your Store - Koramangala"
   - ✅ Verify: "Order History" button visible in top-right

2. **Test Scenario Selection**
   - ✅ Default: "Price vs Distance Trade-off" selected
   - ✅ Click dropdown, verify 3 scenarios:
     - Scenario 1: Price vs Distance Trade-off
     - Scenario 2: Limited Supply Situation  
     - Scenario 3: Quality Over Price
   - ✅ Select "Scenario 1"

3. **Configure Search**
   - ✅ Product: Select "Tomatoes" (default)
   - ✅ Quantity: Keep 200 kg (or change to test)
   - ✅ Delivery Time: Select "12 hours" (green highlight should appear)

4. **Submit Search**
   - ✅ Click green "Search Available Mandis" button
   - ✅ Should navigate to Results page (`/mandi/results`)

---

### **Test 2: Results Page with Map (10 minutes)**

1. **Verify Page Layout**
   - ✅ Left side: Scrollable list of ranked mandis
   - ✅ Right side: Leaflet map (sticky)
   - ✅ Top bar shows: "200 kg Tomatoes • Price vs Distance Trade-off"
   - ✅ Sort dropdown shows "Balanced Score" (default)

2. **Test Mandi Ranking Cards**
   Each card should show:
   - ✅ Rank number (#1, #2, #3, etc.) in green circle
   - ✅ Mandi name and location
   - ✅ Overall score (out of 100)
   - ✅ 4 metrics:
     * Distance (km)
     * Price (₹/kg)
     * Shelf Life (days)
     * Profit (₹)
   - ✅ "Why this ranking?" section with 4 bullet points
   - ✅ Total cost at bottom
   - ✅ Green "Select Mandi" button

3. **Test Map Features**
   - ✅ Map loads with Bangalore area visible
   - ✅ Green marker: Your store in Koramangala (center)
   - ✅ Red markers: Multiple mandis spread across Bangalore
   - ✅ Dotted lines: Connect your store to each mandi
   - ✅ Zoom in/out: Use mouse wheel or +/- buttons
   - ✅ Click markers: Should show popup with mandi info

4. **Test Hover Interaction**
   - ✅ Hover over a mandi card
   - ✅ Card should highlight (green border, slight scale)
   - ✅ Map route line to that mandi should become bold and green
   - ✅ Move mouse away: Effects should reset

5. **Test Sorting**
   - ✅ Click sort dropdown, try each option:
     * **Balanced Score**: Best overall (default)
     * **Nearest First**: Sorted by distance (ascending)
     * **Cheapest First**: Sorted by price (ascending)
     * **Best Profit**: Sorted by profit (descending)
     * **Best Quality**: Sorted by shelf life (descending)
   - ✅ Rankings should update immediately

---

### **Test 3: Order Confirmation (5 minutes)**

1. **Select a Mandi**
   - ✅ Click "Select Mandi" on any ranked card
   - ✅ Should navigate to Confirmation page (`/mandi/confirm`)

2. **Verify Confirmation Details**
   - ✅ Success banner: Green with checkmark icon
   - ✅ Selected mandi name and location
   - ✅ Match score displayed
   - ✅ 4 metric cards:
     * Distance (km)
     * Price/kg (₹)
     * Shelf Life (days)
     * Profit (₹)

3. **Verify Order Summary**
   - ✅ Product name
   - ✅ Quantity (kg)
   - ✅ Price per kg
   - ✅ Delivery time
   - ✅ Purchase cost
   - ✅ Expected revenue
   - ✅ Net profit (highlighted in green)
   - ✅ Profit margin percentage

4. **Test Actions**
   - ✅ "Choose Different Mandi" button → Goes back to results
   - ✅ "Confirm Order" button → Goes to order history

---

### **Test 4: Order History (5 minutes)**

1. **Verify Stats Cards** (top of page)
   - ✅ Total Orders: Should show "1" after first order
   - ✅ Total Profit: Sum of all profits (₹)
   - ✅ Total Quantity: Sum of all kg ordered

2. **Verify Order Table**
   Columns should show:
   - ✅ Date & Time (formatted: "13 Feb 2026, 02:30")
   - ✅ Product name with scenario tag
   - ✅ Mandi name with distance
   - ✅ Quantity (kg) and price/kg
   - ✅ Total cost (₹)
   - ✅ Profit (₹, green color)
   - ✅ Details: Shelf life & delivery time

3. **Test Empty State**
   - ✅ If no orders: Should show "No Orders Yet" message
   - ✅ "Search Mandis" button visible

4. **Test Navigation**
   - ✅ "New Search" button → Returns to search page
   - ✅ "Back to Search" link in header

---

### **Test 5: Multiple Scenarios (15 minutes)**

#### **Scenario 1: Price vs Distance Trade-off**
1. Go to search page
2. Select "Scenario 1"
3. Product: Tomatoes, Quantity: 200kg
4. Submit search
5. **Expected Behavior**:
   - ✅ Should show 6 mandis
   - ✅ Nearest mandi (KR Market or Madiwala) should rank high
   - ✅ Some mandis have better shelf life but farther away
   - ✅ Clear trade-offs in reasoning

#### **Scenario 2: Limited Supply**
1. Go to search page
2. Select "Scenario 2: Limited Supply Situation"
3. Product: **Carrots**, Quantity: **500kg**
4. Submit search
5. **Expected Behavior**:
   - ✅ Only 2-3 mandis should appear
   - ✅ Some mandis barely meet quantity (505kg, 600kg)
   - ✅ Reasoning should mention "limited availability"
   - ✅ Prices might be higher due to scarcity

#### **Scenario 3: Quality Over Price**
1. Go to search page
2. Select "Scenario 3: Quality Over Price"
3. Product: Tomatoes, Quantity: 300kg
4. Submit search
5. **Expected Behavior**:
   - ✅ Many mandis available (7-8)
   - ✅ Prices are similar (₹25-27/kg)
   - ✅ Shelf life becomes main differentiator
   - ✅ Mandis with 5-6 days shelf life rank higher

---

### **Test 6: Edge Cases (5 minutes)**

#### **Test: No Available Mandis**
1. Search page
2. Scenario: Any
3. Product: Tomatoes
4. Quantity: **2000 kg** (very high)
5. Submit
6. **Expected**: 
   - ✅ "No Mandis Available" message
   - ✅ Alert icon displayed
   - ✅ Message: "No mandi has sufficient stock..."

#### **Test: Different Products**
Try searching with:
- ✅ Onions (500kg) → Should show mandis with good stock
- ✅ Spinach (100kg) → Low shelf life (1-2 days), see warnings
- ✅ Potatoes (800kg) → High shelf life (12-15 days)
- ✅ Green Beans (200kg) → Premium pricing

---

### **Test 7: Navigation & Back Buttons (3 minutes)**

1. **From Search → Results**
   - ✅ Click "Back to Search" → Returns to search page
   - ✅ Form should maintain previous values

2. **From Results → Confirmation**
   - ✅ Click "Back to Results" → Returns to results
   - ✅ Previous rankings still visible

3. **From Confirmation → History**
   - ✅ Order appears immediately in history

4. **From History → Search**
   - ✅ "New Search" button works
   - ✅ Fresh search form appears

---

## 🎨 Visual Checks

### Design Quality
- ✅ Dark theme (gray-900 background)
- ✅ Green accent color (#10b981)
- ✅ Cards have subtle borders and backdrop blur
- ✅ Smooth hover transitions
- ✅ Icons from Lucide library
- ✅ Proper spacing and typography

### Map Quality
- ✅ Leaflet map tiles load (OpenStreetMap)
- ✅ Markers have custom colors (green/red)
- ✅ Routes are dashed lines
- ✅ Map is responsive (no overflow)
- ✅ Zoom controls visible

---

## 📱 Mobile Testing (Optional)

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 14 Pro" or similar
4. Test entire flow on mobile
5. **Expected**:
   - ✅ Map stacks below list on mobile
   - ✅ Cards are full width
   - ✅ Touch interactions work
   - ✅ No horizontal scroll

---

## 🐛 Common Issues & Solutions

### Issue: Map doesn't load
**Solution**: Check browser console. Leaflet CSS should be imported. Refresh page.

### Issue: No mandis showing
**Solution**: Quantity too high. Reduce to 100-300kg for testing.

### Issue: Markers not visible on map
**Solution**: Zoom out on map. Some mandis are far from Koramangala.

### Issue: Hover effects not working
**Solution**: Make sure you're hovering over the card, not empty space.

---

## 📊 Expected Results Summary

| Test Area | Expected Mandis | Time Required |
|-----------|----------------|---------------|
| Scenario 1 + Tomatoes (200kg) | 6 mandis | 2 min |
| Scenario 2 + Carrots (500kg) | 2-3 mandis | 2 min |
| Scenario 3 + Tomatoes (300kg) | 7-8 mandis | 2 min |
| High Quantity (2000kg) | 0 mandis | 1 min |

---

## ✅ Testing Checklist

**Search Page:**
- [ ] 3 scenarios selectable
- [ ] 8 products available
- [ ] Quantity adjustable
- [ ] 3 delivery time options
- [ ] Search button navigates to results

**Results Page:**
- [ ] Mandi cards display properly
- [ ] Map loads with markers
- [ ] Routes connect retailer to mandis
- [ ] Hover effects work
- [ ] Sort options change rankings
- [ ] Select button works

**Confirmation Page:**
- [ ] All metrics displayed
- [ ] Profit calculation correct
- [ ] Both action buttons work

**History Page:**
- [ ] Stats update after orders
- [ ] Table shows all order details
- [ ] New Search button works

**Overall:**
- [ ] All navigation works
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Professional UI quality

---

## 🎯 Success Criteria

✅ **PASS** if:
1. All 4 pages load without errors
2. Map displays with multiple markers
3. At least one complete order flow works
4. Rankings change based on sort options
5. Order appears in history

❌ **FAIL** if:
1. Map doesn't load at all
2. No mandis show up in any scenario
3. Navigation breaks
4. Console has critical errors

---

## 📸 Screenshots to Capture

1. Search page (default state)
2. Results page (with map visible)
3. Hover effect on mandi card
4. Confirmation page
5. Order history with 2-3 orders
6. Different scenario results

---

**Happy Testing! 🎉**

For issues, check:
- Frontend console: F12 → Console tab
- Network errors: F12 → Network tab
- React errors: Look for red error overlay
