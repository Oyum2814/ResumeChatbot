interface InputProps{
    id:string;
    onChange?: any;
    value?:string;
    label:string;
    type?:string;
}

const Input:React.FC<InputProps> = ({id,onChange,value,label,type})=>{
    return (
        <div className="relative">
            <input id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={label}
            className="
            border-[1px] border-[#1E447680]/50 rounded-[10px] h-[50px] text-black
            px-4 py-1 w-[320px] font-[400] manrope text-[11px]
            "/>
        </div>
        
    )
};
export default Input