// const axios = require("axios");
// const cheerio = require("cheerio");
import axios from "axios";
import * as cheerio  from "cheerio";

class QuestionParser {
  constructor(text) {
    this.text = text;
    this.questionType = this.getQuestionType();
    this.answerStatus = this.getAnswerStatus();
    this.questionId = this.getQuestionId();
    this.optionIds = this.getOptionIds();
    this.chosenOptionId = this.getChosenOptionId();
    this.givenAnswer = this.extractGivenAnswer();
  }

  getQuestionType() {
    const match = this.text.match(/Question Type :(\w+)/);
    if (match) {
      const questionType = match[1].toLowerCase();
      return questionType === "mcqquestion" ? 1 : 0;
    } else {
      return null;
    }
  }

  getAnswerStatus() {
    const match = this.text.match(/Status :AnsweredChosen Option :(\d+)/);
    return match ? 1 : 0;
  }

  getQuestionId() {
    const match = this.text.match(/Question ID :(\d+)/);
    return match ? match[1] : null;
  }

  getOptionIds() {
    const regex = /Option (\d+) ID :(\d+)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(this.text))) {
      matches.push(match[2]);
    }
    return matches;
  }

  getChosenOptionId() {
    const match = this.text.match(/Status :AnsweredChosen Option :(\d+)/);
    return match ? match[1] : null;
  }

  extractGivenAnswer() {
    // Match the text following "Given Answer :", allowing for colons within the answer
    const match = this.text.match(/Given Answer :(?<answer>.*?)(?=Question|$)/);

    // If a match is found, return the answer; otherwise, return null.
    return match ? match.groups.answer.trim() : null;
  }
}

export const landingPageController = async (req, res) => {
    try {
        const {url} = req.body;
        console.log(url);
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const menuItems = $(".rw");

        let finalArr = [];
        
        menuItems.each((index, element) => {
          const menuItem = $(element).text().trim();
          const parser = new QuestionParser(menuItem);
          parser.sortedOptions = [...parser.optionIds].sort();
          parser.actualChoosenOption =
            parser.answerStatus === 1
              ? parser.sortedOptions.indexOf(
                  parser.optionIds[Number(parser.chosenOptionId) - 1]
                ) + 1
              : null;
          finalArr.push(parser);
        });

         res.status(200).send({
           success: true,
           finalArr
         });


    } catch (error) {
        res.status(400).send({
            success:false,
            error
        })
        
    }
};

//   axios
//     .get(url)
//     .then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);
//       const menuItems = $(".rw");
//       let finalArr = [];
//       menuItems.each((index, element) => {
//         const menuItem = $(element).text().trim();
//         console.log(index + 1);
//         const parser = new QuestionParser(menuItem);
//         parser.sortedOptions = [...parser.optionIds].sort();
//         parser.actualChoosenOption =
//           parser.answerStatus === 1
//             ? parser.sortedOptions.indexOf(
//                 parser.optionIds[Number(parser.chosenOptionId) - 1]
//               ) + 1
//             : null;
//         console.log(parser);
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });