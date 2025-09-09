import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState([]);

  //Generate random pokemons
  const generatePokemons = async (count = 6) => {
    const promises = Array.from({ length: count }, () => {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then((res) =>
        res.json()
      );
    });

    const results = await Promise.all(promises);
    setPokemons(results);
  };

  useEffect(() => {
    generatePokemons();
  }, []);

  // shuffle cards
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // when a card is clicked
  const handleCardClick = (id) => {
    if (clicked.includes(id)) {
      // if already clicked, you lose
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setClicked([]);
    } else {
      // new pokemon -> +1
      setScore(score + 1);
      setClicked([...clicked, id]);
    }

    //shuffle after being clicked
    setPokemons(shuffleArray(pokemons));
  };

  return (
    <>
       <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Pokémon Memory Game</h1>
      <p>Score: {score} | High score: {highScore}</p>
      <button onClick={() => generatePokemons(6)}>Reset</button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {pokemons.map((p) => (
          <div
            key={p.id}
            onClick={() => handleCardClick(p.id)}
            style={{
              border: "2px solid #333",
              borderRadius: "10px",
              padding: "15px",
              background: "#f8f8f8",
              cursor: "pointer",
            }}
          >
            <h2>{p.name.toUpperCase()}</h2>
            <img src={p.sprites.front_default} alt={p.name} width={120} />
          </div>
        ))}
      </div>
    </div>
  
    </>
  )
}

export default App
