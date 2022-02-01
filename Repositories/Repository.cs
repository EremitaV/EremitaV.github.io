using System;
using System.Text.Json.Serialization;
using csharpreact.Entities;

namespace csharpreact.Repositories
{
    public class Repository
    {
        [JsonPropertyName("response_code")]
        public int Response_code {get; set;}
        [JsonPropertyName("results")]
        public Question[] Results {get; set;}

    }
}