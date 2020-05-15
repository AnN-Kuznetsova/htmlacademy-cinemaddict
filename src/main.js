import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films-model.js";
import {generateFilms} from "./mock/film";


const FILM_COUNT = 12;

const films = generateFilms(FILM_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);


const pageController = new PageController(filmsModel);
pageController.render();
