
'use server';
import OpenAI from "openai";
import { Message } from "@/components/Chatbot/chatbot";
import fs from 'fs';
import path from "path";



const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Product Type - Updated to match products.json structure
type Product = {
    name: string;
    description: string;
    price: string;
    sizes: string[];
    route: string;
}

// Read the Products JSON File
const filePath = path.resolve(process.cwd(), 'data', 'products.json');
const products: Product[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//console.log(products);

/**
 * Chat Completion
 * @param chatMessages 
 * @returns 
 */
export async function chatCompletion(chatMessages: Message[]) {
    try {
        console.log('FROM BACKEND: ', chatMessages);  

        // Checking if the user question matches any product
        const userQuestion = chatMessages.at(-1)?.content.toLowerCase();
        const matchedProduct = products.find(product => 
            userQuestion?.includes(product.name.toLowerCase()) || 
            userQuestion?.includes(product.description.toLowerCase())
        );


        if (matchedProduct) {
            console.log('Product found:', matchedProduct);
            const response = `## ${matchedProduct.name}

        ${matchedProduct.description}

        **Price:** ${matchedProduct.price}
        **Available Sizes:** ${matchedProduct.sizes.join(', ')}

        [Click here to view product](${matchedProduct.route})`;
            
            return { 
                role: 'assistant', 
                content: response,
                isMarkdown: true // Add this flag to indicate markdown content
            } as Message;
        }

        console.log('Reaching out to OPENAI API ...');
        
        // Chat to be sent to OPEN AI with product context
        const chat = [
            {
                role: 'system', 
                content: 'You are a helpful shopping assistant. When suggesting products, always include their full details and URL from the product catalog. The URL address will look like http://localhost:3000/route where route is the actual rout that you will get. Make sure the URL opens in a new window.'
            },
            ...products.map(product => ({
                role: 'system',
                content: `Product: ${product.name}
Description: ${product.description}
Price: ${product.price}
Sizes: ${product.sizes.join(', ')}
URL: ${product.route}`
            })),
            ...chatMessages
        ];
    
        const completion = await openAI.chat.completions.create({
            messages: chat,
            model: 'gpt-4o-mini'
        });

        if (!completion) {
            throw new Error("Invalid response from OPENAI API!");
        }

        const assistantMessage = completion.choices[0].message?.content;

        if (!assistantMessage) {
            throw new Error("No message from OPENAI API");
        }
    
        console.log('COMPLETION', completion.choices[0]);
        return { role: 'assistant', content: assistantMessage } as Message;
        
    } catch (error) {
        console.log(error);
        return {
            role: 'assistant', 
            content: "I'm sorry, something went wrong. Please try again later."
        } as Message;
    }
}
