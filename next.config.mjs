/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '/**',
            },
          ],
    },
    webpack: (
      config
    ) => {
      config.resolve.alias.canvas = false
      config.resolve.alias.encoding = false
      return config
    },
};

export default nextConfig;
