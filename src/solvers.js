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



window.findNRooksSolution = function(n) {
  var solution = this.findAllNRooksSolutions(n, true)[0]; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // [[1,0,0], [0,1,0],[0,0,1]]
  return solution;
};

// return array result
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


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = this.findAllNRooksSolutions(n).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = findAllNQueensSolutions(n, true)[0]; //fixme
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return array result
var findAllNQueensSolutions = function(n, single) {

  var result = [];
  // if (n === 0) {
  //   result.push([]);
  // }
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


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findAllNQueensSolutions(n).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
