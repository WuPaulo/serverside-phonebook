const express = require("express");
const baseUrl = "/api/persons";
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

// backend mongodb code"
const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://325208627:${password}@cluster0.j8rnq.mongodb.net/Person-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  content: String,
  name: String,
  number: String,
  date: Date,
  important: Boolean,
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

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
  response.send("<h1>Phonebooks</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
