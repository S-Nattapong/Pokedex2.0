import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Box, Button, Container, Grid, Switch } from "@mui/material";
import Head from "next/head";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import StatBar from "../../components/statbar";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

interface Ability {
  slot: number;
  ability: {
    name: string;
  };
}

interface Sprites {
  front_default: string;
  front_shiny: string;
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
}

interface Stat {

}

interface PokemonData {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: Sprites;
  weight: number;
  height: number;
  moves: { move: { name: string } }[];
  types: { type: { name: string } }[];
  stats: Stat[];
  species: {
    url: string;
  };
}

function getTypeColor(type: string): string {
  switch (type) {
    case "normal":
      return "gray";
    case "fire":
      return "orangered";
    case "water":
      return "dodgerblue";
    case "electric":
      return "gold";
    case "grass":
      return "green";
    case "ice":
      return "aqua";
    case "fighting":
      return "sienna";
    case "poison":
      return "purple";
    case "ground":
      return "sandybrown";
    case "flying":
      return "lightskyblue";
    case "psychic":
      return "hotpink";
    case "bug":
      return "#044220e6";
    case "rock":
      return "brown";
    case "ghost":
      return "rebeccapurple";
    case "dragon":
      return "darkblue";
    case "dark":
      return "darkgray";
    case "steel":
      return "darkslategray";
    case "fairy":
      return "lightpink";
    default:
      return "gray";
  }
}

// export default function Pokemon() {
//   const [showShiny, setShowShiny] = useState(false);
//   const router = useRouter();
//   const { id } = router.query;
//   const [pokemon, setPokemon] = useState(null);
//   const [evolutionChain, setEvolutionChain] = useState([]);
//   const dispatch = useDispatch();
//   const [isAddingToTeam, setIsAddingToTeam] = useState(false);

//   const handleAddToTeam = () => {
//     setIsAddingToTeam(true); // Display the GIF

