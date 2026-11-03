FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl ca-certificates \
    && addgroup --system --gid 1001 nextjs \
    && adduser --system --uid 1001 --ingroup nextjs nextjs \
    && mkdir -p /data \
    && chown nextjs:nextjs /data

FROM base AS dependencies

COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS migrator

COPY prisma ./prisma
COPY prisma.config.mjs ./prisma.config.mjs
COPY database.config.mjs ./database.config.mjs

ENV NODE_ENV=production
USER nextjs

CMD ["npm", "run", "db:migrate:deploy"]

FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY . .

ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    DATABASE_URL=file:/data/app.db

COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]