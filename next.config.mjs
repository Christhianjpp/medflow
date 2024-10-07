/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true, // Si es necesario para imágenes estáticas
    },
    basePath: '/medflow', // Si estás usando GitHub Pages
}

export default nextConfig;
