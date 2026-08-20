from data import PHONES


def calculate_score(phone, requirements):
    scores = phone["scores"]

    total_score = 0
    total_weight = 0

    # Default balanced weights
    weights = {
        "performance": 1,
        "gaming": 1,
        "camera": 1,
        "battery": 1,
        "display": 1
    }

    # Increase weight according to user's priorities
    if requirements.get("gaming_priority"):
        weights["gaming"] += 3
        weights["performance"] += 2

    if requirements.get("camera_priority"):
        weights["camera"] += 3

    if requirements.get("battery_priority"):
        weights["battery"] += 3

    if requirements.get("display_priority"):
        weights["display"] += 3

    # Calculate weighted score
    for category, weight in weights.items():
        total_score += scores.get(category, 0) * weight
        total_weight += weight

    return total_score / total_weight


def build_breakdown(phone, requirements):
    scores = phone["scores"]

    weights = {
        "performance": 1,
        "camera": 1,
        "battery": 1,
        "display": 1
    }

    if requirements.get("gaming_priority"):
        weights["performance"] += 2

    if requirements.get("camera_priority"):
        weights["camera"] += 3

    if requirements.get("battery_priority"):
        weights["battery"] += 3

    if requirements.get("display_priority"):
        weights["display"] += 3

    breakdown = []

    for dimension, weight in weights.items():
        device_score = scores.get(dimension, 0)

        breakdown.append({
            "dimension": dimension,
            "weight": weight,
            "deviceScore": device_score * 10,
            "contribution": device_score * weight
        })

    return breakdown


def meets_requirements(phone, requirements):
    budget = requirements.get("budget")

    # Hard budget constraint
    if budget is not None and phone["price"] > budget:
        return False

    return True


def recommend_devices(requirements, top_n=3):
    suitable_phones = []

    for phone in PHONES:

        if not meets_requirements(phone, requirements):
            continue

        score = calculate_score(phone, requirements)

        suitable_phones.append({
            # Identity
            "id": phone["name"],
            "name": phone["name"],
            "brand": phone["brand"],

            # Price
            "price": phone["price"],

            # Specs expected by the frontend
            "chip": phone["processor"],
            "ram": phone["ram"],
            "storage": phone["storage"],
            "displaySpec": phone["display"],

            # IMPORTANT:
            # This sends the camera information from data.py
            # to ConfigCard.tsx as cameraSpec.
            "cameraSpec": phone["camera"],

            "battery": f'{phone["battery"]}mAh, {phone["charging"]}W',

            # Match score is converted from 0-10 to 0-100
            "score": round(score * 10, 2),

            # Assigned after sorting
            "rank": 0,

            # Used by "Why this pick?"
            "breakdown": build_breakdown(phone, requirements)
        })

    # Highest score first
    suitable_phones.sort(
        key=lambda phone: phone["score"],
        reverse=True
    )

    # Keep top N
    suitable_phones = suitable_phones[:top_n]

    # Assign ranks
    for index, phone in enumerate(suitable_phones, start=1):
        phone["rank"] = index

    return suitable_phones


if __name__ == "__main__":
    test_requirements = {
        "budget": 30000,
        "gaming_priority": True,
        "camera_priority": True,
        "battery_priority": False,
        "display_priority": False
    }

    recommendations = recommend_devices(test_requirements)

    for phone in recommendations:
        print(phone)