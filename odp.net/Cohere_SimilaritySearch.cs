/* SAMPLE OUTPUT
Cohere similarity search demo.
Calling Cohere REST Embeddings Service.
Response received.
Parsing response for embedding.
Retreived embedding.
Trying to connect to vector/vector@doug
Connected to Oracle 23.4.0.23.11
Performing similarity search using embedding: select info from my_data order by vector_distance(v, :1, DOT) fetch first 3 rows only

Search Results:

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
            string text = "cars";
            string embedding_model = "embed-english-v3.0";
            string similaritySearch_sql = "select info from test_data order by vector_distance(v, :1, DOT) fetch first 3 rows only";

            Console.WriteLine("Cohere similarity search demo.");

            try
            {
                Console.WriteLine($"Calling Cohere REST Embeddings Service to get embedding for {text}.");
                string embedding = GetEmbeddingUsingCoherence(text, embedding_model);
                Console.WriteLine("Retreived embedding.");

                Console.WriteLine("Trying to connect to vector/vector@doug");
                using (OracleConnection con = new OracleConnection("User Id=vector; Password=vector; Data Source=doug"))
                {
                    con.TnsAdmin = @"C:\Users\pdsilva.ORADEV\Oracle\network\admin";
                    con.Open();
                    Console.WriteLine("Connected to Oracle " + con.ServerVersion);

                    Console.WriteLine("Performing similarity search using embedding: " + similaritySearch_sql);
                    Console.WriteLine();
                    OracleCommand cmd = con.CreateCommand();
                    cmd.CommandText = similaritySearch_sql;
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
                
        static string GetEmbeddingUsingCoherence(string text, string embeddingModel)
        {
            string embedding = string.Empty;
            using (HttpClient client = new HttpClient())
            {
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
            }
            return embedding;
        }
    }
}
