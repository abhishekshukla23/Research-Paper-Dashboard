import { Await } from "react-router-dom";
const papers = [
  {
    id: 1,
    title: "Attention Is All You Need",
    author: "Ashish Vaswani et al.",
    topic: "LLM",
    year: 2017,
    abstract:
      "Introduced the Transformer architecture, replacing recurrent networks with self-attention mechanisms and enabling more efficient sequence modeling.",
    pdfUrl: "https://arxiv.org/pdf/1706.03762.pdf"
  },

  {
    id: 2,
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    author: "Jacob Devlin et al.",
    topic: "NLP",
    year: 2018,
    abstract:
      "Introduced BERT, a bidirectional language representation model that significantly improved performance on various NLP benchmarks.",
    pdfUrl: "https://arxiv.org/pdf/1810.04805.pdf"
  },

  {
    id: 3,
    title: "Language Models are Few-Shot Learners",
    author: "Tom B. Brown et al.",
    topic: "LLM",
    year: 2020,
    abstract:
      "Presented GPT-3, a large language model capable of performing a wide range of tasks using only a few examples in the prompt.",
    pdfUrl: "https://arxiv.org/pdf/2005.14165.pdf"
  },

  {
    id: 4,
    title: "A First Measurement of the Hubble Constant",
    author: "Edwin Hubble",
    topic: "Cosmology",
    year: 1929,
    abstract:
      "Provided observational evidence that distant galaxies are moving away from us, leading to the discovery of the expanding universe.",
    pdfUrl: "https://arxiv.org"
  },

  {
    id: 5,
    title: "The Accelerating Expansion of the Universe",
    author: "Adam Riess et al.",
    topic: "Cosmology",
    year: 1998,
    abstract:
      "Reported evidence from Type Ia supernovae indicating that the expansion of the universe is accelerating, implying the existence of dark energy.",
    pdfUrl: "https://arxiv.org"
  },

  {
    id: 6,
    title: "Observation of Gravitational Waves",
    author: "LIGO Scientific Collaboration",
    topic: "Astrophysics",
    year: 2016,
    abstract:
      "Announced the first direct detection of gravitational waves produced by the merger of two black holes.",
    pdfUrl: "https://arxiv.org/pdf/1602.03837.pdf"
  },

  {
    id: 7,
    title: "The Event Horizon Telescope Image of M87*",
    author: "Event Horizon Telescope Collaboration",
    topic: "Astrophysics",
    year: 2019,
    abstract:
      "Presented the first image of a black hole's shadow, providing strong evidence for the existence of supermassive black holes.",
    pdfUrl: "https://arxiv.org/pdf/1906.11238.pdf"
  },

  {
    id: 8,
    title: "Deep Residual Learning for Image Recognition",
    author: "Kaiming He et al.",
    topic: "Computer Vision",
    year: 2015,
    abstract:
      "Introduced ResNet, enabling the training of extremely deep neural networks through residual connections.",
    pdfUrl: "https://arxiv.org/pdf/1512.03385.pdf"
  }
];

export async function getPapers(){
    await new Promise(resolve=>
        setTimeout(resolve,2000)
    );
    //throw new Error("server is down")
    
      return  [
  {
    id: 1,
    title: "Attention Is All You Need",
    author: "Ashish Vaswani et al.",
    topic: "LLM",
    year: 2017,
    abstract:
      "Introduced the Transformer architecture, replacing recurrent networks with self-attention mechanisms and enabling more efficient sequence modeling.",
    pdfUrl: "https://arxiv.org/pdf/1706.03762.pdf"
  },

  {
    id: 2,
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    author: "Jacob Devlin et al.",
    topic: "NLP",
    year: 2018,
    abstract:
      "Introduced BERT, a bidirectional language representation model that significantly improved performance on various NLP benchmarks.",
    pdfUrl: "https://arxiv.org/pdf/1810.04805.pdf"
  },

  {
    id: 3,
    title: "Language Models are Few-Shot Learners",
    author: "Tom B. Brown et al.",
    topic: "LLM",
    year: 2020,
    abstract:
      "Presented GPT-3, a large language model capable of performing a wide range of tasks using only a few examples in the prompt.",
    pdfUrl: "https://arxiv.org/pdf/2005.14165.pdf"
  },

  {
    id: 4,
    title: "A First Measurement of the Hubble Constant",
    author: "Edwin Hubble",
    topic: "Cosmology",
    year: 1929,
    abstract:
      "Provided observational evidence that distant galaxies are moving away from us, leading to the discovery of the expanding universe.",
    pdfUrl: "https://arxiv.org"
  },

  {
    id: 5,
    title: "The Accelerating Expansion of the Universe",
    author: "Adam Riess et al.",
    topic: "Cosmology",
    year: 1998,
    abstract:
      "Reported evidence from Type Ia supernovae indicating that the expansion of the universe is accelerating, implying the existence of dark energy.",
    pdfUrl: "https://arxiv.org"
  },

  {
    id: 6,
    title: "Observation of Gravitational Waves",
    author: "LIGO Scientific Collaboration",
    topic: "Astrophysics",
    year: 2016,
    abstract:
      "Announced the first direct detection of gravitational waves produced by the merger of two black holes.",
    pdfUrl: "https://arxiv.org/pdf/1602.03837.pdf"
  },

  {
    id: 7,
    title: "The Event Horizon Telescope Image of M87*",
    author: "Event Horizon Telescope Collaboration",
    topic: "Astrophysics",
    year: 2019,
    abstract:
      "Presented the first image of a black hole's shadow, providing strong evidence for the existence of supermassive black holes.",
    pdfUrl: "https://arxiv.org/pdf/1906.11238.pdf"
  },

  {
    id: 8,
    title: "Deep Residual Learning for Image Recognition",
    author: "Kaiming He et al.",
    topic: "Computer Vision",
    year: 2015,
    abstract:
      "Introduced ResNet, enabling the training of extremely deep neural networks through residual connections.",
    pdfUrl: "https://arxiv.org/pdf/1512.03385.pdf"
  }
];

}

export async function getPapersById(id) {
 await new Promise(resolve=>
        setTimeout(resolve,2000)
    );
     //throw new Error("server is down")
    return (

        papers.find(p=>p.id==Number(id))
    );
}


export async function  getRealPapers(search = "artificial intelligence",start=0,limit=10) {
    const response=await fetch(  `http://localhost:5000/papers?search=${encodeURIComponent(search)}&start=${start}&limit=${limit}`)
    const data=await response.json();
    return data;
}

export async function  getSuggestions(search) {
  const response=await fetch(  `http://localhost:5000/suggestions?search=${encodeURIComponent(search)}`)
    return await response.json();
   
}