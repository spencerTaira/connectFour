"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

// TODO: remove these global lets?
// perhaps we can constantly "pass along" both board state and currentPlayer
let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])

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
  for(let i = 0; i<HEIGHT; i++){
    emptyBoard.push(makeEmptyRow());
  }
  return emptyBoard;
}

/**returns a single-depth array that is a row */
function makeEmptyRow(){
  let emptyRow = [];
  for(let i=0; i<WIDTH; i++){
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
function createHtmlCell(row, col) {
    const tableCell = document.createElement("td");
    tableCell.setAttribute("id", `${row}-${col}`);
    return tableCell;
}

/** create multiple 'tr' equivalent to global constant Height
 * Expected Input: number (row)
 */
function createHtmlRow(row) {
  const tableRow = document.createElement("tr");
  for (let col = 0; col < WIDTH; col++) {
    tableRow.append(createHtmlCell(row, col));
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
  // TODO: write the real version of this, rather than always returning 5
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
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

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
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

makeHtmlBoard(makeEmptyBoard());
