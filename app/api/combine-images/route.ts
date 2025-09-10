import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
// Switch to the specific model for image generation/editing
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image-preview",
});

const generationConfig = {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 8192, // Increased for image data
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

function base64ToGenerativePart(base64: string, mimeType: string) {
    return {
        inlineData: {
            data: base64.split(",")[1],
            mimeType,
        },
    };
}

export async function POST(req: NextRequest) {
    try {
        const { personImage, topImage, bottomImage } = await req.json();

        if (!personImage || (!topImage && !bottomImage)) {
            return NextResponse.json(
                { error: "Missing required images" },
                { status: 400 },
            );
        }

        const imageParts = [base64ToGenerativePart(personImage, "image/png")];
        let promptText = "";

        if (topImage && bottomImage) {
            imageParts.push(base64ToGenerativePart(topImage, "image/png"));
            imageParts.push(base64ToGenerativePart(bottomImage, "image/png"));
            promptText =
                "Using the first image as the base, replace the person's clothing with the top from the second image and the bottoms from the third image. Make the result's background transparent.";
        } else if (topImage) {
            imageParts.push(base64ToGenerativePart(topImage, "image/png"));
            promptText =
                "Using the first image as the base, replace the person's clothing with the top from the second image. Make the result's background transparent.";
        } else if (bottomImage) {
            imageParts.push(base64ToGenerativePart(bottomImage, "image/png"));
            promptText =
                "Using the first image as the base, replace the person's clothing with the bottoms from the second image. Make the result's background transparent.";
        }

        const allParts = [{ text: promptText }, ...imageParts];

        const result = await model.generateContent({
            contents: [{ role: "user", parts: allParts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        const candidate = response.candidates?.[0];

        if (!candidate || !candidate.content || !candidate.content.parts) {
            const text = response.text();
            console.error(
                "Gemini API returned no candidates or parts. Response text:",
                text,
            );
            return NextResponse.json(
                { error: "No content generated. API returned text: " + text },
                { status: 500 },
            );
        }

        const imagePart = candidate.content.parts.find(
            (part) => part.inlineData,
        );

        if (imagePart && imagePart.inlineData) {
            const base64Data = imagePart.inlineData.data;
            const mimeType = imagePart.inlineData.mimeType;
            const dataUrl = `data:${mimeType};base64,${base64Data}`;
            return NextResponse.json({ result: dataUrl });
        } else {
            const text = response.text();
            console.error("Gemini API returned text instead of an image:", text);
            return NextResponse.json(
                {
                    error: "Failed to generate image. API returned text: " + text,
                },
                { status: 500 },
            );
        }
    } catch (error) {
        console.error("Error in Gemini API call:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
