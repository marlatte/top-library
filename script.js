// -------------------------------------------------------------------------------- //
// ----------------------------     Library Module     ---------------------------- //
// -------------------------------------------------------------------------------- //

function Library() {
	let myBooks = [];
	const getBooks = () => myBooks;
	
	class Book {
		constructor(title, author, pageCount, readStatus) {
			this.title = title;
			this.author = author;
			this.pageCount = pageCount;
			this.readStatus = readStatus;
		}

		toggleReadStatus() {
			this.readStatus = !this.readStatus
		};
	}


	function addBookToLibrary(cleanDetails) {
		const newBook = new Book(cleanDetails[0], cleanDetails[1], cleanDetails[2], cleanDetails[3]);
		myBooks.push(newBook);
	}

	function checkDuplicate(newTitle, newAuthor) {
		return myBooks.find(book => {
			let details = [book.title, newTitle, book.author, newAuthor].map(detail => detail.toLowerCase().replace(/[^\w\d]/gi, ""));
			return new Set(details).size < 3;
		});
	}

	function getBookIndex(target) {
		const targetAuthor = target.parentElement.parentElement.firstElementChild.firstElementChild.children[0].textContent;
		const targetTitle = target.parentElement.parentElement.firstElementChild.firstElementChild.children[1].textContent;
		const targetBook = myBooks.find(book => book.title === targetTitle && book.author === targetAuthor);
		return myBooks.indexOf(targetBook);
	}

	const startingBooks = [
		["Howl's Moving Castle", "Diana Wynne Jones", 429, true],
		["The Hobbit", "J. R. R. Tolkien", 295, true],
		["The Color of Magic", "Terry Pratchett", 288, true],
		["Hogfather", "Terry Pratchett", 384, false],
		["A Connecticut Yankee in King Arthur's Court", "Mark Twain", 469, true]
	];

	startingBooks.forEach(book => addBookToLibrary(book));

	return { getBooks, getBookIndex, checkDuplicate, addBookToLibrary }
}

const screenController = (() => {
	const modal = document.querySelector("#modal");
	const form = document.querySelector("form");
	const duplicateError = document.querySelector(".duplicate-error");

	const titleInput = document.getElementById("title");
	const authorInput = document.getElementById("author");
	const pageCountInput = document.getElementById("page-count");
	const readStatusInput = document.getElementById("read-status");

	const library = Library();
	const myBooks = library.getBooks();

	function updateGrid() {
		const currentGrid = document.querySelector(".grid-container");
		const newGrid = createNewGrid();
		currentGrid.replaceChildren(...newGrid);
	}

	function createNewGrid() {
		newGrid = []
		for (const book of myBooks) {
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

	function handleFormSubmit(e) {
		e.preventDefault();

		const cleanDetails = [titleInput.value, authorInput.value].map(input => input.replace(/[;:<>{}[\]\\\/]/g, ""));
		cleanDetails.push(pageCountInput.value, readStatusInput.checked);

		if (Library().checkDuplicate(cleanDetails[0], cleanDetails[1])) {
			duplicateError.classList = "duplicate-error";
			titleInput.addEventListener("keydown", hideDuplicateError);
			authorInput.addEventListener("keydown", hideDuplicateError);
		} else {
			library.addBookToLibrary(cleanDetails);
			modal.classList.toggle("hidden");
			form.reset();
			updateGrid();
		}
	}

	function hideDuplicateError(e) {
		if (e.key.length < 2 || e.key === "Backspace") {
			duplicateError.classList = "duplicate-error hidden";
			titleInput.removeEventListener("keydown", hideDuplicateError);
			authorInput.removeEventListener("keydown", hideDuplicateError);
		}
	}

	function checkModalTrigger(target) {
		return (target === modal) ||
			(target.classList.contains("add-book-btn")) ||
			(target.classList.contains("close-form-btn"));
	}

	function removeBook(target) {
		const targetBookIndex = Library().getBookIndex(target);
		myBooks.splice(targetBookIndex, 1);
		updateGrid();
	}

	function handleClick(e) {
		const target = e.target;
		const targetBookIndex = getBookIndex(target);
		if (checkModalTrigger(target)) {
			modal.classList.toggle("hidden");
		} else if (target.classList.contains("remove-btn")) {
			removeBook(target);
		} else if (target.classList.contains("read-status-btn")) {
			myBooks[targetBookIndex].toggleReadStatus();
			updateGrid();
		}
	}

	updateGrid();

	form.addEventListener("submit", handleFormSubmit)
	document.addEventListener("click", handleClick)

})();