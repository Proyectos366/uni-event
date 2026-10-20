FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl \
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

ENV NODE_ENV=production
USER nextjs

CMD ["npm", "run", "db:migrate:deploy"]

FROM dependencies AS builder

COPY . .
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
