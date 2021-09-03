const perf = require("execution-time")()

function doublerAppend(nums) {
  let new_nums = []

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i] * 2
    new_nums.push(num)
  }
}

function doublerInsert(nums) {
  let new_nums = []

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i] * 2
    new_nums.unshift(num)
  }
}

function getSizedArray(size) {
  let array = []
  for (let i = 0; i < size; i++) {
    array.push(i)
  }
  return array
}

const tinyArray = getSizedArray(10) //Append AVG.99-100μs  Insert AVG.45μs
const smallArray = getSizedArray(100)//Append AVG. 120μs Insert AVG.105μs
const mediumArray = getSizedArray(1000)//Append AVG. 190μs Insert AVG.210μs
const largeArray = getSizedArray(10000)//Append AVG.730μs Insert AVG.6.5ms 
const extraLargeArray = getSizedArray(100000)//Append AVG.5.55ms Insert AVG.1.007s  

// How long does it take to double every number in a given
// array?

// Try it with first function
perf.start() // Starts timer
doublerAppend(extraLargeArray)
let resultsAppend = perf.stop() // Stops timer and save time results

// perf.start()
// doublerAppend(tinyArray)
// let resultsAppend2 = perf.stop()

// Try it with second function
perf.start()
doublerInsert(extraLargeArray)
let resultsInsert = perf.stop()

console.log("Results for the extraLargeArray")

console.log("append", resultsAppend.preciseWords)
console.log("insert", resultsInsert.preciseWords)
// console.log("append2", resultsAppend2.preciseWords)

// In total looking at short averages(Test sample calculated roughly from atleast 3 test instances) We can see while Inserting into the table is fast short term, 
// it does take longer to complete when given a larger quantity. The sweetspot for use seems to be if the numer is somwhere between one and ten thousand. 
// Once it breaks past this range it becomes increasingly apparent that Append scales better. This is shown that despite being slower in the smaller arrays,
// it is able to be consistant in the time ber unit, and when given a larger array this means less than 10 ms time, compared to the 1s+ of the Imnsert funtcion at the largest scale.
// From what I am able to tell, the issues stem from how memeroy interacts with each function. Because append is a function that overprovisions space, so when something
// is added to the end, the space is already allocated and ready to receive information.
// Insert on the other hand puts it at the beginning of the block, and since there is no actual room there, is instead has to copy the entire array with the new insert a the start.
// When there is little information this can be much quicker than going over the array to find the end, but on a larger scale with more and more to copy each time,
// leads to a longer runetime andbad scaling.