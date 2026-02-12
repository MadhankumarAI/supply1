"""
Mandi Supply Chain Intelligence Engine
Provides mock + computed data for supply chain dashboard.
Stress detection, price forecasting, truck fleet, interventions, scenario simulation.
"""
import random
import math
from datetime import datetime, timedelta


# ── Crop catalog ──
CROPS = [
    {"name": "Tomato", "emoji": "🍅", "base_price": 45, "volatility": 0.15, "season": "kharif"},
    {"name": "Onion", "emoji": "🧅", "base_price": 35, "volatility": 0.25, "season": "rabi"},
    {"name": "Potato", "emoji": "🥔", "base_price": 25, "volatility": 0.10, "season": "rabi"},
    {"name": "Rice", "emoji": "🍚", "base_price": 55, "volatility": 0.05, "season": "kharif"},
    {"name": "Wheat", "emoji": "🌾", "base_price": 30, "volatility": 0.08, "season": "rabi"},
    {"name": "Carrot", "emoji": "🥕", "base_price": 40, "volatility": 0.12, "season": "rabi"},
    {"name": "Cabbage", "emoji": "🥬", "base_price": 20, "volatility": 0.18, "season": "kharif"},
    {"name": "Green Chilli", "emoji": "🌶️", "base_price": 60, "volatility": 0.30, "season": "kharif"},
]

RETAILERS = [
    {"id": 1, "name": "Fresh Mart - Koramangala", "lat": 12.9352, "lng": 77.6245, "demand": "high"},
    {"id": 2, "name": "Veggie Express - Indiranagar", "lat": 12.9784, "lng": 77.6408, "demand": "medium"},
    {"id": 3, "name": "Daily Basket - HSR Layout", "lat": 12.9116, "lng": 77.6474, "demand": "high"},
    {"id": 4, "name": "Green Grocer - Whitefield", "lat": 12.9698, "lng": 77.7500, "demand": "low"},
    {"id": 5, "name": "Farm Fresh - JP Nagar", "lat": 12.9063, "lng": 77.5857, "demand": "medium"},
    {"id": 6, "name": "Nature's Cart - Malleshwaram", "lat": 13.0035, "lng": 77.5710, "demand": "high"},
]

TRUCKS = [
    {"id": "TRK-001", "driver": "Raju", "capacity_kg": 2000, "type": "Mini Truck"},
    {"id": "TRK-002", "driver": "Suresh", "capacity_kg": 5000, "type": "Medium Truck"},
    {"id": "TRK-003", "driver": "Ahmed", "capacity_kg": 3000, "type": "Mini Truck"},
    {"id": "TRK-004", "driver": "Prakash", "capacity_kg": 8000, "type": "Large Truck"},
    {"id": "TRK-005", "driver": "Vijay", "capacity_kg": 2500, "type": "Mini Truck"},
]


def _seed():
    return random.Random(datetime.utcnow().date().toordinal())


def get_supply_overview(mandi_lat=12.97, mandi_lng=77.59):
    """Full overview: KPIs, inbound/outbound, inventory"""
    rng = _seed()
    today = datetime.utcnow().date()

    # Inventory
    inventory = []
    total_value = 0
    for c in CROPS:
        qty = rng.randint(200, 3000)
        price = round(c["base_price"] * (1 + rng.uniform(-0.1, 0.15)), 2)
        value = round(qty * price)
        total_value += value
        change_pct = round(rng.uniform(-15, 20), 1)
        inventory.append({
            "crop": c["name"], "emoji": c["emoji"], "qty_kg": qty,
            "price_per_kg": price, "value": value, "change_pct": change_pct,
        })

    # Inbound (from farmers) last 7 days
    inbound = []
    for d in range(7):
        date = (today - timedelta(days=6 - d)).isoformat()
        total = sum(rng.randint(100, 800) for _ in CROPS)
        inbound.append({"date": date, "qty_kg": total})

    # Outbound (to retailers) last 7 days
    outbound = []
    for d in range(7):
        date = (today - timedelta(days=6 - d)).isoformat()
        total = sum(rng.randint(80, 700) for _ in CROPS)
        outbound.append({"date": date, "qty_kg": total})

    # Daily throughput
    total_inbound = sum(i["qty_kg"] for i in inbound)
    total_outbound = sum(o["qty_kg"] for o in outbound)

    return {
        "kpis": {
            "total_inventory_kg": sum(i["qty_kg"] for i in inventory),
            "total_value": total_value,
            "daily_inbound_avg": round(total_inbound / 7),
            "daily_outbound_avg": round(total_outbound / 7),
            "active_farmers": rng.randint(25, 80),
            "active_retailers": len(RETAILERS),
            "trucks_active": len(TRUCKS),
            "pending_orders": rng.randint(5, 25),
        },
        "inventory": sorted(inventory, key=lambda x: -x["value"]),
        "inbound_7d": inbound,
        "outbound_7d": outbound,
    }


