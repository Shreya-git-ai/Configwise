from data import PHONES


# ============================================================
# BUDGET HELPER
# ============================================================

def get_budget(requirements):
    """
    Extract the maximum budget from the parsed requirements.

    Supports the different structures that may be returned
    by requirement_parser.py.
    """

    if not isinstance(requirements, dict):
        return 0

    # Direct budget
    for key in ("budget", "max_budget", "maxBudget"):
        value = requirements.get(key)

        if value is not None:
            try:
                return float(value)
            except (ValueError, TypeError):
                pass

    # Nested constraints
    constraints = requirements.get("constraints")

    if isinstance(constraints, dict):

        for key in ("budget", "max_budget", "maxBudget"):
            value = constraints.get(key)

            if value is not None:
                try:
                    return float(value)
                except (ValueError, TypeError):
                    pass

    return 0


# ============================================================
# CATEGORY HELPER
# ============================================================

def get_category(requirements):
    """
    Get requested category.
    """

    if not isinstance(requirements, dict):
        return None

    # Direct category
    category = requirements.get("category")

    if category:
        return str(category).lower()

    # Nested constraints
    constraints = requirements.get("constraints")

    if isinstance(constraints, dict):
        category = constraints.get("category")

        if category:
            return str(category).lower()

    return None


# ============================================================
# TEXT HELPER
# ============================================================

def requirement_text(requirements):
    """
    Convert requirements into searchable text.
    """

    if not isinstance(requirements, dict):
        return str(requirements).lower()

    parts = []

    raw = requirements.get("raw")

    if raw:
        parts.append(str(raw))

    labels = requirements.get("labels")

    if isinstance(labels, list):
        parts.extend(str(x) for x in labels)

    must_have = requirements.get("mustHave")

    if isinstance(must_have, list):
        parts.extend(str(x) for x in must_have)

    constraints = requirements.get("constraints")

    if isinstance(constraints, dict):

        must_have = constraints.get("mustHave")

        if isinstance(must_have, list):
            parts.extend(str(x) for x in must_have)

    return " ".join(parts).lower()


# ============================================================
# SCORE HELPERS
# ============================================================

def get_numeric_score(phone, key, default=50):
    """
    Safely read a score from a phone.
    """

    value = phone.get(key)

    if value is None:
        scores = phone.get("scores", {})

        if isinstance(scores, dict):
            value = scores.get(key)

    try:
        return float(value)
    except (ValueError, TypeError):
        return float(default)


def calculate_score(phone, requirements):
    """
    Calculate an overall recommendation score from 0-10.

    The score considers:
    - performance
    - camera
    - battery
    - display
    - value

    User priorities from the requirement parser are used
    when available.
    """

    text = requirement_text(requirements)

    performance = get_numeric_score(
        phone,
        "performance",
        50
    )

    camera = get_numeric_score(
        phone,
        "camera",
        50
    )

    battery = get_numeric_score(
        phone,
        "battery_score",
        get_numeric_score(phone, "battery", 50)
    )

    display = get_numeric_score(
        phone,
        "display_score",
        get_numeric_score(phone, "display", 50)
    )

    # --------------------------------------------------------
    # VALUE SCORE
    # --------------------------------------------------------

    price = phone.get("price", 0)

    try:
        price = float(price)
    except (ValueError, TypeError):
        price = 0

    budget = get_budget(requirements)

    if budget > 0 and price > 0:

        # Phones closer to the user's budget get a better
        # value/relevance score.
        difference = max(budget - price, 0)

        value = 100 - (
            (difference / budget) * 100
        )

        value = max(0, min(100, value))

    else:
        value = 50

    # --------------------------------------------------------
    # DEFAULT WEIGHTS
    # --------------------------------------------------------

    weights = {
        "performance": 0.25,
        "camera": 0.20,
        "battery": 0.20,
        "display": 0.15,
        "value": 0.20,
    }

    # --------------------------------------------------------
    # READ PARSED WEIGHTS IF AVAILABLE
    # --------------------------------------------------------

    parsed_weights = requirements.get("weights")

    if isinstance(parsed_weights, dict):

        for key in weights:

            if key in parsed_weights:

                try:
                    weights[key] = float(
                        parsed_weights[key]
                    )
                except (ValueError, TypeError):
                    pass

    # --------------------------------------------------------
    # NATURAL LANGUAGE PRIORITIES
    #
    # This keeps the simple beginner-friendly logic.
    # --------------------------------------------------------

    if "gaming" in text or "performance" in text:
        weights["performance"] += 0.20

    if "camera" in text or "photography" in text:
        weights["camera"] += 0.20

    if "battery" in text or "battery backup" in text:
        weights["battery"] += 0.20

    if "display" in text or "screen" in text:
        weights["display"] += 0.15

    # Normalize weights
    total_weight = sum(weights.values())

    if total_weight <= 0:
        total_weight = 1

    for key in weights:
        weights[key] /= total_weight

    # --------------------------------------------------------
    # FINAL SCORE
    # --------------------------------------------------------

    final_score = (
        performance * weights["performance"]
        + camera * weights["camera"]
        + battery * weights["battery"]
        + display * weights["display"]
        + value * weights["value"]
    )

    # Return 0-10 because frontend converts it to percentage
    return max(0, min(10, final_score / 10))


