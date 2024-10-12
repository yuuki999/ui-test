import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Next.js with Tailwind CSS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-blue-600">
          Welcome to Next.js with Tailwind CSS
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Feature 1</h2>
            <p className="text-gray-600">
              This is a sample feature description using Tailwind CSS classes.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Feature 2</h2>
            <p className="text-gray-600">
              Another feature showcasing Tailwind's utility classes.
            </p>
          </div>
        </div>

        <button className="mt-8 rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600">
          Learn More
        </button>
      </main>
    </div>
  );
}