def detect_stress_signals(mandi_lat=12.97, mandi_lng=77.59):
    """Detect supply chain stress: price, weather, demand, transport"""
    # Use hour-based seed so it changes throughout the day
    now = datetime.utcnow()
    rng = random.Random(now.date().toordinal() * 100 + now.hour // 3)

    signals = []

    # Price signals — only 2-3 crops will trigger, not all 8
    volatile_crops = rng.sample(CROPS, rng.randint(2, 4))
    for c in volatile_crops:
        spike = rng.uniform(-0.35, 0.35)
        if abs(spike) > 0.18:
            severity = "critical" if abs(spike) > 0.30 else "high" if abs(spike) > 0.22 else "medium"
            direction = "spike" if spike > 0 else "crash"
            signals.append({
                "type": "price", "severity": severity,
                "icon": "📈" if spike > 0 else "📉",
                "title": f"{c['emoji']} {c['name']} price {direction}",
                "detail": f"{'+'if spike>0 else ''}{round(spike*100)}% change detected vs 7-day avg",
                "impact": f"Affects ₹{rng.randint(10,80)}K daily volume",
                "action": "Increase buffer stock" if spike > 0 else "Reroute to higher-demand retailers",
                "crop": c["name"],
            })

    # Weather — 40% chance
    weather_events = [
        {"event": "Heavy rain forecast (3 days)", "impact": "Transport delays, spoilage risk +40%", "severity": "high", "icon": "🌧️"},
        {"event": "Heatwave warning", "impact": "Perishables shelf life -30%", "severity": "medium", "icon": "🌡️"},
        {"event": "Cyclone advisory", "impact": "Supply route disruption, price surge likely", "severity": "critical", "icon": "🌀"},
        {"event": "Clear skies ahead", "impact": "No weather disruption expected", "severity": "low", "icon": "☀️"},
    ]
    if rng.random() > 0.6:
        w = rng.choice(weather_events[:3])  # only bad weather
        signals.append({**w, "type": "weather", "title": w["event"],
                        "detail": w["impact"], "action": "Pre-stock perishables, alert retailers"})

    # Demand shifts — 35% chance
    if rng.random() > 0.65:
        festival = rng.choice(["Pongal", "Ugadi", "Wedding Season", "Diwali"])
        signals.append({
            "type": "demand", "severity": "medium", "icon": "🎉",
            "title": f"{festival} demand surge expected",
            "detail": f"30-50% increase in vegetable demand within 5 days",
            "impact": f"Stock may deplete {rng.randint(2,4)}x faster",
            "action": "Increase farmer procurement orders now",
        })

    # Transport — 30% chance
    transport_issues = [
        {"title": "Highway construction on NH-44", "detail": "Avg delivery time increased by 45min", "severity": "high"},
        {"title": "Truck driver strike in district", "detail": "2 routes affected, partial fleet unavailable", "severity": "critical"},
        {"title": "Minor road flooding reported", "detail": "Alternate routes available, +20min ETA", "severity": "medium"},
    ]
    if rng.random() > 0.7:
        t = rng.choice(transport_issues)
        signals.append({
            "type": "transport", "icon": "🚧", **t,
            "impact": f"{rng.randint(1,3)} deliveries affected today",
            "action": "Reroute via Ring Road, alert affected retailers",
        })

    # Risk score — scaled so typical range is 15-65
    severity_weights = {"low": 2, "medium": 6, "high": 12, "critical": 20}
    raw_score = sum(severity_weights.get(s.get("severity", "low"), 4) for s in signals)
    # Add baseline risk of 5 (there's always some inherent risk)
    risk_score = min(100, 5 + raw_score)
    risk_level = "Critical" if risk_score > 70 else "High" if risk_score > 45 else "Moderate" if risk_score > 20 else "Low"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "signals": signals,
        "signal_count": len(signals),
        "last_updated": datetime.utcnow().isoformat(),
    }


