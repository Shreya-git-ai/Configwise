import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """
You are a hardware requirement parser.

Your job is to understand a user's request for a mobile phone
and convert it into structured requirements for a recommendation system.

Return ONLY valid JSON in this format:

{
    "device_type": "phone",
    "budget": null,
    "priorities": [],
    "min_ram": null,
    "min_storage": null,
    "min_battery": null,
    "min_refresh_rate": null,
    "camera_priority": false,
    "gaming_priority": false,
    "battery_priority": false,
    "display_priority": false
}

Rules:

- device_type should be "phone".
- budget should be an integer in INR if the user mentions a maximum budget.
- If no budget is mentioned, use null.
- priorities should contain the user's important requirements.
- min_ram, min_storage, min_battery and min_refresh_rate should only
  be filled when the user explicitly or clearly implies a minimum.
- Use null when information is not provided.
- Set priority flags to true only when that requirement is important.
- Do not invent requirements.
- Return ONLY JSON.
"""


def parse_requirements(user_query):
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise ValueError("GROQ_API_KEY is not set.")

    client = Groq(api_key=api_key)

    response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    response_format={"type": "json_object"},
    include_reasoning=False,
    messages=[
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role": "user",
            "content": user_query
        }
    ]
)

    result = response.choices[0].message.content

    return json.loads(result)
if __name__ == "__main__":
    query = input("Enter your requirements: ")

    requirements = parse_requirements(query)

    print(json.dumps(requirements, indent=4))