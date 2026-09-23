FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    g++ curl libssl-dev ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://ollama.com/install.sh | sh

WORKDIR /app
COPY . .

RUN g++ -std=c++17 -O2 main.cpp -o db -lpthread -lssl -lcrypto

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8081
CMD ["/app/start.sh"]
