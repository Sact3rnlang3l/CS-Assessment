function add_to_zero(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      let total = array[i]
      let equals_zero = total += array[j]
    //   console.log(total)
      if (equals_zero == 0) {
        console.log(`True ${array[i]} + ${array[j]} equals zero`)
      } else {
        console.log(`${array[i]} + ${array[j]} does not equal zero`)
      }
    }
  }
}

add_to_zero([1, 2, 3, -2])