//     setTimeout(() => {
//       dispatch(
//         addToTeam({
//           id: pokemon.id,
//           name: pokemon.name,
//           imageUrl: showShiny
//             ? pokemon.sprites.front_shiny
//             : pokemon.sprites.front_default,
//           stats: pokemon.stats,
//         })
//       );
//       router.push("/team"); // Navigate to the team page
//     }, 2600); // Delay for 3 seconds before navigating
//   };

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       try {
//         const response = await axios.get(`${baseURL}${id}`);
//         setPokemon(response.data);
//         fetchEvolutionChain(response.data);
//       } catch (error) {
//         console.error("Error fetching Pokemon:", error);
//       }
//     };

//     if (id) {
//       fetchPokemon();
//     }
//   }, [id]);

//   const fetchEvolutionChain = async (pokemonData) => {
//     try {
//       const speciesUrl = pokemonData.species.url;
//       const speciesResponse = await axios.get(speciesUrl);
//       const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
//       const evolutionChainResponse = await axios.get(evolutionChainUrl);
//       const chain = evolutionChainResponse.data.chain;
//       setEvolutionChain(parseEvolutionChain(chain));
//     } catch (error) {
//       console.error("Error fetching Evolution Chain:", error);
//     }
//   };

//   const parseEvolutionChain = (chain) => {
//     const evolutionChain = [];
//     let current = chain;

//     while (current) {
//       const species = current.species.name;
//       const evolvesTo = current.evolves_to;

//       const pokemon = {
//         name: species,
//         imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(
//           current.species.url
//         )}.png`,
//       };

//       evolutionChain.push(pokemon);

//       if (evolvesTo.length > 0) {
//         current = evolvesTo[0];
//       } else {
//         current = null;
//       }
//     }

//     return evolutionChain;
//   };

//   const getIdFromUrl = (url) => {
//     const parts = url.split("/");
//     return parts[parts.length - 2];
//   };

//   if (!pokemon) {
//     return <Box>Loading...</Box>;
//   }

  return (
    <Box>
      <Head>
        <title>Pokemons Detail</title>
        <meta name="description" content="Pokemon search app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <h1
          style={{
            textTransform: "capitalize",
            marginTop: "-1rem",
          }}
        >
          {pokemon.name}
        </h1>
        <Grid container spacing={0}>
          <Grid item style={{ marginLeft: "5rem" }}>
            <Box>
              <img
                src={
                  showShiny
                    ? pokemon.sprites.other["official-artwork"].front_shiny // Show shiny artwork
                    : pokemon.sprites.other["official-artwork"].front_default // Show default artwork
                }
                alt={pokemon.name}
                width={400}
                height={400}
              />
              Shiny :
              <Switch
                checked={showShiny}
                onChange={() => setShowShiny(!showShiny)}
                color="primary"
              />
            </Box>
            <StatBar />
          </Grid>
          <Grid item style={{ marginLeft: "2rem" }}>
            <Box
              sx={{
                padding: "1px 8px",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <h2>Abilities:</h2>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.slot}>- {ability.ability.name}</li>
                ))}
              </ul>
              <h2>Weight: </h2>
              <ul>
                <li> {pokemon.weight} Kg.</li>
              </ul>
              <h2>Height: </h2>
              <ul>
                <li> {pokemon.height} m.</li>
              </ul>
            </Box>

            <h2>Moves:</h2>
            <Box
              sx={{
                maxHeight: "300px",
                overflowY: "scroll",
                backgrColor: "black",
                marginLeft: "1rem",
              }}
            >
              <ul>
                {pokemon.moves.map((move) => (
                  <li key={move.move.name}>- {move.move.name}</li>
                ))}
              </ul>
            </Box>
          </Grid>
          <Grid>
            <Box>
              <h2
                style={{
                  textTransform: "capitalize",
                  marginTop: "1.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                {" "}
                Types:{" "}
              </h2>
              <ul>
                {pokemon.types.map((type) => (
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: getTypeColor(type.type.name),
                      color: "white",
                      padding: "1px 8px",
                      borderRadius: "10px",
                      marginRight: "-0.5rem",
                      fontSize: "25px",
                      textAlign: "center",
                      width: "100px",
                      marginLeft: "1rem",
                    }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </ul>
            </Box>
            <Grid>
              <Box>
                <h2
                  style={{
                    textTransform: "capitalize",
                    marginTop: "2.2rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  {" "}
                  Evolution Chain:{" "}
                </h2>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                maxWidth="lg"
                sx={{
                  backgroundColor: "gery",
                  margin: "0 auto",
                  marginTop: "1rem",
                  padding: "1rem",
                }}
              >
                {evolutionChain.map((pokemon, index) => (
                  <React.Fragment key={pokemon.name}>
                    <Box
                      style={{
                        textAlign: "center",
                        marginRight: "1rem",
                        fontSize: "13px",
                      }}
                    >
                      <img
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        width={80}
                        height={80}
                      />
                      <p style={{ textTransform: "capitalize" }}>
                        {pokemon.name}
                      </p>
                    </Box>
                    {index < evolutionChain.length - 1 && (
                      <svg
                        height="20"
                        width="20"
                        style={{ marginRight: "0.5rem" }}
                      >
                        <line
                          x1="0"
                          y1="10"
                          x2="20"
                          y2="10"
                          style={{
                            stroke: "black",
                            strokeWidth: 2,
                          }}
                        />
                        <polygon
                          points="20,10 15,5 15,15"
                          style={{
                            fill: "black",
                          }}
                        />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </Box>

              <motion.button
                variant="contained"
                color="primary"
                className="mb-4"
                sx={{ width: "10%", height: "10%" }}
                type="submit"
                onClick={handleAddToTeam}
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 360, transition: { duration: 1 } }}
                style={{
                  borderRadius: "50%",
                  outline: "none",
                  border: "none",
                }}
              >
                <img
                  src="/images/Pokeball-PNG-Pic-Background.png"
                  alt="Pokemon Card Deck"
                  className="mb-4"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                />
              </motion.button>
            </Grid>
            {isAddingToTeam && (
              <Box sx={{ marginLeft: "9rem" }}>
                <img
                  src="/images/ayi0xce9yb7a1.gif"
                  alt="Adding to Team"
                  style={{ width: "200px", height: "auto" }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
