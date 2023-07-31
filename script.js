let myLibrary = [];

function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.haveRead ? "already" : "not yet"} read`
    }
}

function addBookToLibrary(...books) {
	myLibrary.push(...books);
}

const hobbit = new Book("The Hobbit","J. R. R. Tolkien", 295, true);
const colorOfMagic = new Book("The Color of Magic", "Terry Pratchett", 288, true);
const hogfather = new Book("Hogfather", "Terry Pratchett", 384, false);
const ctYank = new Book("A Connecticut Yankee in King Arthur's Court", "Mark Twain", 469, true);

addBookToLibrary(hobbit, colorOfMagic, hogfather, ctYank);

console.table(myLibrary);

//// Create table on page ////
const container = document.querySelector(".table-container");
const table = document.createElement("TABLE");
table.setAttribute("id", "myTable");
let numCols = addFirstRow(table);

createTableHead(table, numCols);
container.appendChild(table);

function createTableHead(table, numRows) {
	const tHeader = table.createTHead();
	const tHeaderRow = tHeader.insertRow(0);
	const tHeaderCell = tHeaderRow.insertCell(0);
	tHeaderCell.textContent = "My Library";
	tHeaderCell.setAttribute("colspan", numRows)
}

function addFirstRow(table) {
	const row = table.insertRow(0);
	row.classList.add("col-headers");

	const title = row.insertCell(0);
	title.textContent = "Title"

	const author = row.insertCell(1);
	author.textContent = "Author"

	const pageCount = row.insertCell(2);
	pageCount.textContent = "Pages"

	const haveRead = row.insertCell(3);
	haveRead.textContent = "Read?"

	return row.children.length // allows tHeader to be full width
}

function displayBook(book) {
	const row = table.insertRow(-1);
	const bookIndex = document.querySelector("tbody").children.length - 2;
	row.classList.add("book", `book-${bookIndex}`);

	const title = row.insertCell(0);
	title.textContent = book.title;

	const author = row.insertCell(1);
	author.textContent = book.author;

	const pageCount = row.insertCell(2);
	pageCount.textContent = book.pageCount;

	const haveRead = row.insertCell(3);
	haveRead.textContent = book.haveRead ? "Yes" : "No"
}

myLibrary.forEach(displayBook);
