/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Si es necesario para imágenes estáticas
    },
    basePath: '/medflow', // Si estás usando GitHub Pages
}

export default nextConfig;