# ============================================================
# BREAKDOWN
# ============================================================

def build_breakdown(phone, requirements):
    """
    Build the data used by the frontend's
    "Why this pick?" section.
    """

    text = requirement_text(requirements)

    performance = get_numeric_score(
        phone,
        "performance",
        50
    )

    camera = get_numeric_score(
        phone,
        "camera",
        50
    )

    battery = get_numeric_score(
        phone,
        "battery_score",
        get_numeric_score(phone, "battery", 50)
    )

    display = get_numeric_score(
        phone,
        "display_score",
        get_numeric_score(phone, "display", 50)
    )

    price = phone.get("price", 0)

    try:
        price = float(price)
    except (ValueError, TypeError):
        price = 0

    budget = get_budget(requirements)

    if budget > 0 and price > 0:

        value = (
            100
            - ((budget - price) / budget * 100)
        )

        value = max(0, min(100, value))

    else:
        value = 50

    weights = {
        "performance": 0.25,
        "camera": 0.20,
        "battery": 0.20,
        "display": 0.15,
        "value": 0.20,
    }

    parsed_weights = requirements.get("weights")

    if isinstance(parsed_weights, dict):

        for key in weights:

            if key in parsed_weights:

                try:
                    weights[key] = float(
                        parsed_weights[key]
                    )
                except (ValueError, TypeError):
                    pass

    if "gaming" in text or "performance" in text:
        weights["performance"] += 0.20

    if "camera" in text or "photography" in text:
        weights["camera"] += 0.20

    if "battery" in text:
        weights["battery"] += 0.20

    if "display" in text:
        weights["display"] += 0.15

    total = sum(weights.values())

    if total <= 0:
        total = 1

    for key in weights:
        weights[key] /= total

    return [
        {
            "dimension": "performance",
            "weight": weights["performance"],
            "deviceScore": performance,
            "contribution":
                performance * weights["performance"],
        },
        {
            "dimension": "camera",
            "weight": weights["camera"],
            "deviceScore": camera,
            "contribution":
                camera * weights["camera"],
        },
        {
            "dimension": "battery",
            "weight": weights["battery"],
            "deviceScore": battery,
            "contribution":
                battery * weights["battery"],
        },
        {
            "dimension": "display",
            "weight": weights["display"],
            "deviceScore": display,
            "contribution":
                display * weights["display"],
        },
        {
            "dimension": "value",
            "weight": weights["value"],
            "deviceScore": value,
            "contribution":
                value * weights["value"],
        },
    ]


# ============================================================
# MAIN RECOMMENDER
# ============================================================

