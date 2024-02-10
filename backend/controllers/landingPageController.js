import axios from "axios";
import * as cheerio from "cheerio";
import xlsx from "xlsx";
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
    const match = this.getChosenOptionId();
    return match == null ? 0 : 1;
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
    const match = this.text.match(/Chosen Option :(\d+)/);
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
    const { url, day, shift } = req.body;

    // console.log(url);
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const menuItems = $(".rw");

    let finalArr = [];

    menuItems.each((index, element) => {
      const menuItem = $(element).text().trim();
      const parser = new QuestionParser(menuItem);
      parser.clientAnswer =
        parser.answerStatus === 1
          ? parser.optionIds[Number(parser.chosenOptionId) - 1]
          : null;

      finalArr.push({
        questionId: parser.questionId,
        clientAnswer: parser.clientAnswer,
        givenAnswer: parser.givenAnswer,
        answerStatus: parser.answerStatus,
      });
    });
    
    console.log(`./exels/${day}${shift}.xlsx`);
    const workbook = xlsx.readFile(`./exels/${day}${shift}.xlsx`); // Or exceljs.readFileSync('path/to/your/file.xlsx')
    const sheetName = workbook.SheetNames[0]; // Assume the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); // Or exceljs.Worksheet#getData() for full details

    // let mathSA = 0;
    // let attemMathSA = 0;
    // let attemPhySA = 0;
    // let phySA = 0;
    // let attemChemSA = 0;
    // let chemSA = 0;
    // let mathMCQ = 0;
    // let phyMCQ = 0;
    // let cheMCQ = 0;
    // let attemtedArray = [0, 0, 0];
    // let index = 0;
    // let totalMCQ = 60;
    // let totalAnsweredMCQ = 0;
    // let correctCountMCQ = 0;

    let mathMeTotalAttempt = 0;
    let physicsMeTotalAttempt = 0;
    let chemistyMeTotalAttempt = 0;

    let mathMeNumericalAttempt = 0;
    let physicsMeNumericalAttempt = 0;
    let chemistyMeNumericalAttempt = 0;

    let mathMeMCQAttempt = 0;
    let physicsMeMCQAttempt = 0;
    let chemistyMeMCQAttempt = 0;

    let mathMeMCQCorrect = 0;
    let phyiscsMeMCQCorrect = 0;
    let chemistryMeMCQCorrect = 0;

    let mathMeNumericalCorrect = 0;
    let phyiscsMeNumericalCorrect = 0;
    let chemistryMeNumericalCorrect = 0;

    const map = new Map();
    // console.log(data);
    for (const row of data) {
      map.set(row["Question Number"], row["Correct Options/Answers"]);
    }
    // console.log(map);

    const answerStatusCheck = (answerStatus) => {
      return answerStatus === 1 ? true : false;
    };
    const mcqCheck = (first, second) => {};

    let index = 0;

    for (const row of finalArr) {
      index++;
      //Math Section
      //Math Mcq
      if (index >= 1 && index <= 20) {
        if (answerStatusCheck(row.answerStatus)) {
          mathMeMCQAttempt++;
        }

        // console.log(row.clientAnswer, "   ", map.get(row.questionId));
        if (row.clientAnswer === map.get(row.questionId)) {
          mathMeMCQCorrect++;
        }
      }
      //Math sa
      //
      else if (index >= 21 && index <= 30) {
        if (!(row.givenAnswer === "--")) {
          mathMeNumericalAttempt++;
        }
        // console.log(row.givenAnswer, "   ", map.get(row.questionId));
        if (row.givenAnswer === map.get(row.questionId)) {
          mathMeNumericalCorrect++;
        }
      }
      //Physics sections
      //physics mcq
      else if (index >= 31 && index <= 50) {
        if (answerStatusCheck(row.answerStatus)) {
          physicsMeMCQAttempt++;
        }
        // console.log(row.clientAnswer, "   ", map.get(row.questionId));
        if (row.clientAnswer === map.get(row.questionId)) {
          phyiscsMeMCQCorrect++;
        }
      }
      //physics sa
      else if (index >= 51 && index <= 60) {
        if (!(row.givenAnswer === "--")) {
          physicsMeNumericalAttempt++;
        }
        // console.log(row.givenAnswer, "   ", map.get(row.questionId));
        if (row.givenAnswer === map.get(row.questionId)) {
          phyiscsMeNumericalCorrect++;
        }
      }
      //chemistry section
      //chem Mcq
      else if (index >= 61 && index <= 80) {
        if (answerStatusCheck(row.answerStatus)) {
          chemistyMeMCQAttempt++;
        }
        // console.log(row.clientAnswer, "   ", map.get(row.questionId));
        if (row.clientAnswer === map.get(row.questionId)) {
          chemistryMeMCQCorrect++;
        }
      }
      //chem sa
      else if (index >= 81 && index <= 90) {
        if (!(row.givenAnswer === "--")) {
          chemistyMeNumericalAttempt++;
        }
        // console.log(row.givenAnswer, "   ", map.get(row.questionId));
        if (row.givenAnswer === map.get(row.questionId)) {
          chemistryMeNumericalCorrect++;
        }
      }
    }

    res.status(200).send({
      success: true,
      result: {
        attempted:
          mathMeMCQAttempt +
          physicsMeMCQAttempt +
          chemistyMeMCQAttempt +
          mathMeNumericalAttempt +
          physicsMeNumericalAttempt +
          chemistyMeNumericalAttempt,
        mathTotalCorrect: mathMeMCQCorrect + mathMeNumericalCorrect,
        mathMcqIncorrect: mathMeMCQAttempt - mathMeMCQCorrect,

        phyTotalCorrect: phyiscsMeMCQCorrect + phyiscsMeNumericalCorrect,
        phyMcqIncorrect: physicsMeMCQAttempt - phyiscsMeMCQCorrect,

        chemTotalCorrect: chemistryMeMCQCorrect + chemistryMeNumericalCorrect,
        chemMcqIncorrect: chemistyMeMCQAttempt - chemistryMeMCQCorrect,
        score:
          (mathMeMCQCorrect +
            mathMeNumericalCorrect +
            phyiscsMeMCQCorrect +
            phyiscsMeNumericalCorrect +
            chemistryMeMCQCorrect +
            chemistryMeNumericalCorrect) *
            4 -
          (mathMeMCQAttempt -
            mathMeMCQCorrect +
            physicsMeMCQAttempt -
            phyiscsMeMCQCorrect +
            chemistyMeMCQAttempt -
            chemistryMeMCQCorrect),

        mathMeNumericalAttempt,
        physicsMeNumericalAttempt,
        chemistyMeNumericalAttempt,

        mathMeMCQAttempt,
        physicsMeMCQAttempt,
        chemistyMeMCQAttempt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error,
    });
  }
};
