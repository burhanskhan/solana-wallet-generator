const express = require('express');
const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Enable CORS for all origins

app.post('/generate', (req, res) => {
  const numWallets = req.body.numWallets;

  if (!numWallets || isNaN(numWallets) || numWallets <= 0) {
    return res.status(400).json({ error: 'Invalid number of wallets' });
  }

  const walletsDir = path.join(__dirname, 'wallets');
  if (!fs.existsSync(walletsDir)) {
    fs.mkdirSync(walletsDir);
  }

  const wallets = [];
  for (let i = 0; i < numWallets; i++) {
    const keypair = Keypair.generate();
    const walletData = {
      publicKey: keypair.publicKey.toString(),
      secretKey: keypair.secretKey.toString(),
    };
    wallets.push(walletData);
    fs.writeFileSync(path.join(walletsDir, `${i}.json`), JSON.stringify(walletData));
  }

  res.json({ wallets });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
