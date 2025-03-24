const InputForm = ({
    title, value, onChange, name
}) => {
    return (
        <div className="input-container">
            <input
                placeholder={title}
                type="text"
                value={value}
                onChange={onChange} 
                name={name}        
                required
            />
        </div>
    )
}

export default InputForm;