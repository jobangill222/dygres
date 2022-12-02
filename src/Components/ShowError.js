const ShowError = (props) => {

    return (
        <>
            {
                props.error ? <div className="help-block help-block-error">{props.error}</div> : ''
            }
        </>
    )

};

export default ShowError;