// # Functional

// This pset is intended to guage your ability to _use_ promises for practical purposes

// ## Problems
const fs = require('fs')
//fs.readFile('./test.txt', 'utf-8', (err, data) => console.log(err, data))
const readFilePromise = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (!err) {
                resolve()

            } else {
                reject(err);
            }
        })

    })
}

readFilePromise('./test.txt')
    .then((data) => {
        console.log(data);
    }, (error) => {
        console.log(error)
    })
// ### 1

// We know how to use `fs.readFile` - 

// ```js
// const fs = require('fs')
// fs.readFile('filename', 'utf-8', (err, data) => console.log(err, data))
// ```

// This is fine but becomes cumbersome when we want to read multiple files, etc. Write a function `readFilePromise` that returns a promise with file data on success or err info on fail.

// ### 2
const writeFilePromise = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (!err) {
                resolve(data)

            } else {
                reject(err);
            }
        })

    })
}

writeFilePromise('./test2.txt', "This is Hervey L")

    //exta stuff below
    .then(() => {
        console.log("It has been written!");
    }, (err) => {
        console.log("It didnt work")
    })

// Do the same, but now for `fs.writeFile`. Call it `writeFilePromise`

// ### 3

// Write a function called `copyFile` that internally uses `readFilePromise` and `writeFilePromise` to perform the copy operation.
const copyFile = (file1, file2) => {
    readFilePromise(file1)
        .then((file1Data) => {
            writeFilePromise(file2, file1Data)
        })
}
copyFile("test.txt", "test2.txt");
// ```js
// const copyFile = fileName => { ... }
// ```

// ### 4

// Write a function called `concatFiles` that takes an array of files to read, reads them all using `readFilePromise` and the concats all the info and writes to a single file.

// ```js
const concatFiles = (fileNames, newFile) => {
    //step1 read each file in the array. 
    //step2 for each file store the contents of the file in the array
    //join.array into string
    //write this string into a new file
    const readArray = [];
    for (let i = 0; i < fileNames.length; i++) {
        readFilePromise(fileNames[i])
            .then((data) => {
                readArray.push(data);
            })
        const string = readArray.join('/n')
        console.log("im printing the data", string)
        //writeFilePromise("concatFile", )
    }
}
concatFiles(["test.txt", "test2.txt2"], ' filex')
// ```


// ### 5

// Write a function called `splitFiles` that takes a single file and a delimiter and splits into multiple files. 

// ```js
// const splitFiles = (fileName, delimiter='\n') => { ... }
// ```
// For example, given the following "file", call it `foo.txt`:

// ```
// a
// -
// b
// -
// c
// -
// d
// ```

// if we ran `splitFiles("foo.txt", '-'), we would expect to get back 4 files,

// `foo-0.txt`, containing just `a`
// `foo-1.txt`, containing just `b`
// `foo-2.txt`, containing just `c`
// `foo-3.txt`, containing just `d`

// Use `writeFilePromise` to write the files and `readFilePromise` to read your single file.

// ### 6

// write a function called `requestsPromise` that wraps a promise around the requests library. Use it to fetch web info from two different sources sequentially using promises

// ### 7 

// Using `requestsPromise` above, hit the darksky api to get current weather conditions and then using that, find an appropriate gif for that weather condition

// ### 8

// HARDMODE: write a function called `promisify` that takes two arguments, a function name and returns a promisified version of that function. For example:

// ```

// const fsReadPromise = promisify(fs.readFile)
// fsReadPromise('foo.txt', 'utf-8').then(data => console.log(data)).catch(e => console.log('err', e))

// ```

// (We call this a higher order function because it _takes_ a function and returns a _new_ function with added functionality. lol)