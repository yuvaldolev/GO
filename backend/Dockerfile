FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY src src

CMD ["uvicorn", "--host", "0.0.0.0", "--port", "80", "src.main:app"]
