import {RiRobot3Line} from 'react-icons/ri';
import { Message } from '../chatbot';
import ReactMarkdown from 'react-markdown';

export default function BotMessage({ role, content, isMarkdown }: Message) {
    // Function to clean the content for proper Markdown rendering
    const cleanResponse = (response: string): string => {
        const cleaned = response
            .replace(/\\n/g, '\n') // Replace escaped \n with actual newlines
            .replace(/\\/g, ''); // Remove any stray backslashes
        console.log("Cleaned Response:", cleaned); // Log cleaned response for debugging
        return cleaned;
    };

    const cleanedContent = isMarkdown ? cleanResponse(content) : content;

    console.log("Content Passed to ReactMarkdown:", cleanedContent); // Final content check before rendering

    return (
        <div className='flex w-full my-2'>
            <div className='flex justify-center p-1 w-8 h-8 border bg-slate-800 rounded-full mr-2 text-white'>
                <RiRobot3Line size={18} />
            </div>

            <div className="flex-1">
                <div className='font-bold'>{role}</div>
                {isMarkdown ? (
                    <ReactMarkdown 
                        className="prose prose-sm max-w-none"
                        components={{
                            // Customize link rendering
                            a: ({ node, ...props }) => (
                                <a 
                                    {...props} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                />
                            ),
                            // Style headings
                            h2: ({ node, ...props }) => (
                                <h2 {...props} className="text-xl font-bold my-2" />
                            ),
                            // Style paragraphs
                            p: ({ node, ...props }) => (
                                <p {...props} className="my-2" />
                            ),
                            // Style strong/bold text
                            strong: ({ node, ...props }) => (
                                <strong {...props} className="font-bold" />
                            )
                        }}
                    >
                        {cleanedContent}
                    </ReactMarkdown>
                ) : (
                    <p>{content}</p>
                )}
            </div>
        </div>
    );
}

