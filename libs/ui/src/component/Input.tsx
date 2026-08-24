import { InputText } from "primereact/inputtext"
// import "@brdbank/uno-theme-web/theme/theme-light/green/theme.css";

interface InputProps {
    label?: string
    placeholder?: string
    priority?: number
    isMandatory?: boolean
    fieldType?: string
    fieldGroup?: number
    options? : { name: string; priority?: number }[]

}


export const InputComponent = ({
    label,
    priority,
    placeholder,
    isMandatory,
    fieldType,
    fieldGroup,
    options

}: InputProps) => {

    return (
        <div className="flex flex-column gap-3 mb-3">
            <label htmlFor={label} style={{fontSize: '1rem', fontWeight: 'bold'}}>
                {label} {isMandatory && <span style={{ color: 'red' }}>*</span>}
            </label>
            {/* <InputText id="username" aria-describedby="username-help" placeholder={`${label}`} disabled/> */}
            {/* <input type={fieldType} style={{ height: '3rem', padding: '0.9rem', fontSize: '1.1rem', borderRadius: '0.4rem', border: "1px solid gray"}}/> */}
            {fieldType === "radio" && options ? (
                <div>
                    {options.map((option, index) => (
                        <label key={index} className="flex align-items-center gap-2">
                            <input type="radio" name={label} value={option.name} />
                            {option.name}
                        </label>
                    ))}
                </div>
            ) : fieldType === "checkbox" && options ? (
                <div>
                    {options.map((option, index) => (
                        <label key={index} className="flex align-items-center gap-2">
                            <input type="checkbox" name={label} value={option.name} />
                            {option.name}
                        </label>
                    ))}
                </div>
            ) : fieldType === "select" && options ? (
                <select style={{ height: "3rem", padding: "0.9rem", fontSize: "1.1rem"}}>
                    <option value="">Select {placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={fieldType}
                    placeholder={placeholder}
                    style={{
                        height: "3rem",
                        padding: "0.9rem",
                        fontSize: "1.1rem",
                        borderRadius: "0.4rem",
                        border: "1px solid gray"
                    }}
                />
            )}
        </div>
    )
}