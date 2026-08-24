interface CardProps {
    children: React.ReactNode
}

export const CardComponent = ( {children: customElements}: CardProps) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            padding: "1rem",
            paddingTop: "0.6rem",
            borderRadius: "0.6rem",
            border: "1px solid green"
        }} className=" w-full sm:w-4 sm:mt-0 mt-2">
            {customElements}
        </div>
    );
};