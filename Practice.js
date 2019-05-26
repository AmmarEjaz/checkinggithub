const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];
const fetch=require('node-fetch');
const squareList= (arr) =>{
    const firstNumber=realNumberArray.filter(number=>number>0 && Number.isInteger(number)===true)
    return firstNumber;
}

const secondNumber=squareList(realNumberArray).map(number=>number*number);

const thirdNumber=secondNumber.map(number=>number*number)
console.log(thirdNumber)


const url='https://jsonplaceholder.typicode.com/comments'

fetch(url).then(function(result){
    return result.json();
}).then(function(result){
    for(let i=0;i<result.length;i++){
    console.log(result[i].email);
    }
})

console.log('nothing');

