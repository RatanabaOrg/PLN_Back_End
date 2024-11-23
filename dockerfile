# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos do projeto para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código para o container
COPY . .

# Exponha a porta do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]
