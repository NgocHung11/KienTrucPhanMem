import os

app_env = os.environ.get('APP_ENV', 'unknown')
print(f"Environment: {app_env}")
