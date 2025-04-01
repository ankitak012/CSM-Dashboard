import requests
import time

API_URL = "http://localhost:9000/api/service/"
data = {
    "server": "s11",
    "cometa_selenoid": False,
    "cometa_front": False,
    "cometa_novnc": False,
    "cometa_scheduler": False,
    "cometa_socket": False,
    "cometa_postgres": False,
    "cometa_behave": False,
    "cometa_django": False,
    "cometa_redis": False
}
headers = {"Content-Type": "application/json"}

while True:
    print("🚀 Sending data to API...")
    try:
        response = requests.post(API_URL, json=data, headers=headers)
        print(f"🔄 Response Code: {response.status_code}")

        if response.status_code == 201:
            response_json = response.json()
            service_id = response_json.get("id")  # Get ID from response

            if service_id:
                print(f"✅ Data inserted! Service ID: {service_id}")

                # Save the ID to a file for update_row.py
                with open("last_service_id.txt", "w") as file:
                    file.write(str(service_id))
            else:
                print("⚠️ No ID returned from API!")

        else:
            print(f"❌ Failed to insert data: {response.status_code} {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"❌ Error: {e}")

    print("⏳ Sleeping for 60 seconds...\n")
    time.sleep(60)
