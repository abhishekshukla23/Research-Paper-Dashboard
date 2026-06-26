const express=require("express");

const cors=require("cors");
const axios=require("axios")
const app=express();
const xml2js=require("xml2js")
app.use(cors());

app.get('/',(req,res)=>{
  res.send("backend running");
});

app.get("/papers",async (req,res)=>{
   
 try {
    const query=req.query.search || "artificial intelligence";
    const start=req.query.start||0;
    const limit=req.query.limit||10;
     const response=await axios.get(  "https://export.arxiv.org/api/query",
       {
           params:{
               search_query:`all:${query}`,
               start:start,
               max_results:limit
           }
       }
     );
     const parser=new xml2js.Parser({explicitArray:false});
   
     parser.parseString(response.data,(err,result)=>{
       if(err){
           return res.status(500).json({erro:"XML parse error"});
       }
           const entries=result.feed.entry || [];
           const papers=Array.isArray(entries) ? entries:[entries];
   
       const formatted=papers.map((p,index)=>({
           id:index+1,
           title:p.title,
           author:p.author?.name ||"Unknown",
           topic:"Research",
           abstract:p.summary
   
       }));
       res.json(formatted)
     })
    
 } catch (error) {
res.status(500).json({message:"failed to fetch data"})
 }
}
);

app.get("/suggestions", async (req, res) => {
    const query = req.query.search;

    if (!query) {
        return res.json([]);
    }

    try {
        const response = await axios.get(
            "https://export.arxiv.org/api/query",
            {
                params: {
                    search_query: `all:${query}`,
                    start: 0,
                    max_results: 5,
                },
            }
        );

        const parser = new xml2js.Parser({ explicitArray: false });

        parser.parseString(response.data, (err, result) => {
            if (err) return res.json([]);

            const entries = result.feed.entry || [];
            const papers = Array.isArray(entries) ? entries : [entries];

            const titles = papers.map(p => p.title.trim());

            res.json(titles);
        });

    } catch (err) {
        res.json([]);
    }
});



app.listen(5000,()=>{
    console.log("server is running on port: 5000")
})