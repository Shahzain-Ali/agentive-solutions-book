# FastAPI backend for the Agentive Solutions book (Render / any Docker host)
FROM python:3.12-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src

# Render injects PORT; default kept for local/other hosts
EXPOSE 7860

CMD ["sh", "-c", "uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-7860}"]
