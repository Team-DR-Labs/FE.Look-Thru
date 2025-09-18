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

        const imageParts = [base64ToGenerativePart(personImage, "image/png")];

        const clothesImages = {
            hatImage,
            outerwearImage,
            topImage,
            bottomImage,
            shoesImage,
        };

        const clothesKoreanMap = {
            hatImage: "모자",
            outerwearImage: "아우터",
            topImage: "상의",
            bottomImage: "하의",
            shoesImage: "신발",
        };

        const providedClothes = [];
        const promptSegments = [];
        let imageIndex = 2; // 1 is person

        for (const [key, image] of Object.entries(clothesImages)) {
            if (image) {
                imageParts.push(
                    base64ToGenerativePart(image as string, "image/png"),
                );
                const name = clothesKoreanMap[key as keyof typeof clothesKoreanMap];
                providedClothes.push(name);

                const ordinalMap = {
                    2: "두 번째",
                    3: "세 번째",
                    4: "네 번째",
                    5: "다섯 번째",
                    6: "여섯 번째",
                };
                const ordinal = ordinalMap[imageIndex as keyof typeof ordinalMap] || `${imageIndex}번째`;
                promptSegments.push(
                    `${ordinal} 이미지는 교체할 ${name} 옷입니다.`,
                );
                imageIndex++;
            }
        }

        const clothesToChangeText = providedClothes.join(", ");

        let promptText = `첫 번째 이미지는 사람의 전신 사진입니다. ${promptSegments.join(
            " ",
        )} 첫 번째 사람 사진의 다른 부분(얼굴, 배경, 자세, 사진의 비율 등)은 그대로 유지한 채, 원래 입고 있던 ${clothesToChangeText} 부분을 각각 제공된 이미지의 것으로 자연스럽게 합성해주세요.`;

        if (topImage) {
            promptText +=
                " 만약 긴팔을 입고있는데 반팔 상의로 합성을 해야한다면 얼굴과 손의 피부색을 보고 팔의 색상을 넣어주세요.";
        }
        if (bottomImage) {
            promptText +=
                " 만약 긴바지를 입고있는데 반바지로 하의를 합성하면 얼굴과 손의 피부색을 보고 다리의 색상을 넣어주세요.";
        }

        promptText += ` ${clothesToChangeText}만 정확하게 바꿔주세요.`;

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
