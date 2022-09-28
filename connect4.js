"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = makeEmptyBoard(); // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 *    returns a matrix
 */

/** When called, makeBoard returns a matrix (WIDTH * HEIGHT) of 0's */
// for each cell, 0 means empty (no piece),
//  1 means red/Player1 and 2 means blue/Player2
function makeEmptyBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let emptyBoard = [];
  for (let i = 0; i < HEIGHT; i++) {
    emptyBoard.push(makeEmptyRow());
  }
  return emptyBoard;
}

/**returns a single-depth array that is a row */
function makeEmptyRow() {
  let emptyRow = [];
  for (let i = 0; i < WIDTH; i++) {
    emptyRow.push(0);
  }
  return emptyRow;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // add top row to our htmlBoard element
  htmlBoard.append(createColumnTops());

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = HEIGHT - 1; y >= 0; y--) {
    htmlBoard.append(createHtmlRow(y));
  }
}

/** creates multiple 'td' equivalent to global constant WIDTH
 * Expected Input: number (row, col)
 * Expected Output: none
 */
function createHtmlCell(y, x) {
  const tableCell = document.createElement("td");
  tableCell.setAttribute("id", `id${y}-${x}`);
  return tableCell;
}

/** create multiple 'tr' equivalent to global constant Height
 * Expected Input: number (row)
 */
function createHtmlRow(y) {
  const tableRow = document.createElement("tr");
  for (let x = 0; x < WIDTH; x++) {
    tableRow.append(createHtmlCell(y, x));
  }
  return tableRow;
}
/** create column tops
 * expected input: none
 * expected output: html element of column tops with 'click' event listener added
 */

function createColumnTops() {
  // creating element 'tr' that will hold the column tops element and adding an event
  // listener 'click' to it
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // creating one 'td' per column and appending to 'tr' element top
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  return top;
}
/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  let outputY = null;
  for(let y = 0; y < HEIGHT; y++){
    if(board[y][x]===0){
      outputY = y;
      break;
    }
  }
  return outputY;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const cell = document.querySelector(`#id${y}-${x}`);
  const piece = document.createElement('div');
  const player = (currPlayer === 1) ? 'p1' : 'p2';
  piece.classList.add('piece', `${player}`);
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  updateMemBoard(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if(isBoardFilled()) endGame();

  // switch players
  switchPlayer();
}

/** This will accept y and x and update in-memory board with appropriate
 * player #
*/
function updateMemBoard(y, x) {
  board[y][x] = currPlayer === 1 ? 1 : 2;
}

/** This checks our in-memory board to see if all spots are filled */
function isBoardFilled() {
  for (let x = 0; x < WIDTH; x++) {
    if (findSpotForCol(x) !== null) return false;
  }
  return true;
}

/**This will switch players or throw an error if currPlayer is not 1 or 2 */
function switchPlayer() {
  if (currPlayer === 1) currPlayer = 2;
  else if (currPlayer === 2) currPlayer = 1;
  else {
    throw new Error('Unkown Player Has Entered the Game');
  }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// makeEmptyBoard()
makeHtmlBoard();
