# Al Huda API - Express + Firebase Admin
FROM node:20-slim

# App directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the rest of the source
COPY . .

# Cloud Run sets PORT (defaults to 8080); the app reads process.env.PORT
ENV NODE_ENV=production
EXPOSE 8080

CMD ["npm", "start"]
