// Breadth-first search to find the shortest path from 
// the starting position to the end position on a chessboard
function knightMoves(start, end) {
    const board = {};
    board[JSON.stringify(start)] = { count: 0, path: [start] };
    const queue = [start];
    const maxIterations = 1000; // Set a limit on the number of iterations

    let iterations = 0;

    while (queue.length > 0 && iterations < maxIterations) {
        iterations++;

        const location = queue.shift();
        const moves = checkMoves(getMoves(location));
        
        // Enqueue each valid move into the queue and update the board with the move count.
        moves.forEach(move => {
            // Add the next move to the end of queue
            queue.push(move)

            // Update the board with move count and path
            board[JSON.stringify(move)] = {
                count: board[JSON.stringify(location)].count + 1,
                path: [...board[JSON.stringify(location)].path, move]
            };
        });

        // Check if the end position has been reached
        if (location[0] === end[0] && location[1] === end[1]) {
            break;
        };
    };

    // return board[JSON.stringify(end)] || -1; // Return -1 if end position is not reachable
    const result = board[JSON.stringify(end)];
    // console.log(result);
    
    //const reachedPosition = `You made it in ${result.count} moves!  Here's your path: ${JSON.stringify(result.path)}`;
    // const notReachablePosition = "End position is not reachable.";

    return result ? `You made it in ${result.count} moves!  Here's your path: ${JSON.stringify(result.path)}` : "End position is not reachable.";
}

// Get all knight moves, regardless of vadility
function getMoves(location) {
    const moves = [];

    moves.push([location[0] + 1, location[1] - 2]);
    moves.push([location[0] + 1, location[1] + 2]);
    moves.push([location[0] - 1, location[1] - 2]);
    moves.push([location[0] - 1, location[1] + 2]);
    moves.push([location[0] + 2, location[1] - 1]);
    moves.push([location[0] + 2, location[1] + 1]);
    moves.push([location[0] - 2, location[1] - 1]);
    moves.push([location[0] - 2, location[1] + 1]);

    return moves;
};

// Filter the next move to only be valid board moves
function checkMoves(moves) {
    return moves.filter(move => {
        return move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7;
    });
};

console.log(knightMoves([0,0],[3,3]));
console.log(knightMoves([3,3],[0,0]));
console.log(knightMoves([0,0],[7,7]));
console.log(knightMoves([3,3],[4,3]));