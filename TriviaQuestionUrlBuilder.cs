using System;

namespace csharpreact
{
    enum Difficulty {
            easy,
            medium,
            hard
        }
    public class TriviaQuestionUrlBuilder {
        
        private TriviaQuestionUrl url = new TriviaQuestionUrl();
        private bool difficultySet = false;

        public TriviaQuestionUrlBuilder() {}
        public TriviaQuestionUrlBuilder setAmount(int amount) {
            url.AddToUrl("&amount="+amount);
            return this;
        }

        public TriviaQuestionUrlBuilder setDifficultyEasy() {
            if (difficultySet) {
                return this;
            }
            url.AddToUrl("&difficulty=easy");
            difficultySet = true;
            return this;
        }

        public TriviaQuestionUrlBuilder setDifficultyMedium() {
            if (difficultySet) {
                return this;
            }
            url.AddToUrl("&difficulty=medium");
            difficultySet = true;
            return this;
        }

        public TriviaQuestionUrlBuilder setDifficultyHard() {
            if (difficultySet) {
                return this;
            }
            url.AddToUrl("&difficulty=hard");
            difficultySet = true;
            return this;
        }

        public TriviaQuestionUrlBuilder setTypeMultipleChoice() {
            url.AddToUrl("&type=multiple");
            return this;
        }

        public TriviaQuestionUrlBuilder setTypeTrueFalse() {
            url.AddToUrl("&type=boolean");
            return this;
        }

        public TriviaQuestionUrlBuilder setCategory(int category) {
            url.AddToUrl("&category="+category);
            return this;
        }

        public string Build() {
            return url.GetUrl();
        }
    }
}