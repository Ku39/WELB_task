const readline = require('readline');

const rl = readline("test.txt");
rl.on('line', function(line, lineCount, byteCount) {
    console.log(line)
  })
// const counter = async () => {
//     const document = await fs.readFile("test.txt", "utf-8");
    
//     console.log(document.length)
//     // let result = 0;

//     // for (let i = 0; i < arg[1].length; i++) {
//     //     let detect = false
//     //     const element = arg[1][i];
//     //     for(let e = 0; e<arg[0].length; e++){
//     //         const item = arg[0][e]
//     //         if(element == item){
//     //             detect = true
//     //         }
//     //     }
//     //     if(detect){
//     //         result++
//     //     }
//     // }
//     // return result
// }
// counter()
