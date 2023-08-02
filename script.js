// -------------------------------------------------------------------------------- //
// ---------------------------     Variables    ----------------------------------- //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
let myLibrary = [];

const howlCastle = new Book("Howl's Moving Castle", "Diana Wynne Jones", 429, true);
const hobbit = new Book("The Hobbit","J. R. R. Tolkien", 295, true);
const colorOfMagic = new Book("The Color of Magic", "Terry Pratchett", 288, true);
const hogfather = new Book("Hogfather", "Terry Pratchett", 384, false);
const ctYank = new Book("A Connecticut Yankee in King Arthur's Court", "Mark Twain", 469, true);


// -- On-Screen Stuff -- //
const cards = document.querySelectorAll(".card");
const libraryContainer = document.querySelector(".library-container");
const gridContainer = document.querySelector(".grid-container");

const form = document.querySelector("form")
const coverAll = document.querySelector(".cover-all");
const addBookBtn = document.querySelector("button.add-book");
const closeFormBtn = document.querySelector("button.close-form");
const submitBookBtn = document.querySelector("button.submit-book");


// -------------------------------------------------------------------------------- //
// ----------------------     Functions & Methods    ------------------------------ //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
}

function addBookToLibrary(...books) {
	myLibrary.push(...books);
}


// -- On-Screen Stuff -- //
function createCard(book) {
	const newCard = document.createElement("div");
	const newText = document.createElement("div");
	const newTitle = document.createElement("div");
	const newAuthor = document.createElement("div");
	const newPageCount = document.createElement("div");
	const newHaveRead = document.createElement("div");

	newCard.classList += "card";
	newText.classList += "text";
	newTitle.classList += "title";
	newAuthor.classList += "author";
	newPageCount.classList += "page-count";
	newHaveRead.classList += "have-read";

	newTitle.textContent = book.title;
	newAuthor.textContent = book.author;
	newPageCount.textContent = `${book.pageCount} pages`;
	newHaveRead.textContent = book.haveRead ? "Read" : "Not Read"

	if (book.haveRead) {
		newCard.classList += " read-true";
	} else {
		newCard.classList += " read-false";
	}

	newCard.appendChild(newText);
	newText.appendChild(newTitle);
	newText.appendChild(newAuthor);
	newText.appendChild(newPageCount);
	newCard.appendChild(newHaveRead);

	gridContainer.appendChild(newCard);
}

function updateLibraryDisplay() {
	for (const book of myLibrary) {
		createCard(book)
	}
}

function displayForm() {
	form.style.display = "flex";
	libraryContainer.style.display = "none";
	coverAll.style.display = "initial";
}

function hideForm() {
	form.style.display = "none";
	libraryContainer.style.display = "flex";
	coverAll.style.display = "none";
}

function submitNewBook(event) {
	const submitTitle = event.target.form[1].value;
	const submitAuthor = event.target.form[2].value;
	const submitPageCount = event.target.form[3].value;
	const submitHaveRead = event.target.form[4].checked;

	event.preventDefault();

	const submitBook = new Book(submitTitle, submitAuthor, submitPageCount, submitHaveRead);
	addBookToLibrary(submitBook);
	hideForm();
	updateLibraryDisplay();
}

// -------------------------------------------------------------------------------- //
// --------------------     Calls & Event Listeners    ---------------------------- //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
addBookToLibrary(howlCastle, hobbit, colorOfMagic, hogfather, ctYank);


// -- On-Screen Stuff -- //
addBookBtn.addEventListener("click", displayForm);
closeFormBtn.addEventListener("click", hideForm);
submitBookBtn.addEventListener("click", submitNewBook);

updateLibraryDisplay();


/*

Create an array of book objects.
Create a card to display book info.
Display a grid of cards with book info.
Take input from a form, create a new book from those inputs, and refresh the grid with the new book.
Remove a book from the library, refresh the grid without the deleted book.
Toggle the read status of any given book.

myLibrary = []

FUNCTION define Book() prototype
	title
	author
	pageCount
	haveRead
END FUNCTION

Create a few new Book()'s

FUNCTION addBookToLibrary(...books)

FUNCTION updateGrid()
	SELECT currentGrid from DOM (every time to make sure it's the right one)
	const newGrid = createNewGrid()
	currentGrid.replaceChild(...newGrid)
END FUNCTION

FUNCTION createNewGrid()
	newGrid = []
	FOR EACH book IN myLibrary
		const newCard = createCard(book)
		PUSH newCard to newGrid
	END FOR
	RETURN newGrid
END FUNCTION

FUNCTION createCard(book)
	CREATE <div.card>
	FOR EACH property IN book		
		CREATE  <p.property>
		APPEND <p.property> to <div.card>
	END FOR
	CREATE removeBtn
	APPEND removeBtn to <div.card>
END FUNCTION

EVENT LISTENER addBookBtn ON CLICK:
	DISPLAY modal (with form in middle)
END EVENT LISTENER

EVENT LISTENER closeFormBtn OR window (outside form) ON CLICK:
	HIDE modal
END EVENT LISTENER

EVENT LISTENER submitBtn ON CLICK:
	submitNewBook(event)
END EVENT LISTENER

FUNCTION submitNewBook(event)
	event.preventDefault()

	const title = event.target.form[1].value;
	const author = event.target.form[2].value;
	const pageCount = event.target.form[3].value;
	const haveRead= event.target.form[4].checked;

	const newBook = new Book(title, author, pageCount, haveRead)

	IF isInLibrary(newBook)
		DISPLAY error on form above inputs
	ELSE 
		addBookToLibrary(newBook)
		HIDE modal
		updateGrid()
	END IF/ELSE
END FUNCTION

EVENT LISTENER removeBtn ON CLICK:
	removeBook()
END EVENT LISTENER

FUNCTION removeBook()			//////
	REMOVE book from myLibrary <----- 
	updateGrid()				\\\\\\
END FUNCTION

EVENT LISTENER haveReadBtn ON CLICK:
	toggleReadStatus()
END EVENT LISTENER

FUNCTION toggleReadStatus()

*/
