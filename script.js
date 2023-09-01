// -------------------------------------------------------------------------------- //
// ----------------------------     Library Module     ---------------------------- //
// -------------------------------------------------------------------------------- //

function Library() {
	let _myBooks = [];
	const getBooks = () => _myBooks;

	class Book {
		constructor(title, author, pageCount, readStatus) {
			this.title = title;
			this.author = author;
			this.pageCount = pageCount;
			this.readStatus = readStatus;
		}

		toggleReadStatus() {
			this.readStatus = !this.readStatus
		}
	}


	function addBookToLibrary(cleanDetails) {
		const newBook = new Book(cleanDetails[0], cleanDetails[1], cleanDetails[2], cleanDetails[3]);
		_myBooks.push(newBook);
	}

	function removeBook(targetBookIndex) {
		_myBooks.splice(targetBookIndex, 1);

	}

	function toggleReadStatus(index) {
		_myBooks[index].toggleReadStatus();
	}

	function checkDuplicate(newTitle, newAuthor) {
		return _myBooks.find(book => {
			let details = [book.title, newTitle, book.author, newAuthor].map(detail => detail.toLowerCase().replace(/[^\w\d]/gi, ""));
			return new Set(details).size < 3;
		});
	}

	function getBookIndex(target) {
		const targetAuthor = target.parentElement.parentElement.firstElementChild.firstElementChild.children[0].textContent;
		const targetTitle = target.parentElement.parentElement.firstElementChild.firstElementChild.children[1].textContent;
		const targetBook = _myBooks.find(book => book.title === targetTitle && book.author === targetAuthor);
		return _myBooks.indexOf(targetBook);
	}

	const startingBooks = [
		["Howl's Moving Castle", "Diana Wynne Jones", 429, true],
		["The Hobbit", "J. R. R. Tolkien", 295, true],
		["The Color of Magic", "Terry Pratchett", 288, true],
		["Hogfather", "Terry Pratchett", 384, false],
		["A Connecticut Yankee in King Arthur's Court", "Mark Twain", 469, true]
	];

	startingBooks.forEach(book => addBookToLibrary(book));

	return { getBooks, getBookIndex, checkDuplicate, addBookToLibrary, removeBook, toggleReadStatus }
}

const ScreenController = (() => {
	const modal = document.querySelector("#modal");
	const form = document.querySelector("form");
	const duplicateError = document.querySelector(".duplicate-error");

	const titleInput = document.getElementById("title");
	const authorInput = document.getElementById("author");
	const pageCountInput = document.getElementById("page-count");
	const readStatusInput = document.getElementById("read-status");

	const library = Library();

	function updateGrid() {
		const currentGrid = document.querySelector(".grid-container");
		const newGrid = []
		for (const book of library.getBooks()) {
			const newCard = (book) => {
				const card = document.createElement("div");
				card.classList = `card read-${book.readStatus}`;
				card.innerHTML = `
				<div class="card-top">
					<div class="highlights">
						<div class="author">${book.author}</div>
						<div class="title">${book.title}</div>
					</div>
					<button type="button"
							class="remove-btn book-changer">×
					</button>
				</div>
				<div class="card-bottom">
					<div class="page-count">${book.pageCount} Pages</div>
					<div class="read-status-text">Read?</div>
					<button type="button" 
							class="read-status-btn book-changer">${book.readStatus ? "Yes" : "No"}</button>
				</div>
				` // End innerHTML
				return card
			}
			newGrid.push(newCard(book));
		}
		currentGrid.replaceChildren(...newGrid);
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
			(target.classList.contains("open-modal-btn")) ||
			(target.classList.contains("close-modal-btn"));
	}

	function handleClick(e) {
		const target = e.target;
		if (checkModalTrigger(target)) {
			modal.classList.toggle("hidden");
			setTimeout(() => {
				titleInput.focus();
			}, 900);
		} else if (target.classList.contains("book-changer")) {
				const targetBookIndex = library.getBookIndex(target);
				target.classList.contains("remove-btn") ? library.removeBook(targetBookIndex) : library.toggleReadStatus(targetBookIndex);
				updateGrid();
		}
	}

	// Init
	updateGrid();
	form.addEventListener("submit", handleFormSubmit)
	document.addEventListener("click", handleClick)
})();