def forecast_prices(days=7):
    """Price forecasts for all crops"""
    rng = _seed()
    today = datetime.utcnow().date()
    forecasts = []

    for c in CROPS:
        history = []
        price = c["base_price"] + rng.uniform(-5, 5)
        for d in range(14):
            price += rng.uniform(-2, 2.5) * c["volatility"] * 10
            price = max(c["base_price"] * 0.5, min(c["base_price"] * 2, price))
            date = (today - timedelta(days=13 - d)).isoformat()
            history.append({"date": date, "price": round(price, 2)})

        # Forecast
        last5 = [h["price"] for h in history[-5:]]
        trend = (last5[-1] - last5[0]) / 5 if len(last5) > 1 else 0
        predicted = []
        fp = last5[-1]
        for d in range(days):
            fp += trend + rng.uniform(-1, 1) * c["volatility"] * 5
            fp = max(c["base_price"] * 0.5, min(c["base_price"] * 2, fp))
            date = (today + timedelta(days=d + 1)).isoformat()
            predicted.append({"date": date, "price": round(fp, 2)})

        trend_pct = round(((predicted[-1]["price"] - history[-1]["price"]) / history[-1]["price"]) * 100, 1)
        forecasts.append({
            "crop": c["name"], "emoji": c["emoji"],
            "current_price": history[-1]["price"],
            "predicted_price_7d": predicted[-1]["price"],
            "trend_pct": trend_pct,
            "trend": "up" if trend_pct > 2 else "down" if trend_pct < -2 else "stable",
            "history": history,
            "forecast": predicted,
            "volatility": c["volatility"],
        })

    return {"forecasts": forecasts, "generated_at": datetime.utcnow().isoformat()}


def get_truck_fleet(mandi_lat=12.97, mandi_lng=77.59):
    """Truck fleet with routes and status"""
    rng = _seed()
    statuses = ["delivering", "returning", "loading", "idle", "delayed"]
    fleet = []

    for i, truck in enumerate(TRUCKS):
        retailer = RETAILERS[i % len(RETAILERS)]
        cargo_crop = rng.choice(CROPS)
        status = rng.choice(statuses)
        cargo_kg = rng.randint(500, truck["capacity_kg"])
        eta_min = rng.randint(15, 120) if status in ["delivering", "returning"] else 0

        fleet.append({
            **truck,
            "status": status,
            "cargo": f"{cargo_crop['emoji']} {cargo_crop['name']}",
            "cargo_kg": cargo_kg,
            "utilization_pct": round(cargo_kg / truck["capacity_kg"] * 100),
            "destination": retailer["name"] if status == "delivering" else "Mandi" if status == "returning" else "—",
            "dest_lat": retailer["lat"] if status == "delivering" else mandi_lat,
            "dest_lng": retailer["lng"] if status == "delivering" else mandi_lng,
            "origin_lat": mandi_lat if status == "delivering" else retailer["lat"],
            "origin_lng": mandi_lng if status == "delivering" else retailer["lng"],
            "eta_min": eta_min,
            "current_lat": mandi_lat + rng.uniform(-0.05, 0.05),
            "current_lng": mandi_lng + rng.uniform(-0.05, 0.05),
        })

    return {
        "fleet": fleet,
        "retailers": RETAILERS,
        "mandi": {"lat": mandi_lat, "lng": mandi_lng},
        "summary": {
            "total": len(fleet),
            "delivering": sum(1 for f in fleet if f["status"] == "delivering"),
            "delayed": sum(1 for f in fleet if f["status"] == "delayed"),
            "idle": sum(1 for f in fleet if f["status"] == "idle"),
        }
    }


def get_interventions():
    """AI-generated stabilizing interventions"""
    rng = _seed()
    stress = detect_stress_signals()
    interventions = []

    # Generate based on stress signals
    templates = [
        {"title": "Pre-stock perishables", "category": "buffer", "icon": "📦",
         "description": "Increase tomato and onion buffer by 30% before rain hits",
         "impact": "Prevents stockout for 3 days", "cost": "₹12,000", "urgency": "high",
         "trade_off": "Higher holding cost vs guaranteed supply continuity"},
        {"title": "Reroute TRK-002 via Ring Road", "category": "logistics", "icon": "🔄",
         "description": "Highway delay detected. Alt route adds 8km but saves 40min",
         "impact": "On-time delivery restored", "cost": "₹800 extra fuel", "urgency": "medium",
         "trade_off": "Slight fuel cost increase vs reliable delivery time"},
        {"title": "Early price alert to farmers", "category": "communication", "icon": "📢",
         "description": "Onion prices dropping — alert farmers to hold or redirect to other mandis",
         "impact": "Prevent oversupply glut", "cost": "₹0", "urgency": "high",
         "trade_off": "Farmers may redirect to competitors vs market price stability"},
        {"title": "Activate cold storage for chillies", "category": "buffer", "icon": "❄️",
         "description": "Chilli prices rising. Store current stock to sell at peak",
         "impact": "₹15K additional profit potential", "cost": "₹3,000/day storage", "urgency": "medium",
         "trade_off": "Storage cost vs capturing price peak"},
        {"title": "Surge pricing for Whitefield route", "category": "pricing", "icon": "💰",
         "description": "High demand from Whitefield retailers. Increase margin by 8%",
         "impact": "₹5K additional daily revenue", "cost": "May lose price-sensitive retailers", "urgency": "low",
         "trade_off": "Short-term revenue vs long-term retailer relationships"},
        {"title": "Request extra trucks for festival week", "category": "logistics", "icon": "🚛",
         "description": "Demand surge 40% expected. Current fleet capacity insufficient",
         "impact": "Meet 100% demand vs current 70% coverage", "cost": "₹25,000/day rental", "urgency": "critical",
         "trade_off": "Rental cost vs lost sales and unhappy retailers"},
    ]

    selected = rng.sample(templates, min(len(templates), rng.randint(3, 6)))
    for i, t in enumerate(selected):
        t["id"] = i + 1
        t["status"] = "pending"
    return {"interventions": selected, "total_potential_savings": f"₹{rng.randint(20,80)}K"}


