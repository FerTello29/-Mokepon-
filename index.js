const express = require('express');
const app = express();
const jugadores = [];
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Clase Jugador
class Jugador {
  constructor(id) {
    this.id = id;
    this.mokepon = null;
  }

  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }
}

// Clase Mokepon
class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

// Endpoint para unirse al juego
app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(jugador);  // Devuelve el objeto jugador completo
});

// Endpoint para asignar un mokepon a un jugador
app.post("/mokepon/:jugadorid", (req, res) => {
  const jugadorId = req.params.jugadorid || "";
  const nombre = req.body.mokepon || "";

  const jugadorIndex = jugadores.findIndex((jugador) => jugador.id === jugadorId);

  if (jugadorIndex >= 0) {
    const mokepon = new Mokepon(nombre);
    jugadores[jugadorIndex].asignarMokepon(mokepon);
    
    // Responder con el jugador actualizado para que el frontend pueda usarlo
    return res.json(jugadores[jugadorIndex]);
  } 

  res.status(404).json({ error: "Jugador no encontrado" });
});

// Iniciar el servidor
app.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
