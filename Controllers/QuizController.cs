using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using csharpreact.Entities;
using csharpreact.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace csharpreact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private static readonly HttpClient client = new HttpClient();

        private readonly ILogger<WeatherForecastController> _logger;

        public QuizController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async IAsyncEnumerable<Question> Get(int amount, string difficulty)
        {
            Console.WriteLine("here");
            Console.WriteLine(difficulty);
            Console.WriteLine(amount);
            var apiResponse = await Process(amount, difficulty.ToLower());
            var repositories = await JsonSerializer.DeserializeAsync<Repository>(apiResponse);
            var questions = repositories.Results;
            foreach (Question q in questions) {
                yield return q;
            } 
        }

        public async Task<System.IO.Stream> Process(int amount, string difficulty) {
            /*var url = new TriviaQuestionUrlBuilder()
                .setAmount(25)
                .setDifficultyEasy()
                .setTypeMultipleChoice()
                .Build();*/
            var url = $"https://opentdb.com/api.php?&amount={amount}&difficulty={difficulty}&type=multiple";
            Console.WriteLine($"Url called: {url}");
            var response = await client.GetAsync(url); 
            Console.WriteLine(response.Content);
            var res = await response.Content.ReadAsStreamAsync();
            return res;
        }
    }
}
