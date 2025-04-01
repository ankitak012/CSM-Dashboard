import requests
import time

# Your Django API endpoint URL
API_URL = "http://localhost:8000/api/server/"

# JSON data to send
data = {
    "server_id": "s12",
    "server_name": "Amavra Cometa Dashboard",
    "server_secret_name": "John",
    "server_secret_password": "wfesdsd"
}

# Headers (important for JSON requests)
headers = {
    "Content-Type": "application/json"
}

while True:
    try:
        # Send POST request
        response = requests.post(API_URL, json=data, headers=headers)

        # Check response status
        if response.status_code == 201:
            print("✅ Data inserted successfully:", response.json())
        else:
            print("❌ Failed to insert data:", response.status_code, response.text)

    except requests.exceptions.RequestException as e:
        print("❌ Error:", e)

    # Wait for 60 seconds before sending again
    time.sleep(60)
