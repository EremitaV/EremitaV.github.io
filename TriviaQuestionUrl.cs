using System; 

namespace csharpreact
{
    public class TriviaQuestionUrl {
        private string url = "https://opentdb.com/api.php?";

        public void AddToUrl(string query) {
            url += query;
        }

        public string GetUrl() {
            return url;
        }
    }
}