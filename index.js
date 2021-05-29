const express = require("express");
const baseUrl = "http://localhost:3001/api/persons";
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Spongebob Squarepants",
    number: "13213232132132132",
  },
  {
    id: 2,
    name: "Patrick Star",
    number: "5645641654156156",
  },
  {
    id: 3,
    name: "Squidward",
    number: "51156165156316",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "7/9898566546546654",
  },
];

let info = [
  {
    personsLength: persons.length,
    requestTime: new Date().toString(),
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${info[0].personsLength} people</p>
    <p>${info[0].requestTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 2000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const repeat = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name/number is missing",
    });
  } else if (repeat) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

morgan.token("ob", function (req, res) {
  console.log("ob", req.body);
  return `${JSON.stringify(req.body)}`;
});

app.use(morgan(":method :url :status :response-time :req[header] :ob"));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
