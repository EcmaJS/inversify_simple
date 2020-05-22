// import { injectable, inject, container } from "inversify";
const { injectable, inject, Container } = require("inversify");
require("reflect-metadata");

@injectable()
class PrintService {
  // ...
  print(arg) {
    console.log(arg)
  }
}

@injectable()
class Summary {
  // ...
}

@injectable()
class Author {
  // ...
}

@injectable()
class Book {

  @inject("PrintService") _printService;

  constructor(
    @inject("Author") author,
    @inject("Summary") summary,
    
  ) {
    this._author = author;
    this._summary = summary;
  }

  print() {
    this._printService.print(this);
  }

}

let container = new Container();
container.bind("PrintService").to(PrintService);
container.bind("Author").to(Author);
container.bind("Summary").to(Summary);
container.bind("Book").to(Book);

// Book instance is created by InversifyJS
let book = container.get("Book");
book.print();


