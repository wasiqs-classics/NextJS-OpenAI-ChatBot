import {CiUser} from 'react-icons/ci';
import { Message } from '../chatbot';

export default function UserMessage({role, content}: Message) {
    return (
        <div className='flex w-full my-2 justify-end'>
            <div className='flex justify-center p-1 w-8 h-8 border bg-slate-500 rounded-full mr-2 text-white'>
                <CiUser size={18}/>
            </div>
            
            <div className='flex flex-col max-w-[75%]'>
                <div className='font-bold'>{role}</div>
                <p className='bg-blue-200 text-right p-2 rounded-md'>{content}</p>
            </div>
            
        </div>
    )
}