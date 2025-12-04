Introduction
============


You have been enchanted with the opportunity to develop a Wordle clone using React.js. No need to worry though, the instructions will be thoroughly explained in the proceeding sections. If you aren’t familiar with Wordle, you
can explore the magical game at [NyTimes Wordle](https://www.nytimes.com/games/wordle/index.html). 

The project is expected to take around 4-5 hours to complete. You have 5 days from the day you received the instructions.


Game Requirements 
=================


The Wordle clone will follow the same rules as the existing game we all know and love. The exact requirements are listed below. 

1. The player has a total of 6 guesses
2. Each guess must be a valid word [use API endpoint](https://wordle-apis.vercel.app/api/validate)
3. The player must be able to input their guess using their keyboard and pressing enter to submit
4. Guesses that are not valid words don’t impact their remaining number of guesses
5. If the player guessed a character that’s in the word and in the correct position, the square must be highlighted green [use API endpoint](https://wordle-apis.vercel.app/api/validate)
6. If the player guessed a character that’s in the word and not in the correct position, the square must be highlighted yellow [use API endpoint](https://wordle-apis.vercel.app/api/validate)
7. If the player guessed a character that’s not in the word, the square must be highlighted grey [use API endpoint](https://wordle-apis.vercel.app/api/validate)

If at any point the instructions are unclear, follow the existing Wordle rules. You won't be penalized for making reasonable assumptions. 


API
===


You will be given the following API to assist you in your journey. 


### Validate Wordle Guess 

This endpoint is to check if the provided guess is a valid English word and calculates how close it is to the word of the day. 


Endpoint: https://wordle-apis.vercel.app/api/validate 

Method: POST 

Body Type: application/json 

Body: 
```yaml
{ 
  ”guess” : String 
}
```


Response 

Body Type: application/json 

Body: 
```yaml
{ 
  ”isvalidword” : Boolean, 
  ”score” : [ 0−2, 0−2, 0−2, 0−2, 0−2 ] 
} 
```


The guess property of the request body is case insensitive. For example, it doesn’t matter if the value for guess is “BEACH” or “beach”. Both are treated the same in terms of the score calculation. 

The is valid word key is true if the guessed word is in the English dictionary otherwise it’s false. When is valid word is false, score is an empty array. 

The score array is an array of numbers with values ranging from 0 to 2. The array’s index corresponds to the index of the word the player guessed. For example, score[0] is the score for the character at index 0 for the word they guessed. 


The score values are explained below:
+ 0 - Character is not in the word
+ 1 - Character is in the word but not in the correct position
+ 2 - Character is in the word and in the correct position 


### Example - Validate Wordle Guess

Assume the Wordle is “COURT”. 


Request


Endpoint: /validate 

Method: POST 

Body Type: application/json 

Body: 
```yaml
{ 
  ”guess” : ”CHART” 
}
```


Response 

Body Type: application/json 

Body: 
```yaml
{ 
  ”isvalidword” : true , 
  ”score” : [ 2, 0, 0, 2, 2 ] 
} 
```


Submission
==========


Please kindly reply to this email with your submission. You can submit your code in the following manner: 

+ Email us a link to your GitHub repository (make sure it’s public) 
+ Email us a ZIP folder of your project contents

If you have deployed the project, please also include the URL in the email but this is not a requirement. 

If your project is not deployed, you must make sure we can run it locally. 

Please include all instructions required to get your project up and running. If we can’t run your code, we can’t assess it. 
Finally, please feel free to add your own unique magical touch to the applica tion! This could be fun and cute styling, popping colours, and anything of the sort. You can make the game to look as serious or FUN as you like! We are super excited to see what you come up with! 

Best of luck :) 


