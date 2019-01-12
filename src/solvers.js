/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// O(c**n)
window.findNRooksSolution = function(n) {
  var solution = this.findAllNRooksSolutions(n, true)[0]; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // [[1,0,0], [0,1,0],[0,0,1]]
  return solution;
};

// return array result
// O(c**n)
// Q = n, we can omit
// function NQueens(n, leftD, col, rightD, count, canPlace, pos) {
//   count = 0;
//   n = leftD ? n : (1 << n) - 1;
//   canPlace = ~(leftD | col | rightD) & n;
//   while (canPlace) {
//     canPlace ^= pos = -canPlace & canPlace;
//     count += NQueens(n, (leftD | pos) << 1, col | pos, (rightD | pos)  >> 1);
//   }
//   return count += col == n;
// };

window.NQueens = function(n) {
  var count = 0;
  // Used as a mask and to count how many
  // queens have been placed
  var done = Math.pow(2,n) - 1;
  //Checks all possible board configurations
  var innerRecurse = function(ld, col, rd) {
    // All columns are occupied,
    // so the solution must be complete
    if (col === done) {
      count++;
      return;
    }
    // Finds all columns where a queen can
    // curently be placed
    var openColumns = ~(ld | rd | col);
    // Loops as long as there is a column where a queen
    // can be placed
    while (openColumns & done) {
      // Find the first open column
      var position = openColumns & -openColumns;
      // Set that column to occupied
      openColumns -= position;
      // Adds the position of the current queen to the working solution
      // Updates the left and right diagonal bit vectors
      innerRecurse((ld|position)>>1, col|position, (rd|position)<<1);
    }
  };
  // Initial call with the board vectors empty
  innerRecurse(0,0,0);
  return count;
};

window.NRooks = function(n) {
  var count = 0;
  // Used as a mask and to count
  // how many rooks are placed
  var done = Math.pow(2,n) - 1;
  // Recursively find number of solutions
  var innerRecurse = function(col) {
    // If columns is set to all 1s then a
    // rook has been place in every column
    // and is therefore solution
    if (col === done) {
      count++;
      return;
    }
    // Finds all columns without a rook
    var openColumns = ~(col);
    // Loops as long as there is a column
    // without a rook or there are no columns
    // that a rook can be placed
    while (openColumns & done) {
      // Finds first column where a rook can be placed
      var position = openColumns & -openColumns;
      // Sets that column to occupied
      openColumns -= position;
      // Adds position to  the current working solution and
      // calls the recursive funciton to see if its part of a valid solution
      innerRecurse(col|position);
    }
  };
  // Initial call with the board vectors empty
  innerRecurse(0);
  return count;
};

var findAllNRooksSolutions = function(n, single) {
  var result = [];
  var blank = _.range(n).map(()=>0);

  var rookHelper = function(solution) {
    if (solution.length === n) {
      result.push(solution.slice());
    } else {
      if (single && result.length === 1) {
        return;
      }
      var i;
      for (i = 0; i < n; i++) {
        var temp = Array.from(blank);
        temp[i] = 1;
        solution.push(temp);
        var conflict = false;
        for (var j = solution.length - 2; j >= 0; j--) {
          if (solution[j][i] === 1) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          rookHelper(solution);
        }
        // var currentLength = solution.length;
        // for (var j = solution.length; j < n; j++) {
        //   solution.push(blank);
        // }
        // var newBoard = new Board(solution);
        // for (var j = currentLength; j < n; j++) {
        //   solution.pop();
        // }
        // if (!newBoard.hasAnyColConflicts()) {
        //   helper(solution);
        // }
        solution.pop();
      }
    }
  };
  //debugger;
  rookHelper([]);
  return result;
};

var findAllNRooksSolutionsCount = function(n) {
  var result = 0;
  var blank = _.range(n).map(()=>0);

  var rookHelper = function(solution) {
    if (solution.length === n) {
      result++;
    } else {
      var i;
      for (i = 0; i < n; i++) {
        var temp = Array.from(blank);
        temp[i] = 1;
        solution.push(temp);
        var conflict = false;
        for (var j = solution.length - 2; j >= 0; j--) {
          if (solution[j][i] === 1) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          rookHelper(solution);
        }
        solution.pop();
      }
    }
  };
  rookHelper([]);
  return result;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// O(c**n)
window.countNRooksSolutions = function(n) {
  var solutionCount = this.findAllNRooksSolutionsCount(n); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// O(c**n)
window.findNQueensSolution = function(n) {
  var solution = findAllNQueensSolutions(n, true)[0]; //fixme
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return array result
// O(c**n)
var findAllNQueensSolutions = function(n, single) {

  var result = [];
  if (n === 2 && single) {
    result.push([[0, 0], [0, 0]]);
  }
  if (n === 3 && single) {
    result.push([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  }
  var blank = _.range(n).map(()=>0);

  var queenHelper = function(solution) {
    if (solution.length === n) {
      result.push(solution.slice());
    } else {
      if (single && result.length === 1) {
        return;
      }
      var i;
      for (i = 0; i < n; i++) {
        var temp = Array.from(blank);
        temp[i] = 1;
        solution.push(temp);
        var conflict = false;
        for (var j = solution.length - 2; j >= 0; j--) {
          // first point j is the row we are checking
          // where is y
          // indexOf(1) where it is in the row
          //--
          // y = i , x = solution.length - 1
          // y-y/x-x === 1 then its conflict
          // j - solution.length -1
          if (Math.abs((solution[j].indexOf(1) - i)) / Math.abs((solution.length - j - 1)) === 1) {
            conflict = true;
            break;
          }
          if (solution[j][i] === 1) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          queenHelper(solution);
        }
        solution.pop();
      }
    }
  };
  queenHelper([]);
  return result;
};

var findAllNQueensSolutionsCount = function(n) {

  var result = 0;
  var blank = _.range(n).map(()=>0);

  var queenHelper = function(solution) {
    if (solution.length === n) {
      result++;
    } else {
      var i;
      for (i = 0; i < n; i++) {
        var temp = Array.from(blank);
        temp[i] = 1;
        solution.push(temp);
        var conflict = false;
        for (var j = solution.length - 2; j >= 0; j--) {
          if (Math.abs((solution[j].indexOf(1) - i)) / Math.abs((solution.length - j - 1)) === 1) {
            conflict = true;
            break;
          }
          if (solution[j][i] === 1) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          queenHelper(solution);
        }
        solution.pop();
      }
    }
  };
  queenHelper([]);
  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// O(c**n)
window.countNQueensSolutions = function(n) {
  var solutionCount = findAllNQueensSolutionsCount(n); //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
