import express from "express";
import morgan from "morgan";
import cors from "cors"; 
import "dotenv/config";
import connectDB from "./config/db.js";
import homeRoute from "./routes/homeRoute.js";

// connect database

connectDB();

// rest object 
const app = express();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//routes
app.use('/api/v1',homeRoute);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});


















// const axios = require("axios");
// const cheerio = require("cheerio");

// const url =
//   "https://cdn3.digialm.com//per/g28/pub/2083/touchstone/AssessmentQPHTMLMode1//2083O23354/2083O23354S16D16841/17067995351433920/MP13002537_2083O23354S16D16841E1.html#";

// class QuestionParser {
//   constructor(text) {
//     this.text = text;
//     this.questionType = this.getQuestionType();
//     this.answerStatus = this.getAnswerStatus();
//     this.questionId = this.getQuestionId();
//     this.optionIds = this.getOptionIds();
//     this.chosenOptionId = this.getChosenOptionId();
//     this.givenAnswer = this.extractGivenAnswer();
//   }

//   getQuestionType() {
//     const match = this.text.match(/Question Type :(\w+)/);
//     if (match) {
//       const questionType = match[1].toLowerCase();
//       return questionType === "mcqquestion" ? 1 : 0;
//     } else {
//       return null;
//     }
//   }

//   getAnswerStatus() {
//     const match = this.text.match(/Status :AnsweredChosen Option :(\d+)/);
//     return match ? 1 : 0;
//   }
  
//   getQuestionId() {
//     const match = this.text.match(/Question ID :(\d+)/);
//     return match ? match[1] : null;
//   }

//   getOptionIds() {
//     const regex = /Option (\d+) ID :(\d+)/g;
//     const matches = [];
//     let match;
//     while ((match = regex.exec(this.text))) {
//       matches.push(match[2]);
//     }
//     return matches;
//   }
  
//   getChosenOptionId() {
//     const match = this.text.match(/Status :AnsweredChosen Option :(\d+)/);
//     return match ? match[1] : null;
//   }
  
//   extractGivenAnswer() {
//     // Match the text following "Given Answer :", allowing for colons within the answer
//     const match = this.text.match(/Given Answer :(?<answer>.*?)(?=Question|$)/);
    
//     // If a match is found, return the answer; otherwise, return null.
//     return match ? match.groups.answer.trim() : null;
//   }
// }

// axios
// .get(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const menuItems = $(".rw");
    
