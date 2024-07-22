

export default function ChatInput() {
    return (
        <div className="flex space-x-2 items-center mt-auto">
            <form className="flex items-center justify-center w-full space-x-2">
                <input 
                    type="text"
                    placeholder="Enter Message"
                    className="flex h-10 w-full rounded-md border border-gray-800 px-3 text-sm text-black" 
                />
                <button className="p-2 bg-slate-950 text-white inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 h-10">Send</button>
            </form>
        </div>
    );
}