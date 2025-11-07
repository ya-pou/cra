# -------------------------------
# Étape 1 : Build TypeScript
# -------------------------------
FROM node:20 AS builder

# Dossier de travail
WORKDIR /app

# Copie des fichiers nécessaires à l'installation
COPY package*.json tsconfig.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY src ./src

# Build du code TypeScript vers JavaScript
RUN npm run build

# -------------------------------
# Étape 2 : Runtime
# -------------------------------
FROM node:22-slim

WORKDIR /app

# Copier uniquement le résultat du build + les dépendances nécessaires
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Installation des dépendances de production uniquement
RUN npm install --omit=dev

# Variables d'environnement par défaut (surchargées par docker-compose)
ENV NODE_ENV=production
ENV PORT=3000

# Expose le port
EXPOSE 3000

# Lancement de l'app
CMD ["node", "dist/server.js"]