interface WhiteBtnProps {
    text: string;
}

export const WhiteBtn = ({text}: WhiteBtnProps) => {
    return (
        <>
        <button className="bg-white text-black rounded-lg p-2 px-10 border text-sm font-bold">{text}</button>
        </>
    );
}