FROM codercom/code-server:4.96.4

USER root

RUN apt-get update \
    && apt-get install -y curl unzip \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && curl -fsSL https://bun.sh/install | bash \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="/home/coder/.bun/bin:${PATH}"

RUN mkdir -p /tmp/appsta-worker && chown -R coder:coder /tmp/appsta-worker

USER coder

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /tmp/appsta-worker

EXPOSE 8082

CMD ["code-server", \
    "--auth", "none", \
    "--bind-addr", "0.0.0.0:8082", \
    "--disable-telemetry", \
    "/tmp/appsta-worker"]