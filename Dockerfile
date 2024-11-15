# مرحله 1: ساخت برنامه
FROM node:18 AS build

# تنظیم مسیر کاری
WORKDIR /app

# کپی فایل‌های پروژه
COPY package.json package-lock.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کد برنامه به کانتینر
COPY . .

# ساخت برنامه React
RUN npm run build

# مرحله 2: سرو کردن برنامه
FROM nginx:alpine

# کپی فایل‌های ساخته شده از مرحله قبل
COPY --from=build /app/build /usr/share/nginx/html

# باز کردن پورت 80
EXPOSE 80

# استارت سرور
CMD ["nginx", "-g", "daemon off;"]
