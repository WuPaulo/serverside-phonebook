const express = require("express");
const app = express();

app.use(express.json());

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
  response.send("<h1>Nyeah eh</h1>");
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
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const person = {
    name: body.name,
    number: new number(),
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
