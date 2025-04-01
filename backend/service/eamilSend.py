import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()



# Email credentials
sender_email = os.getenv("EMAIL_USER")
receiver_email = os.getenv("RECEIVER_EMAIL")
password = os.getenv("EMAIL_PASS")  # Use App Passwords if using Gmail

print(sender_email, receiver_email,password)
# Set up the message
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = "Test Email from Python"

# Email body
body = "Hello, this is a test email sent using Python."
msg.attach(MIMEText(body, 'plain'))
server = None  # Declare server variable

# Send email
try:
    server = smtplib.SMTP("smtp.gmail.com", 587)  
    server.starttls()  # Secure the connection
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, msg.as_string())
    print("✅ Email sent successfully!")
except Exception as e:
    print(f"❌ Error: {e}")
finally:
    if server:  # Only quit if server was initialized
        server.quit()