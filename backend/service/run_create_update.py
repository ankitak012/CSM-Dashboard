# import subprocess
# import time

# def run_script(script_name, wait=True):
#     """Run a script and show output."""
#     print(f"\n🚀 Running {script_name}...\n")
#     try:
#         if wait:
#             # Run normally and wait for it to finish
#             result = subprocess.run(["python3", script_name], capture_output=True, text=True)
#             print(f"📜 Output from {script_name}:\n{result.stdout}")
#             if result.stderr:
#                 print(f"⚠️ Error in {script_name}:\n{result.stderr}")
#             return result.returncode == 0  # True if successful
#         else:
#             # Run in the background (so it does not block execution)
#             subprocess.Popen(["python3", script_name])
#             return True
#     except Exception as e:
#         print(f"❌ Failed to run {script_name}: {e}")
#         return False

# def run_create_and_update():
#     while True:
#         print("\n🔄 Running create_row.py in the background...\n")
#         run_script("create_row.py", wait=False)  # Run without waiting

#         print("\n⏳ Waiting 60 seconds before updating...\n")
#         time.sleep(60)

#         print("\n🔄 Running update_row.py...\n")
#         run_script("update_row.py", wait=True)  # Run and wait

# if __name__ == "__main__":
#     print("🚀 Starting process...")
#     run_create_and_update()


import subprocess

def run_script(script_name):
    print(f"\n🚀 Running {script_name}...\n")
    try:
        result = subprocess.run(["python3", script_name])
        print(f"📜 Output from {script_name}:\n{result.stdout}")
        if result.stderr:
            print(f"⚠️ Error in {script_name}:\n{result.stderr}")
        return result.returncode == 0  # True if successful
    except Exception as e:
        print(f"❌ Failed to run {script_name}: {e}")
        return False

if __name__ == "__main__":
    run_script("update_row.py")
