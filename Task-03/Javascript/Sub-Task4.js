const fs = require('fs');


fs.readFile('input.txt', (err, data) => {
    const n = parseInt(data.toString().trim(), 10);

  function generateDiamond(n) {
        let diamond = '';
        for (let i = 1; i <= n; i++) {
            let space = ' '.repeat(n - i);
            let stars = '*'.repeat(2 * i - 1);
            diamond += space + stars + '\n';
        }
    
        for (let i = n - 1; i >= 1; i--) {
            let space = ' '.repeat(n - i);
            let stars = '*'.repeat(2 * i - 1);
            diamond += space + stars + '\n';
        }

        return diamond;
    }

    const diamondPattern = generateDiamond(n);

    
    fs.writeFile('output.txt', diamondPattern, () => {
        console.log('Diamond pattern written to output.txt');
    });
});
