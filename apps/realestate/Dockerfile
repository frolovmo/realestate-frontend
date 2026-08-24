# Stage 1: Build the application
FROM registry.access.redhat.com/ubi8/nodejs-20:latest AS builder

# Set working directory
WORKDIR /opt/app-root/

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application (Crucial - This step needs to happen here)
RUN npm run build

#--------------------------------------------------
#  Production Image
#--------------------------------------------------

FROM registry.access.redhat.com/ubi8/nodejs-20:latest AS production

# Set working directory
WORKDIR /opt/app-root/

# Set environment variables
ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /opt/app-root/.next ./.next
COPY --from=builder /opt/app-root/public ./public
COPY --from=builder /opt/app-root/package.json ./package.json
COPY --from=builder /opt/app-root/next.config.mjs ./next.config.mjs
COPY --from=builder /opt/app-root/next-env.d.ts ./next-env.d.ts

RUN npm install --only=production

RUN npm install --production

# Install dotenv for loading environment variables
RUN npm install dotenv

RUN ls -l ./

# Expose port 8080 for the Next.js server
EXPOSE 8080

# Start the Next.js application
CMD ["npm", "start"]
