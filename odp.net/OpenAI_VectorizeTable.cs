
using Oracle.ManagedDataAccess.Client;
using System.Net.Http.Headers;
using System.Text.Json;

namespace ConsoleApp9
{
    class Program
    {
        static string embedding_model = "text-embedding-ada-002";
        static string total_row_count_sql = "SELECT count(*) count_id FROM test_data";
        static string read_rows_sql = "SELECT id, info FROM test_data ORDER BY 1";
        static string update_embedding_sql = "update test_data set v = :1 where id = :2";

        static void Main(string[] args)
        {
            Vectorize_Batch(embedSize: 60, commitSize: 60);
        }

        /// <summary>
        /// Vectorizes a table, in batches based on the embed and commit size
        /// </summary>
        /// <param name="embedSize">
        ///  embedSize is how many sentences to vectorize in one call
        ///   This is a REST call to Coherence endpoint.</param>
        /// <param name="commitSize">
        /// commitSize is the number of updates to the table per DB round trip.
        /// Make commitSize <= embedSize
        /// </param>
        static void Vectorize_Batch(int embedSize, int commitSize)
        {
            if (commitSize < 1)
            {
                Console.WriteLine("Use a commitSize >=1 for efficiency");
                return;
            }


            if (commitSize > embedSize)
            {
                Console.WriteLine("Make commitSize <= embedSize");
                return;
            }


            if (commitSize > 1000)
            {
                Console.WriteLine("commitSize greater than 1000 tends to slow things down");
                return;
            }

            if (commitSize > embedSize)
                commitSize = embedSize;

            //connect to Oracle Vector DB
            OracleConnection con = new OracleConnection("User Id=vector; Password=vector; Data Source=doug");
            con.TnsAdmin = @"C:\Users\pdsilva.ORADEV\Oracle\network\admin";
            Console.WriteLine("Trying to connect to vector/vector@doug");
            con.Open();
            Console.WriteLine("Connected to Oracle " + con.ServerVersion);
            OracleCommand oracleCommand = con.CreateCommand();
            oracleCommand.CommandText = total_row_count_sql;

            //get the total number of rows in the table
            OracleDataReader oracleDataReader = oracleCommand.ExecuteReader();
            oracleDataReader.Read();
            int countOfId = oracleDataReader.GetInt32(0); 

            Console.WriteLine("  table row count = " + countOfId);
            Console.WriteLine("  embedSize = " + embedSize);
            Console.WriteLine("  commitSize = " + commitSize);

            string[] data = new string[embedSize];
            int[] ids = new int[embedSize];
            string[] embeddings;
            int[] idsToUpdate = new int[commitSize];
            string[] embedsToUpdate = new string[commitSize];
            int totalRowsReturned = 0;
            int rowsToCommit = 0;

            oracleCommand.CommandText = read_rows_sql;

            Console.WriteLine("Reading texts from test_data table");
            OracleDataReader reader = oracleCommand.ExecuteReader();

            //read the sentences from the DB and embed them as and when we hit the embed size
            while (reader.Read())
            {
                ids[totalRowsReturned % embedSize] = reader.GetInt32(0);
                data[totalRowsReturned % embedSize] = reader.GetString(1);
                totalRowsReturned++;

                if (totalRowsReturned % embedSize == 0)
                {
                    //get the embeddings
                    embeddings = GetBatchEmbeddingsUsingOpenAI(data, embedding_model);

                    for (int y = 0; y < embeddings.Length; y++)
                    {
                        idsToUpdate[rowsToCommit % commitSize] = ids[y];
                        embedsToUpdate[rowsToCommit % commitSize] = embeddings[y];
                        rowsToCommit++;

                        if (rowsToCommit % commitSize == 0)
                        {
                            //update the embeddings to the table
                            UpdateBatchEmbeddings(idsToUpdate, embedsToUpdate);
                        }
                    }
                }
            }

            //get embeddings for any sentences that we have read but not fetched the embeddings yet
            if (totalRowsReturned % embedSize != 0)
            {
                data = data.Take(totalRowsReturned % embedSize).ToArray();
                embeddings = GetBatchEmbeddingsUsingOpenAI(data, embedding_model);

                for (int y = 0; y < embeddings.Length; y++)
                {
                    idsToUpdate[rowsToCommit % commitSize] = ids[y];
                    embedsToUpdate[rowsToCommit % commitSize] = embeddings[y];
                    rowsToCommit++;

                    if (rowsToCommit % commitSize == 0)
                    {
                        //Push the embeddings to the table
                        UpdateBatchEmbeddings(idsToUpdate, embedsToUpdate);
                    }
                }
            }

            //Push any pending embeddings to the table
            if (rowsToCommit % commitSize != 0)
            {
                idsToUpdate = idsToUpdate.Take(rowsToCommit % commitSize).ToArray();
                embedsToUpdate = embedsToUpdate.Take(rowsToCommit % commitSize).ToArray();
                UpdateBatchEmbeddings(idsToUpdate, embedsToUpdate);
            }
        }

        /// <summary>
        /// Gets embeddings for a batch of texts.
        /// </summary>
        /// <param name="texts"></param>
        /// <param name="embeddingModel"></param>
        /// <returns></returns>
        static string[] GetBatchEmbeddingsUsingOpenAI(string[] texts, string embeddingModel)
        {
            string[] embedding = new string[texts.Count()];
            string batched_text = string.Empty;
            bool first = true;
            foreach (string text in texts)
            {
                if (first)
                {
                    batched_text = $@" ""{text}""";
                    first = false;
                }
                else
                    batched_text += $@" , ""{text}""";
            }

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
                    Content = new StringContent($@"{{    ""input"": [{batched_text}],    ""model"": ""{embeddingModel}"",    ""encoding_format"": ""float""  }}")
                    {
                        Headers =
                        {
                            ContentType = new MediaTypeHeaderValue("application/json")
                        }
                    }
                };

                Console.WriteLine($"Requesting embeddings from https://api.openai.com/v1/embeddings for {texts.Length} texts");

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
                        for (int i = 0; i < subValue.GetArrayLength(); i++)
                        {
                            if (subValue[i].TryGetProperty("embedding", out JsonElement embeddingValues))
                            {
                                embedding[i] = embeddingValues.ToString();
                            }
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

        /// <summary>
        /// Updates the embeddings to the table in the DB
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="embeddings"></param>
        static void UpdateBatchEmbeddings(int[] ids, string[] embeddings)
        {
            OracleConnection con = new OracleConnection("User Id=vector; Password=vector; Data Source=doug");
            con.TnsAdmin = @"C:\Users\pdsilva.ORADEV\Oracle\network\admin";
            con.Open();
            OracleCommand oracleCommand1 = con.CreateCommand();
            oracleCommand1.CommandText = update_embedding_sql;
            oracleCommand1.ArrayBindCount = ids.Length;
            oracleCommand1.Parameters.Add(new OracleParameter(":1", OracleDbType.Vector, embeddings, System.Data.ParameterDirection.Input));
            oracleCommand1.Parameters.Add(new OracleParameter(":2", OracleDbType.Int32, ids, System.Data.ParameterDirection.Input));
            oracleCommand1.ExecuteNonQuery();
            oracleCommand1.Parameters.Clear();
            Console.WriteLine($"Updated embeddings for {embeddings.Length} embeddings on test_data table. Start Id:{ids[0]}, End Id: {ids.Last()}");
        }
       
    }
}