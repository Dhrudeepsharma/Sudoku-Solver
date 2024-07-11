document.getElementById('solveButton').addEventListener("click", async function () {
    const dynamicInput = [
        [0, 0, 0, 0, 0, 2, 3, 0, 0],
        [0, 0, 0, 7, 0, 6, 1, 8, 5],
        [0, 7, 0, 0, 5, 1, 0, 0, 0],
        [0, 0, 4, 6, 2, 7, 0, 3, 0],
        [0, 0, 7, 0, 0, 0, 0, 0, 9],
        [6, 0, 0, 0, 9, 0, 0, 0, 7],
        [0, 3, 2, 0, 0, 0, 4, 0, 6],
        [0, 0, 0, 3, 0, 9, 2, 0, 0],
        [1, 0, 0, 0, 0, 8, 0, 0, 0]
    ]

    let input_2d_array = new Array(9)
    for (let i = 0; i < 9; i++)
        input_2d_array[i] = new Array(9)


    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            var t = (+document.getElementById('input_table').rows[i].cells[j].children[0].value)
            input_2d_array[i][j] = t;
            console.log(t);
        }
    }
    let a = input_2d_array
    console.log("its a", a)


    console.log("HERE is the array:", input_2d_array)



    // const dynamicInputNew = JSON.parse(document.getElementById('input'))

    const result = solve(input_2d_array)

    console.log("result", result)

    // let tableStr = "<table style='border: 1px solid gray;'><tbody>"
    // for (let index = 0; index < result.length; index++) {
    //     const element = result[index];

    //     tableStr += "<tr>"
    //     for (let elementIndex = 0; elementIndex < element.length; elementIndex++) {
    //         const nestedItem = element[elementIndex];
    //         tableStr += "<td>" + nestedItem + "</td>"
    //     }
    //     tableStr += "</tr>"

    // }
    // tableStr += "</tbody></table>"
    // let buff = document.getElementById("buffer")
    document.getElementById("buffer").style.visibility = "visible";
    await sleep(1000);
    document.getElementById("buffer").style.visibility = "hidden";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            console.log(result[i][j], input_2d_array[i][j])
            var t = (+document.getElementById('input_table').rows[i].cells[j].children[0].value)
            if (result[i][j] != t) {
                document.getElementById('input_table').rows[i].cells[j].children[0].value = result[i][j]
                document.getElementById('input_table').rows[i].cells[j].children[0].style.color = "red"
                document.getElementById('input_table').rows[i].cells[j].children[0].style.backgroundColor = "white"
            }
        }
    }

    // document.getElementById('result_table').innerHTML = tableStr
    console.log(result)
});

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// function hey() {
//     let input = document.getElementById('input').value;
//     console.log("Input value:", input);
//     console.log("Input element:", document.querySelector("#input"));
//     // let solvedPuzzle = parseInput(input);
//     // console.log("Input value:", solvedPuzzle);
//     let output = document.getElementById('output');
//     output.innerText = "Helloooooooooooo";
//     // console.log("Input element:", document.querySelector("#input"));
// }

// function solved() {
//     let input = document.querySelector("#input").value;

//     // Parse the input into a 2D array
//     let solvedPuzzle = parseInput(input);

//     // Example of using the parsed input (you may want to perform Sudoku solving logic here)
//     //let solvedPuzzle = solveSudoku(parsedInput);

//     // Display the solved puzzle
//     let output = document.querySelector("#output");
//     output.innerHTML = input;
//     output.innerText = solvedPuzzle.map(row => row.join('')).join('\n');
// }

// function parseInput(input) {
//     // Split the input by newline characters to get rows
//     let rows = input.split('\n');

//     // Split each row by spaces to get cells and convert to characters
//     for (let i = 0; i < rows.length; i++) {
//         // Use a regular expression to split by any whitespace (including spaces, tabs, etc.)
//         rows[i] = rows[i].split(/\s+/).map(cell => cell.trim()); // Trim each cell if necessary
//     }

//     return rows;
// }




// function solveSudoku(puzzle) {
//     // Example solving logic (replace with your actual Sudoku solving algorithm)
//     // Here, just return the puzzle as is (assuming it's solved)
//     return puzzle;
// }

// function solveSudoku() {
//     let inp = document.querySelector("#input").value;
//     // output.innerText = ans.map(row => row.join('')).join('\n');


//     // Parse the input into a 2D array
//     let a = parseInput(inp);

//     // Validate the parsed input
//     if (a.length !== 9 || a.some(row => row.length !== 9)) {
//         console.error("Invalid Sudoku input.");
//         return;
//     }

//     // Solve the Sudoku
//     let ans = solve(a);

//     // Display the result
//     let output = document.querySelector("#output");
//     output.innerText = ans.map(row => row.join('')).join('\n');
// }

// function parseInput(input) {
//     if (!input) {
//         console.error("Input is empty or undefined.");
//         return [];
//     }
//     // Split the input into rows
//     let rows = input.trim().split('\n');
//     return rows.map(row => row.trim().split(/\s+/).map(Number));
// }


let col = Array.from({ length: 9 }, () => new Map());
let row = Array.from({ length: 9 }, () => new Map());
let box = Array.from({ length: 9 }, () => new Map());

function again(a) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (a[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {
                    let b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                    if (!col[j].has(k) && !row[i].has(k) && !box[b].has(k)) {
                        a[i][j] = k;
                        row[i].set(k, (row[i].get(k) || 0) + 1);
                        col[j].set(k, (col[j].get(k) || 0) + 1);
                        box[b].set(k, (box[b].get(k) || 0) + 1);
                        if (again(a)) return true;
                        else {
                            row[i].delete(k);
                            col[j].delete(k);
                            box[b].delete(k);
                            a[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solve(a) {
    // Initialize maps
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (a[i][j] !== 0) {
                col[j].set(a[i][j], (col[j].get(a[i][j]) || 0) + 1);
                row[i].set(a[i][j], (row[i].get(a[i][j]) || 0) + 1);
                let k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                box[k].set(a[i][j], (box[k].get(a[i][j]) || 0) + 1);
            }
        }
    }

    // Constraint propagation
    for (let iter = 0; iter < 81; iter++) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (a[i][j] === 0) {
                    let possibleValues = [];
                    let b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                    for (let k = 1; k <= 9; k++) {
                        if (!col[j].has(k) && !row[i].has(k) && !box[b].has(k)) {
                            possibleValues.push(k);
                        }
                    }
                    if (possibleValues.length === 1) {
                        a[i][j] = possibleValues[0];
                        row[i].set(a[i][j], (row[i].get(a[i][j]) || 0) + 1);
                        col[j].set(a[i][j], (col[j].get(a[i][j]) || 0) + 1);
                        box[b].set(a[i][j], (box[b].get(a[i][j]) || 0) + 1);
                    }
                }
            }
        }
    }

    // Solve recursively if necessary
    if (!again(a)) {
        console.error("The puzzle could not be solved.");
    }

    return a;
}

