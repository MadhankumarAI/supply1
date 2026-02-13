# 🎯 QUICK TESTING GUIDE - Bangalore Mandi Platform

## ⚠️ CORRECT URL TO USE:

**❌ WRONG:** `https://ui-only-view.preview.emergentagent.com/retailer/dashboard/search`

**✅ CORRECT:** `https://ui-only-view.preview.emergentagent.com/mandi/search`

---

## 🚀 5-MINUTE QUICK TEST

### Step 1: Go to Search Page
**URL:** `https://ui-only-view.preview.emergentagent.com/mandi/search`

**What you'll see:**
- Header: "Mandi Connect - Bangalore Wholesale Network"
- Your location: "Your Store - Koramangala"
- Search form with:
  - Scenario dropdown (3 options)
  - Product dropdown (8 products)
  - Quantity input (default: 200 kg)
  - Delivery time buttons (6h, 12h, 24h)
- Green "Search Available Mandis" button

**Action:** Just click the green button (keep defaults)

---

### Step 2: See Results with Map
**URL will change to:** `/mandi/results`

**What you'll see:**
- **LEFT SIDE:** List of ranked mandis
  - #1 Madiwala Market (Score: 61)
  - #2 Jayanagar 4th Block (Score: 53)
  - Each card shows: Distance, Price, Shelf Life, Profit
  - "Why this ranking?" section
  
- **RIGHT SIDE:** Interactive Leaflet Map
  - Green marker = Your store (Koramangala)
  - Red markers = Available mandis across Bangalore
  - Dotted lines = Routes from you to each mandi

**Try this:**
- Hover your mouse over any mandi card → Watch the map route light up!
- Click map markers → See popup with details
- Try sort dropdown: "Nearest First", "Cheapest First", "Best Profit"

**Action:** Click green "Select Mandi" button on #1 ranked mandi

---

### Step 3: Confirm Order
**URL will change to:** `/mandi/confirm`

**What you'll see:**
- Green success banner: "Great Choice!"
- Selected mandi: Madiwala Market
- Match score: 61
- 4 metrics: Distance (2.4 km), Price (₹24/kg), Shelf Life (3 days), Profit (₹4,200)
- Order Summary:
  - Product: Tomatoes
  - Quantity: 200 kg
  - Purchase Cost: ₹4,800
  - Expected Revenue: ₹9,000
  - **Net Profit: ₹4,200** (87.5% margin)

**Action:** Click green "Confirm Order" button

---

### Step 4: View Order History
**URL will change to:** `/mandi/history`

**What you'll see:**
- 3 Stats Cards:
  - Total Orders: 1
  - Total Profit: ₹4,200
  - Total Quantity: 200 kg
- Order table showing your confirmed order:
  - Date/Time: 13 Feb 2026, 02:39 am
  - Product: Tomatoes
  - Mandi: Madiwala Market (2.4 km)
  - Profit: ₹4,200 (green)

**Action:** Click "New Search" to start another search

---

## 🎮 ADVANCED TESTING (Optional)

### Test Different Scenarios:

#### **Scenario 1: Price vs Distance Trade-off** (Default)
- Product: Tomatoes, 200kg
- Result: 6 mandis, nearest is cheapest
- Ranking based on balanced score

#### **Scenario 2: Limited Supply**
1. Go to search page
2. Select "Limited Supply Situation"
3. Product: **Carrots**
4. Quantity: **500 kg**
5. Click search
6. **Expected:** Only 2-3 mandis will have enough stock
7. See "barely meets requirement" in reasoning

#### **Scenario 3: Quality Over Price**
1. Go to search page
2. Select "Quality Over Price"
3. Product: Tomatoes
4. Quantity: 300kg
5. Click search
6. **Expected:** 7-8 mandis, similar prices
7. Shelf life becomes the key differentiator
8. Mandis with 5-6 days shelf life rank higher

---

## 🗺️ MAP FEATURES TO TEST

1. **Zoom In/Out:** Use mouse wheel or +/- buttons
2. **Click Markers:** 
   - Click green marker → "Your Store - Koramangala"
   - Click red markers → Mandi details popup
3. **Hover Effect:** 
   - Hover over mandi card → Route highlights on map!
4. **Pan Around:** Click and drag map to explore Bangalore

---

## 📊 RANKING ALGORITHM TEST

Try different sort options from dropdown:

- **Balanced Score** (Default): Best overall choice
  - Distance: 40%
  - Price: 30%
  - Shelf Life: 20%
  - Profit: 10%

- **Nearest First**: Sorted by distance (2.4km, 3.5km, 4.2km...)
- **Cheapest First**: Sorted by price (₹24, ₹27, ₹30...)
- **Best Profit**: Sorted by profit (₹4,200, ₹3,600, ₹3,000...)
- **Best Quality**: Sorted by shelf life (6 days, 5 days, 3 days...)

Watch rankings change instantly!

---

## 🎯 THINGS TO NOTICE

1. **Real Bangalore Mandis:**
   - KR Market (Krishnarajendra Market)
   - Yeshwanthpur APMC
   - Malleswaram Market
   - Madiwala Market
   - Whitefield Mandi
   - HSR Layout Market
   - BTM Layout Market
   - Jayanagar 4th Block

2. **Smart Reasoning:** Each ranking explains WHY
   - "Nearest mandi (2.4 km)"
   - "Lowest price (₹24/kg)"
   - "Excellent freshness (5 days)"
   - "High profit potential (₹4,200)"

3. **Real Distance Calculation:** Uses Haversine formula for accurate distances

4. **Profit Calculator:** Shows expected profit if you resell
   - Buy: ₹24/kg × 200kg = ₹4,800
   - Sell: ₹45/kg × 200kg = ₹9,000
   - Profit: ₹4,200 (87.5% margin)

---

## ❓ TROUBLESHOOTING

**Q: Map not loading?**
- Wait 3-5 seconds, it loads from OpenStreetMap
- Refresh page if needed

**Q: No mandis showing?**
- Reduce quantity (try 100-300 kg)
- Some scenarios have limited supply

**Q: Can't see markers on map?**
- Zoom out using mouse wheel
- Click and drag to pan around

**Q: Order not appearing in history?**
- Make sure you clicked "Confirm Order"
- Orders persist in browser session

---

## 🎉 SUCCESS CRITERIA

✅ You've successfully tested if:
1. Search page loads with all options
2. Results page shows mandis + map
3. Map has markers and routes
4. You can hover cards and see map highlight
5. Order confirmation shows profit breakdown
6. Order appears in history with stats

---

## 📱 MOBILE TESTING (Bonus)

Open same URL on mobile:
- Layout adjusts automatically
- Map stacks below list
- Touch-friendly buttons
- Swipe to scroll

---

## 🔗 ALL VALID URLS:

1. Search: `/mandi/search`
2. Results: `/mandi/results` (auto after search)
3. Confirm: `/mandi/confirm` (auto after select)
4. History: `/mandi/history`

**Remember:** Always start with `/mandi/search`

---

## 💡 PRO TIPS

1. **Test multiple orders:** Create 3-4 orders to see stats update
2. **Try all products:** Each has different pricing/shelf life
3. **Compare scenarios:** See how rankings change
4. **Watch the map:** Routes animate on hover
5. **Check profit margins:** Higher for products with longer shelf life

---

**Enjoy testing! The platform is fully functional.** 🚀
