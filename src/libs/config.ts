export const config = {
    baseUrl: import.meta.env.VITE_BASE_URL
}

export const firebaseConfig = {
    apiKey: "AIzaSyBk52yhco1B_HJtZEcu1DvSNhEKj5AFKlY",
    authDomain: "laboon-app.firebaseapp.com",
    databaseURL: "https://laboon-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "laboon-app",
    storageBucket: "laboon-app.appspot.com",
    messagingSenderId: "582128073252",
    appId: "1:582128073252:web:fe89ec5871d7054640b6b1",
    measurementId: "G-84NGMZBGDJ"
}

export const siteSeoBase = {
    title: 'Laboon Apps + Svelte',
    description: 'Svelte with brilliant bells and useful whistles',
    keywords: 'svelte, svelte-kit, starter-kit, typescript, supabase',
    canonical: import.meta.env ? import.meta.env.VITE_SITE_URL : 'https://www.example.com'
};

export const siteSeoOpenGraphBase = {
    title: 'Laboon Apps + Svelte',
    description: 'Svelte with brilliant bells and useful whistles',
    url: import.meta.env ? import.meta.env.VITE_SITE_URL : '',
    type: 'website',
    images: [
        {
            url: 'https://www.example.com/images/og-image.jpg',
            width: 850,
            height: 650,
            alt: 'Og Image Alt'
        }
    ]
};

export const siteSeoOpenGraphArticle = {
    type: 'article',
    article: {
        publishedTime: "2020-08-03T17:31:37Z",
        modifiedTime: "2020-08-20T09:31:37Z",
        expirationTime: "2025-12-21T17:31:37Z",
        section: "Section II",
        authors: [
          "https://www.ikziriv.com",
        ],
        tags: ["Tag A", "Tag B", "Tag C"],
    }
}

export const siteSeoTwitter = {
    site: "@username",
    title: "Twitter Card Title",
    description: "Description of Twitter Card",
    image: "https://www.example.com/images/cover.jpg",
    imageAlt: "Alt text for the card!",
}