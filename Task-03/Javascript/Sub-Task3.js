function generateDiamond(n) {
    
    for (let i = 1; i <= n; i++) {
        let space = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(space + stars);
    }

    for (let i = n - 1; i >= 1; i--) {
        let space = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(space + stars);
    }
}

let n = parseInt(prompt("Enter the number of rows for the diamond pattern: "));
generateDiamond(n);