def run_scenario(rain_days=0, demand_surge_pct=0, transport_delay_pct=0):
    """Simulate what-if scenarios and return predicted impact"""
    rng = _seed()

    # Base metrics
    base_supply = 5000  # kg/day
    base_demand = 4500
    base_price_index = 100
    base_risk = 25
    base_spoilage = 3  # %

    # Calculate impacts
    supply_impact = 1.0
    demand_impact = 1.0
    price_impact = 1.0
    risk_impact = 1.0
    spoilage_impact = 1.0

    if rain_days > 0:
        supply_impact -= 0.12 * rain_days  # -12% supply per rain day
        price_impact += 0.08 * rain_days   # +8% price per rain day
        risk_impact += 0.15 * rain_days
        spoilage_impact += 0.20 * rain_days

    if demand_surge_pct > 0:
        demand_impact += demand_surge_pct / 100
        price_impact += (demand_surge_pct / 100) * 0.6
        risk_impact += (demand_surge_pct / 100) * 0.4

    if transport_delay_pct > 0:
        supply_impact -= (transport_delay_pct / 100) * 0.3
        risk_impact += (transport_delay_pct / 100) * 0.5
        spoilage_impact += (transport_delay_pct / 100) * 0.4

    predicted_supply = max(500, round(base_supply * max(0.2, supply_impact)))
    predicted_demand = round(base_demand * demand_impact)
    gap = predicted_demand - predicted_supply
    predicted_price = round(base_price_index * max(0.5, price_impact), 1)
    predicted_risk = min(100, round(base_risk * max(1, risk_impact)))
    predicted_spoilage = min(40, round(base_spoilage * max(1, spoilage_impact), 1))

    # Per-crop impact
    crop_impacts = []
    for c in CROPS[:6]:
        crop_price_change = round((price_impact - 1) * 100 * (1 + c["volatility"]), 1)
        crop_impacts.append({
            "crop": c["name"], "emoji": c["emoji"],
            "price_change_pct": crop_price_change,
            "supply_change_pct": round((supply_impact - 1) * 100, 1),
            "risk": "high" if abs(crop_price_change) > 15 else "medium" if abs(crop_price_change) > 5 else "low",
        })

    recommendations = []
    if gap > 500:
        recommendations.append({"icon": "📦", "text": f"Shortfall of {gap}kg/day — activate buffer stock or increase farmer procurement"})
    if predicted_risk > 60:
        recommendations.append({"icon": "⚠️", "text": f"Risk score {predicted_risk}/100 — trigger early alerts to all stakeholders"})
    if predicted_spoilage > 10:
        recommendations.append({"icon": "❄️", "text": f"Spoilage rate {predicted_spoilage}% — activate cold storage for perishables"})
    if rain_days > 2:
        recommendations.append({"icon": "🚛", "text": "Pre-position trucks before rain, prioritize covered vehicles"})
    if demand_surge_pct > 30:
        recommendations.append({"icon": "📢", "text": "Alert farmers to increase supply; consider temporary procurement premium"})

    return {
        "scenario": {"rain_days": rain_days, "demand_surge_pct": demand_surge_pct, "transport_delay_pct": transport_delay_pct},
        "baseline": {"supply_kg": base_supply, "demand_kg": base_demand, "price_index": base_price_index, "risk_score": base_risk, "spoilage_pct": base_spoilage},
        "predicted": {"supply_kg": predicted_supply, "demand_kg": predicted_demand, "gap_kg": gap, "price_index": predicted_price, "risk_score": predicted_risk, "spoilage_pct": predicted_spoilage},
        "crop_impacts": crop_impacts,
        "recommendations": recommendations,
    }
