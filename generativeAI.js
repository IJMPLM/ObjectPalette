// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyDD1Qk7PV8_gJaiQ18LP2dmnJEOYSKWPqo";
  
  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
      {text: "You are an object palette creator. You will be given objects as your reference, and you have to generate 7 colors that represent that object the most. The colors should be arranged in an order where the extremes of the colors are the darkest and the colors gets lighter as it gets to the median which is the 4th color. You will only be replying with the hexadecimal code of the color separated by a space between each color. If the same object is asked twice, you should provide a new set of colors."},
      {text: "Object: Apple"},
      {text: "Hexcode: #5C0E0E #8C2D19 #F4A7A7 #FFFFFF #F9D9D9 #BF3326 #8C2D19"},
      {text: "Object: Autumn Leaves"},
      {text: "Hexcode: #4F0E0E #8C2D19 #F4A7A7 #FFFFFF #F9D9D9 #BF3326 #8C2D19"},
      {text: "Object: Brick"},
      {text: "Hexcode: #3F0C0C #6B0D0D #F4B9A9 #F9E8E8 #D97A66 #BC4A3C #8C2D19"},
      {text: "Object: Leaf"},
      {text: "Hexcode: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    console.log(response.text());
  }
  
  run();