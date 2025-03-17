import { useState } from 'react';
import axios from 'axios';

function App() {
  const [numWallets, setNumWallets] = useState('');
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setWallets([]); // Clear previous wallets

    try {
      const response = await axios.post('/generate', { numWallets: parseInt(numWallets) });
      setWallets(response.data.wallets);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'An error occurred.');
      } else {
        setError('An error occurred. Please check your network connection.');
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Solana Wallet Generator</h1>
        <form onSubmit={handleSubmit} className="mb-4 space-y-4">
          <div>
            <label htmlFor="numWallets" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Wallets:
            </label>
            <input
              type="number"
              id="numWallets"
              value={numWallets}
              onChange={(e) => setNumWallets(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Wallets
          </button>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {wallets.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Generated Wallets:</h2>
            {wallets.map((wallet, index) => (
              <div key={index} className="border p-2 my-2">
                <p>Wallet {index + 1}</p>
                <p>Public Key: {wallet.publicKey}</p>
                <p>Secret Key: <span className="break-all">{wallet.secretKey}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
