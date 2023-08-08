// -------------------------------------------------------------------------------- //
// ---------------------------     Variables    ----------------------------------- //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
let myLibrary = [];

const howlCastle = new Book("Howl's Moving Castle", "Diana Wynne Jones", 429, true);
const hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, true);
const colorOfMagic = new Book("The Color of Magic", "Terry Pratchett", 288, true);
const hogfather = new Book("Hogfather", "Terry Pratchett", 384, false);
const ctYank = new Book("A Connecticut Yankee in King Arthur's Court", "Mark Twain", 469, true);


// -- On-Screen Stuff -- //
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pageCountInput = document.getElementById("page-count");
const readStatusInput = document.getElementById("read-status");
const modal = document.querySelector("#modal");
const form = document.querySelector("form");
const duplicateError = document.querySelector(".duplicate-error");


// -------------------------------------------------------------------------------- //
// ----------------------     Functions & Methods    ------------------------------ //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
function Book(title, author, pageCount, readStatus) {
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
	this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function () {
	this.readStatus = !this.readStatus
};

function addBookToLibrary(...books) {
	myLibrary.push(...books);
}


// -- On-Screen Stuff -- //
function updateGrid() {
	const currentGrid = document.querySelector(".grid-container");
	const newGrid = createNewGrid();
	currentGrid.replaceChildren(...newGrid);
}

function createNewGrid() {
	newGrid = []
	for (const book of myLibrary) {
		const newCard = createCard(book);
		newGrid.push(newCard);
	}
	return newGrid
}

function createCard(book) {
	const card = document.createElement("div");
	card.classList = `card read-${book.readStatus}`;
	card.innerHTML = `
	<div class="card-top">
		<div class="highlights">
			<div class="author">${book.author}</div>
			<div class="title">${book.title}</div>
		</div>
		<button type="button"
				class="remove-btn">×
		</button>
	</div>
	<div class="card-bottom">
		<div class="page-count">${book.pageCount} Pages</div>
		<div class="read-status-text">Read?</div>
		<button class="read-status-btn">${book.readStatus ? "Yes" : "No"}</button>
	</div>
	` // End innerHTML
	return card
}

function submitNewBook(e) {
	e.preventDefault();

	const newBook = new Book(titleInput.value, authorInput.value, pageCountInput.value, readStatusInput.checked);

	if (checkDuplicate(newBook)) {
		duplicateError.classList = "duplicate-error";
		titleInput.addEventListener("keydown", removeDuplicateError);
		authorInput.addEventListener("keydown", removeDuplicateError);
	} else {
		addBookToLibrary(newBook);
		modal.classList.toggle("hidden");
		updateGrid();
	}
}

function checkDuplicate(newBook) {
	return myLibrary.find(book => {
		let details = [book.title, newBook.title, book.author, newBook.author].map(detail => detail.toLowerCase().replace(/[^\w\d]/gi, ""));
		return new Set(details).size < 3;
	});
}

function removeDuplicateError(e) {
	if (e.key.length < 2 || e.key === "Backspace") {
		duplicateError.classList = "duplicate-error hidden";
		titleInput.removeEventListener("keydown", removeDuplicateError);
		authorInput.removeEventListener("keydown", removeDuplicateError);
	}
}

function removeBook(e) {
	const targetBookIndex = getBookIndex(e);
	myLibrary.splice(targetBookIndex, 1);
	updateGrid();
}

function getBookIndex(target) {
	const targetAuthor = target.parentElement.parentElement.firstElementChild.firstElementChild.children[0].textContent;
	const targetTitle = target.parentElement.parentElement.firstElementChild.firstElementChild.children[1].textContent;
	const targetBook = myLibrary.find(book => book.title === targetTitle && book.author === targetAuthor);
	return myLibrary.indexOf(targetBook);
}

function triggerToggleReadStatus(target) {
	const targetBookIndex = getBookIndex(target);
	myLibrary[targetBookIndex].toggleReadStatus();
	updateGrid();
}

function checkModalTrigger(target) {
	return (target === modal) ||
		(target.classList.contains("add-book-btn")) ||
		(target.classList.contains("close-form-btn"));
}

function handleClick(e) {
	const target = e.target;
	if (checkModalTrigger(target)) {
		modal.classList.toggle("hidden");
	} else if (target.classList.contains("remove-btn")) {
		removeBook(target);
	} else if (target.classList.contains("read-status-btn")) {
		triggerToggleReadStatus(target);
	}
}


// -------------------------------------------------------------------------------- //
// --------------------     Calls & Event Listeners    ---------------------------- //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
addBookToLibrary(howlCastle, hobbit, colorOfMagic, hogfather, ctYank);


// -- On-Screen Stuff -- //
updateGrid();

form.addEventListener("submit", submitNewBook)
document.addEventListener("click", handleClick)