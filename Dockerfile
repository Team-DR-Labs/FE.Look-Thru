# 1. Base image
FROM node:20-alpine AS base

# Enable pnpm globally for all subsequent stages by running it in the base image
RUN corepack enable

# 2. Install dependencies
FROM base AS deps
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# 3. Build the application
FROM base AS builder
WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the source code
COPY . .

# Set build-time environment variables if needed
# ARG GEMINI_API_KEY
# ENV GEMINI_API_KEY=$GEMINI_API_KEY

RUN pnpm build

# 4. Production image
FROM base AS runner
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production
# The GEMINI_API_KEY should be passed at runtime, not build time, for security.
# e.g., docker run -p 3000:3000 -e GEMINI_API_KEY=your_key my-app
# ENV GEMINI_API_KEY=

# Create a non-root user for security purposes
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# The default command to start the app
CMD ["pnpm", "start"]
