function App() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="rounded-2xl bg-white p-10 shadow-xl text-center">
        <h1 className="text-4xl font-bold text-green-700">
          🌾 Oja-Oko Marketplace
        </h1>

        <p className="mt-4 text-gray-600">
          Frontend Foundation Complete
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Backend: {import.meta.env.VITE_API_BASE_URL}
        </p>
      </div>
    </main>
  );
}

export default App;