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
                "첫 번째 이미지는 사람의 전신 사진입니다. 두 번째 이미지는 교체할 상의 옷입니다. 세 번째 이미지는 교체할 하의 옷입니다. 첫 번째 사람 사진의 다른 부분(얼굴, 배경, 자세, 사진의 비율 등)은 그대로 유지한 채, 원래 입고 있던 상의와 하의를 각각 두 번째와 세 번째 이미지의 옷으로 자연스럽게 합성해주세요. 만약 긴팔을 입고있는데 반팔 상의로 합성을 해야한다면 얼굴과 손의 피부색을 보고 팔의 색상을 넣어주세요. 만약 긴바지를 입고있는데 반바지로 하의를 합성하면 얼굴과 손의 피부색을 보고 반바지의 색상을 넣어주세요. 옷만 정확하게 바꿔주세요.";
        } else if (topImage) {
            imageParts.push(base64ToGenerativePart(topImage, "image/png"));
            promptText =
                "첫 번째 이미지는 사람의 전신 사진입니다. 두 번째 이미지는 교체할 상의 옷입니다. 첫 번째 사람 사진의 다른 부분(얼굴, 배경, 자세, 하의, 사진의 비율 등)은 그대로 유지한 채, 원래 입고 있던 상의만 두 번째 이미지의 옷으로 자연스럽게 합성해주세요. 만약 긴팔을 입고있는데 반팔 상의로 합성을 해야한다면 얼굴과 손의 피부색을 보고 팔의 색상을 넣어주세요. 상의만 정확하게 바꿔주세요.";
        } else if (bottomImage) {
            imageParts.push(base64ToGenerativePart(bottomImage, "image/png"));
            promptText =
                "첫 번째 이미지는 사람의 전신 사진입니다. 두 번째 이미지는 교체할 하의 옷입니다. 첫 번째 사람 사진의 다른 부분(얼굴, 배경, 자세, 상의, 사진의 비율 등)은 그대로 유지한 채, 원래 입고 있던 하의만 두 번째 이미지의 옷으로 자연스럽게 합성해주세요. 만약 긴바지를 입고있는데 반바지로 하의를 합성하면 얼굴과 손의 피부색을 보고 반바지의 색상을 넣어주세요. 하의만 정확하게 바꿔주세요.";
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
                    error: "이미지 생성에 실패했어요. 조금 뒤에 다시 시도해주세요.",
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
