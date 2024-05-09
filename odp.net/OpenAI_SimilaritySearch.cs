/* SAMPLE OUTPUT
OpenAI similarity search demo.
Calling OpenAI REST Embeddings Service.
Response received
Parsing response for embedding.
Retreived embedding.
Trying to connect to vector/vector@doug
Connected to Oracle 23.4.0.23.11
Performing similarity search using embedding: select info from my_data order by vector_distance(v, :1, DOT) fetch first 3 rows only

Search Results:
Birds can fly.
Zebras are black and white.
Horses have four legs.
 */

using Oracle.ManagedDataAccess.Client;
using System.Net.Http.Headers;
using System.Text.Json;

namespace ConsoleApp9
{
    class Program
    {
        static void Main(string[] args)
        {
            string text = "animals";
            string embedding_model = "text-embedding-ada-002";
            string sql = "select info from test_data order by vector_distance(v, :1, DOT) fetch first 3 rows only";

            Console.WriteLine("OpenAI similarity search demo.");

            try
            {
                Console.WriteLine($"Calling OpenAI REST Embeddings Service to get embedding for {text}.");
                string embedding = GetEmbeddingUsingOpenAI(text, embedding_model);
                Console.WriteLine("Retreived embedding.");

                Console.WriteLine("Trying to connect to vector/vector@doug");
                using (OracleConnection con = new OracleConnection("User Id=vector; Password=vector; Data Source=doug"))
                {
                    con.TnsAdmin = @"C:\Users\pdsilva.ORADEV\Oracle\network\admin";
                    con.Open();
                    Console.WriteLine("Connected to Oracle " + con.ServerVersion);

                    Console.WriteLine("Performing similarity search using embedding: " + sql);
                    Console.WriteLine();
                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = sql;
                    cmd.Parameters.Add("1", OracleDbType.Vector, embedding, System.Data.ParameterDirection.Input);
                    OracleDataReader reader = cmd.ExecuteReader();

                    Console.WriteLine("Search Results:");
                    while (reader.Read())
                    {
                        Console.WriteLine(reader.GetString(0));
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.ToString());
            }
        }

        static string GetEmbeddingUsingOpenAI(string text, string embeddingModel)
        {
            string embedding = string.Empty;

            using (HttpClient client = new HttpClient())
            {
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri("https://api.openai.com/v1/embeddings"),
                    Headers =
                    {
                        { "accept", "application/json" },
                        { "authorization", "Bearer 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" },
                    },
                    Content = new StringContent($@"{{    ""input"": ""{text}"",    ""model"": ""{embeddingModel}"",    ""encoding_format"": ""float""  }}")
                    {
                        Headers =
                        {
                            ContentType = new MediaTypeHeaderValue("application/json")
                        }
                    }
                };

                var response = client.Send(request);

                Console.WriteLine("Response received");

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Parsing response for embedding.");
                    string s = response.Content.ReadAsStringAsync().Result;
                    JsonDocument jd = JsonDocument.Parse(s);
                    JsonElement je = jd.RootElement;
                    if (je.TryGetProperty("data", out JsonElement subValue))
                    {
                        if (subValue[0].TryGetProperty("embedding", out JsonElement embeddingValues))
                        {
                            embedding = embeddingValues.ToString();
                        }
                    }
                    else
                    {
                        Console.WriteLine("Couldn't get embedding from JSON.");
                    }
                }
                else
                {
                    Console.WriteLine("Couldn't get embedding from the REST service.");
                }
            }
            return embedding;
        }

        static string GetEmbeddingUsingCoherence(string text, string embeddingModel)
        {
            string embedding = string.Empty;
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://api.cohere.ai/v1/embed"),
                Headers =
                {
                    { "accept", "application/json" },
                    { "authorization", "Bearer MFdqUlwIYIA1zGIfsRNk0IiBjugBdjQsHFL7C5XM" },
                },
                Content = new StringContent($@"{{""texts"":[""{text}""],""model"":""{embeddingModel}"",""input_type"":""search_query""}}")
                {
                    Headers =
                    {
                        ContentType = new MediaTypeHeaderValue("application/json")
                    }
                }
            };


            Console.WriteLine("Calling Cohere REST Embeddings Service.");

            var response = client.Send(request);

            Console.WriteLine("Response received.");

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Parsing response for embedding.");
                string s = response.Content.ReadAsStringAsync().Result;
                JsonDocument jd = JsonDocument.Parse(s);
                JsonElement je = jd.RootElement;
                if (je.TryGetProperty("embeddings", out JsonElement subValue))
                {
                    Console.WriteLine("Retreived embedding.");
                    embedding = subValue[0].ToString();
                }
                else
                {
                    Console.WriteLine("Couldn't get embedding from JSON.");
                }
            }
            else
            {
                Console.WriteLine("Couldn't get embedding from the REST service.");
            }
            return embedding;
        }
    }
}
