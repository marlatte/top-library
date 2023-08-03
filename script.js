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

Book.prototype.toggleReadStatus = function() {
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
	card.classList += "card";
	card.innerHTML = `
	<div class="title">${book.title}</div>
	<div class="author">${book.author}</div>
	<div class="page-count">${book.pageCount}</div>
	<div class="read-status">${book.readStatus ? "Read" : "Not Read"}</div>
	<button type="button" class="remove-btn">X</button>
	` // End innerHTML
	return card
}

function submitNewBook(e) {
	e.preventDefault();

	const title = e.target.form[1].value;
	const author = e.target.form[2].value;
	const pageCount = e.target.form[3].value;
	const readStatus= e.target.form[4].checked;

	const newBook = new Book(title, author, pageCount, readStatus);

	if (checkInLibrary(newBook)) {
		throw new Error("You already have that book!");
	} else {
		addBookToLibrary(newBook);			//		//////////////////////////	
		modal.classlist.toggle("hidden"); // <----- Not recognizing modal here
		updateGrid();					//			\\\\\\\\\\\\\\\\\\\\\\\\\\
	}
}

function checkInLibrary(newBook) {
	return myLibrary.find(book => book.title.toLowerCase() === newBook.title.toLowerCase() && book.author.toLowerCase() === newBook.author.toLowerCase());
}

function removeBook(e) {
	const targetBookIndex = getBookIndex(e);
	myLibrary.splice(myLibrary[targetBookIndex], 1);
	updateGrid();
}

function getBookIndex(e) {
	const targetTitle = e.target.parentElement.children[0].textContent;
	const targetAuthor = e.target.parentElement.children[1].textContent;
	const targetBook = myLibrary.find(book => book.title === targetTitle && book.author === targetAuthor);
	return myLibrary.indexOf(targetBook);
}

function triggerToggleReadStatus(e) {
	const targetBookIndex = getBookIndex(e);
	myLibrary[targetBookIndex].toggleReadStatus();
	updateGrid();
}

function checkModalTrigger(target) {
	return 	(target === modal) || 
	(target.classList.contains("add-book-btn")) || 
	(target.classList.contains("close-form-btn"));
}

function handleClick(e) {
	const modal = document.querySelector("#modal");
	const target = e.target;
	if (checkModalTrigger(target)) {
		modal.classList.toggle("hidden");
	} else if (target.classList.contains("submit-btn")) {
		submitNewBook(e);
	} else if (target.classList.contains("remove-btn")) {
		removeBook(e);
	} else if (target.classList.contains("read-status-btn")) {
		triggerToggleReadStatus(e);
	}
}


// -------------------------------------------------------------------------------- //
// --------------------     Calls & Event Listeners    ---------------------------- //
// -------------------------------------------------------------------------------- //


// -- Behind the Scenes -- //
addBookToLibrary(howlCastle, hobbit, colorOfMagic, hogfather, ctYank);


// -- On-Screen Stuff -- //
updateGrid();

document.addEventListener("click", handleClick)



// -------------------------------------------------------------------------------- //
// ----------------------------     Pseudo     ------------------------------------ //
// -------------------------------------------------------------------------------- //

/*

Create an array of book objects.
Create a card to display book info.
Display a grid of cards with book info.
Take input from a form, create a new book from those inputs, and refresh the grid with the new book.
Remove a book from the library, refresh the grid without the deleted book.
Toggle the read status of any given book.

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
	card = CREATE <div.card>
	card.innerHTML = template string with card contents

	Or:
	FOR EACH key IN book		
		IF key === readStatus
			CREATE readStatusBtn with text "Read" or "Not Read"
			APPEND readStatusBtn to <div.card> 
		ELSE
			CREATE <p.key>
			APPEND <p.key> to <div.card>
		END IF/ELSE
	END FOR
	CREATE removeBtn
	APPEND removeBtn to <div.card>
END FUNCTION

FUNCTION submitNewBook(e)
	e.preventDefault()

	const title = e.target.form[1].value;
	const author = e.target.form[2].value;
	const pageCount = e.target.form[3].value;
	const readStatus= e.target.form[4].checked;

	const newBook = new Book(title, author, pageCount, readStatus)

	IF checkInLibrary(newBook)
		DISPLAY error on form above inputs
	ELSE 
		addBookToLibrary(newBook)
		HIDE modal
		updateGrid()
	END IF/ELSE
END FUNCTION

FUNCTION checkInLibrary(newBook)
	return myLibrary.find(book => book.title === newBook.title && book.author === newBook.author);
END FUNCTION

FUNCTION removeBook(e)
	targetBookIndex = getBookIndex(e)
	myLibrary.splice(myLibrary[targetBookIndex], 1)
	updateGrid()
END FUNCTION

FUNCTION getBookIndex(e)
	const targetTitle = e.target.parentElement.children[0].textContent;
	const targetAuthor = e.target.parentElement.children[1].textContent;
	const targetBook = myLibrary.find(book => book.title === targetTitle && book.author === targetAuthor);
	return myLibrary.indexOf(targetBook)
END FUNCTION

FUNCTION triggerToggleReadStatus(e)
	targetBookIndex = getBookIndex(e);
	myLibrary[targetBookIndex].toggleReadStatus();
	updateGrid();
END FUNCTION

FUNCTION handleClick(e)
	const target = e.target;
	IF checkModalTrigger(target)
		modal.classlist.toggle("hidden")
	ELSE IF target.classList.contains("submit-btn")
		submitNewBook(e)
	ELSE IF target.classList.contains("remove-btn")
		removeBook(e)
	ELSE IF target.classList.contains("read-status-btn")
		toggleReadStatus(e)
	END IF/ELSE
END FUNCTION

FUNCTION checkModalTrigger(target)
	const modal = document.querySelector("#modal")
	RETURN (target === modal) || (target.classList.contains("add-book-btn")) || (target.classList.contains("close-form-btn")) 
END FUNCTION

EVENT LISTENER document ON CLICK:
	handleClick(e)
END EVENT LISTENER

*/
