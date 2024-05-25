const { i18n } = require('./next-i18next.config');

module.exports = {
    mode: 'production',

    // Конфиг для мультиязычности
    i18n: {
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
        localeDetection: false
    },

    react: {
        useSuspense: true
    },

    // Конфиг для next/image
    images: {
        domains: []
    },

    // Для пакета @svgr/webpack
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            use: ['@svgr/webpack'],
        });
        return config;
    },

    // Переменные env, которые необходимо передавать на клиент
    env: {
        API_URL_CONTENT: process.env.API_URL_CONTENT,
        API_AUTH: process.env.API_AUTH,

        API_EVS_TIMEOUT: process.env.API_EVS_TIMEOUT,
        API_HOST_OPENAPI: process.env.API_HOST_OPENAPI,
        API_URL_OPENAPI: process.env.API_URL_OPENAPI,

        API_URL_YOUTUBE: process.env.API_URL_YOUTUBE,
        KEY_YOUTUBE: process.env.KEY_YOUTUBE,

        API_URL_HH: process.env.API_URL_HH,
        HH_EMPLOYER_ID: process.env.HH_EMPLOYER_ID,

        FORM_URL_BITRIX: process.env.FORM_URL_BITRIX,

        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,

        YM_ID: process.env.YM_ID,
        GM_ID: process.env.GM_ID
    },

    // Компилятор для минификации
    swcMinify: true,

    compiler: {
        styledComponents: true
    },

    async redirects() {
        return [
            {
                source: '/sale178/:path*',
                destination: '/sale/:path*',
                permanent: true
            },
            {
                source: '/les/:path*',
                destination: '/sale/:path*',
                permanent: true
            },
            {
                source: '/arrested-sale/:path*',
                destination: '/sale/:path*',
                permanent: true
            }
        ];
    },

    async rewrites() {
        return [
            {
                source: '/tech',
                destination: '/api/stub'
            }
        ];
    },

    generateBuildId: async () => {
        if (process.env.CI_COMMIT_SHA) {
            return process.env.CI_COMMIT_SHA;
        }
        return 'build';
    },

    experimental: {
        workerThreads: false,
        cpus: 1
    },

    staticPageGenerationTimeout: 1000
};