def recommend_devices(requirements, top_n=3):
    """
    Recommend the best phones.

    IMPORTANT BUDGET LOGIC:

    For "under ₹30,000":

        ₹25,000 - ₹30,000
        ↓
        ₹20,000 - ₹25,000
        ↓
        ₹15,000 - ₹20,000
        ↓
        ...

    For "under ₹1,00,000":

        ₹95,000 - ₹1,00,000
        ↓
        ₹90,000 - ₹95,000
        ↓
        ₹85,000 - ₹90,000
        ↓
        ...

    Therefore, the system prefers phones close to the
    user's maximum budget instead of immediately showing
    cheap phones.
    """

    max_budget = get_budget(requirements)

    # --------------------------------------------------------
    # CATEGORY
    # --------------------------------------------------------

    category = get_category(requirements)

    # --------------------------------------------------------
    # HARD FILTER
    # --------------------------------------------------------

    budget_eligible = []

    for phone in PHONES:

        price = phone.get("price", 0)

        try:
            price = float(price)
        except (ValueError, TypeError):
            continue

        # Never recommend something above the budget.
        if max_budget > 0 and price > max_budget:
            continue

        # Category filtering if available.
        if category:

            phone_category = str(
                phone.get("category", "mobile")
            ).lower()

            # Allow mobile/phone terminology to match.
            if category in ("mobile", "phone", "smartphone"):

                if phone_category not in (
                    "mobile",
                    "phone",
                    "smartphone",
                    "",
                ):
                    continue

        budget_eligible.append(phone)

    if not budget_eligible:
        return []

    # --------------------------------------------------------
    # BUDGET BAND SELECTION
    # --------------------------------------------------------

    selected_phones = []

    # If there is no parsed budget, simply use all eligible.
    if max_budget <= 0:

        selected_phones = budget_eligible[:]

    else:

        current_upper = max_budget

        while (
            current_upper > 0
            and len(selected_phones) < top_n
        ):

            current_lower = max(
                0,
                current_upper - 5000
            )

            # IMPORTANT:
            #
            # Current band:
            #
            #   current_lower < price <= current_upper
            #
            # Example:
            #
            # ₹25k < price <= ₹30k
            #
            band_phones = [
                phone
                for phone in budget_eligible
                if (
                    current_lower
                    < float(phone.get("price", 0))
                    <= current_upper
                )
            ]

            # Add phones from this band.
            for phone in band_phones:

                if phone not in selected_phones:
                    selected_phones.append(phone)

                if len(selected_phones) >= top_n:
                    break

            # Move to next lower band.
            current_upper = current_lower

    # --------------------------------------------------------
    # SAFETY FALLBACK
    #
    # Only use this if the entire dataset doesn't contain
    # enough phones in the budget bands.
    # --------------------------------------------------------

    if len(selected_phones) < top_n:

        remaining = [
            phone
            for phone in budget_eligible
            if phone not in selected_phones
        ]

        # Closest to maximum budget first.
        remaining.sort(
            key=lambda phone: float(
                phone.get("price", 0)
            ),
            reverse=True,
        )

        for phone in remaining:

            selected_phones.append(phone)

            if len(selected_phones) >= top_n:
                break

    # --------------------------------------------------------
    # SCORE SELECTED PHONES
    # --------------------------------------------------------

    suitable_phones = []

    for phone in selected_phones:

        score = calculate_score(
            phone,
            requirements
        )

        suitable_phones.append({

            # Identity
            "id": phone.get(
                "id",
                phone.get("name", "")
            ),

            "name": phone.get(
                "name",
                "Unknown device"
            ),

            "brand": phone.get(
                "brand",
                ""
            ),

            # Price
            "price": phone.get(
                "price",
                0
            ),

            # Processor
            "chip": phone.get(
                "processor",
                phone.get(
                    "chip",
                    "Not specified"
                )
            ),

            # RAM
            "ram": phone.get(
                "ram",
                "Not specified"
            ),

            # Storage
            "storage": phone.get(
                "storage",
                "Not specified"
            ),

            # Display
            "displaySpec": phone.get(
                "display",
                phone.get(
                    "displaySpec",
                    "Not specified"
                )
            ),

            # Camera
            "cameraSpec": phone.get(
                "camera",
                phone.get(
                    "cameraSpec",
                    "Not specified"
                )
            ),

            # Battery
            "battery": (
                f'{phone.get("battery", 0)}mAh, '
                f'{phone.get("charging", 0)}W'
            ),

            # Score
            "score": round(
                score * 10,
                2
            ),

            # Rank assigned after sorting
            "rank": 0,

            # Why this pick
            "breakdown": build_breakdown(
                phone,
                requirements
            ),
        })

    # --------------------------------------------------------
    # SORT BY ACTUAL RECOMMENDATION SCORE
    # --------------------------------------------------------

    suitable_phones.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    # --------------------------------------------------------
    # TOP N + RANK
    # --------------------------------------------------------

    ranked = []

    for index, phone in enumerate(
        suitable_phones[:top_n],
        start=1
    ):

        phone["rank"] = index
        ranked.append(phone)

    return ranked