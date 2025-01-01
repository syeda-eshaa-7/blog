---
title: Next.js Tutorial
description: This is a Next.js tutorial for learning how to build React-based web applications.
slug: nextjs-tutorial
date: 11/02/2025
author: Syeda Esha
image: https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
---

# Next.js Tutorial: A Beginner's Guide

Welcome to this comprehensive Next.js tutorial! This guide is designed to help you master the fundamentals of Next.js, a powerful React framework for building server-rendered and static web applications.

## Introduction to Next.js

Next.js is a React-based framework that offers features like server-side rendering (SSR), static site generation (SSG), dynamic routing, and API integration. It's a great choice for building scalable and performant web applications.

### Why Learn Next.js?

- **Performance**: Server-side rendering improves performance and SEO.
- **Flexibility**: Supports both client-side and server-side rendering.
- **Developer Experience**: Offers a great developer experience with built-in tools like hot reloading and TypeScript support.
- **Ecosystem**: Seamlessly integrates with React and other libraries.

## Setting Up a Next.js Project

To start a Next.js project, you'll need Node.js installed on your system. Follow these steps:

1. Open your terminal.
2. Run the following command:

```bash
npx create-next-app@latest my-next-app
```

3. Navigate to your project directory:

```bash
cd my-next-app
```

4. Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## File Structure in Next.js

A typical Next.js project has the following structure:

```
my-next-app/
├── pages/          # Contains all page components
├── public/         # Stores static assets like images
├── styles/         # Stores CSS files
├── components/     # Contains reusable components
├── package.json    # Project dependencies and scripts
```

## Creating Pages in Next.js

Next.js uses a file-based routing system. Each file in the `pages/` directory corresponds to a route.

### Example: Creating a Home Page

Create a `pages/index.js` file:

```jsx
export default function Home() {
    return (
        <div>
            <h1>Welcome to Next.js!</h1>
        </div>
    );
}
```

### Example: Creating an About Page

Create a `pages/about.js` file:

```jsx
export default function About() {
    return (
        <div>
            <h1>About Us</h1>
            <p>This is the about page.</p>
        </div>
    );
}
```

Access the page at `http://localhost:3000/about`.

## Styling in Next.js

You can style your Next.js application using CSS, CSS Modules, or styled-components.

### Using CSS Modules

Create a CSS Module file in the `styles/` directory (e.g., `styles/Home.module.css`):

```css
.title {
    color: blue;
    font-size: 2rem;
}
```

Import and use the styles in your component:

```jsx
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <h1 className={styles.title}>Welcome to Next.js!</h1>
    );
}
```

## Fetching Data in Next.js

Next.js provides multiple methods for fetching data, including `getStaticProps`, `getServerSideProps`, and `getStaticPaths`.

### Static Site Generation (SSG)

Use `getStaticProps` to fetch data at build time:

```jsx
export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
}

export default function Home({ data }) {
    return (
        <div>
            <h1>Data from API</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
```

### Server-Side Rendering (SSR)

Use `getServerSideProps` to fetch data on every request:

```jsx
export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
}

export default function Page({ data }) {
    return (
        <div>
            <h1>Server-Side Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
```

## API Routes

Next.js allows you to create API endpoints in the `pages/api/` directory.

### Example: Creating an API Endpoint

Create a `pages/api/hello.js` file:

```jsx
export default function handler(req, res) {
    res.status(200).json({ message: 'Hello, Next.js!' });
}
```

Access the API at `http://localhost:3000/api/hello`.

## Conclusion

This tutorial has introduced you to the basics of Next.js, including setting up a project, creating pages, styling, fetching data, and working with API routes. With Next.js, you can build fast, scalable, and SEO-friendly web applications. Keep exploring and experimenting to deepen your understanding of this powerful framework.

Happy coding!
