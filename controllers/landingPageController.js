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
      // parser.sortedOptions = [...parser.optionIds].sort();
      // parser.actualChoosenOption =
      //   parser.answerStatus === 1
      //     ? parser.sortedOptions.indexOf(
        //         parser.optionIds[Number(parser.chosenOptionId) - 1]
        //       ) + 1
        //     : null;
        
        parser.clientAnswer =
        parser.answerStatus === 1
        ? Number(parser.optionIds[Number(parser.chosenOptionId) - 1])
        : null;
        // parser.text = "";
        finalArr.push(parser);
      });
    // console.log(finalArr);
    
    console.log(day + toString(shift) + ".xlsx");
    const workbook = xlsx.readFile(day+shift+".xlsx"); // Or exceljs.readFileSync('path/to/your/file.xlsx')
    const sheetName = workbook.SheetNames[0]; // Assume the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet); // Or exceljs.Worksheet#getData() for full details

    let mathSA = 0;
    let attemMathSA = 0;
    let attemPhySA = 0;
    let phySA = 0;
    let attemChemSA = 0;
    let chemSA = 0;
    let mathMCQ = 0;
    let phyMCQ = 0;
    let cheMCQ = 0;
    let attemtedArray = [0, 0, 0];

    let index = 0;

    let totalMCQ = 60;
    let totalAnsweredMCQ = 0;
    let correctCountMCQ = 0;
    const map = new Map();

    //console.log(data);
    for (const row of data) {
      map.set(row["Question Number"], row["Correct Options/Answers"]);
      // console.log(row["Question Number"]);
      // console.log(row["Correct Options/Answers"]);
    }
    console.log(map);

    for (const row of finalArr) {
      index++;
      if (row.questionType === 1 && row.answerStatus === 1) {
        totalAnsweredMCQ++;

        if (index >= 1 && index <= 30) {
          attemtedArray[0]++;
        } else if (index >= 31 && index <= 60) {
          attemtedArray[1]++;
        } else if (index >= 61 && index <= 90) {
          attemtedArray[2]++;
        }
        if (map.get(Number(row.questionId)) === row.clientAnswer) {
          if (index >= 1 && index <= 30) {
            mathMCQ++;
          } else if (index >= 31 && index <= 60) {
            phyMCQ++;
          } else if (index >= 61 && index <= 90) {
            cheMCQ++;
          }
          correctCountMCQ++;
        }
      } else {
        const check = (one, two) => {
          //console.log("one  :", one, "  two : ", two);
          if (two == null) {
            return false;
          }
          if (one == two) {
            return true;
          }
          return false;
        };
        const attempt = (rower) => {
          if (rower.givenAnswer == "--" || rower.givenAnswer == null) {
            return false;
          }
          return true;
        };

        if (index >= 21 && index <= 30) {
          attemMathSA = attempt(row) ? attemMathSA + 1 : attemMathSA;
          mathSA = check(map.get(Number(row.questionId)), row.givenAnswer)
            ? mathSA + 1
            : mathSA;
        } else if (index >= 51 && index <= 60) {
          attemPhySA = attempt(row) ? attemPhySA + 1 : attemPhySA;
          phySA = check(map.get(Number(row.questionId)), row.givenAnswer)
            ? phySA + 1
            : phySA;
        } else if (index >= 81 && index <= 90) {
          attemChemSA = attempt(row) ? attemChemSA + 1 : attemChemSA;
          chemSA = check(map.get(Number(row.questionId)), row.givenAnswer)
            ? chemSA + 1
            : chemSA;
        }
      }
    }

    // console.log(
    //   totalMCQ,
    //   "   ",
    //   totalAnsweredMCQ,
    //   "   ",
    //   correctCountMCQ,
    //   "  ",
    //   totalAnsweredMCQ - correctCountMCQ
    // );
    // console.log(
    //   map.get(Number(row.questionId)),
    //   "      ",
    //   row.clientAnswer
    // );

    const mat = mathSA > 5 ? 5 : mathSA;
    const phy = phySA > 5 ? 5 : phySA;
    const che = chemSA > 5 ? 5 : chemSA;
    const incorrect = totalAnsweredMCQ - correctCountMCQ;

    res.status(200).send({
      success: true,
      result: {
        totalMCQ,
        totalAnsweredMCQ,
        correctCountMCQ,
        incorrect,
        mathSA: mat,
        phySA: phy,
        chemSA: che,
        finalResult:
          correctCountMCQ * 4 - incorrect + mat * 4 + phy * 4 + che * 4,
        mathMCQ,
        phyMCQ,
        cheMCQ,
        attemMathSA,
        attemPhySA,
        attemChemSA,
        attemtedArray,
      },
      // finalArr,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error: error,
    });
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