//     let finalArr = [];
//     menuItems.each((index, element) => {
//       const menuItem = $(element).text().trim();
//       console.log(index + 1);
//       const parser = new QuestionParser(menuItem);
//       parser.sortedOptions = [...parser.optionIds].sort();
//       parser.actualChoosenOption =
//       parser.answerStatus === 1
//       ? (parser.sortedOptions.indexOf(
//         parser.optionIds[Number(parser.chosenOptionId) - 1] 
//             )+1)
//             : null;
//             console.log(parser);
//           });
//         })
//         .catch((error) => {
//     console.log(error);
//   });


































  // const axios = require("axios");
  // const cheerio = require("cheerio");
  
  // const url =
  //   "https://cdn3.digialm.com//per/g28/pub/2083/touchstone/AssessmentQPHTMLMode1//2083O23354/2083O23354S16D16841/17067995351433920/MP13002537_2083O23354S16D16841E1.html#";
  
  //Very Useful code
  // axios
  //   .get(url)
  //   .then((response) => {
  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     const menuItems = $(".menu-tbl");
  //     menuItems.each((index, element) => {
  //       const menuItem = $(element).text().trim();
  //       console.log(index + 1);
  //       const parser = new QuestionParser(menuItem);
  //       parser.parse();
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  
  //Very Useful code
  // axios
  //   .get(url)
  //   .then((response) => {
  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     const menuItems = $(".rw");
  //     menuItems.each((index, element) => {
  //       const menuItem = $(element).text().trim();
  //       console.log(index + 1);
  //       const parser = new QuestionParser(menuItem);
  //       parser.parse();
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  
  // const text =
  //   "Question Type :MCQQuestion ID :4058591201Option 1 ID :4058593798Option 2 ID :4058593795Option 3 ID :4058593797Option 4 ID :4058593796Status :AnsweredChosen Option :2";
  
  // // Modified regex pattern to capture numbers after "Question ID :" and "Option "
  // const regex = /(?:Question ID :|ID )(\d+)/g;
  
  // const numbers = [];
  // let match;
  // while ((match = regex.exec(text)) !== null) {
  //   numbers.push(match[1]);
  // }
  
  // console.log(numbers);
  
  // const text =
  //   "Question Type :MCQQuestion ID :4058591201Option 1 ID :4058593798Option 2 ID :4058593795Option 3 ID :4058593797Option 4 ID :4058593796Status :AnsweredChosen Option :2";
  
  // // Function to extract question ID
  // function getQuestionId(text) {
  //   const match = text.match(/Question ID :(\d+)/);
  //   return match ? match[1] : null;
  // }
  
  // // Function to extract option IDs
  // function getOptionIds(text) {
  //   const regex = /Option (\d+) ID :(\d+)/g;
  //   const matches = [];
  //   let match;
  //   while ((match = regex.exec(text))) {
  //     matches.push(match[2]);
  //   }
  //   return matches;
  // }
  
  // // Extract information
  // const questionId = getQuestionId(text);
  // const optionIds = getOptionIds(text);
  
  // // Print results
  // console.log(questionId);
  // console.log(optionIds);
  
  // const text =
  //   "Question Type :MCQQuestion ID :4058591201Option 1 ID :4058593798Option 2 ID :4058593795Option 3 ID :4058593797Option 4 ID :4058593796Status :AnsweredChosen Option :2";
  
  // // Function to extract question type
  // function getQuestionType(text) {
  //   const match = text.match(/Question Type :(\w+)/);
  //   if (match) {
  //     const questionType = match[1];
  //     return questionType.toLowerCase() === "mcqquestion" ? 1 : 0;
  //   } else {
  //     return null;
  //   }
  // }
  
  // // Function to extract answer status
  // function getAnswerStatus(text) {
  //   const match = text.match(/Status :AnsweredChosen Option :(\d+)/);
  //   return match ? 1 : 0;
  // }
  
  // // Function to extract question ID
  // function getQuestionId(text) {
  //   const match = text.match(/Question ID :(\d+)/);
  //   return match ? match[1] : null;
  // }
  
  // // Function to extract option IDs
  // function getOptionIds(text) {
  //   const regex = /Option (\d+) ID :(\d+)/g;
  //   const matches = [];
  //   let match;
  //   while ((match = regex.exec(text))) {
  //     matches.push(match[2]);
  //   }
  //   return matches;
  // }
  
  // // Extract information
  // const questionType = getQuestionType(text);
  // const answerStatus = getAnswerStatus(text);
  // const questionId = getQuestionId(text);
  // const optionIds = getOptionIds(text);
  
  // // Print results
  // console.log(`Question Type: ${questionType}`);
  // console.log(`Answer Status: ${answerStatus}`); // 1 indicates answered, 0 indicates not answered
  // console.log(`Question ID: ${questionId}`);
  // console.log(`Option IDs: ${optionIds}`);
  
  // class QuestionParser {
  //   constructor(text) {
  //     this.text = text;
  //     // Perform parsing immediately in the constructor
  //     this.questionType = this.getQuestionType();
  //     this.answerStatus = this.getAnswerStatus();
  //     this.questionId = this.getQuestionId();
  //     this.optionIds = this.getOptionIds();
  //     this.chosenOptionId = this.getChosenOptionId();
  //     this.givenAnswer = this.extractGivenAnswer();
  //   }
  
  //   getQuestionType() {
  //     const match = this.text.match(/Question Type :(\w+)/);
  //     if (match) {
  //       const questionType = match[1].toLowerCase();
  //       return questionType === "mcqquestion" ? 1 : 0;
  //     } else {
  //       return null;
  //     }
  //   }
  
  //   getAnswerStatus() {
  //     const match = this.text.match(/Status :AnsweredChosen Option :(\d+)/);
  //     return match ? 1 : 0;
  //   }
  
  //   getQuestionId() {
  //     const match = this.text.match(/Question ID :(\d+)/);
  //     return match ? match[1] : null;
  //   }
  
  //   getOptionIds() {
  //     const regex = /Option (\d+) ID :(\d+)/g;
  //     const matches = [];
  //     let match;
  //     while ((match = regex.exec(this.text))) {
  //       matches.push(match[2]);
  //     }
  //     return matches;
  //   }
  
  //   getChosenOptionId() {
  //     const match = this.text.match(/Status :AnsweredChosen Option :(\d+)/);
  //     return match ? match[1] : null;
  //   }
  
  //   extractGivenAnswer() {
  //   // Match the text following "Given Answer :", allowing for colons within the answer
  //   const match = this.text.match(/Given Answer :(?<answer>.*?)(?=Question|$)/);
  
  //   // If a match is found, return the answer; otherwise, return null.
  //   return match ? match.groups.answer.trim() : null;
  // }
  
  //   // Example usage:
  //   parse() {
  //     const questionType = this.getQuestionType();
  //     const answerStatus = this.getAnswerStatus();
  //     const questionId = this.getQuestionId();
  //     const optionIds = this.getOptionIds();
  //     const chosenOptionId = this.getChosenOptionId();
  //     const extractGivenAnswer = this.extractGivenAnswer();
  
  //     console.log(`Question Type: ${questionType}`);
  //     console.log(`Answer Status: ${answerStatus}`);
  //     console.log(`Question ID: ${questionId}`);
  //     console.log(`Option IDs: ${optionIds}`);
  //     console.log(`Chosen Option ID: ${chosenOptionId}`);
  //     console.log(`extractGivenAnswer : ${extractGivenAnswer}`);
  //   }
  // }
  
  // Usage example:
  // const text = "Question Type :MCQQuestion ID :4058591201Option 1 ID :4058593798Option 2 ID :4058593795Option 3 ID :4058593797Option 4 ID :4058593796Status :AnsweredChosen Option :2";
  // const parser = new QuestionParser(text);
  // parser.parse();
  
  // function extractGivenAnswer(text) {
  //   // Match the text following "Given Answer :", allowing for colons within the answer
  //   const match = text.match(/Given Answer :(?<answer>.*?)(?=Question|$)/);
  
  //   // If a match is found, return the answer; otherwise, return null.
  //   return match ? match.groups.answer.trim() : null;
  // }
  
  // // Example usage:
  // const text = "Q.81Given Answer :400.8Question Type :SAQuestion ID :4058591279Status :Answered";
  // const answer = extractGivenAnswer(text);
  
  // console.log(answer); // Output: 400.8