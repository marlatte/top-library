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
	addBookBtn.style.display = "none";
	coverAll.style.display = "initial";
}

function hideForm() {
	form.style.display = "none";
	addBookBtn.style.display = "inline-block";
	coverAll.style.display = "none";
}

// -------------------------------------------------------------------------------- //
// --------------------     Calls & Event Listeners    ---------------------------- //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
addBookToLibrary(howlCastle, hobbit, colorOfMagic, hogfather, ctYank);


// -- On-Screen Stuff -- //
addBookBtn.addEventListener("click", displayForm);
closeFormBtn.addEventListener("click", hideForm);

updateLibraryDisplay();