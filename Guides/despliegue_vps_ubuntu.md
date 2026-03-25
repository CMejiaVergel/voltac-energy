# Guía de Despliegue en VPS (Ubuntu)

Esta guía detalla el paso a paso para desplegar la página web corporativa de **Voltac Energy** (desarrollada en Next.js) en un servidor Virtual Private Server (VPS) ejecutando Ubuntu.

## Requisitos previos

- Un VPS con Ubuntu (versión 20.04 o superior recomendada).
- Acceso SSH al servidor (usuario \`root\` o usuario con privilegios \`sudo\`).
- Un nombre de dominio apuntando a la dirección IP de tu VPS (opcional pero muy recomendado para producción y SSL).
- Tu repositorio de GitHub listo: \`https://github.com/CMejiaVergel/voltac-energy.git\`

---

## 1. Conexión al servidor y actualización

Conéctate a tu servidor a través de la terminal usando SSH:

\`\`\`bash
ssh tu_usuario@ip_de_tu_servidor
\`\`\`

Una vez dentro, actualiza la lista de paquetes del sistema operativo:

\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

---

## 2. Instalación de Node.js y NPM

Next.js requiere Node.js. Instalaremos la versión recomendada (LTS) usando NodeSource.

\`\`\`bash
# 1. Descargar e instalar el script de configuración de NodeSource (versión 20 LTS como ejemplo)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 2. Instalar Node.js y npm
sudo apt install -y nodejs

# 3. Verificar instalación
node -v
npm -v
\`\`\`

---

## 3. Clonar el repositorio y configurar el proyecto

Vamos a descargar el código del sistema instalado en nuestro VPS mediante Git.

\`\`\`bash
# 1. Asegúrate de tener Git instalado
sudo apt install -y git

# 2. Ve a la carpeta donde alojarás el proyecto (generalmente /var/www)
cd /var/www

# 3. Clona el repositorio
sudo git clone https://github.com/CMejiaVergel/voltac-energy.git

# 4. Entra al directorio del proyecto y dale permisos a tu usuario actual
sudo chown -R $USER:$USER voltac-energy
cd voltac-energy

# 5. Instala las dependencias del proyecto
npm install
\`\`\`

---

## 4. Construcción (Build) de la aplicación

Dado que es un proyecto de Next.js, se debe compilar el código para producción.

Si utilizaste variables de entorno (como accesos a Supabase), asegúrate de crear el archivo \`.env.local\` o \`.env\` en el directorio raíz usando \`nano .env.local\` y añadiéndolas allí antes del *build*.

\`\`\`bash
# Ejecutar compilación de Next.js
npm run build
\`\`\`

Esto creará la carpeta \`.next\` con el código optimizado.

---

## 5. Mantener la aplicación viva: Instalar y configurar PM2

PM2 es un gestor de procesos que nos asegurará que Next.js se ejecute continuamente en segundo plano y se reinicie automáticamente si ocurre un error o si elVPS se reinicia.

\`\`\`bash
# 1. Instalar PM2 de forma global
sudo npm install -g pm2

# 2. Iniciar el servidor Next.js usando PM2
pm2 start npm --name "voltac-energy" -- run start

# 3. Guardar el estado actual para que inicie después de un reinicio del sistema
pm2 save

# 4. Configurar PM2 para ejecutarse al arrancar el servidor
pm2 startup
# (Ejecuta el comando que PM2 te genere e imprima en la terminal después de correr 'pm2 startup')
\`\`\`

Tu aplicación Next.js ahora debe estar corriendo en \`http://localhost:3000\` de manera persistente en tu VPS.

---

## 6. Configuración de Nginx (Reverse Proxy)

Dado que Next.js corre por defecto en el puerto 3000, instalaremos Nginx para interceptar el tráfico web del puerto 80 (HTTP) y 443 (HTTPS) y enviarlo al puerto 3000, además de enlazarlo a tu dominio real.

\`\`\`bash
# 1. Instalar Nginx
sudo apt install -y nginx

# 2. Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
\`\`\`

Crea un archivo de configuración para tu sitio. Cambia \`tudominio.com\` por tu dominio real.

\`\`\`bash
sudo nano /etc/nginx/sites-available/voltac-energy
\`\`\`

Pega la siguiente configuración dentro:

\`\`\`nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com; # Cambia esto por tu dominio (o IP pública mientras pruebas)

    location / {
        proxy_pass http://localhost:3000; # Redirige el tráfico hacia el puerto de Next.js
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Guarda el archivo (\`Ctrl+O\`, \`Enter\`, \`Ctrl+X\`). Ahora actívalo enlanzádolo a la carpeta activa:

\`\`\`bash
# 1. Habilitar la configuración
sudo ln -s /etc/nginx/sites-available/voltac-energy /etc/nginx/sites-enabled/

# 2. Verificar que no haya errores de sintaxis
sudo nginx -t

# 3. Reiniciar Nginx
sudo systemctl restart nginx
\`\`\`

Ahora deberías poder ver la web introduciendo tu dominio (o IP pública) en el navegador.

---

## 7. Proteger con Certificado SSL (HTTPS) - Opcional pero recomendado

Si tienes tu dominio conectado a la IP del VPS, instala el certificado gratuito de Let's Encrypt mediante Certbot.

\`\`\`bash
# 1. Instalar Certbot y su extensión para Nginx
sudo apt install -y certbot python3-certbot-nginx

# 2. Ejecutar Certbot (Y sigue las instrucciones que van apareciendo en pantalla)
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
\`\`\`

Certbot configurará el re-direccionamiento automático de HTTP a HTTPS. De esta manera el tráfico estará encriptado.

---

## 🎉 ¡Felicidades!
La plataforma digital de **Voltac Energy** está desplegada en modo producción lista para interactuar con tus clientes.
