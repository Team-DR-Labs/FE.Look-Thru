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
        const {
            personImage,
            topImage,
            bottomImage,
            hatImage,
            outerwearImage,
            shoesImage,
        } = await req.json();

        if (
            !personImage ||
            (!topImage &&
                !bottomImage &&
                !hatImage &&
                !outerwearImage &&
                !shoesImage)
        ) {
            return NextResponse.json(
                { error: "Missing required images" },
                { status: 400 },
            );
        }

        const basePrompt = `교체 대상 외 모든 요소(얼굴, 포즈, 배경, 의상, 소품 등)는 그대로 유지하세요. 합성되는 아이템만 자연스럽게 적용하고, 원본 조명과 체형에 맞춰 주름·그림자·질감을 반영해 실제 착용처럼 보이게 해주세요.`;

        const detailedPrompts = {
            topImage:
                "상의는 첨부한 상의 이미지로 옷을 교체하세요. 손이나 겹치는 소품과 자연스럽게 연결하고, 긴팔→반팔 시 팔 피부톤을 얼굴 색 기준으로 맞춰주세요.",
            bottomImage:
                "하의는 첨부한 하의 이미지로 옷을 교체하세요. 앞뒤 디테일 구분하고, 긴바지→반바지 시 노출된 다리 피부톤을 얼굴 색 기준으로 보정하세요.",
            hatImage:
                "모자는 첨부한 모자 이미지로 옷을 교체하세요. 모자는 인물의 머리 크기와 각도에 맞게 정확히 씌우고, 헤어스타일을 자연스럽게 누르거나 감싸도록 합성하세요. 앞머리·옆머리가 어색하지 않게 정리하고, 원본 조명 방향에 맞춰 모자와 머리카락·얼굴에 그림자를 반영하세요.",
            shoesImage:
                "신발은 첨부한 이미지로 교체하고, 발과 자세에 맞게 조정하세요. 발목, 바닥과 자연스럽게 연결하고 원본 조명에 맞춰 그림자를 적용하세요.",
            outerwearImage:
                "아우터는 상의 위에 자연스럽게 걸치고, 열린 디자인은 안쪽 상의가 보이도록 처리. 긴팔→반팔 시 팔 피부톤과 주름을 얼굴 색 기준으로 조정하세요.",
        };

        const imageParts = [base64ToGenerativePart(personImage, "image/png")];
        let promptText = basePrompt;

        const clothesImages = {
            hatImage,
            outerwearImage,
            topImage,
            bottomImage,
            shoesImage,
        };

        for (const [key, image] of Object.entries(clothesImages)) {
            if (image) {
                promptText +=
                    " " + detailedPrompts[key as keyof typeof detailedPrompts];
                imageParts.push(
                    base64ToGenerativePart(image as string, "image/png"),
                );
            }
        }

        console.log(promptText);

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
