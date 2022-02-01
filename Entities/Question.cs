using System;
using System.Text.Json;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace csharpreact.Entities
{
    public class Question {
        [JsonPropertyName("category")]
        public string Category {get; set;}
        [JsonPropertyName("type")]
        public string Type {get; set;}
        [JsonPropertyName("difficulty")]
        public string Difficulty {get; set;}
        [JsonPropertyName("question")]
        public string QuestionString {get; set;}
        [JsonPropertyName("correct_answer")]
        public string Correct_answer {get; set;}
        [JsonPropertyName("incorrect_answers")]
        public string[] Incorrect_answers {get; set;}

        public string[] Shuffled() {
            var rnd = new Random();
            return Incorrect_answers.Append(Correct_answer).OrderBy(x => rnd.Next()).ToArray();
        } 
        public override string ToString()
        {
            UnicodeEncoding unicode = new UnicodeEncoding();
            return "Category: " + Category + 
                 "\nType: " + Type +
                 "\nDifficulty: " + Difficulty + 
                 "\nQuestion: " + QuestionString +
                 "\nCorrect Answer: " + Correct_answer +
                 "\nIncorrect Answers: " + String.Join(", ", Incorrect_answers);
        }
    }
}