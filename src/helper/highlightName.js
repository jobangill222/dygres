export const highlightName = (finalPostContent) => {

    const myArray = finalPostContent.split(" ");
    // console.log('myArray', myArray);

    return <span> {myArray.map((singleWord, i) =>
        <span key={i} className={singleWord[0] === '@' ? "text-primary" : singleWord[0] === '#' ? "text-primary" : ""}>
            {singleWord}{' '}
        </span>
    )
    }</span>;

}
