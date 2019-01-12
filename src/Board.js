// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // O(n)
    hasRowConflictAt: function(rowIndex) {
      // var board = new Board([[1,0,0],[0,1,0],[0,0,1]])
      // board.hasRowConflictAt(1)

      // use reduce on the row
      // if we reduce the row value then if equal to 1 then theres conflict
      // 3 > there is conflict

      return 1 < this.rows()[rowIndex].reduce((acc, nxt) => acc + nxt );
    },

    // test if any rows on this board contain conflicts
    // O(n**2)
    hasAnyRowConflicts: function() {
      // return false; // fixme
      // apply has row conflict to all row
      // hasRowConflict at all row
      // through loop , map
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // O(n**2)
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      // similar to row
      // check all index on all of the row
      var total = 0;
      for (let i = 0; i < this.get('n'); i++) {
        total += this.rows()[i][colIndex];
      }
      return total > 1;
    },

    // test if any columns on this board contain conflicts
    // O(n**2)
    hasAnyColConflicts: function() {
      // return false; // fixme
      // similar
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // O(n)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme
      // diagonal to the right
      //
      var total = 0;
      var total2 = 0;
      majorDiagonalColumnIndexAtFirstRow = majorDiagonalColumnIndexAtFirstRow < 0 ? -majorDiagonalColumnIndexAtFirstRow : majorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < this.get('n') - majorDiagonalColumnIndexAtFirstRow; i++) {
        // console.log(majorDiagonalColumnIndexAtFirstRow+i);
        total += this.rows()[i][majorDiagonalColumnIndexAtFirstRow + i];
        total2 += this.rows()[majorDiagonalColumnIndexAtFirstRow + i][i];
      }
      return total > 1 || total2 > 1;
    },

    // test if any major diagonals on this board contain conflicts
    // O(n**2)
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // O(n)
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // return false; // fixme
      // top-right to bottom left
      var total = 0;
      var total2 = 0;
      for (let i = 0; i < this.get('n') - minorDiagonalColumnIndexAtFirstRow; i++) {
        // console.log(i+minorDiagonalColumnIndexAtFirstRow, this.get('n')-1-i);
        // console.log(i, this.get('n') - 1 - i - minorDiagonalColumnIndexAtFirstRow);
        total += this.rows()[i + minorDiagonalColumnIndexAtFirstRow][this.get('n') - 1 - i];
        total2 += this.rows()[i][this.get('n') - 1 - i - minorDiagonalColumnIndexAtFirstRow];
      }
      return total > 1 || total2 > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    // O(n**2)
    hasAnyMinorDiagonalConflicts: function() {
      // return false; // fixme
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
